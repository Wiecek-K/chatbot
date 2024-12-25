"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="flex flex-col w-full max-w-md mx-auto">
        {/* Matrix-style rain effect overlay */}
        <div className="fixed top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute text-green-500 text-opacity-50 animate-matrix-rain"
              style={{
                left: `${i * 10}%`,
                animationDelay: `${i * 0.3}s`,
                fontSize: "14px",
              }}
            >
              1010101
            </div>
          ))}
        </div>

        {/* Chat container */}
        <div className="relative flex flex-col w-full max-w-md py-24 mx-auto space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`p-3 rounded animate-fade-in ${
                m.role === "user"
                  ? "bg-green-900 bg-opacity-20 text-green-400"
                  : "bg-green-800 bg-opacity-10 text-green-500"
              }`}
            >
              <span className="font-mono">
                {m.role === "user" ? "> User: " : "> System: "}
              </span>
              <span className="whitespace-pre-wrap font-mono">{m.content}</span>
            </div>
          ))}

          {/* Input form */}
          <form
            onSubmit={handleSubmit}
            className="fixed bottom-0 w-full max-w-md mb-8"
          >
            <input
              className="w-full p-3 bg-black border-2 border-green-500 rounded-lg 
                         text-green-400 placeholder-green-700 font-mono focus:outline-none
                         focus:ring-2 focus:ring-green-500 focus:border-transparent
                         shadow-lg shadow-green-500/20"
              value={input}
              placeholder="> Enter command..."
              onChange={handleInputChange}
            />
          </form>
        </div>
      </div>

      <style jsx global>{`
        @keyframes matrix-rain {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        .animate-matrix-rain {
          animation: matrix-rain 10s linear infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
