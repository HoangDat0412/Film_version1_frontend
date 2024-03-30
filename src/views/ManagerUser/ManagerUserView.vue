<script setup>
import { useLoadingStore } from '@/stores/loading';
import { useUserStore } from '@/stores/user';
import { watchEffect } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import router from '@/router';
import './manageuser.scss'
import { RouterLink } from 'vue-router';
DataTable.use(DataTablesCore)

const columns = [
  { data: "id", title: "ID" },
  { data: 'userName', title: "Người Dùng" },
  { data: "email", title: "Email" },
  { data: "userType", title: "Type" },
  { data: null, render: '#action1'},
  { data: null, render: '#action' }
]
// const order = [
//     [0, 'asc'],
//     [1, 'asc'],
//   ]
const loading = useLoadingStore()
const user = useUserStore()
watchEffect(async () => {
  loading.setLoading(true)
  await user.getListUser()
  loading.setLoading(false)
})
</script>

<template>
  <main>
    <h2  class='mb-4' style="color: black;">Quản Lý Người Dùng</h2>

    <RouterLink class="btn btn-success" to="/register" >Tạo Người Dùng Mới</RouterLink>
    <div class="mt-4">
      <DataTable id="table" class="table table-striped table-bordered display table_data table_user" order :data="user?.userList" :ordering="true"  :columns="columns"
      style="color: black;" columns.defaultContent :options="{ responsive: true, autoWidth: false,language:{
        search:'Tìm Kiếm',zeroRecords:'Không có dữ liệu'
      } }">

      <template #action1="props">
        <Button class="btn btn-danger" @click="() => user.deleteUser(props.cellData.id)">Xóa</Button>
      </template>
      <template #action="props">
        <button className='btn btn-success' @click="() => router.push(`/user/update/${props.cellData.id}`)">Cập Nhật</button>
      </template>

    </DataTable>
    </div>
  </main>
</template>
<style scoped>
@import 'datatables.net-dt';
@import 'datatables.net-bs5';


</style>