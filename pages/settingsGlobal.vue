<template>
  <div>
    <div class="top-panel">
      <div class="project-box">Объекты</div>
      <div class="btn-box">

        <button
            class="btn-project btn-del"
            v-if="clientsObject"
            @click="changeshowDelObject"
        >
          <span class="btn-title">Удалить</span>
          <span class="btn-svg"></span>
        </button>

        <button
            class="btn-project btn-edit"
            v-if="clientsObject"
            @click="changeshowCreated"
        >
          <span class="btn-title">Изменить</span>
          <span class="btn-svg"></span>
        </button>

        <button
            class="btn-project btn-add"
            v-if="!clientsObject"
            v-on:click="changeshowCreated"
        >
          <span class="btn-title">Добавить</span>
          <span class="btn-svg"></span>
        </button>

      </div>
    </div>
    <div class="table-objects">
      <table>
        <thead>
        <tr class="table-head">
          <th>Название объекта</th>
          <th>Заказчик</th>
          <th>Договор</th>
          <th>Дата создания</th>
          <th>Дата изменения</th>
        </tr>
        </thead>
        <tbody>
        <tr class="table-body" v-if="clientsObject">
          <td>
            <input readonly class="input-td" type="text" v-bind:value="clientsObject.name_object"/>
          </td>
          <td>
            <input readonly class="input-td" type="text" v-bind:value="clientsObject.customer"/>
          </td>
          <td>
            <input readonly class="input-td" type="text" v-bind:value="clientsObject.contact"/>
          </td>
          <td>
            <input readonly class="input-td" type="text" v-bind:value="clientsObject.created_at"/>
          </td>
          <td>
            <input readonly class="input-td" type="text" v-bind:value="clientsObject.updated_at"/>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="box" v-if="clientsObject">
      <div class="structure-items">
        <template v-if="clientsObject && clientsObject.hasOwnProperty('currentStructureObject')">
          <div
              class="structure-item"
              :class="{active: currentTab === item.id}"
              v-for="(item, idx) in clientsObject.currentStructureObject"
              :key="idx"
              @click="setTab(item.id)"
          >{{ item.value }}
          </div>
        </template>
        <div class="panel-btn-box">
          <div class="search-wrapper" :class="{active: showSearch}">
            <button class="level btn_icon level-btn btn_icon-panel"
                    @click="showSearch = !showSearch"
            >
              <span class="search"></span>
            </button>
            <input type="text" v-model="search" v-if="showSearch" placeholder=""/>
            <div class="close" v-if="showSearch" @click="showSearch = !showSearch">
              <img src="../assets/img/ico-searh.png" alt=""/>
            </div>
          </div>
          <button class=" level btn_icon level-btn btn_icon-panel" @click="del">
            <span class="minus"></span>
            <!--            <IconifyIcon icon="baselineRemove" :style="{color: '#FF6F64', fontSize: '24px'}" />-->
          </button>
          <button class=" level btn_icon level-btn btn_icon-panel" @click="edit">
            <span class="edit"></span>
            <!-- <IconifyIcon icon="editOutlined" :style="{color: '#c4b70c', fontSize: '24px'}" /> -->
          </button>
          <button class="level btn_icon btn_icon-panel level-btn list" v-if="currentTab === 9">
            <span class="plus_green__list" @click="showAddVariablesConnect(true)"></span>
          </button>
          <button
              class=" level btn_icon btn_icon-panel level-btn"
              @click=""
          >
            <span class="plus_green" @click="showFormAdd"></span>
            <!--            <IconifyIcon icon="addIcon" :style="{color: '#01C587', fontSize: '24px'}" />-->
          </button>
        </div>
      </div>
    </div>

    <div class="table-objects table-objects-rows" v-if="clientsObject">
      <table>
        <thead>
        <tr class="table-head">
          <th v-for="(value, key) in createTable.thead">
            {{ value }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr class="table-body"
            v-for="(row, key) in createTable.tbody"
            :class="{active : row.id === currentTabRow }"
            @click="setRowActive(row.id)"
            :data-id="row.id"
        >
          <td v-for="(value, key) in row"
              v-if="Object.keys(createTable.thead).includes(key)">
            <div style="overflow-x: auto;">
              <div style="white-space: pre-wrap">{{ value }}</div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <delObject v-if="showDelObject" :clientObject="clientsObject"></delObject>
    <VobjectCreated v-if="showCreated" v-on:changeShow="changeshowCreated"></VobjectCreated>

    <addReserv1 v-if="showAddForm.addReserv1" :id="editArr[1]"></addReserv1>
    <addReserv2 v-if="showAddForm.addReserv2" :id="editArr[2]"></addReserv2>
    <addOrganization v-if="showAddForm.addOrganization" :id="editArr[3]"></addOrganization>
    <addCompany v-if="showAddForm.addCompany" :id="editArr[4]"></addCompany>
    <addFactory v-if="showAddForm.addFactory" :id="editArr[5]"></addFactory>
    <addWorkshop v-if="showAddForm.addWorkshop" :id="editArr[6]"></addWorkshop>
    <addKnot v-if="showAddForm.addKnot" :id="editArr[7]"></addKnot>
    <addSensor v-if="showAddForm.addSensor" :id="editArr[8]"></addSensor>
    <addVariables v-if="showAddForm.addVariables" :id="editArr[9]"></addVariables>
    <addVariablesConnect v-if="addVariablesConnect"></addVariablesConnect>
    <AttentionInput v-if="showAttentionInput"></AttentionInput>
  </div>
</template>

<script>
import VobjectCreated from "@/components/VobjectCreated";
import DelObject from "@/components/settingsGlobal/DelObject";

import AddReserv1 from "@/components/settingsGlobal/AddReserv1";
import AddReserv2 from "@/components/settingsGlobal/AddReserv2";
import AddOrganization from "@/components/settingsGlobal/AddOrganization";
import AddCompany from "@/components/settingsGlobal/AddCompany";
import AddFactory from "@/components/settingsGlobal/AddFactory";
import AddWorkshop from "@/components/settingsGlobal/AddWorkshop";
import AddKnot from "@/components/settingsGlobal/AddKnot";
import AddSensor from "@/components/settingsGlobal/AddSensor";
import AddVariables from "@/components/settingsGlobal/AddVariables";
import AddVariablesConnect from "@/components/settingsGlobal/AddVariablesConnect";

import AttentionInput from "@/components/settingsGlobal/AttentionInput";

import {mapGetters} from "vuex";
import {mapActions} from "vuex";

export default {
  layout: "header_footer",

  created() {
    this.setActiveTabHeader("SETTING");
    this.setActiveTabSidebar("Setting");

    // this.getTypeStructured();

    this.$on('closeAddWorkshop', () => {
      this.showAddForm.addWorkshop = false;
    });

    this.$on('closeVobjectCreated', () => {
      this.showCreated = false;
    });

    this.$on('changeshowDelObject', () => {
      this.showDelObject = false;
    });

    this.$on('closeAddForm', (name) => {
      this.showAddForm[name] = false;
    });

    this.$on('showAttentionInput', () => {
      this.showAttentionInput = true;
    });

    this.$on('closeAttentionInput', () => {
      this.showAttentionInput = false;
    });

    this.$on('showAddVariablesConnect', (is_active) => {
      this.addVariablesConnect = is_active;
    });

    if (this.clientsObject)
      this.currentTab = this.clientsObject.currentStructureObject[0].id;
  },

  components: {
    VobjectCreated,
    delObject: DelObject,
    addFactory: AddFactory,
    addWorkshop: AddWorkshop,
    addSensor: AddSensor,
    addVariables: AddVariables,
    addVariablesConnect: AddVariablesConnect,
    addReserv1: AddReserv1,
    addReserv2: AddReserv2,
    addOrganization: AddOrganization,
    addCompany: AddCompany,
    addKnot: AddKnot,
    AttentionInput: AttentionInput,
  },

  data() {
    return {
      search: "",
      showDelObject: false,
      showCreated: false,
      currentTab: 1,
      currentTabRow: null,
      editArr: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      showAddForm: {
        addReserv1: false,
        addReserv2: false,
        addOrganization: false,
        addCompany: false,
        addFactory: false,
        addWorkshop: false,
        addKnot: false,
        addSensor: false,
        addVariables: false,
      },
      addVariablesConnect: false,
      showAttentionInput: false,
      showSearch: false,
    };
  },

  computed: {
    ...mapGetters("settingsGlobal", {
      clientsObject: 'clientsObject',
      typeStructured: 'typeStructured',
      typeStructuredTable: 'typeStructuredTable',
    }),
    createTable() {
      let structured = this.typeStructuredTable.filter((item) => {
        return item.id === this.currentTab;
      })[0];

      let tbody = this.$store.getters['settingsGlobal/' + structured.key];
      if(tbody) {
        tbody = tbody.filter(item => {
          return item.name.toLowerCase().match(this.search.toLowerCase()) !== null;
        });
      }

      let arrHide = [];
      let objects = [
        {id: 1, value: "reserve1"},
        {id: 2, value: "reserve2"},
        {id: 3, value: "organisation"},
        {id: 4, value: "company"},
        {id: 5, value: "factory"},
        {id: 6, value: "workshop"},
        {id: 7, value: "knot"},
        {id: 8, value: "sensor"},
        {id: 9, value: "variable"},
      ];

      objects.forEach(item => {
        if (!this.clientsObject.currentStructureObject.filter(i => i.id === item.id).length)
          arrHide.push(item.value);
      });

      if (arrHide.length)
        for (let key in structured.table)
          if (arrHide.includes(key))
            delete structured.table[key];

      return {
        thead: structured.table,
        tbody: tbody,
      };
    },
    currentTabName() {
      if (this.currentTab === 1)
        return 'addReserv1';

      if (this.currentTab === 2)
        return 'addReserv2';

      if (this.currentTab === 3)
        return 'addOrganization';

      if (this.currentTab === 4)
        return 'addCompany';

      if (this.currentTab === 5)
        return 'addFactory';

      if (this.currentTab === 6)
        return 'addWorkshop';

      if (this.currentTab === 7)
        return 'addKnot';

      if (this.currentTab === 8)
        return 'addSensor';

      if (this.currentTab === 9)
        return 'addVariables';

      return '';
    }
  },
  methods: {
    ...mapActions("users", {
      setActiveTabHeader: "setActiveTabHeader",
      setActiveTabSidebar: "setActiveTabSidebar",
    }),
    ...mapActions("settingsGlobal", {
      getTypeStructured: 'getTypeStructured',
      updateTypeStructuredTable: 'updateTypeStructuredTable',
      deleteTypeStructuredTable: 'deleteTypeStructuredTable',
    }),
    changeshowCreated() {
      this.showCreated = !this.showCreated;
    },

    changeshowDelObject() {
      this.showDelObject = !this.showDelObject;
    },
    setTab(id) {
      this.currentTab = id;
      this.currentTabRow = null;
    },
    del() {
      this.deleteTypeStructuredTable({
        tab: this.currentTab,
        id: this.currentTabRow,
      });
    },
    showFormAdd() {
      this.currentTabRow = null;
      this.editArr = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ];
      this.showAddForm.addReserv1 = false;
      this.showAddForm.addReserv2 = false;
      this.showAddForm.addOrganization = false;
      this.showAddForm.addCompany = false;
      this.showAddForm.addFactory = false;
      this.showAddForm.addWorkshop = false;
      this.showAddForm.addKnot = false;
      this.showAddForm.addSensor = false;
      this.showAddForm.addVariables = false;

      this.showAddForm[this.currentTabName] = true;
    },
    setRowActive(id) {
      this.currentTabRow = id;
    },
    edit() {
      this.editArr[this.currentTab] = this.currentTabRow;

      this.showAddForm.addReserv1 = false;
      this.showAddForm.addReserv2 = false;
      this.showAddForm.addOrganization = false;
      this.showAddForm.addCompany = false;
      this.showAddForm.addFactory = false;
      this.showAddForm.addWorkshop = false;
      this.showAddForm.addKnot = false;
      this.showAddForm.addSensor = false;
      this.showAddForm.addVariables = false;

      this.showAddForm[this.currentTabName] = true;
    },
    showAddVariablesConnect(is_active) {
      this.addVariablesConnect = is_active;
    }
  },
};
</script>

