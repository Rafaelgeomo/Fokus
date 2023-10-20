const taskListContainer = document.querySelector('.app__section-task-list')

const formTask = document.querySelector('.app__form-add-task')
const toggleFormTaskBtn = document.querySelector('.app__button--add-task') // toggle = altenar (ele sera responsavel em fazer nosso formulario ficar visivel ao clicar no botao)
const formLabel = document.querySelector('.app__form-label')

const cancelTaskBtn = document.querySelector('.app__form-footer__button--cancel')

const taskAtiveDescription = document.querySelector('.app__section-active-task-description')

const textarea = document.querySelector('.app__form-textarea')

const btnCancelar = document.querySelector('.app__form-footer__button--cancel')

const localStorageTarefas = localStorage.getItem('tarefas')

let tarefas = localStorageTarefas ? JSON.parse(localStorageTarefas) : []

const taskIconSvg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`
let tarefaSelecionada = null
let itemTarefaSelecionada = null

let tarefaEmEdicao = null
let paragraphEmEdicao = null

const selecionaTarefa = (tarefa, elemento) => {

    document.querySelectorAll('.app__section-task-list-item-active').forEach(function(button){
        button.classList.remove('app__section-task-list-item-active')
    })

    if(tarefaSelecionada == tarefa){
        taskAtiveDescription.textContent = null
        itemTarefaSelecionada = null
        tarefaSelecionada = null
        return
    }

    tarefaSelecionada = tarefa
    itemTarefaSelecionada = elemento
    taskAtiveDescription.textContent = tarefa.descricao
    elemento.classList.add('app__section-task-list-item-active')

}
const limparForm = ()=> {
    tarefaEmEdicao = null
    paragraphEmEdicao = null
    textarea.value = ''
    formTask.classList.add('hidden')
}

const selecionaTarefaParaEditar = (tarefa, elemento) => {
    if(tarefaEmEdicao == tarefa) {
        limparForm()
        return
    }

    formLabel.textContent = 'Editando tarefa'
    tarefaEmEdicao = tarefa
    paragraphEmEdicao = elemento
    textarea.value = tarefa.descricao
    formTask.classList.remove('hidden')
}

function createTask(tarefa) { //Essa função receberá a tarefa como parâmetro, dado que ela está gerando uma tarefa
    const li = document.createElement('li') //cria um elemento (nesse caso uma lista) pelo no HTML direto pelo JS
    li.classList.add('app__section-task-list-item') //cria uma classe para o elmento acima, para poder estilizar ela no css

    const svgIcon = document.createElement('svg') //
    svgIcon.innerHTML = taskIconSvg

    const paragraph = document.createElement('p')
    paragraph.classList.add('app__section-task-list-item-description')

    paragraph.textContent = tarefa.descricao // tarefa receba a descrição

    const button = document.createElement('button')

    button.classList.add('app_button-edit')
    const editIcon = document.createElement('img')
    editIcon.setAttribute('src', '/img/edit.png')

    button.appendChild(editIcon)

    button.addEventListener('click', (event) => {
        event.stopPropagation()
        selecionaTarefaParaEditar(tarefa, paragraph)
    })

    li.onclick = () => {
        selecionaTarefa(tarefa, li)
    }

    svgIcon.addEventListener('click', (event) => {
        event.stopPropagation()
        button.setAttribute('disabled', true)
        li.classList.add('app__section-task-list-item-complete')
    })

    if(tarefa.concluida){
        button.setAttribute('disabled', true)
        li.classList.add('app__section-task-list-item-complete')
    }

    li.appendChild(svgIcon) //pegando o elemento filho e jogando dentro do elemento pai que seria o LI (que representa uma tarefa)
    li.appendChild(paragraph)
    li.appendChild(button)

    return li
}

tarefas.forEach(task => {
    const taskItem = createTask(task)
    taskListContainer.appendChild(taskItem)
})

cancelTaskBtn.addEventListener('click', ()=>{
    formTask.classList.toggle('hidden')
})

btnCancelar.addEventListener('click', limparForm)

toggleFormTaskBtn.addEventListener('click', () => {
    formLabel.textContent = 'Adicionando tarefa'
    formTask.classList.toggle('hidden')    
})

const updateLocalStorage = () => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

formTask.addEventListener('submit', (evento) =>{
    evento.preventDefault()
    if (tarefaEmEdicao){
        tarefaEmEdicao.descricao = textarea.value
        paragraphEmEdicao.textContent = textarea.value
    } else {
    const task = {
        descricao: textarea.value,
        concluida: false
    }
    tarefas.push(task)
    const taskItem = createTask(task)
    taskListContainer.appendChild(taskItem)
}
    updateLocalStorage()
    limparForm()
})


