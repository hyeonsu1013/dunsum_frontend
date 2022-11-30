<template>
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
                <v-img class="row_cont row_img" :lazy-src="getImagePath('s', 'lazy')" :src="getImagePath('s', char.jobId)" max-height="32" max-width="36"/>
              </v-col>
              <v-col md="2" class="row_cont row_server bg_orange_light fbold">
                {{serversMap[char.serverId]}}
              </v-col>
              <v-col md="1" class="row_cont row_level fbold" :class="{'fblue': char.level == maxLevel }">
                {{char.level}}
              </v-col>
              <v-col md="7" class="row_cont row_name bg_orange_light">
                <template v-for="(strObj, index) in rplcCharName(char.characterName)">
                  <span :key="'strObj'+index" :class="{'fred': strObj.isRed }">{{strObj.str}}</span>
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
                  <v-btn class="mx-2 hover_button" fab dark x-large color="lime darken-1">
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
</template>

<script>
import CharacterList from "@/views/search/characterList";
export default CharacterList;
</script>