<template>
  <div class="overlay">
    <div class="modal-created">
      <div class="attention-close">
        <div class="attention-header">
          <div class="title-header">Добавление резерв1</div>
        </div>
        <div class="attention-body">
          <input type="text" placeholder="Название резерв1" v-model="form.name">
        </div>
        <div class="attention-footer">
          <button class="btn-center" @click="save">Применить</button>
        </div>
      </div>
      <button class="btn_icon2">
        <div class="btn-bg" @click="$parent.$emit('closeAddForm', 'addReserv1')"></div>
      </button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "AddReserv1",
  props: [
    'id'
  ],
  created() {
    if(this.id) {
      let reserv1 = this.reserves1.filter(item => item.id === this.id);
      this.id = reserv1[0].id;
      this.form.name = reserv1[0].name;
    }
  },
  data() {
    return {
      form: {
        name: '',
      }
    }
  },
  methods: {
    ...mapActions('settingsGlobal', {
      updateReserve1: 'updateReserve1',
    }),
    save() {
      let data = {
        id: this.id,
        name: this.form.name
      }

      for(let key in data)
        if(!data[key] && key !== 'id') {
          this.$parent.$emit('showAttentionInput');
          return;
        }

      this.updateReserve1(data);
      this.$parent.$emit('closeAddForm', 'addReserv1')
    }
  },
  computed: {
    ...mapGetters('settingsGlobal', {
      reserves1: 'reserves1',
    }),
  }
}
</script>

<style lang="scss" scoped>
.modal-created input {
  color: #49617B !important;
}
.modal-created {

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 400px;
  height: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  background: #F7F8FA;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);

  .attention-close {
    width: 100%;

    .attention-header {
      width: 100%;
      height: 24px;
      padding-top: 3px;
      margin-bottom: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;

      .title-header {
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #4B6075;
      }
    }

    .attention-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;

      font-size: 12px;
      line-height: 15px;

      input {
        width: 376px;
        height: 24px;

        margin-bottom: 24px;
        padding: 3px 6px;

        display: flex;
        align-items: center;

        border: 1px solid #9098AF;
        box-sizing: border-box;
        border-radius: 4px;

        outline: none;
      }

      ::placeholder {
        font-weight: normal;
        font-size: 12px;

        color: #9098AF;
      }
    }

    .attention-footer {
      width: 100%;
      height: 36px;
      display: flex;

      .btn-center {
        width: 100%;
        height: 36px;
        border: none;

        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px 12px;

        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        display: flex;
        align-items: center;
        text-align: center;

        color: #0B2E13;
        background: #D4EDDA;;

        outline: none;
        cursor: pointer;

        &:hover {
          box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
        }
      }
    }
  }

  .btn_icon2 {
    position: absolute;
    top: 0;
    left: -34px;
    cursor: pointer;
    background: none;
    border: none;
    display: flex;
    justify-content: baseline;
    outline: none;

    .btn-bg {
      width: 24px;
      height: 24px;
      background-image: url("~assets/svg/clear_24px.svg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;

      &:hover {
        background-image: url("~assets/svg/setting/hovClose.svg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }
    }
  }

  .box-modal {
    position: relative;

    width: 468px;
    height: 392px;

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .attention {
      width: 300px;
      height: 300px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.overlay {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 19;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.062);
}
</style>
