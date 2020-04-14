<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex>
     
      <v-btn @click="message">
        new message
      </v-btn>

    </v-flex>
  </v-layout>
</template>

<script>

export default {
  sockets: {
    connect: function () {
        console.log('socket connected')
    }
  },
  methods: {
    message() {
      this.$socket.emit("createMessage", {
        text: "FROM CLIENT"
      })
    }
  }
}
</script>
