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
          <v-text-field v-model="serachTextItem" label="아이템 검색" background-color="white" color="brown lighten-1"
                        outlined clearable rounded hide-details="true"></v-text-field>
        </div>

        <div class="searchbox">
          <v-text-field v-model="serachTextChar" label="캐릭터 검색" background-color="white" color="brown lighten-1"
                        outlined clearable rounded hide-details="true"></v-text-field>
        </div>

        <v-btn icon>
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

  import cUtils from '@/utils/commonUtils';
  import {mapState} from 'vuex';
  let _storage = window.localStorage;

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
          {charName: '2번캐릭터', charId: '2'},
          {charName: '3번캐릭터', charId: '3'},
          {charName: '4번캐릭터', charId: '4'},
          {charName: '5번캐릭터', charId: '5'},
          {charName: '6번캐릭터', charId: '6'},
        ],
        servers : [
          {serverName: '1번서버', serverId: '1'},
          {serverName: '2번서버', serverId: '2'},
          {serverName: '3번서버', serverId: '3'},
          {serverName: '4번서버', serverId: '4'},
          {serverName: '5번서버', serverId: '5'},
          {serverName: '6번서버', serverId: '6'},
          {serverName: '7번서버', serverId: '7'},
          {serverName: '8번서버', serverId: '8'},
        ],
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
      serverBtn(index) {
        this.serverIdx = index;
        this.toggleDropdown.server = false;
      },
      characterBtn(index) {
        this.characterIdx = index;
      },
      openMenuMobile(){
          document.getElementById("menu").classList.toggle("showMenu");
          document.getElementById("sidebar").classList.toggle("showSidebar");
      },
      moveRoute(path) {
            // 라우터이동
            this.$router.push({
                path: path,
            });
        },
    },
    created() {
      this.topMenuList = this.topMenuNonList;
  },
  }
</script>