<script setup>
import { useFavouriteFilmStore } from '@/stores/favouritefilm';
import { useUserStore } from '@/stores/user';
import { useCheckoutStore } from "@/stores/checkout"
import { ref, onBeforeMount, watchEffect } from 'vue';
import { ValidateEmail, checkNull } from '@/validation/validation';
import { useLoadingStore } from '@/stores/loading';
const user = useUserStore()
const favouriteFilm = useFavouriteFilmStore()
const checkout = useCheckoutStore()
const avatar = ref({})
const userName = ref();
const passWord = ref("")
const email = ref("")
const errorPassword = ref("")
const errorUserName = ref("");
const errorEmail = ref("");
const loading = useLoadingStore()
watchEffect(async () => {
  loading.setLoading(true)
  await user.getUserInformation()
  await favouriteFilm.getFavouriteFilm()
  await checkout.getUserCheckout()
  await checkout.getUserCheckoutBitcoin()
  loading.setLoading(false)
})
onBeforeMount(async () => {
  await user.getUserInformation()
  userName.value = user.userInformation?.userName
  email.value = user.userInformation?.email
})

const handleUploadAvatar = async () => {
  let formData = new FormData()
  const ava = avatar.value;
  formData.append('avatar', ava.value)
  await user.uploadAvatar(formData)
}

const handleUpdate = async () => {
  !checkNull(email.value) ? errorEmail.value = "email không được bỏ trống" : errorEmail.value = "";
  !checkNull(passWord.value) ? errorPassword.value = "passWord không được bỏ trống" : errorPassword.value = "";
  !checkNull(userName.value) ? errorUserName.value = "userName không được bỏ trống" : errorUserName.value = "";
  !ValidateEmail(email.value) ? errorEmail.value = "email không tồn tại" : errorEmail.value = ""

  const data = {
    email: email.value,
    userName: userName.value,
    passWord: passWord.value
  };
  const flag = checkNull(email.value) && checkNull(passWord.value) && checkNull(userName.value) && ValidateEmail(email.value);
  if (flag) {
    console.log(data);
    await user.userUpdateInformation(data)
  }
}

</script>

<template>
  <main>
    <div className='container pt-5 pb-5'>
      <div className='row'>
        <div className="col-12 col-lg-7">
          <form>
            <div className='form-group position-relative mb-2'>
              <label htmlFor="taikhoan">Tài Khoản</label>
              <input name="userName" className="form-control" type="text" v-model="userName" />
              <p style="color: red;">{{ errorUserName }}</p>
            </div>
            <div class='form-group position-relative mb-2'>
              <label htmlFor="matKhau">Mật Khẩu</label>
              <input name="passWord" className="form-control" type="text" v-model="passWord" />
              <p style="color: red;">{{ errorPassword }}</p>
            </div>
            <div class='form-group position-relative mb-2'>
              <label htmlFor="email">Email</label>
              <input name="email" className="form-control" type="email" v-model="email" />
              <p style="color: red;">{{ errorEmail }}</p>
            </div>
            <button type="button" @click="handleUpdate" class="btn btn-success mt-3 container">
              Cập Nhật
            </button>
          </form>
        </div>
        <div className="col-12 col-lg-5 mt-5 mt-lg-0">
          <ul className="list-group mt-2">
            <li className="list-group-item text-muted">Hoạt động</li>

            <li className="list-group-item text-right">
              <span className="float-left">
                <strong>Phim yêu thích: {{ favouriteFilm.listFavouriteFilm?.length }}</strong>
              </span>

            </li>
          </ul>

          <br>

          <div v-if="user.userInformation.userType === `ADMIN` || user.userInformation.userType === `STAFF`">
            <RouterLink class="btn btn-success me-2" to='/admin'>
              Go To Admin Page
            </RouterLink>

            <RouterLink to="/" style="height: 40px;" class="btn btn-secondary h" @click="user.logout()">Đăng xuất
            </RouterLink>
          </div>
        </div>



      </div>
      <hr>
      <form class="mt-4">
        <div className='form-group position-relative mb-2'>
          <label htmlFor="avatar">img</label>
          <input name="avatar" className="form-control" @change="(e) => avatar.value = e.target.files[0]" type="file" />
        </div>
        <button class="btn btn-success" type="button" @click="() =>handleUploadAvatar()">Upload avatar</button>

      </form>
    </div>
  </main>
</template>