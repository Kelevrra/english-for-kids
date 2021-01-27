const checkbox = document.getElementById('light')

function checkboxPosition() {
    if(!localStorage.getItem('key')) {
        checkbox.checked = false
    }
    if(localStorage.getItem('key')) {
        checkbox.checked = true
    }
}

function checkboxStatus() {
    if(checkbox.checked) {
        document.getElementsByClassName('header')[0].classList.add('header--dark')
        document.getElementsByClassName('body')[0].style.background = '#232323'
        document.getElementsByClassName('body')[0].style.transition = '.3s'
        document.getElementsByClassName('body')[0].classList.add('body--dark')
        document.getElementsByClassName('main')[0].classList.add('dark')
     
        localStorage.removeItem('key')
        localStorage.setItem('key', true)
    } else {
        document.getElementsByClassName('header')[0].classList.remove('header--dark')
        document.getElementsByClassName('body')[0].style.background = 'white'
        document.getElementsByClassName('body')[0].classList.remove('body--dark')
        document.getElementsByClassName('main')[0].classList.remove('dark')

        localStorage.removeItem('key')
    }
}

checkbox.addEventListener('change', checkboxStatus)
checkboxPosition()
checkboxStatus()
