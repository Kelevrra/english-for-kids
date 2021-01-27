import {navigationItemsArray} from '../data/navigation'

const btn = document.getElementById('menu-btn')
const navList = document.getElementById('nav-list')
const navigation = document.getElementById('navigation')

const isMenu = () => {
    if(navList.classList.contains('navigation-list--closed')) {
        navList.classList.remove('navigation-list--closed');
        navList.classList.add('navigation-list--opened');

        btn.classList.remove('header-button--closed');
        btn.classList.add('header-button--opened');
    } else {
        navList.classList.add('navigation-list--closed');
        navList.classList.remove('navigation-list--opened');
        
        btn.classList.remove('header-button--opened');
        btn.classList.add('header-button--closed');
    }
}

btn.addEventListener('click', isMenu)
btn.addEventListener('blur', isMenu)

function navigationMenuInit() {
    const navMenu = document.createElement('ul')
    navMenu.classList.add('navigation-list')
    navMenu.classList.add('navigation-list--closed')
    navMenu.id = 'nav-list'
    navigation.appendChild(navMenu)

    for (let i = 0; i < navigationItemsArray.length; i += 1) {
        const newElem = document.createElement('li')
        const listItem = newElem
        newElem.classList.add('navigation-item')
        newElem.innerHTML = '<a class="navigation-link" href="#"></a>'
        navList.appendChild(newElem)
        if(navigationItemsArray[i].flag) {
            listItem.classList.add('navigation-item--active')
        } else {
        listItem.classList.remove('navigation-item--active')
        }
    }
}
navigationMenuInit()

const navLinks = document.getElementsByClassName('navigation-link') 

for (let i = 0; i < navigationItemsArray.length; i += 1) {
    navLinks[i].innerText = navigationItemsArray[i].name
    navLinks[i].href = navigationItemsArray[i].url
}
