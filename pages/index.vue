<template>
  <v-row class="index-row" justify="center" align="center">
    <v-col class="index-col">
      <v-row class="cal-row" justify="center" align="center">
        <v-col class="cal-col left">
          <Calculator :name="'A'" @getHistoryList="getHistory" />
        </v-col>
        <v-col class="cal-col">
          <Calculator :name="'B'" @getHistoryList="getHistory" />
        </v-col>
        <v-col class="cal-col right">
          <v-row class="history-row search-row">
            <v-col class="history-col text-right first">
              <labal class="lbHistory">Results</labal>
            </v-col>
            <v-col class="history-col">
              <input
                v-model="search"
                placeholder="Search by result, date"
                class="txtSearch"
                @change="getSearch()"
              />
            </v-col>
            <v-col cols="3" class="history-col">
              <v-select
                v-model="indexType"
                :items="type"
                item-text="title"
                item-value="id"
                outlined
                single-line
                class="txtSelect"
                @change="getSearch()"
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="history-row">
            <v-card class="history-card">
              <div class="history-div">
                <v-row
                  v-for="item in history"
                  :key="item.id"
                  class="history-row"
                >
                  <v-col class="item-col">
                    <labal class="lbCalculator"
                      >Calculator {{ item.cal_name }}</labal
                    >
                  </v-col>
                  <v-col class="item-col">
                    <labal class="lbDate">{{
                      item.cal_date + ' - ' + item.cal_time
                    }}</labal>
                  </v-col>
                  <v-row class="history-row">
                    <div class="result-div">
                      <label class="lbResult">{{ item.result }}</label>
                    </div>
                  </v-row>
                  <v-row class="history-row">
                    <div class="history-expr" v-html="item.calExpr"></div>
                  </v-row>
                </v-row>
                <v-btn
                  class="btnClear"
                  :disabled="history.length === 0"
                  @click="checkClear()"
                  >Clear</v-btn
                >
              </div>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card class="confirm-card-dialog">
        <v-card-title class="confirm-header-dialog">
          {{ header }}
        </v-card-title>
        <v-card-text class="confirm-text-dialog">
          {{ content }}
        </v-card-text>
        <v-card-actions class="confirm-action-dialog">
          <v-btn class="btnCancel" @click="dialog = false"> Cancel </v-btn>
          <v-btn class="btnDelete" @click="clearHistory()"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Calculator from '../components/Calculator'
import HistoryProvider from '../resources/HistoryProvider'
const historyService = new HistoryProvider()

export default {
  name: 'Index',
  components: {
    Calculator,
  },
  data() {
    return {
      type: [
        {
          id: 1,
          title: 'All',
        },
        {
          id: 2,
          title: 'Calculator A',
        },
        {
          id: 3,
          title: 'Calculator B',
        },
      ],
      indexType: 1,
      history: [],
      search: '',
      dialog: false,
      header: 'Alert',
      content: 'Do you want to delete historys selected?',
    }
  },
  mounted() {
    this.getHistory()
  },
  methods: {
    async getHistory() {
      this.history = await historyService.getHistory()
    },
    async getSearch() {
      switch (this.indexType) {
        case 1:
          this.history = await historyService.getHistoryByAll(this.search)
          break
        case 2:
          this.history = await historyService.getHistoryByA(this.search)
          break
        case 3:
          this.history = await historyService.getHistoryByB(this.search)
          break
        default:
          this.history = await historyService.getHistory()
          break
      }
    },
    checkClear() {
      this.dialog = true
    },
    async clearHistory() {
      this.dialog = false
      await historyService.deleteHistory()
      this.history = []
    },
  },
}
</script>

