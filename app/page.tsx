"use client"

import { useState } from "react"
import { ExperimentMenu } from "@/components/experiment-menu"
import { ExperimentSimulation } from "@/components/experiment-simulation"
import { ChatBot } from "@/components/chatbot"

export default function Home() {
  const [selectedExperiment, setSelectedExperiment] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-3 md:p-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          🧪 Khám Phá Khoa Học
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-medium">
          Khám phá thế giới khoa học qua các thí nghiệm tương tác
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 md:gap-6" style={{ height: "calc(100vh - 8rem)" }}>
        {/* Left Sidebar - Experiment Menu */}
        <div className="w-full xl:w-80 xl:flex-shrink-0 min-h-0 overflow-hidden animate-fade-in">
          <ExperimentMenu selectedExperiment={selectedExperiment} onSelectExperiment={setSelectedExperiment} />
        </div>

        {/* Center - Experiment Simulation */}
        <div className="flex-1 min-h-0 overflow-hidden animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {selectedExperiment ? (
            <ExperimentSimulation experimentId={selectedExperiment} />
          ) : (
            <div className="h-full rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <img
                src="/anh-khoa-hoc.png"
                alt="Science lab background"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Right Sidebar - ChatBot */}
        <div
          className="w-full xl:w-96 xl:flex-shrink-0 min-h-0 overflow-hidden animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <ChatBot />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}
