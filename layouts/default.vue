<template>
  <v-app app>
    <v-navigation-drawer app v-model="drawer" mobile-breakpoint="650">
      <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-toolbar
      color="blue"
      dark
    >

      <v-toolbar-title>Chat Nuxt</v-toolbar-title>

      <v-spacer></v-spacer>

    </v-toolbar>

    <v-list subheader>
      <v-subheader>user list</v-subheader>

      <v-list-item
        v-for="u in users"
        :key="u.id"
      >
        <v-list-item-content>
          <v-list-item-title>{{u.name}}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon :color="u.id === 2 ? 'blue' : 'grey'">
            mdi-message-outline
          </v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>


  </v-card>
    </v-navigation-drawer>
      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-btn @click="exit" class="ma-2" color=" blue">
          <v-icon left>mdi-arrow-left</v-icon>back
        </v-btn>
        <v-toolbar-title>Room chat {{user.room}}</v-toolbar-title>
      </v-app-bar>
    <v-content>
      <div style="height=100%">
        <nuxt/>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    drawer: true,
    users: [
      {id: 1, name: 'User 1'}, {id: 2, name: 'User 2'},
    ]
  }),
  computed: mapState(["user"]),
  methods: {
    ...mapMutations(["clearData"]),
    exit() {
      this.$router.push('/?message=leftChat');
      this.clearData();
    }
  }
};
</script>
