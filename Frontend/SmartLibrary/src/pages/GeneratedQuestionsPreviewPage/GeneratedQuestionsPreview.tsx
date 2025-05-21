// src/pages/GeneratedQuestionsPreview.tsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./GeneraetdQuestionsPreview.css";

interface Question {
    question: string;
    answer: string;
    type: string;
}

const GeneratedQuestionsPreview: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const config = location.state;

    const [questions, setQuestions] = useState<Question[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const generateQuestions = async () => {
            setLoading(true);

            try {
                const res = await fetch("http://localhost:8080/api/ollama/generate-questions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(config),
                });

                if (!res.ok) throw new Error("Failed to call generation endpoint");

                const questions: Question[] = await res.json();
                setQuestions(questions);
            } catch (err) {
                console.error("❌ Error while calling backend:", err);
            } finally {
                setLoading(false);
            }
        };

        generateQuestions();
    }, [config]);

    const handleEdit = (index: number, field: keyof Question, value: string) => {
        setQuestions((prev) => {
            if (!prev) return prev;
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const handleRemove = (index: number) => {
        setQuestions((prev) => prev?.filter((_, i) => i !== index) || null);
    };

    if (loading) {
        return (
            <div className="loader-container">
                <h2>⏳ Генерираме прашања...</h2>
                <p>AI моделот ги креира прашањата врз база на избраните параметри. Ова може да потрае неколку секунди.</p>
            </div>
        );
    }

    return (
        <div className="preview-container">
            <h1>Преглед на генерирани прашања</h1>

            {questions && questions.length > 0 ? (
                <div className="cards-column">
                    {questions.map((q, idx) => (
                        <div key={idx} className="question-card full-width">
                            <div className="question-type">Тип: {q.type}</div>

                            <input
                                type="text"
                                value={q.question}
                                onChange={(e) => handleEdit(idx, "question", e.target.value)}
                                placeholder="Прашање..."
                                className="question-input"
                            />

                            <div className="answer-label">Одговор:</div>
                            <textarea
                                value={q.answer}
                                onChange={(e) => handleEdit(idx, "answer", e.target.value)}
                                className="answer-textarea"
                            />

                            <button
                                onClick={() => handleRemove(idx)}
                                className="delete-button"
                            >
                                🗑 Избриши прашање
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-questions">Нема прашања за прикажување.</p>
            )}

            <div className="actions">
                <button onClick={() => navigate(-1)} className="back-button">
                    ⬅ Назад
                </button>
                <button onClick={() => alert("Saving to backend not implemented yet")} className="save-button">
                    💾 Зачувај прашања
                </button>
            </div>
        </div>
    );
};

export default GeneratedQuestionsPreview;
