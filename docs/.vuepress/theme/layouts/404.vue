<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>404</h1>
      <blockquote>{{ getMsg() }}</blockquote>

      <RouterLink to="/">
        Take me home.
      </RouterLink>

    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getMsg () {
      return '我不是 我没有 你找错人了'
    }
  }
}
</script>
