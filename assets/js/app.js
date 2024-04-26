const localStorage = window.localStorage;
let alunoArrayLista = localStorage.getItem('alunosList') ? JSON.parse(localStorage.getItem('alunosList')) : [];
localStorage.setItem('alunosList', JSON.stringify(alunoArrayLista));

let alunoArrayNotas = localStorage.getItem('notasList') ? JSON.parse(localStorage.getItem('notasList')) : [];
localStorage.setItem('notasList', JSON.stringify(alunoArrayNotas));

let idAlunoCadastro = 0;

class AlunoModel {
    constructor(id, idAluno, ra, nome, email, aprovado) {
        this.id = id;
        this.idAluno = idAluno;
        this.ra = ra;
        this.nome = nome;
        this.email = email;
        this.aprovado = aprovado;
    }
}

window.onload = function () {
    listarAlunos();
    listarNotas();
    mostrarOcultarBotaoCancelar(false);
};

function listarAlunos() {

    const parent = document.getElementById("table");
    while (parent.firstChild) {
        parent.firstChild.remove()
    }

    // Cria o cabeçalho da tabela
    criaCabecalhoTable();

    const dadosLocalStorage = JSON.parse(localStorage.getItem('alunosList'));
    alunoArrayLista = [];
    let index = 0;
    dadosLocalStorage.forEach(item => {
        item.id = index;
        alunoArrayLista.push(item);
        criarElemento(item);
        index++;
    });


    var linhasTabela = document.getElementsByTagName("tr");

    for (var i = 0; i < linhasTabela.length; i++) {
        if (i == 0) {
            continue;
        }
        else if ((i) % 2 == 0) {
            linhasTabela[i].className = "styleOne";
        }
        else {
            linhasTabela[i].className = "styleTwo";
        }
    }

    localStorage.setItem('alunosList', JSON.stringify(alunoArrayLista));


}

function criaCabecalhoTable() {
    var row = document.createElement("tr");
    row.style = 'background-color: #0F2028;';

    var thRA = document.createElement("th");
    thRA.innerHTML = 'RA';
    thRA.style = 'min-width: 90px; width: 110px; text-align: center;';
    row.append(thRA);

    var thTask = document.createElement("th");
    thTask.innerHTML = 'Nome';
    thTask.style = 'width: 50%; text-align: left;';
    row.append(thTask);

    var thEmail = document.createElement("th");
    thEmail.innerHTML = 'E-mail';
    thEmail.style = 'width: 50%; text-align: left;';
    row.append(thEmail);

    var thActions = document.createElement("th");
    thActions.innerHTML = 'Ações';
    thActions.colSpan = 3;
    thActions.style = 'min-width: 200px; text-align: center;';
    row.append(thActions);

    const table = document.getElementById("table");
    table.insertBefore(row, table.childNodes[0]);// Adiciona a linha na posição zero(0) tabela
}

function criarElemento(modeloAluno) {
    const alunoId = `aluno_id_${modeloAluno.id}`;

    // Create two new cells
    var cellTextoRaAluno = document.createElement("td");
    cellTextoRaAluno.id = alunoId;
    cellTextoRaAluno.innerHTML = modeloAluno.ra;
    cellTextoRaAluno.style = 'text-align: center;';
    // Create two new cells
    var cellTextoNomeAluno = document.createElement("td");
    cellTextoNomeAluno.id = alunoId;
    cellTextoNomeAluno.innerHTML = modeloAluno.nome;
    // Create two new cells
    var cellTextoEmailAluno = document.createElement("td");
    cellTextoEmailAluno.id = alunoId;
    cellTextoEmailAluno.innerHTML = modeloAluno.email;

    var cellEditar = document.createElement("td");
    var cellNota = document.createElement("td");
    var cellDeletar = document.createElement("td");
    const rowId = `row_id_${modeloAluno.id}`;

    cellEditar.appendChild(criaButtonGeneric('Editar', 'btn_editar', `modalEdicaoAluno(${modeloAluno.idAluno})`));
    cellEditar.style = 'text-align: center;';
    cellNota.appendChild(criaButtonGeneric('Notas', 'btn_nota', `listarNotaAluno(${modeloAluno.idAluno})`));
    cellNota.style = 'text-align: center;';
    cellDeletar.appendChild(criaButtonGeneric('Deletar', 'btn_deletar', `deletarAluno('${rowId}')`));
    cellDeletar.style = 'text-align: center;';

    var row = document.createElement("tr");
    row.id = rowId;
    row.appendChild(cellTextoRaAluno);
    row.appendChild(cellTextoNomeAluno);
    row.appendChild(cellTextoEmailAluno);
    row.appendChild(cellEditar);
    row.appendChild(cellNota);
    row.appendChild(cellDeletar);
    const table = document.getElementById("table");
    table.appendChild(row);// Adiciona a linha na tabela
    limpaCamposAluno();

    mostrarOcultarBotaoCancelar(false) // Oculta o botão que cancela a alteração

    if (!modeloAluno.aprovado) {
        row.style = 'text-decoration: none;';
    } else {
        row.style = 'text-decoration: line-through;';
    }
}

