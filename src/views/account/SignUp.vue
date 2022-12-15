<template>
    <div class="account_sign">
        <v-layout class="account_layout" align-center justify-center>
            <v-flex class="account_login" xs12 sm8 md6 lg6>
                <v-card class="elevation-1 pa-3">
                    <v-card-text>
                        <div class="layout column align-center">
                        <img src="@/assets/images/vue/logo.svg" alt="Vue Material Admin" width="180" height="180">
                        </div>
                        <v-form>
                        <v-text-field name="LoginId" label="로그인ID(Login ID)" type="text" clearable v-model="input.loginId" :rules="ruleForId"/>
                        <v-text-field name="Password" label="비밀번호(Password)" id="Password" type="password" clearable v-model="input.password" :rules="ruleForPw"/>
                        <v-text-field name="PasswordChk" label="비밀번호 확인(Password)" id="PasswordChk" type="password" clearable v-model="input.passwordChk" :rules="ruleForPwChk"/>
                        <v-text-field name="Email" label="이메일(Email)" persistent-hint hint="하나의 Email로 최대 5개 가입 가능합니다. 비밀번호 분실 시 이용됩니다." type="text" clearable v-model="input.email" :rules="ruleForEm"/>
                        <div class="mt20">성별 정보는 <strong>통계</strong>에만 활용됩니다.</div>
                        <v-radio-group class="mt0" v-model="input.gender" row>
                            <v-radio value="M" color="blue">
                                <template v-slot:label>
                                <div class="fblue">남자(男/Man)</div>
                                </template>
                            </v-radio>
                            <v-radio value="W" color="red">
                                <template v-slot:label>
                                <div class="fred">여자(女/Woman)</div>
                                </template>
                            </v-radio>
                            </v-radio-group>

                        <v-text-field name="AuthenticationCode" label="관리자 인증번호(Authentication code)" id="AuthenticationCode" type="password" clearable v-model="input.authCode"/>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <div class="account_bot around">
                            <v-btn block class="account_btn init mr20" @click="initBtn">입력 초기화</v-btn>
                            <v-btn block class="account_btn" @click="signUp" :loading="loading">회원가입</v-btn>
                        </div>
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