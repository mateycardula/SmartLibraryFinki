package mk.ukim.finki.smartlibrary.Controllers;

import mk.ukim.finki.smartlibrary.Models.GeneratedContent;
import mk.ukim.finki.smartlibrary.Service.GeneratedContentService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/generated-contents")
public class GeneratedContentController {

    private final GeneratedContentService generatedContentService;

    public GeneratedContentController(GeneratedContentService generatedContentService) {
        this.generatedContentService = generatedContentService;
    }

    @GetMapping
    public List<GeneratedContent> getAllGeneratedContents() {
        return generatedContentService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<GeneratedContent> getGeneratedContentById(@PathVariable Long id) {
        return generatedContentService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public GeneratedContent createGeneratedContent(@RequestBody GeneratedContent generatedContent) {
        return generatedContentService.create(generatedContent);
    }

    @PutMapping("/{id}")
    public Optional<GeneratedContent> updateGeneratedContent(@PathVariable Long id, @RequestBody GeneratedContent generatedContent) {
        return generatedContentService.update(id, generatedContent);
    }

    @DeleteMapping("/{id}")
    public boolean deleteGeneratedContent(@PathVariable Long id) {
        return generatedContentService.delete(id);
    }
}
