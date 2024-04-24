const localStorage = window.localStorage;
let alunoArrayLista = localStorage.getItem('alunosList') ? JSON.parse(localStorage.getItem('alunosList')) : [];
localStorage.setItem('alunosList', JSON.stringify(alunoArrayLista));

let notaArrayLista = localStorage.getItem('notasList') ? JSON.parse(localStorage.getItem('notasList')) : [];
localStorage.setItem('notasList', JSON.stringify(notaArrayLista));

class AlunoObj {
    constructor(id, ra, nome, email) {
        this.id = id;
        this.ra = ra;
        this.nome = nome;
        this.email = email;
    }
}

window.onload = function () {
    listarAlunos();
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
    row.style = 'background-color: grey;';

    var thRA = document.createElement("th");
    thRA.innerHTML = 'RA';
    thRA.style = 'width: 100px; text-align: left;';
    row.append(thRA);

    var thTask = document.createElement("th");
    thTask.innerHTML = 'Nome';
    thTask.style = 'width: 40%; text-align: left;';
    row.append(thTask);

    var thEmail = document.createElement("th");
    thEmail.innerHTML = 'E-mail';
    thEmail.style = 'width: 40%;; text-align: left;';
    row.append(thEmail);

    var thActions = document.createElement("th");
    thActions.innerHTML = 'Ações';
    thActions.style = 'text-align: center;';
    thActions.colSpan = 3;
    row.append(thActions);

    const table = document.getElementById("table");
    table.insertBefore(row, table.childNodes[0]);// Adiciona a linha na posição zero(0) tabela
}

