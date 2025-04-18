package mk.ukim.finki.smartlibrary.Repository;

import mk.ukim.finki.smartlibrary.Models.UploadDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UploadDocumentRepository extends JpaRepository<UploadDocument, Long> {
    List<UploadDocument> findByUserId(Long userId);
}
