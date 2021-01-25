//
//
//selection DOM et variables
//
//

import tabQuote from './quote.js'

const tps = document.getElementById('tps')
const score = document.getElementById('score')
const phrase = document.getElementById('phraseAEcrire')
const saisieJoueur = document.querySelector('textarea')
const btn = document.querySelector('button')

let chrono, scoreCount

//
//
// fonctions
//
//


function chronometre(){

    tps.innerText = `Temps : ${chrono}`
    chrono--;

    const interChrono = setInterval( () => {
        if(chrono <= 0){
            clearTimeout(interChrono)
            btn.removeEventListener('click',partieEnCours)
            btn.style.display = 'block'
            btn.innerText = 'Rejouer'
            btn.addEventListener('click', () => {
                location.reload()
            })
        }
        tps.innerText = `Temps : ${chrono}`
        chrono--;        
    }, 1000)
}



function afficherPhrase(){

    let index = Math.floor(Math.random() * tabQuote.length)
    let quote = tabQuote[index]
    console.log(quote)
    for(let i = 0; i < quote.length; i++){
        let charSpan = document.createElement('span')
        charSpan.innerText = quote.charAt(i)
        phrase.appendChild(charSpan)
    }
}


function analyseSaisie(){ 
    
    for(let i = 0; i < saisieJoueur.value.length; i++){
        if(saisieJoueur.value.charAt(i) === phrase.children[i].innerText){
            phrase.children[i].style.color = 'green'
        }
        else{
            phrase.children[i].style.color = 'red'
            phrase.children[i].style.textDecoration = 'underline'
        }
    }
    
    if(phrase.innerText === saisieJoueur.value){
        scoreCount += phrase.innerText.length
        score.innerText = `Score : ${scoreCount}`
        phrase.innerHTML = ""
        saisieJoueur.value = ""
        afficherPhrase()
    }
}

//
//
// jeu
//
//

function partieEnCours(){

    chrono = 60
    scoreCount = 0

    btn.style.display = 'none'

    chronometre()
    afficherPhrase()
    
    saisieJoueur.addEventListener('input', analyseSaisie)
}

btn.addEventListener('click',partieEnCours)

