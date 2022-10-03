import axios from "axios"

export default {

  selTest(params={}) {
    let reqUrl = `/dunsum/api/dashbord/sel`;
    return axios.post(reqUrl, params);
  },
}