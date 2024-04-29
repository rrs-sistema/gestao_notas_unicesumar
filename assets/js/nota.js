let idAlunoNota = -1;
let idNota = -1;

class NotaModel {
    constructor(id, idAluno, semestre, notaProva, notaAEP, notaIntegrada) {
        this.id = id;
        this.idAluno = idAluno;
        this.semestre = semestre;
        this.notaProva = notaProva;
        this.notaAEP = notaAEP;
        this.notaIntegrada = notaIntegrada;
    }
}

function listarNotas() {

    const dadosLocalStorage = JSON.parse(localStorage.getItem('notasList'));
    alunoArrayNotas = [];
    let index = 0;
    dadosLocalStorage.forEach(item => {
        item.id = index;
        alunoArrayNotas.push(item);
        index++;
    });
    localStorage.setItem('notasList', JSON.stringify(alunoArrayNotas));

    criaTableNota();
}

function criaTableNota() {
    var row = document.createElement("tr");
    row.style = 'background-color: #0F2028;';

    var thRA = document.createElement("th");
    thRA.innerHTML = 'Semestre';
    thRA.style = 'width: 45%; text-align: center; color: #FFFFFF;';
    row.append(thRA);

    var thTask = document.createElement("th");
    thTask.innerHTML = 'Média do bimestre';
    thTask.style = 'width: 45%; text-align: center; color: #FFFFFF;';
    row.append(thTask);

    var thStatus = document.createElement("th");
    thStatus.innerHTML = 'Status';
    thStatus.style = 'width: 120px; text-align: center; color: #FFFFFF;';
    row.append(thStatus);


    var thActions = document.createElement("th");
    thActions.innerHTML = 'Ações';
    thActions.style = 'text-align: center; color: #FFFFFF;';
    thActions.colSpan = 3;
    row.append(thActions);

    const tableNotaSemestre = document.getElementById("tableNotaSemestre");
    tableNotaSemestre.insertBefore(row, tableNotaSemestre.childNodes[0]);// Adiciona a linha na posição zero(0) tabela

    const notasLocalStorage = JSON.parse(localStorage.getItem('notasList'));
    alunoArrayNotas = [];
    let index = 0;
    notasLocalStorage.forEach(item => {
        item.id = index;
        alunoArrayNotas.push(item);
        index++;
    });
}

function buscaNotas(idAluno) {

    const dadosLocalStorage = JSON.parse(localStorage.getItem('notasList'));
    alunoArrayNotas = [];

    let index = 0;
    dadosLocalStorage.forEach(item => {
        item.id = index;
        alunoArrayNotas.push(item);
        index++;
    });

    let notasAluno = alunoArrayNotas.filter(o => o.idAluno === idAlunoNota);

    let mediaBimestre = 0;
    const labelMediaSemestral = document.getElementById('labelMediaSemestral');
    labelMediaSemestral.innerHTML = '';


    notasAluno.forEach(item => {
        mediaBimestre = mediaBimestre + (item.notaProva + item.notaAEP + item.notaIntegrada);
        criarElementoNota(item);
    });

    if (mediaBimestre != 0) {
        const valorMedia = (mediaBimestre / 2);
        const resultadoL = valorMedia > 6 ? 'Aprovado' : (valorMedia >= 3 && valorMedia < 6) ? 'Recuperação' : 'Reprovado';
        labelMediaSemestral.innerHTML = `${resultadoL} com a média: ${valorMedia.toFixed(1)}`;
    }

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
    //localStorage.setItem('notasList', JSON.stringify(alunoArrayNotas))
}

