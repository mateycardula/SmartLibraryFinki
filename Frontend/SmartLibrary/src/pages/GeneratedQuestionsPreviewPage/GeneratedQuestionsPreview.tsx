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
    const [saving, setSaving] = useState(false);


    const user = JSON.parse(localStorage.getItem("user") || "null");

    const handleSaveQuestions = async () => {
        if (!questions || !user) return;
        setSaving(true);

        const payload = {
            userId: user.id,
            questions: questions.map((q) => ({
                question: q.question,
                answer: q.answer,
                type: q.type,
            })),
        };

        try {
            const res = await fetch("/api/exports", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Export failed");
            const data = await res.json();

            navigate(`/exported/${data.exportId}`);
        } catch (err) {
            console.error("❌ Export failed:", err);
            alert("Неуспешно зачувување на прашањата.");
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        const generateQuestions = async () => {
            setLoading(true);

            try {

                // const mockQuestions: Question[] = [
                //     {
                //         question: "What is the definition of inclusive education?\n\nA) Education that separates students based on abilities\nB) Education that is accessible to all students without discrimination\nC) Education only for students with special needs\nD) Education in isolated settings",
                //         answer: "B) Education that is accessible to all students without discrimination",
                //         type: "MULTIPLE_CHOICE",
                //     },
                //     {
                //         question: "True or False:\n\nInclusive education promotes the full participation and learning of all students, including those with disabilities, in mainstream classrooms.",
                //         answer: "TRUE",
                //         type: "TRUE_FALSE",
                //     },
                //     {
                //         question: "Briefly describe how inclusive education benefits society as a whole.\n\nUse 2–3 sentences to summarize key community impacts.",
                //         answer: "Inclusive education fosters understanding, empathy, and collaboration among diverse learners. It helps build more accepting and equitable communities that value every individual.",
                //         type: "ESSAY",
                //     }
                // ];

                const res = await fetch("/api/ollama/generate-questions", {
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

                            <textarea
                                value={q.question}
                                onChange={(e) => handleEdit(idx, "question", e.target.value)}
                                placeholder="Прашање..."
                                className="question-textarea"
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
                <button
                    onClick={handleSaveQuestions}
                    className="save-button"
                    disabled={saving}
                >
                    {saving ? "⏳ Се зачувува..." : "💾 Зачувај прашања"}
                </button>
            </div>
        </div>
    );
};

export default GeneratedQuestionsPreview;
