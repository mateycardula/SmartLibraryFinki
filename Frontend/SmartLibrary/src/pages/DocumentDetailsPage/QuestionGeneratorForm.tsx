import React, { useState } from "react";

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
        const newDist = { ...distribution, [type]: value };
        let total = Object.values(newDist).reduce((a, b) => a + b, 0);

        if (total > totalQuestions) {
            let overflow = total - totalQuestions;
            const keys = (Object.keys(newDist) as QuestionType[]).filter((t) => t !== type);
            for (const k of keys) {
                if (overflow <= 0) break;
                const reduceBy = Math.min(newDist[k], overflow);
                newDist[k] -= reduceBy;
                overflow -= reduceBy;
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
        <div
            style={{
                marginTop: "2rem",
                padding: "2rem 2.5rem",
                borderRadius: "16px",
                background: "#f8fafc",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                width: "100%",
            }}
        >
            <h2 style={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: "1.5rem" }}>
                Генерирај прашања и одговори
            </h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
                    <div style={{ flex: "1 1 200px", minWidth: "200px" }}>
                        <label className="block font-medium text-gray-700">Вкупно прашања</label>
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
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    {Object.entries(QUESTION_TYPE_LABELS).map(([key, label]) => (
                        <div key={key} style={{ flex: "1 1 200px", minWidth: "200px" }}>
                            <label className="block font-medium text-gray-700">{label}</label>
                            <input
                                type="number"
                                min={0}
                                value={distribution[key as QuestionType]}
                                onChange={(e) => updateDistribution(key as QuestionType, Number(e.target.value))}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                    ))}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
                    <div style={{ flex: "1 1 200px", minWidth: "200px" }}>
                        <label className="block font-medium text-gray-700">Од страница</label>
                        <input
                            type="number"
                            min={1}
                            value={pageFrom}
                            onChange={(e) => setPageFrom(Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div style={{ flex: "1 1 200px", minWidth: "200px" }}>
                        <label className="block font-medium text-gray-700">До страница</label>
                        <input
                            type="number"
                            min={pageFrom}
                            value={pageTo}
                            onChange={(e) => setPageTo(Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                </div>

                <div
                    style={{
                        background: "#e2e8f0",
                        padding: "0.75rem 1rem",
                        borderRadius: "8px",
                        fontSize: "0.95rem",
                        color: "#334155",
                    }}
                >
                    <strong>Дистрибуција:</strong>{" "}
                    {Object.entries(distribution).map(([key, value]) => (
                        <span key={key} style={{ marginRight: "1.25rem" }}>
              {value} {QUESTION_TYPE_LABELS[key as QuestionType].toLowerCase()}
            </span>
                    ))}{" "}
                    (стр. {pageFrom} до {pageTo})
                </div>

                <div style={{ textAlign: "right" }}>
                    <button
                        type="submit"
                        style={{
                            background: "#2563eb",
                            color: "#fff",
                            padding: "0.6rem 1.4rem",
                            borderRadius: "8px",
                            border: "none",
                            fontWeight: "bold",
                            cursor: "pointer",
                            fontSize: "1rem",
                        }}
                    >
                        Генерирај
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QuestionGeneratorForm;
