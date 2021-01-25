const searchInput = document.querySelector('#search')
const listePoke = document.querySelector('.liste-poke')
const chargement = document.querySelector('.loader')
let allPokemon = []
let tabFinal = []
const types = {
    grass: '#78c850',
	ground: '#E2BF65',
	dragon: '#6F35FC',
	fire: '#F58271',
	electric: '#F7D02C',
	fairy: '#D685AD',
	poison: '#966DA3',
	bug: '#B3F594',
	water: '#6390F0',
	normal: '#D9D5D8',
	psychic: '#F95587',
	flying: '#A98FF3',
	fighting: '#C25956',
    rock: '#B6A136',
    ghost: '#735797',
    ice: '#96D9D6'
};

// Appel API

function fetchPokemonBase(){

    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(reponse => reponse.json())
    .then(allPoke => {
        allPoke.results.forEach((pokemon) => {
            fetchPokemonComplet(pokemon)
        })
    })
}

function fetchPokemonComplet(pokemon){

    let objPokemonFull = {}
    let url = pokemon.url 
    let nameP = pokemon.name 

    fetch(url)
    .then(reponse => reponse.json())
    .then((pokeData) => {
        objPokemonFull.pic = pokeData.sprites.front_default
        objPokemonFull.type = pokeData.types[0].type.name
    })

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
    .then(reponse => reponse.json())
    .then(pokeData => {
        objPokemonFull.name = pokeData.names[4].name
        objPokemonFull.id = pokeData.id
        allPokemon.push(objPokemonFull)

        if(allPokemon.length === 151){
            
            tabFinal = allPokemon.sort((a,b) => {
                return a.id - b.id
            }).slice(0,21)

            createCard(tabFinal)

            chargement.style.display = "none"
        }
    })
}

// Création des cartes

function createCard(arr){

    for(let i = 0; i < arr.length; i++){

        const carte = document.createElement('li')
        let couleur = types[arr[i].type]
        carte.style.background = couleur
        const txtCarte = document.createElement('h5')
        txtCarte.innerText = arr[i].name
        const idCarte = document.createElement('p')
        idCarte.innerText = `ID# ${arr[i].id}`
        const imgCarte = document.createElement('img')
        imgCarte.src = arr[i].pic 

        carte.appendChild(imgCarte)
        carte.appendChild(txtCarte)
        carte.appendChild(idCarte)

        listePoke.appendChild(carte)
    }
}

fetchPokemonBase()

// scroll infini

window.addEventListener('scroll', () => {

    const {scrollTop, scrollHeight, clientHeight} = document.documentElement
    console.log(scrollTop, scrollHeight, clientHeight)

    if(clientHeight + scrollTop >= scrollHeight -20){
        addPoke(6)
    }
})

// Ajout de carte au scroll

let index = 21

function addPoke(num){

    if(index > 151) {
        return
    }
    const arrToAdd = allPokemon.slice(index,index+num)
    createCard(arrToAdd)
    index += num
}

// recherche

searchInput.addEventListener('keyup', recherche)

function recherche(){

    if(index < 151) {
        addPoke(130)
    }

    let filter, allLi, titleValue, allTitles
    filter = searchInput.value.toUpperCase()
    allLi = document.querySelectorAll('li')
    allTitles = document.querySelectorAll('li > h5')

    for(i = 0; i < allLi.length; i++){

        titleValue = allTitles[i].innerText

        if(titleValue.toUpperCase().indexOf(filter) > -1){
            allLi[i].style.display = "flex"
        }
        else{
            allLi[i].style.display = "none"
        }
    }
}

// Animation input

searchInput.addEventListener('input', e => {

    if(e.target.value !== ""){
        e.target.parentNode.classList.add('active-input')
    }
    else if(e.target.value === ""){
        e.target.parentNode.classList.remove('active-input')
    }
})

