<template>
  <div>
    <!-- S: 좌측 네비게이션 -->
    <v-navigation-drawer class="header_nav" v-model="drawer" :mini-variant.sync="mini" permanent>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="../assets/images/vue/logo.png"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>Javayaji's DNF</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- E: 좌측 네비게이션 -->

    <!-- S: 좌측 메뉴목록 -->
    <div class="header_menu">
      <div class="logo">
          <a :href="domain_link.dnfOpenApi" target="_blank">
          <img src="../assets\images\dnf\neopleBIsmall.png" alt="Neople 오픈 API"/> </a>
      </div>
      <div class="name">
          <h2>powered by neople openAPI</h2>
          <div class="social_icons">
              <a :href="domain_link.github" target="_blank">
                  <font-awesome-icon icon="fab fa-github"/>
              </a>
              <a :href="domain_link.instagram" target="_blank">
                  <font-awesome-icon icon="fab fa-instagram"/>
              </a>
          </div>
      </div>

      <div class="header_menu_list">
        <ul>
          <li class="title"> 
              Servers
          </li>
          <v-list class="list">
            <v-list-group color="primary" v-model="toggleDropdown.server">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>{{currServer.serverName}}</v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item-group v-model="serverIdx" color="primary">
                <v-list-item v-for="(server, index) in servers" :key="'s'+index" link @click="serverBtn(index)">
                  <v-list-item-title class="item_title" v-text="server.serverName"></v-list-item-title>

                  <v-list-item-icon>
                    <!-- <v-icon v-text="charId"></v-icon> -->
                  </v-list-item-icon>
                </v-list-item>
              </v-list-item-group>
            </v-list-group>
          </v-list>
        </ul>
        <ul>
          <li class="title"> 
              Characters
          </li>
          <v-list shaped>
            <v-list-item-group v-model="characterIdx" color="primary">
                <v-list-item v-for="(character, index) in characters" :key="'c'+index" @click="characterBtn(index)">
                    <v-list-item-icon>
                        <v-icon v-if="characterIdx == index" v-text="'mdi-star'"></v-icon>
                        <v-icon v-else v-text="'mdi-star-outline'"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="character.charName"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
          </v-list>
        </ul>
      </div>
    </div>
    <!-- E: 좌측 메뉴목록 -->

    <!-- S: 상단 메뉴바 -->
    <v-app-bar class="header_appbar" elevate-on-scroll height="80">
      <div class="contents">
        <div class="title_wrapper">
          <v-toolbar-title class="title" @click="moveRoute('/')">
            <div class="wrapper">
              <div class="focus">
                DUNSUM
              </div>
              <div class="mask">
                <div class="text">DUNSUM</div>
              </div>
            </div>
          </v-toolbar-title>
        </div>

        <v-spacer></v-spacer>
        <div class="searchbox mr10">
          <v-text-field v-model="serachTextItem" label="아이템 검색" background-color="white" color="brown lighten-1" @keyup.enter="search('i')"
                        outlined clearable rounded hide-details="true"></v-text-field>
        </div>

        <div class="searchbox">
          <v-text-field v-model="serachTextChar" label="캐릭터 검색" background-color="white" color="brown lighten-1" @keyup.enter="search('c')"
                        outlined clearable rounded hide-details="true"></v-text-field>
        </div>

        <v-btn icon @click="search()">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-menu bottom left :offset-y="true" transition="slide-y-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="black" v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list flat>
            <v-list-item v-for="(menu, i) in topMenuList" :key="i" @click="moveRoute(menu.moveUrl)">
              <v-list-item-icon>
                <v-icon>{{menu.icon}}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="menu.title"/>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <!-- E: 상단 메뉴바 -->
  </div>
</template>

<script>
import dnfInnrApi from '@/api/dnf/dnf';
import dnfOtsdApi from '@/api/outside/dnf';
import cUtils from '@/utils/commonUtils';
import { mapState, mapMutations } from 'vuex';
let _storage = window.sessionStorage;

