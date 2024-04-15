<script setup>
import FilmItem from "@/components/FilmItem/FilmItem.vue"
import router from "@/router";
import { useFilmStore } from "@/stores/film";
import { useLoadingStore } from "@/stores/loading";
import { watchEffect,ref } from "vue";
const film = useFilmStore()
import { useRoute } from 'vue-router';
const route = useRoute()
const loading = useLoadingStore()

let index = ref( parseInt(route.params.page) || 1)

watchEffect(async () => {
    loading.setLoading(true)
    await film.searchFilmType({
        name: route.params.name,
        pag: route.params.page
    })
    // index = parseInt(route.params.page)
    index.value = parseInt(route.params.page) || 1
    loading.setLoading(false)
})

const handlepage = (page) => {
    router.push({ path: `/type/${route.params.name}/${page}` })
}
const handleback = ()=>{
    let page = parseInt(route.params.page)
    if(page>1){
        page = page-1;
        router.push({ path: `/type/${route.params.name}/${page}` })
    }
}
const handleNext = ()=>{
    let page = parseInt(route.params.page)
    if(page<film.pagination){
        page = page+1;
        router.push({ path: `/type/${route.params.name}/${page}` })
    }
}
</script>

<template>
    <main>
        <div>
            <div>
            </div>
            <div className='pt-3 pb-5'>
                <h3 className='mb-3'>Kết Quả Tìm Kiếm Cho: <span style="color: rgb(255, 150, 88);"> {{ route.params.name
                        }}</span> </h3>
                <div className="row">
                    <div v-for="(film) in film?.listFilmSearch" :key="film?.id"
                        class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3" style="height: 240px;">
                        <FilmItem :film="film" />
                    </div>
                </div>
            </div>

            <nav aria-label="Page navigation example mb-4" v-if="film.pagination.length > 1">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" @click="()=> handleback()" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item" v-for="i in film?.pagination.slice(index,index+8)" :key="i"><a @click="()=>handlepage(i)" class="page-link" >{{ i
                            }}</a></li>
                    <li class="page-item">
                        <a class="page-link" @click="()=> handleNext()" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </main>
</template>