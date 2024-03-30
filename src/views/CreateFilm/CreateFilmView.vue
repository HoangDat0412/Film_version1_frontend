<script setup>
import { useFilmStore } from '@/stores/film';
import { checkNull } from '@/validation/validation';
import { ref } from 'vue';
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
const country = ref("")
const errCountry = ref("")
const time = ref("")
const errTime = ref("")
const srcurl = ref("")
const trailerurl = ref("")


const handleCreate =async ()=>{
  !checkNull(name.value) ? nameErr.value = "Không được bỏ trống" : nameErr.value = "";
  !checkNull(yRelease.value) ? yReleaseErr.value = "Không được bỏ trống" : yReleaseErr.value = "";
  !checkNull(director.value) ? directorErr.value = "Không được bỏ trống" : directorErr.value = "";
  !checkNull(des.value) ? desErr.value = "Không được bỏ trống" : desErr.value = "";
  !checkNull(country.value) ? errCountry.value = "Không được bỏ trống" : errCountry.value = "";
  !checkNull(time.value) ? errTime.value = "Không được bỏ trống" : errTime.value = "";
  const flag = checkNull(name.value) && checkNull(yRelease.value) && checkNull(director.value) && checkNull(des.value) && checkNull(country.value) && checkNull(time.value)
  const data = {
    name:name.value,
    hot:hot.value,
    des:des.value,
    yRelease:yRelease.value,
    director:director.value,
    status:status.value,
    country:country.value,
    time:time.value,
    srcurl:srcurl.value,
    trailerurl:trailerurl.value
  }
  if(flag){
    await film.createFilm(data)
    name.value = "";
    des.value = ""
    yRelease.value=""
    director.value = ""
    status.value =""
    country.value=""
    time.value = ""
    srcurl.value = ""
    trailerurl.value = ""
  }
}

</script>

<template>
  <main>
    <div style="color: black;">
      <h3 >Thêm Phim</h3>
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
              <label class="form-label" >Năm Phát Hành</label>
              <p style="color: red;">{{ yReleaseErr }}</p>
            </div>
          </div>
          <div class="col">
            <input type="text" name="director" v-model="director" class="form-control" />
            <label class="form-label">Đạo Diễn</label>
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
              <input type="text" name='name' v-model="srcurl" class="form-control" />
              <label class="form-label">Link Phim</label>
            </div>
          </div>

          <div class="col">
            <div data-mdb-input-init class="form-outline">
              <input type="text" name='time' v-model="trailerurl" class="form-control" />
              <label class="form-label">Link Trailer</label>
            </div>
          </div>
        </div>
        <div data-mdb-input-init class="form-outline mb-4">
          <textarea name="des" v-model="des"  class="form-control"></textarea>
          <label>Mô tả</label>
          <p style="color: red;">{{ desErr }}</p>
        </div>
        <button data-mdb-ripple-init type="button" @click="()=> handleCreate()" class="btn btn-primary btn-block mb-4">Thêm Phim</button>
      </form>

    </div>
  </main>
</template>
