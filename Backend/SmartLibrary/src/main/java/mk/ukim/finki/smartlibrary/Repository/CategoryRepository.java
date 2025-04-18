package mk.ukim.finki.smartlibrary.Repository;

import mk.ukim.finki.smartlibrary.Models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
