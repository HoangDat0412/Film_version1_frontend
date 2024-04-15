<script setup>
import { watchEffect } from 'vue';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import './home.scss';
import FilmItem from "@/components/FilmItem/FilmItem.vue"
import TrendingItem from '@/components/TrendingItem/TrendingItem.vue';
const breakpoints = {
  0: {
    itemsToShow: 2.5,
    snapAlign: 'center',
  },
  500: {
    itemsToShow: 3.5,
    snapAlign: 'center',
  },
  700: {
    itemsToShow: 4.5,
    snapAlign: 'center',
  },
  1024: {
    itemsToShow: 5,
    snapAlign: 'start',
  },
}
import { useRoute } from 'vue-router';
const route = useRoute()
import router from '@/router';
import { useFilmStore } from "@/stores/film"
import { useLoadingStore } from '@/stores/loading';
const film = useFilmStore()
const loading = useLoadingStore()
watchEffect(async () => {
  loading.setLoading(true)
  await film.setListFilmHome()
  await film.getTopFilmView()
  loading.setLoading(false)
})

const handleSearchYear = (year)=>{
  if (route.name !== "year") {
    router.push({ path: `/year/${year}` })
  }
  else {
    router.push({ path: `${year}` })
  }
}

// const year = ref([
//   2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024
// ])

</script>

<template>
  <main>


    <div class="row mt-3">
      <div class="col-12 col-md-8" style="border-top: solid 1px rgba(255, 255, 255, .08);">
        <h2 class=" mb-5 mt-4" style="color: rgb(255, 150, 88);">Phim Hot</h2>
        <Carousel :items-to-show="1.5" :breakpoints="breakpoints" :wrap-around="true">
          <Slide v-for="(film, index) in film?.listFilmUser?.slice(0, 10)" :key="index">
            <div class="carousel__item" style="width: 90%; height: 220px;">
              <FilmItem :film="film" />
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>


        <div class="mt-5">
          <h2 class="mb-5" style="color: rgb(255, 150, 88);">Phim Mới</h2>
          <div class="row">
            <div v-for="(film, index) in film?.listFilmUser?.slice(0, 16)" :key="index"
              class="col-6 col-sm-4 col-md-3 mb-3" style="height: 240px;">
              <FilmItem :film="film" />
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4 trending">

        <div>
          <h5 class="mb-2 mt-3" style="color: rgb(255, 150, 88);">Năm Phát Hành</h5>
          <hr>
          <div class="row">
            <button @click="()=> handleSearchYear(i?.yRelease)" class="col-2 col-md-3 btn_year m-2" v-for="i in film.listYear" :key="i">{{ i?.yRelease }}</button>
          </div>
        </div>

        <div class="">
          <h5 class="mb-2 mt-4" style="color: rgb(255, 150, 88);">Lượt Xem Nhiều Nhất</h5>
          <hr>
          <div class="mt-4">
            <div v-for="(film, index) in film?.topViews" :key="index" class="mb-3">
              <TrendingItem :film="film" />
            </div>

          </div>
        </div>

      </div>

    </div>
  </main>
</template>

<style scoped></style>
