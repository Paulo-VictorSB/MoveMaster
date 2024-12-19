const resultadoTmb = document.querySelector('#resultadoTmb')
const calcTmb = document.querySelector('#calcTmb')
const pesoTmb = document.querySelector('#pesoTmb')
const alturaTmb = document.querySelector('#alturaTmb')
const idadeTmb = document.querySelector('#idadeTmb')
const sexoTmb = document.querySelector('#sexoTmb')

calcTmb.addEventListener('click', ()=>{
    if(resultadoTmb.classList.contains("hide")){
        resultadoTmb.classList.remove("hide")
    }
    resultadoTmb.innerHTML = `${calcularTmb(pesoTmb.value, alturaTmb.value, idadeTmb.value, sexoTmb.value)}`
})

function calcularTmb(peso, altura, idade, sexo){
    const masculino = (66.47 + (13.75*peso) + (5.003*altura) - (6.755*idade)).toFixed(2)
    const feminino = (655.1 + (9.563*peso) + (1.850*altura) - (4.676*idade)).toFixed(2)

    if(sexo == 'feminino'){
        return `Sua TMB é: ${feminino} kcal`
    } else {
        return `Sua TMB é: ${masculino} kcal`
    }
}