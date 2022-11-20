<template>
    <div>
        <div class="nav">
            <a href="#" class="nav-logo">
                <img src="../assets/images/vue/logo.png" alt="">
            </a>
            <div class="nav-mobile">
                <i class="fa fa-bars" v-on:click="openMenuMobile()"></i>  
            </div>
        </div>
        <div class="menu" id="menu">
            <div class="menu-logo">
                <!-- <img src="../assets/about.jpg" alt=""> -->
                <a :href="domain_link.dnfOpenApi" target="_blank">
                <img src="../assets\images\dnf\neopleBIsmall.png" alt="Neople 오픈 API"/> </a>
            </div>
            <div class="menu-name">
                <h2>powered by neople openAPI</h2>
                <div class="menu-name-social-icons">
                    <a :href="domain_link.github">
                        <font-awesome-icon icon="fab fa-github"/>
                    </a>
                    <a :href="domain_link.instagram">
                        <font-awesome-icon icon="fab fa-instagram"/>
                    </a>
                </div>
            </div>
            <div class="menu-list">
                <ul>
                    <li class="menu-list-title"> 
                        Characters
                    </li>
                    <li class="dropdown">
                        <a href="#" v-on:click.prevent.stop="openDropdown()" class="dropbtn">{{currServer.serverName}}
                            <font-awesome-icon v-if="toggleDropdown.characters" icon="fas fa-angle-up" />
                            <font-awesome-icon v-else icon="fas fa-angle-down" />
                        </a>
                    </li>
                    <li id="myDropdown" class="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </li>
                </ul>
                <ul>
                    <li class="menu-list-title"> 
                        Server
                    </li>
                    <v-list shaped>
                        <v-list-item-group v-model="serverIdx" color="primary">
                            <v-list-item v-for="(server, index) in servers" :key="index" @click="serverBtn(index)">
                                <v-list-item-icon>
                                    <v-icon v-if="serverIdx == index" v-text="'mdi-star'"></v-icon>
                                    <v-icon v-else v-text="'mdi-star-outline'"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="server.serverName"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </ul>
            </div>
        </div>
        <div class="header-top">
            <div class="header-top-content">
                <input type="text" placeholder="Search...">
                <h5 class="header-top-title" @click="moveRoute('dashbord')">DUNSUM</h5>
                <ul class="options-user">
                    <li>
                        <a href="#" v-on:click.prevent.stop="openDropdownUser()" class="options-user-head">
                            <font-awesome-icon v-if="toggleDropdown.user" icon="far fa-user"/>
                            <font-awesome-icon v-else icon="fas fa-user"/>
                        </a>
                        <ul v-if="userInfo == null" id="myDropdownUser">
                            <li>
                                <a @click="moveRoute('dashbord')"><i><font-awesome-icon icon="fas fa-chart-line" /></i> 대시보드</a>
                            </li>
                            <li>
                                <a @click="moveRoute('guest')"><i><font-awesome-icon icon="far fa-user"/></i> 로그인 (Guest)</a>
                            </li>
                            <li>
                                <a @click="moveRoute('signIn')"><i><font-awesome-icon icon="far fa-user"/></i> 로그인</a>
                            </li>
                            <li>
                                <a @click="moveRoute('signUp')"><i><font-awesome-icon icon="fas fa-user-plus" /></i> 회원가입</a>
                            </li>
                        </ul>
                        <ul v-else id="myDropdownUser">
                            <li>
                                <a><i><font-awesome-icon icon="far fa-id-card"/></i> My Page</a>
                            </li>
                            <li>
                                <a><i><font-awesome-icon icon="fas fa-sign-out-alt"/></i> Sign-out</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="sidebar-list" id="sidebar">
            <div class="sidebar-list-item">
                <router-link to="/">
                    <i><font-awesome-icon icon="fas fa-sign-out-alt"/></i>
                    <span class="tooltip">Dashboard</span>
                </router-link>
            </div>
            <div class="sidebar-list-item">
                <router-link to="/about">
                    <i><font-awesome-icon icon="fas fa-sign-out-alt"/></i>
                    <span class="tooltip">About</span>
                </router-link>
            </div>
            <div class="sidebar-list-item">
                <a href="">
                    <i><font-awesome-icon icon="fas fa-sign-out-alt"/></i>
                    <span class="tooltip">Download</span>
                </a>
            </div>
            <div class="sidebar-list-item">
                <a href="">
                    <i><font-awesome-icon icon="fas fa-sign-out-alt"/></i>
                    <span class="tooltip">Calendar</span>
                </a>
            </div>
            <div class="sidebar-list-item">
                <a href="">
                    <i><font-awesome-icon icon="fas fa-sign-out-alt"/></i>
                    <span class="tooltip">Star</span>
                </a>
            </div>
            <div class="sidebar-list-item">
                <a href="">
                    <i><font-awesome-icon icon="fas fa-sign-out-alt"/></i>
                    <span class="tooltip">Products</span>
                </a>
            </div>
            <div class="sidebar-list-item">
                <a href="">
                    <i><font-awesome-icon icon="fas fa-sign-out-alt"/></i>
                    <span class="tooltip">Time</span>
                </a>
            </div>
            <div class="sidebar-list-item">
                <a href="">
                    <i><font-awesome-icon icon="fas fa-sign-out-alt"/></i>
                    <span class="tooltip">Config</span>
                </a>
            </div>
            <div class="sidebar-list-item">
                <a href="">
                    <i><font-awesome-icon icon="fas fa-sign-out-alt"/></i>
                    <span class="tooltip">Sitemap</span>
                </a>
            </div>
            <div class="sidebar-list-item">
                <a href="">
                    <i><font-awesome-icon icon="fas fa-sign-out-alt"/></i>
                    <span class="tooltip">Sign out</span>
                </a>
            </div><div class="sidebar-list-item">
                <a href="">
                    <i><font-awesome-icon icon="fas fa-sign-out-alt"/></i>
                    <span class="tooltip">Another</span>
                </a>
            </div>
        </div>
    </div>

