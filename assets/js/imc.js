const peso = document.querySelector('#peso')
const altura = document.querySelector('#altura')
const calc = document.querySelector('#calc')
const resultado = document.querySelector('#resultado')

calc.addEventListener('click', ()=> {
    if(peso.value != '' || altura.value != ''){
        if(resultado.classList.contains("hide")){
            resultado.classList.remove("hide")
        }
        resultado.innerHTML = `Seu IMC é de: ${calcularIMC(peso.value, altura.value)}`
    }
})

function calcularIMC(peso, altura){
    const calc = peso / (altura * altura)
    const calcc = calc.toFixed(2)

    if(calc < 18.5){
        return `${calcc} (Magreza)`
    } else if(calc <= 24.9) {
        return `${calcc} (Normal)`
    } else if(calc <= 29.9) {
        return `${calcc} (Sobrepeso)`
    } else if(calc <= 34.9){
        return `${calcc} (Obesidade grau I)`
    } else if(calc <= 39.9){
        return `${calcc} (Obesidade grau II)`
    } else {
        return `${calcc} (Obesidade grau III)`
    }
}