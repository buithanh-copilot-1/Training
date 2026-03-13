<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <h1>404</h1>
      <h2>Trang không tìm thấy</h2>
      <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
      <router-link to="/" class="btn-home">
        <i class="fas fa-home"></i> Về trang chủ
      </router-link>
    </div>
  </div>
</template>

<script>
export default { name: 'NotFound' }
</script>

<style scoped>
.not-found-page {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.not-found-content h1 {
  font-size: 120px;
  color: var(--primary-color);
  margin: 0;
  line-height: 1;
}
.not-found-content h2 {
  font-size: 28px;
  color: var(--text-color);
  margin: 15px 0;
}
.not-found-content p {
  color: var(--text-light);
  margin-bottom: 25px;
}
.btn-home {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 25px;
  background: var(--primary-color);
  color: #fff;
  border-radius: 5px;
  transition: background 0.3s;
}
.btn-home:hover {
  background: var(--primary-dark);
}
</style>
