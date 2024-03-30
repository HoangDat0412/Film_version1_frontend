<script setup>
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';
import { onBeforeMount } from 'vue';
const route = useRoute()
const user =useUserStore()
import { ValidateEmail, checkNull } from '@/validation/validation';
import { ref } from 'vue';
import { useLoadingStore } from '@/stores/loading';
const userName = ref("");
const userType = ref("")
const email = ref("")
const errorUserName = ref("");
const errorEmail = ref("");
const loading = useLoadingStore()
onBeforeMount(async ()=>{
    loading.setLoading(true)
  await user.getUserById(route.params.id)
  userName.value = user.userUpdate?.userName
  email.value =user.userUpdate?.email
  userType.value =user.userUpdate?.userType
  loading.setLoading(false)
})


const handleUpdate = async ()=>{
    !checkNull(email.value) ? errorEmail.value = "email không được bỏ trống" : errorEmail.value = "";
    !checkNull(userName.value) ? errorUserName.value = "userName không được bỏ trống" : errorUserName.value = "";
    !ValidateEmail (email.value) ? errorEmail.value ="email không tồn tại" : errorEmail.value =""

        const data = {
            email: email.value,
            userName : userName.value,
            userType: userType.value
        };
        const flag = checkNull(email.value) && checkNull(userName.value) && ValidateEmail(email.value);
        if (flag) {
          await  user.updateUser(route.params.id,data)
        }
}
</script>

<template>
  <main>
    <div>
            <h3>Update User</h3>
            <form className='mt-4' >
                <div className="row mb-4">
                    <div className="col">
                        <div data-mdb-input-init className="form-outline">
                            <input type="text" v-model="userName" name='userName' className="form-control" />
                            <label className="form-label" >User Name</label>
                            <p style="color: red;">{{ errorUserName }}</p>
                        </div>
                    </div>
                    <div className="col">
                        <div data-mdb-input-init className="form-outline">
                            <input type="email" v-model="email"  name='email' className="form-control" />
                            <label className="form-label" >Email</label>
                            <p style="color: red;">{{ errorEmail }}</p>
                        </div>
                    </div>
                    <div className="col">
                        <div data-mdb-input-init className="form-outline">
                            <select name='userType' v-model="userType" className='form-select'>
                                <option value="USER">USER</option>
                                <option value="CLIENT">CLIENT</option>
                                <option value="STAFF">STAFF</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                            <label className="form-label" >User Type</label>
                        </div>
                    </div>
                </div> 
                <button data-mdb-ripple-init type="button" @click="()=> handleUpdate()" className="btn btn-primary btn-block mb-4" >Update</button>
            </form>
        </div>
  </main>
</template>
