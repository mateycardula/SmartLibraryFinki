package mk.ukim.finki.smartlibrary.Service;

import mk.ukim.finki.smartlibrary.DTOs.DocumentSummaryDTO;
import mk.ukim.finki.smartlibrary.DTOs.UpdateDocumentDTO;
import mk.ukim.finki.smartlibrary.DTOs.UploadDocumentDTO;
import mk.ukim.finki.smartlibrary.Enums.FileType;
import mk.ukim.finki.smartlibrary.Models.Category;
import mk.ukim.finki.smartlibrary.Models.UploadDocument;
import mk.ukim.finki.smartlibrary.Models.User;
import mk.ukim.finki.smartlibrary.Repository.UploadDocumentRepository;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UploadDocumentService {

    private final UploadDocumentRepository repo;
    private final UserService userService;
    private final CategoryService categoryService;

    public UploadDocumentService(UploadDocumentRepository repo, UserService userService, CategoryService categoryService) {
        this.categoryService = categoryService;
        this.userService = userService;
        this.repo = repo;
    }

    public List<UploadDocument> findAll() {
        return repo.findAll();
    }

    public Optional<UploadDocument> findById(Long id) {
        return repo.findById(id);
    }

    public List<UploadDocument> findByUserId(Long userId) {
        return repo.findByUserId(userId);
    }

    public UploadDocument create(UploadDocument doc) {
        return repo.save(doc);
    }

    public Optional<UploadDocument> update(Long id, UpdateDocumentDTO dto) {
        if (dto.getCategoryIds() == null || dto.getCategoryIds().isEmpty()) {
            throw new IllegalArgumentException("Document must have at least one category.");
        }

        return repo.findById(id).map(existing -> {
            existing.setFileName(dto.getFileName());
            existing.setDescription(dto.getDescription());
            existing.setFileType(FileType.valueOf(dto.getFileType()));
            existing.setProcessed(dto.isProcessed());
            existing.setUploadedDate(dto.getUploadedDate());

            User user = userService.findById(dto.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            existing.setUser(user);

            List<Category> categories = dto.getCategoryIds().stream()
                    .map(catId -> categoryService.findById(catId).orElseThrow(() -> new RuntimeException("Category not found: " + catId)))
                    .collect(Collectors.toList());

            existing.setCategories(new ArrayList<>(categories));

            return repo.save(existing);
        });
    }


    public boolean delete(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }

    public Long upload(UploadDocumentDTO uploadDocumentDTO) {
        MultipartFile file = uploadDocumentDTO.getFile();

        User user = userService.findById(uploadDocumentDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryService.findById(uploadDocumentDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        List<Category> categories = new ArrayList<>();
        categories.add(category);

        String originalFileName = file.getOriginalFilename();
        if (originalFileName == null) {
            throw new RuntimeException("Invalid file");
        }

        FileType fileType = FileType.fromFileName(originalFileName);

        String uploadDir = "uploads";
        String storedFileName = UUID.randomUUID() + "_" + originalFileName;
        Path filePath = Paths.get(uploadDir, storedFileName);

        try {
            Files.createDirectories(filePath.getParent());
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }

        UploadDocument uploadDocument = new UploadDocument();
        uploadDocument.setFileName(originalFileName);
        uploadDocument.setFilePath(filePath.toString()); // ✅ string path
        uploadDocument.setDescription(uploadDocumentDTO.getDescription());
        uploadDocument.setProcessed(false);
        uploadDocument.setUploadedDate(new java.util.Date());
        uploadDocument.setUser(user);
        uploadDocument.setCategories(categories);
        category.getDocuments().add(uploadDocument);
        uploadDocument.setFileType(fileType);

        return repo.save(uploadDocument).getId();
    }

    public List<DocumentSummaryDTO> getSummariesByUser(Long userId) {
        return repo.findByUserId(userId).stream()
                .map(doc -> {
                    List<String> categoryNames = doc.getCategories().stream()
                            .map(Category::getName)
                            .collect(Collectors.toList());

                    return new DocumentSummaryDTO(
                            doc.getId(),
                            doc.getFileName(),
                            doc.getDescription(),
                            doc.getFileType().toString(),
                            doc.getUploadedDate(),
                            categoryNames
                    );
                })
                .collect(Collectors.toList());
    }
}
