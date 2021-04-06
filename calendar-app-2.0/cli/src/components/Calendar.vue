<template>
    <div>
        <h1 @click="sayHello">{{ord}}</h1>
        <h3>{{apiData}}</h3>
    </div>
</template>

<script>
export default {
    name: "Calendar",
    data: function(){
        return{
            apiData: ""
        }
    },
    methods: {
        sayHello: function(){
            fetch('/test')
            .then(res => res.json())
            .then(data => this.apiData = data.status)
            .catch(e => this.apiData = e);
        }
    },
    props: {
        ord: String
    },
    components: {

    }
}
</script>