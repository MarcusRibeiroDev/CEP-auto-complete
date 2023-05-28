const addressForm = document.querySelector("#address-form")
const cepInput = document.querySelector("#cep")
const streetInput = document.querySelector("#address")
const cityInput = document.querySelector("#city")
const neighbordhoodInput = document.querySelector("#neighborhood")
const stateInput = document.querySelector("#region")
const formInputs = document.querySelectorAll("[data-input]")
const closeButton = document.querySelector("#close-message")
const fadeHide = document.querySelector("#fade")
const messageError = document.querySelector("#message")


// Validade CEP input
cepInput.addEventListener("keypress", (e)=>{
    const onlyNumbers = /[0-9]/
    const key = String.fromCharCode(e.keyCode) // Essa função recupera o valor de keyCode da tecla clicada e converte para o caracter correspondente.

    if(!onlyNumbers.test(key)){
        e.preventDefault()
        return
    } // Isso bloqueia as teclas que não correspondem ao regex testado
})

// Get input with 8 numbers tapped
cepInput.addEventListener("keyup", (e)=>{
    inputValue = e.target.value

    if(inputValue.length === 8){
        getApiCep(inputValue)
    }
})

async function getApiCep(cep){
    toggleLoader()

    cepInput.blur() // Remove o foco do input

    const apiCep = `https://viacep.com.br/ws/${cep}/json/`
    const response = await fetch(apiCep)
    const data = await response.json()

    if(data.erro){
        addressForm.reset()

        toggleLoader()

        // Show message of error
        showMessage(`O CEP: ${cep} é inválido`)

        // Close message
        closeButton.addEventListener("click", closeMessage)

        return
    }

    if(!streetInput.value.length > 0){
        toogleDisabled()
    }

    streetInput.value = data.logradouro
    cityInput.value = data.localidade
    neighbordhoodInput.value = data.bairro
    stateInput.value = data.uf

    toggleLoader()
    
}

// Toogle disabled in inputs
function toogleDisabled(){
    if(streetInput.hasAttribute("disabled")){
        formInputs.forEach((e)=>{
            e.removeAttribute("disabled")
        })
    } else{
        formInputs.forEach((e)=>{
            e.setAttribute("disabled", "disabled")
        })
    }
}

// Toogle in class "hide"
function toggleLoader(){
    const loaderHIde = document.querySelector("#loader")

    fadeHide.classList.toggle("hide")
    loaderHIde.classList.toggle("hide")
}

// Message of error
function showMessage(msg){
    const p = messageError.querySelector("p")

    fadeHide.classList.toggle("hide")
    messageError.classList.toggle("hide")

    p.textContent = msg
}

// Close message modal
function closeMessage(){
    fadeHide.classList.toggle("hide")
    messageError.classList.toggle("hide")
    toogleDisabled()

    closeButton.removeEventListener("click", closeMessage)
}

// Sucess to submit

addressForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    toggleLoader()

    setTimeout(()=>{
        toggleLoader()

        addressForm.reset()

        showMessage("Endereço cadastrado com sucesso")

        closeButton.addEventListener("click", closeMessage)
        
    }, 1000)
})

