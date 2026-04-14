"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Types ─────────────────────────────────────────────── */

type Message = { role: "bot" | "user"; text: string };
type Phase = "registration" | "chat";
type EmailStatus = "idle" | "sending" | "sent" | "error";

type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
};

type RegErrors = Partial<Record<keyof UserInfo, string>>;

/* ─── Bot knowledge base ─────────────────────────────────── */

const BOT_RESPONSES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["price", "cost", "how much", "pricing", "rate", "fee", "£"],
    reply:
      "Lessons are £43/hr standard rate. After 5pm weekdays and all day Saturday it's £47/hr. Bundles: 5 lessons for £205 (save £10), 10 lessons for £400 (save £30). Sundays are closed."
  },
  {
    keywords: ["intensive", "fast track", "fast-track", "crash course", "quick"],
    reply:
      "Yes! Intensive courses start from £860 for 20 hours, ideal if you have an upcoming test or tight timeline. Get in touch to arrange a bespoke plan."
  },
  {
    keywords: ["beginner", "never driven", "first time", "start", "new"],
    reply:
      "Absolutely — Mariyam works brilliantly with complete beginners. Lessons are structured with calm, step-by-step coaching and clear progress milestones from day one."
  },
  {
    keywords: ["nervous", "anxiety", "scared", "anxious", "fear", "worried"],
    reply:
      "Lots of learners come to Mariyam feeling nervous. Lessons are paced entirely around your confidence with patient, supportive guidance every step of the way."
  },
  {
    keywords: ["manual", "gear", "gears", "stick"],
    reply:
      "Mariyam DS specialises exclusively in automatic driving lessons. Automatic cars remove the complexity of gears so you can focus on the road and build confidence faster."
  },
  {
    keywords: ["automatic", "auto"],
    reply:
      "Yes, all lessons are in a modern automatic car. No gears to worry about — just calm, focused learning."
  },
  {
    keywords: ["area", "location", "where", "hackney", "stoke newington", "islington", "dalston", "clapton"],
    reply:
      "Lessons cover Stoke Newington, Hackney, and surrounding areas in North and East London. Contact Mariyam to confirm your specific area."
  },
  {
    keywords: ["book", "booking", "appointment", "schedule", "slot", "availability"],
    reply:
      "You can book via the Book a Lesson page or WhatsApp. Head to the top menu and tap 'Book a Lesson' to fill in your details — Mariyam usually responds quickly!"
  },
  {
    keywords: ["whatsapp", "phone", "call", "contact", "reach", "message"],
    reply:
      "You can reach Mariyam by phone or WhatsApp at +44 7812 157242, or by email at hello@mariyamds.co.uk."
  },
  {
    keywords: ["female", "woman", "lady", "instructor"],
    reply:
      "Yes, Mariyam is a professional female driving instructor. Many learners specifically prefer a female instructor and feel more comfortable learning with her."
  },
  {
    keywords: ["pass", "test", "dvsa", "theory", "mock", "exam"],
    reply:
      "Mariyam offers mock test preparation and personalised route planning in her bundles to make sure you're exam-ready. Many of her students pass first time!"
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "howdy"],
    reply:
      "Hi! I'm the Mariyam DS assistant. Ask me anything about driving lessons, pricing, or how to book — I'm happy to help."
  },
  {
    keywords: ["thank", "thanks", "cheers"],
    reply:
      "You're welcome! Is there anything else I can help you with? Feel free to ask about lessons, pricing, or booking."
  }
];

const FALLBACK =
  "I'm not sure about that, but Mariyam would be happy to help directly. You can reach her on WhatsApp at +44 7812 157242 or email hello@mariyamds.co.uk.";

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  for (const { keywords, reply } of BOT_RESPONSES) {
    if (keywords.some((kw) => lower.includes(kw))) return reply;
  }
  return FALLBACK;
}

/* ─── Shared icon ────────────────────────────────────────── */

function BotIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="13" cy="2" r="1.2" fill="currentColor" />
      <circle cx="9" cy="10.5" r="1.5" fill="currentColor" />
      <circle cx="15" cy="10.5" r="1.5" fill="currentColor" />
      <path d="M8.5 14.5c0 0 1.5 2 3.5 2s3.5-2 3.5-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="0.5" y1="10" x2="3" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="21" y1="10" x2="23.5" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Input style helper ─────────────────────────────────── */

const regInput =
  "w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-colors";

/* ─── Component ──────────────────────────────────────────── */

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("registration");

  // Registration
  const [userInfo, setUserInfo] = useState<UserInfo>({ firstName: "", lastName: "", email: "" });
  const [regErrors, setRegErrors] = useState<RegErrors>({});
  const firstNameRef = useRef<HTMLInputElement>(null);

  // Chat
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Email transcript
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");

  /* scroll to bottom on new messages */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* focus correct field when window opens */
  useEffect(() => {
    if (!open) return;
    if (phase === "registration") {
      setTimeout(() => firstNameRef.current?.focus(), 80);
    } else {
      setTimeout(() => textareaRef.current?.focus(), 80);
    }
  }, [open, phase]);

  /* ── Registration ── */

  function validateReg(): boolean {
    const errors: RegErrors = {};
    if (!userInfo.firstName.trim()) errors.firstName = "First name is required.";
    if (!userInfo.lastName.trim()) errors.lastName = "Last name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email))
      errors.email = "Enter a valid email address.";
    setRegErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function startChat(e: React.FormEvent) {
    e.preventDefault();
    if (!validateReg()) return;
    setMessages([
      {
        role: "bot",
        text: `Hi ${userInfo.firstName}! 👋 I'm the Mariyam DS assistant. Ask me anything about lessons, pricing, or how to book.`
      }
    ]);
    setPhase("chat");
  }

  function setReg<K extends keyof UserInfo>(key: K, value: string) {
    setUserInfo((prev) => ({ ...prev, [key]: value }));
    if (regErrors[key]) setRegErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  /* ── Chat ── */

  function autoResize() {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 100) + "px";
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setMessages((prev) => [...prev, { role: "user", text }]);
    setTyping(true);
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));
    setTyping(false);
    setMessages((prev) => [...prev, { role: "bot", text: getBotReply(text) }]);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  /* ── Email transcript ── */

  async function emailTranscript() {
    if (emailStatus === "sending" || messages.length === 0) return;
    setEmailStatus("sending");

    const transcript = messages
      .map((m) => `${m.role === "bot" ? "Assistant" : userInfo.firstName}: ${m.text}`)
      .join("\n");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: userInfo.firstName,
          last_name: userInfo.lastName,
          email: userInfo.email,
          full_name: `${userInfo.firstName} ${userInfo.lastName}`,
          transcript,
          messages: messages.map((m) => ({ role: m.role, text: m.text })),
          message_count: messages.length,
          sent_at: new Date().toISOString()
        })
      });
      if (!res.ok) throw new Error();
      setEmailStatus("sent");
      // Close and fully reset after 2 s
      setTimeout(() => {
        setOpen(false);
        // Reset everything for next session
        setTimeout(() => {
          setPhase("registration");
          setMessages([]);
          setUserInfo({ firstName: "", lastName: "", email: "" });
          setRegErrors({});
          setEmailStatus("idle");
          setInput("");
        }, 400); // after close animation
      }, 2000);
    } catch {
      setEmailStatus("error");
      setTimeout(() => setEmailStatus("idle"), 3000);
    }
  }

  /* ── Close handler (just closes, preserves session) ── */

  function closeChat() {
    setOpen(false);
  }

  /* ── End session (closes + full reset) ── */

  function endSession() {
    setOpen(false);
    setTimeout(() => {
      setPhase("registration");
      setMessages([]);
      setUserInfo({ firstName: "", lastName: "", email: "" });
      setRegErrors({});
      setEmailStatus("idle");
      setInput("");
    }, 300);
  }

  /* ── Open/toggle handler ── */

  function toggleOpen() {
    if (open) {
      closeChat();
    } else {
      setOpen(true);
    }
  }

  /* ─────────────────────────────────────────────────────── */

  return (
    <>
      <style>{`
        @keyframes cb-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        @keyframes cb-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        @keyframes cb-msg-in {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)  scale(1);    }
        }
        .cb-pulse::before {
          content: ""; position: absolute; inset: -4px; border-radius: 50%;
          border: 2px solid #B4FF00; opacity: 0;
          animation: cb-pulse 2.5s ease-out infinite;
        }
        .cb-pulse-off::before { animation: none !important; opacity: 0 !important; }
        .cb-dot-1 { animation: cb-bounce 1.4s ease-in-out infinite; }
        .cb-dot-2 { animation: cb-bounce 1.4s ease-in-out 0.15s infinite; }
        .cb-dot-3 { animation: cb-bounce 1.4s ease-in-out 0.30s infinite; }
        .cb-msg   { animation: cb-msg-in 0.3s cubic-bezier(0.34,1.56,0.64,1) both; }
        .cb-messages::-webkit-scrollbar { width: 4px; }
        .cb-messages::-webkit-scrollbar-track { background: transparent; }
        .cb-messages::-webkit-scrollbar-thumb { background: #2a2d33; border-radius: 10px; }
        .cb-window-enter {
          opacity: 1 !important; visibility: visible !important;
          transform: translateY(0) scale(1) !important;
          transition: opacity 0.32s ease, transform 0.32s cubic-bezier(0.34,1.56,0.64,1), visibility 0s 0s !important;
        }
        .cb-window-exit {
          opacity: 0 !important; visibility: hidden !important;
          transform: translateY(14px) scale(0.96) !important;
          transition: opacity 0.28s ease, transform 0.28s ease, visibility 0s 0.28s !important;
        }
        .cb-reg-input {
          background: #121417;
          border: 1.5px solid rgba(160,166,176,0.2);
          color: #F2F2F2;
        }
        .cb-reg-input::placeholder { color: rgba(160,166,176,0.5); }
        .cb-reg-input:focus {
          border-color: #B4FF00;
          box-shadow: 0 0 0 3px rgba(180,255,0,0.1);
          outline: none;
        }
      `}</style>

      {/* ── Trigger button ── */}
      <button
        onClick={toggleOpen}
        aria-label={open ? "Close chat" : "Open chat"}
        className={`cb-pulse${open ? " cb-pulse-off" : ""} fixed bottom-[88px] right-5 z-[9998] flex h-14 w-14 items-center justify-center rounded-full border-none shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 md:bottom-7 md:right-7 md:h-16 md:w-16`}
        style={{ background: "#B4FF00", color: "#121417", boxShadow: "0 8px 30px rgba(180,255,0,0.4), 0 2px 8px rgba(0,0,0,0.2)" }}
      >
        {open ? (
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>

      {/* ── Chat window ── */}
      <div
        className={`fixed z-[9999] flex flex-col overflow-hidden transition-none bottom-0 right-0 w-full rounded-none md:bottom-[104px] md:right-7 md:w-[390px] md:rounded-[18px] ${open ? "cb-window-enter" : "cb-window-exit"}`}
        style={{
          height: "min(600px, 100dvh)", maxHeight: "100dvh",
          opacity: 0, visibility: "hidden", transform: "translateY(14px) scale(0.96)",
          background: "#1C1F24", border: "1px solid rgba(160,166,176,0.15)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.45), 0 8px 20px rgba(0,0,0,0.2)"
        }}
        role="dialog"
        aria-label="Chat with Mariyam DS assistant"
      >
        {/* Header */}
        <div className="flex flex-shrink-0 items-center gap-3 px-5 py-4" style={{ background: "#121417", borderBottom: "1px solid rgba(160,166,176,0.1)" }}>
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: "#B4FF00", color: "#121417" }}>
            <BotIcon size={16} />
          </div>
          <div>
            <h2 className="text-sm font-semibold" style={{ color: "#F2F2F2" }}>Mariyam DS Assistant</h2>
            <div className="mt-0.5 flex items-center gap-1.5 text-xs" style={{ color: "#A0A6B0" }}>
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: "#B4FF00", boxShadow: "0 0 6px rgba(180,255,0,0.6)" }} />
              {phase === "registration" ? "Introduce yourself to start" : `Chatting with ${userInfo.firstName}`}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-1">
            {/* Email transcript button — only visible in chat phase with messages */}
            {phase === "chat" && messages.length > 0 && (
              <button
                onClick={emailTranscript}
                disabled={emailStatus === "sending" || emailStatus === "sent"}
                className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/5 disabled:opacity-50"
                style={{ color: emailStatus === "sent" ? "#B4FF00" : "#A0A6B0" }}
                aria-label="Email transcript"
                title="Email me this transcript"
              >
                {emailStatus === "sending" ? (
                  <svg className="animate-spin" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                ) : emailStatus === "sent" ? (
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                )}
              </button>
            )}

            {/* Close button */}
            <button
              onClick={closeChat}
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/5"
              style={{ color: "#A0A6B0" }}
              aria-label="Close chat"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Registration phase ── */}
        {phase === "registration" && (
          <form onSubmit={startChat} className="flex flex-1 flex-col items-center justify-center gap-5 p-6" noValidate>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "#B4FF00", color: "#121417" }}>
                <BotIcon size={26} />
              </div>
              <p className="text-sm font-semibold" style={{ color: "#F2F2F2" }}>Before we chat</p>
              <p className="mt-1 text-xs" style={{ color: "#A0A6B0" }}>Please introduce yourself so we can personalise your experience and send you a copy of our conversation.</p>
            </div>

            <div className="w-full space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="cb-firstName" className="mb-1 block text-xs font-semibold" style={{ color: "#A0A6B0" }}>First Name</label>
                  <input
                    ref={firstNameRef}
                    id="cb-firstName"
                    type="text"
                    autoComplete="given-name"
                    value={userInfo.firstName}
                    onChange={(e) => setReg("firstName", e.target.value)}
                    placeholder="Jane"
                    className={`${regInput} cb-reg-input`}
                  />
                  {regErrors.firstName && <p className="mt-1 text-[11px]" style={{ color: "#B4FF00" }}>{regErrors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="cb-lastName" className="mb-1 block text-xs font-semibold" style={{ color: "#A0A6B0" }}>Last Name</label>
                  <input
                    id="cb-lastName"
                    type="text"
                    autoComplete="family-name"
                    value={userInfo.lastName}
                    onChange={(e) => setReg("lastName", e.target.value)}
                    placeholder="Smith"
                    className={`${regInput} cb-reg-input`}
                  />
                  {regErrors.lastName && <p className="mt-1 text-[11px]" style={{ color: "#B4FF00" }}>{regErrors.lastName}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="cb-email" className="mb-1 block text-xs font-semibold" style={{ color: "#A0A6B0" }}>Email</label>
                <input
                  id="cb-email"
                  type="email"
                  autoComplete="email"
                  value={userInfo.email}
                  onChange={(e) => setReg("email", e.target.value)}
                  placeholder="jane@example.com"
                  className={`${regInput} cb-reg-input`}
                />
                {regErrors.email && <p className="mt-1 text-[11px]" style={{ color: "#B4FF00" }}>{regErrors.email}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-full py-3 text-sm font-bold transition-all hover:opacity-90 active:scale-95"
              style={{ background: "#B4FF00", color: "#121417" }}
            >
              Start Chatting →
            </button>
          </form>
        )}

        {/* ── Chat phase ── */}
        {phase === "chat" && (
          <>
            {/* Email status banner */}
            {(emailStatus === "sent" || emailStatus === "error") && (
              <div
                className="flex-shrink-0 px-4 py-2 text-center text-xs font-medium"
                style={{
                  background: emailStatus === "sent" ? "rgba(180,255,0,0.12)" : "rgba(239,68,68,0.12)",
                  color: emailStatus === "sent" ? "#B4FF00" : "#f87171",
                  borderBottom: "1px solid rgba(160,166,176,0.1)"
                }}
              >
                {emailStatus === "sent"
                  ? "Transcript sent! Closing chat…"
                  : "Could not send transcript. Please try again."}
              </div>
            )}

            {/* Messages */}
            <div className="cb-messages flex flex-1 flex-col gap-3 overflow-y-auto p-4" style={{ background: "#1C1F24" }}>
              {messages.map((msg, i) => (
                <div key={i} className={`cb-msg flex max-w-[85%] gap-2 ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
                  <div
                    className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg"
                    style={msg.role === "bot" ? { background: "#B4FF00", color: "#121417" } : { background: "#2a2d33", color: "#A0A6B0" }}
                  >
                    {msg.role === "bot" ? (
                      <BotIcon size={14} />
                    ) : (
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                      </svg>
                    )}
                  </div>
                  <div
                    className="rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                    style={
                      msg.role === "bot"
                        ? { background: "#252830", border: "1px solid rgba(160,166,176,0.12)", borderBottomLeftRadius: "6px", color: "#F2F2F2" }
                        : { background: "#B4FF00", borderBottomRightRadius: "6px", color: "#121417", fontWeight: 500 }
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="cb-msg mr-auto flex max-w-[85%] gap-2">
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: "#B4FF00", color: "#121417" }}>
                    <BotIcon size={14} />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl px-4 py-3" style={{ background: "#252830", border: "1px solid rgba(160,166,176,0.12)", borderBottomLeftRadius: "6px" }}>
                    {[0, 1, 2].map((i) => (
                      <span key={i} className={`cb-dot-${i + 1} inline-block h-1.5 w-1.5 rounded-full`} style={{ background: "#A0A6B0" }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="flex flex-shrink-0 items-end gap-2.5 p-3" style={{ background: "#1C1F24", borderTop: "1px solid rgba(160,166,176,0.1)" }}>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => { setInput(e.target.value); autoResize(); }}
                onKeyDown={handleKeyDown}
                placeholder="Type your message…"
                rows={1}
                className="flex-1 resize-none rounded-xl px-4 py-2.5 text-sm leading-relaxed outline-none transition-all"
                style={{ background: "#121417", border: "1.5px solid rgba(160,166,176,0.15)", color: "#F2F2F2", maxHeight: "100px", fontFamily: "inherit" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#B4FF00"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(180,255,0,0.1)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(160,166,176,0.15)"; e.currentTarget.style.boxShadow = "none"; }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || typing}
                aria-label="Send message"
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-all active:scale-90 disabled:cursor-not-allowed disabled:opacity-40"
                style={{ background: "#B4FF00", color: "#121417" }}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>

            {/* Footer */}
            <div className="flex flex-shrink-0 items-center justify-between px-4 py-2" style={{ background: "#121417", borderTop: "1px solid rgba(160,166,176,0.08)" }}>
              <button
                onClick={endSession}
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium transition-colors hover:bg-white/5"
                style={{ color: "#A0A6B0" }}
                title="End this chat session and clear history"
              >
                <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                End session
              </button>

              {messages.length > 0 && emailStatus === "idle" && (
                <button
                  onClick={emailTranscript}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium transition-colors hover:bg-white/5"
                  style={{ color: "#A0A6B0" }}
                >
                  <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Email transcript
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
