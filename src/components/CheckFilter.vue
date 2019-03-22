<template>
    <div v-bind:class="{ 'check-filter': true, active: checked }" v-on:click="checkFilter">
        <span class="checkbox"></span>
        <span class="check-filter-title">{{ title }}</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                checked: false
            }
        },
        props: [ 'title', 'category' ],
        methods: {
            checkFilter() {
                this.checked = !this.checked;
                // Emit it to global bus so that it can be directly used in root instance or anywhere
                this.$bus.$emit('check-filter', this.category, this.title, this.checked);
            }
        }
    }
</script>

<style scoped>

</style>