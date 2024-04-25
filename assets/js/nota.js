class NotaModel {
    constructor(id, idAluno, semestre, nota, aprovado) {
        this.id = id;
        this.idAluno = idAluno;
        this.semestre = semestre;
        this.nota = nota;
        this.aprovado = aprovado;
    }
}

function listarNotas() {
    console.log('LISTANDO NOTAS DOS ALUNOS....');
    criaTableNota();
}

function criaTableNota() {
    var row = document.createElement("tr");
    /*row.style = 'background-color: #0F2028;';*/

    var thRA = document.createElement("th");
    thRA.innerHTML = 'Semestre';
    thRA.style = 'width: 45%; text-align: center; color: #FFFFFF;';
    row.append(thRA);

    var thTask = document.createElement("th");
    thTask.innerHTML = 'Nota';
    thTask.style = 'width: 45%; text-align: center; color: #FFFFFF;';
    row.append(thTask);

    var thActions = document.createElement("th");
    thActions.innerHTML = 'Ações';
    thActions.style = 'text-align: center; color: #FFFFFF;';
    thActions.colSpan = 2;
    row.append(thActions);

    const tableNotaSemestre = document.getElementById("tableNotaSemestre");
    tableNotaSemestre.insertBefore(row, tableNotaSemestre.childNodes[0]);// Adiciona a linha na posição zero(0) tabela

    const notasLocalStorage = JSON.parse(localStorage.getItem('notasList'));
    alunoArrayNotas = [];
    let index = 0;
    notasLocalStorage.forEach(item => {
        item.id = index;
        alunoArrayNotas.push(item);
        //criarElementoNota(item);
        index++;
    });
}

function buscaNotas(idAluno) {
    let notasAluno = alunoArrayNotas.filter(o => o.idAluno === parseInt(idAluno));

    notasAluno.forEach(item => {
        criarElementoNota(item);
    });
}

function criarElementoNota(modeloNota) {
    const alunoId = `aluno_id_${modeloNota.id}`;

    // Create two new cells
    var cellTextoSemestre = document.createElement("td");
    cellTextoSemestre.id = alunoId;
    cellTextoSemestre.innerHTML = modeloNota.semestre;
    // Create two new cells
    var cellTextoNota = document.createElement("td");
    cellTextoNota.id = alunoId;
    cellTextoNota.innerHTML = modeloNota.nota;

    var cellEditar = document.createElement("td");
    var cellDeletar = document.createElement("td");
    const rowId = `row_id_${modeloNota.id}`;

    cellEditar.appendChild(criaButtonGeneric('Editar', 'btn_editar', `modalEdicaoAluno('${alunoId}')`));
    cellEditar.style = 'text-align: center;';
    cellDeletar.appendChild(criaButtonGeneric('Deletar', 'btn_deletar', `deletarAluno('${rowId}')`));
    cellDeletar.style = 'text-align: center;';

    var row = document.createElement("tr");
    row.id = rowId;
    row.appendChild(cellTextoSemestre);
    row.appendChild(cellTextoNota);
    row.appendChild(cellEditar);
    row.appendChild(cellDeletar);
    const table = document.getElementById("tableNotaSemestre");
    table.appendChild(row);// Adiciona a linha na tabela

    if (!modeloNota.aprovado) {
        row.style = 'text-decoration: underline dotted red;';
    } else {
        row.style = 'text-decoration: green wavy underline overline;';
    }
}

function listarNotaAluno(rowId) {
    const tableNotaSemestre = document.getElementById("tableNotaSemestre");
    var fc = tableNotaSemestre.firstChild;

    while (fc.nextSibling) {
        tableNotaSemestre.removeChild(fc.nextSibling);
    }

    const idAluno = rowId.replace("aluno_id_", '');
    buscaNotas(idAluno)
    let objAluno = alunoArrayLista.find(o => o.id === parseInt(idAluno));
    const table = document.getElementById("tableNotaSemestre");
    table.style = 'width: 100%; text-align: center; color: #FFFFFF;';
    swal({
        title: `Notas do aluno(a): ${objAluno.nome}`,
        // text: `Notas semestrais do aluno(a): ${objAluno.nome}`,
        // icon: "info",
        //button: "Ok",
        buttons: {
            cancel: {
                text: "Sair",
                value: null,
                visible: true,
                className: "",
                closeModal: true,
            },

        },
        content: table,
    });
}
