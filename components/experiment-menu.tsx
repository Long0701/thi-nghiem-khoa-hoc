"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface Experiment {
  id: string
  name: string
  icon: string
  description: string
}

const experiments: Experiment[] = [
  // 💧 Nước (2 experiments)
  {
    id: "water-cycle",
    name: "Sự chuyển thể của nước",
    icon: "💧",
    description: "Tìm hiểu về sự bay hơi, ngưng tụ và mưa",
  },
  {
    id: "water-filtration",
    name: "Làm sạch nước (lọc nước)",
    icon: "🌊",
    description: "Học cách lọc nước bẩn thành nước sạch",
  },
  
  // 🔥 Cháy & Nhiệt (3 experiments)
  {
    id: "heat-transfer",
    name: "Sự truyền nhiệt",
    icon: "🔥",
    description: "Nghiên cứu cách nhiệt được truyền giữa các vật",
  },
  {
    id: "combustion-air",
    name: "Không khí duy trì sự cháy",
    icon: "🔥",
    description: "Không khí là điều kiện cần thiết để cháy",
  },
  
  // 🌡️ Nhiệt độ (2 experiments)
  {
    id: "heat-conductor",
    name: "Vật dẫn nhiệt tốt, dẫn nhiệt kém",
    icon: "🌡️",
    description: "Phân biệt vật dẫn nhiệt tốt và vật dẫn nhiệt kém",
  },
  {
    id: "heat-transfer-between",
    name: "Sự truyền nhiệt giữa các vật",
    icon: "🌡️",
    description: "Tìm hiểu cách nhiệt truyền từ vật này sang vật khác",
  },
  
  // 🔊 Âm thanh (2 experiments)
  {
    id: "sound-production",
    name: "Sự phát ra âm thanh",
    icon: "🔊",
    description: "Khám phá cách âm thanh được phát ra",
  },
  {
    id: "sound-propagation",
    name: "Sự lan truyền của âm thanh",
    icon: "🔊",
    description: "Tìm hiểu cách âm thanh lan truyền trong không khí",
  },
  
  // ☀️ & 💡 Ánh sáng (2 experiments)
  {
    id: "light-transmission",
    name: "Sự truyền thẳng của ánh sáng",
    icon: "☀️",
    description: "Khám phá cách ánh sáng truyền theo đường thẳng",
  },
]

interface ExperimentMenuProps {
  selectedExperiment: string | null
  onSelectExperiment: (id: string) => void
}

export function ExperimentMenu({ selectedExperiment, onSelectExperiment }: ExperimentMenuProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredExperiments = experiments.filter(
    (exp) =>
      exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="h-full bg-white shadow-xl border border-gray-200 overflow-y-auto flex flex-col rounded-xl sm:rounded-2xl">
      <div className="p-3 sm:p-4 md:p-6 flex-shrink-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-t-xl sm:rounded-t-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="relative z-10">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl animate-bounce">📚</span>
            <span>Thí Nghiệm</span>
          </h2>

          <Input
            type="text"
            placeholder="Tìm kiếm thí nghiệm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-2 border-white/30 bg-white/90 backdrop-blur-sm text-gray-800 rounded-lg sm:rounded-xl focus:border-yellow-300 focus:bg-white transition-all duration-300 text-sm sm:text-base font-medium placeholder:text-gray-500 shadow-lg"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-4 py-3 sm:py-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="space-y-2">
          {filteredExperiments.map((exp, index) => (
            <Button
              key={exp.id}
              onClick={() => onSelectExperiment(exp.id)}
              variant={selectedExperiment === exp.id ? "default" : "outline"}
              className={`w-full justify-start text-left h-auto py-2 sm:py-3 md:py-4 px-2 sm:px-3 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-[1.02] text-sm sm:text-base font-semibold group relative overflow-hidden ${
                selectedExperiment === exp.id
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 shadow-lg shadow-indigo-200"
                  : "hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 border border-gray-200 hover:border-indigo-300 hover:shadow-md text-black hover:text-black"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {selectedExperiment === exp.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
              )}
              <span className="text-lg sm:text-xl md:text-2xl group-hover:scale-110 transition-transform duration-300">{exp.icon}</span>
              <div className="flex-1 relative z-10">
                <div className="font-bold text-sm sm:text-base">{exp.name}</div>
                {/* <div className="text-xs sm:text-sm opacity-80 mt-1">{exp.description}</div> */}
              </div>
            </Button>
          ))}
          {filteredExperiments.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-base font-medium">Không tìm thấy thí nghiệm nào</p>
              <p className="text-sm text-gray-400 mt-2">Thử từ khóa khác</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
