<template>
    <div class="account_signin">
        <v-layout class="account_layout" align-center justify-center>
            <v-flex class="account_login" xs12 sm8 md6 lg6>
                <v-card class="elevation-1 pa-3">
                    <v-card-text>
                        <div class="layout column align-center">
                        <img src="@/assets/images/vue/logo.svg" alt="Vue Material Admin" width="180" height="180">
                        </div>
                        <v-form>
                        <v-text-field name="login" label="Login ID" type="text" v-model="loginId"/>
                        <v-text-field name="password" label="Password" id="password" v-model="password"/>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn block class="account_btn" @click="login" :loading="loading">로그인</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import SignUp from "@/views/account/signUp";
export default SignUp;
</script>