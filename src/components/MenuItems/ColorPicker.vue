<template>
    <v-col cols="12" sm="6" md="3">
        <p> {{ pickerText }}</p>
        <chrome-picker v-model="pickerValue" @input="changedValue"></chrome-picker>
    </v-col>
</template>

<script>
import {Chrome} from 'vue-color'

export default {
    props: ['pickerText', 'pickerValue'],
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