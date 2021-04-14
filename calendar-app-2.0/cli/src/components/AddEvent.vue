<template>
    <div class="w-full h-full">
        <!-- Input form  -->
        <form @submit="addEvent(formText, formTime, $event) && (this.openInptOn = !this.openInptOn) && (formText = '') && (formTime = null)"
        class="text-center border border-blue-500 w-2/4 h-32 absolute left-1/4 bottom-24 rounded-md bg-white"
        v-bind:class="openInptOn ? 'slideIn' : 'slideOut'">
            <input type="text" name="text" v-model="formText" id="text" placeholder="Event name" 
            class="focus:border-blue-700 border border-blue-300 rounded-md py-1 my-1 outline-none transition-all"><br>
            <input type="time" name="time" v-model="formTime" id="time"
            class="focus:border-blue-700 border border-blue-300 rounded-md py-1 my-1 px-2 outline-none transition-all"><br>
            <input type="submit" value="Add event" class="bg-blue-200 outline-none cursor-pointer transition-all hover:bg-blue-300 py-1 px-2 text-lg rounded-lg ">
        </form>

        <!-- open inputdiv button  -->
        <i class="fas fa-plus-circle text-6xl hover:opacity-80 transition-opacity absolute bottom-4 cursor-pointer" style="left: calc(50% - 2.2rem)"
        v-bind:class="openInptOn ? 'transform rotate-45 transition-transform' : 'transform rotate-0 transition-transform'"
        @click="(this.openInptOn = !this.openInptOn) && (formText = '') && (formTime = '')"></i>
    </div>
</template>

<script>
export default {
    data: function(){
        return{
            openInptOn: false,
            formText: "",
            formTime: ""
        }
    },
    props: {
        addEvent: Function
    }
}
</script>

<style>
    .slideIn{
        animation: SlideIn linear 750ms;
        animation-fill-mode: forwards;
    }

    .slideOut{
        animation: SlideOut linear 750ms;
        animation-fill-mode: forwards;
    }

    @keyframes SlideIn{
        0%{bottom: -2rem; opacity: 0;}
        50%{bottom: 2rem; opacity: 0.6;}
        100%{bottom: 6rem; opacity: 1;}
    }

    @keyframes SlideOut{
        0%{bottom: 6rem; opacity: 1;}
        50%{bottom: 2rem; opacity: 0.4;}
        100%{bottom: -2rem; opacity: 0;}
    }
</style>