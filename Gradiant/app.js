// selection DOM et variables
const colorsContainer = document.querySelector('.colors')
let allColors = document.querySelectorAll('.colors input')
const angle = document.querySelector('input[type="range"]')
const buttons = document.querySelectorAll('.btns button')
const info = document.querySelector('.info')

const colorTab = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

// initialisation au chargement de la page avec les paramètres par défaut

allColors.forEach(elem => {

    elem.value = randomColorString()
})

gradiantGeneretor()

// générateur du gradient

function gradiantGeneretor(){

    let gradiantString = `${angle.value}deg`
    allColors = document.querySelectorAll('.colors input')
    
    allColors.forEach(elem => {
    
        elem.style.background = elem.value
        gradiantString = gradiantString.concat(`,${elem.value}`)

    })
    
    console.log(gradiantString)
    
    document.body.style.background = `linear-gradient(${gradiantString})`

}

// interaction utilisateur

//changement des couleurs
allColors.forEach(elem => {

    elem.addEventListener('input', e => {

        gradiantGeneretor()

    })
})

// changement orientation

angle.addEventListener('input', e => {

    gradiantGeneretor()

})

// ajout de couleur

buttons[0].addEventListener('click', e => {

    e.preventDefault()

    if(allColors.length < 10){

        let newInput = document.createElement('input')
        newInput.type = "text"
        newInput.maxLength = 7
        newInput.value = randomColorString()
        colorsContainer.appendChild(newInput)
        
        gradiantGeneretor()
    }
})

// suppression de couleur

buttons[1].addEventListener('click', e => {

    e.preventDefault()

    if(allColors.length >2){
        
        colorsContainer.removeChild(colorsContainer.lastElementChild)
        
        gradiantGeneretor()
    }
    else{
        alert('Il faut au moins deux couleurs')
    }
})

// couleurs random

function randomColorString(){

    let colorString = '#'

    for(let i = 0; i < 6; i++){
        let randomIndex = Math.floor(Math.random()*16)
        colorString += colorTab[randomIndex]
    }

    return colorString
}

buttons[2].addEventListener('click', e => {

    e.preventDefault()

    allColors.forEach(elem => {

        elem.value = randomColorString()
    })

    gradiantGeneretor()
    
})
