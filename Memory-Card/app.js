const allCard = document.querySelectorAll('.carte')
const allDouble = document.querySelectorAll('.double-face')

let premiereCarte, secondeCarte
let lock = false

allCard.forEach( elem => {
    elem.style.order = Math.floor(Math.random() * 12)
})

allDouble.forEach( elem => {
    elem.addEventListener('click', retourneCarte)
})

function retourneCarte(){
    if(lock === false){
        if(!premiereCarte || !secondeCarte){
            this.classList.add('active')
            if(!premiereCarte){
                premiereCarte = this
            }
            else if(!secondeCarte){
                secondeCarte = this
                compare()
            }
        }
    }
}

function compare(){
    lock = true
    if(premiereCarte.parentNode.getAttribute('data-attr') ===
       secondeCarte.parentNode.getAttribute('data-attr')){
        setTimeout( () => {
            premiereCarte = null
            secondeCarte = null
            lock = false
        }, 1) 
    }
    else{
        setTimeout( () => {
            premiereCarte.classList.remove('active')
            secondeCarte.classList.remove('active')
            premiereCarte = null
            secondeCarte = null
            lock = false                       
        }, 1500)
        
    }  
}