import dnfOtsdApi from '@/api/outside/dnf';
import cUtils from '@/utils/commonUtils';

export default {
  name: 'CharacterList',
  data(){
      return{
        panel : [],
        target : '',
        charList : [],
        currChar : {},
      }
  },
  watch: {},
	methods: {
    allOpen() {
      this.panel = [...Array(this.charList.length).keys()].map((k, i) => i);
    },
    allClose() {
      this.panel = [];
    },
    getCharNm(char) {
      return `${char.characterName} (${char.level})`; 
    },
    selCharacters() {
      let _this = this;
      let characters = {
          characterName : this.target,
          wordType : 'full',
      };

      dnfOtsdApi.selCharacters(characters)
      .then((res)=> {
          if(res.status == 200){
              _this.charList = res.data.rows;
              console.log('_this.charList', _this.charList);
          }
      }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
              console.error('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
              console.error(err);
          }
      }).finally(() => {
          // this.getCharacter();
      });
    },
  },
  created() {
    this.target = this.$route.query?.target;
    if(cUtils.isNotEmpty(this.target)){
      this.selCharacters();
    }
  },
}