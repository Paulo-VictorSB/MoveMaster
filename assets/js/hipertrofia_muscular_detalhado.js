document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container')
    let exercicioData = []; 

    const carregarExercicios = async () => {
        try {
            const response = await fetch('../dist/hipertrofiaDetalhada.json');
            const data = await response.json();
            exercicioData = data;
            exibirExercicios(exercicioData);
        } catch (error) {
            console.error("Erro ao carregar o banco de dados:", error);
        }
    };

    const exibirExercicios = (data) => {
        container.innerHTML = '';
    
        // Criação do container principal para "Segunda"
        const treino_dia = document.createElement('div');
        treino_dia.classList.add('treino-dia');
        container.appendChild(treino_dia);
    
        const dia = document.createElement('h2');
        dia.innerHTML = 'Segunda';
        treino_dia.appendChild(dia);
    
        // Iterar por cada exercício no array "segunda"
        data["segunda"].forEach((item) => {
            const treino = document.createElement('div');
            treino.classList.add('treino');
            treino_dia.appendChild(treino);
    
            const nome = document.createElement('p');
            nome.innerHTML = `<span>Nome: </span>${item.nome}`;
            treino.appendChild(nome);
    
            const foco = document.createElement('p');
            foco.innerHTML = `<span>Foco: </span>${item.foco}`;
            treino.appendChild(foco);
    
            const equipamento = document.createElement('p');
            equipamento.innerHTML = `<span>Equipamento: </span>${item.equipamento}`;
            treino.appendChild(equipamento);
    
            const ulExecucao = document.createElement('ul');
            treino.appendChild(ulExecucao);
    
            const execucao = document.createElement('p');
            execucao.innerHTML = `<span>Execução: </span>`;
            ulExecucao.appendChild(execucao);
    
            // Adicionar vídeo (o mesmo para todos os exercícios)
            const video = document.createElement('iframe');
            video.setAttribute('width', 560);
            video.setAttribute('height', 315);
            video.setAttribute('src', `${item.url}`);
            video.setAttribute('title', 'YouTube video player');
            video.setAttribute('frameborder', 0);
            video.setAttribute('allow', "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
            video.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
            video.setAttribute('allowfullscreen', '');
            ulExecucao.appendChild(video);
    
            // Adicionar passos da execução (li)
            item.execucao.forEach((passo) => {
                const li = document.createElement('li');
                li.innerHTML = passo;
                ulExecucao.appendChild(li);
            });
        });
    };
    

    carregarExercicios()
})