function criarElemento(objetoTarefa) {
    const taskId = `tarefa_id_${objetoTarefa.id}`;

    // Create two new cells
    var cellTextoTarefa = document.createElement("td");
    cellTextoTarefa.id = taskId;
    cellTextoTarefa.innerHTML = objetoTarefa.nome;

    var cellCheckBox = document.createElement("td");
    var cellEditar = document.createElement("td");
    var cellDeletar = document.createElement("td");
    const rowId = `row_id_${objetoTarefa.id}`;

    cellEditar.appendChild(criaButtonGeneric('Editar', 'btn_editar', `modalEdicaoTarefa('${taskId}')`));
    cellDeletar.appendChild(criaButtonGeneric('Deletar', 'btn_deletar', `deletarTarefa('${rowId}', '${taskId}')`));

    var row = document.createElement("tr");
    row.id = rowId;
    row.appendChild(cellTextoTarefa);
    row.appendChild(cellCheckBox);
    row.appendChild(cellEditar);
    row.appendChild(cellDeletar);
    const table = document.getElementById("table");
    table.appendChild(row);// Adiciona a linha na tabela
    const inputNovaTarefa = document.getElementById('input_nova_tarefa');
    inputNovaTarefa.value = ''; // Limpa o input de tarefa
    document.getElementById("input_nova_tarefa").focus(); // Seta o foco no input

    const idInputChecked = `checkbox_${taskId}`;

    if (!objetoTarefa.email) {
        row.style = 'text-decoration: none;';
        document.getElementById(idInputChecked).checked = false;
    } else {
        row.style = 'text-decoration: line-through;';
        document.getElementById(idInputChecked).checked = true;
    }
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

function addAluno() {
    const novaTarefa = document.getElementById('input_nova_tarefa').value;
    if (novaTarefa == null || novaTarefa == '') {
        swal('OPS!, Enter the task description.', {
            button: {
                text: "OK",
            },
        });
        return;
    }
    const table = document.getElementById("table");
    let quantidade = table.children.length;
    let objTarefa = new AlunoObj();
    objTarefa.id = quantidade;
    objTarefa.nome = novaTarefa;
    objTarefa.email = false;
    criaNovaTarefa(objTarefa, true);
};

function criaNovaTarefa(objeto) {
    let temItem = false;

    for (var i = 0; i < alunoArrayLista.length; i++) {
        if (alunoArrayLista[i].nome.trim() == objeto.nome.trim()) {
            temItem = true;
            break;
        }
    }

    if (temItem) {
        swal('Alert!', 'This task has already been registered.', "info");
        return;
    }

    let objetoTarefa = new AlunoObj();
    objetoTarefa.id = objeto.id - 1;
    objetoTarefa.nome = objeto.nome;
    objetoTarefa.email = false;
    alunoArrayLista.push(objetoTarefa);
    criarElemento(objetoTarefa);

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

function mudaEstadoTarefa(taskId) {
    const tarefa = document.getElementById(taskId).innerHTML;
    let indexItem = -1;
    let objTarefa = new AlunoObj();
    objTarefa.id = indexItem;
    objTarefa.nome = tarefa;

    for (var i = 0; i < alunoArrayLista.length; i++) {
        if (alunoArrayLista[i].nome.trim() == tarefa.trim()) {
            objTarefa.email = !alunoArrayLista[i].email;
            indexItem = i;
            break;
        } else {
            objTarefa.email = alunoArrayLista[i].email;
        }
    }
    alunoArrayLista.splice(indexItem, 1);
    alunoArrayLista.push(objTarefa);
    localStorage.setItem('alunosList', JSON.stringify(alunoArrayLista));
    listarAlunos();
}

function modalEdicaoTarefa(taskId) {
    const taskSelected = document.getElementById(taskId).innerHTML;
    //let tarefaAlterada = prompt('Changing task', taskSelected);
    // Documentação do exemplo: https://sweetalert.js.org/guides/ AND https://sweetalert2.github.io/#examples

    for (var i = 0; i < alunoArrayLista.length; i++) {
        if (alunoArrayLista[i].nome.trim() == taskSelected.trim() && alunoArrayLista[i].email) {
            swal('Attention!', 'This task has now been completed.', "warning");
            return;
        }
    }

    swal({
        title: 'Changing task!',
        content: "input",
        content: {
            element: "input",
            attributes: {
                placeholder: "Please inform the task",
                value: taskSelected,
            },
        },
        closeModal: false,
        closeOnClickOutside: false,
        closeOnEsc: false,
        height: 250,
    }).then((newValue) => {
        if (newValue) {
            update(newValue, taskId)
        } else {
            swal('Attention!', 'This task has not changed.', "info");
        }
    });
}

function update(newValue, taskId) {
    document.getElementById(taskId).innerHTML = newValue;
    let indexItem = taskId.replace('tarefa_id_', '');
    let email = false;
    if (newValue != null) {
        for (var i = 0; i < alunoArrayLista.length; i++) {
            if (alunoArrayLista[i].nome.trim() == newValue.trim()) {
                email = alunoArrayLista[i].email;
                temItem = true;
                break;
            }
        }
        let objTarefa = new AlunoObj();
        objTarefa.id = indexItem;
        objTarefa.nome = newValue;
        objTarefa.email = email;
        alunoArrayLista.splice(indexItem, 1);
        alunoArrayLista.push(objTarefa);
        localStorage.setItem('alunosList', JSON.stringify(alunoArrayLista));
    }
}

function deletarTarefa(rowId, idTask) {
    var row = document.getElementById(rowId);
    const id = rowId.replace("row_id_", '');
    var rowDescri = document.getElementById(idTask).innerHTML;
    swal({
        title: `Do you really want to delete this task: "${rowDescri}"?`,
        icon: "info",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,

    }).then((willDelete) => {
        if (willDelete) {
            row.parentNode.removeChild(row);
            alunoArrayLista.splice(id, 1);
            localStorage.setItem('alunosList', JSON.stringify(alunoArrayLista));
            listarAlunos();
            swal("Task deleted successfully!", {
                icon: "warning",
                timer: 2000,
            });
        }
    });
}
