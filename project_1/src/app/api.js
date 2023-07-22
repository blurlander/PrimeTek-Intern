const url = "http://localhost:3001"

export const getAllToDos = async () => {
    let tUrl = url.concat("/tasks");
    const response = await fetch(tUrl, { cache: 'no-store' });
    const todos = await response.json();
    return todos;

}

export const addNewTask = async (todo) => {
    let tUrl = url.concat("/tasks");
    const response = await fetch(tUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    })
    const newToDo = await response.json();
    return newToDo;
}

export const editTask = async (todo) => {
    let tUrl = url.concat("/tasks/");
    let id = todo.id;
    tUrl = tUrl.concat(id);
    const response = await fetch(tUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    })
    const updatedToDo = await response.json();
    return updatedToDo;
}