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
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.updateValueTouch()
            this.updateToggle()

            this.filterWrapper.oninput = (event) => {
                this.updateGapToggleTouch(event)
                this.updateTrack(event)
            }

            this.upgradeInputTouch()
        } else {
            this.filterWrapper.oninput = () => {
                this.updateValue()
                this.updateToggle()
                this.updateTrack()
                this.updateGapToggle()
                this.upgradeInput()
            }
        }

        console.log(
            // "minValue:", Number(this.minValue),
            // "maxValue:", Number(this.maxValue),
            // "minToggle:", Number(this.minToggle.value),
            // "maxToggle:", Number(this.maxToggle.value),
            // "maxRange:", Number(this.maxRange),
            // "minRange:", Number(this.minRange),
            // "inputMin:", Number(this.inputMin.value),
            // "inputMax:", Number(this.inputMax.value)
        )

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

    updateValueTouch() {
        this.maxToggle.addEventListener('touchmove', () => {
            if (this.maxValue - this.minValue <= this.lenToggleGap) {
                this.minToggle.value = this.maxValue - this.lenToggleGap
            }
        })
        
        this.maxToggle.addEventListener('touchmove', () => {
            this.minValue = Number(this.minToggle.value)
            this.maxValue = Number(this.maxToggle.value)

            this.inputMin.value = Number(this.minValue)
            this.inputMax.value = Number(this.maxValue)
        })

        this.minToggle.addEventListener('touchmove', () => {
            this.minValue = Number(this.minToggle.value)
            this.maxValue = Number(this.maxToggle.value)

            this.inputMin.value = Number(this.minValue)
            this.inputMax.value = Number(this.maxValue)
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
        if (this.maxValue - this.minValue < this.lenToggleGap) {
            if (this.inputMin === document.activeElement) {
                if (this.maxRange < this.inputMax) {
                    this.inputMax.value = Number(this.minValue)
                    this.inputMin.value = Number(this.inputMax.value - this.lenToggleGap)
                } else {
                    this.inputMax.value = Number(this.minValue + this.lenToggleGap)
                }
            } else {
                this.inputMin.value = this.maxValue - this.lenToggleGap
            }
        }
    }

    upgradeInputTouch() {
        this.inputMin.addEventListener('input', () => {
            this.minToggle.value = this.inputMin.value
            this.minValue = this.inputMin.value

            if (this.maxValue - this.minValue <= this.lenToggleGap) {
                this.maxValue = Number(this.inputMin.value + Number(this.lenToggleGap))
                this.inputMax.value = Number(this.inputMin.value + this.lenToggleGap)

                this.inputMin.value = Number(this.minToggle.value)
            }

            this.checkNumberAccuracy()
        })

        this.inputMax.addEventListener('input', () => {
            this.maxToggle.value = Number(this.inputMax.value)
            this.maxValue = this.maxToggle.value
            this.inputMax.value = this.maxToggle.value

            this.checkNumberAccuracy()
        })
    }

    checkNumberAccuracy() {
        if (Number(this.inputMin.value) >= this.maxRange) {
            this.inputMin.value = this.inputMin.value - this.lenToggleGap
            this.minValue = this.inputMin.value - this.lenToggleGap
            this.minToggle.value = this.inputMin.value - this.lenToggleGap
        }

        if (Number(this.inputMin.value >= Number(this.inputMax.value))) {
            this.inputMin.value = Number(this.inputMax.value) - this.lenToggleGap
            this.minValue = Number(this.inputMax.value) - this.lenToggleGap
            this.minToggle.value = Number(this.inputMax.value) - this.lenToggleGap
        }

        if (Number(this.inputMax.value) > this.maxRange) {
            this.inputMax.value = this.maxRange
            this.maxValue = this.maxRange
            this.maxToggle.value = this.maxRange
        }
    }
}

const rangeCatalogDefault = new rangeCatalog()