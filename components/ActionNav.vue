<template>
  <div class="flex flex-row gap-5 justify-center">
    <nuxt-link
      v-for="(item, index) in uppercaseFirstLetter"
      :key="index"
      :to="'/' + navItems[index]"
      class="hover:underline"
    >
      {{ item }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navItems: ['events', 'account', 'settings'],
    }
  },
  computed: {
    uppercaseFirstLetter() {
      const items = this.navItems.map((item) => {
        const strCopy = item
        const uppercased = strCopy.charAt(0).toUpperCase() + strCopy.slice(1)

        return uppercased
      })

      return items
    },
  },
}
</script>
