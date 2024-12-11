const exerciciosApresentacao = document.querySelector('#exercícios')
const filtrarBtn = document.querySelector('#btnfilter')

fetch('../dist/exercicios.json')
.then(response => response.json())
.then(data => {
        data.forEach(item => {
            const cardExercicio = document.createElement('div')
            cardExercicio.classList.add('cardExercicio')
            const h3 = document.createElement('h3')
            const img = document.createElement('img')
            const nivel = document.createElement('h5')
            const mecanica = document.createElement('h5')
            const equipamento = document.createElement('h5')
            const musculo_principal = document.createElement('h5')
            const musculo_secundario = document.createElement('h5')
            const categoria = document.createElement('h5')
            const execucao = document.createElement('h5')
            exerciciosApresentacao.appendChild(cardExercicio)
            h3.innerHTML = item["nome"]
            cardExercicio.appendChild(h3)
            img.setAttribute('src', `../exercicios/${item["nome"]}/1.webp`)
            cardExercicio.appendChild(img)
            nivel.innerHTML = `Nivel: <span>${item["nível"]}</span>`
            cardExercicio.appendChild(nivel)
            mecanica.innerHTML = `Mecanica: <span>${item["mecânica"]}</span>`
            cardExercicio.appendChild(mecanica)
            equipamento.innerHTML = `Equipamento: ${item["equipamento"]}`
            cardExercicio.appendChild(equipamento)
            musculo_principal.innerHTML = `Músculo Principal: ${item["musculo_principal"]}`
            cardExercicio.appendChild(musculo_principal)
            musculo_secundario.innerHTML = `Músculo Secundario: ${item["musculo_secundario"]}`
            cardExercicio.appendChild(musculo_secundario)
            categoria.innerHTML = `Categoria: ${item["categoria"]}`
            cardExercicio.appendChild(categoria)
            execucao.innerHTML = `Execução: ${item["execução"]}`
            cardExercicio.appendChild(execucao)
        });
    })
.catch(error => console.error("Erro ao carregar o banco de dados:", error))


// fetch('../dist/exercicios.json')
// .then(response => response.json())
// .then(data => {
//     data.forEach(item => {
//         console.log("Equipamento:", item.equipamento);
//         console.log("Músculo Principal:", item.musculo_principal);
//         console.log("Músculo Secundário:", item.musculo_secundario);
//         console.log("Categoria:", item.categoria);
//     });
// })
// .catch(error => console.error("Erro ao carregar o JSON:", error));
