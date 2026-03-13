<template>
  <div class="legal-page">
    <div class="page-header">
      <h1><i class="fas fa-file-contract"></i> Điều Khoản Sử Dụng</h1>
    </div>
    <div class="content">
      <h2>1. Giới thiệu</h2>
      <p>Chào mừng bạn đến với TruyenTV. Khi sử dụng website của chúng tôi, bạn đồng ý tuân thủ các điều khoản sử dụng sau đây.</p>

      <h2>2. Quy định sử dụng</h2>
      <p>Bạn cam kết không sử dụng website này vào bất kỳ mục đích bất hợp pháp nào. Nội dung trên website được cung cấp miễn phí cho mục đích giải trí.</p>

      <h2>3. Quyền sở hữu</h2>
      <p>Tất cả nội dung trên website thuộc bản quyền của các tác giả gốc. Chúng tôi không chịu trách nhiệm về nội dung do người dùng đăng tải.</p>

      <h2>4. Liên kết</h2>
      <p>Website có thể chứa các liên kết đến website bên thứ ba. Chúng tôi không kiểm soát và không chịu trách nhiệm về nội dung của các website này.</p>

      <h2>5. Thay đổi điều khoản</h2>
      <p>Chúng tôi có quyền thay đổi các điều khoản này bất cứ lúc nào. Việc bạn tiếp tục sử dụng website sau khi thay đổi đồng nghĩa với việc bạn chấp nhận các thay đổi đó.</p>
    </div>
  </div>
</template>

<script>
export default { name: 'Terms' }
</script>

<style scoped>
.page-header { margin: 20px 0; padding: 15px 0; border-bottom: 2px solid var(--primary-color); }
.page-header h1 { color: var(--primary-color); font-size: 24px; display: flex; align-items: center; gap: 10px; }
.content { background: #fff; padding: 30px; border-radius: 8px; box-shadow: var(--shadow); }
.content h2 { color: var(--text-color); margin: 25px 0 15px; font-size: 18px; }
.content h2:first-child { margin-top: 0; }
.content p { color: var(--text-light); line-height: 1.8; margin-bottom: 15px; }
</style>
