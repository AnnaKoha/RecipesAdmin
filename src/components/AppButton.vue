<script setup>
const props = defineProps({
    text: {
        type: String,
        default: '',
    },
    circle: {
        type: Boolean,
        default: false,
    },
    icon: {
       type: String,
        default: '',  
    },
});
</script>

<template>
    <el-button v-if="!circle" type="primary" class="btn">
        {{ text }}
    </el-button>
    <el-button v-else :icon="icon"  type="primary" circle >

    </el-button>
</template>

<style lang="sass" scoped>
@import '@/assets/styles/index'
.btn
    padding: 20px 24px
    font-size: 17px
    background-color: $violet
    border-color: $softViolet
    border-radius: 4px

.circle
    font-size: 16px
    background-color: $violet
</style>