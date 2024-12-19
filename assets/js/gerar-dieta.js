document.addEventListener('DOMContentLoaded', () => {
    const gerarDietaBtn = document.querySelector('#gerarDieta');
    const objetivoSelect = document.querySelector('#objetivo-dieta');
    const caloriasInput = document.querySelector('#calorias');
    const containerTabela = document.querySelector("#tabela-dieta");
    const nome = document.querySelector('#nomeTmb')
    let dietaData = [];

    gerarDietaBtn.addEventListener('click', () => {
        const carregarDieta = async () => {
            try {
                const response = await fetch('../dist/dietas.json');
                const data = await response.json();
                dietaData = data;

                const objetivoSelecionado = objetivoSelect.value;
                const caloriasInseridas = parseInt(caloriasInput.value);
                const dietasFiltradas = dietaData.filter(item => {
                    const objetivoMatch = objetivoSelecionado === "Todos" || item.objetivo === objetivoSelecionado;
                    const caloriasMatch = caloriasInseridas
                        ? Math.abs(item.kcal - caloriasInseridas) <= 200
                        : true;

                    return objetivoMatch && caloriasMatch;
                });

                if (dietasFiltradas.length > 0) {
                    exibirDieta(dietasFiltradas);
                } else {
                    containerTabela.innerHTML = '<tr><td colspan="2" style="text-align:center;">Nenhuma dieta encontrada com os critérios selecionados.</td></tr>';
                }
            } catch (error) {
                console.error("Erro ao carregar o banco de dados:", error);
            }
        };

        const exibirDieta = (data) => {
            containerTabela.innerHTML = '';            

            data.forEach(item => {
                const dados = {
                    objetivo: item.objetivo,
                    kcal: item.kcal,
                    cafe: item.cafe,
                    lanche_manha: item.lanche_manha,
                    almoco: item.almoco,
                    lanche_tarde: item.lanche_tarde,
                    janta: item.janta
                }
                const trTitulo = document.createElement('tr');
                const tdTitulo = document.createElement('td');
                tdTitulo.setAttribute('colspan', 2);
                tdTitulo.style.background = "#333";
                tdTitulo.style.color = "white";
                tdTitulo.style.textAlign = "center";
                tdTitulo.style.fontWeight = "bold";
                if(nome.value != ''){
                    tdTitulo.innerHTML = nome.value
                } else {
                    tdTitulo.innerHTML = "Dieta Personalizada"
                }
    
                const tabela = document.createElement('table')

                const trObjetivo = document.createElement('tr');
                const tdObjetivo1 = document.createElement('td');
                tdObjetivo1.innerHTML = "Objetivo";
                const tdObjetivo2 = document.createElement('td');
                tdObjetivo2.innerHTML = `${dados.objetivo}`;
    
                const trCalorias = document.createElement('tr');
                const tdCalorias1 = document.createElement('td');
                tdCalorias1.innerHTML = "Calorias";
                const tdCalorias2 = document.createElement('td');
                tdCalorias2.innerHTML = `${dados.kcal} kcal`;
    
                const trCafe = document.createElement('tr');
                const tdCafe1 = document.createElement('td');
                tdCafe1.innerHTML = "Café da manhã";
                const tdCafe2 = document.createElement('td');
                tdCafe2.innerHTML = `${dados.cafe}`;
    
                const trLancheManha = document.createElement('tr');
                const tdLancheManha1 = document.createElement('td');
                tdLancheManha1.innerHTML = "Lanche da manhã";
                const tdLancheManha2 = document.createElement('td');
                tdLancheManha2.innerHTML = `${dados.lanche_manha}`;
    
                const trAlmoco = document.createElement('tr');
                const tdAlmoco1 = document.createElement('td');
                tdAlmoco1.innerHTML = "Almoço";
                const tdAlmoco2 = document.createElement('td');
                tdAlmoco2.innerHTML = `${dados.almoco}`;
    
                const trLancheTarde = document.createElement('tr');
                const tdLancheTarde1 = document.createElement('td');
                tdLancheTarde1.innerHTML = "Lanche da tarde";
                const tdLancheTarde2 = document.createElement('td');
                tdLancheTarde2.innerHTML = `${dados.lanche_tarde}`;
    
                const trJantar = document.createElement('tr');
                const tdJantar1 = document.createElement('td');
                tdJantar1.innerHTML = "Jantar";
                const tdJantar2 = document.createElement('td');
                tdJantar2.innerHTML = `${dados.janta}`;
                
                containerTabela.appendChild(tabela)
                trTitulo.appendChild(tdTitulo);
                tabela.appendChild(trTitulo);
                trObjetivo.appendChild(tdObjetivo1);
                trObjetivo.appendChild(tdObjetivo2);
                tabela.appendChild(trObjetivo);
                trCalorias.appendChild(tdCalorias1);
                trCalorias.appendChild(tdCalorias2);
                tabela.appendChild(trCalorias);
                trCafe.appendChild(tdCafe1);
                trCafe.appendChild(tdCafe2);
                tabela.appendChild(trCafe);
                trLancheManha.appendChild(tdLancheManha1);
                trLancheManha.appendChild(tdLancheManha2);
                tabela.appendChild(trLancheManha);
                trAlmoco.appendChild(tdAlmoco1);
                trAlmoco.appendChild(tdAlmoco2);
                tabela.appendChild(trAlmoco);
                trLancheTarde.appendChild(tdLancheTarde1);
                trLancheTarde.appendChild(tdLancheTarde2);
                tabela.appendChild(trLancheTarde);
                trJantar.appendChild(tdJantar1);
                trJantar.appendChild(tdJantar2);
                tabela.appendChild(trJantar);
            });
        };

        carregarDieta();
    });
});
