// Holds url for the backend
//const BACKEND_ROOT_URL = 'http://localhost:3001'
const BACKEND_ROOT_URL = 'https://todo-server-vlnw.onrender.com'
import { Task } from "./class/Task.js"  //why is not .ts
import { Todos } from "./class/Todos.js"

const todos = new Todos(BACKEND_ROOT_URL)

const list = <HTMLUListElement>document.querySelector('#todolist')
const input = <HTMLInputElement>document.querySelector('#newtodo')

// fetches data from the backend by making HTTP call. JSON is received as response.
//JSON (array) is looped through and each JSON object holding
//task is rendered to the UI. User is not able to add new tasks while data is retrieved.

input.disabled = true

todos.getTasks().then((tasks: Array<Task>) => {
    tasks.forEach(task => {
        renderTask(task)
    })
    input.disabled = false
}).catch(error => {
    alert(error)
});

/*fetch(BACKEND_ROOT_URL)
    .then(response => response.json())
    .then((response) => {
        response.forEach(node => {
            renderTask(node.description)
        });
        input.disabled = false
    }, (error) => {
        alert(error)
    })*/

input.addEventListener('keypress',event => {
    if (event.key === "Enter") {
        //event.preventDefault()
        const text = input.value.trim()
        if (text !== '') {
            //fetch command to post data from the front-end. Define that HTTP POST call is made
            //and pass description for the inserted task as JSON. Headers are used to define method,
            //type of the data that is passed to the server (application/json) and data itself (body).
            todos.addTask(text).then((task)=> {
                input.value = ''
                input.focus()
                renderTask(<Task>task)
            })
        }
        event.preventDefault()
    }
})        
            /*fetch(BACKEND_ROOT_URL + '/new',{
                method: 'post',
                headers:{
                    'Content-Type':'application/json'
                },
                body: json
            })
            .then(response => response.json())
            .then((response) => {
                renderTask(Task)
                input.value = ''
            }, (error) => {
                alert(error)
            })
        }
    }        
})*/

/*const renderTask = (text) => {
    const list_item = document.createElement('li')
    list_item.setAttribute('class', 'list-group-item')
    list_item.innerHTML = text
    list.append(list_item)
}*/

const renderTask = (task: Task) => {
    /*const list_item = document.createElement('li')
    list_item.setAttribute('class', 'list-group-item')
    list_item.innerHTML = task.text
    list.append(list_item)*/
    const list_item: HTMLLIElement = document.createElement('li')
    list_item.setAttribute('class', 'list-group-item')
    list_item.setAttribute('data-key',task.id.toString())
    //list_item.innerHTML = task.text
    renderSpan(list_item,task.text)
    renderLink(list_item,task.id)

    list.append(list_item)
}

const renderSpan = (list_item: HTMLLIElement,text: string) => {
    const span = list_item.appendChild(document.createElement('span'))
    span.innerHTML = text
}

const renderLink = (list_item: HTMLLIElement,id: number) => {
    const link = list_item.appendChild(document.createElement('a'))
    link.innerHTML = '<i class="bi bi-trash"></i>'
    link.setAttribute('style','float: right')
    link.addEventListener('click',event => {
       
        todos.removeTask(id).then((id) => {
            console.log(id)
            const elementToRemove:HTMLLIElement = document.querySelector(`[data-key='${id}']`)  //"${id}"
           
           console.log(`data-key='${id}']`)
            console.log(elementToRemove)
            if (elementToRemove) {
                list.removeChild(elementToRemove)
            }
        }).catch(error => {
            alert(error)
        })
    })
}