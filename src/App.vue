<template>
  <div id="app" v-on:click="onClick"
    v-bind:style="{ 
      width: windowWidth + 'px',
      height: windowHeight + 'px'
    }">
    <ul class="subtitles"
      v-bind:style="{ 
        'margin-bottom': windowHeight / 2 + 'px'
      }">
      <li v-for="(str, index) in sliceText" :key="index">
        {{ str }}
      </li>
    </ul>
    <overlaySettings ref="overlaySettings" 
    v-bind="{
      lineStrValue: lineStrValue,
      viewableArrayIndex: viewableArrayIndex
    }"
    v-on:disableOverlay="disableOverlayFromoverlaySettings"
    v-on:updateLineStrValue="updateLineStrValue"
    v-on:updateviewableArrayIndex="updateviewableArrayIndex" />
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
    isFirstStarted: false,
    currentText: '',
    overlay: false,
    overlaySettingsDisable: false,
    lineStrValue: 10,
    viewableArrayIndex: 5
  }),
  computed: {
   sliceText: function () {
      const result = []
      const temp = []
      for (let i = 0; i < this.currentText.length; i += this.lineStrValue) {
        temp.push(this.currentText.slice(i, i + this.lineStrValue))
      }
      temp.reverse()
      for (let i = 0; i<this.viewableArrayIndex; i++) {
        result.push(temp[i])
      }
      return result.reverse()
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
    updateviewableArrayIndex: function(value) {
      this.viewableArrayIndex = parseInt(value)
    },
    settingRecognition () {
      var recognition = new this.speechRecognition()
      recognition.lang = 'ja-JP'
      recognition.interimResults = true
      recognition.continuous = true

      recognition.addEventListener('start', () => {
        this.isFirstStarted = true
        console.log(this.isFirstStarted)
      })

      recognition.addEventListener('result', event => {
        const stackText = Array.from(event.results).map(x => x[0]).map(x => x.transcript)
        this.currentText = stackText.join('。')
        console.log(this.currentText)
      })

      recognition.addEventListener('end', () => {
        console.log("end " + this.isFirstStarted)
        if (this.isFirstStarted) {
          recognition.start()
          this.isFirstStarted = false
        }
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
