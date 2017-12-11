<template>
  <div></div>
</template>
<script>
export default {
  mounted() {
    this.$nextTick(function() {
      // var script = document.createElement("script");
      // script.type = "text/javascript";
      // script.src = "http://api.map.baidu.com/api?v=2.0&ak=您的密钥&callback=init";
      // document.body.appendChild(script);
    });
  },
  components: {
    remote: {
      render(createElement) {
        return createElement("script", {
          attrs: { type: "text/javascript", src: this.src }
        });
      },
      props: {
        src: { type: String, required: true }
      }
    }
  }
};
</script>

