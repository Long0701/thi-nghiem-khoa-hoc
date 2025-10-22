import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Kiểm tra API key
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      // Fallback responses khi chưa có API key
      const fallbackResponses: Record<string, string> = {
        "chu kỳ nước": "Chu kỳ nước có 3 bước: 1) Bay hơi - Nước từ sông, hồ bay hơi lên thành hơi nước. 2) Ngưng tụ - Hơi nước lên cao, gặp không khí lạnh tạo thành mây. 3) Mưa - Nước từ mây rơi xuống dưới dạng mưa.",
        "sự phát triển của cây": "Cây phát triển qua các giai đoạn: 1) Hạt giống - chứa mầm cây. 2) Mầm mọc - rễ và thân mọc. 3) Lá mọc - cây có lá xanh. 4) Thân lớn - cây cao lên. 5) Hoa nở - cây ra hoa. 6) Cây trưởng thành.",
        "ánh sáng": "Ánh sáng là một dạng năng lượng. Nó di chuyển rất nhanh - khoảng 300,000 km mỗi giây! Ánh sáng giúp chúng ta nhìn thấy mọi thứ.",
        "nam châm": "Nam châm là vật có lực hút các vật kim loại. Nó có hai cực: cực Bắc (N) và cực Nam (S). Các cực khác tên hút nhau, các cực cùng tên đẩy nhau.",
        "đòn bẩy": "Đòn bẩy là một thanh cứng quay quanh một điểm tựa. Nó giúp nâng vật nặng dễ dàng hơn. Ví dụ: cái xà beng, cái kéo.",
        "âm thanh": "Âm thanh là sóng lan truyền qua không khí. Nó được tạo ra bởi sự rung động của các vật. Âm thanh di chuyển chậm hơn ánh sáng.",
        "cơ thể": "Cơ thể con người có nhiều bộ phận: xương, cơ bắp, tim, phổi, não, v.v. Chúng làm việc cùng nhau để giữ chúng ta sống.",
        "môi trường": "Môi trường là tất cả mọi thứ xung quanh chúng ta. Nó bao gồm không khí, nước, đất và các sinh vật khác."
      }

      const lowerMessage = message.toLowerCase()
      let response = "Đó là một câu hỏi tuyệt vời! Tôi có thể giúp bạn tìm hiểu thêm về khoa học. Hãy thử hỏi tôi về: chu kỳ nước, sự phát triển của cây, ánh sáng, nam châm, máy đơn giản, âm thanh, cơ thể con người, hoặc môi trường!"

      for (const [key, answer] of Object.entries(fallbackResponses)) {
        if (lowerMessage.includes(key)) {
          response = answer
          break
        }
      }


      return NextResponse.json({ response })
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Gọi model nhẹ hơn và thêm retry đơn giản khi dính 429
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Bạn là một trợ lý khoa học thân thiện, chuyên giúp học sinh lớp 4 tìm hiểu về khoa học. Hãy trả lời các câu hỏi về khoa học một cách đơn giản, dễ hiểu và phù hợp với lứa tuổi. Sử dụng ví dụ cụ thể và ngôn ngữ tiếng Việt. Nếu câu hỏi không liên quan đến khoa học, hãy nhẹ nhàng hướng dẫn học sinh quay lại chủ đề khoa học."
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content || "Xin lỗi, tôi không thể trả lời câu hỏi này."

    return NextResponse.json({ response })
  } catch (error: any) {
    console.error('Error calling OpenAI API:', error)
    // Nếu lỗi do quota (429), trả lời lịch sự và rơi về fallback
    if (error?.code === 'insufficient_quota' || error?.status === 429) {
      return NextResponse.json({
        response: "Hiện tại vượt quá hạn mức sử dụng API. Tôi sẽ trả lời ngắn gọn: Chu kỳ nước gồm bay hơi, ngưng tụ và mưa; ánh sáng tạo bóng khi bị vật cản; nam châm có hai cực hút - đẩy."
      })
    }
    return NextResponse.json({ 
      response: "Xin lỗi, tôi không thể kết nối với ChatGPT. Vui lòng thử lại sau hoặc liên hệ quản trị viên." 
    })
  }
}
