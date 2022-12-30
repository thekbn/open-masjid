import axios, { Axios, AxiosInstance } from 'axios';

export class MasjidApi {
    apiClient: AxiosInstance;

    constructor() {
        this.apiClient = axios.create({
        baseURL: process.env.API_URL,
        timeout: 1000
      });

      this.apiClient.interceptors.response.use(reponse => {
        // console.log(reponse.data);
        if(reponse.status == 200 
          && reponse.config.method === "get"
          && reponse.config.url === "/masjids"){
          reponse.data.map(masjid => {
            masjid?.iqamah?.map(iqamah =>{
              if(iqamah != null && iqamah.time != null){
                const date: Date = new Date();
                const parts: [number] = iqamah.time.split(":");
                date.setHours(parts[0]);
                date.setMinutes(parts[1]);
                iqamah.time = date;
              }
            })
          })
        }
        return reponse;
      });
    }

    async getMasjids() {
      return this.apiClient.get('/masjids')
    }

    async addMasjid(masjid) {
        await this.apiClient.post('/masjid',
            JSON.stringify({ ...masjid }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => {
            console.log(response);
        }).catch(error => {
            alert("Error encountered while saving")
        });
    }

    async updateMasjid(id, masjid){
        await this.apiClient.put(`/masjid/${id}`,
            JSON.stringify({ ...masjid }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => {
            console.log(response);
        }).catch(error => {
            alert("Error encountered while saving")
        });
    }
}

export const masjidApi = new MasjidApi();

export default masjidApi;