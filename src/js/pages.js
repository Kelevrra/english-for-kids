import { cards } from '../data/cards'
import { navigationItemsArray } from '../data/navigation'
import {
    playVoice,
    turnCard
} from './training'
import {
    checkingArrInit,
    gameInit,
    gameInitButtonStatus,
    repeat,
    statisticDataInit
} from './playing'
import {
    sortByClicks,
    sortByCorrectAnswers,
    sortByWrongAnswers,
    sortByErrorsStatistic,
    sortByWord,
    sortByTranslation,
    sortByCategory
} from './table-sort'

const navigationItem = document.getElementsByClassName('navigation-item')
const gameButton = document.getElementsByClassName('game-init-button')
const clear = () => Array.from(document.getElementsByClassName('main-container')).map(it => it.parentNode.removeChild(it))
const menuClear = () => Array.from(navigationItem).map(it => it.classList.remove('navigation-item--active'))
export let currentPage = null

export function homePageInit() {
  Array.from(document.getElementsByClassName('star')).map(it => it.parentNode.removeChild(it))
  const newElem = document.createElement('div')
  newElem.classList.add('main-container')
  newElem.innerHTML = `
                <div class="game-init home">
                    <button type="button" class="game-init-button hidden game-init-button--hidden">Start the game!</button>
                    <div class="repeat-button hidden repeat-button--hidden"></div>
                </div>
                <div class="cards-list" id="cards-list">
        ${cards.titles.map((it, i) => `
                <a class="cards-item" href="#" id=cards-item-${i+1}>
                    <div class="card">
                        <div class="img-box">
                            <img class="card-image" src=${cards.cards[i][1].image}>
                        </div>
                        <div class="details">
                            <p class"card-subtitle">go over</p>
                            <h2 class="card-title">${it}</h2>
                        </div>
                    </div>
                </a>`).join('')}
                </div>
            </div>
  `
  document.getElementById('app').appendChild(newElem)
  document.getElementById('mode').checked = false
  document.getElementsByClassName('mode-input')[0].style.display = 'flex'
}

export function gamePageInit(i) {
  Array.from(document.getElementsByClassName('star')).map(it => it.parentNode.removeChild(it))
  const newElem = document.createElement('div')
  newElem.classList.add('main-container')
  newElem.innerHTML = `
                <div class="modal modal-success modal--closed">
                  <img class="modal-picture" src="assets/img/success.jpg" alt="">
                  <div class="modal-stars"></div>
                  <h2 class="modal-title">Success!</h2>
                  <audio class="success-song">
                      <source src="assets/audio/success.mp3">
                  </audio>
                  <audio class="failure-song">
                      <source src="assets/audio/failure.mp3">
                  </audio>
                </div>
                <div class="game-init">
                    <button type="button" class="game-init-button hidden game-init-button--hidden">Start the game!</button>
                    <div class="repeat-button hidden repeat-button--hidden"></div>
                </div>
                <div class="cards-list" id="cards-list">
                <h2 class="category-name">${cards.titles[i]}</h2>
${cards.cards[i].map((it, index) => `
                    <a class="cards-item cards-item-lesson flip-container train" id="card-${i+1}">
                        <div class="card-lesson flipper">
                            <div class="front">
                                <div class="img-box">
                                    <img class="card-image" src=${it.image}>
                                </div>
                                <div class="details">
                                    
                                    <h2 class="card-title">${it.word}</h2>
                                    <span class="music-btn">
                                        <audio class="audio-voice">
                                            <source src=${it.audioSrc}>
                                        </audio>
                                    </span>
                                </div>
                            </div>
                            <div class="back">
                                <div class="img-box">
                                    <img class="card-image" src=${it.image}>
                                </div>
                                <div class="details">
                                    <h2 class="card-title">${it.translation}</h2>
                                </div>
                            </div>
                              <button class="turn-item-btn" id="btn-${index+1}"></button>
                        </div>
                    </a>`).join('')}
                </div>
            </div>
  `
  document.getElementById('app').appendChild(newElem)
  playVoice()
  turnCard()
  checkingArrInit()
  currentPage = i

  gameButton[0].addEventListener('click', () => {
    gameInit()
    gameInitButtonStatus()
  })
  document.getElementsByClassName('repeat-button')[0].addEventListener('click', repeat)
  document.getElementsByClassName('mode-input')[0].style.display = 'flex'
}

