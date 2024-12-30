document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    let exercicioData = [];

    const carregarExerciciosComCache = async () => {
        if (localStorage.getItem('exercicioData')) {
            exercicioData = JSON.parse(localStorage.getItem('exercicioData'));
            exibirExercicios(exercicioData);
        } else {
            try {
                const response = await fetch('../dist/hipertrofiaDetalhada.json');
                const data = await response.json();
                exercicioData = data;
                localStorage.setItem('exercicioData', JSON.stringify(data));
                exibirExercicios(exercicioData);
            } catch (error) {
                console.error("Erro ao carregar o banco de dados:", error);
            }
        }
    };

    const exibirExercicios = (data) => {
        container.innerHTML = '';

        // Itera pelos dias da semana no JSON
        Object.keys(data).forEach((dia) => {
            const treinoDia = document.createElement('div');
            treinoDia.classList.add('treino-dia');

            const titulo = document.createElement('h2');
            titulo.innerHTML = dia.charAt(0).toUpperCase() + dia.slice(1); // Capitaliza o título
            treinoDia.appendChild(titulo);

            // Itera pelos exercícios de cada dia
            data[dia].forEach((item) => {
                const treino = document.createElement('div');
                treino.classList.add('treino');
                treinoDia.appendChild(treino);

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

                const video = document.createElement('iframe');
                video.setAttribute('width', 560);
                video.setAttribute('height', 315);
                video.setAttribute('src', item.url);
                video.setAttribute('title', 'YouTube video player');
                video.setAttribute('frameborder', 0);
                video.setAttribute(
                    'allow',
                    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                );
                video.setAttribute('allowfullscreen', '');
                ulExecucao.appendChild(video);

                item.execucao.forEach((passo) => {
                    const li = document.createElement('li');
                    li.innerHTML = passo;
                    ulExecucao.appendChild(li);
                });

                const dicas = document.createElement('p');
                dicas.innerHTML = '<span>Dicas: </span>';
                ulExecucao.appendChild(dicas);

                item.dicas.forEach((dica) => {
                    const li = document.createElement('li');
                    li.innerHTML = dica;
                    ulExecucao.appendChild(li);
                });
            });

            container.appendChild(treinoDia);
        });
    };

    carregarExerciciosComCache();
});
