fetch('../dist/exercicios.json')
.then(response => response.json())
.then(data => {
        data.forEach(item => {
            
        });
    })
.catch(error => console.error("Erro ao carregar o banco de dados:", error))