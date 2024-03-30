<script setup>
import "./filmitem.scss"

const props = defineProps(['film'])
let film = props.film
</script>

<template>
    <main style="height: 100%;"> 
        <div class="film_item" >
                <RouterLink :to="`/filmdetail/${film?.id}`" class="myui-vodlist__thumb" :style="{background:'url(' + film?.imgurl + ')'}">
                    <span class="play hidden-xs"></span>
                    <span class="pic-tag pic-tag-top">
                        Full HD
                    </span>
                    <div class="myui-vodlist__detail">
                        <h3 class="title text-overflow pb-2">{{ film?.name }}</h3>
                    </div>
                </RouterLink>
            </div>
    </main>
</template>