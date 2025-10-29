# 🚀 Hướng dẫn thêm biến môi trường trên Netlify

## Vấn đề
Khi chạy local thì ứng dụng hoạt động tốt nhưng khi deploy lên Netlify thì chatbot không thể kết nối với ChatGPT API vì thiếu biến môi trường `OPENAI_API_KEY`.

## Giải pháp: Thêm biến môi trường trên Netlify

### Bước 1: Đăng nhập vào Netlify Dashboard
1. Truy cập: https://app.netlify.com/
2. Đăng nhập vào tài khoản của bạn

### Bước 2: Chọn site của bạn
1. Trong danh sách sites, click vào site **science-lab-simulator** (hoặc tên site của bạn)

### Bước 3: Vào phần Environment Variables
1. Click vào **Site configuration** (hoặc nhấn vào **Site settings**)
2. Trong menu bên trái, tìm và click vào **Environment variables**
3. Hoặc truy cập trực tiếp: `https://app.netlify.com/sites/[tên-site]/configuration/env`

### Bước 4: Thêm biến môi trường OPENAI_API_KEY
1. Click nút **Add a variable** hoặc **Add variable**
2. Trong ô **Key**: nhập `OPENAI_API_KEY`
3. Trong ô **Value**: dán API key của bạn (bắt đầu bằng `sk-`)
4. Chọn **Scopes** (phạm vi):
   - ✅ **Builds**: Để sử dụng khi build
   - ✅ **Runtime**: Để sử dụng khi app chạy (quan trọng cho API routes)
   - **Deploy previews**: (Tùy chọn) Để dùng trong preview
   - **Branch deploys**: (Tùy chọn) Để dùng trong branch deployments
5. Click **Create variable**

### Bước 5: Redeploy site
Sau khi thêm biến môi trường, bạn cần redeploy để áp dụng:

**Cách 1: Redeploy từ Netlify Dashboard**
1. Vào **Deploys** tab
2. Tìm deploy gần nhất
3. Click vào menu **...** (3 chấm)
4. Chọn **Clear cache and retry deploy** hoặc **Trigger deploy** → **Deploy site**

**Cách 2: Push code mới lên Git**
```bash
git commit --allow-empty -m "Trigger Netlify rebuild"
git push
```

**Cách 3: Redeploy từ API/CLI**
```bash
# Sử dụng Netlify CLI (nếu đã cài)
netlify deploy --build --prod
```

## ✅ Kiểm tra biến môi trường đã được thêm

1. Vào **Site settings** → **Environment variables**
2. Kiểm tra xem `OPENAI_API_KEY` đã xuất hiện trong danh sách chưa
3. Đảm bảo cả **Builds** và **Runtime** đều được check ✅

## 🔍 Debug nếu vẫn lỗi

### 1. Kiểm tra trong Build logs
- Vào **Deploys** → Chọn deploy gần nhất → Xem **Build log**
- Tìm kiếm từ khóa `OPENAI_API_KEY` để xem có được load không

### 2. Kiểm tra trong Function logs
- Vào **Functions** tab
- Xem logs của function `/api/chat`
- Kiểm tra xem có lỗi liên quan đến API key không

### 3. Test với Netlify CLI (Nếu cần)
```bash
# Cài Netlify CLI (nếu chưa có)
npm install -g netlify-cli

# Đăng nhập
netlify login

# Test function locally với biến môi trường
netlify dev
```

### 4. Kiểm tra API key có đúng không
- Đảm bảo API key bắt đầu bằng `sk-`
- Không có khoảng trắng thừa ở đầu/cuối
- API key còn hạn và có đủ quota

## 📝 Lưu ý quan trọng

1. **Bảo mật**: API key là thông tin nhạy cảm, không commit vào Git
2. **Scopes**: Phải check cả **Builds** và **Runtime** để function hoạt động
3. **Redeploy**: Luôn cần redeploy sau khi thêm/sửa biến môi trường
4. **Environment**: Biến môi trường có thể set riêng cho Production, Deploy previews, hoặc Branch deploys

## 🎯 Các bước tóm tắt

```
1. Netlify Dashboard → Chọn site
2. Site settings → Environment variables  
3. Add variable → Key: OPENAI_API_KEY, Value: [your-api-key]
4. Check ✅ Builds và ✅ Runtime
5. Create variable
6. Redeploy site
```

## 💡 Alternative: Sử dụng file netlify.toml

Bạn cũng có thể thêm biến môi trường vào file `netlify.toml` (nhưng vẫn cần thêm trên dashboard để bảo mật):

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

# Lưu ý: Không nên hardcode API key vào file này!
# Chỉ thêm trên监控 dashboard để bảo mật
```

---

**Sau khi hoàn tất các bước trên, chatbot sẽ hoạt động bình thường trên Netlify!** 🎉

