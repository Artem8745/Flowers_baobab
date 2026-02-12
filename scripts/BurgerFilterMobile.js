export default class burgerFilterMobile {
    constructor () {
        this.buttonBurger = document.querySelectorAll('.catalog__filters-mobile-button')
        this.catalogFilters = document.querySelector('.filters')

        this.init()
    }

    init() {
        this.buttonBurger.forEach(button => {
            button.onclick = () => {
                if (this.catalogFilters.style.left == '0px') {
                    this.catalogFilters.style.left = 'calc(-100% - 20px)'
                    button.classList.remove('__active')
                } else {
                    this.catalogFilters.style.left = '0px'
                    button.classList.add('__active')
                    this.openTopMenu()
                }
            }
        })
    }

    openTopMenu() {
        console.log(this.catalogFiltersWrapper)
    }
}

const filterMobile = new burgerFilterMobile()