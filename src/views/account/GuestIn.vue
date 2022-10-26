<template>
   <div>
        <div class="account_main_container">
            <div class="account_main_title">Login</div>
            <div class="account_main_sub_title mt40">(↑↑↑ Click Here ↑↑↑)</div>
        </div>
        <div class="account_sub_container">
            <h4 class="account_sub_title">게스트 로그인 유의 사항</h4>
            <ul class="account_sub_drop">
                <li>게스트ID 유효기간은 발급일로부터 <span class="fred fbold">일주일</span>입니다.</li>
                <li>게스트ID는 IP 단위로 저장됩니다. <span class="fred fbold">발급 장소</span>가 변경되거나, <span class="fred fbold">유동 IP</span>를 사용할 경우 변동될 수 있습니다.</li>
                <li>게스트ID는 <span class="fred fbold">제한된 기능</span>만 사용가능하며, <span class="fred fbold">분실</span>하는 경우 찾을 수 없습니다.</li>
                <li><span class="fblue fbold">회원가입을 통한 이용을 권장</span>드립니다.</li>
            </ul>
        </div>
    </div>
</template>

<script>
import GuestIn from "@/views/account/guestIn";
export default GuestIn;
</script>

<style>
@import '@/assets/css/directorys/account.css';
</style>