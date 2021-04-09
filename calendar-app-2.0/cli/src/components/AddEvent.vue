<template>
    <div class="select-none right-0 mx-4 absolute w-32% h-92% border-2 rounded border-blue-500 my-10">
        <h1 class="text-center text-2xl text-blue-500 my-2">
            Events on: {{ selectedDate.d }}. {{ selectedDate.m }} {{ selectedDate.y }}
        </h1>

        <!-- List of all events on selected date -->
        <div class="h-auto grid grid-cols-1 w-2/3">
            
        </div>
    </div>
</template>

<script>
export default {
    name: "AddEvent",
    props: {
        selectedDate: Object
    }
}
</script>