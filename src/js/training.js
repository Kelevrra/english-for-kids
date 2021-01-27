import {currentPage} from './pages'

const voice = document.getElementsByClassName('audio-voice')
const cardFront = document.getElementsByClassName('front')
const cardBack = document.getElementsByClassName('back')
const cardItem = document.getElementsByClassName('cards-item-lesson')
const turnCardButton = document.getElementsByClassName('turn-item-btn')
// let click = 0

function clicksWatch(i) {
    const statistic = JSON.parse(localStorage.getItem('statistic'))
    statistic[currentPage][i].clicks += 1
    // click = 0
    localStorage.setItem('statistic', JSON.stringify(statistic))
}

export function playVoice() {
    for(let i = 0; i < cardFront.length; i += 1) {
        cardFront[i].addEventListener('click', () => {
            if(cardItem[i].classList.contains('train')) {
                voice[i].play()
                clicksWatch(i)
            }
        })
    }
}

export function turnCard() {
    for(let i = 0; i < turnCardButton.length; i += 1) {
        turnCardButton[i].addEventListener('click', () => {
            if(cardItem[i].classList.contains('flip-container--hover')) {
                cardItem[i].classList.remove('flip-container--hover');
            } else {
                cardItem[i].classList.add('flip-container--hover');
            }
        })
    }
    for(let i = 0; i < turnCardButton.length; i += 1) {
        cardBack[i].addEventListener('mouseout', () => {
            setTimeout(() => {
                cardItem[i].classList.remove('flip-container--hover');
            }, 1000)
        })
    }
}
