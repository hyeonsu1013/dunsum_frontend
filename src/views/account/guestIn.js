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
      acutApi.insGust().then(data => {
        console.log('data', data);
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