<template>
    <v-col cols="12" sm="6" md="3">
        <v-text-field
        v-bind:label="labelText"
        v-bind:value="labelValue"
        @change="changedValue"
        ></v-text-field>
    </v-col>
</template>

<script>
export default {
    props: ['labelText', 'labelValue'],
    methods: {
        changedValue(value) {
        this.$emit("changedValue", value)
        }
    }
}
</script>