import { service } from "@/service/baseService";
import { defineStore } from "pinia";
// import { TOKEN } from "@/utils/config";
export const useFilmStore = defineStore("film", {
  state: () => ({
    listFilmUser :[],
    topViews:[],
    filmDetail:null,
    filmWatching:null,
    listFilmAdmin:null,
    listFilmSearch:[],
    filmSearch:[],
    pagination:0,
    deleteResult:true,
    updateResult:true,
    createResult:true,
    loading:false,
    searchKey:"",
    totalView:0,
    src:""
  }),
  getters: {
    getListFilmSearch(state){
      return state.listFilmSearch
    }
  },
  actions: {
    async setListFilm(){
      try {
        const result = await service.get(`/film`)
        if(result.status === 200){
          this.listFilmUser = result.data
          console.log(result.data);
          let totalView = 0;
          result?.data?.map((item)=>{
            totalView += item.views
          })
          this.totalView = totalView
        }
      } catch (error) {
        console.log(error);
      }
    },
    async setFilmDetail(id){
      try {
        const result = await service.get(`/film/detail/${id}`)
        if(result.status === 200){
          this.filmDetail = {...result.data}
        }
      } catch (error) {
        console.log(error);
      }
    },
    async setFilmWatching(id){
      try {
        const result = await service.get(`/film/watching/${id}`)
        if(result.status === 200){
          this.filmWatching = result.data
          this.src = result.data?.src2
        }
      } catch (error) {
        console.log(error);
      }
    },
    async searchFilm(data){
      try {
        const result = await service.post(`/film/search`,data);
        if(result.status === 200){
          this.listFilmSearch = result.data
          
          this.pagination = Math.ceil(this.listFilmSearch.length/5) ;
          console.log(this.pagination);
          this.filmSearch = this.listFilmSearch.slice(0,5)
        }
      }catch(err){
        this.listFilmSearch = []
        console.log(err);
      }
    },
    async deleteFilm(id){
      try {
        const result = await service.delete(`/film/${id}`)
        if (result.status ===200 ) {
          alert("Delete success !")
          await this.setListFilm()
        }else{
          alert("Delete false !")
        }
      } catch (error) {
        console.log(error);
        alert("Delete false !")
      }
    },
    async createFilm(data){
      try {
        const result = await service.post("/film/create",data)
        if(result.status === 201){
          alert("create success !")
        }else{
          alert("create false !")
        }
      } catch (error) {
        alert("create false !")
        console.log(error);
      }
    },
    async updateFilm(id,data){
      try {
        const result = await service.post(`/film/update/${id}`,data)
        if(result.status === 200){
          alert("Update success")
        }
      } catch (error) {
        console.log("Update false");
      }
    },
    async createActor(data){
      try {
        const result = await service.post("/actor",data)
        if(result.status === 201){
          alert("add actor success")
          await this.setFilmDetail(data.filmId)
        }else{
          alert("add actor false")
        }
      } catch (error) {
        console.log(error);
        alert("add actor false")
      }
    },
    async deleteActor(filmId,id){
      try {
        const result = await service.delete(`/actor/${id}`)
        if (result.status === 200) {
          alert("Delete success !")
          await this.setFilmDetail(filmId)   
        } else {
          alert("Delete false !")
        }
      } catch (error) {
        
        alert("Delete false !")
      }
    },
    async createFilmType(data){
      try {
        const result = await service.post("/filmtype",data)
        if(result.status === 201){
          alert("add film type success")
          await this.setFilmDetail(data.filmId)
        }else{
          alert("add film type false")
        }
      } catch (error) {
        console.log(error);
        alert("add film type false")
      }
    },
    async deleteFilmType(filmId,id){
      try {
        const result = await service.delete(`/filmtype/${id}`);
        if (result.status === 200) {
          
          await this.setFilmDetail(filmId)   
          alert("Delete success !")
        } else {
          alert("Delete false !")
        }
      } catch (error) {
        
        alert("Delete false !")
      }
    },
    async uploadFilm(id,data){
      try {
        this.loading = true
        const result = await service.upload(`/film/uploadfilm/${id}`,data)
        if(result.status === 201){
          this.setFilmDetail(id)
          this.loading = false
          alert("Upload success !")
         
        }else{
          this.loading = false
          alert("Upload false !")
        }
      } catch (error) {
        this.loading = false
        console.log(error);
        alert("Upload false !")
      }
    },
    async addView(id){
      try {
        await service.get(`/film/view/${id}`)
      } catch (error) {
        console.log(error);
      }
    },
    async searchFilmType(data){
      try {
        const result = await service.post(`/film/searchfilmtype`,data);
        if(result.status === 200){
          this.listFilmSearch = [...result.data.films]
          this.pagination = result.data.pages
        }
      }catch(err){
        this.listFilmSearch = []
        console.log(err);
      }
    },
    async searchCountry(data){
      try {
        const result = await service.post(`/film/searchcountry`,data);
        if(result.status === 200){
          this.listFilmSearch = [...result.data.films]
          this.pagination = result.data.pages
        }
      }catch(err){
        this.listFilmSearch = []
        console.log(err);
      }
    },
    async searchYear(data){
      try {
        const result = await service.post(`/film/searchyear`,data);
        if(result.status === 200){
          this.listFilmSearch = [...result.data.films]
          this.pagination = result.data.pages
        }
      }catch(err){
        this.listFilmSearch = []
        console.log(err);
      }
    },
    async setListSearch(number){
      console.log(this.listFilmSearch.slice(number*5,5));
      this.filmSearch = this.listFilmSearch.slice(number*5,5)
    },
    async getTopFilmView(){
     try {
      const result = await service.get('/film/mostview')
      if(result.status === 200){
        this.topViews = result.data
      }
     } catch (error) {
      console.log(error);
     }
    },
    setSearchKey(type){
      this.searchKey = type
    },
    handleChangeServer(server){
      if(server === 1){
        this.src = this.filmWatching?.src2
      }else{
        this.src = this.filmWatching?.srcurl
      }
    }

  },
});

