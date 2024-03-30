import { service } from "@/service/baseService";
import { defineStore } from "pinia";
// import { TOKEN } from "@/utils/config";
export const useFavouriteFilmStore = defineStore("favouritefilm", {
  state: () => ({
    listFavouriteFilm: [],
    checkFilmIsFavourite: false,
  }),
  getters: {},
  actions: {
    async getFavouriteFilm() {
      try {
        const result = await service.get("/favouriteFilm");
        if (result.status === 200) {
          this.listFavouriteFilm = result?.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async createAndDeleteFavouriteFilm(data) {
      try {
        const result = await service.post(`/favouriteFilm`,data)
        if(result.status === 201){
          console.log("set check films is favourite true");
          this.checkFilmIsFavourite = true
      }
      if(result.status === 200){
        console.log("set check films is favourite false");
        this.checkFilmIsFavourite = false
        await this.getFavouriteFilm()
    }
      } catch (error) {
        console.log(error);
      }
    },
    async checkFilmFavourite(id){
      let flag = false;
      this.listFavouriteFilm?.map(item =>{
        if(item?.id == id){
          flag = true;
        } 
      })
      this.checkFilmIsFavourite = flag;
    }
  },
});
