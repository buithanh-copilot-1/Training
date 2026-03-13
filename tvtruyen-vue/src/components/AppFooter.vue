<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>TruyenTV</h3>
          <p>Website đọc truyện online miễn phí hàng đầu Việt Nam. Cập nhật liên tục các thể loại truyện hay nhất: ngôn tình, đam mỹ, tiên hiệp, huyền huyễn...</p>
        </div>
        <div class="footer-section">
          <h3>Liên Kết</h3>
          <ul class="footer-links">
            <li><router-link to="/">Danh sách truyện</router-link></li>
            <li><router-link to="/the-loai/ngon-tinh">Thể loại truyện</router-link></li>
            <li><router-link to="/nhom-dich">Nhóm dịch</router-link></li>
            <li><router-link to="/tim-kiem-nang-cao">Tìm kiếm nâng cao</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Pháp Lý</h3>
          <ul class="footer-links">
            <li><router-link to="/dieu-khoan">Điều Khoản</router-link></li>
            <li><router-link to="/chinh-sach-bao-mat">Chính Sách Bảo Mật</router-link></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 TruyenTV - Đọc Truyện Online Miễn Phí</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>
