export default {
  // 파라미터의 타입 확인(소문자로 리턴)
  getType(trgt) {
    return Object.prototype.toString.call(trgt).slice(8, -1).toLowerCase();
  },

  /**
   * 문자열의 byte 길이 반환
   * @param {String} value
   * @returns {Number}
   */
  getBytes(value) {
    const str = value;
    let l = 0;
    for (let i = 0; i < str.length; i++) {
      l += (str.charCodeAt(i) > 128) ? 2 : 1;
    }
    return l;
  },

  /**
   * 문자열 중 숫자만 가져오기
   * @param {String} value
   * @returns {String}
   */
  num(value) {
    return (value.trim().replace(/[^0-9]/g, ""));
  },

  /**
   * 정규식을 사용하여 문자를 치환한다. - args[0] : 치환할 문자, args[1] : 치환할 패턴
   * @param {String} context
   * @param {String, RegExp} pattern
   * @returns {String}
   */
  remove(context, pattern) {
    if (context == null) {
      return "";
    } else {
      if (pattern != null) {
        return context.replace(this.meta(pattern), "");
      } else {
        return context;
      }
    }
  },

  /**
   * 정규식에 쓰이는 특수문자를 찾아서 이스케이프 한다.
   * @param {String} pattern
   * @returns {String}
   */
  meta(pattern) {
    console.log('meta', pattern);
    const str = pattern;
    let result = "";
    const regExp = /([$()*+.[\]?\\^{}|]{1})/;
    for (let i = 0; i < str.length; i++) {
      if (regExp.test(str.charAt(i))) {
        result += str.charAt(i).replace(regExp, "\\$1");
      }
      else {
        result += str.charAt(i);
      }
    }
    return result;
  },

  /**
   * 숫자로 구성되어 있는지 확인 - args[0] : 숫자, args[1] : 허용할 문자셋
   * @param {String} value
   * @param {String} permitChar
   * @returns {Boolean}
   */
  isNum(value, permitChar) {
    return (/^[0-9]+$/).test(this.remove(value, permitChar)) ? true : false;
  },

  /**
   * 영어만 허용 - args[0] : 문자, args[1] : 추가 허용할 문자들
   * @param {String} value
   * @param {String} permitChar
   * @returns {Boolean}
   */
  isEng(value, permitChar) {
    return (/^[a-zA-Z]+$/).test(this.remove(value, permitChar)) ? true : false;
  },

  /**
   * 숫자와 영어만 허용 - args[0] : 문자 또는 숫자, args[1] : 추가 허용할 문자들
   * @param {String} value
   * @param {String} permitChar
   * @returns {Boolean}
   */
  isEngNum(value, permitChar) {
    return (/^[0-9a-zA-Z]+$/).test(this.remove(value, permitChar)) ? true : false;
  },

  /**
   * 숫자와 영어만 허용 - args[0] : 문자 또는 숫자, args[1] : 추가 허용할 문자들
   * @param {String} value
   * @param {String} permitChar
   * @returns {Boolean}
   */
  isNumEng(value, permitChar) {
    return this.isEngNum(value, permitChar);
  },

  /**
   * 실수 체크
   * @param {String} value
   * @returns {Boolean}
   */
  isFloat(value) {
    return (/^[0-9]+(.[0-9]+)?$/).test(value) ? true : false;
  },

  /**
   * 아이디 체크: 영어와 숫자만 체크 첫글자는 영어로 시작 - args[0] : 아이디 값, args[1] : 추가 허용할 문자들
   * @param {String} userId
   * @param {String} permitChar
   * @returns {Boolean}
   */
  isLoginId(userId, permitChar) {
    return (/^[a-zA-Z]{1}[0-9a-zA-Z]+$/).test(this.remove(userId, permitChar)) ? true : false;
  },

  /**
   * 한글 체크 - args[0] : 한글, args[1] : 추가 허용할 문자들
   * @param {String} value
   * @param {String} permitChar
   * @returns {Boolean}
   */
  isKor(value, permitChar) {
    return (/^[가-힣]+$/).test(this.remove(value, permitChar)) ? true : false;
  },

  /**
   * 한글 완성형 체크
   * @param {String} value
   * @returns {Boolean}
   */
  isKorStrForm(value) {
    const korStr = value;
    const hanStr = "ㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅃㅄㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
    for (let i = 0; i < korStr.length; i++) {
      const b = korStr.charAt(i);
      if ((korStr.charCodeAt(i) < 145) || hanStr.indexOf(b) != -1) {
        return false;
      }
    }
    return true;
  },

  /**
   * 주민번호 체크 - args[0] : 주민번호, args[1] : 주민번호 구분자
   * 000000-0000000
   * @param {String} idttNo
   * @param {String} separator
   * @returns {Boolean}
   */
  isJumin(idttNo, separator) {
    const sep = separator ? separator : "";
    const jumin = new RegExp(`^([0-9]{2}[01]{1}[0-9]{1}[0123]{1}[0-9]{1})${sep}([1234]{1}[0-9]{6})$`);
    let juminNo = "";
    const UNBORN = ['300000', '0000000'];
    if (idttNo === UNBORN.join("")) {
      return true;
    }
    if (idttNo == null) {
      return false;
    } else {
      juminNo = idttNo.toString().replace(jumin, "$1$2");
    }
    // 생년월일 체크
    let birthYY = '1,2,5,6'.indexOf(juminNo.charAt(6)) >= 0 ? "19" : ('3,4,7,8'.indexOf(juminNo.charAt(6)) >= 0 ? "20" : "18");
    birthYY += juminNo.substr(0, 2);
    const birthMM = juminNo.substr(2, 2) - 1;
    const birthDD = juminNo.substr(4, 2);
    const birthday = new Date(birthYY, birthMM, birthDD);
    if (birthday.getYear() % 100 != juminNo.substr(0, 2) || birthday.getMonth() != birthMM || birthday.getDate() != birthDD) {
      return false;
    }
    /**
     * [행안부 주민번호 체계 변경안 적용]
     * 10월부터 주민등록번호를 새로 받거나 변경할 때 뒷자리 7개 번호 가운데 성별을 표시하는 첫번째 번호를 제외하고 나머지 6개번호는 임의번호로 채워진다.
     * 주민번호 변경은 최근 3년간('17.5.~'20.5.) 약 1,500건이라 무시함
     */
    if (birthYY + juminNo.substr(2, 2) >= '202010') {
      return true;
    }
    let sum = 0;
    const num = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
    const last = parseInt(juminNo.charAt(12), 10);
    for (let i = 0; i < 12; i++) {
      sum += parseInt(juminNo.charAt(i), 10) * num[i];
    }
    return ((11 - sum % 11) % 10 == last) ? true : false;
  },

  /**
   * 외국인 등록번호 체크 - args[0] : 등록번호, args[1] : 등록번호 구분자
   * 000000-0000000
   * @param {String} idttNo
   * @param {String} separator
   * @returns {Boolean}
   */
  isForeign(idttNo, separator) {
    const sep = separator ? separator : "";
    const jumin = new RegExp(`/^([0-9]{2}[01]{1}[0-9]{1}[0123]{1}[0-9]{1})${sep}[5678]{1}[0-9]{1}[012468]{1}[0-9]{3}[0-9]{1}$`); // 2020.4.29 이후 - 등록기관 뒤 1자리 1허용으로 변경
    let juminNo = "";
    if (idttNo == null) {
      return false;
    } else {
      juminNo = idttNo.toString().replace(jumin, "$1$2");
    }
    // 생년월일 체크
    let birthYY = '5,6'.indexOf(juminNo.charAt(6)) >= 0 ? "19" : "20";
    birthYY += juminNo.substr(0, 2);
    const birthMM = juminNo.substr(2, 2) - 1;
    const birthDD = juminNo.substr(4, 2);
    const birthday = new Date(birthYY, birthMM, birthDD);
    if (birthday.getYear() % 100 != juminNo.substr(0, 2) || birthday.getMonth() != birthMM || birthday.getDate() != birthDD) {
      return false;
    }
    if (juminNo.charAt(8) == 1) return true;// 2020.4.29 이후 - 등록기관 뒤 1자리가 1이면 검증정상종료
    if ((parseInt(juminNo.charAt(7), 10) * 10 + parseInt(juminNo.charAt(8), 10)) % 2 != 0) {
      return false;
    }

    // TODO 체크로직 검증 필요
    // return true;

    let sum = 0;
    const num = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
    const last = parseInt(juminNo.charAt(12), 10);
    for (let i = 0; i < 12; i++) {
      sum += parseInt(juminNo.charAt(i), 10) * num[i];
    }
    return (((11 - sum % 11) % 10) + 2 == last) ? true : false;
  },

  /**
   * 주민번호 앞6자리 유효성 체크
   * (6자리 날짜 체크)
   * @param {String} date
   * @returns {Boolean}
   */
  isValidDate(date) {
    if (date.length != 6 || !date.isNumber()) {
      return false;
    } else {
      const inputMonth = date.substring(2, 4);
      const inputDate = date.substring(4, 6);
      if ((inputMonth < 1 || inputMonth > 12) || (inputDate < 1 || inputDate > 31)) return false;
      else return true;
    }
  },

  /**
   * 생년월일 유효성 체크(yyyymmdd)
   * @param {String} date
   * @returns  {Boolean}
   */
  isBirthDate(date) {
    const pt = /^\d{8}$/;
    if (!pt.test(date)) return false;
    const y = parseInt(date.substring(0, 4), 10);
    const m = parseInt(date.substring(4, 6), 10) - 1;
    const d = parseInt(date.substring(6, 8), 10);
    const dt = new Date(y, m, d);
    if (dt.getFullYear() == y && dt.getMonth() == m && dt.getDate() == d) {
      return true;
    } else {
      return false;
    }
  },
  
  /**
   * 이메일의 유효성을 체크
   * @param {String} mail
   * @returns {Boolean}
   */
  isEmail(mail) {
    // 이전 정규식의 경우 에러가 발생하고 있어 대체
    // return /^((([a-z]|\d|[!#$%&'*+\-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#$%&'*+\-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(mail);
    // eslint error : \x09, \x0d, \x0a, \x01, \x08, \x0b, \x0c, \x0e, \x1f
    if (mail.length > 0) {
      // return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(mail);
      return /^((([a-z]|\d|[!#$%&'*+\-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#$%&'*+\-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20)*)?(\x20)+)?(([\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20)*)?(\x20)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(mail);
    } else {
      return true;
    }
  },

  /**
   * 연락처(전화번호 또는 핸드폰번호) 체크
   * @param {String} telNo
   * @returns {Boolean}
   */
  isTel(telNo) {
    return this.isPhone(telNo) || this.isMobile(telNo);
  },

  /**
   * 전화번호 체크
   * @param {String} phoneNo
   * @returns {Boolean}
   */
  isPhone(phoneNo) {
    return /(02|0[3-9]{1}[0-9]{1})[1-9]{1}[0-9]{2,3}[0-9]{4}$/.test(phoneNo);
  },

  /**
   * 핸드폰번호 체크
   * @param {String} mobileNo
   * @returns {Boolean}
   */
  isMobile(mobileNo) {
    return /01[016789][1-9]{1}[0-9]{2,3}[0-9]{4}$/.test(mobileNo);
  },

  /**
   * 핸드폰여부 체크(앞자리만)
   * @param {String} mobileNo
   * @returns {Boolean}
   */
  isMobileFirst(mobileNo) {
    return /01[016789]$/.test(mobileNo);
  },

  //Object 널체크
  isEmptyObject(obj) {
    if (this.isObject(obj)) {
      return (Object.keys(obj).length === 0 && obj.constructor === Object) ||
        (obj.length === 0 && obj.constructor === Array);
    }
  },

  //Object 널체크
  isNotEmptyObject(obj) {
    if (this.isObject(obj)) {
      return !this.isEmptyObject(obj);
    }
  },

  //String 빈값 체크
  isNotEmpty(str) {
    return !this.isEmpty(str);
  },

  //String 빈값 체크
  isEmpty(str) {
    return str === null || str === undefined || "" === str;
  },

  //Object 체크
  isObject(obj) {
    if (this.isEmpty(obj)) return false;
    return typeof obj === 'object'
  },

  // String null 체크
  isNull(str) {
    return str === undefined || str === null;
  },

  // String null 체크
  isNotNull(str) {
    return !this.isNull(str);
  },

  nvl(val, rpc) {
    return this.isNotEmpty(val) ? val : (rpc ? rpc : "");
  },

  // 값의 오른쪽에 자릿수만큼 추가할 문자를 포함
  rpad(val, digits, add) {
    let apndDigits = parseInt(digits) - val.toString().length;
    return val.toString() + this.pad(apndDigits, add);
  },

  // 값의 왼쪽에 자릿수만큼 추가할 문자를 포함
  lpad(val, digits, add) {
    let apndDigits = parseInt(digits) - val.toString().length;
    return this.pad(apndDigits, add) + val.toString();
  },

  // 추가할 문자를 자릿수만큼 반복
  pad(digits, val) {
    let lpadVal = "";
    for (let i = 0; i < parseInt(digits); i++) {
      lpadVal += `${val}`;
    }
    return lpadVal;
  },

  // 숫자 3자리에 콤마
  setComma(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  removeComma(num) {
    return num.toString().replace(/,/g, "");
  },

  cnvtNumber(str) {
    let num = str.toString().replace(/,/g, '');
    if (isNaN(num)) {
      return str
    } else {
      return Number(num);
    }
  },

  addComma(num = 0) {
    return num.toLocaleString(window.navigator.language);
  },

  // 깊은 복사
  deepCopy(items) {
    if (this.isEmpty(items)) return null;
    return JSON.parse(JSON.stringify(items));
  },

  telFormat(orgTelNo) {
    if (orgTelNo == null || orgTelNo == undefined || orgTelNo.length == 0) return "";

    let telNo = orgTelNo.replace(/-/g, '');

		if (telNo.length > 8) {
			var match = telNo.match(/^(02|0[0-9]{1}[0-9]{1})([1-9]{1}[0-9]{2,3})([0-9]{4})$/);
			if(match) {
				let tel = "";
				for(let ii=1; ii<match.length; ii++){
					tel = tel + (tel.length > 0 ? "-" : "" ) + match[ii]
				}
				return tel;
			} else {
        return telNo;
      }
		} else {
			var match2 = telNo.match(/^([1-9]{1}[0-9]{2,3})([0-9]{4})$/);
			if(match2) {
				let tel = "";
				for(let ii=1; ii<match2.length; ii++){
					tel = tel + (tel.length > 0 ? "-" : "" ) + match2[ii]
				}
				return tel;
			} else {
        return telNo;
      }
    }
  },
  
  // 전화 번호 type이 0 일시 마스킹 처리함
  telForm(str, type) {
    let rs = "";
    if (this.isNotEmpty(str)) {
        if (str.length == 11) {
            if (type == 0) {
                rs = str.replace(/(\d{3})(.{4})(\d{4})/, '$1-****-$3');
            } else {
                rs = str.replace(/(\d{3})(.{4})(\d{4})/, '$1-$2-$3');
            }
        } else if (str.length == 8) {
            rs = str.replace(/(\d{4})(\d{4})/, '$1-$2');
        } else {
            if (str.indexOf('02') == 0) {

                if (type == 0) {
                    if(str.length == 8
                        || str.length == 10){ // 공통 유틸에서 가운데 자리를 3자리/4자리 상관없이 *4개로 마스킹 처리하여 10자리인 경우 있음
                        rs = str.replace(/(\d{2})(.{4})(\d{4})/, '$1-****-$3');
                    }else{
                        rs = str.replace(/(\d{2})(.{3})(\d{4})/, '$1-***-$3');
                    }
                } else {
                    if(str.length == 8
                        || str.length == 10){
                        rs = str.replace(/(\d{2})(.{4})(\d{4})/, '$1-$2-$3');
                    }else{
                        rs = str.replace(/(\d{2})(.{3})(\d{4})/, '$1-$2-$3');
                    }
                }
            } else {
                if (type == 0) {
                    rs = str.replace(/(\d{3})(.{3})(\d{4})/, '$1-***-$3');
                } else {
                    rs = str.replace(/(\d{3})(.{3})(\d{4})/, '$1-$2-$3');
                }

            }
        }
    }
    return rs;
  },

  convertCodeList2Map(codeList=[]) {
    let map = {};
    if(this.isNotEmptyObject(codeList)){
      codeList.forEach(el => {
        map[el.codeId] = el.codeIdName;
      });
    }
    return map;
  }
}