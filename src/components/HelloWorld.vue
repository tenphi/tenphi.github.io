<template>
  <nu-h1>{{ msg }}</nu-h1>
  <nu-btn @tap="count++">count is: {{ count }}</nu-btn>
  <nu-block>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</nu-block>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    }
  }
}
</script>
