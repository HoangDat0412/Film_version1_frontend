<script setup>
import TrendingItem from '@/components/TrendingItem/TrendingItem.vue';
import moment from 'moment';
import { useFilmStore } from '@/stores/film';
import { useRateStore } from '@/stores/rate';
import { useCommentStore } from "@/stores/comment"
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import StarRating from 'vue-star-rating'
import { checkNull } from '@/validation/validation';
import { useFavouriteFilmStore } from '@/stores/favouritefilm';
import { LINKBE } from '@/utils/config';
import { useLoadingStore } from '@/stores/loading';
import { useUserStore } from '@/stores/user';
const route = useRoute()
const film = useFilmStore();
const rate = useRateStore()
const favouriteFilm = useFavouriteFilmStore()
const commentStore = useCommentStore()
const user = useUserStore()
const loading = useLoadingStore()
let timer = null;
const startTimer = () => {
  timer = setInterval(async () => {
    await film.addView(route.params.id)
    clearInterval(timer);
  }, 30000);
}
onBeforeMount(async () => {
  loading.setLoading(true)
  await film.setFilmWatching(route.params.id)
  await rate.setTotalPoint(route.params.id)
  await commentStore.getAllComment(route.params.id)
  await film.getTopFilmView()
  await favouriteFilm.getFavouriteFilm()
  await user.getUserInformation()
  favouriteFilm.checkFilmFavourite(route.params.id)
  rating.value = rate.totalPoint
  loading.setLoading(false)

  //await film.addView(route.params.id)
  startTimer()

})

function handleImg(img) {
  if (img) {
    let imgpath = img.slice(img.indexOf("/public"));
    return `${LINKBE}${imgpath}`
  } else {
    return null
  }
}

const rating = ref(0)
const comment = ref("")
const handleComment = async () => {

  if (user.userInformation.userType !== `NO` && user.userInformation.userType !== undefined) {
    const flag = checkNull(comment.value)
    if (flag) {
      const data = {
        filmId: route.params.id,
        comment: comment.value
      }
      await commentStore.createComment(data)
    }
    comment.value = ""
  }else{
    alert("Bạn cần đăng nhập để bình luận !")
    comment.value = ""
  }
}
const setRating = async () => {
  if (user.userInformation.userType !== `NO` && user.userInformation.userType !== undefined) {
    const data = {
      filmId: route.params.id,
      rate: rating.value
    }
    await rate.setRate(data)
    console.log("rate", rating.value);
  } else {
    alert("bạn cần đăng nhập để đánh giá ")
  }
}

onBeforeUnmount(() => {
  clearInterval(timer);
});

</script>

<template>
  <main>
    <div>
      <iframe class="mt-4" :src="film?.src" frameborder="0" scrolling="no" allow="autoplay; encrypted-media"
        allowfullscreen="true" width="100%" height="500px"></iframe>
      <div class="mt-3">
        <button @click="() => film.handleChangeServer(1)" class="btn btn-dark me-2">Server 1</button>
        <button @click="() => film.handleChangeServer(2)" class="btn btn-dark">Server 2</button>
      </div>
      <div class="d-flex justify-content-between">
        <div class="mt-4">
          <h3>Rate (lượt đánh giá : {{ rate?.numberRate }}) </h3>
          <StarRating v-model:rating="rating" @update:rating="setRating" :increment="0.5" />
        </div>
        <div class="mt-4">
          <button v-if="user.userInformation.userType !== `NO` && user.userInformation.userType !== undefined"
            class="btn" @click="favouriteFilm.createAndDeleteFavouriteFilm({
        filmId: parseInt(route.params.id)
      })">
            <font-awesome-icon v-if="favouriteFilm.checkFilmIsFavourite" style="font-size: 30px; color: red;"
              icon="fa-solid fa-heart" />
            <font-awesome-icon v-else style="font-size: 30px; color: white;" icon="fa-solid fa-heart" />
          </button>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12 col-lg-8 ">
        <div>
          <h3 style="color: #ff9658;">Nội Dung Chi Tiết</h3>
          <h4 class="mt-4">{{ film.filmWatching?.name }}</h4>
          <p>{{ film.filmWatching?.des }}</p>
        </div>

        <div class="comment p-3" style="background-color: white;">
          <div class=" pb-4">
            <textarea class="form-control" v-model="comment" @keyup.enter="handleComment"
              placeholder="Viết bình luận ..." rows="3"></textarea>
            <!-- <button class="btn" style="background-color: #9cb4d8;" @click="handleComment">Comment</button> -->
          </div>
          <div>
            <div v-for="(i, key) in commentStore?.listComment" :key="key" class="card mb-3">
              <div class="card-body">
                <div class="d-flex flex-start align-items-center">
                  <img class="rounded-circle shadow-1-strong me-3" :src="handleImg(i?.avatar ? i?.avatar : false)"
                    alt="avatar" width="40" height="40" />
                  <div class="w-100">
                    <div class="d-flex justify-content-between align-items-center" style="color: black;">
                      <h6 class="mb-0">
                        {{ i?.userName }}
                        <br>
                        <span style="color: black;">{{ i?.comment }}</span>
                      </h6>
                      <p class="mb-0">{{ moment(i?.createdAt).format('DD/MM/YYYY-HH:MM') }}</p>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="col-0 col-lg-4 trending">
        <h5 class="mb-2 mt-4" style="color: rgb(255, 150, 88);">Lượt Xem Nhiều Nhất</h5>
        <hr>
        <div class="mt-4">
          <div v-for="(film, index) in film?.topViews" :key="index" class="mb-3">
            <TrendingItem :film="film" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
