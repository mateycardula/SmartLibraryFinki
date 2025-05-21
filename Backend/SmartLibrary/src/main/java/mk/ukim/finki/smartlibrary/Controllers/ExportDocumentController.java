package mk.ukim.finki.smartlibrary.Controllers;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import jakarta.transaction.Transactional;
import mk.ukim.finki.smartlibrary.DTOs.ExportPdfRequestDTO;
import mk.ukim.finki.smartlibrary.Enums.FileType;
import mk.ukim.finki.smartlibrary.Enums.QuestionType;
import mk.ukim.finki.smartlibrary.Models.ExportDocument;
import mk.ukim.finki.smartlibrary.Models.GeneratedContent;
import mk.ukim.finki.smartlibrary.Models.User;
import mk.ukim.finki.smartlibrary.Repository.ExportDocumentRepository;
import mk.ukim.finki.smartlibrary.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/exports")
public class ExportDocumentController {

    private final ExportDocumentRepository exportRepo;
    private final UserRepository userRepo;

    @Value("${export.directory:./exported-documents}")
    private String exportDirectory;

    public ExportDocumentController(ExportDocumentRepository exportRepo, UserRepository userRepo) {
        this.exportRepo = exportRepo;
        this.userRepo = userRepo;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<?> generateAndSaveExport(@RequestBody ExportPdfRequestDTO dto) {
        User user = userRepo.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String originalFileName = "export_" + UUID.randomUUID() + ".pdf";
        String relativePath = Paths.get("exported-documents", originalFileName).toString();
        Path exportFilePath = Paths.get(relativePath).toAbsolutePath().normalize();


        try {
            Files.createDirectories(exportFilePath.getParent());

            Document pdfDoc = new Document();
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PdfWriter.getInstance(pdfDoc, baos);
            pdfDoc.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Font questionFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
            Font answerFont = FontFactory.getFont(FontFactory.HELVETICA, 11);

            pdfDoc.add(Chunk.NEWLINE);

            int questionNumber = 1;
            for (var content : dto.getQuestions()) {
                pdfDoc.add(new Paragraph(questionNumber + ". " + content.getQuestion(), questionFont));

                Paragraph answerPara = new Paragraph("Answer: " + content.getAnswer(), answerFont);
                answerPara.setIndentationLeft(20f);
                pdfDoc.add(answerPara);

                pdfDoc.add(Chunk.NEWLINE);
                questionNumber++;
            }

            pdfDoc.close();

            Files.write(exportFilePath, baos.toByteArray());

            ExportDocument export = new ExportDocument();
            export.setUser(user);
            export.setExportedAt(new Date());
            export.setFileName(originalFileName);
            export.setFileType(FileType.PDF);
            export.setFilePath(relativePath);

            exportRepo.save(export);

            return ResponseEntity.ok().body(Map.of(
                    "exportId", export.getId(),
                    "fileName", export.getFileName()
            ));

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to create PDF: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getExportById(@PathVariable Long id) {
        return exportRepo.findById(id)
                .map(export -> Map.of(
                        "id", export.getId(),
                        "fileName", export.getFileName(),
                        "filePath", export.getFilePath(),
                        "fileType", export.getFileType().toString(),
                        "exportedAt", export.getExportedAt()
                ))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/file")
    public ResponseEntity<?> downloadExportFile(@PathVariable Long id) {
        return exportRepo.findById(id)
                .map(export -> {
                    Path path = Paths.get(export.getFilePath()).toAbsolutePath();
                    if (!Files.exists(path)) {
                        return ResponseEntity.notFound().build();
                    }

                    try {
                        byte[] content = Files.readAllBytes(path);
                        return ResponseEntity.ok()
                                .header("Content-Disposition", "inline; filename=" + export.getFileName())
                                .contentType(MediaType.APPLICATION_PDF)
                                .body(content);
                    } catch (IOException e) {
                        return ResponseEntity.internalServerError().body("Failed to read PDF file.");
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExportTitle(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String newTitle = body.get("fileName");

        if (newTitle == null || newTitle.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid file name");
        }

        return exportRepo.findById(id)
                .map(export -> {
                    export.setFileName(newTitle.trim());
                    exportRepo.save(export);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}/summary")
    public ResponseEntity<?> getExportSummariesByUser(@PathVariable Long userId) {
        return userRepo.findById(userId)
                .map(user -> exportRepo.findAllByUserId(userId).stream()
                        .map(doc -> Map.of(
                                "id", doc.getId(),
                                "fileName", doc.getFileName()
                        ))
                        .toList())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
