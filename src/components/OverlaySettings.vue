<template>
  <div id="screen">
    <div id="overlay" v-if="overlay" v-on:click.self="disableOverlay">
      <ul id="settings">
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
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['lineStrValue', 'viewableArrayIndex', 'fontSize'],
  data: () => ({
    overlay: false,
  }),
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
    }
  }
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
  background-color: rgba(109, 109, 109, 0.5);
  align-items: center;
  justify-content: center;
}
</style>
