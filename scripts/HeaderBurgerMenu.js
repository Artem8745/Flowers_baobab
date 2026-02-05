export default class headerMenu {
   constructor() {
      this.buttonMenu = document.querySelector('.menu-mobile-burger-button')
      this.mobileMenu = document.querySelector('.menu-mobile')

      this.buttonMenu.addEventListener('click', () => {
         if (this.mobileMenu.classList.contains('_active') == false) {
            this.open()
         } else {
            this.close()
         }
      })
   }

   open() {
      this.mobileMenu.classList.add('_active')
      this.buttonMenu.classList.add('_active')
   }

   close() {
      this.mobileMenu.classList.remove('_active')
      this.buttonMenu.classList.remove('_active')
   }
}

const mobileMenu = new headerMenu()
