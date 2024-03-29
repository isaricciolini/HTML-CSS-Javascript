var url = 'https://localhost:5001/animais/completo';
var corpoTabela = document.getElementById('corpoTabela');
var textCodAnimalCompleto = document.getElementById('textCodAnimalCompleto')
var textCodReceitaCompleto = document.getElementById('textCodReceita')
var textCodClienteCompleto = document.getElementById('textCodClienteCompleto')
var textCodConsultaCompleto = document.getElementById('textCodConsultaCompleto')
var textNomeAnimalCompleto = document.getElementById('textNomeAnimalCompleto')
var textNascimentoAnimalCompleto = document.getElementById('textNascimentoAnimalCompleto')
var textRacaAnimalCompleto = document.getElementById('textRacaAnimalCompleto')
var textTipoAnimalCompleto = document.getElementById('textTipoAnimalCompleto')
var textDeficienciaAnimalCompleto = document.getElementById('textDeficienciaAnimalCompleto')
var textCodClienteConsulta = document.getElementById('textCodClienteConsulta')
var textCodAnimalConsulta = document.getElementById('textCodAnimalConsulta')
var textcodFuncionarioConsulta = document.getElementById('textcodFuncionarioConsulta')
var textDataConsulta = document.getElementById('textDataConsulta')
var textPesoConsulta = document.getElementById('textPesoConsulta')
var textDescricaoConsulta = document.getElementById('textDescricaoConsulta')
var modalConsulta = new bootstrap.Modal(document.getElementById('modalConsulta'), {});
var modalReceita = new bootstrap.Modal(document.getElementById('modalReceita'), {});

pesquisarAnimaisCompleto();

function pesquisarAnimaisCompleto() {
    corpoTabela.innerHTML = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            for (var i = 0; i < resposta.length; i++) {
                var animal = resposta[i];
                var linha = '<tr class="item">';
                linha += `<td>${animal.codAnimal}</td>`;
                linha += `<td id="nomeAnimalCompleto${animal.codAnimal}">${animal.nomeAnimal}</td>`;
                linha += `<td id="nascimentoAnimalCompleto${animal.codAnimal}">${(animal.nascimento.slice(8, 10)) + "/" + (animal.nascimento.slice(5, 7)) + "/" + (animal.nascimento.slice(0, 4))}</td>`;
                linha += `<td id="racaAnimalCompleto${animal.codAnimal}">${animal.raca}</td>`;
                linha += `<td id="tipoAnimalCompleto${animal.codAnimal}">${animal.tipo}</td>`;
                linha += `<td id="deficienciaAnimalCompleto${animal.codAnimal}">${animal.deficiencia}</td>`;
                linha += `<td><button class="btn btn-dark" onclick="abrirConsulta(${animal.codAnimal})">Exibir</button></td>`;
                linha += `<td><button class="btn btn-dark" onclick="abrirReceita(${animal.codAnimal})">Exibir</button></td>`;
                linha += '</tr>';
                corpoTabela.innerHTML += linha;
            }
            w3.sortHTML('#tabela', '.item', 'td:nth-child(1)');
        } else if (this.readyState == 4) {
            corpoTabela.innerHTML = 'Erro ao pesquisar animais';
        }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
}

function abrirConsulta(codAnimal) {
    // comunicar com a api informando o codigo do animal e recebendo uma lista de todas as consultas
    // reservar uma div em branco no modal e escrever todas as consultas nela por aqui
    // abrir este modal
    cardBody.innerHTML = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            if (resposta.consulta.length == 0) {
                cardBody.innerHTML = "<p>Nenhuma consulta para este animal foi encontrada.</p>";
                return;
            }
            for (var i = 0; i < resposta.consulta.length; i++) {
                var consulta = resposta.consulta[i];
                var linha = `
                <div class="card col-12 col-md-6">
                                    <div class="card-body">
                                        <h5 class="card-title">Consulta ${consulta.codConsulta}</h5>
                                        <p class="card-text"><b>Cod.Veterinario: </b>${consulta.codFuncionario}<br>
                                        <b>Data: </b>${(consulta.dataConsulta.slice(8, 10)) + "/" + (consulta.dataConsulta.slice(5, 7)) + "/" + (consulta.dataConsulta.slice(0, 4))}<br>
                                        <b>Hora: </b>${consulta.dataConsulta.slice(11,16)}<br>
                                        <b>Peso do animal: </b>${consulta.peso}Kg<br>
                                        <b>Descrição: </b>${consulta.descricao}</p>
                                      </div>
                                </div>`;
                cardBody.innerHTML += linha;
            }
        } else if (this.readyState == 4) {
            cardBody.innerHTML = 'Erro ao pesquisar consulta';
        }
    };
    xhttp.open('GET', `https://localhost:5001/Animais/Consultar/${codAnimal}`, true);
    xhttp.send();
    modalConsulta.show();
}

function abrirReceita(codAnimal) {
    cardBodyReceita.innerHTML = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.response);
            if (resposta == 0 || resposta == undefined) {
                cardBodyReceita.innerHTML = "<p>Nenhuma receita foi encontrada para este animal.</p>";
                return;
            }
            for (var i = 0; i < resposta.length; i++) {
                var receita = resposta[i];
                var linha = `
                <div class="card col-12 col-md-6">
                                    <div class="card-body">
                                        <h5 class="card-tittle">Receita ${receita.codReceita}</h5>
                                        <p class="card-text"><b>Cod.Consulta: </b>${receita.codConsulta}<br>
                                        <b>Data: </b>${(receita.dataReceita.slice(8, 10)) + "/" + (receita.dataReceita.slice(5, 7)) + "/" + (receita.dataReceita.slice(0, 4))}<br>
                                        <b>Prescrição: </b>${receita.prescricao}</p>
                                    </div>
                                </div>`;
                cardBodyReceita.innerHTML += linha;
            }
        } else if (this.readyState == 4) {
            cardBodyReceita.innerHTML = 'Erro ao pesquisar Receita';
        }
    };
    xhttp.open('GET', `https://localhost:5001/Receitas/animal/${codAnimal}`, true);
    xhttp.send();
    modalReceita.show();
}

function limpar() {
    textNomeAnimal.value = '';
    textNascimentoAnimal.value = '';
    textRacaAnimal.value = '';
    textTipoAnimal.value = '';
}