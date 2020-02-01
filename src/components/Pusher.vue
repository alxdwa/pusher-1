<template>
  <main>
    <section class="form-section">
      <h1>Pusher Demo</h1>
      <form @submit.prevent="func_addMessage">
        <label for="message">Message</label>
        <textarea id="message" v-model="data_message" cols="30" rows="3"></textarea>
        <label for="name">Name</label>
        <input id="name" v-model="data_name" type="text">
        <button :disabled="comp_disableSubmit" type="submit">Submit</button>
      </form>
    </section>
    <section class="message-section">
      <h2 v-if="data_messages.length">Messages</h2>
      <ul>
        <li v-for="(item, i) in data_messages" :key="`${i}-${item.name}`">
          <div class="comment">
            <div class="message">
              {{ item.message }}
            </div>
            <div class="name">
              {{ item.name }}
            </div>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import Pusher from 'pusher-js'

export default {
  name: 'Pusher',
  data () {
    return {
      data_message: '',
      data_name: '',
      data_messages: []
    }
  },
  created () {
    this.func_subscribe()
  },
  computed: {
    comp_disableSubmit () {
      return !this.data_message || !this.data_name
    }
  },
  methods: {
    func_addMessage () {
      let message = {
        message: this.data_message, name: this.data_name
      }

      fetch('/api/message', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(message)
      }).then(() => {
        this.data_message = ''
        this.data_name = ''
      })
    },
    func_subscribe () {
      let pusher = new Pusher(process.env.PUSHER_KEY, { cluster: 'ap4' })
      pusher.subscribe('pusher-1')
      pusher.bind('message_added', data => {
        this.data_messages.unshift(data.body)
      })
    }
  }
}
</script>

<style scoped>
main {
  display: grid;
  grid-template-columns: 0.3fr minmax(200px, 1fr) minmax(200px, 1fr) 0.3fr;
  grid-gap: 3em;
  margin: 3em 1em;
}

.form-section {
  grid-column: 2;
}

.message-section {
  grid-column: 3;
}

form {
  display: flex;
  flex-direction: column;
}

form > * + * {
  margin-top: 1em;
}

input, textarea, button, .message, .name {
  padding: 1em;
  border-radius: 6px;
}

input, textarea, button {
  border: none;
  resize: none;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
}

button[type="submit"] {
  background: rgb(7, 22, 80);
  font-weight: bold;
  color: #FFF;
}

button[type="submit"]:hover:not(:disabled) {
  cursor: pointer;
  background: rgb(11, 37, 141);
}

ul {
  list-style: none;
  margin: 1em 0;
  padding: 0;
}

ul > * + * {
  margin-top: 4em;
}

*:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(224, 52, 9, 0.856);
}

label {
  font-weight: 500;
}

.comment {
  position: relative;
  font-weight: 500;
}

.message {
  background: rgb(216, 200, 245);
}

.name {
  position: absolute;
  right: -10px;
  bottom: -40px;
  background: rgb(252, 150, 119);
}
</style>
