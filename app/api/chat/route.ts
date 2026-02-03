import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const SYSTEM_PROMPT =
  "Bạn là một trợ lý khoa học thân thiện, chuyên giúp học sinh lớp 4 tìm hiểu về khoa học. Hãy trả lời các câu hỏi về khoa học một cách đơn giản, dễ hiểu và phù hợp với lứa tuổi. Sử dụng ví dụ cụ thể và ngôn ngữ tiếng Việt. Nếu câu hỏi không liên quan đến khoa học, hãy nhẹ nhàng hướng dẫn học sinh quay lại chủ đề khoa học."

// Fallback khi không có API key / gặp lỗi quota — trả lời đúng chủ đề câu hỏi
const FALLBACK_RESPONSES: Record<string, string> = {
  "chu kỳ nước":
    "Chu kỳ nước có 3 bước: 1) Bay hơi - Nước từ sông, hồ bay hơi lên thành hơi nước. 2) Ngưng tụ - Hơi nước lên cao, gặp không khí lạnh tạo thành mây. 3) Mưa - Nước từ mây rơi xuống dưới dạng mưa.",
  "sự phát triển của cây":
    "Cây phát triển qua các giai đoạn: 1) Hạt giống - chứa mầm cây. 2) Mầm mọc - rễ và thân mọc. 3) Lá mọc - cây có lá xanh. 4) Thân lớn - cây cao lên. 5) Hoa nở - cây ra hoa. 6) Cây trưởng thành.",
  "ánh sáng":
    "Ánh sáng là một dạng năng lượng. Nó di chuyển rất nhanh - khoảng 300,000 km mỗi giây! Ánh sáng giúp chúng ta nhìn thấy mọi thứ.",
  "nam châm":
    "Nam châm là vật có lực hút các vật kim loại. Nó có hai cực: cực Bắc (N) và cực Nam (S). Các cực khác tên hút nhau, các cực cùng tên đẩy nhau.",
  "đòn bẩy":
    "Đòn bẩy là một thanh cứng quay quanh một điểm tựa. Nó giúp nâng vật nặng dễ dàng hơn. Ví dụ: cái xà beng, cái kéo.",
  "âm thanh":
    "Âm thanh là sóng lan truyền qua không khí. Nó được tạo ra bởi sự rung động của các vật. Âm thanh di chuyển chậm hơn ánh sáng.",
  "cơ thể":
    "Cơ thể con người có nhiều bộ phận: xương, cơ bắp, tim, phổi, não, v.v. Chúng làm việc cùng nhau để giữ chúng ta sống.",
  "môi trường":
    "Môi trường là tất cả mọi thứ xung quanh chúng ta. Nó bao gồm không khí, nước, đất và các sinh vật khác.",
  "nấm":
    "Nấm là một loại sinh vật không phải thực vật cũng không phải động vật. Nấm có loại ăn được (nấm rơm, nấm hương) và loại có hại, gây ngộ độc. Một số nấm mọc trên thức ăn khi để lâu (mốc) làm hỏng thực phẩm. Cần bảo quản thực phẩm khô ráo, mát để hạn chế nấm mốc.",
  "nấm có hại":
    "Nấm có hại (nấm độc, nấm mốc) có thể gây ngộ độc khi ăn. Để bảo quản thực phẩm: giữ khô ráo, thoáng mát; bọc kín hoặc cho vào tủ lạnh; không ăn đồ đã mốc hoặc có mùi lạ.",
  "bảo quản thực phẩm":
    "Bảo quản thực phẩm đúng cách: để nơi khô, mát; dùng tủ lạnh cho đồ tươi; đậy kín tránh côn trùng và nấm mốc; không ăn thực phẩm đã hết hạn hoặc bị mốc.",
  "ô nhiễm không khí":
    "Ô nhiễm không khí là khi không khí bị bẩn do khói, bụi, khí thải. Hậu quả: khó thở, bệnh hô hấp, hại cây cối và động vật. Chúng ta nên hạn chế đốt rác, trồng cây, dùng phương tiện ít khói bụi.",
}

const FALLBACK_DEFAULT =
  "Đó là một câu hỏi hay! Hiện tại mình tạm thời trả lời theo các chủ đề có sẵn. Bạn có thể hỏi: chu kỳ nước, ánh sáng, nam châm, nấm và bảo quản thực phẩm, ô nhiễm không khí."

function getFallbackResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase().trim()
  for (const [key, answer] of Object.entries(FALLBACK_RESPONSES)) {
    if (lower.includes(key)) return answer
  }
  return FALLBACK_DEFAULT
}

async function groqChatCompletion(apiKey: string, message: string) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      max_tokens: 500,
      temperature: 0.7,
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    const err = new Error(`Groq API error: ${res.status} ${text}`)
    ;(err as any).status = res.status
    throw err
  }

  return (await res.json()) as any
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const message = typeof (body as any)?.message === "string" ? (body as any).message : ""

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 })
  }

  const groqKey = process.env.GROQ_API_KEY?.trim()
  const openaiKey = process.env.OPENAI_API_KEY?.trim()

  try {
    // Ưu tiên dùng Groq để tránh OpenAI billing
    if (groqKey) {
      const data = await groqChatCompletion(groqKey, message)
      const response = data?.choices?.[0]?.message?.content || "Xin lỗi, tôi không thể trả lời câu hỏi này."
      return NextResponse.json({ response })
    }

    // Nếu vẫn muốn dùng OpenAI (khi có billing) thì để OPENAI_API_KEY
    if (openaiKey && openaiKey !== "your_openai_api_key_here") {
      const openai = new OpenAI({ apiKey: openaiKey })
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        max_tokens: 500,
        temperature: 0.7,
      })
      const response = completion.choices[0]?.message?.content || "Xin lỗi, tôi không thể trả lời câu hỏi này."
      return NextResponse.json({ response })
    }

    // Không có key nào -> fallback
    return NextResponse.json({ response: getFallbackResponse(message) })
  } catch (error: any) {
    const status = error?.status ?? error?.response?.status
    const code = error?.code ?? error?.error?.code

    console.error("Chat API error:", { status, code, message: error?.message })

    // Quota / rate limit -> fallback theo chủ đề
    if (status === 429 || code === "insufficient_quota" || code === "rate_limit_exceeded") {
      return NextResponse.json({ response: getFallbackResponse(message) })
    }

    // Key sai
    if (status === 401 || code === "invalid_api_key" || code === "authentication_error") {
      return NextResponse.json({
        response:
          "API key không đúng hoặc đã bị thu hồi. Nếu bạn dùng Groq: hãy tạo GROQ_API_KEY và khởi động lại server. Nếu dùng OpenAI: kiểm tra OPENAI_API_KEY và billing.",
      })
    }

    return NextResponse.json({
      response: "Xin lỗi, hiện tại chatbot gặp lỗi kết nối. Vui lòng thử lại sau.",
    })
  }
}
