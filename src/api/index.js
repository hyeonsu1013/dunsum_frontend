// Axios Interceptor 구성

import axios from "axios"

// let _storage = window.sessionStorage;

//axios 기본설정
const instance = axios.create({
	baseURL: process.env.VUE_APP_SERVER_URL,
	timeout: 150000,
	withCredentials: true
});
// const instance = axios;

/*
	1. 요청 인터셉터를 작성합니다.
	2개의 콜백 함수를 받습니다.

	1) 요청 바로 직전 - 인자값: axios config
	2) 요청 에러 - 인자값: error
*/
instance.interceptors.request.use(
	function(config) {
		// 요청 바로 직전
		// store.state.loading = true;// 로딩바(Loading2.vue) 보이기/안보이기. 임시 확인용

		// axios 설정값에 대해 작성합니다.

		// context가 다를 경우 API Server 요청
		// var ctx = process.env.VUE_APP_PJT;
		// if(config.url.indexOf(ctx) < 0) {
    //   console.log(ctx);
		// 	if (config.url.indexOf(process.env.VUE_APP_DNF_PJT) >= 0) {
		// 		// config.baseURL = process.env.VUE_APP_DNF_SERVER
    //     // axios.baseURL = process.env.VUE_APP_DNF_SERVER
    //     config.baseURL = process.env.VUE_APP_DNF_SERVER;
    //     console.log('config.baseURL', config.baseURL);
		// 	}
		// }

		return config;
	},
	function(error) {
		// store.state.loading = false;// 로딩바(Loading2.vue) 보이기/안보이기. 임시 확인용

		// 요청 에러 처리를 작성합니다.
		return Promise.reject(error);

	}
);



/*
	2. 응답 인터셉터를 작성합니다.
	2개의 콜백 함수를 받습니다.

	1) 응답 정성 - 인자값: http response
	2) 응답 에러 - 인자값: http error
*/
instance.interceptors.response.use(

	function(response) {
		// store.state.loading = false;// 로딩바(Loading2.vue) 보이기/안보이기. 임시 확인용
		/*
			http status가 200인 경우
			응답 바로 직전에 대해 작성합니다.
			.then() 으로 이어집니다.
		*/
		return response;
	},

	function(error) {
		// store.state.loading = false;// 로딩바(Loading2.vue) 보이기/안보이기. 임시 확인용

		// if(error.response && error.response.status === 403 || error.response && error.response.status === 401) {

		// 	//이동하기 전에 sesstion 값 제거
		// 	let _authKey = process.env.VUE_APP_AUTH_KEY;
		// 	let _tokenKey = process.env.VUE_APP_TOKEN_KEY

		// 	_storage.removeItem(_authKey);
		// 	_storage.removeItem(_tokenKey);

			// let protocol = location.protocol;
			// let hostName = location.hostname;
			// let port = location.port;

			// var ssoUrl = protocol + "//" + hostName;
			// if(port != "" && port != "443") ssoUrl += ":" + port;

			// window.location.href = process.env.VUE_APP_SSO_URL + ssoUrl;
		// }

		console.log(error)
		// if(error.response?.status >= 500 && error.response?.data?.message?.length > 0) {
		// 	error.message = error.response.data.message;
		// 	error.stack = error.response.data.message;
		// }

		/*
			http status가 200이 아닌 경우
			응답 에러 처리를 작성합니다.
			이곳 먼저 처리 후 화면단에서 호출한 .catch() 으로 이어집니다.
		*/
		return Promise.reject(error);
	}
);



// 생성한 인스턴스를 익스포트 합니다.
export default instance;