</template>

<script>
import dnfInnrApi from '@/api/dnf/dnf';
import dnfOtsdApi from '@/api/outside/dnf';

export default {
    name: 'MyHeader',
    data(){
        return{
            userInfo : null,
            serverIdx : 0,
            servers : [],
            currServer : {
                serverName : '',
                serverId : '',
            },
            domain_link : {
                dnfOpenApi : 'http://developers.neople.co.kr',
                github : 'https://github.com/hyeonsu1013',
                instagram : 'https://www.instagram.com/just_h.soo/',
            },
            // 목록 온/오프
            toggleDropdown : {
                characters : false,
                user : false,
            },
        }
    },
    watch: {
        serverIdx(v) {
            if(this.servers.length > v) {
                this.currServer.serverName = this.servers[v].serverName;
                this.currServer.serverId = this.servers[v].serverId;
            }
        },
    },
    methods:{
        // DNF 서버 조회
        selServers() {
            let _this = this;
            dnfInnrApi.selDnfServers({})
            .then((res)=> {
                if(res.status == 200){
                    _this.servers = res.data.rows;
                    if(_this.servers != null && _this.servers.length > 0){
                        _this.currServer.serverName = _this.servers[0].serverName;
                        _this.currServer.serverId = _this.servers[0].serverId;
                    }
                }
            }).catch((err) => {
                if (err.message.indexOf('Network Error') > -1) {
                    console.error('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
                    console.error(err);
                }
            }).finally(() => {
                this.selCharacters();
            });
        },
        selCharacters() {
            // let _this = this;
            let characters = {
                characterName : '은비츠',
                wordType : 'full',
            };
            dnfOtsdApi.selCharacters(this.currServer.serverId, characters)
            .then((res)=> {
                if(res.status == 200){
                    console.log('selCharacters', res);
                }
            }).catch((err) => {
                if (err.message.indexOf('Network Error') > -1) {
                    console.error('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
                    console.error(err);
                }
            }).finally(() => {
                this.getCharacter();
            });
        },
        getCharacter() {
            dnfOtsdApi.getCharacter(this.currServer.serverId, '71621072c54cc2a9e2acdd652315e7a8', {})
            .then((res)=> {
                if(res.status == 200){
                    console.log('getCharacter', res);
                }
            }).catch((err) => {
                if (err.message.indexOf('Network Error') > -1) {
                    console.error('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
                    console.error(err);
                }
            }).finally(() => {});
        },
        serverBtn(index) {
            this.serverIdx = index;
        },
        openDropdown() {
            this.toggleDropdown.characters = !this.toggleDropdown.characters;
            document.getElementById("myDropdown").classList.toggle("show");
        },
        openDropdownUser(close = false) {
            if(close){
                this.toggleDropdown.user = false;
                document.getElementById("myDropdownUser").classList.remove("show");
            } else {
                this.toggleDropdown.user = !this.toggleDropdown.user;
                document.getElementById("myDropdownUser").classList.toggle("show");
            }
        },
        openMenuMobile(){
            document.getElementById("menu").classList.toggle("showMenu");
            document.getElementById("sidebar").classList.toggle("showSidebar");
        },
        moveRoute(path) {
            let url= '/';
            let compName = '';

            switch(path) {
                case 'dashbord':
                    url = '/';
                    break;
                case 'guest':
                    url = '/account';
                    compName = '/guestin';
                    break;
                case 'signIn':
                    url = '/account';
                    compName = '/signin';
                    break;
                case 'signUp':
                    url = '/account';
                    compName = '/signup';
                    break;
            }

            // 메뉴 닫기
            this.openDropdownUser(true);
            // 라우터이동
            this.$router.push({
                path: `${url}${compName}`,
            });
            
        },
    },
    created() {
        this.selServers();
    },
}
</script>