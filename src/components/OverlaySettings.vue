<template>
  <div id="screen">
    <div id="overlay" v-if="overlay" v-on:click.self="disableOverlay">
      <ul id="settings" class="settings" v-on:click.self="disableOverlay">
        <v-col cols="12" class="gridView" >
          <v-row v-on:click.self="disableOverlay">
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                label="一行あたりの文字数"
                v-bind:value="lineStrValue"
                @change="updateLineStrValue"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                label="表示する行数"
                v-bind:value="viewableArrayIndex"
                @change="updateviewableArrayIndex"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                label="フォントサイズ"
                v-bind:value="fontSize"
                @change="updateFontSize"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                label="行の間隔"
                v-bind:value="listMargn"
                @change="updateListMargin"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-on:click.self="disableOverlay">
            <colorPicker v-bind="{
              pickerText: '背景色の変更', 
              pickerValue: pickerColor }"
              v-on:changedValue="updateBackgroundColors" />
            <colorPicker v-bind="{
              pickerText: '文字色の変更', 
              pickerValue: fontPickerColor }"
              v-on:changedValue="updateFontColors" />
          </v-row>
        </v-col>
      </ul>
    </div>
  </div>
</template>

<script>
import colorPicker from './MenuItems/ColorPicker.vue'
import textFiled from './MenuItems/TextField.vue'

export default {
  props: ['lineStrValue', 'viewableArrayIndex', 'fontSize', 'colors', 'fontColors', 'listMargn'],
  data: () => ({
    overlay: false,
    pickerColor: "#ffffff",
    fontPickerColor: "#ffffff"
  }),
  created: function () {
    this.pickerColor = this.colors
    this.fontPickerColor = this.fontSize
  },
  methods: {
    enableOverlay: function() {
      this.overlay = true;
    },
    disableOverlay: function() {
      this.overlay = false;
      this.$emit("disableOverlay")
    },
    updateLineStrValue: function(value) {
      this.$emit("updateLineStrValue", value)
    },
    updateviewableArrayIndex: function(value) {
      this.$emit("updateviewableArrayIndex", value)
    },
    updateFontSize: function(value) {
      this.$emit("updateFontSize", value)
    },
    updateBackgroundColors: function(value) {
      this.$emit("updateBackgroundColors", value)
    },
    updateFontColors: function(value) {
      this.$emit("updateFontColors", value)
    },
    updateListMargin: function(value) {
      this.$emit("updateListMargin", value)
    }
  },
  components: { colorPicker }

};
</script>

<style>
.screen * {
  border: 0;
  margin: 0;
  padding: 0;
}

.screen {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  opacity: 0;
}

#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(187, 187, 187, 0.8);
  align-items: center;
  justify-content: center;
}
</style>
