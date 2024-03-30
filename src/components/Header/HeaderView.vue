<script setup>
import "./header.scss"
import { onBeforeUpdate, ref, watchEffect } from 'vue'
import { useUserStore } from "@/stores/user";
import router from "@/router";
const user = useUserStore()
import { useRoute } from 'vue-router';
import { LINKBE } from "@/utils/config";
import { useFilmStore } from "@/stores/film";
const route = useRoute()
const search = ref("");
const film = useFilmStore()
const handleSearch = async () => {

  if (route.name !== "search") {
    film.setSearchKey("name")
    router.push({ path: `search/${search.value}` })
  } else {
    film.setSearchKey("name")
    router.push({ path: `${search.value}` })
  }
  search.value = ""
}

const handleFilmType = (type)=>{
  if (route.name !== "type") {
    router.push({ path: `/type/${type}` })
  }
  else {
    router.push({ path: `${type}` })
  }
}
const handleCountry = async (type) => {
  if (route.name !== "country") {
    router.push({ path: `/country/${type}` })
  }
  else {
    router.push({ path: `${type}` })
  }
}
const avatar = ref("")

watchEffect(async () => {
  await user.getUserInformation()
  if (user.userInformation?.avatar) {
    let ava = user.userInformation?.avatar
    ava = ava.slice(ava.indexOf("/public"));
    avatar.value = `${LINKBE}${ava}`
  }
})
onBeforeUpdate(() => {
  if (user.userInformation?.avatar) {
    let ava = user.userInformation?.avatar
    ava = ava.slice(ava.indexOf("/public"));
    avatar.value = `${LINKBE}${ava}`
  }
})


</script>

<template>
  <main>
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <RouterLink to="/" class="navbar-brand">
          <img  src="../../assets/logofilm.png" alt="">
        </RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon">
            <font-awesome-icon icon="fa-solid fa-bars" />
          </span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav " id="menu">
            <li class="nav-item">
              <RouterLink class="nav-link active" aria-current="page" to="/">
                <h6>Trang Chủ</h6>
              </RouterLink>
            </li>

            <li class="nav-item">
              <a class="nav-link">
                <h6>Thể Loại <span class="arrow arrow-down"></span></h6>
              </a>
              <ul class="dropdown_menu dropdown-menu ">
                <div class="d-flex">
                  <div>
                    <li>
                      <a @click="() => handleFilmType(`Phiêu Lưu - Hành Động`)" class="dropdown-item">Phim Hành Động</a>
                    </li>
                    <li>
                      <a @click="() => handleFilmType(`Kinh Dị - Ma`)" class="dropdown-item">Phim Kinh Dị</a>
                    </li>
                    <li>
                      <a @click="() => handleFilmType(`Bí Ẩn - Siêu Nhiên`)" class="dropdown-item">Phim Siêu Nhiên</a>
                    </li>
                    <li>
                      <a @click="() => handleFilmType(`Khoa Học - Viễn Tưởng`)" class="dropdown-item">Phim Khoa Học</a>
                    </li>
                    <li>
                      <a @click="() => handleFilmType(`Tâm Lý - Tình Cảm`)" class="dropdown-item">Phim Tâm Lý</a>
                    </li>
                  </div>

                  <div>
                    <li>
                      <a @click="() => handleFilmType(`Cổ Trang - Thần Thoại`)" class="dropdown-item">Phim Cổ Trang</a>
                    </li>
                    <li>
                      <a @click="() => handleFilmType(`Phim Chiếu Rạp`)" class="dropdown-item">Phim Chiếu Rạp</a>
                    </li>
                    <li>
                      <a @click="() => handleFilmType(`Hoạt Hình`)" class="dropdown-item">Phim Hoạt Hình</a>
                    </li>
                    <li>
                      <a @click="() => handleFilmType(`Hài Hước`)" class="dropdown-item">Phim Hài Hước</a>
                    </li>
                    <li>
                      <a @click="() => handleFilmType(`Tâm Lý - Tình Cảm`)" class="dropdown-item">Phim Lãng Mạng</a>
                    </li>
                  </div>
                </div>

              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <h6>Quốc Gia <span class="arrow arrow-down"></span></h6>
              </a>
              <ul class="dropdown_menu dropdown-menu ">
                <div class="d-flex">
                  <div>
                    <li>
                      <a @click="() => handleCountry(`Âu - Mỹ`)" class="dropdown-item">Phim Âu Mỹ</a>
                    </li>
                    <li>
                      <a @click="() => handleCountry(`Nhật Bản`)" class="dropdown-item">Phim Nhật Bản</a>
                    </li>
                    <li>
                      <a @click="() => handleCountry(`Thái Lan`)"  class="dropdown-item">Phim Thái Lan</a>
                    </li>
                    <li>
                      <a @click="() => handleCountry(`Hàn Quốc`)"  class="dropdown-item">Phim Hàn Quốc</a>
                    </li>
                    <li>
                      <a @click="() => handleCountry(`Đài Loan`)"  class="dropdown-item">Phim Đài Loan</a>
                    </li>
                  </div>

                  <div>
                    <li>
                      <a @click="() => handleCountry(`Việt Nam`)"  class="dropdown-item">Phim Việt Nam</a>
                    </li>
                    <li>
                      <a @click="() => handleCountry(`Ấn Độ`)"  class="dropdown-item">Phim Ấn Độ</a>
                    </li>
                    <li>
                      <a @click="() => handleCountry(`Hồng Công`)"  class="dropdown-item">Phim Hồng Công</a>
                    </li>
                    <li>
                      <a @click="() => handleCountry(`Trung Quốc`)"  class="dropdown-item">Phim Trung Quốc</a>
                    </li>
                    <li>
                      <a @click="() => handleCountry(`Philippines`)"  class="dropdown-item">Phim Philippines</a>
                    </li>
                  </div>
                </div>

              </ul>
            </li>


            <li v-if="user.userInformation.userName" class="nav-item">
              <RouterLink class="nav-link" to='/checkout' href="#">
                <h6>Thanh Toán </h6>
              </RouterLink>
            </li>

          </ul>
          <div className="navbar-nav">
            <div class="input-group mt-2 mt-lg-0">
              <input type="text" class="form-control" @keyup.enter="() => handleSearch()" v-model="search"
                placeholder="" />
              <button @click="() => handleSearch()" class="btn btn-secondary">
                <font-awesome-icon icon="fa-solid fa-search" />
              </button>
            </div>
          </div>
          <div v-if="user.userInformation.userName" class="navbar-nav profile_user align-items-center mt-3 mt-lg-0">
            <RouterLink to="/profile" class="avatar me-0 me-lg-3">
              <img :src="avatar" class="rounded-circle" style="width: 50px;" :alt="avatar" />
              <h6>{{ user.userInformation?.userName }}</h6>
            </RouterLink>
          </div>
          <div v-else class="navbar-nav profile_user align-items-center mt-3 mt-lg-0">
            <RouterLink to="/login" style="height: 40px;" class="btn btn-secondary h">Đăng Nhập </RouterLink>
            <!-- <RouterLink to="/register" style="height: 40px;" class="btn btn-secondary h">Đăng Ký </RouterLink> -->
          </div>




        </div>
      </div>
    </nav>
  </main>
</template>
