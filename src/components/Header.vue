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
                <a href="http://developers.neople.co.kr" target="_blank">
                <img src="../assets\images\dnf\neopleBIsmall.png" alt="Neople 오픈 API"/> </a>
			</div>
            <div class="menu-name">
                <h2>powered by neople openAPI</h2>
                <div class="menu-name-social-icons">
                    <a href="">
                        <i class="fa fa-facebook"></i>
                    </a>
                    <a href="">
                        <i class="fa fa-instagram"></i>
                    </a>
                    <a href="">
                        <i class="fa fa-twitter"></i>
                    </a>
                    <a href="">
                        <i class="fa fa-pinterest"></i>
                    </a>
                </div>
            </div>
            <div class="menu-list">
                <ul>
                    <li class="menu-list-title"> 
                        Charactors
                    </li>
                    <li class="dropdown">
                        <a href="#" v-on:click.prevent.stop="openDropdown()" class="dropbtn">{{currServer.serverName}} <i class="fa fa-angle-down"></i></a>
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
                        <a href="#" v-on:click.prevent.stop="openDropdownUser()" class="options-user-head"><i class="fa fa-user"></i></a>
                        <ul id="myDropdownUser">
                            <li>
                                <a href=""><i class="fa fa-user"></i> User</a>
                            </li>
                            <li>
                                <a href=""><i class="fa fa-cogs"></i> Config</a>
                            </li>
                            <li>
                                <a href=""><i class="fa fa-sign-out"></i> Sign out</a>
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
import dnfApi from '@/api/dnf/dnf';
import commApi from '@/api/common/comm';

export default {
    name: 'Header',
    data(){
        return{
            serverIdx : 0,
            servers : [],
            currServer : {
                serverName : '',
                serverId : '',
            }
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
        selDumy() {
            commApi.selTest()
            .then((res)=> {
                console.log(res);
            }).catch((err) => {
                if (err.message.indexOf('Network Error') > -1) {
                    console.error('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
                    console.error(err);
                }
            }).finally(() => {
            });
        },
        selServers() {
            let _this = this;
            dnfApi.selDnfServers({})
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
            dnfApi.selCharacters(this.currServer.serverId, characters)
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
            document.getElementById("myDropdown").classList.toggle("show");
        },
        openDropdownUser() {
            document.getElementById("myDropdownUser").classList.toggle("show");
        },
        openMenuMobile(){
            document.getElementById("menu").classList.toggle("showMenu");
            document.getElementById("sidebar").classList.toggle("showSidebar");
        }
    },
    created() {
        this.selServers();
        this.selDumy();
    },
}
</script>