const peso = document.querySelector('#peso')
const altura = document.querySelector('#altura')
const calc = document.querySelector('#calc')
const resultado = document.querySelector('#resultado')
const resultadoTmb = document.querySelector('#resultadoTmb')
const calcTmb = document.querySelector('#calcTmb')
const pesoTmb = document.querySelector('#pesoTmb')
const alturaTmb = document.querySelector('#alturaTmb')
const idadeTmb = document.querySelector('#idadeTmb')
const sexoTmb = document.querySelector('#sexoTmb')

calcTmb.addEventListener('click', ()=>{
    resultadoTmb.classList.toggle('hide')
    resultadoTmb.innerHTML = `${calcularTmb(pesoTmb.value, alturaTmb.value, idadeTmb.value, sexoTmb.value)}`
})

calc.addEventListener('click', ()=> {
    if(peso.value != '' || altura.value != ''){
        resultado.classList.toggle('hide')
        resultado.innerHTML = `Seu IMC é de: ${calcularIMC(peso.value, altura.value)}`
        resultado.classList.toggle('hide')
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

function calcularTmb(peso, altura, idade, sexo){
    const masculino = (66.47 + (13.75*peso) + (5.003*altura) - (6.755*idade)).toFixed(2)
    const feminino = (655.1 + (9.563*peso) + (1.850*altura) - (4.676*idade)).toFixed(2)

    if(sexo == 'feminino'){
        return `Sua TMB é: ${feminino} kcal`
    } else {
        return `Sua TMB é: ${masculino} kcal`
    }
}