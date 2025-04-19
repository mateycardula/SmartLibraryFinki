package mk.ukim.finki.smartlibrary.Service;

import mk.ukim.finki.smartlibrary.Models.Category;
import mk.ukim.finki.smartlibrary.Repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository repo;

    public CategoryService(CategoryRepository repo) {
        this.repo = repo;
    }

    public List<Category> findAll() {
        return repo.findAll();
    }

    public Optional<Category> findById(Long id) {
        return repo.findById(id);
    }

    public Category create(Category c) {
        return repo.save(c);
    }

    public Optional<Category> update(Long id, Category in) {
        return repo.findById(id).map(existing -> {
            existing.setName(in.getName());
            existing.setDocuments(in.getDocuments());
            return repo.save(existing);
        });
    }

    public boolean delete(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}
