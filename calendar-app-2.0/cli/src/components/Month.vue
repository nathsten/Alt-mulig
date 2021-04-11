<template>
    <div class="grid grid-cols-7 overflow-hidden">

        <div @click="changeSelectedDate({d: day.day, m: day.m, y: day.y})" v-for="day in thisMonth" v-bind:key="day.day" 
        v-bind:class="[(day.active) ? 'w-30 h-26 mx-1 my-1 border border-blue-900 cursor-pointer hover:bg-blue-200 transition-colors select-none text-left px-2 py-2' : 'select-none', 
        (day.day === selectedDate.d && day.m === months.indexOf(selectedDate.m) && day.y === selectedDate.y) ? 'bg-blue-100' : '' ]">

            <span class="text-blue-700" v-if="day.active">{{day.day}}</span>
            <div class="w-5/6 h-4/5 overflow-scroll">
                <!-- Inner eventnames -->
                <span v-for="event in allEvents" v-bind:key="event.date+event.text">
                    <p v-bind:class="!event.completed ? 'bg-blue-500' : 'bg-blue-300'" 
                    class="rounded-md px-0.5 text-white my-1" 
                    v-if="+(event.date.split('.')[0]) === day.day 
                    && event.date.split('.')[1] === selectedDate.m
                    && +event.date.split('.')[2] === selectedDate.y">{{ event.text }}</p>
                </span>
            </div>

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
        changeSelectedDate: Function,
        allEvents: Array
    }
}
</script>