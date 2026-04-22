import { useState } from "react";

const ChatInput = ({ onSend, loading }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || loading) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <div
      style={{
        padding: "12px 24px 20px",
        maxWidth: 700,
        margin: "0 auto",
        width: "100%",
        flexShrink: 0,
      }}
    >
      {/* Input Box */}
      <div
        style={{
          background: "#1e2124",
          borderRadius: 24,
          padding: "12px 16px 10px",
          border: "1px solid #2e3135",
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask MAYA"
          rows={1}
          disabled={loading}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#e3e3e3",
            fontSize: 15,
            fontFamily: "'Google Sans', sans-serif",
            lineHeight: 1.5,
            maxHeight: 200,
            overflow: "auto",
            resize: "none",
            paddingBottom: 8,
            opacity: loading ? 0.5 : 1,
          }}
        />

        {/* Bottom Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Left Icons */}
          <div style={{ display: "flex", gap: 12, color: "#9aa0a6" }}>
            <span style={{ cursor: "pointer", fontSize: 20 }}>+</span>
            <span style={{ cursor: "pointer", fontSize: 18 }}>⚙</span>
          </div>

          {/* Right: Fast + Send/Mic */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, color: "#9aa0a6", cursor: "pointer" }}>Fast ▾</span>

            {input.trim() ? (
              <button
                onClick={handleSend}
                disabled={loading}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: loading ? "#3c4043" : "#4285f4",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 16,
                  transition: "background 0.2s",
                }}
              >
                ↑
              </button>
            ) : (
              <span style={{ fontSize: 20, color: "#9aa0a6", cursor: "pointer" }}>🎤</span>
            )}
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p
        style={{
          textAlign: "center",
          fontSize: 11,
          color: "#5f6368",
          marginTop: 10,
          fontFamily: "'Google Sans', sans-serif",
        }}
      >
        MAYA can make mistakes. Check important info.
      </p>
    </div>
  );
};

export default ChatInput;