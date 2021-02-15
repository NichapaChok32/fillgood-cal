<template>
  <v-container>
    <labal class="lbCalculator">Calculator {{ name }}</labal>
    <v-card class="calculator-card">
      <v-row class="cal-row">
        <v-text-field
          v-model="result"
          type="text"
          oninput="this.value = this.value.replace(/[^0-9+*-]/g, '').replace(/(\..*?)\..*/g, '$1');"
          class="txtCal"
        ></v-text-field>
        <div class="calculate-expr">
          <div class="expr-div" v-html="calculate"></div>
        </div>
      </v-row>
      <v-row class="cal-row">
        <v-col class="cal-col">
          <v-btn class="btnCal" @click="clearExpr()">C</v-btn>
        </v-col>
        <v-col class="cal-col">
          <v-btn class="btnCal cross" @click="setExpr('X')">X</v-btn>
        </v-col>
        <v-col class="cal-col">
          <v-btn class="btnCal" @click="setExpr('-')">-</v-btn>
        </v-col>
        <v-col class="cal-col right">
          <v-btn class="btnCalLong" @click="setExpr('+')">+</v-btn>
        </v-col>
      </v-row>
      <v-row class="cal-row">
        <v-col class="cal-col">
          <v-btn class="btnCal" @click="setExpr('7')">7</v-btn>
        </v-col>
        <v-col class="cal-col">
          <v-btn class="btnCal" @click="setExpr('8')">8</v-btn>
        </v-col>
        <v-col class="cal-col">
          <v-btn class="btnCal" @click="setExpr('9')">9</v-btn>
        </v-col>
        <v-col class="cal-col right"></v-col>
      </v-row>
      <v-row class="cal-row">
        <v-col class="cal-col">
          <v-btn class="btnCal" @click="setExpr('4')">4</v-btn>
        </v-col>
        <v-col class="cal-col">
          <v-btn class="btnCal" @click="setExpr('5')">5</v-btn>
        </v-col>
        <v-col class="cal-col">
          <v-btn class="btnCal" @click="setExpr('6')">6</v-btn>
        </v-col>
        <v-col class="cal-col right">
          <v-btn class="btnCalResult" @click="getResult()">=</v-btn>
        </v-col>
      </v-row>
      <v-row class="cal-row">
        <v-col class="cal-col">
          <v-btn class="btnCal" @click="setExpr('1')">1</v-btn>
        </v-col>
        <v-col class="cal-col">
          <v-btn class="btnCal" @click="setExpr('2')">2</v-btn>
        </v-col>
        <v-col class="cal-col">
          <v-btn class="btnCal" @click="setExpr('3')">3</v-btn>
        </v-col>
        <v-col class="cal-col right"></v-col>
      </v-row>
      <v-row class="cal-row">
        <v-col cols="5" class="cal-zero-col">
          <v-btn class="btnCalZero" @click="setExpr('0')">0</v-btn>
        </v-col>
        <v-col class="cal-dot-col">
          <v-btn class="btnCal" @click="setExpr('.')">.</v-btn>
        </v-col>
        <v-col class="cal-col right"></v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import HistoryProvider from '../resources/HistoryProvider'
const historyService = new HistoryProvider()

export default {
  name: 'Calculator',
  props: {
    name: {
      type: String,
    },
  },
  data() {
    return {
      expr: '',
      result: '',
      plus: '%2B',
      multiple: '%2A',
      minus: '%2D',
      calculate: '',
    }
  },
  methods: {
    clearExpr() {
      this.calculate = ''
      this.result = ''
      this.expr = ''
    },
    setExpr(value) {
      switch (value) {
        case '+':
          this.expr += this.plus.toString()
          this.calculate += '<span class="lbOperator"> + </span>'
          break
        case '-':
          this.expr += this.minus.toString()
          this.calculate += '<span class="lbOperator"> - </span>'
          break
        case 'X':
          this.expr += this.multiple.toString()
          this.calculate += '<span class="lbOperator"> X </span>'
          break
        default:
          this.expr += value.toString()
          this.calculate +=
            '<span class="lbExpr">' + value.toString() + '</span>'
          break
      }
    },
    async getResult() {
      await this.$axios.get(`/?expr=${this.expr}`).then((response) => {
        this.result = response.data
        this.addLog()
      })
    },
    async addLog() {
      const nowDate = new Date().toISOString().substr(0, 10)
      const dateList = nowDate.split('-')
      const now = dateList[2] + '/' + dateList[1] + '/' + dateList[0]
      // eslint-disable-next-line no-console
      console.log(new Date().toISOString())
      const nowTime = new Date().toISOString().substr(11, 18).split('.')[0]
      const cal = {
        cal_name: this.name,
        expr: this.expr,
        calExpr: this.calculate,
        result: this.result,
        cal_date: now,
        cal_time: nowTime,
      }
      await historyService.saveHistory(cal)
      this.$emit('getHistoryList')
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
.container {
  width: 100%;
  max-width: 400px;
  padding: 0;
  margin: 10px 0 0;
  .lbCalculator {
    color: #707070;
    font-size: 24px;
    line-height: 30px;
  }
  .calculator-card {
    width: 100%;
    max-width: 100%;
    height: 100%;
    padding: 30px;
    margin-top: 10px;
    background-color: #fff;
    border-radius: 15px;
    .cal-row {
      width: 100%;
      margin: 0;
      .txtCal {
        width: 100%;
        color: #707070;
        font-size: 36px;
        line-height: 38px;
      }
      .calculate-expr {
        width: 100%;
        height: 100%;
        margin: 10px 0;
        .expr-div {
          width: 100%;
          height: 30px;
          line-height: 30px;
        }
      }
    }
    .cal-col {
      padding: 0;
      margin-right: 12px;
      margin-bottom: 12px;
      .btnCal {
        width: 100%;
        min-width: 100%;
        height: 100%;
        padding: 20px;
        background-color: #a7d4fa;
        border-radius: 15px;
        color: #707070;
        font-size: 36px;
        line-height: 36px;
      }
      .cross {
        font-size: 26px;
        line-height: 26px;
      }
      .btnCalLong {
        width: 100%;
        min-width: 100%;
        height: 215%;
        padding: 20px;
        background-color: #a7d4fa;
        border-radius: 15px;
        color: #707070;
        font-size: 36px;
        line-height: 36px;
      }
      .btnCalResult {
        width: 100%;
        min-width: 100%;
        height: 330%;
        padding: 20px;
        background-color: #a7d4fa;
        border-radius: 15px;
        color: #707070;
        font-size: 36px;
        line-height: 36px;
      }
    }
    .cal-zero-col {
      padding: 0;
      margin-right: 12px;
      .btnCalZero {
        width: 115%;
        min-width: 115%;
        height: 100%;
        padding: 20px;
        background-color: #a7d4fa;
        border-radius: 15px;
        color: #707070;
        font-size: 36px;
        line-height: 36px;
      }
    }
    .cal-dot-col {
      padding: 0;
      margin-left: 25px;
      margin-right: 12px;
      .btnCal {
        width: 100%;
        min-width: 100%;
        height: 100%;
        padding: 20px;
        background-color: #a7d4fa;
        border-radius: 15px;
        color: #707070;
        font-size: 36px;
        line-height: 36px;
      }
    }
  }
}
</style>
<style lang="sass">
.txtCal .v-input__control .v-text-field__details
  display: none
.expr-div .lbExpr
  color: #707070
  font-size: 24px
  line-height: 30px
.expr-div .lbOperator
  color: #e623cf
  font-size: 24px
  line-height: 30px
.txtCal input
  color: #707070 !important
</style>
