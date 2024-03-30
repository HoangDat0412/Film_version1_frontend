<script setup>
import { useFilmStore } from '@/stores/film';
import { useLoadingStore } from '@/stores/loading';
import { watchEffect } from 'vue';
const loading = useLoadingStore()
const film = useFilmStore()
watchEffect(async () => {
  loading.setLoading(true)
  await film.setListFilm()
  loading.setLoading(false)
})

import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import router from '@/router';
import { RouterLink } from 'vue-router';
DataTable.use(DataTablesCore)

const columns = [
  { data: "id", title: "STT" },
  { data: "name", title: "Tên phim" },
  { data: 'views', title: "Lượt xem" },
  { data: null, render: '#action1', title: "Ảnh" },
  { data: null, render: '#action2' },
  { data: null, render: '#action3' },
]


</script>

<template>
  <main>
    <h2 style="color: black;">Quản Lý Phim </h2>
    <RouterLink class="btn btn-success mt-3 mb-4" to="/admin/createfilm">Tạo Phim</RouterLink>
    
      <DataTable id="table" class="table table-striped table-bordered display table_data table_film" :order="true"
        :data="film?.listFilmUser" :ordering="true" :columns="columns" style="color: black;" columns.defaultContent
        :options="{
        responsive: true, autoWidth: false, language: {
          search: 'Tìm Kiếm', zeroRecords: 'Không có dữ liệu'
        }
      }">
        <template #action1="props">
          <span><img :src="props.cellData.imgurl" style="width: 50px; height: 60px;" /></span>
        </template>
        <template #action2="props">
          <button class='btn btn-danger' @click="()=> film.deleteFilm(props.cellData.id)" >Xóa</button>
        </template>
        <template #action3="props">
          <button class='btn btn-success' @click="()=> router.push(`/film/update/${props.cellData.id}`)" >Cập Nhật</button>
        </template>

      </DataTable>
  </main>
</template>
