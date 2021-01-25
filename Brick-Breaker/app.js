//selection DOM
const level = document.querySelector('p')
const btn = document.querySelector('button')
const titre = document.querySelector('h1')
const score = document.querySelector('h2')

//init canvas
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
ctx.canvas.width = 750
ctx.canvas.height = 400
ctx.fillStyle = '#333'

//variables
let compteur = 0
let gameOver = false
let idJeu
let niv = 1
level.innerText = `Niveau ${niv}`


//
//
// définitions des classes
//
//

class Brique{
    constructor(x,y){
        this.x = x
        this.y = y
        this.largeur = 70
        this.hauteur = 20
    }

    dessine(){
        ctx.fillRect(this.x,this.y,this.largeur,this.hauteur)
    }
}

class Balle{
    constructor(){
        this.x = 375
        this.y = 375
        this.taille = 10
        this.directionX = 3
        this.directionY = -3
    }

    dessine(){
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.taille, 0 , 2*Math.PI, true)
        ctx.fill()
    }
}

class Joueur{
    constructor(){
        this.x = 325
        this.y = 385
        this.largeur = 100
        this.hauteur = 10
    }

    dessine(){
        ctx.fillRect(this.x, this.y, this.largeur, this.hauteur)
    }
}


//
//
// création de l'espace de jeu
//
//

// créations des briques

let briques = []

function creationBriques(){
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 5; j++){
            briques.push(new Array)
            briques[i][j] = new Brique(40+(i*85),30+(j*30))
            briques[i][j].dessine()        
        }
    }
}

creationBriques()


// création joueur et balle

const baBalle = new Balle()

baBalle.dessine()

const joueur = new Joueur()

joueur.dessine()


//
//
//lancement d'une partie au clic
//
//

btn.addEventListener('click', () => {

    btn.style.display = 'none'    
    play()
})


//
//
// gestion d'une partie
//
//

function play(){

    idJeu = requestAnimationFrame(play)

    ctx.clearRect(0,0,innerWidth,innerHeight)


    //refresh
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 5; j++){
            if(briques[i][j] !== null && briques[i][j] !== undefined){                
                briques[i][j].dessine()
            }
        }
    }
    //gestion collision de la balle avec les bords
    if(baBalle.x + baBalle.taille >= canvas.width || (baBalle.x - baBalle.taille) <= 0){
        baBalle.directionX = -baBalle.directionX
    }
    if((baBalle.y - baBalle.taille) <= 0){
        baBalle.directionY = -baBalle.directionY
    }
    //gestion bord collision bord inférieur joueur & game over
    if(baBalle.y + baBalle.taille + baBalle.directionY >= canvas.height){
        //gestion collision avec le joueur
        if((baBalle.x + baBalle.taille) >= joueur.x && (baBalle.x - baBalle.taille) <= (joueur.x + joueur.largeur) && ((baBalle.y + baBalle.taille) >= joueur.y)){
            if(gameOver === false){
                baBalle.directionY = -baBalle.directionY
            }
        }
        else{
            score.innerText = 'Game Over'
            gameOver = true
            cancelAnimationFrame(idJeu)
            level.innerText = 'Cliquez pour pouvoir rejouer !'
            canvas.addEventListener('click', () => {
                location.reload()
            })
        }
    }


    //gestion collision avec les briques    
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 5; j++){ 
            if(briques[i][j] !== null && briques[i][j] !== undefined){
                let Xinf = briques[i][j].x - baBalle.taille
                let Xsup = briques[i][j].x + briques[i][j].largeur + baBalle.taille
                let Yinf = briques[i][j].y - baBalle.taille
                let Ysup = briques[i][j].y + briques[i][j].hauteur + baBalle.taille
                if(baBalle.x >= Xinf && baBalle.x <= Xsup && baBalle.y >= Yinf && baBalle.y <= Ysup){
                    briques[i][j] = null
                    compteur++;
                    score.innerText = `Score : ${compteur}`
                    if((baBalle.x - baBalle.directionX) < Xinf || baBalle.x - baBalle.directionX > Xsup){
                        baBalle.directionX = -baBalle.directionX
                    }
                    if((baBalle.y - baBalle.directionY) < Yinf || baBalle.y - baBalle.directionY > Ysup){
                        baBalle.directionY = -baBalle.directionY
                    }
                } 
            }
        }
    }

    //gestion déplacement du joueur
    document.addEventListener('mousemove', e => {
        if(gameOver === false){
            joueur.x = e.clientX - canvas.offsetLeft - joueur.largeur/2
            joueur.dessine()
        }
    })


    //mise à jour des coordonnées de la balle        
    if(gameOver === false){
        baBalle.dessine()
        joueur.dessine()

        baBalle.x += baBalle.directionX
        baBalle.y += baBalle.directionY
    }

    //augmentation de niveau
    if(compteur%40 === 0 && compteur/40 > 0){
        niv++;
        level.innerText = `Niveau ${niv}`
        if(baBalle.directionX > 0){
            baBalle.directionX += 1
        }
        if(baBalle.directionX < 0){
            baBalle.directionX -= 1
        }
        if(baBalle.directionY > 0){
            baBalle.directionY += 1
        }
        if(baBalle.directionY < 0){
            baBalle.directionY -= 1
        }
        creationBriques()    
    }
}
