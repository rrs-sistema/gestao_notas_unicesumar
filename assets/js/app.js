const localStorage = window.localStorage;
let alunoArrayLista = localStorage.getItem('alunosList') ? JSON.parse(localStorage.getItem('alunosList')) : [];
localStorage.setItem('alunosList', JSON.stringify(alunoArrayLista));

let alunoArrayNotas = localStorage.getItem('notasList') ? JSON.parse(localStorage.getItem('notasList')) : [];
localStorage.setItem('notasList', JSON.stringify(alunoArrayNotas));

class AlunoModel {
    constructor(id, ra, nome, email, aprovado) {
        this.id = id;
        this.ra = ra;
        this.nome = nome;
        this.email = email;
        this.aprovado = aprovado;
        this.notas = [];
    }
}

window.onload = function () {
    listarAlunos();
    let nota1 = new NotaModel();
    nota1.id = 0;
    nota1.idAluno = 2;
    nota1.semestre = '1º Semestre';
    nota1.nota = 5.9;
    nota1.aprovado = false;

    let nota2 = new NotaModel();
    nota2.id = 1;
    nota2.idAluno = 2;
    nota2.semestre = '2º Semestre';
    nota2.nota = 9.3;
    nota2.aprovado = true;

    let nota3 = new NotaModel();
    nota3.id = 0;
    nota3.idAluno = 0;
    nota3.semestre = '1º Semestre';
    nota3.nota = 7.7;
    nota3.aprovado = true;

    let nota4 = new NotaModel();
    nota4.id = 2;
    nota4.idAluno = 1;
    nota4.semestre = '1º Semestre';
    nota4.nota = 8.1;
    nota4.aprovado = true;

    alunoArrayNotas = [];

    alunoArrayNotas.push(nota1, nota2, nota3, nota4);
    localStorage.setItem('notasList', JSON.stringify(alunoArrayNotas));
    listarNotas();
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

    localStorage.setItem('alunosList', JSON.stringify(alunoArrayLista))
}

