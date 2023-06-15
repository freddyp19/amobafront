<template>
  <!-- component -->
  <div
    class="h-screen bg-white flex flex-col space-y-10 justify-center items-center"
  >
    <div class="bg-white w-96 shadow-xl rounded p-5">

      <h1 class="text-3xl font-medium">Login</h1>

      <span class="inline-block align-middle text-red-700" v-show="errorLogin == 1">Usuario o Clave Incorrecto</span>

      <form class="space-y-5 mt-5" @submit.prevent="login">
        <input
          type="text"
          v-model="email"
          class="w-full h-12 border border-gray-800 rounded px-3"
          placeholder="Email"
        />
        <input
          type="password"
          v-model="password"
          class="w-full h-12 border border-gray-800 rounded px-3"
          placeholder="Password"
        />
        <button
          class="text-center w-full bg-blue-900 rounded-md text-white py-3 font-medium"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      ApiUrl: 'http://localhost:8080/api/v1',
      email: "",
      password: "",
      errorLogin:0
    };
  },
  methods: {
    login() {
      try {
        this.errorLogin = 0;
        axios
          .post(`${this.ApiUrl}/loginapi`, {
            'email': this.email,
            'password': this.password,
          })
          .then(({ data }) => {
            //console.log(data.token);
            if(data.success){
              localStorage.setItem("token",data.token);
              this.$router.push("/calendar");
            }else{
              this.errorLogin = 1;
              localStorage.removeItem("token");
            }
          })
          .catch(function (error) {
            this.errorLogin = 1;
            console.log(error.toJSON());
            localStorage.removeItem("token");
          });
      } catch (error) {
        this.errorLogin = 1;
        console.error(error);
      }
    },
  },
};
</script>
