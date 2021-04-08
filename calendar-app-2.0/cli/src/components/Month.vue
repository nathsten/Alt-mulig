<template>
    <div class="grid grid-cols-7">
        <div v-for="day in thisMonth" v-bind:key="day.day">
            <span class="text-blue-700" v-if="day.active">{{day.day}}</span>
        </div>

    </div>
</template>

<script>
export default {
    name: "Month",
    data: function(){
        return{
            
        }
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
        strMonths: Array
    }
}


</script>