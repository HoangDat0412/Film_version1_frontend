import { service } from "@/service/baseService";
import { defineStore } from "pinia";
// import { TOKEN } from "@/utils/config";
export const useActorStore = defineStore("actor", {
  state: () => ({
    actor : []
  }),
  getters: {
    
  },
  actions: {
    async createActor(data){
      try {
        const result = await service.post("/actor",data)
        if(result.status === 201){
          alert("add actor success")
        }else{
          alert("add actor false")
        }
      } catch (error) {
        console.log(error);
        alert("add actor false")
      }
    },
  },
});

