import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.API_URL,
    timeout: 1000
  });

apiClient.interceptors.response.use(reponse => {
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

export default apiClient;