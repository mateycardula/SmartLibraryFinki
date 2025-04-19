package mk.ukim.finki.smartlibrary.Service;

import mk.ukim.finki.smartlibrary.Models.UploadDocument;
import mk.ukim.finki.smartlibrary.Repository.UploadDocumentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UploadDocumentService {

    private final UploadDocumentRepository repo;

    public UploadDocumentService(UploadDocumentRepository repo) {
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

    public Optional<UploadDocument> update(Long id, UploadDocument in) {
        return repo.findById(id).map(existing -> {
            existing.setFileName(in.getFileName());
            existing.setFileType(in.getFileType());
            existing.setProcessed(in.isProcessed());
            existing.setUploadedDate(in.getUploadedDate());
            existing.setUser(in.getUser());
            existing.setCategories(in.getCategories());
            return repo.save(existing);
        });
    }

    public boolean delete(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}
