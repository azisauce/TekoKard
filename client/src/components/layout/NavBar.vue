<template>
    <div id="main-nav">
        <div>NavBar</div>
        <!-- <v-icon icon="$vuetify"></v-icon> -->
        <v-icon icon="mdi-home"></v-icon>

    </div>
</template>

<script>
import { VIcon } from 'vuetify/components'

export default {
  name: 'NavBar',
  components: {
        VIcon
}
}
</script>

<style scoped>
#main-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #333;
    color: #fff;
    height: 100%;
    width: 18%;
    min-width: 270px;
    position: absolute;
    @media (max-width: 800px) {
        width: 60px;
        min-width: 60px;
    }
}
</style>