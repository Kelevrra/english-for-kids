const statistic = JSON.parse(localStorage.getItem('statistic'))
const tableArr = []
let sortedArr = []
let check = 'up'

function renderSortedTable(value) {
  const table = document.getElementById('table-body')
  table.innerHTML = `
    ${value.map((it) => `
        <div class="table-item-row">
          <div class="table-item item word">${it.word}</div>
          <div class="table-item item translation">${it.translation}</div>
          <div class="table-item item category">${it.category}</div>
          <div class="table-item item clicks">${it.clicks}</div>
          <div class="table-item item correct">${it.correct}</div>
          <div class="table-item item wrong">${it.wrong}</div>
          <div class="table-item item errors"><div>${it.errors} %</div></div>
        </div>`).join('')}`
}

function sortTableBy(value) {
    if(typeof value === 'string') {
        if(check === 'up') {
            sortedArr = tableArr.sort((prev, next) =>  prev[value] < next[value] ? -1 : 1)
            renderSortedTable(sortedArr)
            check = ''
        } else {
            sortedArr = tableArr.sort((prev, next) => prev[value] < next[value] ? 1 : -1)
            renderSortedTable(sortedArr)
            check = 'up'
        }
    }
    if(typeof value === 'number') {
        if(check === 'up') {
            sortedArr = tableArr.sort((prev, next) => prev[value] - next[value])
            renderSortedTable(sortedArr)
            check = ''
        } else {
            sortedArr = tableArr.sort((prev, next) => next[value] - prev[value])
            renderSortedTable(sortedArr)
            check = 'up'
        }
    }
}

export const sortByWord = () => sortTableBy('word')
export const sortByTranslation = () => sortTableBy('translation')
export const sortByCategory = () => sortTableBy('category')
export const sortByClicks = () => sortTableBy('clicks')
export const sortByCorrectAnswers = () => sortTableBy('correct')
export const sortByWrongAnswers = () => sortTableBy('wrong')
export const sortByErrorsStatistic = () => sortTableBy('errors')

function tableArrInit() {
  for(let i = 0; i < statistic.length; i += 1) {
    for(let j = 0; j < statistic[i].length; j += 1) {
      tableArr.push(statistic[i][j])
    }
  }
}

tableArrInit()
