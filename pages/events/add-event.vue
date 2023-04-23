<template>
  <div class="w-full lg:grid lg:grid-cols-4 lg:gap-10">
    <ActionNav
      class="lg:col-span-1 lg:flex lg:flex-col lg:items-end lg:justify-start lg:pt-10 lg:border-r-2 lg:pr-5"
    />
    <section class="lg:col-span-3">
      <h2 class="text-2xl font-bold text-center mb-10">Add Event</h2>
      <div class="container flex flex-col gap-3 w-9/12 m-auto">
        <input
          v-for="(field, index) in fields"
          :key="index"
          v-model="field.value"
          :type="field.type"
          :placeholder="field.name != 'date' && 'Enter ' + field.name"
          class="px-2"
        />
        <button type="submit" @click="addEvent" class="inline-block text-md text-white bg-blue-600 hover:bg-blue-800 mt-6 px-5 py-2 rounded-full w-32">Submit</button>
        <p v-if="success" class="text-green-700">Event successfuly added</p>
        <p v-if="error" class="text-rose-700">{{ error }}</p>
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
  data() {
    return {
      fields: [
        {
          name: 'title',
          type: 'text',
          value: '',
        },
        {
          name: 'city',
          type: 'text',
          value: '',
        },
        {
          name: 'country',
          type: 'text',
          value: '',
        },
        {
          name: 'organizer',
          type: 'text',
          value: '',
        },
        {
          name: 'date',
          type: 'date',
          value: undefined,
        },
      ],
      error: false,
      success: false,
    }
  },
  methods: {
    addEvent() {
      const db = firebase.firestore()
      db.collection('events')
        .add({
          title: this.fields[0].value,
          city: this.fields[1].value,
          country: this.fields[2].value,
          organizer: this.fields[3].value,
          date: firebase.firestore.Timestamp.fromDate(
            new Date(this.fields[4].value)
          ),
        })
        .then(() => {
          this.success = true
          // reset input value to blank
          this.fields.map((field) => (field.value = ''))
        })
        .catch((error) => {
          this.error = error.message
        })
    },
  },
}
</script>
