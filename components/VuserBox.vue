<template>
  <div class="overlay" v-on:click="$emit('changeShow')">
    <div class="aboutuser" v-on:click.stop="noChange">
      <button class="btn_icon">
        <img v-on:click="$emit('changeShow')" src="../assets/svg/clear_24px.svg" alt />
      </button>
      <div>
        <h2>{{ user.company }}</h2>
      </div>
      <div>
        <p>
          <span>Приветствую,</span>
          {{ user.name }}
        </p>
      </div>
      <div>
        <p>
          <span>Доступ уровень -</span>
          {{ user.accessLevel }}
        </p>
      </div>
      <div>
        <p>
          <span>Текущее время -</span>
          {{ currenttime }}
        </p>
      </div>
      <hr />

      <nuxt-link to="/Login" tag="button" class="logout">
        <IconifyIcon icon="baselineEdit" :style="{color: '#4B6075', fontSize: '24px'}" />
        <div class="userid">Редактировать профиль</div>
      </nuxt-link>
      <div class="logout" @click="logout">
        <IconifyIcon icon="outlineOpenInBrowser" :style="{color: '#4B6075', fontSize: '24px'}" :rotate="1" />
        <div  class="userid">Выйти из профиля</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { time } from "highcharts";



export default {


  computed: {
    ...mapGetters("users", {
      user: "curentUser"
    }),
    currenttime() {
      let ctime = new Date();

      let hours = ctime.getHours();
      let minutes = ctime.getMinutes();
      return hours + ":" + minutes;
    }
  },
  methods:{
        noChange() {
      1 + 1;
    },
    async logout() {
      try {
        await this.$auth.logout();
      } catch(e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped>
.overlay {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.062);
  z-index: 19;
  position: absolute;
  top: 0;
  right: 0;
}
.aboutuser {
  width: 350px;
  height: 212px;
  padding: 0 12px;
  background-color: #f7f8fa;

  z-index: 10;

  position: absolute;
  top: 50px;
  right: 0;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
}

.btn_icon {
  cursor: pointer;
  position: absolute;
  top: -6px;
  right: 355px;
}

div {
  padding: 6px 0;
}

button {
  margin: 7px 0;
  padding: 0;
}
p {
  font-size: 14px;
  cursor: default;

  /* padding: 1px 0; */
}

h2 {
  font-size: 18px;
  cursor: default;

  /* padding: 1px 0; */
}

hr {
  margin: 12px;
}
p,
h2 {
  color: #4B6075;
}
p span {
  color: #000;
}

.logout {
  border: none;
  background: none;
  outline: none;
  text-align: left;
  /* vertical-align: middle;  */
  /* padding: 5px; */
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

button {
  cursor: pointer;
  background: none;
  border: none;
  /* border-radius: 50%; */
  display: flex;
  /* justify-content: baseline; */
  outline: none;
}

img {
  align-self: center;
}

.userid {
  font: 12px sans-serif;
  padding: 6px 10px;

  align-self: center;
}

/* .aboutuser > p,h2{
     padding: 2px;
} */
</style>
