"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}


export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Xin chào! Tôi là trợ lý khoa học của bạn. Hãy hỏi tôi bất cứ điều gì về các thí nghiệm hoặc khoa học lớp 4!",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    const messageToSend = input // Lưu message trước khi clear input
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToSend }),
      })

      if (!response.ok) {
        throw new Error(`Failed to get response: ${response.status}`)
      }

      const data = await response.json()
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "Xin lỗi, tôi không thể trả lời câu hỏi này.",
        sender: "bot",
        timestamp: new Date(),
      }
      
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Error calling ChatGPT API:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Xin lỗi, tôi không thể kết nối với ChatGPT. Vui lòng thử lại sau.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="h-full bg-white shadow-xl border border-gray-200 flex flex-col overflow-hidden rounded-xl sm:rounded-2xl">
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white p-3 sm:p-4 md:p-6 rounded-t-xl sm:rounded-t-2xl flex-shrink-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="relative z-10">
          <h2 className="text-base sm:text-lg md:text-xl font-bold flex items-center gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl md:text-3xl animate-pulse">🤖</span>
            <span className="truncate">Trợ Lý Khoa Học</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mt-1">Hỏi tôi bất cứ điều gì về khoa học!</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] sm:max-w-xs px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base shadow-md transition-all duration-300 hover:shadow-lg ${
                message.sender === "user"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
              }`}
            >
              <p className="break-words leading-relaxed">{message.text}</p>
              <span className="text-xs opacity-70 mt-1 sm:mt-2 block">
                {message.timestamp.toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl rounded-bl-none shadow-md border border-gray-200">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-2 sm:p-3 md:p-4 bg-gradient-to-r from-indigo-50 to-purple-50 flex-shrink-0">
        <div className="flex gap-2 sm:gap-3">
          <Input
            type="text"
            placeholder="Hỏi về khoa học..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-xs sm:text-sm md:text-base text-gray-800 placeholder:text-gray-500 transition-all duration-300"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-6 flex-shrink-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="text-base sm:text-lg">📤</span>
          </Button>
        </div>
      </form>
    </Card>
  )
}
