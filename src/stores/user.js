import router from "@/router";
import { service } from "@/service/baseService";
import { TOKEN } from "@/utils/config";
import { defineStore } from "pinia";
// import { TOKEN } from "@/utils/config";
export const useUserStore = defineStore("user", {
  state: () => ({
    userLogin: "",
    userInformation: {
      userType:"NO"
    },
  
    userList:[],
    newuserlist:[],
    responseRegister: null,
  
    chechOutResult:null,
  
    updateSuccess:true,
  
    userCheckoutList:null,
  
    userUpdate:{},
    userUpdateResult:true,
  }),
  getters: {
    
  },
  actions: {
    async register(data){
      try {
        const result = await service.post(`/user`,data)
        if(result?.status === 201){
          router.push({path:"/login"})
        }
        if(result?.status === 409){
          alert("email đã tồn tại")
        }
      } catch (error) {
        if(error?.response?.status === 409){
          alert("email đã tồn tại")
        }else{
          alert("false !")
          console.log(error);
        }
       
      }
    },

    async login(data){
      try {
        const result = await service.post(`/user/login`,data)
        if(result?.status === 200){
          this.userLogin = true;
          localStorage.setItem(TOKEN, result.data.token);
          router.push({path:"/",name:"home"})
        }
      } catch (error) {
        console.log(error);
        this.userLogin = false;
        alert("false")
      }
    },
    async getUserInformation(){
      try {
        const result = await service.get(`/user/information`)
        if(result?.status === 200){
          this.userInformation = {...result.data};
        }
      } catch (error) {
        console.log(error);
        this.userInformation = false;
      }
    },
    async logout(){
      localStorage.removeItem(TOKEN);
      this.userInformation = null;
      this.responseRegister = null;
      this.userLogin = "";
      return this.getUserInformation()
    },
    async updateUser(id,data){
      try {
        const result = await service.post(`/user/update/${id}`,data)
      if(result.status === 200){
        this.updateSuccess = result.data
        alert("Update thành công")
      }else{
        this.updateSuccess = false;
      }
      } catch (error) {
        console.log(error);
      }
    },
    async getListUser(){
      try {
        const result = await service.get("/user");
        if(result.status === 200){
          this.userList = result?.data

          this.newuserlist = result?.data.reverse().slice(0,10)
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser(id){
      try {
        const result = await service.delete(`/user/${id}`)
        if(result.status === 200){
          alert("Delete success !")
          await this.getListUser()
        }else{
          alert("Delete false !")
        }
      } catch (error) {
        console.log(error);
        alert("Delete false !")
      }
    },
    async getUserById(id){
      try {
        const result = await service.get(`/user/detail/${id}`)
        if(result.status === 200){
          this.userUpdate = result.data
          console.log(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async uploadAvatar(data){
      try {
        const result = await service.upload(`/user/setavatar`,data)
        if(result.status === 201){
          alert("Upload success !")
          return this.getUserInformation()
        }else{
          alert("Upload false !")
        }
      } catch (error) {
        console.log(error);
      }
    },
    async userUpdateInformation(data){
      try {
        const result = await service.post("/user/updateinformation",data)
        if(result.status === 200){
          alert("Update success")
          return this.getUserInformation()
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
});

