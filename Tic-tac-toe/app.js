const cellules = document.querySelectorAll('.cellule')
const tourInfo = document.querySelector('.tour')

const grille = []
let index = 0
let tour = 1
let verrou = false

//copie de la grille en JS
for(let i = 0; i < 3; i++){
    grille[i] = []
    for(let j = 0; j < 3; j++){
        grille[i][j] = cellules[index]
        index++;
    }
}

// ecoute des clics des joueurs
for(let k = 0; k < cellules.length; k++){
    cellules[k].addEventListener('click', e => {
        e.preventDefault()
        if(!verrou) jouerSonTour(cellules[k])
    })
}

function jouerSonTour(elem){
    if(elem.innerText === ""){
        if(tour%2 !== 0){
            elem.innerText = 'X'
            tourInfo.innerText = 'Au tour de O'        
        }
        else{
            elem.innerText = 'O'
            tourInfo.innerText = 'Au tour de X'        
        }
        finPartie()
        tour++;
    }
}

function victoire(joueur){
    tourInfo.innerText = `Victoire de ${joueur}`
    verrou = true
}

function finPartie(){    
    for(let i = 0; i < 3; i++){ 
        if(grille[i][0].innerText === grille[i][1].innerText && grille[i][1].innerText === grille[i][2].innerText && grille[i][0].innerText !== "") 
        victoire(grille[i][0].innerText)
        
        if(grille[0][i].innerText === grille[1][i].innerText && grille[1][i].innerText === grille[2][i].innerText && grille[0][i].innerText !== "") 
        victoire(grille[0][i].innerText)
    }
    if(grille[0][0].innerText === grille[1][1].innerText && grille[1][1].innerText === grille[2][2].innerText && grille[0][0].innerText !== "") 
    victoire(grille[0][0].innerText)

    if(grille[2][0].innerText === grille[1][1].innerText && grille[1][1].innerText === grille[0][2].innerText && grille[2][0].innerText !== "") 
    victoire(grille[2][0].innerText)

    if(tour === 9) tourInfo.innerText = 'Match nul !'

    // pour rejouer
    if(verrou){
        setTimeout( () => {
            location.reload()
        }, 1500)
    }
    
}