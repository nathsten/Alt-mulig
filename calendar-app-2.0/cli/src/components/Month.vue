<template>
    <div class="grid grid-cols-7 overflow-hidden">
        <div @click="changeSelectedDate({d: day.day, m: day.m, y: day.y})" v-for="day in thisMonth" v-bind:key="day.day" 
        v-bind:class="[(day.active) ? 'w-30 h-26 mx-1 my-1 border border-blue-900 cursor-pointer hover:bg-blue-200 transition-colors select-none text-left px-2 py-2' : 'select-none', 
        (day.day === selectedDate.d && day.m === months.indexOf(selectedDate.m) && day.y === selectedDate.y) ? 'bg-blue-100' : '' ]">
            <span class="text-blue-700" v-if="day.active">{{day.day}}</span>
        </div>

    </div>
</template>

<script>
export default {
    name: "Month",
    data: function(){
        return{
            today: undefined,
            months: "January,February,March,April,May,June,July,August,September,October,November,December".split(",")
        }
    },
    created: function(){
        this.today = {d: new Date().getDate(), m: new Date().getMonth(), y: new Date().getFullYear()};
    },
    methods: {
    },
    props: {
        date: Number,
        month: Number,
        year: Number,
        thisMonth: Array,
        addToMonth: Function,
        subFromMonth: Function,
        strMonths: Array,
        selectedDate: Object,
        changeSelectedDate: Function
    }
}


</script>