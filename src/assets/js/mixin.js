import commApi from '@/api/common/comm';

function funcSelCode(params=[]) {
  return new Promise((resolve, reject) => {
    commApi.selCommCode(params).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

var globalMixin={
	data(){
		return{}
	},
	methods: {
    // 알럿 열기
    showAlert(v) {
			this.$root.$children[0].alertData = {...this.$root.$children[0].alertData, ...v};
			this.$root.$children[0].$refs.dunsumAlert.showAlert();
		},
    // 알럿 닫기
		hideAlert() {
			this.$root.$children[0].$refs.dunsumAlert.hideAlert();
		},
    // 뒤로가기 막기
    _preventBack() {
      history.pushState(null, null, location.href);
      window.onbeforeunload = null;

      window.onpopstate = function () {
          history.go(1);
      };
    },
    //공통코드 조회
    _selCommCode(params=[], callbackFunc) {
      return funcSelCode(params).then(res => {callbackFunc(res.data)});
    },
	}
}

export default globalMixin;
