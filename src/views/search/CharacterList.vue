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
              <v-row no-gutters>
                <v-col md="1">
                  <v-img :lazy-src="getImagePath('lazy')" :src="getImagePath(char.jobId)" max-height="32" max-width="36"/>
                </v-col>
                <v-col md="1" class="row_text row_level fbold" :class="{'fblue': char.level == maxLevel }">
                  {{char.level}}
                </v-col>
                <v-col md="2" class="row_text row_name">
                  <template v-for="(strObj, index) in rplcCharName(char.characterName)">
                    <span :key="'strObj'+index" :class="{'fred': strObj.isRed }">{{strObj.str}}</span>
                  </template>
                </v-col>
                <v-col md="2" class="row_text row_server">
                  {{serversMap[char.serverId]}}
                </v-col>
              </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{char.jobGrowId}}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
import CharacterList from "@/views/search/characterList";
export default CharacterList;
</script>