function mostrarOcultarBotaoCancelar(mostrar) {
    const btnCancelar = document.getElementById("btn_cancelar");
    btnCancelar.style = mostrar ? "display: null;" : "display: none;"
}

function limpaCamposAluno() {
    idAlunoCadastro = 0; // Limpa o input de ID

    const inputNome = document.getElementById('input_nome');
    inputNome.value = ''; // Limpa o input de nome

    document.getElementById("input_nome").focus(); // Seta o foco no input
    const inputEmail = document.getElementById('input_email');
    inputEmail.value = ''; // Limpa o input do email
    const inputRA = document.getElementById('input_ra');
    inputRA.value = ''; // Limpa o input do RA (Registro Acadêmico)     

    const btnCadastrar = document.getElementById('btn_cadastrar');
    btnCadastrar.value = 'Cadastrar';
}

function criaButtonGeneric(nome, className, funcao) {
    var button = document.createElement('input');
    button.id = `button${nome}`;//"buttonEditar";
    button.type = "button";
    button.value = nome;
    button.className = `btn_generic ${className}`;
    button.setAttribute('onclick', funcao);
    return button;
}

function adicionaDadosAluno() {

    const nomeAluno = document.getElementById('input_nome').value;
    const raAluno = document.getElementById('input_ra').value;
    const emailAluno = document.getElementById('input_email').value;

    var modalAlerta = document.getElementById('modalAlerta');
    var tituloAlerta = document.getElementById('tituloAlerta');
    var mensagemAlerta = document.getElementById('mensagemAlerta');

    tituloAlerta.innerHTML = 'Atenção!';

    if (nomeAluno == null || nomeAluno == '') {
        mensagemAlerta.innerHTML = 'Por favor informe o nome do aluno.';
        modalAlerta.showModal();
        return;
    }
    if (raAluno == null || raAluno == '') {
        mensagemAlerta.innerHTML = 'Por favor informe o RA (Registro Acadêmico) do aluno.';
        modalAlerta.showModal();
        return;
    }
    if (emailAluno == null || emailAluno == '') {
        mensagemAlerta.innerHTML = 'Por favor informe o e-mail do aluno.';
        return;
    }
    const table = document.getElementById("table");
    let quantidade = table.children.length;
    let alunoModel = new AlunoModel();
    alunoModel.id = quantidade;
    alunoModel.idAluno = quantidade;
    alunoModel.nome = nomeAluno;
    alunoModel.ra = raAluno;
    alunoModel.email = emailAluno;
    alunoModel.aprovado = false;
    if (idAlunoCadastro < 1) {
        cadastraAluno(alunoModel, true);
    } else {
        update();
    }
};

function cadastraAluno(objeto) {
    let nomeExiste = false;
    let raExiste = false;
    let emailExiste = false;

    let alunoExiste = alunoArrayLista.find(o => o.nome === objeto.nome);

    if (alunoExiste != null && alunoExiste != undefined) {
        nomeExiste = true;
    }
    if (!nomeExiste) {
        alunoExiste = alunoArrayLista.find(o => o.ra === objeto.ra);
        if (alunoExiste != null && alunoExiste != undefined) {
            raExiste = true;
        }
    }
    if (!nomeExiste && !raExiste) {
        alunoExiste = alunoArrayLista.find(o => o.email === objeto.email);
        if (alunoExiste != null && alunoExiste != undefined) {
            emailExiste = true;
        }
    }

    var modalPergunta = document.getElementById('modalAlerta');
    var tituloAlerta = document.getElementById('tituloAlerta');
    var mensagemAlerta = document.getElementById('mensagemAlerta');

    tituloAlerta.innerHTML = 'Atenção!';
    if (nomeExiste && idAlunoCadastro < 1) {
        mensagemAlerta.innerHTML = 'Esse nome já foi cadastrado.';
        modalPergunta.showModal();
        return;
    }
    if (emailExiste && idAlunoCadastro < 1) {
        mensagemAlerta.innerHTML = 'Esse e-mail já foi cadastrado';
        modalPergunta.showModal();
        return;
    }
    if (raExiste && idAlunoCadastro < 1) {
        mensagemAlerta.innerHTML = 'Ops, Esse RA (Registro Acadêmico) já foi cadastrado.';
        modalPergunta.showModal();
        return;
    }

    const ultimoAluno = alunoArrayLista[alunoArrayLista.length - 1];

    let modeloAluno = new AlunoModel();
    modeloAluno.id = (ultimoAluno == null || ultimoAluno == undefined) ? 0 : objeto.id - 1;
    modeloAluno.idAluno = (ultimoAluno == null || ultimoAluno == undefined) ? 1 : ultimoAluno.idAluno + 1;
    modeloAluno.nome = objeto.nome;
    modeloAluno.ra = objeto.ra;
    modeloAluno.email = objeto.email;
    modeloAluno.aprovado = false;
    alunoArrayLista.push(modeloAluno);
    criarElemento(modeloAluno);

    var linhasTabela = document.getElementsByTagName("tr");
    for (var i = 0; i < linhasTabela.length; i++) {
        if (i == 0) continue;// Não pinta o cabeçalho da tabela
        if ((i) % 2 == 0) {
            linhasTabela[i].className = "styleOne";
        }
        else {
            linhasTabela[i].className = "styleTwo";
        }
    }

    localStorage.setItem('alunosList', JSON.stringify(alunoArrayLista));
    limpaCamposAluno();
}

