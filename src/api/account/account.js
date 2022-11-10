import http from "../http";

const API_ACUT_URL = `${process.env.VUE_APP_PJT}/api/acut`

export default {

  // Guest 로그인
  insGust(params={}) {
    let reqUrl = `${API_ACUT_URL}/ins/gust`;
    return http.post(reqUrl, params);
  },
}