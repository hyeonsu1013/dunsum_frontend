import commonUtils from '@/utils/commonUtils';

export default {
  name: 'SignUp',
  data(){
    return {
      loading: false,
      input : {
        email: '',
        loginId: '',
        password: '',
        passwordChk: '',
        authCode: '',
        gender: 'M',
      },
      ruleForEm: [
        value => commonUtils.isEmail(value) || 'E-mail 형식을 입력해주세요.',
      ],
      ruleForId: [
        value => !commonUtils.isEmpty(value) || '필수값입니다.',
        value => commonUtils.isEngNum(value) || '숫자와 영문자만 입력해주세요.',
        value => commonUtils.isLoginId(value) || '첫문자는 영문자로 시작해주세요.',
        value => commonUtils.chkLength(value, 6, 20) || '6자 이상, 20자 이하 입력해주세요.',
      ],
      ruleForPw: [
        value => !commonUtils.isEmpty(value) || '필수값입니다.',
        value => !commonUtils.chkBlack(value) || '비밀번호는 공백없이 입력해주세요.',
        value => commonUtils.isPassword(value) || '비밀번호는 영문소문자와 대문자, 특수문자를 포함하여 입력해주세요.',
        value => commonUtils.chkLength(value, 6, 20) || '6자 이상, 20자 이하 입력해주세요.',
      ],
      ruleForPwChk: [
        value => value == this.input.password || '비밀번호를 다시 확인해주세요.',
      ],
    }
  },
  created() {
  },
  methods: {
    // 회원가입 버튼
    signUp() {
      console.log('signUp');
    },
    // 초기화 버튼
    initBtn() {
      this.input = {
        email: '',
        loginId: '',
        password: '',
        passwordChk: '',
        authCode: '',
        gender: 'M',
      }
    },
    check(val) {
      return val === null || val === '' || val === undefined;
    },
  },
}