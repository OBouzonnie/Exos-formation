import septJoursCourants from "./Utilitaire/gestionTemps.js"

const CLEFAPI = "a86880722ee88ce81cd0657145b3f991"

//constante pour les calcul horaires
let heureActuelle = new Date().getHours()
console.log(heureActuelle)
let minuteActuelle = new Date().getMinutes()
let timeStampActuel = new Date().getTime()


//selection des élements du DOM
const contentInfo = document.querySelector('.content-info')
const logoMeteo = document.querySelector('.logo-meteo')
const heure = document.querySelectorAll('.hour-value')
const tempPourH = document.querySelectorAll('.hour-temp')
const jour = document.querySelectorAll('.day-value')
const tempPourJ = document.querySelectorAll('.day-temp')
const chargement = document.querySelector('.overlay-icone-chargement')


//geolocalisation
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        console.log(position)
        AppelAPI(long,lat)

    }, () => alert(`Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner, veuillez l'activer !`))
}

//call API et gestion des données reçues
function AppelAPI(long,lat){

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
    .then((reponse) => {
        return reponse.json()
    })
    .then((data) => {

        chargement.classList.add('disparition')


        //calcul des levés et couchés de soleil
        let heureLever = Math.round(heureActuelle + minuteActuelle/60 + ((data.current.sunrise - Math.round(timeStampActuel/1000))/3600))
        let heureCoucher = Math.round(heureActuelle + minuteActuelle/60 + ((data.current.sunset - Math.round(timeStampActuel/1000))/3600))

        // affichage de la météo du jour dans les paragraphes de la div .content-info
        contentInfo.firstChild.textContent = data.current.weather[0].description.charAt(0).toUpperCase().concat(data.current.weather[0].description.slice(1)) //description du temps capitalized
        contentInfo.children[1].textContent = `Température : ${Math.round(data.current.temp)}°` // température
        contentInfo.children[2].textContent = data.timezone // geolocalisation
        contentInfo.children[3].textContent = `🌞 : ${heureLever}h` //levé du soleil
        contentInfo.lastChild.textContent = `🌙 : ${heureCoucher}h` // couché du soleil

        // icone svg adéquate affichée dans .logo-meteo
        if(heureActuelle >= heureLever && heureActuelle <= heureCoucher){
            logoMeteo.setAttribute('src', `ressources/jour/${data.current.weather[0].icon}.svg`)
        }
        else{
            logoMeteo.setAttribute('src', `ressources/nuit/${data.current.weather[0].icon}.svg`)
        }

        // Affichage de la température par pallier de 3h dans les div .hour-bloc et Affichage des températures pour les 7 prochains jours

        for(let i = 0; i < 7; i++){
            let heureIncr = heureActuelle + 3*(i+1)
            if(heureIncr >= 24){
                heureIncr = heureIncr - 24
            } 
            heure[i].textContent = `${heureIncr}h`
            tempPourH[i].textContent = `${Math.round(data.hourly[3*(i+1)].temp)}°`
            jour[i].textContent = septJoursCourants[i].slice(0,3)
            tempPourJ[i].textContent = `${Math.round(data.daily[i+1].temp.day)}°`
        }
    })
}

