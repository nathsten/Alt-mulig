<template>
    <div>
        <h1 class="text-4xl my-5 h-96">Create an account</h1>
        <form @submit="signUp(username, password, rpassword, $event)" class="border border-blue-500 rounded-md py-1 px-4 my-10 w-96 absolute top-10" style="left: calc(50% - 11rem)">
            <label>Username: <br><input type="text" class="border border-blue-300 rounded-md focus:border-blue-700 outline-none w-48 py-1 my-1" v-model="username"></label><br>
            <label>Password: <br><input type="password" class="border border-blue-300 rounded-md focus:border-blue-700 outline-none w-48 py-1 my-1" v-model="password"></label><br>
            <label>Repeat password: <br><input type="password" class="border border-blue-300 rounded-md focus:border-blue-700 outline-none w-48 py-1 my-1" v-model="rpassword"></label><br>
            <input type="submit" value="Create account" class="border border-blue-300 rounded-md hover:bg-blue-200 bg-blue-100 transition-all cursor-pointer w-36 my-2 py-1 px-1 outline-none">
        </form>
        <p class="relative -top-20 -left-1">All ready have a user?
            <a class="text-blue-500 cursor-pointer hover:underline absolute" @click="changeSignInUp(false)">Click here</a>
        </p>
    </div>
</template>

<script>
export default {
    name: "SignUp",
    data: function(){
        return{
            username: "",
            password: "",
            rpassword: ""
        }
    },
    props: {
        signUp: Function,
        changeSignInUp: Function
    }
}
</script>