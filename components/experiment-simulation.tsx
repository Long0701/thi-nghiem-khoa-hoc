"use client"
import { Card } from "@/components/ui/card"

interface ExperimentSimulationProps {
  experimentId: string
}

export function ExperimentSimulation({ experimentId }: ExperimentSimulationProps) {
  const getExperimentTitle = () => {
    const titles: { [key: string]: string } = {
      "water-cycle": "Sự chuyển thể của nước",
      "water-filtration": "Làm sạch nước (Lọc nước)",
      "light-transmission": "Sự truyền thẳng của ánh sáng",
      "heat-conductor": "Vật dẫn nhiệt tốt, vật dẫn nhiệt kém",
      "heat-transfer": "Sự truyền nhiệt",
      "heat-transfer-between": "Sự truyền nhiệt giữa các vật",
      "sound-production": "Sự phát ra âm thanh",
      "sound-propagation": "Sự lan truyền của âm thanh",
      "light-shadow": "Ánh sáng và bóng tối",
      "combustion-air": "Không Khí Duy Trì Sự Cháy",
      "air-pollution-consequences": "Hậu quả ô nhiễm không khí",
      "harmful-fungi-food-preservation": "Nấm có hại, cách bảo quản thực phẩm",
    }
    return titles[experimentId] || "Thí Nghiệm"
  }

  const getVideoUrl = () => {
    const videos: { [key: string]: string } = {
      "water-cycle": "https://www.youtube.com/embed/Ag8z7NkOGgY",
      "water-filtration": "https://www.youtube.com/embed/WC31mF6k76w",
      "light-transmission": "https://www.youtube.com/embed/8_7mlKH7hUM",
      "heat-conductor": "https://www.youtube.com/embed/VgdeyXI0asY",
      "heat-transfer": "https://www.youtube.com/embed/GdnoT29gOvQ",
      "heat-transfer-between": "https://www.youtube.com/embed/XDescVxpnvI",
      "sound-production": "https://www.youtube.com/embed/2NhQ5_Gx35Y",
      "sound-propagation": "https://www.youtube.com/embed/ZcZvlLYs0zI",
      "combustion-air": "https://www.youtube.com/embed/dIZg0i5pHYw",
      "air-pollution-consequences": "https://www.youtube.com/embed/8ROgeEtfDUg",
      "harmful-fungi-food-preservation": "https://www.youtube.com/embed/Wtf44wFUCwY",
    }
    return videos[experimentId] || ""
  }

  return (
    <Card className="h-full bg-white shadow-xl border border-gray-200 flex flex-col overflow-hidden rounded-xl sm:rounded-2xl">
      <div className="flex-shrink-0 p-3 sm:p-4 md:p-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="relative z-10">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white text-center flex items-center justify-center gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl md:text-3xl animate-pulse">🧪</span>
            <span>{getExperimentTitle()}</span>
          </h2>
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="w-full h-full relative z-10 min-h-[200px]">
          {getVideoUrl() ? (
            <iframe
              src={getVideoUrl()}
              title={getExperimentTitle()}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full min-h-[200px] rounded-b-xl sm:rounded-b-2xl"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-b-xl sm:rounded-b-2xl">
              <div className="text-center text-white px-4">
                <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 animate-bounce">📺</div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">Video không có sẵn</h3>
                <p className="text-sm sm:text-base text-gray-300">Video này không hoạt động</p>
                <div className="mt-4 sm:mt-6 flex justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-lg sm:text-2xl">▶️</span>
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
