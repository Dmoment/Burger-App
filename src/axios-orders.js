import axios from 'axios'

const instance = axios.create({
    baseURL: "https://react-myburgerapp-2065c-default-rtdb.firebaseio.com/"
})

export default instance