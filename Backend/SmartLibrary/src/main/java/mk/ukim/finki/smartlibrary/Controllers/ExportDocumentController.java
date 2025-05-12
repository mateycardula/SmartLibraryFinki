package mk.ukim.finki.smartlibrary.Controllers;

import mk.ukim.finki.smartlibrary.Models.ExportDocument;
import mk.ukim.finki.smartlibrary.Service.ExportDocumentService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/exported-documents")
public class ExportDocumentController {

    private final ExportDocumentService exportDocumentService;

    public ExportDocumentController(ExportDocumentService exportDocumentService) {
        this.exportDocumentService = exportDocumentService;
    }

    @GetMapping
    public List<ExportDocument> getAllExportedDocuments() {
        return exportDocumentService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<ExportDocument> getExportDocumentById(@PathVariable Long id) {
        return exportDocumentService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExportDocument createExportDocument(@RequestBody ExportDocument exportDocument) {
        return exportDocumentService.create(exportDocument);
    }

    @PutMapping("/{id}")
    public Optional<ExportDocument> updateExportDocument(@PathVariable Long id, @RequestBody ExportDocument exportDocument) {
        return exportDocumentService.update(id, exportDocument);
    }

    @DeleteMapping("/{id}")
    public boolean deleteExportDocument(@PathVariable Long id) {
        return exportDocumentService.delete(id);
    }
}
