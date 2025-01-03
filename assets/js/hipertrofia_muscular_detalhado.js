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

    function extractVideoIdFromEmbed(url) {
        const regex = /youtube\.com\/embed\/([^?]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    const exibirExercicios = (data) => {
        container.innerHTML = '';

        Object.keys(data).forEach((dia) => {
            const treinoDia = document.createElement('div');
            treinoDia.classList.add('treino-dia');

            const titulo = document.createElement('h2');
            titulo.innerHTML = dia.charAt(0).toUpperCase() + dia.slice(1); 
            treinoDia.appendChild(titulo);

            data[dia].forEach((item) => {
                const treino = document.createElement('div');
                treino.classList.add('treino');
                treinoDia.appendChild(treino);

                const nome = document.createElement('p');
                nome.innerHTML = `<span>Nome: </span>${item.nome}`;
                nome.classList.add('nome');
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

                const video = document.createElement('div');
                video.style.width = '560px';
                video.style.height = '315px';
                video.style.backgroundImage = `url('https://img.youtube.com/vi/${extractVideoIdFromEmbed(item.url)}/hqdefault.jpg')`;
                video.style.backgroundSize = 'cover';
                video.style.backgroundPosition = 'center';
                video.style.backgroundRepeat = 'no-repeat';
                video.style.cursor = 'pointer';
                video.addEventListener('click', () => {
                    const iframe = document.createElement('iframe');
                    iframe.setAttribute('width', 560);
                    iframe.setAttribute('height', 315);
                    iframe.setAttribute('src', item.url);
                    iframe.setAttribute('title', 'YouTube video player');
                    iframe.setAttribute('frameborder', 0);
                    iframe.setAttribute(
                        'allow',
                        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    );
                    iframe.setAttribute('allowfullscreen', '');
                    video.replaceWith(iframe);
                });
                ulExecucao.appendChild(video);
                const mensagem = document.createElement('p')
                mensagem.innerHTML = `<span>Nota: clique na imagem para ver um vídeo da execução detalhada.</span>`
                ulExecucao.appendChild(mensagem)

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
