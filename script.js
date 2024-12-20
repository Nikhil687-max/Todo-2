document.addEventListener('DOMContentLoaded',() => {
    let Input = document.getElementById('inputNewTask');
    let AddTask = document.getElementById('submitBtn');
    let List = document.getElementById('taskLists');

    let Tasks = JSON.parse(localStorage.getItem('item')) || [];
    // const Tasks = [];


    for(let i = 0;i < Tasks.length;i++){
        renderTask(Tasks[i], i);
    }
    // Tasks.forEach(task => renderTask(task));

    AddTask.addEventListener('click',()=>{
        if(Input.value.trim() === "")return;
        const newTask = {
            id: Date.now(),
            text: Input.value.trim(),
            Complete: false
        }
        Tasks.push(newTask);
        saveToLocal();
        Input.value = "";
        renderTask(newTask);
        console.log(Tasks);
    })
    function saveToLocal() {
        localStorage.setItem('item',JSON.stringify(Tasks));
    }
    function renderTask(e){
        let listItem = document.createElement('li');
        listItem.textContent = e.text;
        let buttons = document.createElement('div');
        let button = document.createElement('button');
        button.textContent = 'Delete';
        buttons.appendChild(button);
        let button2 = document.createElement('button');
        button2.textContent = 'Remove';
        buttons.appendChild(button2);
        listItem.appendChild(buttons);
        buttons.style.textWrap = '';
        buttons.style.paddingLeft = "3rem";
        button.addEventListener('click', () => {
            listItem.classList.toggle('highlight')
        })
        button2.addEventListener('click', () => {
            document.getElementById('taskLists').removeChild(listItem);
            let id = e.id;
            for(let i = 0;i < Tasks.length;i++){
                if(Tasks[i].id === id){removeIt(i);}
            }
        })

        List.appendChild(listItem);
    }

    function removeIt(index){
        for(let i = index;i < Tasks.length-1;i++){
            Tasks[i] = Tasks[i+1];
        }
        Tasks.length -= 1;
        console.log(Tasks.length);
        localStorage.setItem('item', JSON.stringify(Tasks));
    }
})
