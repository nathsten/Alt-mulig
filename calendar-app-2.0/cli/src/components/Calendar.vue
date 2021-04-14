<template>
    <div>
        <button @click="logout" v-if="isMobile" class="absolute right-3 top-1 text-blue-500 text-lg hover:text-blue-700 transition-all">Log out</button>
        
        <!-- contains everything -->
        <div id="mainCalendar" v-bind:class="!isMobile ? 'mainCalendarWidth' : 'w-5/6 right-9'" class=" select-none flex-col-2 my-10 border-2 border-blue-500 rounded-md overflow-scroll">
            <h1 class="my-5 text-blue-500 text-2xl sm:sticky"> 
                <i class="fas fa-angle-left mx-3 text-2xl cursor-pointer hover:opacity-80 transition-all" @click="subFromMonth"></i>

                {{ months[month] }} {{ selectedDate.d}}. {{ year }}

                <i class="fas fa-angle-right mx-3 text-2xl cursor-pointer hover:opacity-80 transition-all" @click="addToMonth"></i>

                <button @click="logout" v-if="!isMobile" class="absolute right-3 top-3 text-base hover:text-blue-700 transition-all">Log out</button>
            </h1>

            <div>
                <!-- Calendar days Mon-sun -->
                <div class="grid md:grid-cols-7 my-4 relative md:-top-6" v-if="!isMobile" id="dayList">   
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
                    v-bind:allEvents=allEvents 
                    v-bind:isMobile=isMobile 
                    v-bind:changeEventState=changeEventState />
            </div>
        </div>

        <div v-if="!isMobile">
        <!-- Add event component, contains input for new event, uses selectedDate to send correct date to api-->
        <EventOverview v-bind:selectedDate=selectedDate
        v-bind:selectedDayEvents=selectedDayEvents
        v-bind:changeEventState=changeEventState 
        v-bind:addEvent=addEvent
        v-bind:deleteEvent=deleteEvent />
        </div>

        <div v-if="isMobile">
            <AddEvent v-bind:addEvent=addEvent />
        </div>
    </div>
</template>

<script>
import Month from './Month';
import EventOverview from './EventOverview';
import AddEvent from './AddEvent';

export default {
    name: "Calendar",
    data: function(){
        return{
            days: "Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday".split(",").map((e, i) => [{id: i, day: e}]),
            months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
            date: new Date().getDate(),
            month: new Date().getMonth(),
            todayMonth: new Date().getMonth(),
            year: new Date().getFullYear(),
            thisMonth: undefined,
            selectedDate: undefined,
            selectedDayEvents: [],
            allEvents: [],
            isMobile: screen.width <= 770
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
            this.changeSelectedDate({d: this.selectedDate.d, m: this.month, y: this.year});
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
            this.changeSelectedDate({d: this.selectedDate.d, m: this.month, y: this.year});
        },
        changeSelectedDate: function(newDate){
            if(Number.isInteger(newDate.d)){
                this.selectedDate = {d: newDate.d, m: this.months[newDate.m], y: newDate.y};
                this.selectedDayEvents = this.allEvents.filter(e => e.date === `${this.selectedDate.d}.${this.selectedDate.m}.${this.selectedDate.y}`);
            }
        },
        deleteEvent: async function(key){
            const init = {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({key}),
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const deleteEvent = await fetch(`deleteEvent`, init);
            this.allEvents = await deleteEvent.json();
            this.selectedDayEvents = await this.allEvents.filter(e => e.date === `${this.selectedDate.d}.${this.selectedDate.m}.${this.selectedDate.y}`);
        },
        changeEventState: async function(key, state){
            // fetch new event state
            try{
                const init = {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({key, state: !state}),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                const changeEvent = await fetch(`changeEventState`, init);
                this.allEvents = await changeEvent.json();
                this.selectedDayEvents = await this.allEvents.filter(e => e.date === `${this.selectedDate.d}.${this.selectedDate.m}.${this.selectedDate.y}`);
            } catch(e) {
                console.log(e);
            }

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
        },
        logout: function() {
            fetch('/logout')
            .then(res => res.json())
            .then(res => res.status === "success" ? location.reload() : alert("something went wrong"))
            .catch(e => alert("something went wrong") && console.log(e));
        }
    },
    components: {
        Month,
        EventOverview,
        AddEvent
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
        /* width: 65%; */
        height: 89%;
    }
    .mainCalendarWidth{ width: 65%; }

    .calendarDayName{
        margin: 5px 4% 5px 4%;
    }
    #dayList{
        width: 100%;
    }
</style>