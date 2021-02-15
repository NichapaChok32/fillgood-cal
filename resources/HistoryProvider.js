import Dexie from 'dexie'

const db = new Dexie('calculators')
db.version(1).stores({
  cal: '++id, cal_name, expr, calExpr, result, cal_date, cal_time',
})
class HistoryProvider {
  async getHistory() {
    const history = await db.cal.toArray()
    return history
  }

  async getHistoryByA(keyword) {
    const history = await db.cal.toArray()
    const list = history.filter(
      (x) =>
        x.cal_name === 'A' &&
        (x.result === parseInt(keyword) ||
          x.cal_date.match(keyword) ||
          x.cal_time.match(keyword))
    )
    return list
  }

  async getHistoryByB(keyword) {
    const history = await db.cal.toArray()
    const list = history.filter(
      (x) =>
        x.cal_name === 'B' &&
        (x.result === parseInt(keyword) ||
          x.cal_date.match(keyword) ||
          x.cal_time.match(keyword))
    )
    return list
  }

  async getHistoryByAll(keyword) {
    const history = await db.cal.toArray()
    const list = history.filter(
      (x) =>
        x.result === parseInt(keyword) ||
        x.cal_date.match(keyword) ||
        x.cal_time.match(keyword)
    )
    return list
  }

  async saveHistory(history) {
    await db.cal.add({
      cal_name: history.cal_name,
      expr: history.expr,
      calExpr: history.calExpr,
      result: history.result,
      cal_date: history.cal_date,
      cal_time: history.cal_time,
    })
  }

  async deleteHistory() {
    await db.cal.clear()
  }

  deleteDatabase() {
    Dexie.delete('calculators')
    const db = new Dexie('calculators')
    db.version(1).stores({
      cal: '++id, cal_name, expr, calExpr, result, cal_date, cal_time',
    })
  }
}

export default HistoryProvider
