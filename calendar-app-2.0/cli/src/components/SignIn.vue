<template>
    <div>
        <h1 class="text-4xl my-5 h-96">Sign in</h1>
        <form @submit="signIn(username, password, $event)" class="border border-blue-500 rounded-md py-1 px-4 my-10 w-96 absolute top-10" style="left: calc(50% - 11rem)">
            <label>Username: <br><input type="text" class="border border-blue-300 rounded-md focus:border-blue-700 outline-none w-48 py-1 my-1" v-model="username"></label><br>
            <label>Password: <br><input type="password" class="border border-blue-300 rounded-md focus:border-blue-700 outline-none w-48 py-1 my-1" v-model="password"></label><br>
            <input type="submit" value="Sign in" class="border border-blue-300 rounded-md hover:bg-blue-200 bg-blue-100 transition-all cursor-pointer w-36 my-2 py-1 px-1 outline-none">
        </form>
        <p class="relative -top-32">Don't have a user yet?
            <a class="text-blue-500 cursor-pointer hover:underline absolute" @click="changeSignInUp(true)">Click here</a>
        </p>
    </div>
</template>

<script>
export default {
    name: "SignIn",
    data: function(){
        return{
            username: "",
            password: ""
        }
    },
    props: {
        signIn: Function,
        changeSignInUp: Function
    }
}
</script>