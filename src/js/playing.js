import {homePageInit, currentPage, routerInit} from './pages'
import {cards} from '../data/cards'

const checkboxMode = document.getElementById('mode')
const gameButton = document.getElementsByClassName('game-init-button')
const cardItemVoice = document.getElementsByClassName('audio-voice')
const cardItemOnGame = document.getElementsByClassName('cards-item-lesson')
const modal = document.getElementsByClassName('modal')
const successSong = document.getElementsByClassName('success-song')
const failureSong = document.getElementsByClassName('failure-song')
const correctSong = document.getElementsByClassName('correct-song')
const errorSong = document.getElementsByClassName('error-song')
const repeatButton = document.getElementsByClassName('repeat-button')

const statisticData = [ ...cards.cards ]
let checkingArr = null
let i = 0
let correct = 0
let clicks = 0
let mistake = 1
let mistakesCheck = 0
let statisticChecker = 0

export const checkingArrInit = () => {
    checkingArr = new Array(document.getElementsByClassName('audio-voice').length)
    .fill(null)
    .map((it, index) =>  (index - 1) + 1)
    .sort(() => 0.5 - Math.random())
}

function statisticCount() {
    const statistic = JSON.parse(localStorage.getItem('statistic'))
    if(i < checkingArr.length)  {
        statistic[currentPage][checkingArr[i]].correct = 1
        statistic[currentPage][checkingArr[i]].wrong = statisticChecker
        if(statistic[currentPage][checkingArr[i]].correct > 0 && statistic[currentPage][checkingArr[i]].wrong < 1) {
            statistic[currentPage][checkingArr[i]].errors = 0
        } else {
            statistic[currentPage][checkingArr[i]].errors = Math.round(100 - (statistic[currentPage][checkingArr[i]].correct / statistic[currentPage][checkingArr[i]].wrong * 100))
        }
    }
    localStorage.setItem('statistic', JSON.stringify(statistic))
}

export function clickCount() {
    if(checkboxMode.checked) {
        for(let j = 0; j < document.getElementsByClassName('cards-item-lesson').length; j += 1) {
            document.getElementsByClassName('cards-item-lesson')[j].addEventListener('click', () => {
                clicks += 1
                statisticChecker += 1
                statisticCount()
            })
        }
    }
}

export function isPlayingMode() {
    const cardItem = document.getElementsByClassName('cards-item')
    if(checkboxMode.checked) {
        for(let j = 0; j < cardItemOnGame.length; j += 1) {
            cardItemOnGame[j].classList.remove('train')
        }

        document.getElementsByClassName('mode-input-title')[0].innerHTML = 'play'
        gameButton[0].classList.remove('game-init-button--hidden')
        gameButton[0].classList.remove('hidden')
        gameButton[0].addEventListener('click', clickCount)

        for(let j = 0; j < cardItem.length; j += 1) {
            cardItem[j].classList.add('playing')
        }

    } else {
        document.getElementsByClassName('mode-input-title')[0].innerHTML = 'train'
        gameButton[0].classList.add('game-init-button--hidden')

        for(let j = 0; j < cardItem.length; j += 1) {
            cardItem[j].classList.remove('playing')
        }
    }
}

checkboxMode.addEventListener('click', () => {
    checkingArrInit()
    isPlayingMode()
    gameButton[0].innerHTML = 'Start the game!'
})

function errorInit() {
    if(checkboxMode.checked) {
        for(let j = 0; j < cardItemOnGame.length; j += 1) {
            cardItemOnGame[j].addEventListener('click', () => {
                if(cardItemOnGame[j].classList.contains('right')) {
                    correctSong[0].play()
                } else {
                    errorSong[0].play()
                }
            })
        }
    } 
}