function statisticPageInit() {
  Array.from(document.getElementsByClassName('star')).map(it => it.parentNode.removeChild(it))
  const statistic = JSON.parse(localStorage.getItem('statistic'))
  document.getElementsByClassName('mode-input')[0].style.display = 'none'
  clear()
  const newElem = document.createElement('div')
  newElem.classList.add('main-container')
  newElem.innerHTML = `
  <div class="statistic-container">
    <h2>Statistic</h2>
    <button id="reset">Reset</button>
    <button type="button" class="game-init-button hidden game-init-button--hidden statistic"></button>
    <div class="table" id="table">
        <div class="table-title-row">
          <div class="table-title item" id="word">Word</div>
          <div class="table-title item" id="translation">Translation</div>
          <div class="table-title item" id="category">Category</div>
          <div class="table-title item" id="clicks">Clicks</div>
          <div class="table-title item" id="correct">Correct</div>
          <div class="table-title item" id="wrong">Wrong</div>
          <div class="table-title item" id="errors">% errors</div>
        </div>
        <div id="table-body">
          ${statistic.map((it) => `
          ${it.map((el) => `
          <div class="table-item-row">
            <div class="table-item item word">${el.word}</div>
            <div class="table-item item translation">${el.translation}</div>
            <div class="table-item item category">${el.category}</div>
            <div class="table-item item clicks">${el.clicks}</div>
            <div class="table-item item correct">${el.correct}</div>
            <div class="table-item item wrong">${el.wrong}</div>
            <div class="table-item item errors"><div>${el.errors} %</div></div>
          </div>
          `).join('')}
          `).join('')}
        </div>
    </div>
  </div>
  `
  document.getElementById('app').appendChild(newElem)
  document.getElementById('reset').addEventListener('click', () => {
    localStorage.removeItem('statistic')
    statisticDataInit()
    statisticPageInit()
  })
  document.getElementById('clicks').addEventListener('click', sortByClicks)
  document.getElementById('correct').addEventListener('click', sortByCorrectAnswers)
  document.getElementById('wrong').addEventListener('click', sortByWrongAnswers)
  document.getElementById('errors').addEventListener('click', sortByErrorsStatistic)
  document.getElementById('word').addEventListener('click', sortByWord)
  document.getElementById('translation').addEventListener('click', sortByTranslation)
  document.getElementById('category').addEventListener('click', sortByCategory)
}

export function routerInit(){
  const menuHomeItemUpdate = () => {
    menuClear()
    navigationItem[0].classList.add('navigation-item--active')
    clear()
    homePageInit()
    routerInit()
  }
  for(let i = 1; i < navigationItemsArray.length - 1; i += 1) {
    document.getElementById(`cards-item-${i}`).addEventListener('click', () => {
      menuClear()
      navigationItem[i].classList.add('navigation-item--active')
      clear()
      gamePageInit(i-1)
    })
  }
  for(let i = 1; i < navigationItemsArray.length - 1; i += 1) {
    navigationItem[i].addEventListener('click', () => {
      menuClear()
      navigationItem[i].classList.add('navigation-item--active')
      clear()
      gamePageInit(i-1)
    })
  }
  navigationItem[navigationItemsArray.length-1].addEventListener('click', () => {
    statisticPageInit()
    menuClear()
    navigationItem[navigationItemsArray.length-1].classList.add('navigation-item--active')
  })
  navigationItem[0].addEventListener('click', menuHomeItemUpdate)
  document.getElementsByClassName('header-link')[0].addEventListener('click', menuHomeItemUpdate)
}

homePageInit()
routerInit()
