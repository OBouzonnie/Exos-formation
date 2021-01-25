//selection DOM

let base = document.querySelector('.base')
const choix = document.querySelectorAll('.choix')
const poubelle = document.querySelector('.poubelle')
const caseEntrante = document.querySelector('.case-entrante')


//initialisation

let index = 1;
let tracking = 0

base.style.backgroundImage = `url('https://loremflickr.com/320/240?random=${index}')`


//activation du drop

choix.forEach( elem => {
    elem.addEventListener('dragenter', (e) => {
        e.preventDefault()
    })
})

choix.forEach( elem => {
    elem.addEventListener('dragover', (e) => {
        e.preventDefault()
    })
})

choix.forEach( elem => {
    elem.addEventListener('drop', () => {
        validation(elem)
    })
})


// poubelle

function trash(){
    index++;
    base.style.backgroundImage = `url('https://loremflickr.com/320/240?random=${index}')`
}

poubelle.addEventListener('dragenter', (e) => {
    e.preventDefault()
})

poubelle.addEventListener('dragover', (e) => {
    e.preventDefault()
})

poubelle.addEventListener('drop', (e) => {    
    trash()
})


// tracking du nombre de choix effectué

function trackChoice(){
    if(tracking === 3){
        setTimeout( () => {
            alert('Sélection terminée')
        }, 1)
    }
}


// validation d'une photo

function validation(elem){
    if(!elem.innerHTML){
        const validation = document.createElement('div')
        validation.classList.add('validated')
        elem.appendChild(validation)
        validation.style.backgroundImage = `url('https://loremflickr.com/320/240?random=${index}')`
        index++;
        base.style.backgroundImage = `url('https://loremflickr.com/320/240?random=${index}')`
        tracking++;
        trackChoice()            
    }
}


// sélection par double-clic

choix.forEach( elem => {
    elem.addEventListener('dblclick', () => {
        validation(elem)
    })
})