<template>
  <div id="app" 
    v-scroll-lock="true"
    v-on:click="onClick"
    v-bind:style="{ 
      width: windowWidth + 'px',
      height: windowHeight + 'px',
      backgroundColor: colors.hex
    }">
    <ul class="subtitles"
      v-bind:class="{ blurContent: overlay }"
      v-bind:style="{
        'font-size': fontSize + 'px',
        'margin-bottom': windowHeight / 2 + 'px'
      }">
      <li v-for="(str, index) in sliceText" :key="index">
        {{ str }}
      </li>
    </ul>
    <overlaySettings ref="overlaySettings" 
    v-bind="{
      lineStrValue: lineStrValue,
      viewableArrayIndex: viewableArrayIndex,
      fontSize: fontSize,
      colors: colors
    }"
    v-on:disableOverlay="disableOverlayFromoverlaySettings"
    v-on:updateLineStrValue="updateLineStrValue"
    v-on:updateviewableArrayIndex="updateviewableArrayIndex"
    v-on:updateFontSize="updateFontSize"
    v-on:updateBackgroundColors="updateBackgroundColors" />
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
    viewableArrayIndex: 5,
    fontSize: 48,
    colors: {
      hex: '#ffffff'
    }
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
      var container = this.$el.querySelector("#container")
      container.scrollTop = this.windowHeight
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
    updateFontSize: function(value) {
      this.fontSize = parseInt(value)
    },
    updateBackgroundColors: function(value) {
      this.colors = value
    },
    settingRecognition () {
      var recognition = new this.speechRecognition()
      recognition.lang = 'ja-JP'
      recognition.interimResults = true
      recognition.continuous = true

      recognition.addEventListener('start', () => {
        this.isFirstStarted = true
      })

      recognition.addEventListener('result', event => {
        const stackText = Array.from(event.results).map(x => x[0]).map(x => x.transcript)
        this.currentText = stackText.join('。')
      })

      recognition.addEventListener('end', () => {
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

.blurContent {
  filter: blur(6px);
}

</style>