<style lang="scss" scoped>
/* top-panel */

.top-panel {
  position: absolute;
  width: 100%;
  height: 48px;
  left: 0;
  top: 48px;

  border-bottom: 1px solid #dde4ee;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  background-color: #f9fafc;
}

.search-wrapper {
  position: relative;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  color: #4a627a;
  display: flex;
  justify-content: center;
  align-items: center;

  &.active {
    background: #F9FAFC;
    height: 24px;
    width: 274px;
    padding: 7px 12px 7px 12px;
    display: flex;
    justify-content: space-between;
  }

  .btn_icon.level-btn {
    margin-left: 0 !important;
    padding: 0;
    width: 14px !important;
    height: 14px !important;

    span {
      width: 100% !important;
      height: 100% !important;
    }
  }

  input {
    background: inherit;
    border-bottom: 1px solid #4A627A;
    width: 206px;
    border-top: none;
    border-left: none;
    border-right: none;
    outline: 0;
    margin-bottom: 7px;
  }

  .close {
    width: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 100%;
    }
  }
}

.input-icon {
  position: absolute;
  top: 12px;
  /* left: 24px; */
}

.project-box {
  margin-left: 144px;
  /* margin-right: auto; */

  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  width: 84px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #4a627a;
}

.btn-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 30px;
}

