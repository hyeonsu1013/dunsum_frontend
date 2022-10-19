import {overrideUserAgentUsingClientHints} from "@/utils/uach-retrofill";

export default {
  name: 'Dashbord',
  data(){
      return{
        // UserAgent-ClientHints Data
        ovUserAgnet : "",
        userAgentHints : ["architecture","bitness","model","platformVersion","uaFullVersion","wow64"],
        isMobl : false,
      }
  },
  created() {
    this.setUserAgnet();
  },
  methods: {
    // UserAgent-ClientHints
    setUserAgnet() {
      let _this = this;
      overrideUserAgentUsingClientHints(this.userAgentHints).then(() => {
          _this.ovUserAgnet = navigator.userAgent;

          // 위 데이터 활용하여 모바일 접속 판별
          let isMobile1 = navigator.userAgentData?.mobile;
          let isMobile2 = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          let isMobile3 = /Mobi/i.test(window.navigator.userAgent);

          console.log('모바일', isMobile1, isMobile2, isMobile3, isMobile1 || isMobile2 || isMobile3);

          _this.isMobl = isMobile1 || isMobile2 || isMobile3;
      });
    },

    //
    testUserAgent() {
      console.log('ovUserAgnet', this.ovUserAgnet);
    },
  },
}