function createGoldStar() {
    const newElem = document.createElement('img')
    newElem.src = 'assets/img/star-win.svg'
    newElem.classList.add('star')
    document.getElementsByClassName('stars')[0].appendChild(newElem)

    if(document.getElementsByClassName('star').length > 8) {
        document.getElementsByClassName('star')[0].parentNode.removeChild(document.getElementsByClassName('star')[0])
    }
}

function modalInit() {
    if(mistake === 0) {
        successSong[0].play()
        for (let j = 0; j < checkingArr.length; j += 1) {
            const newElem = document.createElement('img')
            newElem.classList.add('modal-stars-img')
            newElem.src = 'assets/img/star-win.svg'
            document.getElementsByClassName('modal-stars')[0].appendChild(newElem)
        }
    } else {
        document.getElementsByClassName('modal-picture')[0].src = 'assets/img/failure.jpg'
        document.getElementsByClassName('modal-title')[0].innerHTML = 'Failure'
        failureSong[0].play()
        for (let j = 0; j < correct - mistake; j += 1) {
            const newElem = document.createElement('img')
            newElem.classList.add('modal-stars-img')
            newElem.src = 'assets/img/star-win.svg'
            document.getElementsByClassName('modal-stars')[0].appendChild(newElem)
        }
        for (let j = 0; j < mistake; j += 1) {
            const newElem = document.createElement('img')
            newElem.classList.add('modal-stars-img')
            newElem.src = 'assets/img/star.svg'
            document.getElementsByClassName('modal-stars')[0].appendChild(newElem)
        }
    }
    setTimeout(() => {
        modal[0].classList.add('modal--closed')
        Array.from(document.getElementsByClassName('main-container')).map(it => it.parentNode.removeChild(it))
        Array.from(document.getElementsByClassName('star')).map(it => it.parentNode.removeChild(it))
        homePageInit()
        routerInit()
    }, 2500)
}

export function gameInit() {  
    if(i < checkingArr.length) {
        cardItemOnGame[checkingArr[i]].classList.add('right')
        cardItemVoice[checkingArr[i]].play()

        cardItemOnGame[checkingArr[i]].addEventListener('click', () => {
            correctSong[0].play()
            cardItemOnGame[checkingArr[i]].classList.add('done')
            if(cardItemOnGame[checkingArr[i]].classList.contains('done')) {
                if(i < checkingArr.length) {
                    i += 1
                    correct += 1
                    statisticChecker = -1
                    createGoldStar()
                
                    setTimeout(() => {
                        gameInit() 
                    },1000) 
                }
            } 
        })    
    }
    errorInit()
    if(i === checkingArr.length) {
        modal[0].classList.remove('modal--closed')
        modalInit()      
        i = 0     
        correct = 0
        clicks = 0
        statisticChecker = 0
        mistakesCheck = 0  
    }
}

function createMistakeStar() {
    const newElem = document.createElement('img')
    newElem.src = 'assets/img/star.svg'
    newElem.classList.add('star')
    document.getElementsByClassName('stars')[0].appendChild(newElem)

    if(document.getElementsByClassName('star').length > 8) {
        document.getElementsByClassName('star')[0].parentNode.removeChild(document.getElementsByClassName('star')[0])
    }
}

export function gameInitButtonStatus() {
    gameButton[0].innerHTML = '<div></div>'
    repeatButton[0].classList.remove('repeat-button--hidden')
}

export function repeat() {
    if(i < checkingArr.length) {
        cardItemVoice[checkingArr[i]].play()
    }
}

export function statisticDataInit() {
    if(localStorage.getItem('statistic') === null) {
        statisticData.map(it => {
            return it.map(el => {
                el.correct = 0
                el.wrong = 0
                el.errors = 0
                el.clicks = 0
            })
        })
        localStorage.setItem('statistic', JSON.stringify(statisticData))
    } 
}
statisticDataInit()

setInterval(() => {
    isPlayingMode()
    mistake = clicks - correct
    if(mistake > mistakesCheck) {
        createMistakeStar()
        mistakesCheck = mistake
    }
},1000)