.btn-project {
  width: 108px;
  height: 24px;

  font-weight: 500;
  font-size: 10px;
  line-height: 12px;

  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 6px;
  color: #ffffff;

  outline: none;
  border: none;
}

.btn-del {
  color: #FF6F64;
  background-color: #ffffff;
  border: 1px solid #FF6F64;
  transition: 0.2s;

  .btn-svg {
    width: 12px;
    height: 12px;
    background-image: url("~assets/svg/setting/del_red.svg");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  &:hover {
    color: #ffffff;
    background-color: hsl(4, 100%, 67%);

    .btn-svg {
      background-image: url("~assets/svg/setting/del_white.svg");
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
}

.btn-edit {
  color: #00B0FF;
  margin-left: 12px;
  background-color: #ffffff;
  transition: 0.2s;
  border: 1px solid #00B0FF;

  .btn-svg {
    width: 12px;
    height: 12px;
    background-image: url("~assets/svg/setting/edit_blue.svg");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  &:hover {
    background-color: hsl(196, 96%, 55%);
    color: #ffffff;

    .btn-svg {
      background-image: url("~assets/svg/setting/edit_white.svg");
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
}

.btn-add {
  color: #01C587;
  margin-left: 24px;
  background-color: #ffffff;
  transition: 0.2s;
  border: 1px solid #01C587;

  .btn-svg {
    width: 12px;
    height: 12px;
    background-image: url("~assets/svg/setting/plus_green.svg");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  &:hover {
    background-color: hsl(161, 99%, 36%);
    color: #ffffff;

    .btn-svg {
      background-image: url("~assets/svg/setting/plus_white.svg");
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
}

/* top-panel */

.table-objects {
  padding-top: 73px;
  padding-left: 24px;
  padding-right: 24px;
  color: #4a627a;

  &.table-objects-rows {
    padding-top: 24px !important;
  }

  table {
    width: 100%;

    thead {
      width: 100%;
    }

    tbody {
      width: 100%;
    }
  }
}

tr {
  height: 36px;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;

  &.active {
    background: rgba(255, 113, 103, 0.15);
  }
}

th {
  height: 36px;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: #4A627A;

  border: 1px solid #4a627a;
  text-align: center;
}

td {
  border: 1px solid #4a627a;
  padding: 0;
  overflow: auto;
  text-align: center;

  input {
    text-align: center;
  }
}

.input-td {
  width: 100%;
  height: 36px;
  border: none;
  padding-left: 12px;
  outline: none;
}

tbody {
  display: table;
  border-collapse: collapse;
  margin-top: 5px;
}

thead {
  display: table;
  border-collapse: collapse;
}

th:nth-child(1), td:nth-child(1) {
  width: 472px;
}

th:nth-child(2), td:nth-child(2) {
  width: 470px;
}

th:nth-child(3), td:nth-child(3) {
  width: 470px;
}

th:nth-child(4), td:nth-child(4) {
  width: 170px;
}

th:nth-child(5), td:nth-child(5) {
  width: 170px;
}

th:nth-child(6), td:nth-child(6) {
  width: 100px;
}

th:nth-child(7), td:nth-child(7) {
  width: 100px;
}

th:nth-child(1) {
  width: 472px;
}

th:nth-child(2) {
  width: 470px;
}

th:nth-child(3) {
  width: 470px;
}

th:nth-child(4) {
  width: 170px;
}

th:nth-child(5) {
  width: 170px;
}

.box {
  margin-top: 24px;
  padding: 0 24px;
  width: 100%;
  display: flex;
  flex-direction: row;

  .structure-items {
    width: 100%;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #dde4ee;

    .structure-item {
      height: 24px;
      min-width: 72px;
      margin-left: 6px;
      padding: 0 6px;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: #8496aa;
      cursor: pointer;
      position: relative;
    }

    .structure-item:hover:before,
    .structure-item.active::before,
    {
      content: "";
      width: 100%;
      border-bottom: 1px solid #2dc2fa;
      position: absolute;
      bottom: -1px;
      left: 0;
    }

    .panel-btn-box {
      margin-left: auto;
      margin-right: 12px;
      display: flex;
      flex-direction: row;

      .level-btn {
        cursor: pointer;
        width: 24px;
        height: 24px;
        margin-left: 6px;
        border-radius: 4px;
      }

      .btn_icon {
        background: none;
        border: none;
        display: flex;
        justify-content: baseline;
        outline: none;
      }

      .btn_icon-panel {
        align-items: center;

        &.list {
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .plus_green {
        width: 14px;
        height: 14px;
        background-image: url("~assets/svg/setting/box-panel/green_plus.svg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }

      .plus_green__list {
        width: 18px;
        height: 13px;
        background-image: url("~assets/svg/setting/box-panel/green_plus_list.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }

      .edit {
        width: 14px;
        height: 14px;
        background-image: url("~assets/svg/setting/box-panel/edit.svg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }

      .minus {
        width: 14px;
        height: 14px;
        background-image: url("~assets/svg/setting/box-panel/minus.svg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }

      .search {
        width: 14px;
        height: 14px;
        background-image: url("~assets/svg/setting/box-panel/search.svg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }
    }
  }
}

</style>