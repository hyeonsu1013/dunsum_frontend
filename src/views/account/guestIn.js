import acutApi from '@/api/account/account';
import http from '@/api/http';
import { mapMutations } from 'vuex';

let _storage = window.localStorage;

export default {
  name: 'GuestIn',
  data(){
      return{
      }
  },
  watch: {},
	methods: {
    ...mapMutations(['SET_LOGIN']),
    guestLogin() {
      acutApi.insGust().then(res => {
        if(res.data != null){
          let data = res.data;

          let sessionData = {
            lginId : data.lginId,
            gustYn : data.gustYn,
            pswdChngDate : data.pswdChngDate,
          }

          _storage.setItem(process.env.VUE_APP_TOKEN_KEY, data.userToken);
          _storage.setItem(process.env.VUE_APP_USER_DATA, JSON.stringify(sessionData));
          http.setToken(data.userToken);
          http.setToken(data.clntIp);
          
          // 로그인 여부 store에 저장
          this.SET_LOGIN(true);
          this.$router.push({ path: `/` });
        } else {
          console.log('res', res);
        }
      })
      .catch(error=> {
        console.log('error', error);
      });
    },
  },
  created() {
    _storage.removeItem(process.env.VUE_APP_TOKEN_KEY);
    _storage.removeItem(process.env.VUE_APP_USER_DATA);
  },
}