<template>
  <div class="legal-page">
    <div class="page-header">
      <h1><i class="fas fa-shield-alt"></i> Chính Sách Bảo Mật</h1>
    </div>
    <div class="content">
      <h2>1. Thu thập thông tin</h2>
      <p>Chúng tôi thu thập thông tin cá nhân khi bạn đăng ký tài khoản, bao gồm: tên, email và các thông tin khác bạn cung cấp.</p>

      <h2>2. Sử dụng thông tin</h2>
      <p>Thông tin thu thập được sử dụng để: cung cấp dịch vụ, cải thiện trải nghiệm người dùng, và gửi các thông báo liên quan đến dịch vụ.</p>

      <h2>3. Bảo mật thông tin</h2>
      <p>Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn bằng các biện pháp bảo mật phù hợp. Tuy nhiên, không có phương thức truyền dữ liệu nào qua internet là hoàn toàn an toàn.</p>

      <h2>4. Chia sẻ thông tin</h2>
      <p>Chúng tôi không bán, trao đổi hoặc chuyển giao thông tin cá nhân của bạn cho bên thứ ba khi không có sự đồng ý của bạn.</p>

      <h2>5. Cookies</h2>
      <p>Website sử dụng cookies để cải thiện trải nghiệm người dùng. Bạn có thể từ chối cookies bằng cách thay đổi cài đặt trình duyệt.</p>

      <h2>6. Liên hệ</h2>
      <p>Nếu bạn có câu hỏi về chính sách bảo mật này, vui lòng liên hệ với chúng tôi qua email hỗ trợ.</p>
    </div>
  </div>
</template>

<script>
export default { name: 'Privacy' }
</script>

<style scoped>
.page-header { margin: 20px 0; padding: 15px 0; border-bottom: 2px solid var(--primary-color); }
.page-header h1 { color: var(--primary-color); font-size: 24px; display: flex; align-items: center; gap: 10px; }
.content { background: #fff; padding: 30px; border-radius: 8px; box-shadow: var(--shadow); }
.content h2 { color: var(--text-color); margin: 25px 0 15px; font-size: 18px; }
.content h2:first-child { margin-top: 0; }
.content p { color: var(--text-light); line-height: 1.8; margin-bottom: 15px; }
</style>
