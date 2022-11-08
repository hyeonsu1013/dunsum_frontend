import http from "../http";

const DNF_INNR_URL = `${process.env.VUE_APP_PJT}/api/otsd/dnf`

export default {

  // 서버 조회
  selDnfServers(params={}) {
    let reqUrl = `${DNF_INNR_URL}/srvr/sel`;
    return http.post(reqUrl, params);
  },
}