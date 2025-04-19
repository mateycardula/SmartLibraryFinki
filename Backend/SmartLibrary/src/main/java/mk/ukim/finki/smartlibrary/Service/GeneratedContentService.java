package mk.ukim.finki.smartlibrary.Service;

import mk.ukim.finki.smartlibrary.Models.GeneratedContent;
import mk.ukim.finki.smartlibrary.Repository.GeneratedContentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GeneratedContentService {

    private final GeneratedContentRepository repo;

    public GeneratedContentService(GeneratedContentRepository repo) {
        this.repo = repo;
    }

    public List<GeneratedContent> findAll() {
        return repo.findAll();
    }

    public Optional<GeneratedContent> findById(Long id) {
        return repo.findById(id);
    }

    public GeneratedContent create(GeneratedContent gc) {
        return repo.save(gc);
    }

    public Optional<GeneratedContent> update(Long id, GeneratedContent in) {
        return repo.findById(id).map(existing -> {
            existing.setQuestion(in.getQuestion());
            existing.setAnswer(in.getAnswer());
            existing.setType(in.getType());
            existing.setInstructions(in.getInstructions());
            existing.setLanguage(in.getLanguage());
            existing.setDocument(in.getDocument());
            existing.setExportedDocument(in.getExportedDocument());
            return repo.save(existing);
        });
    }

    public boolean delete(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}
