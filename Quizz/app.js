const form = document.querySelector('form')
const reponses = ['c','a','b','a','c'];
const emojis = ['✔️','✨','👀','😭','👎'];
let userAnswer = []
let scoring = []
const quizzCards = document.querySelectorAll('.quizz-card')
const titreResultat = document.querySelector('.titre-result')
const aideResultat = document.querySelector('.aide')
const noteResultat = document.querySelector('.note')
const sectionResultats = document.querySelector('.resultats')

function getData() {
    for(let i = 1; i <= 5; i++){
        userAnswer.push(document.querySelector(`input[name="q${i}"]:checked`).value)
    }
    console.log(userAnswer)
}

function compareAnswer(answerTab, correctTab) {
    for(let i = 0; i < 5; i++){
        if(answerTab[i] === correctTab[i]){
            scoring.push(true)
        }
        else{
            scoring.push(false)
        }
    }
    console.log(scoring)
}

function scoreToFront(scoringTab) {

    let score = 0

    for(let i = 0; i < 5; i++){
        if(scoringTab[i] === false){
            quizzCards[i].style.background = '#ffb8b8'
            quizzCards[i].classList.add('echec')
        }
        else{
            quizzCards[i].style.background = 'lightgreen'
            score++;
        }
    }

    setTimeout( () => {
        for(let i = 0; i < 5; i++){
            if(scoringTab[i] === false){
                quizzCards[i].style.background = '#fff'
            }
    }}, 3000)

    setTimeout( () => {
        quizzCards.forEach( (elem) => elem.classList.remove('echec'))
    }, 500)

    switch(score) {

        case 5:
            titreResultat.innerText = `✔️ Bravo, c'est un sans faute ! ✔️`
            aideResultat.innerText = 'Vous pouvez cliquer sur cet encadré pour rejouer !'
            noteResultat.innerText = '5/5'
            sectionResultats.addEventListener('click', () => {
                quizzCards.forEach( (elem) => elem.style.background = '#fff')
                document.location = "#"
                setTimeout( () => {
                    location.reload()
                }, 300)
            })
            break;
        case 4:
            titreResultat.innerText = `✨ Vous y êtes presque ! ✨`
            aideResultat.innerText = 'Retentez une autre réponse, puis re-validez !'
            noteResultat.innerText = '4/5'
            break;
        case 3:
            titreResultat.innerText = `✨ Encore un effort ... 👀`
            aideResultat.innerText = 'Retentez d\'autres réponse, puis re-validez !'
            noteResultat.innerText = '3/5'
            break;
        case 2:
            titreResultat.innerText = `👀 Il reste quelques erreurs. 😭`
            aideResultat.innerText = 'Retentez d\'autres réponse, puis re-validez !'
            noteResultat.innerText = '2/5'
            break;
        case 1:
            titreResultat.innerText = `😭 Peux mieux faire ! 😭`
            aideResultat.innerText = 'Retentez d\'autres réponse, puis re-validez !'
            noteResultat.innerText = '1/5'
            break;
        case 0:
            titreResultat.innerText = `👎 Peux mieux faire ! 👎`
            aideResultat.innerText = 'Retentez d\'autres réponse, puis re-validez !'
            noteResultat.innerText = '0/5'
        break;

        default:
            'Dans un questionnaire à choix multiples crée par Chuck Norris, les choix sont tous justes, et tous faux.';

    }
}

form.addEventListener('submit', (e) => {

    e.preventDefault();

    getData()
    compareAnswer(userAnswer, reponses)
    scoreToFront(scoring)

    userAnswer = []
    scoring = []


})