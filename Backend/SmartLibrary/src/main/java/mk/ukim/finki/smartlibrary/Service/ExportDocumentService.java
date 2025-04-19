package mk.ukim.finki.smartlibrary.Service;

import mk.ukim.finki.smartlibrary.Models.ExportDocument;
import mk.ukim.finki.smartlibrary.Repository.ExportDocumentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExportDocumentService {

    private final ExportDocumentRepository repo;

    public ExportDocumentService(ExportDocumentRepository repo) {
        this.repo = repo;
    }

    public List<ExportDocument> findAll() {
        return repo.findAll();
    }

    public Optional<ExportDocument> findById(Long id) {
        return repo.findById(id);
    }

    public ExportDocument create(ExportDocument ed) {
        return repo.save(ed);
    }

    public Optional<ExportDocument> update(Long id, ExportDocument in) {
        return repo.findById(id).map(existing -> {
            existing.setFileName(in.getFileName());
            existing.setFileType(in.getFileType());
            existing.setFileContent(in.getFileContent());
            existing.setExportedAt(in.getExportedAt());
            existing.setUser(in.getUser());
            return repo.save(existing);
        });
    }

    public boolean delete(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}
