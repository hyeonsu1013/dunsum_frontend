<template>
    <div>
        <div class="nav">
            <a href="#" class="nav-logo">
                <img src="../assets/logo.png" alt="">
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
                        Charactors
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
                    <li class="menu-list-item-2" v-for="(server, index) in servers" :key="index" @click="serverBtn(index)">
                        <i v-if="serverIdx == index"><font-awesome-icon icon="fas fa-star"/></i>
                        <i v-else><font-awesome-icon icon="far fa-star"/></i>
                        <h5>{{server.serverName}}</h5>
                    </li>
                </ul>
            </div>
        </div>
        <div class="header-top">
            <div class="header-top-content">
                <input type="text" placeholder="Search...">
                <h5>DUNSUM</h5>
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
                    <i class="fa fa-home"></i>
                    <span class="tooltip">Dashboard</span>
                </router-link>
            </div>
            <div class="sidebar-list-item">
                <router-link to="/about">
                    <i class="fa fa-user"></i>
                    <span class="tooltip">About</span>
                </router-link>
            </div>
            <div class="sidebar-list-item">
                <a href="">
                    <i class="fa fa-download"></i>
                    <span class="tooltip">Download</span>
                </a>
            </div>
            <div class="sidebar-list-item">
                <a href="">
                    <i class="fa fa-calendar"></i>
                    <span class="tooltip">Calendar</span>
                </a>
            </div>
            <div class="sidebar-list-item">
                <a href="">
                    <i class="fa fa-star"></i>
                    <span class="tooltip">Star</span>
                </a>
            </div>
            <div class="sidebar-list-item">
                <a href="">
                    <i class="fa fa-shopping-bag"></i>
                    <span class="tooltip">Products</span>
                </a>
            </div>
            <div class="sidebar-list-item">
                <a href="">
                    <i class="fa fa-clock-o"></i>
                    <span class="tooltip">Time</span>
                </a>
            </div>
            <div class="sidebar-list-item">
                <a href="">
                    <i class="fa fa-cogs"></i>
                    <span class="tooltip">Config</span>
                </a>
            </div>
            <div class="sidebar-list-item">
                <a href="">
                    <i class="fa fa-sitemap"></i>
                    <span class="tooltip">Sitemap</span>
                </a>
            </div>
            <div class="sidebar-list-item">
                <a href="">
                    <i class="fa fa-sign-out"></i>
                    <span class="tooltip">Sign out</span>
                </a>
            </div><div class="sidebar-list-item">
                <a href="">
                    <i class="fa fa-sign-out"></i>
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
                    console.log(res);
                }
            }).catch((err) => {
                if (err.message.indexOf('Network Error') > -1) {
                    console.error('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
                    console.error(err);
                }
            });
        },
        serverBtn(index) {
            this.serverIdx = index;
        },
        openDropdown() {
            this.toggleDropdown.characters = !this.toggleDropdown.characters;
            document.getElementById("myDropdown").classList.toggle("show");
        },
        openDropdownUser() {
            this.toggleDropdown.user = !this.toggleDropdown.user;
            document.getElementById("myDropdownUser").classList.toggle("show");
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
            this.openDropdownUser();
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