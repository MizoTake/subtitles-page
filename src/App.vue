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
          'bottom': index * cellHeight + 'px'
        }">
        <p v-html="str" />
      </li>
    </ul>
    <overlaySettings ref="overlaySettings" 
    v-bind="{
      dataProperty: dataProperty,
      overlayHeight: overlayHeight
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
      listMargn: 20,
      changeColorTextLength: 3,
      changeColorText: [],
      version: 0
    },
    dataProperty: null
  }),
  computed: {
    sliceText() {
      const result = []
      const temp = []
      const lineStrValue = parseInt(this.dataProperty.lineStrValue)
      for (let i = 0; i < this.currentText.length; i += lineStrValue) {
        temp.push(this.currentText.slice(i, i + lineStrValue))
      }
      temp.reverse()
      for (let i = 0; i<this.dataProperty.viewableArrayIndex; i++) {
        let tempElement = `${temp[i]}`
        if (this.dataProperty.changeColorText) {
          for (let j = 0; j<this.dataProperty.changeColorText.length; j++) {
            let changeTarget = this.dataProperty.changeColorText[j]
            if (changeTarget !== undefined && changeTarget.text !== '') {
              tempElement = tempElement.split(changeTarget.text).join(`<font color="${changeTarget.color.hex}">${changeTarget.text}</font>`)
            }
          }
        }
        if (tempElement === "undefined") {
          tempElement = ''
        }
        result.push(tempElement)
      }
      return result
    },
    cellHeight() {
      return (parseFloat(this.dataProperty.fontSize) * 2) + parseFloat(this.dataProperty.listMargn)
    },
    overlayHeight() {
      return window.innerHeight - this.cellHeight
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
    // localStorage.clear()
    let isNeedInitialize = true
    if (localStorage.getItem('dataProperty')) {
      try {
        this.dataProperty = JSON.parse(localStorage.getItem('dataProperty'))
        if (this.dataProperty.version != this.dataPropertyInit.version) {
          // let newConstruction = this.dataPropertyInit
          // for (let [key, value] of Object.entries(newConstruction)) {
          //   for (let [propKey, propValue] of Object.entries(this.dataProperty)) {
          //     if (key == propKey) {
          //       if (propValue !== undefined) {
          //         newConstruction
          //       }
          //     }
          //   }
          // }
          // this.dataProperty = newConstruction
          // console.log(this.dataProperty)
        } else {
          isNeedInitialize = false
        }
      } catch(e) {
        localStorage.clear()
      }
    } 
    if (isNeedInitialize) {
      this.dataProperty = this.dataPropertyInit
      let arrayInit = []
      for(let i = 0; i<this.dataPropertyInit.changeColorTextLength; i++) {
        arrayInit[i] = {
          text: '',
          color: {
            hex: '#000000'
          }
        }
      }
      this.dataProperty.changeColorText = arrayInit
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
</style>