<style lang="scss" scoped>
.right {
  margin-right: 0 !important;
}
.left {
  margin-left: 0 !important;
}
.index-row {
  width: 100%;
  padding: 70px 70px 100px;
  margin: 0 auto;
}
.index-col {
  padding: 0;
  .cal-row {
    margin: 0 auto;
    .cal-col {
      width: 100%;
      max-width: fit-content;
      max-height: 670px;
      padding: 0;
      margin: 0 20px;
      .history-row {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        line-height: 36px;
        .history-col {
          height: auto;
          padding: 0;
          margin-right: 10px;
          .lbHistory {
            color: #707070;
            font-size: 24px;
            line-height: 36px;
          }
          .txtSearch {
            width: 100%;
            height: 40px;
            margin: 0 4px 10px;
            padding: 20px;
            background-color: #fff;
            border: 1px solid #c4c4c4;
            border-radius: 15px;
            color: #707070;
            font-size: 24px;
            line-height: 30px;
            box-shadow: #0000000d 0 2px 3px;
            :hover,
            :active {
              border-radius: 15px;
              border: 1px solid #c4c4c4;
            }
          }
          .txtSelect {
            width: auto;
            height: 42px;
            background-color: #fff;
            border: 1px solid #c4c4c4;
            border-radius: 15px;
            color: #707070 !important;
            font-size: 24px;
            line-height: 30px;
            box-shadow: #0000000d 0 2px 3px;
            .v-input__control {
              .v-input__slot {
                min-height: 40px;
              }
            }
          }
        }
        .first {
          width: auto;
          max-width: 80px;
        }
        .history-card {
          width: 100%;
          height: 100%;
          padding: 30px;
          background-color: #fff;
          border-radius: 15px;
          .item-col {
            padding: 0;
          }
        }
        .result-div {
          width: 100%;
          height: 100%;
          border-bottom: 1px solid #000;
          .lbResult {
            color: #707070;
            font-size: 36px;
            line-height: 38px;
          }
        }
        .history-expr {
          width: 100%;
          height: 100%;
          margin: 5px 0 10px;
        }
      }
      .history-div {
        position: relative;
        width: 100%;
        height: 100%;
        max-height: 600px;
        overflow: hidden;
        overflow-y: scroll;
        .btnClear {
          position: absolute;
          bottom: -55%;
          right: 1%;
          left: auto;
          min-width: 0;
          width: auto;
          height: auto;
          padding: 10px;
          background-color: #f00;
          border-radius: 15px;
          color: #fff !important;
          font-size: 24px;
          line-height: 30px;
          box-shadow: #0000000d 0 2px 3px;
          text-transform: none;
          letter-spacing: normal;
          font-weight: normal;
        }
      }
      .search-row {
        max-height: 50px;
      }
    }
  }
}
</style>
<style lang="sass">
.txtSelect .v-input__control .v-input__slot
  min-height: 40px
.txtSelect .v-input__control .v-text-field__details
  display: none
.txtSelect fieldset
  top: -8px
  border-color: transparent
.txtSelect .v-input__append-inner
  margin-top: 8px
.v-text-field--outlined.v-input--is-focused fieldset
  border: none
.v-menu__content
  border-radius: 15px
.lbCalculator
  color: #707070
  font-size: 22px
  line-height: 30px
.lbDate
  color: #9ac2e3
  font-size: 20px
  line-height: 30px
.txtCal .v-input__control .v-text-field__details
  display: none
.history-expr .lbExpr
  color: #707070
  font-size: 22px
  line-height: 30px
.history-expr .lbOperator
  color: #e623cf
  font-size: 22px
  line-height: 30px
.history-div::-webkit-scrollbar-track
  display: none
.history-div::-webkit-scrollbar-thumb
  display: none
.history-div::-webkit-scrollbar
  display: none
.history-div::-webkit-scrollbar-thumb:hover
  display: none
</style>
<style scoped>
.confirm-card-dialog.v-card {
  padding: 20px 16px 27px;
  max-height: 220px;
  background-color: #fff !important;
  box-shadow: #00000026 0 2px 10px !important;
}
.confirm-card-dialog.v-sheet.v-card {
  border-radius: 0;
}
.confirm-card-dialog.v-card
  > .v-card__title.confirm-header-dialog
  > .confirm-icon {
  margin: 0 15px 0 16px;
  width: 38px;
  height: 38px;
}
.confirm-card-dialog.v-card > .v-card__title.confirm-header-dialog {
  width: 100%;
  padding: 0 0 22px 0;
  margin: 0 auto;
  font-size: 22px;
  line-height: 24px;
  color: #707070;
  text-align: center;
}
.confirm-card-dialog.v-card > .v-card__text.confirm-text-dialog {
  padding: 0 0 22px 70px;
  font-size: 16px;
  line-height: 25px;
  color: #707070;
}
.confirm-card-dialog > .confirm-action-dialog {
  width: 100%;
}
.confirm-card-dialog > .confirm-action-dialog-ok {
  padding: 0 0 0 420px;
}
.confirm-card-dialog > .confirm-action-dialog .btnCancel {
  width: 138px;
  height: 40px;
  padding: 8px 60px !important;
  margin-right: 7px;
  margin-left: auto;
  background-color: #a8a8a8 !important;
  border-radius: 4px;
  box-shadow: #0000000d 0 2px 3px;
  font-size: 18px;
  line-height: 22px;
  color: #fff;
  letter-spacing: 0.5px;
  text-transform: none;
}
.confirm-card-dialog > .confirm-action-dialog .btnDelete {
  width: 138px;
  height: 40px;
  padding: 8px 60px !important;
  margin-left: 7px !important;
  background-color: #ef443e !important;
  border-radius: 4px;
  box-shadow: #0000000d 0 2px 3px;
  font-size: 18px;
  line-height: 22px;
  color: #fff;
  letter-spacing: 0.5px;
  text-transform: none;
}
</style>