function criaCabecalhoTable() {
    var row = document.createElement("tr");
    row.style = 'background-color: #0F2028;';

    var thRA = document.createElement("th");
    thRA.innerHTML = 'RA';
    thRA.style = 'width: 120px; text-align: left;';
    row.append(thRA);

    var thTask = document.createElement("th");
    thTask.innerHTML = 'Nome';
    thTask.style = 'width: 35%; text-align: left;';
    row.append(thTask);

    var thEmail = document.createElement("th");
    thEmail.innerHTML = 'E-mail';
    thEmail.style = 'width: 35%; text-align: left;';
    row.append(thEmail);

    var thActions = document.createElement("th");
    thActions.innerHTML = 'Ações';
    thActions.colSpan = 3;
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

    cellEditar.appendChild(criaButtonGeneric('Editar', 'btn_editar', `modalEdicaoAluno('${alunoId}')`));
    cellEditar.style = 'text-align: center;';
    cellNota.appendChild(criaButtonGeneric('Notas', 'btn_nota', `listarNotaAluno('${alunoId}')`));
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
    limpaCampos();

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

function limpaCampos() {
    const inputId = document.getElementById('input_id');
    inputId.value = ''; // Limpa o input de ID

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

function cadastrarAluno() {

    const inputId = document.getElementById('input_id');

    const nomeAluno = document.getElementById('input_nome').value;
    const raAluno = document.getElementById('input_ra').value;
    const emailAluno = document.getElementById('input_email').value;
    if (nomeAluno == null || nomeAluno == '') {
        swal('OPS!, Por favor informe o nome do aluno.', {
            button: {
                text: "OK",
            },
        });
        return;
    }
    if (raAluno == null || raAluno == '') {
        swal('OPS!, Por favor informe o RA (Registro Acadêmico) do aluno.', {
            button: {
                text: "OK",
            },
        });
        return;
    }
    if (emailAluno == null || emailAluno == '') {
        swal('OPS!, Por favor informe o e-mail do aluno.', {
            button: {
                text: "OK",
            },
        });
        return;
    }
    const table = document.getElementById("table");
    let quantidade = table.children.length;
    let alunoModel = new AlunoModel();
    alunoModel.id = quantidade;
    alunoModel.nome = nomeAluno;
    alunoModel.ra = raAluno;
    alunoModel.email = emailAluno;
    alunoModel.aprovado = false;
    if (inputId.value == undefined || inputId.value == null || inputId.value == '') {
        cadastraAluno(alunoModel, true);
    } else {
        //swal('Pergunta!', 'Deseja alterar os dados do aluno?', "info");
        swal({
            title: `Você deseja alterar os dados do(a) aluno(a): "${nomeAluno}"?`,
            icon: "warning",
            buttons: ["Não", "Sim"],
            buttons: true,
            dangerMode: true,

        }).then((acao) => {
            if (acao) {
                console.log(`Alterado os dados do(a) aluno(a): ${nomeAluno}`);
                update();
            } else {
                console.log(`Não foi alterado os dados do(a) aluno(a): ${nomeAluno}`);
            }
        });
    }
};

function cadastraAluno(objeto) {
    let nomeExiste = false;
    let raExiste = false;
    let emailExiste = false;

    let alunoExiste = alunoArrayLista.find(o => o.nome === objeto.nome);

    if (alunoExiste != null) {
        nomeExiste = true;
    } else if (alunoExiste == null) {
        alunoExiste = alunoArrayLista.find(o => o.ra === objeto.ra);
        raExiste = true;
    } else if (alunoExiste == null) {
        alunoExiste = alunoArrayLista.find(o => o.email === objeto.email);
        emailExiste = true;
    }

    if (nomeExiste) {
        swal('Alert!', 'Ops, esse nome já foi cadastrado.', "info");
        return;
    }
    if (emailExiste) {
        swal('Alert!', 'Ops, esse e-mail já foi cadastrado.', "info");
        return;
    }
    if (raExiste) {
        swal('Alert!', 'Ops, esse RA (Registro Acadêmico) já foi cadastrado.', "info");
        return;
    }

    let modeloAluno = new AlunoModel();
    modeloAluno.id = objeto.id - 1;
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

    localStorage.setItem('alunosList', JSON.stringify(alunoArrayLista))
}

function cancelaAlteracao() {
    mostrarOcultarBotaoCancelar(false);
    limpaCampos();
}

function modalEdicaoAluno(alunoId) {
    const taskSelected = document.getElementById(alunoId).innerHTML;
    for (var i = 0; i < alunoArrayLista.length; i++) {
        if (alunoArrayLista[i].ra.trim() == taskSelected) {
            let aluno = new AlunoModel();
            aluno.ra = alunoArrayLista[i].ra;
            aluno.nome = alunoArrayLista[i].nome;
            aluno.email = alunoArrayLista[i].email;
            aluno.aprovado = alunoArrayLista[i].aprovado;

            const inputId = document.getElementById('input_id');
            inputId.value = alunoId;
            const inputRa = document.getElementById('input_ra');
            inputRa.value = aluno.ra;
            const inputNome = document.getElementById('input_nome');
            inputNome.value = aluno.nome;
            const inputEmail = document.getElementById('input_email');
            inputEmail.value = aluno.email;

            const btnCadastrar = document.getElementById('btn_cadastrar');
            btnCadastrar.value = 'Alterar';

            mostrarOcultarBotaoCancelar(true); // Mostra o botão que cancela a alteração

            break;
        }
    }
}

function update() {
    const inputId = document.getElementById('input_id');
    if (inputId.value != undefined && inputId.value != null && inputId.value != '') {
        let indexItem = inputId.value.replace('aluno_id_', '');

        const inputRa = document.getElementById('input_ra').value;
        const inputNome = document.getElementById('input_nome').value;
        const inputEmail = document.getElementById('input_email').value;

        let alunoModel = new AlunoModel();
        alunoModel.id = indexItem;
        alunoModel.ra = inputRa;
        alunoModel.nome = inputNome;
        alunoModel.email = inputEmail;
        alunoArrayLista.splice(indexItem, 1);
        alunoArrayLista.push(alunoModel);
        localStorage.setItem('alunosList', JSON.stringify(alunoArrayLista));
        limpaCampos();
        listarAlunos();
        mostrarOcultarBotaoCancelar(false) // Oculta o botão que cancela a alteração
    }
}

function deletarAluno(rowId) {
    var row = document.getElementById(rowId);
    const id = rowId.replace("row_id_", '');
    let objAluno = alunoArrayLista.find(o => o.id === parseInt(id));
    swal({
        title: `Deseja excluir o aluno: "${objAluno.nome}"?`,
        icon: "info",
        buttons: ["Cancelar", "Excluir"],
        dangerMode: true,

    }).then((willDelete) => {
        if (willDelete) {
            row.parentNode.removeChild(row);
            alunoArrayLista.splice(id, 1);
            localStorage.setItem('alunosList', JSON.stringify(alunoArrayLista));
            listarTarefa();
            swal("Aluno excluir com sucesso!", {
                icon: "warning",
                timer: 2000,
            });
        }
    });
}
