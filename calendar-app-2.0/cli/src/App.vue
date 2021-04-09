<template>
    <div>
        <Calendar />
    </div>
</template>

<script>
import Calendar from './components/Calendar';

export default {
  name: 'App',
  components: {
      Calendar
  },
  data: function(){
      return{
    }
  },
  props: {

  }
}
</script>

<style>
@import url('components/style.css');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
