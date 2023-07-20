const url = "http://localhost:3001"

export const getAllToDos = async () => {
    let tUrl = url.concat("/tasks");
    const response = await fetch(tUrl);
    const todos = await response.json();
    return todos;
}