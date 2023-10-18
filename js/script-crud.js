const taskListContainer = document.querySelector('.app__section-task-list')

const formTask = document.querySelector('.app__form-add-task')
const toggleFormTaskBtn = document.querySelector('.app__button--add-task') // toggle = altenar (ele sera responsavel em fazer nosso formulario ficar visivel ao clicar no botao)
const formLabel = document.querySelector('.app__form-label')

let tarefas = [
    {
        descricao: 'Tarefa Concluída',
        concluidas: true
    },
    {
        descricao: 'Tarefa Pendente',
        concluidas: false
    }
]

const taskIconSvg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`
function createTask(tarefa) { //Essa função receberá a tarefa como parâmetro, dado que ela está gerando uma tarefa
    const li = document.createElement('li') //cria um elemento (nesse caso uma lista) pelo no HTML direto pelo JS
    li.classList.add('app__section-task-list-item') //cria uma classe para o elmento acima, para poder estilizar ela no css

    const svgIcon = document.createElement('svg') //
    svgIcon.innerHTML = taskIconSvg

    const paragraph = document.createElement('p')
    paragraph.classList.add('app__section-task-list-item-description')

    paragraph.textContent = tarefa.descricao // tarefa receba a descrição

    li.appendChild(svgIcon) //pegando o elemento filho e jogando dentro do elemento pai que seria o LI (que representa uma tarefa)
    li.appendChild(paragraph)

    return li
}

tarefas.forEach(task => {
    const taskItem = createTask(task)
    taskListContainer.appendChild(taskItem)
})

toggleFormTaskBtn.addEventListener('click', () => {
    formLabel.textContent = 'Adicionando tarefa'
    formTask.classList.toggle('hidden')
})