<template>
    <div>
        
        <!-- contains everything -->
        <div id="mainCalendar" class="w-full select-none flex-col-2 my-10 border-2 border-blue-500 rounded-md overflow-scroll">
            <h1 class="my-5 text-blue-500 text-2xl"> 
                <i class="fas fa-angle-left mx-3 text-2xl cursor-pointer hover:opacity-80 transition-all" @click="subFromMonth"></i>

                {{ months[month] }} {{ date }}. {{ year }}

                <i class="fas fa-angle-right mx-3 text-2xl cursor-pointer hover:opacity-80 transition-all" @click="addToMonth"></i>
            </h1>

            <div>
                <!-- Calendar days Mon-sun -->
                <div class="grid-cols-7 my-5" id="dayList">   
                    <span class="calendarDayName my-10 text-blue-500" v-for="day in days" v-bind:key="day[0].id">{{ day[0].day }}</span>
                </div>

                <!-- calendar dates -->
                <Month v-bind:date=date 
                    v-bind:month=month 
                    v-bind:year=year 
                    v-bind:addToMonth=addToMonth
                    v-bind:subFromMonth=subFromMonth
                    v-bind:strMonths=months
                    v-bind:thisMonth=thisMonth
                    v-bind:selectedDate=selectedDate
                    v-bind:changeSelectedDate=changeSelectedDate
                    v-bind:allEvents=allEvents />
            </div>
        </div>

        <!-- Add event component, contains input for new event, uses selectedDate to send correct date to api-->
        <EventOverview v-bind:selectedDate=selectedDate
        v-bind:selectedDayEvents=selectedDayEvents
        v-bind:changeEventState=changeEventState 
        v-bind:addEvent=addEvent
        v-bind:deleteEvent=deleteEvent />
    </div>
</template>

<script>
import Month from './Month';
import EventOverview from './EventOverview';

export default {
    name: "Calendar",
    data: function(){
        return{
            days: "Monday,Tuesday,Wensday,Thursday,Friday,Saturday,Sunday".split(",").map((e, i) => [{id: i, day: e}]),
            months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
            date: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            thisMonth: undefined,
            selectedDate: undefined,
            selectedDayEvents: [],
            allEvents: []
        }
    },
    props: {
        changeSignedIn: Function
    },
    created: async function(){
        try{
            this.thisMonth = genMonth(this.month, this.year);
            this.selectedDate = {d: this.date, m: this.months[this.month], y: this.year};
            const getEvents = await fetch('/getUserEvents');
            const response = await getEvents.json();
            if(await response.status === "signedIn"){
                this.allEvents = await response.allEvents;
                this.selectedDayEvents = await this.allEvents.filter(e => e.date === `${this.selectedDate.d}.${this.selectedDate.m}.${this.selectedDate.y}`);
            }
            else{
                this.changeSignedIn(false);
            }
        }
        catch(e){ }
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
            this.changeSelectedDate({d: 1, m: this.month, y: this.year});
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
            this.changeSelectedDate({d: 1, m: this.month, y: this.year});
        },
        changeSelectedDate: function(newDate){
            if(Number.isInteger(newDate.d)){
                this.selectedDate = {d: newDate.d, m: this.months[newDate.m], y: newDate.y};
                this.selectedDayEvents = this.allEvents.filter(e => e.date === `${this.selectedDate.d}.${this.selectedDate.m}.${this.selectedDate.y}`);
            }
        },
        deleteEvent: async function(key){
            const deleteEvent = await fetch(`deleteEvent/${key}`);
            this.allEvents = await deleteEvent.json();
            this.selectedDayEvents = await this.allEvents.filter(e => e.date === `${this.selectedDate.d}.${this.selectedDate.m}.${this.selectedDate.y}`);
        },
        changeEventState: async function(key){
            // fetch new event state
            const changeEvent = await fetch(`changeEventState/${key}`);
            this.allEvents = await changeEvent.json();
            this.selectedDayEvents = await this.allEvents.filter(e => e.date === `${this.selectedDate.d}.${this.selectedDate.m}.${this.selectedDate.y}`);

        },
        /**
         * @param {HTMLFrom} form
         * @param {MouseEvent} event
         */
        addEvent: async function(text, time, event){
            // fetch the new event. 
            event.preventDefault();
            console.log(text, time);
            const init = {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    text, time, 
                    date: this.selectedDate.d,
                    month: this.selectedDate.m,
                    year: this.selectedDate.y
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const sendNewEvent = await fetch('/addEvent', init);
            this.allEvents = await sendNewEvent.json();
            this.selectedDayEvents = await this.allEvents.filter(e => e.date === `${this.selectedDate.d}.${this.selectedDate.m}.${this.selectedDate.y}`);
        }
    },
    components: {
        Month,
        EventOverview
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
        if(i >= startDate && i <= daysInMonth+startDate-1){
            const day = {
                active: true,
                day: i-startDate+1,
                m,
                y
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
        height: 89%;
    }

    .calendarDayName{
        margin: 5px 4% 5px 4%;
    }
    #dayList{
        width: 100%;
    }
</style>