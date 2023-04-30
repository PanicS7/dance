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
          <img :src="event.image" class="w-sm max-w-sm" />
        </div>
        <div>
          <h2 class="text-2xl font-bold flex items-center">
            {{ event.title }}
            <span class="">
              <svg
                v-if="isInBookmark(event.id)"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="red"
                height="20"
                width="20"
                @click="updateUserBookmark(event.id)"
              >
                <path
                  d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="{1.5}"
                stroke="red"
                height="20"
                width="20"
                @click="updateUserBookmark(event.id)"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </span>
          </h2>
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
    const userBookmarks = []
    const db = firebase.firestore()
    const user = firebase.auth().currentUser

    // get events data
    const querySnapshot = await db.collection('events').get()

    if (querySnapshot.size > 0) {
      for (const doc of querySnapshot.docs) {
        events.push({
          id: doc.id,
          ...doc.data(),
        })
      }
    }

    // get user bookmark data
    const bookmarkSnapshot = await db.collection('users').get()

    if (bookmarkSnapshot.size > 0) {
      for (const doc of bookmarkSnapshot.docs) {
        if (doc.id === user.uid) {
          userBookmarks.push({
            ...doc.data(),
          })
        }
      }
    }

    return { events, user, userBookmarks }
  },
  data() {
    return {
      error: '',
    }
  },
  methods: {
    isInBookmark(eventId) {
      for (const doc of this.userBookmarks) {
        for (const bookmark of doc.bookmark) {
          if (bookmark === eventId) {
            return true
          }
        }
      }

      return false
    },
    updateUserBookmark(eventId) {
      const db = firebase.firestore()
      const user = firebase.auth().currentUser

      const userBookmarkRef = db.collection('users').doc(user.uid)

      if (this.isInBookmark(eventId)) {
        userBookmarkRef
          .update({
            bookmark: firebase.firestore.FieldValue.arrayRemove(eventId),
          })
          .then(async () => {
            // get user bookmark data
            const bookmarkSnapshot = await db.collection('users').get()

            if (bookmarkSnapshot.size > 0) {
              for (const doc of bookmarkSnapshot.docs) {
                if (doc.id === user.uid) {
                  this.userBookmarks.push({
                    ...doc.data(),
                  })
                }
              }
            }

            this.isInBookmark(eventId)
            this.$nuxt.refresh()
          })
          .catch((error) => {
            this.error = error.message
          })
      } else {
        userBookmarkRef
          .update({
            bookmark: firebase.firestore.FieldValue.arrayUnion(eventId),
          })
          .then(async () => {
            // get user bookmark data
            const bookmarkSnapshot = await db.collection('users').get()

            if (bookmarkSnapshot.size > 0) {
              for (const doc of bookmarkSnapshot.docs) {
                if (doc.id === user.uid) {
                  this.userBookmarks.push({
                    ...doc.data(),
                  })
                }
              }
            }

            this.isInBookmark(eventId)
          })
          .catch((error) => {
            this.error = error.message
          })
      }
    },
  },
}
</script>
