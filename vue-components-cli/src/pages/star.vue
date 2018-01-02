<template>
  <div class="mainWord" :style='boxBack'>
    <p>here is {{word}}</p>
  </div>  
</template>
<script>
export default {
  name: "star",
  computed: {

  },
  data() {
    return {
      word:'',
      boxBack:null
    };
  },
  created() {
    
  },
  mounted() {
    this.word = this.$route.name

    var sheet = this.$store.state.routerSheet
    for(let i = 0;i < sheet.length; i++){
      if(this.word === sheet[i].name){
        this.boxBack = {
          'background': sheet[i].style
        }
      }
    }
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
  .mainWord{
    text-align: center;
    // margin: 30px auto;
    font-size: 45px;
    padding: 5px 0 100px 0;
    border-radius: 10px;
  }
</style>

