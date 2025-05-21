import React, { useState } from "react";
import "./QuestionGeneratorForm.css";

type QuestionType = "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER" | "ESSAY";

const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
    MULTIPLE_CHOICE: "Повеќекратен избор",
    TRUE_FALSE: "Точно / Неточно",
    SHORT_ANSWER: "Краток одговор",
    ESSAY: "Есеј",
};

interface Props {
    documentId: number;
    onSubmit: (data: {
        documentId: number;
        total: number;
        distribution: Record<QuestionType, number>;
        pageFrom: number;
        pageTo: number;
    }) => void;
}

const QuestionGeneratorForm: React.FC<Props> = ({ onSubmit, documentId }) => {
    const [totalQuestions, setTotalQuestions] = useState(10);
    const [distribution, setDistribution] = useState<Record<QuestionType, number>>({
        MULTIPLE_CHOICE: 3,
        TRUE_FALSE: 2,
        SHORT_ANSWER: 3,
        ESSAY: 2,
    });
    const [pageFrom, setPageFrom] = useState(1);
    const [pageTo, setPageTo] = useState(5);

    const updateDistribution = (type: QuestionType, value: number) => {
        value = Math.max(0, value); // Prevent negatives
        const currentTotal = Object.values(distribution).reduce((a, b) => a + b, 0);
        const delta = value - distribution[type];
        const newDist = { ...distribution, [type]: value };

        let remaining = totalQuestions - Object.values(newDist).reduce((a, b) => a + b, 0);

        const otherTypes = (Object.keys(newDist) as QuestionType[]).filter(t => t !== type);

        while (remaining !== 0 && otherTypes.length > 0) {
            for (const t of otherTypes) {
                if (remaining === 0) break;

                const adjust = remaining > 0 ? 1 : -1;

                if (remaining > 0 || newDist[t] > 0) {
                    newDist[t] += adjust;
                    remaining -= adjust;
                }
            }
        }

        setDistribution(newDist);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            documentId,
            total: totalQuestions,
            distribution,
            pageFrom,
            pageTo,
        });
    };

    return (
        <div className="generator-form">
            <h2>Генерирај прашања и одговори</h2>
            <form onSubmit={handleSubmit}>
                <div className="section">
                    <label>Вкупно прашања</label>
                    <input
                        type="number"
                        min={1}
                        value={totalQuestions}
                        onChange={(e) => {
                            const newTotal = Number(e.target.value);
                            setTotalQuestions(newTotal);
                            const totalCurrent = Object.values(distribution).reduce((a, b) => a + b, 0);
                            if (totalCurrent > newTotal) {
                                const ratio = newTotal / totalCurrent;
                                const scaled = Object.fromEntries(
                                    Object.entries(distribution).map(([k, v]) => [k, Math.floor(v * ratio)])
                                ) as Record<QuestionType, number>;
                                setDistribution(scaled);
                            }
                        }}
                    />
                </div>

                <div className="section">
                    <label>Дистрибуција по тип:</label>
                    <table className="dist-table">
                        <thead>
                        <tr>
                            {Object.values(QUESTION_TYPE_LABELS).map((label) => (
                                <th key={label}>{label}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {(Object.keys(QUESTION_TYPE_LABELS) as QuestionType[]).map((type) => (
                                <td key={type}>
                                    <input
                                        type="number"
                                        min={0}
                                        value={distribution[type]}
                                        onChange={(e) => updateDistribution(type, Number(e.target.value))}
                                    />
                                </td>
                            ))}
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="section">
                    <label>Опсег на страници:</label>
                    <div className="range-row">
                        <div>
                            <label>Од:</label>
                            <input
                                type="number"
                                min={1}
                                value={pageFrom}
                                onChange={(e) => setPageFrom(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label>До:</label>
                            <input
                                type="number"
                                min={pageFrom}
                                value={pageTo}
                                onChange={(e) => setPageTo(Number(e.target.value))}
                            />
                        </div>
                    </div>
                </div>

                <div className="summary-box">
                    <strong>Дистрибуција:</strong>{" "}
                    {Object.entries(distribution).map(([key, value]) => (
                        <span key={key} style={{ marginRight: "1.25rem" }}>
                            {value} {QUESTION_TYPE_LABELS[key as QuestionType].toLowerCase()}
                        </span>
                    ))}{" "}
                    (стр. {pageFrom} до {pageTo})
                </div>

                <button type="submit" className="submit-button">Генерирај</button>
            </form>
        </div>
    );
};

export default QuestionGeneratorForm;
