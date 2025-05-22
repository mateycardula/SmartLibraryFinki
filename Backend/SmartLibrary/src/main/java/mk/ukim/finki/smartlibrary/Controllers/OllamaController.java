package mk.ukim.finki.smartlibrary.Controllers;

import mk.ukim.finki.smartlibrary.DTOs.QuestionGenerationRequestDTO;
import mk.ukim.finki.smartlibrary.Models.UploadDocument;
import mk.ukim.finki.smartlibrary.Service.UploadDocumentService;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/api/ollama")
public class OllamaController {

    private final RestTemplate restTemplate = new RestTemplate();
    private final UploadDocumentService uploadDocumentService;

    @Value("${GEMINI_API_KEY}")
    private String geminiApiKey;

    public OllamaController(UploadDocumentService uploadDocumentService) {
        this.uploadDocumentService = uploadDocumentService;
    }

    @GetMapping("/say-hi")
    public ResponseEntity<String> sayHiToOllama() {
        String url = "http://ollama:11434/api/generate";
//        String url = "http://localhost:11434/api/generate";

        Map<String, Object> body = new HashMap<>();
        body.put("model", "llama3"); // Make sure llama3 is preloaded
        body.put("prompt", "Say hi");
        body.put("stream", false);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
            String raw = response.getBody().get("response").toString();
            int start = raw.indexOf("[");
            int end = raw.lastIndexOf("]") + 1;

            if (start >= 0 && end > start) {
                String json = raw.substring(start, end);
                return ResponseEntity.ok(json);
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ollama returned invalid JSON.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error contacting Ollama: " + e.getMessage());
        }
    }


