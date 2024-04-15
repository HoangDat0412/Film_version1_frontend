<script setup>
import FilmItem from "@/components/FilmItem/FilmItem.vue"
import { useFilmStore } from "@/stores/film";
import { useLoadingStore } from "@/stores/loading";
import { watchEffect } from "vue";
const film = useFilmStore()
import { useRoute } from 'vue-router';
const route = useRoute()
const loading = useLoadingStore()
watchEffect(async () => {
  loading.setLoading(true)
    await film.searchFilmType({
      name: route.params.name
    })

  loading.setLoading(false)
})
</script>
<template>
  <main>
    <div className='container'>
      <div>
      </div>
      <div className='pt-3 pb-5'>
        <h3 className='mb-3'>Kết Quả Tìm Kiếm Cho: <span style="color: rgb(255, 150, 88);"> {{ route.params.name }}</span> </h3>
        <div className="row">
          <div v-for="(film) in film?.listFilmSearch" :key="film?.id" class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3"
            style="height: 240px;">
            <FilmItem :film="film" />
          </div>
        </div>
      </div>

    </div>
  </main>
</template>
