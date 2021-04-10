<template>
    <div class="select-none right-0 mx-4 absolute w-32% h-89% border-2 rounded border-blue-500 my-10 overflow-hidden">
        <h1 class="text-center text-2xl text-blue-500 my-4">
            Events on: {{ selectedDate.m }} {{ selectedDate.d }}. {{ selectedDate.y }}
        </h1>

        <!-- List of all events on selected date -->
        <div class="grid grid-cols-1 w-full absolute text-left my-6 px-4 max-h-96 overflow-scroll">
            <div v-for="event in selectedDayEvents" v-bind:key="event.text+event.time" 
            class="border border-blue-500 mx-2 my-4 px-2 py-2">
            <div class="w-5/6" @dblclick="deleteEvent">
                <p>{{ event.text }}</p> 
                <p>kl: {{ event.time }}</p>
                <!-- complete btn -->
                <i v-bind:class="!event.completed ? 'far fa-check-circle' : 'fas fa-check-circle'"
                class=" cursor-pointer hover:opacity-80 transition-opacity text-3xl relative -top-9" style="left: 22rem"
                @click="event.completed = !event.completed" v-on:click="changeEventState"></i>
                <!-- Change to this when finished -->
                <!-- <i class="fas fa-check-circle"></i> -->
            </div>
            </div>
        </div>

        <AddEvent v-bind:addEvent=addEvent />
    </div>
</template>

<script>

import AddEvent from './AddEvent';

export default {
    name: "EventOverview",
    props: {
        selectedDate: Object,
        selectedDayEvents: Array,
        deleteEvent: Function,
        changeEventState: Function,
        addEvent: Function
    },
    components: {
        AddEvent,
    }
}
</script>