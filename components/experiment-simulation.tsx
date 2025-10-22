"use client"
import { Card } from "@/components/ui/card"

interface ExperimentSimulationProps {
  experimentId: string
}

export function ExperimentSimulation({ experimentId }: ExperimentSimulationProps) {
  const getExperimentTitle = () => {
    const titles: { [key: string]: string } = {
      "water-cycle": "Chu Kỳ Nước",
      "plant-growth": "Sự Phát Triển Của Cây",
      "light-shadow": "Ánh Sáng và Bóng Tối",
      "magnet-force": "Lực Nam Châm",
      "simple-machine": "Máy Đơn Giản - Đòn Bẩy",
      "sound-wave": "Sóng Âm Thanh",
      "combustion": "Không Khí Duy Trì Sự Cháy",
    }
    return titles[experimentId] || "Thí Nghiệm"
  }

  const getVideoUrl = () => {
    const videos: { [key: string]: string } = {
      "water-cycle": "https://www.youtube.com/embed/dIZg0i5pHYw",
      "plant-growth": "https://www.youtube.com/embed/2s4Xq8RqKYU",
      "light-shadow": "https://www.youtube.com/embed/5BDS6U7F0gQ",
      "magnet-force": "https://www.youtube.com/embed/DR9w4oWqtmY",
      "simple-machine": "https://www.youtube.com/embed/8V54UoUXpf4",
      "sound-wave": "https://www.youtube.com/embed/3y8XJ8O3p4c",
      "combustion": "https://www.youtube.com/embed/dIZg0i5pHYw",
    }
    return videos[experimentId] || ""
  }

  return (
    <Card className="h-full bg-white shadow-xl border border-gray-200 flex flex-col overflow-hidden rounded-2xl">
      <div className="flex-shrink-0 p-4 md:p-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center flex items-center justify-center gap-3">
            <span className="text-3xl animate-pulse">🧪</span>
            <span>{getExperimentTitle()}</span>
          </h2>
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="w-full h-full relative z-10">
          {getVideoUrl() ? (
            <iframe
              width="100%"
              height="100%"
              src={getVideoUrl()}
              title={getExperimentTitle()}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-b-2xl"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-b-2xl">
              <div className="text-center text-white">
                <div className="text-6xl mb-4 animate-bounce">📺</div>
                <h3 className="text-2xl font-bold mb-2">Video không có sẵn</h3>
                <p className="text-gray-300">Video này không hoạt động</p>
                <div className="mt-6 flex justify-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-2xl">▶️</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
