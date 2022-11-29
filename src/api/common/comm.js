import http from "../http";

const API_ACUT_URL = `${process.env.VUE_APP_PJT}/api/comm`

export default {

  // 공통코드 조회
  selCommCode(params=[]) {
    let reqUrl = `${API_ACUT_URL}/sel/code`;
    return http.post(reqUrl, params);
  },
}