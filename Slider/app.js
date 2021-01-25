//selection DOM
const imageCarousel = document.querySelectorAll('img')
const btnCarousel = document.querySelectorAll('button')
const btnImage = document.querySelectorAll('.select')

let index = 0


//style actif/inactif

function active(){
    imageCarousel[index].style.display = 'block'
    btnImage[index].style.background = 'midnightblue'
}

function inactive(){
    imageCarousel[index].style.display = 'none'
    btnImage[index].style.background = 'transparent'
}

//slide previous/next

function previous(){
    if(index === 0){
        inactive()
        index = imageCarousel.length - 1
        active()
    }else{
        inactive()
        index -= 1
        active()
    }
}

function next(){
    if(index === imageCarousel.length - 1){
        inactive()
        index = 0
        active()        
    }else{
        inactive()
        index += 1
        active()        
    }
}


// affichage de l'image avec le sélecteur

for(let i = 0; i < btnImage.length; i++){
    btnImage[i].addEventListener('click', () => {
        inactive()
        index = i
        active()
    })
}



// carousel

btnCarousel[0].addEventListener('click', previous)

btnCarousel[1].addEventListener('click', next)

// carousel avec les touches directionnelles

function keyPressed(e){
    if(e.keyCode === 37){
        previous()
    }
    if(e.keyCode === 39){
        next()
    }
}

document.addEventListener('keydown',keyPressed)