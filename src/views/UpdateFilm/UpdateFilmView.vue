<script setup>
import AddActor from "@/components/AddActor/AddActor.vue"
import AddFilmType from "@/components/AddFilmType/AddFilmType.vue"
import UploadFilm from "@/components/UploadFilm/UploadFilm.vue"

import { useFilmStore } from '@/stores/film';
import { useLoadingStore } from "@/stores/loading";
import { checkNull } from '@/validation/validation';
import { ref, onBeforeMount } from 'vue';
import { useRoute } from "vue-router";
const route = useRoute()
const film = useFilmStore()
const name = ref("")
const nameErr = ref("")
const hot = ref(true)
const status = ref(true)
const yRelease = ref("")
const yReleaseErr = ref("")
const director = ref("")
const directorErr = ref("")
const des = ref("")
const desErr = ref("")
const img = ref("")
const imgErr = ref("")
const country = ref("")
const errCountry = ref("")
const time = ref("")
const errTime = ref("")
const srcurl = ref("")
const errSrcurl = ref("")
const trailerurl = ref("")
const errTrailerurl = ref("")

const loading = useLoadingStore()
onBeforeMount(async () => {
  loading.setLoading(true)
  await film.setFilmWatching(route.params.id)
  name.value = film.filmWatching?.name;
  hot.value = film.filmWatching?.hot;
  status.value = film.filmWatching?.status;
  yRelease.value = film.filmWatching?.yRelease;
  director.value = film.filmWatching?.director;
  country.value = film.filmWatching?.country
  des.value = film.filmWatching?.director;
  img.value = film.filmWatching?.imgurl;
  time.value = film.filmWatching?.time
  srcurl.value = film.filmWatching?.src2
  trailerurl.value = film.filmWatching?.trailerurl
  loading.setLoading(false)
})

const handleUpdate = async () => {
  !checkNull(name.value) ? nameErr.value = "không được bỏ trống" : nameErr.value = "";
  !checkNull(yRelease.value) ? yReleaseErr.value = "không được bỏ trống" : yReleaseErr.value = "";
  !checkNull(director.value) ? directorErr.value = "không được bỏ trống" : directorErr.value = "";
  !checkNull(des.value) ? desErr.value = "không được bỏ trống" : desErr.value = "";
  !checkNull(img.value) ? imgErr.value = "không được bỏ trống" : imgErr.value = "";
  !checkNull(country.value) ? errCountry.value = "không được bỏ trống" : errCountry.value = "";
  !checkNull(time.value) ? errTime.value = "Không được bỏ trống" : errTime.value = "";
  const flag = checkNull(name.value) && checkNull(yRelease.value) && checkNull(director.value) && checkNull(des.value) && checkNull(img.value) && checkNull(time.value)
  const data = {
    name: name.value,
    hot: hot.value,
    des: des.value,
    yRelease: yRelease.value,
    director: director.value,
    status: status.value,
    imgurl: img.value,
    country: country.value,
    time:time.value,
    trailerurl:trailerurl.value,
    src2:srcurl.value
  }
  if (flag) {
    await film.updateFilm(route.params.id, data)
  }
}

</script>

<template>
  <main style="color: black;">
    <div class="spinner" v-if="film.loading">
      <div class="spinner-border text-dark" role="status">
        <span class="sr-only">Loading...</span>
      </div>

    </div>
    <h3>Cập Nhật Phim</h3>
    <form class='mt-4'>
      <div class="row mb-4">
        <div class="col">
          <div data-mdb-input-init class="form-outline">
            <input type="text" name='name' v-model="name" class="form-control" />
            <label class="form-label">Tên Phim</label>
            <p style="color: red;">{{ nameErr }}</p>
          </div>
        </div>
        <div class="col">
          <div data-mdb-input-init class="form-outline">
            <select name='hot' v-model="hot" class='form-select'>
              <option :value="true">True</option>
              <option :value="false">Fasle</option>
            </select>
            <label class="form-label">Hot</label>
          </div>
        </div>
        <div class="col">
          <div data-mdb-input-init class="form-outline">
            <select name='status' v-model="status" class='form-select'>
              <option :value="true">True</option>
              <option :value="false">Fasle</option>
            </select>
            <label class="form-label">Trạng Thái</label>
          </div>


        </div>
        <div class="col">
            <div data-mdb-input-init class="form-outline">
              <input type="text" name='time' v-model="time" class="form-control" />
              <label class="form-label">Thời lượng</label>
              <p style="color: red;">{{ errTime }}</p>
            </div>
          </div>
      </div>
      <div class="row mb-4">
        <div class="col">
          <div data-mdb-input-init class="form-outline">
            <input type="text" name="yRelease" v-model="yRelease" class="form-control" />
            <label class="form-label">Năm Phát Hành</label>
            <p style="color: red;">{{ yReleaseErr }}</p>
          </div>
        </div>
        <div class="col">
          <input type="text" name="director" v-model="director" class="form-control" />
          <label class="form-label">Đạo diễn</label>
          <p style="color: red;">{{ directorErr }}</p>
        </div>
        <div class="col">
          <input type="text" name="country" v-model="country" class="form-control" />
          <label class="form-label">Quốc Gia</label>
          <p style="color: red;">{{ errCountry }}</p>
        </div>
      </div>
      <div class="row mb-4">
          <div class="col">
            <div data-mdb-input-init class="form-outline">
              <input type="text" name='src' v-model="srcurl" class="form-control" />
              <label class="form-label">Link Phim</label>
              <p style="color: red;">{{ errSrcurl }}</p>
            </div>
          </div>

          <div class="col">
            <div data-mdb-input-init class="form-outline">
              <input type="text" name='trailer' v-model="trailerurl" class="form-control" />
              <label class="form-label">Link Trailer</label>
              <p style="color: red;">{{ errTrailerurl }}</p>
            </div>
          </div>
        </div>
      <div data-mdb-input-init class="form-outline mb-4">
        <textarea name="des" v-model="des" class="form-control"></textarea>
        <label>Miêu tả</label>
        <p style="color: red;">{{ desErr }}</p>
      </div>
      <div data-mdb-input-init class="form-outline mb-4">
        <input name="img" v-model="img" class="form-control" />
        <label>Ảnh</label>
        <p style="color: red;">{{ imgErr }}</p>
      </div>
      <button data-mdb-ripple-init type="button" @click="() => handleUpdate()"
        class="btn btn-primary btn-block mb-4">Cập Nhật</button>
    </form>
    <UploadFilm />
    <AddActor />
    <AddFilmType />

  </main>
</template>

<style scoped>
.spinner {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  right: 0;
  background-color: aliceblue;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
}
</style>