function criarElementoNota(modeloNota) {
    const alunoId = `aluno_id_${modeloNota.idAluno}`;
    const mediaBimestre = (modeloNota.notaProva + modeloNota.notaAEP + modeloNota.notaIntegrada);

    // Create two new cells
    var cellTextoSemestre = document.createElement("td");
    cellTextoSemestre.id = alunoId;
    cellTextoSemestre.innerHTML = modeloNota.semestre == 'bimestre1' ? '1º Bimestre' : '2º Bimestre';
    // Create two new cells
    var cellTextoNota = document.createElement("td");
    cellTextoNota.id = alunoId;
    cellTextoNota.innerHTML = mediaBimestre.toFixed(1);

    var cellTextoStatus = document.createElement("td");
    cellTextoStatus.id = alunoId;
    cellTextoStatus.innerHTML = mediaBimestre > 6 ? 'Aprovado' : (mediaBimestre >= 3 && mediaBimestre < 6) ? 'Recuperação' : 'Reprovado';
    cellTextoStatus.style.backgroundColor = mediaBimestre > 6 ? '#32CD32' : (mediaBimestre >= 3 && mediaBimestre < 6) ? '#FFA500' : '#FF0000';

    var cellVerNotas = document.createElement("td");
    const rowId = `row_id_${modeloNota.id}`;

    cellVerNotas.appendChild(criaButtonGeneric('Ver notas', 'btn_ver_notas', `modalVerNotasAluno('${alunoId}', '${modeloNota.semestre}')`));
    cellVerNotas.style = 'text-align: center;';

    var row = document.createElement("tr");
    row.id = rowId;
    row.appendChild(cellTextoSemestre);
    row.appendChild(cellTextoNota);
    row.appendChild(cellTextoStatus);
    row.appendChild(cellVerNotas);
    const table = document.getElementById("tableNotaSemestre");
    table.appendChild(row);// Adiciona a linha na tabela

}

function modalVerNotasAluno(alunoCodigo, semestre) {
    limpaCamposNotas();
    idNota = -1;
    const alunoID = alunoCodigo.replace("aluno_id_", '');
    idAlunoNota = parseInt(alunoID);

    let notaDoAluno = alunoArrayNotas.find(o => o.idAluno === idAlunoNota && o.semestre === semestre);

    if (notaDoAluno != null && notaDoAluno != undefined) {

        idNota = notaDoAluno.id;

        const bimestreSelecionado = document.getElementById('bimestreSelecionado');
        bimestreSelecionado.value = notaDoAluno.semestre;
        const inputNotaProva = document.getElementById('input_nota_prova');
        inputNotaProva.value = notaDoAluno.notaProva;
        const inputNotaAEP = document.getElementById('input_nota_aep');
        inputNotaAEP.value = notaDoAluno.notaAEP;
        const inputNotaProvaIntegrada = document.getElementById('input_nota_prova_integrada');
        inputNotaProvaIntegrada.value = notaDoAluno.notaIntegrada;

        var modalAdicionaNota = document.getElementById('modalAdicionaNota');
        modalAdicionaNota.showModal();


        const btnCadastrarNota = document.getElementById('btn_cadastrar_modal_adiciona_nota');
        btnCadastrarNota.value = 'Alterar';

    }
}

function limpaCamposNotas() {
    const bimestreSelecionado = document.getElementById('bimestreSelecionado');
    bimestreSelecionado.value = '';
    const inputNotaProva = document.getElementById('input_nota_prova');
    inputNotaProva.value = null;
    const inputNotaAEP = document.getElementById('input_nota_aep');
    inputNotaAEP.value = null;
    const inputNotaProvaIntegrada = document.getElementById('input_nota_prova_integrada');
    inputNotaProvaIntegrada.value = null;

    const btnCadastrarNota = document.getElementById('btn_cadastrar_modal_adiciona_nota');
    btnCadastrarNota.value = 'Cadastrar';
}

function closeModal() {
    var modal = document.getElementById('modalNotaSemestre');
    modal.close();
}

function closeModalAlerta() {
    var modal = document.getElementById('modalAlerta');
    modal.close();
}

function closeModalPergunta() {
    var modal = document.getElementById('modalPergunta');
    modal.close();
}


function listarNotaAluno(alunoID) {
    idAlunoNota = alunoID;
    const tableNotaSemestre = document.getElementById("tableNotaSemestre");
    var fc = tableNotaSemestre.firstChild;

    while (fc.nextSibling) {
        tableNotaSemestre.removeChild(fc.nextSibling);
    }

    buscaNotas(alunoID);
    let objAluno = alunoArrayLista.find(o => o.idAluno === idAlunoNota);
    const table = document.getElementById("tableNotaSemestre");
    table.style = 'width: 100%; text-align: center; color: #FFFFFF;';
    // When the user clicks anywhere outside of the modal, close it
    var modal = document.getElementById('modalNotaSemestre');
    var sectionTabelaNota = document.getElementById('sectionTabelaNota');
    sectionTabelaNota.append(table);
    var tituloNota = document.getElementById('tituloNota');
    tituloNota.innerHTML = `Notas do aluno(a): ${objAluno.nome}`;

    modal.showModal();
}

