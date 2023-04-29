<template>
  <div class="w-full lg:grid lg:grid-cols-4 lg:gap-10">
    <ActionNav
      class="lg:col-span-1 lg:flex lg:flex-col lg:items-end lg:justify-start lg:pt-10 lg:border-r-2 lg:pr-5"
    />
    <section class="lg:col-span-3">
      <header class="flex justify-between mb-8">
        <h2 class="text-2xl font-bold">Events</h2>
        <nuxt-link
          :to="'/events/add-event'"
          class="text-md text-white bg-blue-600 hover:bg-blue-800 px-5 py-2 rounded-full"
        >
          Add event
        </nuxt-link>
      </header>
      <hr />
      <div v-for="event in events" :key="event.id" class="mt-8 flex gap-3">
        <div>
          <img :src="event.image" class="w-xs max-w-xs"/>
        </div>
        <div>
          <h2 class="text-2xl font-bold">{{ event.title }}</h2>
          <p>{{ 'Organizer: ' + event.organizer }}</p>
          <p>{{ event.country + ' | ' + event.city }}</p>
          <p>{{ new Date(event.date.seconds * 1000).toDateString('en-US') }}</p>  
        </div>
        <br />
      </div>
    </section>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import ActionNav from '../../components/ActionNav.vue'

export default {
  components: { ActionNav },
  async asyncData() {
    const events = []
    const db = firebase.firestore()

    const querySnapshot = await db.collection('events').get()

    if (querySnapshot.size > 0) {
      for (const doc of querySnapshot.docs) {
        events.push({
          id: doc.id,
          ...doc.data(),
        })
      }
    }

    return { events }
  },
  data() {
    return {
      error: '',
    }
  },
}
</script>
