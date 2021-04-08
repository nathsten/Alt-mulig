<template>
    <!-- contains everything -->
    <div id="mainCalendar" class="flex-col-2 my-20 border-2 border-blue-500 rounded-md">
        <h1 class="my-5 text-blue-500 text-2xl"> {{ date }}.{{ months[month] }}.{{ year }}</h1>

        <div  class="flex-grow h-16 container ">
            <!-- Calendar days Mon-sun -->
            <div class="grid-cols-7 my-5" id="dayList">   
                <span class="calendarDayName my-10 text-blue-500" v-for="day in days" v-bind:key="day[0].id">{{ day[0].day }}</span>
            </div>

            <!-- calendar dates -->
            <Month v-bind:date=date 
                v-bind:month=month 
                v-bind:year=year 
                v-bind:addToMonth=addToMonth
                v-bind:subFromMonth="subFromMonth"
                v-bind:strMonths="months"
                v-bind:thisMonth="thisMonth" />
        </div>
    </div>
</template>

<script>
import Month from './Month';

export default {
    name: "Calendar",
    data: function(){
        return{
            days: "Monday,Tuesday,Wensday,Thursday,Friday,Saturday,Sunday".split(",").map((e, i) => [{id: i, day: e}]),
            months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
            date: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            thisMonth: undefined
        }
    },
    methods: {
        addToMonth: function(){
            if(this.month+1 > 11){
                this.month = 0;
                this.year++;
                this.thisMonth = genMonth(this.month, this.year);

            }
            else {
                this.month++;
                this.thisMonth = genMonth(this.month, this.year);

            }
        },
        subFromMonth: function(){
            if(this.month-1 < 1){
                this.month = 11;
                this.year--;
                this.thisMonth = genMonth(this.month, this.year);

            }
            else {
                this.month--;
                this.thisMonth = genMonth(this.month, this.year);

            }
        }
    },
    created: function(){
        this.thisMonth = genMonth(this.month, this.year);
    },
    props: {
    },
    components: {
        Month
    }
}

const leap = y => {
    if (y % 400 === 0) return 1;
    if (y % 100 === 0) return 0;
    if (y % 4 === 0) return 1;
    return 0;
}


const numberDays = (y,m) => {
    if (m === 1) return 28 + leap(y);
    return 30 + (m % 7 + 1) % 2;
}

/**
 * @returns {{active: boolean, day: Number[]}}
 */
const genMonth = (m, y) => {
    const startDate = new Date(y, m, 0).getDay();
    const daysInMonth = numberDays(y, m);
    const days = [];

    for(let i = 0; i < 42; i++){
        if(i >= startDate && i <= daysInMonth){
            const day = {
                active: true,
                day: i-startDate+1
            }
            days.push(day);
        }
        else{
            const day = {active: false};
            days.push(day);
        }
    }
    return days;
}
</script>

<style>
    #mainCalendar{
        position: absolute;
        width: 65%;
        height: 90%;
    }

    .calendarDayName{
        margin: 5px 4% 5px 4%;
    }
    #dayList{
        width: 100%;
    }
</style>