function cancelaAlteracao() {
    mostrarOcultarBotaoCancelar(false);
    limpaCamposAluno();
}

function modalEdicaoAluno(alunoId) {
    let alunoExiste = alunoArrayLista.find(o => o.idAluno === alunoId);
    idAlunoCadastro = alunoId;

    if (alunoExiste != null && alunoExiste != undefined) {
        let aluno = new AlunoModel();
        aluno.idAluno = alunoExiste.idAluno;
        aluno.ra = alunoExiste.ra;
        aluno.nome = alunoExiste.nome;
        aluno.email = alunoExiste.email;
        aluno.aprovado = alunoExiste.aprovado;

        const inputRa = document.getElementById('input_ra');
        inputRa.value = aluno.ra;
        const inputNome = document.getElementById('input_nome');
        inputNome.value = aluno.nome;
        const inputEmail = document.getElementById('input_email');
        inputEmail.value = aluno.email;

        const btnCadastrar = document.getElementById('btn_cadastrar');
        btnCadastrar.value = 'Alterar';

        mostrarOcultarBotaoCancelar(true); // Mostra o botão que cancela a alteração
    }
}

function update() {
    if (idAlunoCadastro > 0) {
        //let indexItem = inputId.value.replace('aluno_id_', '');

        let alunoUpdate = alunoArrayLista.find(o => o.idAluno === idAlunoCadastro);

        const inputRa = document.getElementById('input_ra').value;
        const inputNome = document.getElementById('input_nome').value;
        const inputEmail = document.getElementById('input_email').value;

        let alunoModel = new AlunoModel();
        alunoModel.id = alunoUpdate.id;
        alunoModel.idAluno = idAlunoCadastro;
        alunoModel.ra = inputRa;
        alunoModel.nome = inputNome;
        alunoModel.email = inputEmail;
        alunoArrayLista.splice(alunoUpdate.id, 1);
        alunoArrayLista.push(alunoModel);
        localStorage.setItem('alunosList', JSON.stringify(alunoArrayLista));
        limpaCamposAluno();
        listarAlunos();
        mostrarOcultarBotaoCancelar(false) // Oculta o botão que cancela a alteração
    }
}

function deletarAluno(rowId) {
    const id = rowId.replace("row_id_", '');
    let objAluno = alunoArrayLista.find(o => o.id === parseInt(id));
    var modalPergunta = document.getElementById('modalPergunta');
    var tituloAlerta = document.getElementById('tituloModalPergunta');
    var mensagemAlerta = document.getElementById('mensagemModalPergunta');

    tituloAlerta.innerHTML = 'Pergunta!';

    mensagemAlerta.innerHTML = `Deseja excluir o aluno(a): "${objAluno.nome}"?`;
    var buttonSimModalPergunta = document.getElementById('simModalPergunta');
    buttonSimModalPergunta.setAttribute('onclick', `efetuaExclusaoAluno('${rowId}', ${objAluno.idAluno})`);

    modalPergunta.showModal();
}


function efetuaExclusaoAluno(rowId, idAluno) {
    var row = document.getElementById(rowId);
    const id = rowId.replace("row_id_", '');
    row.parentNode.removeChild(row);
    alunoArrayLista.splice(id, 1);
    localStorage.setItem('alunosList', JSON.stringify(alunoArrayLista));

    let removeValFromIndex = [];

    for (var i = 0; i < alunoArrayNotas.length; i++) {
        if (alunoArrayNotas[i].idAluno == idAluno) {
            console.log(`EXCLUINDO ID:::: ${i} - NOTA:::: ${alunoArrayNotas[i].notaProva} - DO ALUNO: ${idAluno}`);
            removeValFromIndex.push(i);
        }
    }

    for (var i = removeValFromIndex.length - 1; i >= 0; i--)
        alunoArrayNotas.splice(removeValFromIndex[i], 1);

    localStorage.setItem('notasList', JSON.stringify(alunoArrayNotas));


    var modal = document.getElementById('modalPergunta');
    modal.close();

    listarAlunos();
    listarNotas();
}
