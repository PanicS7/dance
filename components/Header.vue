<template>
  <header class="flex flex-row justify-between py-5 items-center">
    <nuxt-link to="/" class="leading-tight font-bold text-blue-600 text-2xl"
      >Dance</nuxt-link
    >
    <div class="flex flex-sm items-center">
      <AccountDropdown v-if="$store.state.user" class="ml-8" />
      <nuxt-link
        v-else
        to="/login"
        class="opacity-60 hover:opacity-100 text-sm text-white bg-blue-600 hover:bg-blue-800 px-5 py-2 ml-4 rounded-full"
        >Log In</nuxt-link
      >
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import AccountDropdown from '~/components/AccountDropdown.vue'

export default {
  components: {
    AccountDropdown,
  },
  computed: {
    ...mapGetters({
      user: 'user',
    }),
  },
  methods: {
    signOut() {
      this.$store
        .dispatch('signOut')
        .catch((err) => {
          alert(err.message)
        })
        .then(() => this.$router.push('/'))
    },
  },
}
</script>
