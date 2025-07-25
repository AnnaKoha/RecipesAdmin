<template>
    <transition appear>
        <div class="root">
            <div class="heading">Loading...</div>
        </div>
    </transition>
</template>

<style lang="sass" scoped>
@import '@/assets/styles/index'

.root
    z-index: 2
    display: flex
    justify-content: center
    align-items: center
    position: fixed
    top: 0
    bottom: 0
    right: 0
    left: 0
    background-color: rgba($white, 0.8)
.heading
    font-size: 28px
    font-weight: 700
</style>