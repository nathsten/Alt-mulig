<template>
    <div>
        <div v-if="signedIn">
            <Calendar v-bind:changeSignedIn=changeSignedInFunk />
        </div>
        
        <div v-if="!signedIn && !signUp">
            <SignIn v-bind:signIn=signInFunk v-bind:changeSignInUp=changeSignInUp />
        </div>

        <div v-if="signUp && !signedIn">
            <SignUp v-bind:signUp=signUpFunk v-bind:changeSignInUp=changeSignInUp />
        </div>
    </div>
</template>

<script>
import Calendar from './components/Calendar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

export default {
  name: 'App',
  components: {
      Calendar,
      SignIn,
      SignUp
  },
  data: function(){
      return{
          signedIn: true,
          signUp: false
    }
  },
  methods: {
      changeSignedInFunk: function(bool){
          this.signedIn = bool;
      },
      changeSignInUp: function(bool) {
            this.signUp = bool;  
      },
      /**
       * @param {String} username
       * @param {String} password
       * @param {String} rpassword
       * @param {MouseEvent} event
       */
      signUpFunk: async function(username, password, rpassword, event){
            event.preventDefault();
            if(password === rpassword){
                const init = {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({username, password}),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                const createUser = await fetch('createUser', init);
                const response = await createUser.json();
                if(response.status === "success"){
                    this.signUp = false;
                }
                else{
                    alert("something went wrong!");
                }
            }
            else{
                alert("Make sure the passwords correspond!");
            }
      },
      /**
       * @param {String} username
       * @param {String} password
       * @param {MouseEvent} event
       */
      signInFunk: async function(username, password, event){
            event.preventDefault();
            const init = {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({username, password}),
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const createUser = await fetch('signIn', init);
            const response = await createUser.json();
            if(response.status === "loggedIn"){
                this.signedIn = true;
            }
            else{
                alert("wrong username or password");
            }
        }
    }
}
</script>

<style>
@import url('components/style.css');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
