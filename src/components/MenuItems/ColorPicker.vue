<template>
    <v-col cols="12" sm="6" md="3">
        <p> {{ pickerText }}</p>
        <chrome-picker v-model="pickerColorValue" @input="changedValue"></chrome-picker>
    </v-col>
</template>

<script>
import {Chrome} from 'vue-color'

export default {
    props: ['pickerText', 'pickerValue'],
    created: function () {
        this.pickerColorValue = this.pickerValue
    },
    methods: {
        changedValue: function(value) {
            this.$emit("changedValue", value)
        }
    },
    components: {
        'chrome-picker': Chrome,
    }
}
</script>