export default {
  data () {
    return {
      userInfo : null,
      drawer: true,
      items: [
        { title: 'Home', icon: 'mdi-home-city' },
        { title: 'My Account', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' },
      ],
      mini: true,
      domain_link : {
          dnfOpenApi : 'http://developers.neople.co.kr',
          github : 'https://github.com/hyeonsu1013',
          instagram : 'https://www.instagram.com/just_h.soo/',
      },
      // 목록 온/오프
      toggleDropdown : {
          server : false,
      },
      topMenuList : [],
      topMenuNonList : [
        { title: '대시보드', icon : 'mdi-format-list-bulleted-square', moveUrl : '/' },
        { title: '로그인 (Guest)', icon : 'mdi-account-outline', moveUrl : '/account/guestin' },
        { title: '로그인', icon : 'mdi-account', moveUrl : '/account/signin' },
        { title: '회원가입', icon : 'mdi-account-plus', moveUrl : '/account/signup' },
      ],
      topMenuUserList : [
        { title: '대시보드', icon : 'mdi-format-list-bulleted-square', moveUrl : '/' },
        { title: '마이페이지', icon : 'mdi-account', moveUrl : '/' },
        { title: '로그아웃', icon : 'mdi-logout', moveUrl : null, alret : 'logout' },
      ],
      currServer : {serverName: '1번서버', serverId: '1'},
      currCharacter : {charName: '《전체》', charId: '0'},
      serverIdx : 0,
      characterIdx : 0,
      serachTextItem: '',
      serachTextChar: '',
      characters : [
        {charName: '《전체》', charId: '0'},
        {charName: '1번캐릭터', charId: '1'},
      ],
      servers : [],
    }
  },
  watch: {
      serverIdx(v) {
        if(this.servers.length > v) {
            this.currServer.serverName = this.servers[v].serverName;
            this.currServer.serverId = this.servers[v].serverId;
        }
      },
      characterIdx(v) {
        if(this.characters.length > v) {
            this.currCharacter.charName = this.characters[v].charName;
            this.currCharacter.charId = this.characters[v].charId;
        }
      },
      isLogin(val) {
        this.userInfo = val ? JSON.parse(_storage.getItem(process.env.VUE_APP_USER_DATA)) : null;
        this.topMenuList = val ? this.topMenuUserList : this.topMenuNonList;

        // 서버 조회
        this.selServers();
        // 캐릭터 조회
      },
      serachTextItem(txt) {
        if(cUtils.isEmpty(txt)){
          return;
        }
        this.serachTextChar = '';
      },
      serachTextChar(txt) {
        if(cUtils.isEmpty(txt)){
          return;
        }
        this.serachTextItem = '';
      }
  },
  computed : {
    ...mapState(['isLogin']),
  },
  methods: {
    ...mapMutations(['SET_SRVR', 'SET_SEARCH']),
    serverBtn(index) {
      this.serverIdx = index;
      this.toggleDropdown.server = false;
    },
    characterBtn(index) {
      this.characterIdx = index;
    },
    moveRoute(path) {
      // 라우터이동
      this.$router.push({
          path: path,
      });
    },
    selServers() {
      let _this = this;
      let api = this.isLogin ? dnfInnrApi : dnfOtsdApi;

      api.selDnfServers({})
      .then(res => {
        if(res.status == 200){
          _this.servers = res.data.rows;
          if(_this.servers != null && _this.servers.length > 0){
             _this.SET_SRVR(_this.servers);
            _this.currServer = _this.servers[0];
          }
        }
      })
      .catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
            console.error('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
            console.error(err);
        }
      }).finally(() => {
      });
    },
    search(type) {
      // TODO alert
      if(cUtils.isEmpty(this.serachTextItem || this.serachTextChar) || (this.serachTextItem || this.serachTextChar).length < 2){
        this.showAlert('2자 이상 입력해주세요.');
        return;
      }

      if(cUtils.isEmpty(type)){
        type = cUtils.isEmpty(this.serachTextItem) ? 'c' : 'i';
      }

      this.SET_SEARCH();
      this.$router.push({
          path: `/search/${type}list`,
          query : {'target' : this.serachTextItem || this.serachTextChar}
      });
    },
  },
  created() {
    this.topMenuList = this.topMenuNonList;
    this.selServers();
  },
}
</script>