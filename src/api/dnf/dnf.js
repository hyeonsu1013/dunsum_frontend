import http from "../http";

const DNF_INNR_URL = `${process.env.VUE_APP_PJT}/api/otsd/dnf`

export default {

  // ์๋ฒ ์กฐํ
  selDnfServers(params={}) {
    let reqUrl = `${DNF_INNR_URL}/srvr/sel`;
    return http.post(reqUrl, params);
  },
}