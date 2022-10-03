// Axios 구성

import axios from "./index"

let _sotrage = window.sessionStorage
let _tokenKey = _sotrage.getItem(process.env.VUE_APP_TOKEN_KEY)

let defaultHeader = {
	"Content-Type": "application/json;charset=UTF-8",
	"Accept": "application/json",
	"Access-Control-Allow-Origin": "*",
	"X-AUTH-TOKEN": _tokenKey,
	"X-SSCM-CD":process.env.VUE_APP_AUTH_KEY,
	"X-MENU-ID": "",
	"X-CLNT-IP": "",
}

export default {

	setToken(token) {
		defaultHeader["X-AUTH-TOKEN"] = token;
		console.log("setToken!!!")
	},

	setIp(ip) {
		defaultHeader["X-CLNT-IP"] = ip;
	},

	setMenuId(id) {
		defaultHeader["X-MENU-ID"] = id;
	},

	get(url, cancel = null) {

		return axios.get(url, {
			headers: {
				...defaultHeader,
				//"addType":"addData"
				cancelToken : cancel != null ? cancel.token : null,
			}
		})
	},

	put(url, body, cancel = null) {
		return axios.put(url, body, {
			headers: defaultHeader,
			cancelToken : cancel != null ? cancel.token : null,
		})
	},

	post(url, body, cancel = null) {
		return axios.post(url, body, {
			headers: {
				...defaultHeader,
				//"addType":"addData"
			},
			timeout: 600000, // 10분
			cancelToken : cancel != null ? cancel.token : null,
		})
	},

	delete(url, cancel = null) {
		return axios.delete(url, {
			headers: defaultHeader,
			cancelToken : cancel != null ? cancel.token : null,
		})
	},

	getFile(url, cancel = null) {
		return axios.get(url, {
			headers: {
				...defaultHeader,
				cancelToken : cancel != null ? cancel.token : null,
				"Response-Type": 'arraybuffer'
			}
		})
	},


	postFileDn(url, body, cancel = null) {
		return axios.post(url, body, {

			headers: {
				...defaultHeader,
				"Response-Type": 'arraybuffer'
				//"addType":"addData"
			}
			,responseType: 'blob'
			,timeout: 600000 // 10분
			,cancelToken : cancel != null ? cancel.token : null
		})
	},

	postParamFileDn(url, params, cancel = null) {
		return axios.post(url, {}, {

			headers: {
				...defaultHeader,
				"Response-Type": 'arraybuffer'
				//"addType":"addData"
			}
			,responseType: 'blob'
			,timeout: 600000 // 10분
			,params: params
			,cancelToken : cancel != null ? cancel.token : null
		})
	},


	postFile(url, body, cancel = null) {
		return axios.post(url, body, {
			headers: {
				...defaultHeader,
				"Content-Type": "multipart/form-data"
			}
			,timeout: 600000 // 10분
			,cancelToken : cancel != null ? cancel.token : null
		})

	},

	// postFileOption(url, cancel = null) {
	// 	let baseUrl = this.makeUrl(url);
	// 	return {
	// 		url: `${baseUrl}${url}`,
	// 		headers: {
	// 			"Accept": "application/json",
	// 			"Access-Control-Allow-Origin": "*",
	// 			"X-AUTH-TOKEN": defaultHeader["X-AUTH-TOKEN"]
	// 		}
	// 		,timeout: 600000 // 10분
	// 		,cancelToken : cancel != null ? cancel.token : null
	// 	}
	// },

	postParam(url, params, cancel = null) {
		return axios.post(url, {}, {
			headers: {
				...defaultHeader,
				//"addType":"addData"
			},
			params: params
			,timeout: 600000 // 10분
			,cancelToken : cancel != null ? cancel.token : null
		})
	},

	// makeUrl(url){
	// 	if(url.indexOf(process.env.VUE_APP_PJT) < 0) {
	// 		return process.env.VUE_APP_GW_URL;
	// 	}
	// 	return process.env.VUE_APP_SERVER_URL;
	// }

}