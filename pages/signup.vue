<template>
  <div
    class="p-12 w-full sm:w-4/5 md:w-3/5 mx-auto shadow-2xl rounded-md bg-white"
  >
    <form @submit.prevent="userRegistration">
      <h2 class="mb-2 text-xl text-gray-800 font-bold">
        Register for an account
      </h2>

      <div class="mb-4">
        <label class="block mb-2 text-gray-800 text-sm" for="displayName"
          >Name</label
        >
        <input
          id="displayName"
          v-model="name"
          class="border w-full px-2 py-2 rounded-md"
          type="text"
        />
      </div>

      <div class="mb-4">
        <label class="block mb-2 text-gray-800 text-sm" for="email"
          >Email</label
        >
        <input
          id="email"
          v-model="email"
          class="border w-full px-2 py-2 rounded-md"
          type="text"
        />
      </div>

      <div class="mb-4">
        <label class="block mb-2 text-gray-800 text-sm" for="password"
          >Password</label
        >
        <input
          id="password"
          v-model="password"
          class="border w-full px-2 py-2 rounded-md"
          type="password"
        />
      </div>

      <button
        class="bg-blue-600 text-white py-3 mt-2 w-full rounded-md hover:bg-blue-800"
      >
        Sign Up
      </button>
      <Error v-if="error" :error="error" />
    </form>
    <section class="w-full pt-4 text-sm text-gray-700 text-center">
      Already have an account?
      <nuxt-link to="/login" class="text-blue-600 hover:text-blue-900">
        Log in
      </nuxt-link>
    </section>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import Error from '~/components/Error.vue'

export default {
  components: {
    Error,
  },

  data() {
    return {
      email: '',
      password: '',
      name: '',
      error: null,
    }
  },

  methods: {
    userRegistration() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          res.user
            .updateProfile({
              displayName: this.name,
            })
            .then(() => {
              // create bookmark for user
              const db = firebase.firestore()
              const user = firebase.auth().currentUser
              db.collection('users').doc(user.uid).set({
                bookmark: [],
              })

              // Sending to account page
              this.$router.push('/account')
            })
        })
        .catch((err) => {
          this.error = err.message
        })
    },
  },
}
</script>
