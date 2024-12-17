document.addEventListener('DOMContentLoaded', () => {
    const containerExercicio = document.querySelector('#exercícios');
    const equipamentoSelect = document.querySelector('#equipamento');
    const musculoPrincipalSelect = document.querySelector('#musculoPrincipal');
    const musculoSecundarioSelect = document.querySelector('#musculoSecundario');
    const categoriaSelect = document.querySelector('#categoria');

    let exercicioData = []; // Variável para armazenar os dados do JSON

    // Função para carregar os dados do JSON
    const carregarExercicios = async () => {
        try {
            const response = await fetch('../dist/exercicios.json');
            const data = await response.json();
            exercicioData = data; // Salva os dados para uso futuro
            exibirExercicios(exercicioData); // Exibe todos os exercícios inicialmente
        } catch (error) {
            console.error("Erro ao carregar o banco de dados:", error);
        }
    };

    // Função para exibir os exercícios na página
    const exibirExercicios = (data) => {
        containerExercicio.innerHTML = ''; // Limpa o container antes de renderizar

        data.forEach(item => {
            const dados = {
                id: item.id,
                nome: item.nome,
                empurrar_ou_puxar: item.empurrar_ou_puxar,
                nível: item.nível,
                mecânica: item.mecânica,
                equipamento: item.equipamento,
                musculo_principal: item.musculo_principal,
                musculo_secundario: item.musculo_secundario,
                categoria: item.categoria,
                execução: item.execução,
                img1: `../exercicios/${item.nome}/0.png`,
                img2: `../exercicios/${item.nome}/1.png`,
            };

            const exercicio = document.createElement('div');
            exercicio.classList.add('cardExercicio');
            const nome = document.createElement('h3');
            nome.innerHTML = dados.nome;

            const empurrarOuPuxar = document.createElement('p');
            empurrarOuPuxar.innerHTML = `Empurrar ou Puxar: ${dados.empurrar_ou_puxar}`;

            const nivel = document.createElement('p');
            nivel.innerHTML = `Nível: ${dados.nível}`;

            const mecanica = document.createElement('p');
            mecanica.innerHTML = `Mecânica: ${dados.mecânica}`;

            const equipamento = document.createElement('p');
            equipamento.innerHTML = `Equipamento: ${dados.equipamento}`;

            const musculoPrincipal = document.createElement('p');
            musculoPrincipal.innerHTML = `Músculo Principal: ${dados.musculo_principal}`;

            const musculoSecundario = document.createElement('p');
            musculoSecundario.innerHTML = `Músculo Secundário: ${dados.musculo_secundario}`;

            const categoria = document.createElement('p');
            categoria.innerHTML = `Categoria: ${dados.categoria}`;

            const execucao = document.createElement('p');
            execucao.innerHTML = `Execução: ${dados.execução}`;

            const img1 = document.createElement('img');
            img1.setAttribute('src', dados.img1);

            const img2 = document.createElement('img');
            img2.setAttribute('src', dados.img2);

            exercicio.appendChild(nome);
            exercicio.appendChild(img1);
            exercicio.appendChild(img2);
            exercicio.appendChild(empurrarOuPuxar);
            exercicio.appendChild(nivel);
            exercicio.appendChild(mecanica);
            exercicio.appendChild(equipamento);
            exercicio.appendChild(musculoPrincipal);
            exercicio.appendChild(musculoSecundario);
            exercicio.appendChild(categoria);
            exercicio.appendChild(execucao);
            containerExercicio.appendChild(exercicio);
        });
    };

    // Função para filtrar os dados com base nos seletores
    const filtrarExercicios = () => {
        const equipamentoFiltro = equipamentoSelect.value.toLowerCase();
        const musculoPrincipalFiltro = musculoPrincipalSelect.value.toLowerCase();
        const musculoSecundarioFiltro = musculoSecundarioSelect.value.toLowerCase();
        const categoriaFiltro = categoriaSelect.value.toLowerCase();

        const exerciciosFiltrados = exercicioData.filter(item => {
            const equipamentoMatch = equipamentoFiltro === 'todos' || item.equipamento.toLowerCase().includes(equipamentoFiltro);
            const musculoPrincipalMatch = musculoPrincipalFiltro === 'todos' || item.musculo_principal.toLowerCase().includes(musculoPrincipalFiltro);
            const musculoSecundarioMatch = musculoSecundarioFiltro === 'todos' || item.musculo_secundario.toLowerCase().includes(musculoSecundarioFiltro);
            const categoriaMatch = categoriaFiltro === 'todos' || item.categoria.toLowerCase().includes(categoriaFiltro);

            return equipamentoMatch && musculoPrincipalMatch && musculoSecundarioMatch && categoriaMatch;
        });

        exibirExercicios(exerciciosFiltrados); // Renderiza os exercícios filtrados
        console.log(`Exercícios filtrados: ${exerciciosFiltrados.length}`);
    };

    // Evento no botão de filtro
    const btnfilter = document.querySelector('#btnfilter');
    btnfilter.addEventListener('click', filtrarExercicios);

    // Carrega os exercícios ao iniciar a página
    carregarExercicios();
});
