import axios from "axios";

export default {
  // 서버 조회
  selDnfServers(params) {
      let reqUrl = `${process.env.VUE_APP_DNF_PJT}/servers`;
      params = this.setApiKey(reqUrl, params);
      return axios.get(reqUrl, {params: params});
  },

  // 캐릭터 검색
  selCharacters(server='all', params={}) {
    let reqUrl = `${process.env.VUE_APP_DNF_PJT}/servers/${server}/characters`;
    params = this.setApiKey(reqUrl, params);
    return axios.get(reqUrl, {params: params});
  },

  setApiKey(reqUrl, params={}) {
    if(reqUrl.indexOf(process.env.VUE_APP_DNF_PJT) >= 0){
      params['apikey'] = process.env.VUE_APP_DNF_KEY;
    }
    return params;
  },
}