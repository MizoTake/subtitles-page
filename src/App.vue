<template>
  <div id="app" 
    v-on:click="onClick"
    v-bind:style="{ 
      width: windowWidth + 'px',
      height: windowHeight + 'px',
      'background-color': dataProperty.colors.hex
    }">
    <ul class="subtitles"
      v-bind:class="{ blurContent: overlay }"
      v-bind:style="{
        'font-size': dataProperty.fontSize + 'px',
        'height': windowHeight + 'px',
        'color': dataProperty.fontColors.hex
      }">
      <li v-for="(str, index) in sliceText" :key="index"
        v-bind:style="{
          'padding-top': dataProperty.listMargn + 'px',
          'bottom': index * dataProperty.fontSize * 2 + 'px'
        }">
        {{ str }}
      </li>
    </ul>
    <overlaySettings ref="overlaySettings" 
    v-bind="{
      dataProperty: dataProperty
    }"
    v-on:disableOverlay="disableOverlayFromoverlaySettings"
    v-on:updateDataProperty="updateDataProperty"/>
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
    dataPropertyInit: {
      lineStrValue: 10,
      viewableArrayIndex: 3,
      fontSize: 48,
      colors: {
        hex: '#ffffff'
      },
      fontColors: {
        hex: '#000000'
      },
      listMargn: 20
    },
    dataProperty: null
  }),
  computed: {
   sliceText() {
      const result = []
      const temp = []
      for (let i = 0; i < this.currentText.length; i += this.dataProperty.lineStrValue) {
        temp.push(this.currentText.slice(i, i + this.dataProperty.lineStrValue))
      }
      temp.reverse()
      for (let i = 0; i<this.dataProperty.viewableArrayIndex; i++) {
        result.push(temp[i])
      }
      return result
    }
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
      var container = this.$el.querySelector("#container")
      if (container !== null) {
        container.scrollTop = this.windowHeight
      }
    },
    onClick() {
      if (this.overlaySettingsDisable) {
        this.overlaySettingsDisable = false
        return
      }
      this.overlay = true
      this.$refs.overlaySettings.enableOverlay()
    },
    disableOverlayFromoverlaySettings() {
      this.overlay = false
      this.overlaySettingsDisable = true
    },
    updateDataProperty(value) {
      this.dataProperty = value
      const parsed = JSON.stringify(this.dataProperty);
      localStorage.setItem('dataProperty', parsed);
    },
    settingStartRecognition() {
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
    },
  },
  created() {
    if (localStorage.getItem('dataProperty')) {
      try {
        this.dataProperty = JSON.parse(localStorage.getItem('dataProperty'));
      // eslint-disable-next-line no-empty
      } catch(e) { }
    } else {
      this.dataProperty = this.dataPropertyInit
    }
  },
  mounted () {
    if (!this.speechRecognition) {
      alert('ChromeなどのSpeechRecognitionに対応したブラウザをお使いください。')
      return
    }
    this.settingStartRecognition()
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

.subtitles li {
  position: absolute;
  width: 100%;
}

.blurContent {
  /* filter: blur(6px); */
}

</style>