function cadastrarNotaAluno() {
    const bimestreSelecionado = document.getElementById('bimestreSelecionado').value;
    const inputNotaProva = document.getElementById('input_nota_prova').value;
    const inputNotaAEP = document.getElementById('input_nota_aep').value;
    const inputNotaProvaIntegrada = document.getElementById('input_nota_prova_integrada').value;

    var modalAlerta = document.getElementById('modalAlerta');
    var tituloAlerta = document.getElementById('tituloAlerta');
    var mensagemAlerta = document.getElementById('mensagemAlerta');

    tituloAlerta.innerHTML = 'Atenção!';

    if (bimestreSelecionado == null || bimestreSelecionado == '') {
        mensagemAlerta.innerHTML = 'Por favor informe o bimestre.';
        modalAlerta.showModal();
        return;
    }

    if (inputNotaProva == null || inputNotaProva == '') {
        mensagemAlerta.innerHTML = 'Por favor a nota da prova.';
        modalAlerta.showModal();
        return;
    }

    if (inputNotaAEP == null || inputNotaAEP == '') {
        mensagemAlerta.innerHTML = 'Por favor a nota da AEP.';
        modalAlerta.showModal();
        return;
    }

    if (inputNotaProvaIntegrada == null || inputNotaProvaIntegrada == '') {
        mensagemAlerta.innerHTML = 'Por favor a nota da Integrada.';
        modalAlerta.showModal();
        return;
    }

    let notaModel = new NotaModel();

    notaModel.idAluno = idAlunoNota;
    notaModel.semestre = bimestreSelecionado;
    notaModel.notaProva = parseFloat(inputNotaProva);
    notaModel.notaAEP = parseFloat(inputNotaAEP);
    notaModel.notaIntegrada = parseFloat(inputNotaProvaIntegrada);

    if (notaModel.notaProva > 8) {
        mensagemAlerta.innerHTML = 'A nota da prova não pode ser maior que 8.0';
        modalAlerta.showModal();
        return;
    }
    if (notaModel.notaAEP > 1) {
        mensagemAlerta.innerHTML = 'A nota da AEP não pode ser maior que 1.0';
        modalAlerta.showModal();
        return;
    }
    if (notaModel.notaIntegrada > 1) {
        mensagemAlerta.innerHTML = 'A nota da integrada não pode ser maior que 1.0';
        modalAlerta.showModal();
        return;
    }

    if (idNota >= 0) {
        notaModel.id = idNota;
        alunoArrayNotas.splice(idNota, 1);
    } else {
        notaModel.id = alunoArrayNotas.length;
    }
    alunoArrayNotas.push(notaModel);
    localStorage.setItem('notasList', JSON.stringify(alunoArrayNotas));

    fechaModalAdicionaNota();
    limpaCamposNotas();

    chamaModalNotaSemestre();
}

function chamaModalNotaSemestre() {
    var modalNotaSemestre = document.getElementById('modalNotaSemestre');
    modalNotaSemestre.close();
}


function chamaModalAdicionaNota() {
    idNota = -1;
    let notasAluno = alunoArrayNotas.filter(o => o.idAluno === idAlunoNota);
    if (notasAluno != null && notasAluno != undefined && notasAluno.length > 1) {
        var modalAlerta = document.getElementById('modalAlerta');
        var tituloAlerta = document.getElementById('tituloAlerta');
        tituloAlerta.innerHTML = 'Atenção!';
        var mensagemAlerta = document.getElementById('mensagemAlerta');
        mensagemAlerta.innerHTML = 'Esse aluno já teve suas notas do semestre apontadas.';
        modalAlerta.showModal();
        return;
    }

    chamaModalNotaSemestre();

    var modal = document.getElementById('modalAdicionaNota');
    modal.showModal();
}

function fechaModalAdicionaNota() {
    var modal = document.getElementById('modalAdicionaNota');
    modal.close();
    limpaCamposNotas();
}


