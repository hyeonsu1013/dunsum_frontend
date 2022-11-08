// import http from "@/api/http";

let _storage = window.sessionStorage;

export default {
  name: 'GuestIn',
  data(){
      return{
      }
  },
  created() {
    _storage.removeItem(process.env.VUE_APP_TOKEN_KEY);
    // _storage.setItem(process.env.VUE_APP_TOKEN_KEY, JSON.stringify(data));
    // http.setCustToken(token);

  },
  methods: {
  },
}