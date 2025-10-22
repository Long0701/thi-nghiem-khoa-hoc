# Hướng dẫn thiết lập ChatGPT API

## 🚀 Cách thiết lập OpenAI API Key

### Bước 1: Tạo tài khoản OpenAI
1. Truy cập: https://platform.openai.com/
2. Đăng ký/đăng nhập tài khoản
3. Xác thực email và số điện thoại

### Bước 2: Tạo API Key
1. Truy cập: https://platform.openai.com/api-keys
2. Nhấn "Create new secret key"
3. Đặt tên cho key (ví dụ: "Science Lab Simulator")
4. Copy API key (bắt đầu bằng `sk-`)

### Bước 3: Cập nhật file .env.local
1. Mở file `.env.local` trong thư mục gốc
2. Thay thế `your_openai_api_key_here` bằng API key thật:

```bash
# Ví dụ:
OPENAI_API_KEY=sk-1234567890abcdef...
```

### Bước 4: Khởi động lại ứng dụng
```bash
npm run dev
```

## 💡 Lưu ý quan trọng

- **Bảo mật**: Không chia sẻ API key với ai
- **Chi phí**: OpenAI tính phí theo usage (khoảng $0.002/1K tokens)
- **Giới hạn**: Có thể thiết lập spending limit trong tài khoản OpenAI

## 🔧 Fallback System

Nếu chưa có API key, chatbot vẫn hoạt động với:
- Câu trả lời cố định cho các chủ đề khoa học phổ biến
- Hướng dẫn thiết lập API key
- Không bị lỗi hay crash

## 🆘 Khắc phục sự cố

### Lỗi 401: Incorrect API key
- Kiểm tra API key có đúng không
- Đảm bảo không có khoảng trắng thừa
- Khởi động lại server sau khi cập nhật

### Lỗi 429: Rate limit exceeded
- Đợi một chút rồi thử lại
- Kiểm tra usage trong tài khoản OpenAI

### Lỗi 500: Internal server error
- Kiểm tra console log để xem chi tiết lỗi
- Đảm bảo API key có quyền truy cập GPT-3.5-turbo
