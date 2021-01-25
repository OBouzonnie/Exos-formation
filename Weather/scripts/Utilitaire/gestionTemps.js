const joursSemaine = ['Dimanche','Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

let ajd = new Date()
let jourActuel = ajd.getDay()

let septJoursCourants = joursSemaine.slice(jourActuel+1).concat(joursSemaine.slice(0, jourActuel+1))

export default septJoursCourants