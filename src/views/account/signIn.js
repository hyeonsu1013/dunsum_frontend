export default {
  name: 'SignIn',
  data() {
      return {
        loading: false,
        userEmail: '',
        password: '',
      }
  },
  methods: {
    login() {
      console.log('login');
    }
  },
  created() {
  },
}