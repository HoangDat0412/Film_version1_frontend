
import { service } from "@/service/baseService";
import { defineStore } from "pinia";
// import { TOKEN } from "@/utils/config";
export const useRateStore = defineStore("rate", {
  state: () => ({
    totalPoint:0,
    yourPoint:0,
    numberRate:0
  }),
  getters: {
    
  },
  actions: {
    async setTotalPoint(id){
      try {
        const result = await service.get(`/rate/${id}`)
        if(result.status===200){
          let total = 0;
          result?.data.map((item)=>{
            total += item.rate
          })
          this.numberRate= result.data?.length
          this.totalPoint = total/this.numberRate
        }
      } catch (error) {
        console.log(error);
      }
    },
    async setRate(data){
      try {
        const result = await service.post(`/rate`,data)
        console.log(result);
        if (result.status ===201) {
          await this.setTotalPoint(data.filmId)
        } 
      } catch (error) {
        console.log(error);
      }
    },
  },
});

