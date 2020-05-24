<template>
  <div class="viewText">
    <v-textarea cols="12" md="6"
      filled
      name=""
      v-model="currentText"
      v-bind:readonly="true"
  ></v-textarea>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    speechRecognition: window.SpeechRecognition || window.webkitSpeechRecognition,
    currentText: '',
    stackText: []
  }),
  methods: {
    settingRecognition () {
      var recognition = new this.speechRecognition()
      recognition.lang = 'ja-JP'
      recognition.interimResults = true
      recognition.continuous = true

      recognition.addEventListener('result', event => {
        this.stackText = Array.from(event.results).map(x => x[0]).map(x => x.transcript)
        this.currentText = this.stackText.join('。')
      })

      recognition.addEventListener('end', () => {
        recognition.start()
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
  }
}
</script>

<style>

.viewText {
  text-align: center
}

</style>
