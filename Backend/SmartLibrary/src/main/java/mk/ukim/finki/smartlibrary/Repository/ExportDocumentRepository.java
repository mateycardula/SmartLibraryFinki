package mk.ukim.finki.smartlibrary.Repository;

import mk.ukim.finki.smartlibrary.Models.ExportDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExportDocumentRepository extends JpaRepository<ExportDocument, Long> {
}