    @PostMapping("/generate-questions")
    public ResponseEntity<String> generateQuestions(@RequestBody QuestionGenerationRequestDTO dto) {
        UploadDocument doc = uploadDocumentService.findById(dto.getDocumentId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Document not found"));

        Path path = Paths.get(doc.getFilePath());
        try {
            String fullText = extractTextFromPdf(path, dto.getPageFrom(), dto.getPageTo());
            List<String> chunks = splitTextIntoChunks(fullText, 2000);

            Map<String, Integer> stringKeyedDistribution = new HashMap<>();
            dto.getDistribution().forEach((key, value) -> stringKeyedDistribution.put(key.name(), value));

            List<PromptBatch> batches = buildPromptBatches(chunks, dto.getTotalQuestions(), stringKeyedDistribution);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            for (PromptBatch batch : batches) {
                String prompt = buildPrompt(batch.getChunk(), stringKeyedDistribution);

                String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="+geminiApiKey;

                Map<String, Object> textPart = Map.of("text", prompt);
                Map<String, Object> content = Map.of("parts", List.of(textPart));
                Map<String, Object> body = Map.of("contents", List.of(content));

                HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

                try {
                    ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

                    List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.getBody().get("candidates");
                    if (candidates == null || candidates.isEmpty()) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Gemini returned no candidates.");
                    }

                    Map<String, Object> contentMap = (Map<String, Object>) candidates.get(0).get("content");
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) contentMap.get("parts");
                    String raw = parts.get(0).get("text").toString();

                    // Extract JSON array from the text
                    int start = raw.indexOf("[");
                    int end = raw.lastIndexOf("]") + 1;
                    if (start >= 0 && end > start) {
                        String json = raw.substring(start, end);
                        return ResponseEntity.ok(json);
                    } else {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Gemini returned invalid JSON format.");
                    }

                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body("Error contacting Gemini: " + e.getMessage());
                }
            }

            return ResponseEntity.ok("Questions requested from Gemini.");
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to read PDF", e);
        }
    }



    private String sendPromptToOllama(String prompt) {
        String url = "http://localhost:11434/api/generate";

        Map<String, Object> body = new HashMap<>();
        body.put("model", "llama3");
        body.put("prompt", prompt);
        body.put("stream", false);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
            return response.getBody() != null ? response.getBody().get("response").toString() : "[No response]";
        } catch (Exception e) {
            return "[Error from Ollama] " + e.getMessage();
        }
    }

    private String extractTextFromPdf(Path path, int from, int to) throws IOException {
        try (PDDocument doc = PDDocument.load(Files.newInputStream(path))) {
            PDFTextStripper stripper = new PDFTextStripper();
            stripper.setStartPage(from);
            stripper.setEndPage(to);
            return stripper.getText(doc);
        }
    }

    private List<String> splitTextIntoChunks(String text, int maxWords) {
        String[] words = text.split("\\s+");
        List<String> chunks = new ArrayList<>();

        for (int i = 0; i < words.length; i += maxWords) {
            int end = Math.min(i + maxWords, words.length);
            String chunk = String.join(" ", Arrays.copyOfRange(words, i, end));
            chunks.add(chunk);
        }
        return chunks;
    }

    private List<PromptBatch> buildPromptBatches(
            List<String> chunks,
            int totalQuestions,
            Map<String, Integer> globalDistribution
    ) {
        int chunkCount = chunks.size();
        List<PromptBatch> batches = new ArrayList<>();

        int basePerChunk = totalQuestions / chunkCount;
        int remainder = totalQuestions % chunkCount;

        for (int i = 0; i < chunkCount; i++) {
            int questionsForChunk = basePerChunk + (i < remainder ? 1 : 0);

            Map<String, Integer> perType = new HashMap<>();
            for (Map.Entry<String, Integer> entry : globalDistribution.entrySet()) {
                String type = entry.getKey();
                int globalCount = entry.getValue();
                int perChunk = (int) Math.round(globalCount * ((double) questionsForChunk / totalQuestions));
                perType.put(type, perChunk);
            }

            batches.add(new PromptBatch(chunks.get(i), questionsForChunk, perType));
        }

        return batches;
    }

    private String buildPrompt(String chunk, Map<String, Integer> distribution) {
        int total = distribution.values().stream().mapToInt(i -> i).sum();

        StringBuilder sb = new StringBuilder();

        sb.append("You are an assistant that generates educational questions in JSON format only.\n\n");

        sb.append("Your task is to:\n");
        sb.append("- Generate exactly ").append(total).append(" questions based on the text excerpt below.\n");
        sb.append("- Use the following type distribution:\n");
        distribution.forEach((type, count) ->
                sb.append("  - ").append(count).append(" ").append(type).append("\n")
        );
        sb.append("\nFormatting & Rules:\n");
        sb.append("- Your entire response MUST be a valid JSON array. No explanation, commentary, or content outside the array.\n");
        sb.append("- Each question must include both a 'question' and an 'answer' field.\n");
        sb.append("- The answer does not have to be perfect, but must be factually correct and not strange or fabricated.\n");
        sb.append("- Use natural language for questions — do not start every question with 'What is...'.\n");

        sb.append("\nQuestion type formats:\n");
        sb.append("- MULTIPLE_CHOICE:\n");
        sb.append("  • The question must include 4 answer options written inline as part of the question.\n");
        sb.append("  • The answer field should contain one or more of those options exactly as written.\n");
        sb.append("- TRUE_FALSE:\n");
        sb.append("  • Provide a factual statement in the question.\n");
        sb.append("  • The answer must be either \"TRUE\" or \"FALSE\".\n");
        sb.append("- SHORT_ANSWER:\n");
        sb.append("  • The answer should be concise, between 1 and 3 words.\n");
        sb.append("  • Use this type for direct, factual look-up answers.\n");
        sb.append("- ESSAY:\n");
        sb.append("  • The answer should be one or two informative sentences.\n");
        sb.append("  • Perfection is not required, but keep it coherent and relevant.\n");

        sb.append("\nJSON Format (strictly follow this structure):\n");
        sb.append("[\n");
        sb.append("  {\n");
        sb.append("    \"type\": \"MULTIPLE_CHOICE\",\n");
        sb.append("    \"question\": \"Which of the following are fruits? A) Carrot B) Banana C) Potato D) Apple\",\n");
        sb.append("    \"answer\": \"Banana, Apple\"\n");
        sb.append("  },\n");
        sb.append("  ...\n");
        sb.append("]\n");

        sb.append("\nText excerpt:\n\"\"\"\n").append(chunk).append("\n\"\"\"");

        return sb.toString();
    }
}

class PromptBatch {
    private String chunk;
    private int totalQuestions;
    private Map<String, Integer> typeDistribution;

    public PromptBatch(String chunk, int totalQuestions, Map<String, Integer> typeDistribution) {
        this.chunk = chunk;
        this.totalQuestions = totalQuestions;
        this.typeDistribution = typeDistribution;
    }

    public String getChunk() { return chunk; }
    public int getTotalQuestions() { return totalQuestions; }
    public Map<String, Integer> getTypeDistribution() { return typeDistribution; }
}

