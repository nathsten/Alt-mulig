<template>
    <div id="md" class="grid md:grid-cols-7 md:w-full md:-top-12 relative sm:grid-cols-1 sm:w-5/6 sm:mx-auto overflow-hidden">

        <div @click="changeSelectedDate({d: day.day, m: day.m, y: day.y})" v-for="day in thisMonth" v-bind:key="day.day" 
        v-bind:class="[(day.active) ? 'w-30 h-26 mx-0.5 my-0.5 border border-blue-900 cursor-pointer hover:bg-blue-200 transition-colors select-none text-left px-2 py-2' : 'select-none', 
        (day.day === selectedDate.d && day.m === months.indexOf(selectedDate.m) && day.y === selectedDate.y) ? 'bg-blue-100' : '' ]">

            <span class="text-blue-700" v-if="day.active"> <span v-if="isMobile"> {{ weekDays[day.day%7] }} {{ selectedDate.m }} </span> {{day.day}}.</span>
            <div class="w-5/6 h-4/5 overflow-scroll">
                <!-- Inner eventnames -->
                <span v-for="event in allEvents" v-bind:key="event.date+event.text">
                    <p v-bind:class="!event.completed ? 'bg-blue-500' : 'bg-blue-300'" 
                        class="rounded-md px-0.5 text-white my-1 py-2 overflow-scroll" 
                        v-if="+(event.date.split('.')[0]) === day.day 
                        && event.date.split('.')[1] === selectedDate.m
                        && +event.date.split('.')[2] === selectedDate.y">
                        <p>{{ event.text }}</p> <p>kl: {{ event.time }}</p>
                        <span v-if="isMobile"><i v-bind:class="!event.completed ? 'far fa-check-circle' : 'fas fa-check-circle'"
                        @click="changeEventState(event.key, event.completed)" class="cursor-pointer hover:opacity-80 transition-opacity text-xl relative left-56 -top-10"></i></span> 
                    </p>
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
            months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
            weekDays: "Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday".split(",")
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
        allEvents: Array,
        isMobile: Boolean,
        changeEventState: Function
    }
}
</script>