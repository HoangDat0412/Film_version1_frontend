<script setup>
    import { ref } from 'vue'
    import { checkNull,ValidateEmail } from "@/validation/validation"
    import {useUserStore} from "@/stores/user"
    const user = useUserStore()
    const email = ref("")
    const errorEmail = ref("")
    const passWord = ref("")
    const errorPassword = ref("")
    const userName = ref("");
    const errorUserName = ref("");

    const handleRegister = async ()=>{
        !checkNull(email.value) ? errorEmail.value = "email không được bỏ trống" : errorEmail.value = "";
        !checkNull(passWord.value) ? errorPassword.value = "passWord không được bỏ trống" : errorPassword.value = "";
        !checkNull(userName.value) ? errorUserName.value = "userName không được bỏ trống" : errorUserName.value = "";
        !ValidateEmail (email.value) ? errorEmail.value ="email không tồn tại" : errorEmail.value =""

        const data = {
            email: email.value,
            userName : userName.value,
            passWord: passWord.value
        };
        const flag = checkNull(email.value) && checkNull(passWord.value) && checkNull(userName.value) && ValidateEmail(email.value);
        if (flag) {
            await user.register(data) 
        }
    }
</script>

<template>
  <main>
    <div className='jss2526'>
        <div className="signin">
                <RouterLink to="/">
                    <h2  className='text-center logo-film-login pb-3'>
                        <img width="100px" src="../../assets/logofilm.png" alt="">
                    </h2>
                </RouterLink>
                <div class="mb-3 mt-2">
                    <h4 class="text" >
                        Đăng Ký
                    </h4>
                </div>
                <div>
                    <form>
                        <div className='form-group position-relative mb-2'>
                            <label htmlFor="email" >Email</label>
                            <input
                                name="email"
                                className="form-control"
                                type="email"
                                v-model="email"
                            />
                            <p style="color: red;">{{ errorEmail }}</p>
                        </div>
                        <div className='form-group position-relative mb-2'>
                            <label htmlFor="userName" >Tài Khoản</label>
                            <input
                                name="userName"
                                className="form-control"
                                type="text"
                                v-model="userName"
                            />
                            <p style="color: red;">{{ errorUserName }}</p>
                        </div>
                        <div class='form-group position-relative mb-2'>
                            <label htmlFor="passWord" >Mật Khẩu</label>
                            <input
                                name="passWord"
                                className="form-control"
                                type="password"
                                v-model="passWord"
                            />
                            <p style="color: red;">{{ errorPassword }}</p>

                        </div>
                        <button class="btn btn-success mt-3 container" @click.prevent="()=> handleRegister()">
                            Đăng Ký
                        </button>
                        
                        <RouterLink to="/login" class="pt-5">
                            Đăng nhập ngay !
                        </RouterLink>
                    </form>
                </div>

            </div>
    </div>

  </main>
</template>

<style scoped>
.jss2526{
    /* width: 580px; */
    height: fit-content;
    z-index: 1000;
    position: relative;
    border-radius: 6px;
    background-image: linear-gradient(to bottom,rgba(20,50,93,.9),rgba(8,22,48,.9));

}
.logo-film-login{
    color: #fff;
    text-decoration: none;
}

.signin {
    color: #fff;
    padding: 60px 32px 30px;
    margin: 0 20px;
  }
.text {
    text-align: center;
    margin-bottom: 30px;
}

@media screen and (min-width: 992px){
    .jss2526{
    width: 580px;
    }
}
</style>