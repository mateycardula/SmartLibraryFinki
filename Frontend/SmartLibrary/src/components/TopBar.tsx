import React from "react";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  title?: string;
  rightAction?: React.ReactNode;
  showBackButton?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({
  title,
  rightAction,
  showBackButton = true,
}) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: "1rem",
        borderBottom: "1px solid #e2e8f0",
        marginBottom: "1rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "transparent",
              border: "none",
              color: "#2563eb",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ← Назад
          </button>
        )}
        {title && <h2 style={{ margin: 0 }}>{title}</h2>}
      </div>

      <div>{rightAction}</div>
    </div>
  );
};

export default TopBar;
