<script setup>
import FilmItem from "@/components/FilmItem/FilmItem.vue"
import { useFavouriteFilmStore } from "@/stores/favouritefilm";
import { watchEffect } from "vue";
const favouriteFilm = useFavouriteFilmStore()
watchEffect(async ()=>{
    await favouriteFilm.getFavouriteFilm()
})

</script>

<template>
    <main>
        <div className='container'>
            <div className='pt-3 pb-5'>
                <h3 className='mb-3'>Phim Yêu Thích</h3>
                <div className="row">
                    <div v-for="(film,index) in favouriteFilm?.listFavouriteFilm" :key="index" class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3" style="height: 240px;" >
                        <FilmItem :film="film"/>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>