// Axios 구성

import axios from "./index";

let _sotrage = window.sessionStorage;
let _tokenKey = _sotrage.getItem(process.env.VUE_APP_TOKEN_KEY);

let defaultHeader = {
	"Content-Type": "application/json;charset=UTF-8",
	"Accept": "application/json",
	"Access-Control-Allow-Origin": "*",
	"D-AUTH-TOKEN": _tokenKey,
	"D-CLNT-IP": "",
};

// default timeout = 10분
let default_timeout = 600000;

export default {

	getAxios() {
		return axios;
	},

	getTimeout(timeout) {
		return timeout != null && typeof timeout == Number && timeout > 0 ?
						timeout : default_timeout;
	},

	setToken(token) {
		defaultHeader["D-AUTH-TOKEN"] = token;
	},

	setIp(ip) {
		defaultHeader["D-CLNT-IP"] = ip;
	},

	get(url) {

		return axios.get(url, {
			headers: {
				...defaultHeader,
			}
		})
	},

	put(url, body) {
		return axios.put(url, body, {
			headers: defaultHeader,
		})
	},

	
	post(url, body, timeout) {
		return axios.post(url, body, {
			headers: {
				...defaultHeader,
			},
			timeout: this.getTimeout(timeout),
		})
	},

	delete(url) {
		return axios.delete(url, {
			headers: defaultHeader,
		})
	},

	getFile(url) {
		return axios.get(url, {
			headers: {
				...defaultHeader,
				"Response-Type": 'arraybuffer'
			}
		})
	},
	
	postFileDown(url, body, timeout) {
		return axios.post(url, body, {

			headers: {
				...defaultHeader,
				"Response-Type": 'arraybuffer'
			},
			responseType: 'blob',
			timeout: this.getTimeout(timeout),
		})
	},

	postParamFileDown(url, params, timeout) {
		return axios.post(url, {}, {

			headers: {
				...defaultHeader,
				"Response-Type": 'arraybuffer'
			},
			responseType: 'blob',
			timeout: this.getTimeout(timeout),
			params: params,
		})
	},

	postFile(url, body, timeout) {
		return axios.post(url, body, {
			headers: {
				...defaultHeader,
				"Content-Type": "multipart/form-data"
			},
			timeout: this.getTimeout(timeout),
		})

	},

	postParam(url, params, timeout) {
		return axios.post(url, {}, {
			headers: {
				...defaultHeader,
			},
			params: params,
			timeout: this.getTimeout(timeout),
		})
	},
}