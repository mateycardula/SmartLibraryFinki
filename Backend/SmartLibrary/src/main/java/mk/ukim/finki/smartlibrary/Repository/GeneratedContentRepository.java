package mk.ukim.finki.smartlibrary.Repository;

import mk.ukim.finki.smartlibrary.Models.GeneratedContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneratedContentRepository extends JpaRepository<GeneratedContent, Long> {
}
