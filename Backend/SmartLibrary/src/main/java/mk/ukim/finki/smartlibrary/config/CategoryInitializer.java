package mk.ukim.finki.smartlibrary.config;

import jakarta.annotation.PostConstruct;
import mk.ukim.finki.smartlibrary.Models.Category;
import mk.ukim.finki.smartlibrary.Repository.CategoryRepository;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class CategoryInitializer {

    private final CategoryRepository categoryRepository;

    public CategoryInitializer(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @PostConstruct
    public void init() {
        if (categoryRepository.count() == 0) {
            List<String> defaultCategories = List.of(
                    "Математика", "Историја", "Биологија", "Информатика", "Физика", "Географија"
            );

            defaultCategories.forEach(name -> {
                Category category = new Category();
                category.setName(name);
                categoryRepository.save(category);
            });

            System.out.println("✅ Default categories inserted.");
        }
    }
}

