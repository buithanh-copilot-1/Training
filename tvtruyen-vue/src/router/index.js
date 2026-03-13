import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NovelList from '../views/NovelList.vue'
import NovelDetail from '../views/NovelDetail.vue'
import Chapter from '../views/Chapter.vue'
import Category from '../views/Category.vue'
import Search from '../views/Search.vue'
import TranslatorGroup from '../views/TranslatorGroup.vue'
import Author from '../views/Author.vue'
import Terms from '../views/Terms.vue'
import Privacy from '../views/Privacy.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // Danh sách truyện theo trạng thái
  {
    path: '/truyen-full',
    name: 'TruyenFull',
    component: NovelList,
    props: { title: 'Truyện Full', filter: 'full' }
  },
  {
    path: '/vip',
    name: 'TruyenVIP',
    component: NovelList,
    props: { title: 'Truyện VIP', filter: 'vip' }
  },
  {
    path: '/truyen-hot',
    name: 'TruyenHot',
    component: NovelList,
    props: { title: 'Truyện Hot', filter: 'hot' }
  },
  {
    path: '/truyen-moi',
    name: 'TruyenMoi',
    component: NovelList,
    props: { title: 'Truyện Mới', filter: 'new' }
  },
  // Danh sách theo số chương
  {
    path: '/duoi-100-chuong',
    name: 'Duoi100Chuong',
    component: NovelList,
    props: { title: 'Dưới 100 Chương', chapters: '0-100' }
  },
  {
    path: '/100-500-chuong',
    name: '100500Chuong',
    component: NovelList,
    props: { title: '100-500 Chương', chapters: '100-500' }
  },
  {
    path: '/500-1000-chuong',
    name: '5001000Chuong',
    component: NovelList,
    props: { title: '500-1000 Chương', chapters: '500-1000' }
  },
  {
    path: '/tren-1000-chuong',
    name: 'Tren1000Chuong',
    component: NovelList,
    props: { title: 'Trên 1000 Chương', chapters: '1000+' }
  },
  // Thể loại
  {
    path: '/the-loai/:slug',
    name: 'Category',
    component: Category
  },
  // Chi tiết truyện
  {
    path: '/truyen/:slug',
    name: 'NovelDetail',
    component: NovelDetail
  },
  // Đọc chương
  {
    path: '/truyen/:slug/chuong-:chapter',
    name: 'Chapter',
    component: Chapter
  },
  // Tìm kiếm nâng cao
  {
    path: '/tim-kiem-nang-cao',
    name: 'Search',
    component: Search
  },
  // Nhóm dịch
  {
    path: '/nhom-dich',
    name: 'TranslatorGroup',
    component: TranslatorGroup
  },
  // Tác giả
  {
    path: '/tac-gia/:slug',
    name: 'Author',
    component: Author
  },
  // Pháp lý
  {
    path: '/dieu-khoan',
    name: 'Terms',
    component: Terms
  },
  {
    path: '/chinh-sach-bao-mat',
    name: 'Privacy',
    component: Privacy
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
