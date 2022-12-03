import dnfInnrApi from '@/api/dnf/dnf';
import dnfOtsdApi from '@/api/outside/dnf';
import cUtils from '@/utils/commonUtils';

const DunsumLayer = () => import(/* webpackChunkName: "LayerPopup" */ '@/components/common/DunsumLayer.vue');

export default {
  name: 'CharacterList',
  components: {
    DunsumLayer
  },
  data(){
      return{
        maxLevel : 110,
        panel : [],
        target : '',
        charList : [],
        servers : [],
        serversMap : {},
        currChar : {},
        codeMap : {},

        // layer
        LayerShow : false,
        slideImgs : [
          { dir : 'guides', path : 'addcharacter1'},
          { dir : 'guides', path : 'addcharacter2'},
          { dir : 'guides', path : 'addcharacter3'},
        ]
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
    getImagePath(size, dir, path) {
      return require(`@/assets/images/dnf/${dir}/${size}_${path}.png`);
    },
    selServers() {
      let _this = this;
      let api = this.isLogin ? dnfInnrApi : dnfOtsdApi;

      api.selDnfServers({})
      .then(res => {
        if(res.status == 200){
          _this.servers = res.data.rows;
        }
      })
      .catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
            console.error('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
            console.error(err);
        }
      }).finally(() => {
        if(cUtils.isNotEmptyObject(_this.servers)){
          _this.servers.forEach(el => {
            _this.serversMap[el.serverId] = el.serverName;
          });
        }
      });
    },
    rplcCharName(characterName) {
      let idx = characterName.indexOf(this.target);
      let lastIdx = idx + this.target.length;

      let strList = [];
      if(idx == 0){
        strList.push({str:characterName.substring(0, lastIdx), isRed: true});
        strList.push({str:characterName.substring(lastIdx), isRed: false});
      } else {
        strList.push({str:characterName.substring(0, idx), isRed: false});
        strList.push({str:characterName.substring(idx, lastIdx), isRed: true});
        strList.push({str:characterName.substring(lastIdx), isRed: false});
      }

      return strList;
    },
    selCharacters() {
      let _this = this;
      let characters = {
          characterName : this.target,
          wordType : 'full',
          limit : 50,
      };

      dnfOtsdApi.selCharacters(characters)
      .then((res)=> {
          if(res.status == 200){
              _this.charList = res.data.rows;
              _this.charList.forEach(char => {
                char.charImgPath = `https://img-api.neople.co.kr/df/servers/${char.serverId}/characters/${char.characterId}?zoom=3`;
              });
          }
      }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
              console.error('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
              console.error(err);
          }
      }).finally(() => {
      });
    },
    setCodeMap(map) {
      const codeMap = map;

      this.servers = codeMap['DNF_SRVR'];
      this.serversMap = cUtils.convertCodeList2Map(this.servers);
    },
    pulsBtn(v) {
      console.log(v);
      this.LayerShow = true;
    },
    closeLayer() {
      this.LayerShow = false;
    }
  },
  created() {
    this._selCommCode(['DNF_SRVR', 'DNF_JOB'], this.setCodeMap);

    this.target = this.$route.query?.target;
    if(cUtils.isNotEmpty(this.target)){
      this.selCharacters();
    }
  },
}