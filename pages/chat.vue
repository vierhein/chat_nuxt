<template>
    <div class="c-wrap">
        <div class="c-chat">
            <Message v-for="m in messages" :key="m.text" :name="m.name" :text="m.text" owner/>
        </div>
        <div class="c-form">

        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Message from "@/components/Message"
export default {
    middleware: ["chat"],
    head() {
        return {
            title: `Room ${this.user.room}`
        };
    },
    components: { Message },
    computed: mapState(["user", "messages"])
};
</script>

<style scoped>
.c-wrap {
  height: 100%;
  overflow: hidden;
}

.c-form {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  height: 80px;
  background: #212121;
}

.c-chat {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
}
</style>