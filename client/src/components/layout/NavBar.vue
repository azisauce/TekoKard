<template>
    <div id="main-nav-container">
        <div class="nav-box"></div>
    </div>
</template>

<script>

export default {
  name: 'NavBar',
  components: {
}
}
</script>

<style scoped>
#main-nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 8px;
    background-color: transparent;
    color: #fff;
    height: 100vh;
    width: 18%;
    min-width: 270px;
    .nav-box {
        background-color: #FFFFFF;
        height: 100%;
        width: 100%;
        border-radius: 15px;
    }
    @media (max-width: 920px) {
        width: 75px;
        min-width: 75px;
    }
}
</style>