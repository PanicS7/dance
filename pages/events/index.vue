<template>
  <div>
    <ActionNav />
    <section>
      <header>
        <h2>Events</h2>
        <nuxt-link
          :to="'/events/add-event'"
          class="hover:underline"
        >
        Add event
        </nuxt-link>
      </header>
      <div v-for="event in events" :key="event.id">
        <h2>{{ event.title }}</h2>
        <p>{{ 'Organizer: ' + event.organizer }}</p>
        <p>{{ event.country + ' | ' + event.city }}</p>
        <p>{{ new Date(event.date.seconds * 1000).toDateString('en-US') }}</p>
        <br/>
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
