export default {
  
  // 사용자 정의 예외처리
  CumtomException(message) {
    this.message = message;
    this.name = 'UserException';
  },

  // 입력된 날짜의 날짜 형식 변환
  convertDateStr(date, fmt = "") {
    return date?.replace(/^(\d{4})(\d{2})(\d{2})$/g, `$1${fmt}$2${fmt}$3`);
  },

  //오늘 날짜
  getToday() {
    let today = new Date();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    return {
      year: today.getFullYear().toString(),
      month: mm < 10 ? "0" + mm : mm.toString(),
      date: dd < 10 ? "0" + dd : dd.toString()
    }
  },

  //오늘 날짜 기호추가(파라미터 Ex: '-')
  getTodayStr(fmt = "") {
    let dateArr = [];
    let date = this.getToday();

    dateArr.push(date.year);
    dateArr.push(date.month);
    dateArr.push(date.date);
    return dateArr.join(fmt);
  },

  // Object형의 Date형식을 String 형식으로 변환
  convertFromDateToStrObj(obj) {
    let rst = {};
    Object.keys(obj).map(k => {
      if (/date$/.test(k.toLowerCase())) {
        rst[k] = this.convertFromDateTypeToStr(obj[k]);
      } else {
        rst[k] = obj[k];
      }
    });
    return rst;
  },

  // 날짜형과 문자열형을 비교해서 String 형식으로 변환
  convertFromDateTypeToStr(trgt) {
    let rst = null;
    if (this.isNotEmpty(trgt)) {
      if (/^\d{4}(\/|-|\.)?\d{2}(\/|-|\.)?\d{2}$/.test(trgt)) {
        rst = trgt.replace(/\D/gi, "");
      } else {
        let date = new Date(trgt);
        let yyyy = date.getFullYear();
        let MM = date.getMonth() + 1;
        let dd = date.getDate();
        rst = `${yyyy}${MM < 10 ? "0" + MM : MM}${dd < 10 ? "0" + dd : dd}`;
      }
    }
    return rst;
  },

  // 날짜형을 문자형으로 데이터 변환
  convertFromDateToStr(trgt) {
    let rst = trgt;
    if (this.getType(trgt) === `string` || this.getType(trgt) === `date`) {
      rst = this.convertFromDateTypeToStr(trgt);
    } else if (this.getType(trgt) === `object`) {
      rst = {};
      rst = this.convertFromDateToStrObj(trgt);
    } else if (this.getType(trgt) === `array`) {
      rst = [];
      trgt.map((obj, idx) => {
        rst[idx] = this.convertFromDateToStrObj(obj);
      });
    } else {
      throw new this.CumtomException('String, Object, Array, Date형이 아닙니다.');
    }
    return rst;
  },
  // Object형의 Date형식을 String 형식으로 변환
  convertFroStrTomDateObj(obj) {
    let rst = {};
    Object.keys(obj).map(k => {
      rst[k] = /date$/.test(k.toLowerCase()) && /^\d{8}$/.test(obj[k]) ?
        obj[k].replace(/^(\d{4})(\d{2})(\d{2})$/, "$1/$2/$3") :
        obj[k];
    });
    return rst;
  },
  // 문자형을 날짜형으로 데이터 변환
  convertFromStrToDate(trgt) {
    let rst = "";
    if (this.getType(trgt) === `string`) {
      if (/^\d{8}$/.test(trgt)) {
        rst = trgt.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1/$2/$3");
      } else {
        rst = trgt;
      }
    } else if (this.getType(trgt) === `object`) {
      rst = {};
      rst = this.convertFroStrTomDateObj(trgt);
    } else if (this.getType(trgt) === `array`) {
      rst = [];
      trgt.map((obj, idx) => {
        rst[idx] = this.convertFroStrTomDateObj(obj);
      });
    } else {
      throw new this.CumtomException('String, Object, Array형이 아닙니다.');
    }
    return rst;
  },
  // 문자형 데이터를 날짜형 데이터로 변환
  cnvtStrDate2DateType(trgt) {
    try {
      let date = this.convertFromStrToDate(trgt);
      return new Date(date);
    } catch {
      return trgt;
    }
  },
  // 목록에 행번호 추가
  setRowNo(data) {
    if (this.getType(data) === "object") {
      let startNum = ((data.pageNum - 1) * data.pageSize + 1);
      if (data?.list != null) {
        data.list.forEach(item => {
          return item.rowNo = startNum++
        });
      }
    } else if (this.getType(data) === "array") {
      let startNum = 1;
      data.forEach(item => {
        return item.rowNo = startNum++
      });
    }
    return data;
  },

  /**
   * 날짜 체크
   * yyyy/mm/dd or yyyy-mm-dd or yyyy.mm.dd or yyyymmdd
   * @param {String} date
   * @returns {Boolean}
   */
   isDate(date) {
    const objRegExp = /^\d{4}(\/|-|\.|)\d{2}(\/|-|\.|)\d{2}$/;
    let isValid = false;
    if (objRegExp.test(date)) {
      let arrayDate = [];
      if (date.length == 8) {
        arrayDate[0] = date.substring(0, 4);
        arrayDate[1] = date.substring(4, 6);
        arrayDate[2] = date.substring(6, 8);
      } else {
        const strSeparator = date.substring(4, 5);
        arrayDate = date.split(strSeparator);
      }
      const arrayLookup = {
        '01': 31, '03': 31,
        '04': 30, '05': 31,
        '06': 30, '07': 31,
        '08': 31, '09': 30,
        '10': 31, '11': 30,
        '12': 31
      };
      const intDay = parseInt(arrayDate[2], 10);

      if (arrayLookup[arrayDate[1]] != null) {
        if (intDay <= arrayLookup[arrayDate[1]] && intDay != 0)
          isValid = true;
      }
      else {
        const intMonth = parseInt(arrayDate[1], 10);
        if (intMonth == 2) {
          const intYear = parseInt(arrayDate[0]);
          if (intDay > 0 && intDay < 29) {
            isValid = true;
          }
          else if (intDay == 29) {
            if ((intYear % 4 == 0) && (intYear % 100 != 0) || (intYear % 400 == 0)) {
              isValid = true;
            }
          }
        }
      }
    }
    return isValid;
  },

  /**
   * 년월 체크
   * yyyy/mm or yyyy-mm or yyyy.mm or yyyymm
   * @param {String} yyyyMM
   * @returns {Boolean}
   */
  isYm(yyyyMM) {
    const objRegExp = /^\d{4}(\/|-|\.|)\d{2}$/;
    let isValid = false;
    if (objRegExp.test(yyyyMM)) {
      let arrayDate = [];
      if (yyyyMM.length == 6) {
        arrayDate[0] = yyyyMM.substring(0, 4);
        arrayDate[1] = yyyyMM.substring(4, 6);
      } else {
        let strSeparator = yyyyMM.substring(4, 5);
        arrayDate = yyyyMM.split(strSeparator);
      }
      let intMonth = parseInt(arrayDate[1], 10);
      if (intMonth >= 1 && intMonth <= 12) {
        isValid = true;
      }
    }

    return isValid;
  },

  /**
   * 시간 체크
   * HH:MM or HH:MM:SS or HH:MM:SS.mmm
   * @param {String} time
   * @returns {Boolean}
   */
  isTime(time) {
    return (/^([1-9]|1[0-2]):[0-5]\d(:[0-5]\d(\.\d{1,3})?)?$/).test(time);
  },
  rtnDate(date) {
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    return {
      year: date.getFullYear().toString(),
      month: mm < 10 ? "0" + mm : mm.toString(),
      date: dd < 10 ? "0" + dd : dd.toString()
    }
  },
  getDay(dtFmt, fmt) {
    let dateArr = [];
    dateArr.push(dtFmt.year);
    dateArr.push(dtFmt.month);
    dateArr.push(dtFmt.date);
    return dateArr.join(fmt);
  },
  getFirstDay(fmt) {
    let date = this.rtnDate(new Date());
    date.date = "01";
    return this.getDay(date, fmt);
  },
  addYear(year, fmt) {
    let now = new Date();
    let settDate = new Date(now.setFullYear(now.getFullYear() + year));
    return this.getDay(this.rtnDate(settDate), fmt);
  },
  addMonth(month, fmt) {
    let now = new Date();
    const toDate = now.getDate();
    let settDate = new Date(now.setMonth(now.getMonth() + month));
    const _date = settDate.getDate();
    if (toDate !== _date) {
      settDate.setDate(settDate.getDate() - _date);
    }
    return this.getDay(this.rtnDate(settDate), fmt);
  },
  addDays(days, fmt) {
    let now = new Date();
    let settDate = new Date(now.setDate(now.getDate() + days));
    return this.getDay(this.rtnDate(settDate), fmt);
  },
  getDate(dt, fmt = "/") {
    let date = this.rtnDate(new Date(dt));
    let yyyy = date.year;
    let mm = date.month;
    let dd = date.date;
    return yyyy + fmt + mm + fmt + dd;
  },
}