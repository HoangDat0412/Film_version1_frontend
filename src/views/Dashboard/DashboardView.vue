<script setup>
// import CardView from '@/components/Card/CardView.vue';
import { useUserStore } from '@/stores/user';
import { watchEffect } from 'vue';
import moment from 'moment';
import { useLoadingStore } from '@/stores/loading';
import { useFilmStore } from '@/stores/film';
import { useCheckoutStore } from '@/stores/checkout';
const user = useUserStore()
const film = useFilmStore()
const checkout = useCheckoutStore()
const loading = useLoadingStore()
watchEffect(async () => {
  loading.setLoading(true)
  await user.getListUser()
  await film.setListFilm()
  await checkout.getAllCheckout()
  await film.getTopFilmView()
  loading.setLoading(false)
})
</script>

<template>
    <main style="color: black;">
        <div class="d-flex justify-content-between align-items-center">
            <h2>Dashboard</h2>
            <p class="text-primary">{{ moment(Date.now()).format('DD-MM-YYYY') }}</p>
        </div>
        <div class="row mt-4">
            <div class="col-3">
                <div class="card" style="color: black;">
                    <div class="card-body">
                        <div class="row">
                            <div class="col mt-0">
                                <h5 class="card-title">Người Dùng</h5>
                            </div>

                            <div class="col-auto">
                                <div class="stat text-primary">
                                    <font-awesome-icon icon="fa-solid fa-user" />
                                </div>
                            </div>
                        </div>
                        <h2 class="mt-1 mb-3">{{ user?.userList.length }}</h2>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="card" style="color: black;">
                    <div class="card-body">
                        <div class="row">
                            <div class="col mt-0">
                                <h5 class="card-title">Phim</h5>
                            </div>

                            <div class="col-auto">
                                <div class="stat text-primary">
                                    <font-awesome-icon icon="fa-solid fa-film" />
                                </div>
                            </div>
                        </div>
                        <h2 class="mt-1 mb-3">{{ film?.listFilmUser.length }}</h2>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="card" style="color: black;">
                    <div class="card-body">
                        <div class="row">
                            <div class="col mt-0">
                                <h5 class="card-title">Lượt Xem</h5>
                            </div>

                            <div class="col-auto">
                                <div class="stat text-primary">
                                    <font-awesome-icon icon="fa-solid fa-film" />
                                </div>
                            </div>
                        </div>
                        <h2 class="mt-1 mb-3">{{ film?.totalView }}</h2>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="card" style="color: black;">
                    <div class="card-body">
                        <div class="row">
                            <div class="col mt-0">
                                <h5 class="card-title">Danh Thu</h5>
                            </div>

                            <div class="col-auto">
                                <div class="stat text-primary">
                                    <font-awesome-icon icon="fa-solid fa-money-check" />
                                </div>
                            </div>
                        </div>
                        <h2 class="mt-1 mb-3">{{ checkout?.totalPrice }} VND</h2>
                    </div>
                </div>
            </div>
        </div>
                <!-- table top 10 phim ăn khách nhất -->

                <div class="mt-4">
            <h3>Top 10 Phim Ăn Khách : </h3>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th scope="col">Phim ID</th>
                    <th scope="col">Phim</th>
                    <th scope="col">Lượt xem</th>
                    <th scope="col">Quốc Gia</th>
                    <th scope="col">Ảnh</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in film?.topViews" :key="index">
                    <th scope="row">{{ item?.id }}</th>
                    <td>{{ item?.name }}</td>
                    <td>{{ item?.views }}</td>
                    <td>{{ item?.country }}</td>
                    <td><img :src="item.imgurl" style="width: 50px; height: 60px;" /></td>
                </tr>

            </tbody>
        </table>


        <!-- table top 10 người dùng mới nhất -->
        <div class="mt-4">
            <h3>Top 10 Người Dùng Mới : </h3>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th scope="col">ID Người Dùng</th>
                    <th scope="col">Tài Khoản</th>
                    <th scope="col">Email</th>
                    <th scope="col">Type</th>
                    <th scope="col">Ngày Đăng Ký</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,key) in user?.newuserlist" :key="key">
                    <th scope="row">{{ item.id }}</th>
                    <td>{{ item?.userName }}</td>
                    <td>{{ item?.email }}</td>
                    <td>{{ item?.userType }}</td>
                    <td>{{ moment(item?.createdAt).format('DD-MM-YYYY') }}</td>
                </tr>

            </tbody>
        </table>

    </main>
</template>



<style scoped>
.card {
    box-shadow: 0 0 0.875rem 0 rgba(33, 37, 41, .05);
    margin-bottom: 24px;
}

.card-body {
    color: var(--bs-card-color);
    flex: 1 1 auto;
    padding: 1.25rem;
}

.stat {
    font-size: 20px;
}

.card-title {
    color: #939ba2;
    font-size: .925rem;
    font-weight: 600;
}
</style>