export default class rangeCatalog {
    constructor() {
        this.filterWrapper = document.querySelector('.filters-price-range')
        this.track = document.querySelector('.filters-price-range__track')
        this.minToggle = document.querySelector('.filters-price-range__sidebar-min')
        this.maxToggle = document.querySelector('.filters-price-range__sidebar-max')
        this.maxRange = this.maxToggle.max
        this.minRange = this.minToggle.min
        this.lenToggleGap = 1

        this.inputMin = document.querySelector('.filters-price-range__min-price')
        this.inputMax = document.querySelector('.filters-price-range__max-price')

        this.init()
    }

    init() {
        this.filterWrapper.addEventListener('click', (element) => {
            if (element.target.classList.contains('filters-price-range__sidebar-min') == true) {
                this.updateValue()
            } else if (element.target.classList.contains('filters-price-range__sidebar-max') == true) {
                this.updateValue()
            }
        })

        this.filterWrapper.oninput = () => {
            this.updateValue()
            this.updateToggle()
            this.updateTrack()
            this.updateGapToggle()
            this.upgradeInput()
        }

        this.filterWrapper.ontouchmove = () => {
            this.updateValue()
            this.updateToggle()
            this.updateTrack()
            this.updateGapToggle()
            this.upgradeInput()
        }

        this.updateValue()
    }

    updateValue() {
        if (this.minToggle === document.activeElement | this.maxToggle === document.activeElement) {
            this.minValue = Number(this.minToggle.value)
            this.maxValue = Number(this.maxToggle.value)
        } else {
            this.minValue = Number(document.querySelector('.filters-price-range__min-price').value)
            this.maxValue = Number(document.querySelector('.filters-price-range__max-price').value)
        }

        if (this.minValue > this.maxRange) {
            this.minValue = this.maxRange
        }
        
        if (this.maxValue > this.maxRange) {
            this.maxValue = this.maxRange
        }

        this.inputMin.value = Number(this.minValue)
        this.inputMax.value = Number(this.maxValue)
    }

    updateTrack() {
        const minPercent = this.minValue / this.maxRange * 100
        const maxPercent = 100 - this.maxValue / this.maxRange * 100

        this.track.childNodes[1].style.left = `${minPercent}%`
        this.track.childNodes[1].style.right = `${maxPercent}%`
    }

    updateToggle() {
        this.minToggle.value = this.minValue
        this.maxToggle.value = this.maxValue
    }

    updateGapToggle() {
        if (this.maxValue - this.minValue < this.lenToggleGap) {
            if (this.maxToggle === document.activeElement) {
                this.minToggle.value = this.maxValue - this.lenToggleGap
            } else {
                this.maxToggle.value = this.minValue + this.lenToggleGap
            }
        }
    }

    upgradeInput() {
        if (this.maxValue - this.minValue < this.lenToggleGap) {
            if (this.inputMin === document.activeElement) {
                if (this.maxRange < this.inputMax) {
                    this.inputMax.value = this.minValue
                    this.inputMin.value = this.inputMax.value - this.lenToggleGap
                } else {
                    this.inputMax.value = Number(this.minValue + this.lenToggleGap)
                }
            } else {
                this.inputMin.value = this.maxValue - this.lenToggleGap
            }
        }
    }
}

const rangeCatalogDefault = new rangeCatalog()