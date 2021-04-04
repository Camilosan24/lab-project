import axios from 'axios'

const getAuth = (props) =>{
   axios.get("/api/user/auth").then((res) => {
      if (!res.data.auth) {
        return props.history.push('/')
      }
   });
}
export default getAuth;
