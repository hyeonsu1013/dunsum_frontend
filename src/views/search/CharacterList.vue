<template>
  <div>
    <v-row justify="center">
      <div class="text-center d-flex pb-4">
        <v-btn @click="allOpen">
          모두 펼치기
        </v-btn>
        <v-btn @click="allClose">
          모두 접기
        </v-btn>
      </div>
      <v-expansion-panels inset v-model="panel" multiple>
        <v-expansion-panel v-for="(char, i) in charList" :key="i">
          <v-expansion-panel-header>
            <template v-if="panel.indexOf(i) < 0">
              <v-row>
                <v-col md="1">
                  <v-img class="row_cont row_img" :lazy-src="getImagePath('s', 'profiles', 'lazy')" :src="getImagePath('s', 'profiles',char.jobId)" max-height="32" max-width="36"/>
                </v-col>
                <v-col md="2" class="row_cont row_server bg_orange_light fbold">
                  {{serversMap[char.serverId]}}
                </v-col>
                <v-col md="1" class="row_cont row_level fbold" :class="{'fblue': char.level == maxLevel }">
                  {{char.level}}
                </v-col>
                <v-col md="7" class="row_cont row_name bg_orange_light">
                  <template v-for="(strObj, index) in rplcCharName(char.characterName)">
                    <span :key="'strObj'+index" :class="{'fmain': strObj.isRed }">{{strObj.str}}</span>
                  </template>
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-hover v-slot="{ hover }">
              <v-img class="row_cont row_img_ex" :src="char.charImgPath" contain max-height="345" max-width="280">
                <v-expand-transition>
                  <div v-if="hover" class="d-flex transition-fast-in-fast-out darken-2 v-card--reveal text-h2 white--text">
                    <v-btn class="mx-2 hover_button" fab dark x-large color="lime darken-1" @click="pulsBtn(char)">
                      <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                </v-expand-transition>
              </v-img>
            </v-hover>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <DunsumLayer :show="LayerShow" :title="'캐릭터 등록 인증'" :btnTxtL="'저장'" @left="saveCharBtn" @right="closeLayer">
      <v-carousel height="500" hide-delimiter-background>
        <v-carousel-item v-for="(slide, i) in slideImgs" :key="i">
          <v-sheet :color="'white'" height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <v-img class="cl_img" :src="getImagePath('l', slide.dir, slide.path)" max-height="500" max-width="500"/>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <v-container>
        <v-row class="fill-height cl_sel_row" align="center" justify="center">
          <v-col class="row_text">
            {{ ranNum + '번째 타임라인 ▶ '}}
          </v-col>
          <v-col class="row_selbox">
            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="date" label="타임라인 날짜" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" hide-details="true"></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable locale="ko">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col class="row_selbox">
            <v-overflow-btn class="my-2 cl_sel_time" v-model="selTimeLine" :items="timeLineList" label="타임라인 / 검색가능" editable item-text="codeIdName" item-value="codeId" hide-details="true"></v-overflow-btn>
          </v-col>
        </v-row>
        <v-row class="fill-height cl_sel_row">
          <v-col class="row_text_hint fred">
            2회 이상 오답 시, 일정 시간 동안 등록할 수 없습니다.
          </v-col>
        </v-row>
      </v-container>
      
    </DunsumLayer>
  </div>
</template>

<script>
import CharacterList from "@/views/search/characterList";
export default CharacterList;
</script>