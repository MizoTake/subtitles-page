<template>
  <div id="app" v-on:click="onClick"
    v-bind:style="{ width: windowWidth + 'px', height: windowHeight + 'px' }">
    <ul class="subtitles">
      <li v-for="(str, index) in sliceText" :key="index">
        {{ str }}
      </li>
    </ul>
    <overlaySettings ref="overlaySettings" 
    v-bind="{
      lineStrValue: lineStrValue
    }"
    v-on:disableOverlay="disableOverlayFromoverlaySettings"
    v-on:updateLineStrValue="updateLineStrValue" />
  </div>
</template>

<script>
import overlaySettings from "./components/OverlaySettings.vue"

export default {
  name: 'App',
  data: () => ({
    speechRecognition: window.SpeechRecognition || window.webkitSpeechRecognition,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    currentText: '',
    overlay: false,
    overlaySettingsDisable: false,
    lineStrValue: 10
  }),
  computed: {
   sliceText: function () {
      const result = []
      for (let i = 0; i < this.currentText.length; i += this.lineStrValue) {
        result.push(this.currentText.slice(i, i + this.lineStrValue))
      }
      return result
    }
  },
  methods: {
    handleResize: function() {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
    },
    onClick: function() {
      if (this.overlaySettingsDisable) {
        this.overlaySettingsDisable = false
        return
      }
      this.overlay = true
      this.$refs.overlaySettings.enableOverlay()
    },
    disableOverlayFromoverlaySettings: function() {
      this.overlay = false
      this.overlaySettingsDisable = true
    },
    updateLineStrValue: function(value) {
      this.lineStrValue = parseInt(value)
    },
    settingRecognition () {
      var recognition = new this.speechRecognition()
      recognition.lang = 'ja-JP'
      recognition.interimResults = true
      recognition.continuous = true

      recognition.addEventListener('result', event => {
        const stackText = Array.from(event.results).map(x => x[0]).map(x => x.transcript)
        this.currentText = stackText.join('。')
        this.lineStrArray = []
        for (let i = 0; i < this.currentText.length; i += this.lineStrValue) {
          this.lineStrArray.push(this.currentText.slice(i, i + this.lineStrValue))
        }
      })

      recognition.addEventListener('speechend', () => {
        // recognition.start()
      })

      recognition.start()
    }
  },
  mounted () {
    if (!this.speechRecognition) {
      alert('Chromeをお使いください。')
      return
    }
    this.settingRecognition()
    window.addEventListener("resize", this.handleResize)
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.handleResize)
  },
  components: { overlaySettings }
}
</script>

<style>
.subtitles {
	text-align: center;
}
.subtitles-block {
	text-align: center;
}
.subtitles-block li {
	display: inline-block;
}

</style>
