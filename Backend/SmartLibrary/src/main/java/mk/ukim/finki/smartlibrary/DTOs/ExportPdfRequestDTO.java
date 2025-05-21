package mk.ukim.finki.smartlibrary.DTOs;

import mk.ukim.finki.smartlibrary.Enums.QuestionType;
import java.util.List;

public class ExportPdfRequestDTO {
    private Long userId;
    private List<QuestionItem> questions;

    public static class QuestionItem {
        private String question;
        private String answer;
        private QuestionType type;

        public String getQuestion() { return question; }
        public void setQuestion(String question) { this.question = question; }

        public String getAnswer() { return answer; }
        public void setAnswer(String answer) { this.answer = answer; }

        public QuestionType getType() { return type; }
        public void setType(QuestionType type) { this.type = type; }
    }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public List<QuestionItem> getQuestions() { return questions; }
    public void setQuestions(List<QuestionItem> questions) { this.questions = questions; }
}
