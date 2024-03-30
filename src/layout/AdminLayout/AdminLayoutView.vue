<script setup>
import router from '@/router';
import { useUserStore } from '@/stores/user';
import { onBeforeMount } from 'vue';
const user = useUserStore()
onBeforeMount(async ()=>{
    await user.getUserInformation()
    if(user?.userInformation?.userType !== "ADMIN" && user?.userInformation?.userType !== "STAFF" ){
        router.push("/")
    }
})
</script>

<template>
    <main>
        <div class="container-fluid">
            <div class="row flex-nowrap">
                <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div
                        class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                            id="menu">
                            <li class="nav-item">
                                <RouterLink to='/admin' class="nav-link align-middle px-0">
                                    <font-awesome-icon icon="fa-solid fa-home" /><span class="ms-1 d-none d-sm-inline">Dashboard</span>
                                </RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink to='/admin/user' class="nav-link align-middle px-0">
                                    <font-awesome-icon icon="fa-solid fa-user" /><span class="ms-1 d-none d-sm-inline">Quản Lý Người Dùng</span>
                                </RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink to='/admin/checkout' class="nav-link px-0 align-middle">
                                    <font-awesome-icon icon="fa-solid fa-money-check" /> <span
                                        className="ms-1 d-none d-sm-inline">Quản Lý Thanh Toán</span>
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to='/admin/film' class="nav-link px-0">
                                    <font-awesome-icon icon="fa-solid fa-film" /> <span
                                                class="d-none d-sm-inline">Quản Lý Phim</span> </RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink to='/' class="nav-link px-0 align-middle">
                                <font-awesome-icon icon="fa-solid fa-home" /> <span
                                        className="ms-1 d-none d-sm-inline">Quay Về Trang Chủ</span>
                                </RouterLink>
                            </li>

                        </ul>
                    </div>
                </div>
                <div className="col py-3" style="background-color: white;">
                    <RouterView/>
            </div>
        </div>
    </div>

</main></template>

<style>

.nav-link{
    color: aliceblue;
    &:focus{
        color: rgb(255, 150, 88);
    }
    &:hover{
        color: rgb(255, 150, 88);
    }
}
.router-link-exact-active {
    color: rgb(255, 150, 88);
}

</style>