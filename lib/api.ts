// lib/api.ts

import { headers } from "next/dist/server/request/headers";

const API_URL = 'http://localhost:8000';

export type Todo ={
    id: number;
    text: string;
    completed: boolean;
}


// Get all todos
export async function fetchTodos(): Promise<Todo[]>{
    const response = await fetch(`${API_URL}/todos`);
    return response.json();
}

// Add a new todo
export async function addTodo(todo: Omit<Todo, 'id'>): Promise<Todo>{
    const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(todo),
    });
    return response.json();
}


// Update a todo
export async function updateTodo(id: number, updates: Partial<Todo>): Promise<Todo> {
    const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(updates),
    });
    return response.json();
}



// Delete a todo
export async function deleteTodoApi(id: number): Promise<void> {
    await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
});
};