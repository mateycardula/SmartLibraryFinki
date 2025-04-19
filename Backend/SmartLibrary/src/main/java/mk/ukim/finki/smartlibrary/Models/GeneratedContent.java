package mk.ukim.finki.smartlibrary.Models;

import jakarta.persistence.*;
import mk.ukim.finki.smartlibrary.Enums.QuestionType;

@Entity
@Table(name = "generated_content")
public class GeneratedContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String question;

    @Column(columnDefinition = "TEXT")
    private String answer;

    @Enumerated(EnumType.STRING)
    private QuestionType type;

    private String instructions;

    private String language;

    @ManyToOne
    @JoinColumn(name = "document_id")
    private UploadDocument document;
    @ManyToOne
    @JoinColumn(name = "export_id")
    private ExportDocument exportedDocument;


    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }

    public QuestionType getType() { return type; }
    public void setType(QuestionType type) { this.type = type; }

    public String getInstructions() { return instructions; }
    public void setInstructions(String instructions) { this.instructions = instructions; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public UploadDocument getDocument() { return document; }
    public void setDocument(UploadDocument document) { this.document = document; }

    public ExportDocument getExportedDocument() {
        return exportedDocument;
    }

    public void setExportedDocument(ExportDocument exportedDocument) {
        this.exportedDocument = exportedDocument;
    }
}
