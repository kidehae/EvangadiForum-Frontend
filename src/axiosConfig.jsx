import axios from 'axios'

const axiosBase=axios.create({
  
    baseURL:'http://localhost:2112/api'
})

export default axiosBase