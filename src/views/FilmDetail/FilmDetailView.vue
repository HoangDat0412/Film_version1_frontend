<script setup>
import TrendingItem from '@/components/TrendingItem/TrendingItem.vue';
import { ref, watchEffect } from 'vue';
import { useFilmStore } from '@/stores/film';
import { useRateStore } from '@/stores/rate'
import { useRoute } from 'vue-router';
import StarRating from 'vue-star-rating'
import { useFavouriteFilmStore } from '@/stores/favouritefilm';
import { useUserStore } from '@/stores/user';
import { useLoadingStore } from '@/stores/loading';
const film = useFilmStore()
const rate = useRateStore()
const user = useUserStore()
const favouriteFilm = useFavouriteFilmStore()
const route = useRoute()
const rating = ref(0)

const setRating = async () => {
  if(user.userInformation.userType !==`NO` && user.userInformation.userType !== undefined){
    const data = {
    filmId: route.params.id,
    rate: rating.value
  }
  await rate.setRate(data)
  console.log("rate", rating.value);
  }else{
    alert("bạn cần đăng nhập để đánh giá ")
  }

}
const loading = useLoadingStore()
watchEffect(async () => {
  loading.setLoading(true)
  await film.setFilmDetail(route.params.id)
  await rate.setTotalPoint(route.params.id)
  await favouriteFilm.getFavouriteFilm()
  await film.getTopFilmView()
  await user.getUserInformation()
  favouriteFilm.checkFilmFavourite(route.params.id)
  rating.value = rate.totalPoint
  loading.setLoading(false)
})

</script>

<template>
  <main>
    <div class="row pt-5">
      <div class="col-12 col-lg-8">
        <div class="row ">
          <div class="col-12 col-sm-5 mb-5 mb-sm-0 filmdetail_wrap ">
            <div class="banner_filmdetail ">
              <main style="height: 100%;">
                <div class="film_item">
                  <!--  -->
                  <div class="myui-vodlist__thumb" :style="{ background: 'url(' + film.filmDetail?.imgurl + ')' }">
                    <span class="play hidden-xs"></span>
                    <span class="pic-tag pic-tag-top">
                      Full HD
                    </span>
                    <div class="myui-vodlist__detail">
                      <!-- <h3 class="title text-overflow pb-2 pt-2" style="background-color: #dd003f;">Xem Phim</h3> -->
                      <!-- <h3 class="title text-overflow pb-2 pt-2 d-block" style="background-color: #dd003f;">Xem Trailer</h3> -->
                      <RouterLink :to="`/watchfilm/${route.params.id}`" class="btn btn-danger" style="width: 50%;">Xem
                        Phim</RouterLink>
                      <a href="#trailer" class="btn btn-success" style="width: 50%;">Xem Trailer</a>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div class="col-12 col-sm-7">
            <h3 style="color: #ff9658;">{{ film.filmDetail?.name }}</h3>
            <p>Trạng thái : Hoàn Thành </p>
            <p>Thể loại :
              <span class='me-3' v-for="(i, key) in film.filmDetail?.filmType" :key="key">{{ i?.typeName }} </span>
            </p>
            <p>Thời lượng : {{ film.filmDetail?.time }}</p> 
            <p>Năm sản xuất : {{ film.filmDetail?.yRelease }}</p>
            <p>Đạo diễn : {{ film.filmDetail?.director }}</p>
            <p>Diễn viên :
              <span class='me-1' v-for="(i, key)  in film.filmDetail?.actor.slice(0,film.filmDetail?.actor.length-2)" :key="key">{{ i?.actorName }},</span>
              <span class='me-1'>{{ film.filmDetail?.actor[film.filmDetail?.actor.length-1].actorName }}</span>
            </p>
            <p>Lượt xem : {{ film.filmDetail?.views }}</p>

          </div>
          <div class="mt-5 d-flex justify-content-between">
            <div>
              <h3>Rating (lượt đánh giá : {{ rate?.numberRate }}) </h3>
            <StarRating v-model:rating="rating" @update:rating="setRating" :increment="0.5" />
            <!-- <StarRating v-else v-model:rating="rating" @update:rating=""/> -->
            </div>
            <div class="">
              <button v-if="user.userInformation.userType !==`NO` && user.userInformation.userType !== undefined" class="btn" @click="favouriteFilm.createAndDeleteFavouriteFilm({
                    filmId: parseInt(route.params.id)
                  })">
                <font-awesome-icon v-if="favouriteFilm.checkFilmIsFavourite" style="font-size: 30px; color: red;"
                  icon="fa-solid fa-heart" />
                <font-awesome-icon v-else style="font-size: 30px; color: white;" icon="fa-solid fa-heart" />
              </button>
            </div>
          </div>
          <div class="mt-5">
            <h3 style="color: #ff9658;">Nội Dung Chi Tiết</h3>
            <h4 class="mt-4">{{ film.filmDetail?.name }}</h4>
            <p>{{ film.filmDetail?.des }}</p>
            <h3 class="mt-5" style="color: #ff9658;" id="trailer">Trailer</h3>
            <iframe class="metaframe rptss mt-4" :src="film.filmDetail?.trailerurl" frameborder="0" scrolling="no"
              allow="autoplay; encrypted-media" allowfullscreen="true" width="100%" height="350px"></iframe>
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


<style scoped>
.banner_filmdetail {
  height: 400px;
}

@media screen and (max-width: 992px) {


  .banner_filmdetail {
    height: 360px;
    width: 90%;
  }
}

@media screen and (max-width: 576px) {
  .filmdetail_wrap {
    justify-content: center;
    display: flex;
  }

  .banner_filmdetail {
    height: 360px;
    width: 80%;
  }
}
</style>
