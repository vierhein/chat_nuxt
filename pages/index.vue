<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex>
     
      <v-card min-width="400">
        <v-card-title>chat nuxt</v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Room"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="primary"
              @click="submit"
            >
              Enter
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>

    </v-flex>
  </v-layout>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
  layout: 'empty',
  sockets: {
    connect: function () {
        console.log('socket connected')
    }
  },
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 16) || 'Name must be less than 10 characters'
    ],
    room: '',
    roomRules: [
      v => !!v || 'Room is required'
    ]     
  }),

  methods: {
    ...mapMutations(["setUser"]),
    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room
        };

        this.$socket.emit('userJoined', user, data => {
          if (typeof data === 'string') {
            console.error(data)
          } else {
            user.id = data.userId;
            this.setUser(user);
            this.$router.push('/chat');
          }
        });
      }
    }
  }
}
</script>
