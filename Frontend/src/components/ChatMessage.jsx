const ChatMessage = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 8,
        gap: 10,
        alignItems: "flex-end",
        animation: "fadeIn 0.25s ease",
      }}
    >
      {!isUser && (
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4285f4, #ea4335)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          ✦
        </div>
      )}

      <div
        style={{
          maxWidth: "70%",
          padding: "10px 16px",
          borderRadius: isUser ? "20px 20px 4px 20px" : "4px 20px 20px 20px",
          background: isUser ? "#1e3a5f" : "#1e2124",
          color: "#e3e3e3",
          fontSize: 14,
          lineHeight: 1.6,
          fontFamily: "'Google Sans', sans-serif",
          border: isUser ? "1px solid #2a4a7f" : "1px solid #2e3135",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }}
      >
        {message.text}
      </div>

      {isUser && (
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#c026d3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
            flexShrink: 0,
            fontFamily: "'Google Sans', sans-serif",
          }}
        >
          
        </div>
      )}
    </div>
  );
};

export default ChatMessage;