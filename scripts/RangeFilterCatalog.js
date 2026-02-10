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
        this.inputMinValue = Number(this.inputMin.value)
        this.inputMaxValue = Number(this.inputMax.value)

        this.init()
    }

    init() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.updateValueTouch()
            this.updateToggle()
            this.upgradeInput()

            this.filterWrapper.oninput = (event) => {
                this.updateGapToggleTouch(event)
                this.updateTrack(event)
                this.checkNumberAccuracy()

                // console.log(
                //     "minValue:", Number(this.minValue),
                //     "maxValue:", Number(this.maxValue),
                //     "minToggle:", Number(this.minToggle.value),
                //     "maxToggle:", Number(this.maxToggle.value),
                //     "maxRange:", Number(this.maxRange),
                //     "minRange:", Number(this.minRange),
                //     "inputMin:", Number(this.inputMinValue),
                //     "inputMax:", Number(this.inputMaxValue)
                // )
            }
        } else {
            this.filterWrapper.oninput = () => {
                this.updateValue()
                this.updateToggle()
                this.updateTrack()
                this.updateGapToggle()
                this.upgradeInput()
                this.checkNumberAccuracy()
                this.updateInputData()
            }
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

        this.inputMinValue = this.minValue
        this.inputMaxValue = this.maxValue
    }

    updateValueTouch() {
        this.maxToggle.addEventListener('touchmove', () => {
            if (this.maxValue - this.minValue <= this.lenToggleGap) {
                this.minToggle.value = this.maxValue - this.lenToggleGap
            }

            this.updateInputData()
        })
        
        this.maxToggle.addEventListener('touchmove', () => {
            this.minValue = Number(this.minToggle.value)
            this.maxValue = Number(this.maxToggle.value)

            this.inputMinValue = this.minValue
            this.inputMaxValue = this.maxValue

            this.updateInputData()
        })

        this.minToggle.addEventListener('touchmove', () => {
            this.minValue = Number(this.minToggle.value)
            this.maxValue = Number(this.maxToggle.value)

            this.inputMinValue = this.minValue
            this.inputMaxValue = this.maxValue

            this.updateInputData()
        })
    }

    updateTrack() {
        const minPercent = this.minValue / this.maxRange * 100
        const maxPercent = 100 - this.maxValue / this.maxRange * 100

        this.track.childNodes[1].style.left = `${minPercent}%`
        this.track.childNodes[1].style.right = `${maxPercent}%`
    }

    updateToggle() {
        if (this.inputMin === document.activeElement | this.inputMax === document.activeElement) {
            this.minToggle.value = this.minValue
            this.maxToggle.value = this.maxValue
        }
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

    updateGapToggleTouch(event) {
        if (this.maxValue - this.minValue <= this.lenToggleGap) {
            if (event.target.classList.contains('filters-price-range__sidebar-min') == true) {
                this.maxToggle.value = this.minValue + this.lenToggleGap
            } else {
                this.minToggle.value = this.maxValue - this.lenToggleGap
            }
        }

        this.checkNumberAccuracy()
    }

    upgradeInput() {
        this.inputMin.addEventListener('input', () => {
            this.inputMinValue = Number(this.inputMin.value)

            this.minToggle.value = this.inputMin.value
            this.minValue = this.inputMinValue

            if (this.maxValue - this.minValue <= this.lenToggleGap) {
                this.maxValue = this.inputMinValue + this.lenToggleGap
                this.inputMaxValue = this.inputMinValue + this.lenToggleGap
                this.maxToggle.value = this.inputMinValue + this.lenToggleGap

                this.inputMinValue = Number(this.minToggle.value)
            }

            this.checkNumberAccuracy()
            this.updateInputData()
        })

        this.inputMax.addEventListener('input', () => {
            this.inputMaxValue = Number(this.inputMax.value)

            this.maxToggle.value = this.inputMaxValue
            this.maxValue = this.inputMaxValue
            this.inputMaxValue = this.inputMaxValue

            this.checkNumberAccuracy()
            this.updateInputData()
        })
    }

    checkNumberAccuracy() {
        if (this.inputMinValue >= this.maxRange) {
            this.inputMinValue = this.inputMinValue - this.lenToggleGap
            this.minValue = this.inputMinValue - this.lenToggleGap
            this.minToggle.value = this.inputMinValue - this.lenToggleGap
        }

        if (this.inputMinValue >= this.inputMaxValue) {
            this.inputMinValue = this.inputMaxValue - this.lenToggleGap
            this.minValue = this.inputMaxValue - this.lenToggleGap
            this.minToggle.value = this.inputMaxValue - this.lenToggleGap
        }

        if (this.inputMaxValue > this.maxRange) {
            this.inputMaxValue = this.maxRange
            this.maxValue = this.maxRange
            this.maxToggle.value = this.maxRange
        }
    }

    updateInputData() {
        this.inputMin.value = this.inputMinValue
        this.inputMax.value = this.inputMaxValue
    }
}

const rangeCatalogDefault = new rangeCatalog()