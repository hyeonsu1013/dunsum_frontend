import acutApi from '@/api/account/account';

let _storage = window.sessionStorage;

export default {
  name: 'GuestIn',
  data(){
      return{
      }
  },
  watch: {},
	methods: {
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
          
          this.$router.push({
            path: `/`,
          });

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
    // _storage.setItem(process.env.VUE_APP_TOKEN_KEY, JSON.stringify(data));
    // http.setCustToken(token);

  },
}