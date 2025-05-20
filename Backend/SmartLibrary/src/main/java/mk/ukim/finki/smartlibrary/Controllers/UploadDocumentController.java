package mk.ukim.finki.smartlibrary.Controllers;

import mk.ukim.finki.smartlibrary.DTOs.DocumentSummaryDTO;
import mk.ukim.finki.smartlibrary.DTOs.UpdateDocumentDTO;
import mk.ukim.finki.smartlibrary.Enums.FileType;
import mk.ukim.finki.smartlibrary.Models.Category;
import mk.ukim.finki.smartlibrary.Models.UploadDocument;
import mk.ukim.finki.smartlibrary.Service.UploadDocumentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import mk.ukim.finki.smartlibrary.DTOs.UploadDocumentDTO;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/upload-documents")
public class UploadDocumentController {

    private final UploadDocumentService uploadDocumentService;

    public UploadDocumentController(UploadDocumentService uploadDocumentService) {
        this.uploadDocumentService = uploadDocumentService;
    }

    @GetMapping
    public List<UploadDocument> getAllUploadDocuments() {
        return uploadDocumentService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<UploadDocument> getUploadDocumentById(@PathVariable Long id) {
        return uploadDocumentService.findById(id);
    }

    @GetMapping("/user/{userId}")
    public List<UploadDocument> getUploadDocumentsByUserId(@PathVariable Long userId) {
        return uploadDocumentService.findByUserId(userId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UploadDocument createUploadDocument(@RequestBody UploadDocument uploadDocument) {
        return uploadDocumentService.create(uploadDocument);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DocumentSummaryDTO> updateUploadDocument(
            @PathVariable Long id,
            @RequestBody UpdateDocumentDTO uploadDocument
    ) {
        Optional<UploadDocument> updatedOpt = uploadDocumentService.update(id, uploadDocument);

        if (updatedOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        UploadDocument updated = updatedOpt.get();

        Long updatedId = updated.getId();
        String fileName = updated.getFileName();
        Date uploadedDate = updated.getUploadedDate();
        FileType fileTypeEnum = updated.getFileType();
        String fileType = fileTypeEnum != null ? fileTypeEnum.toString() : "UNKNOWN";

        List<Category> categories = updated.getCategories();
        List<String> categoryNames = new ArrayList<>();
        for (Category cat : categories) {
            categoryNames.add(cat.getName());
        }

        DocumentSummaryDTO dto = new DocumentSummaryDTO();
        dto.setId(updatedId);
        dto.setFileName(fileName);
        dto.setUploadedDate(uploadedDate);
        dto.setFileType(fileType);
        dto.setCategoryNames(categoryNames);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public boolean deleteUploadDocument(@PathVariable Long id) {
        return uploadDocumentService.delete(id);
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Long> uploadDocument(@ModelAttribute UploadDocumentDTO dto) {
        Long id = uploadDocumentService.upload(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    @GetMapping("/user/{userId}/summary")
    public List<DocumentSummaryDTO> getDocumentSummaries(@PathVariable Long userId) {
        return uploadDocumentService.getSummariesByUser(userId);
    }

    @GetMapping("/{id}/file")
    public ResponseEntity<byte[]> getDocumentFile(@PathVariable Long id) {
        UploadDocument document = uploadDocumentService.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Document not found"));

        Path path = Paths.get(document.getFilePath());

        if (!Files.exists(path)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found on disk");
        }

        try {
            byte[] fileContent = Files.readAllBytes(path);
            String fileName = document.getFileName();

            String contentType = Files.probeContentType(path);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header("Content-Disposition", "inline; filename=\"" + fileName + "\"")
                    .body(fileContent);

        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error reading file", e);
        }
    }
}
