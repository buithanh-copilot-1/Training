<template>
  <section class="section">
    <div class="section-title">
      <h2><i :class="['fas', icon]"></i> {{ title }}</h2>
      <a href="#" class="view-all">Xem tất cả <i class="fas fa-chevron-right"></i></a>
    </div>
    <div class="carousel">
      <button class="carousel-btn prev" @click="scrollCarousel(-1)"><i class="fas fa-chevron-left"></i></button>
      <div class="carousel-track" ref="carouselTrack">
        <NovelCard v-for="novel in novels" :key="novel.id" :novel="novel" />
      </div>
      <button class="carousel-btn next" @click="scrollCarousel(1)"><i class="fas fa-chevron-right"></i></button>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import NovelCard from './NovelCard.vue'

export default {
  name: 'NovelCarousel',
  components: {
    NovelCard
  },
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    novels: {
      type: Array,
      required: true
    }
  },
  setup() {
    const carouselTrack = ref(null)

    const scrollCarousel = (direction) => {
      if (carouselTrack.value) {
        const scrollAmount = 200 * 3
        carouselTrack.value.scrollBy({
          left: direction * scrollAmount,
          behavior: 'smooth'
        })
      }
    }

    return {
      carouselTrack,
      scrollCarousel
    }
  }
}
</script>
