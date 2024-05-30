async function burcarCep()
{
    startPreLoader();

    const divResults = document.getElementById('resultados');
    divResults.style.display = ('none');

    var cep = document.getElementById('cep').value;

    try{
        const responseViaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
            method: 'GET'
        })

        const dadosCep = await responseViaCep.json();
        console.log(dadosCep);

        if(dadosCep.erro){
            Swal.fire({
                title: 'Erro!',
                text: 'Cep não encontrado',
                icon: 'error',
                confirmButtonText: 'Fechar'
              })
        }
        else{
            showResults(dadosCep, divResults);
        }
    } 
    catch(error){
        console.log(error);
    };

    endPreLoader();

}

function showResults(dados, divResults)
{
    divResults.style.display = ('block');

    const html = ` 
        <ul class="list-group">
            <li class="list-group-item"><strong>Cep: </strong>${dados.cep}</li>
            <li class="list-group-item"><strong>UF: </strong>${dados.uf}</li>
            <li class="list-group-item"><strong>Cidade: </strong>${dados.localidade}</li>
            <li class="list-group-item"><strong>Bairro: </strong>${dados.bairro}</li>
            <li class="list-group-item"><strong>Rua: </strong>${dados.logradouro}</li>
        </ul>` 

    divResults.innerHTML = html;
}

const startPreLoader = () =>{ 
    const iconPreLoader = document.getElementById('preLoader');
    iconPreLoader.style.display = ('block');
}

const endPreLoader = () =>{
    const iconPreLoader = document.getElementById('preLoader');
    iconPreLoader.style.display = ('none');
}



