//selection DOM

const userNameInput = document.getElementById('user-name')
const userMailInput = document.getElementById('user-mail')
const userPwdInput = document.getElementById('user-password')
const userConfirmPwdInput = document.getElementById('confirm-password')

const btnSubmit = document.querySelector('button')

const infoUserName = document.querySelector('.info-un')
const infoUserMail = document.querySelector('.info-um')
const infoUserPwd = document.querySelector('.info-up')

const pwdStrenght = document.querySelector('.password-strenght')


//validation nom utilisateur

userNameInput.addEventListener('input', e => {
    e.target.nextElementSibling.style.visibility = "visible"
    if(e.target.value.length >= 3){
        infoUserName.textContent = ""
        e.target.nextElementSibling.src = "./ressources/check.svg"
    }
    else{
        infoUserName.textContent = "Choisissez un pseudo entre 3 et 24 caractères"
        e.target.nextElementSibling.src = "./ressources/error.svg"
    }
})

//validation mail

userMailInput.addEventListener('input', e => {
    e.target.nextElementSibling.style.visibility = "visible"

    const regex = new RegExp('.{1,}[.].{1,}@.{1,}[.].{1,}')
    if(regex.test(e.target.value) === false){
        infoUserMail.textContent = "Entrez un email valide"
        e.target.nextElementSibling.src = "./ressources/error.svg"
    }
    else{
        infoUserMail.textContent = ""
        e.target.nextElementSibling.src = "./ressources/check.svg"
    }
})

// validation mdp

userPwdInput.addEventListener('input', e => {
    e.target.nextElementSibling.style.visibility = "visible"

    // affichage texte d'aide

    const regex0 = new RegExp('[a-z]')
    const regex1 = new RegExp('[A-Z]')
    const regex2 = new RegExp('[0-9]')
    const regex3 = new RegExp('[^a-zA-Z0-9]')
    
    if(regex0.test(e.target.value) === true &&
    regex1.test(e.target.value) === true &&
    regex2.test(e.target.value) === true &&
    regex3.test(e.target.value) === true)
    {
        infoUserPwd.textContent = ""
        e.target.nextElementSibling.src = "./ressources/check.svg"
    }
    else
    {
        infoUserPwd.textContent = "Au moins un symbole, une lettre minuscule, une lettre majuscule et un chiffre"
        e.target.nextElementSibling.src = "./ressources/error.svg"
    }

    // affichage indicateur visuel force mdp

    if(e.target.value.length > 0){
        pwdStrenght.style.display = "flex"
        pwdStrenght.children[0].style.display = "flex"
    }
    else{
        pwdStrenght.style.display = "none"
        pwdStrenght.children[0].style.display = "none"
    }
    if(e.target.value.length > 5){
        pwdStrenght.children[1].style.display = "flex"
    }
    else{
        pwdStrenght.children[1].style.display = "none"
    }
    if(e.target.value.length > 10){
        pwdStrenght.children[2].style.display = "flex"
    }
    else{
        pwdStrenght.children[2].style.display = "none"
    }

})

// validation confirmation mdp

userConfirmPwdInput.addEventListener('input', e => {
    e.target.nextElementSibling.style.visibility = "visible"

    if(e.target.value !== userPwdInput.value){
        e.target.nextElementSibling.src = "./ressources/error.svg"
    }
    else{
        e.target.nextElementSibling.src = "./ressources/check.svg"
        userPwdInput.addEventListener('input', () => {
            if(e.target.value !== userPwdInput.value){
                e.target.nextElementSibling.src = "./ressources/error.svg"
            }
            else{
                e.target.nextElementSibling.src = "./ressources/check.svg"
            }

        })
    }
})

