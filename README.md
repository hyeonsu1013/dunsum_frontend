# frontend

# Project Tree
* tree.txt 참고

# 주요기능
* Vuetify Project
>

* Custom Alert 사용
  1. BaseComponent : vuetify v-dialog
  2. global Alert으로 생성
  3. 각 파일 내에서 Custom 가능
>

* 좌측 고정 Navigation
  1. Bar_1 : 간편 메뉴이동 (확장/축소 기능 적용)
  2. Bar_2 : 선택 값에 따른 router Data 조회 조건 변경 : Global Param 역할
>

* 상단 고정 Appbar
  1. 캐릭터 검색 / 아이템 검색 지원
  2. Title : Title 효과와 Main 화면 바로가기 적용
  3. 계정 관리 메뉴 추가
      * 로그아웃 상태 : 메인화면
      * 로그아웃 상태 : 게스트로그인
      * 로그아웃 상태 : 일반로그인
      * 로그아웃 상태 : 회원가입
      * 로그인 상태 : 메인화면
      * 로그인 상태 : 마이페이지
      * 로그인 상태 : 로그아웃
>

* router-view 적용
  1. views 목록
      * 추가예정
      * 추가예정
      * 추가예정
  2. router error Handling 적용
>

* vuex store 적용
  1. gobal 변수
      * login 여부 확인

## user Agnet Client Hint 도입
```
uach-retrofill.js - Copyright 2020 Google LLC
```

## npm install
```
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/vue-fontawesome
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/free-regular-svg-icons
npm i --save @fortawesome/free-brands-svg-icons

npm i axios

npm i vue-router@3.2.0

npm i vuex@2.0.0

npm i sass
npm i sass-loader@10
npm i sass-loader
```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```


# TODO

### Design
1. 전체 컴포넌트 색 조정

### 기능
1. 캐릭터 검색 화면 추가
2. 특정 페이지일 경우 뒤로가기 제어 기능 추가