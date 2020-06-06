<template>
    <div>
        <v-expansion-panel-header>
            <v-text-field
                label="対象のテキスト"
                single-line
                solo
                :value="targetText"
                @change="changedText"
            ></v-text-field>
          </v-expansion-panel-header>
        <v-expansion-panel-content id="content">
            <compact-picker 
            @input="changedValue"
            :value="pickerColorValue"
            ></compact-picker>
        </v-expansion-panel-content>
    </div>
</template>

<script>
import { Compact } from 'vue-color'

export default {
    props: [ 'index', 'text', 'pickerValue'],
    created() {
        this.targetText = this.text
        this.pickerColorValue = this.pickerValue
    },
    methods: {
        changedText(text) {
            this.targetText = text
            const result = {
                index: this.index,
                text: text === undefined ? "" : text,
                color: this.pickerColorValue
            }
            this.$emit("changedValue", result)
        },
        changedValue(value) {
            const result = {
                index: this.index,
                text: this.targetText === undefined ? "" : this.targetText,
                color: value
            }
            this.$emit("changedValue", result)
        }
    },
    components: {
        'compact-picker': Compact,
    }
}
</script>

<style>
#content {
    height:85px;
}
</style>
