<template>
  <div id="screen">
    <div id="overlay" v-if="overlay" v-on:click.self="disableOverlay">
      <ul id="settings" class="settings" v-on:click.self="disableOverlay">
        <v-col cols="12" class="gridView" >
          <v-row v-on:click.self="disableOverlay">
            <textFiled v-bind="{
              labelText: '一行あたりの文字数', 
              labelValue: dataProperty.lineStrValue }"
              v-on:changedValue="updateLineStrValue" />
            <textFiled v-bind="{
              labelText: '表示する行数', 
              labelValue: dataProperty.viewableArrayIndex }"
              v-on:changedValue="updateviewableArrayIndex" />
            <textFiled v-bind="{
              labelText: 'フォントサイズ', 
              labelValue: dataProperty.fontSize }"
              v-on:changedValue="updateFontSize" />
            <textFiled v-bind="{
              labelText: '行の間隔', 
              labelValue: dataProperty.listMargn }"
              v-on:changedValue="updateListMargin" />
          </v-row>
          <v-row v-on:click.self="disableOverlay">
            <colorPicker v-bind="{
              pickerText: '背景色の変更', 
              pickerValue: dataProperty.colors }"
              v-on:changedValue="updateBackgroundColors" />
            <colorPicker v-bind="{
              pickerText: '文字色の変更', 
              pickerValue: dataProperty.fontColors }"
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
  props: ['dataProperty'],
  data: () => ({
    overlay: false,
    dataPropertyChanged: null
  }),
  created() {
      this.dataPropertyChanged = this.dataProperty
  },
  methods: {
    enableOverlay() {
      this.overlay = true;
    },
    disableOverlay() {
      this.overlay = false;
      this.$emit("disableOverlay")
    },
    updateLineStrValue(value) {
      this.dataPropertyChanged.lineStrValue = value
      this.updateNotify()
    },
    updateviewableArrayIndex(value) {
      this.dataPropertyChanged.viewableArrayIndex = value
      this.updateNotify()
    },
    updateFontSize(value) {
      this.dataPropertyChanged.fontSize = value
      this.updateNotify()
    },
    updateBackgroundColors(value) {
      this.dataPropertyChanged.colors = value
      this.updateNotify()
    },
    updateFontColors(value) {
      this.dataPropertyChanged.fontColors = value
      this.updateNotify()
    },
    updateListMargin(value) {
      this.dataPropertyChanged.listMargn = value
      this.updateNotify()
    },
    updateNotify() {
      this.$emit("updateDataProperty", this.dataPropertyChanged)
    }
  },
  components: { colorPicker, textFiled }

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
  height: 80%;
  background-color: rgba(187, 187, 187, 0.8);
  align-items: center;
  justify-content: center;
}
</style>
