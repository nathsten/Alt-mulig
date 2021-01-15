const select = value => document.querySelector(value);
const today = new Date();

const allDays = "Monday Tuesday Wednesday Thursday Friday Saturday Sunday".split(" ");

const header = new Vue({

});

const calendar = new Vue({
  el: "#calendarRoot",
  data: {
    days: [],
    classObject: {
      isActive: true,
      isMobile: false,
      isDesktop: false
    },
    eventHeader: {text: 'Events on "date"'}
  },
  methods: {
    test: txt => {
      alert(txt);
    }
  }
})

allDays.map(dag => calendar.days.push({text: dag}));

window.onload = () => {
  if (screen.width < 700){
    calendar.classObject.isMobile = true;
  }
  else{
    calendar.classObject.isDesktop = true;
  }
}