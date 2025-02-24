<template>
    <div id="feed-container">
        <div class="feed-box">
            <h1>Feed</h1>
        </div>
    </div>
</template>

<script>
export default {
  name: 'FeedView',
  setup() {
    return
  }
}
</script>

<style scoped>
#feed-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 12px;
    background-color: transparent;
    color: #fff;
    height: 100vh;
    width: -webkit-fill-available;
    .feed-box {
        background-color: #FFFFFF;
        height: 100%;
        width: 100%;
        border-radius: 15px;
        h1 {
            font-size: 2rem;
            font-weight: bold;
            color: black;
            margin-bottom: 1.5rem;
        }
    }
}
</style>