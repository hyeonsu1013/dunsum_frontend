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
                <v-col>
                    {{getCharNm(char)}}
                </v-col>
                <v-col>
                    .col-6 .col-md-4
                </v-col>
                <v-col>
                    세번째
                </v-col>
              </v-row>
            <!-- {{char.characterName}} -->
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