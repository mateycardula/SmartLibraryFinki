package mk.ukim.finki.smartlibrary.DTOs;

import mk.ukim.finki.smartlibrary.Enums.QuestionType;

import java.util.Map;

public class QuestionGenerationRequestDTO {

    private Long documentId;
    private int totalQuestions;
    private Map<QuestionType, Integer> distribution;
    private int pageFrom;
    private int pageTo;

    public Long getDocumentId() { return documentId; }
    public void setDocumentId(Long documentId) { this.documentId = documentId; }

    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }

    public Map<QuestionType, Integer> getDistribution() { return distribution; }
    public void setDistribution(Map<QuestionType, Integer> distribution) { this.distribution = distribution; }

    public int getPageFrom() { return pageFrom; }
    public void setPageFrom(int pageFrom) { this.pageFrom = pageFrom; }

    public int getPageTo() { return pageTo; }
    public void setPageTo(int pageTo) { this.pageTo = pageTo; }
}
