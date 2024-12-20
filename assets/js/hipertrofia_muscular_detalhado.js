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

        

    };

    carregarExercicios()
})
