import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const BACKEND_URL = "https://ai-chat-backend-vbrm.onrender.com";

const TypingDots = () => (
  <div style={{ display: "flex", gap: 5, padding: "10px 16px", alignItems: "center" }}>
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#9aa0a6",
          display: "inline-block",
          animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
        }}
      />
    ))}
  </div>
);

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [welcomeInput, setWelcomeInput] = useState("");
  const bottomRef = useRef(null);

  const handleSend = async (text) => {
    const userText = text.trim();
    if (!userText || loading) return;

    const updatedMessages = [...messages, { role: "user", text: userText }];
    setMessages(updatedMessages);
    setWelcomeInput("");
    setLoading(true);

    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/chat`, {
        message: userText,
        history: messages, // purani history bhi bhejo
      });

      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Kuch problem aa gayi. Dobara try karo." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const showWelcome = messages.length === 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        textarea:focus { outline: none; }
        textarea { resize: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #3c4043; border-radius: 4px; }
      `}</style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
          background: "#131314",
          fontFamily: "'Google Sans', sans-serif",
          color: "#e3e3e3",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 20px",
            borderBottom: "1px solid #2e3135",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20, cursor: "pointer", color: "#9aa0a6" }}>☰</span>
            <span style={{ fontSize: 20, fontWeight: 500 }}>MAYA</span>
          </div>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "#c026d3", display: "flex",
            alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer",
          }}>
            S
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>

          {showWelcome ? (
            /* Welcome Screen */
            <div style={{
              flex: 1, display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: "flex-start",
              padding: "40px 24px 20px", maxWidth: 700, margin: "0 auto", width: "100%",
            }}>
              <p style={{ fontSize: 18, color: "#9aa0a6", marginBottom: 4 }}>Hi Sonu</p>
              <h1 style={{
                fontSize: "clamp(28px, 6vw, 42px)", fontWeight: 400,
                color: "#e3e3e3", lineHeight: 1.2, marginBottom: 32,
              }}>
                Where should we start?
              </h1>

              <div style={{
                width: "100%", background: "#1e2124", borderRadius: 24,
                padding: "14px 16px 10px", border: "1px solid #2e3135",
              }}>
                <textarea
                  value={welcomeInput}
                  onChange={(e) => setWelcomeInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(welcomeInput);
                    }
                  }}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                  placeholder="Ask MAYA"
                  rows={1}
                  style={{
                    width: "100%", background: "transparent", border: "none", outline: "none",
                    color: "#e3e3e3", fontSize: 15, fontFamily: "'Google Sans', sans-serif",
                    lineHeight: 1.5, maxHeight: 200, overflow: "auto", resize: "none", paddingBottom: 8,
                  }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 12, color: "#9aa0a6" }}>
                    <span style={{ cursor: "pointer", fontSize: 20 }}>+</span>
                    <span style={{ cursor: "pointer", fontSize: 18 }}>⚙</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 13, color: "#9aa0a6", cursor: "pointer" }}>Fast ▾</span>
                    {welcomeInput.trim() ? (
                      <button
                        onClick={() => handleSend(welcomeInput)}
                        style={{
                          width: 34, height: 34, borderRadius: "50%",
                          background: "#4285f4", border: "none", cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fff", fontSize: 16, transition: "background 0.2s",
                        }}
                      >↑</button>
                    ) : (
                      <span style={{ fontSize: 20, color: "#9aa0a6", cursor: "pointer" }}>🎤</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

          ) : (
            /* Chat Messages */
            <div style={{
              flex: 1, padding: "24px 24px 16px",
              maxWidth: 700, margin: "0 auto", width: "100%",
            }}>
              {messages.map((msg, i) => (
                <ChatMessage key={i} message={msg} />
              ))}

              {loading && (
                <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginBottom: 8 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: "linear-gradient(135deg, #4285f4, #ea4335)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, flexShrink: 0,
                  }}>✦</div>
                  <div style={{ background: "#1e2124", border: "1px solid #2e3135", borderRadius: "4px 20px 20px 20px" }}>
                    <TypingDots />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* ── Bottom Input (chat mode only) ── */}
        {!showWelcome && (
          <ChatInput onSend={handleSend} loading={loading} />
        )}
      </div>
    </>
  );
};

export default ChatBox;