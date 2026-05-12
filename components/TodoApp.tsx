"use client";

import { useState, useEffect } from "react";

type Todo = {
    id: number;
    text: string;
    completed: boolean;
}

export default function TodoApp() {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editText, setEditText] = useState("");
    const [currentView, setCurrentView] = useState<'all' | 'active' | 'completed'>('all');

    // LOAD from localStorage
    useEffect(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
        setLoading(false);
    }, []);

    // SAVE to localStorage
    useEffect(() => {
        if (!loading) {
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }, [todos, loading]);

    const handleAddTodo = () => {
        if (inputValue.trim() === "") return;
        const newTodo: Todo = {
            id: Date.now(),
            text: inputValue,
            completed: false,
        };
        setTodos([...todos, newTodo]);
        setInputValue("");
    };

    const toggleCompleted = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const saveEdit = (id: number) => {
        if (editText.trim() === "") return;
        setTodos(todos.map(todo => todo.id === id ? { ...todo, text: editText } : todo));
        setEditingId(null);
        setEditText("");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleAddTodo();
    };

    const startEditing = (id: number, currentText: string) => {
        setEditingId(id);
        setEditText(currentText);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditText("");
    };

    const handleEditKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
        if (e.key === "Enter") saveEdit(id);
        else if (e.key === "Escape") cancelEdit();
    };

    const remainingCount = todos.filter(todo => !todo.completed).length;
    const filteredTodos = todos.filter(todo => {
        if (currentView === 'active') return !todo.completed;
        if (currentView === 'completed') return todo.completed;
        return true;
    });

    if (loading) {
        return <div className="max-w-2xl mx-auto mt-16 p-6 text-center text-gray-400">Loading todos...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-16 p-6">
            <h1 className="text-3xl font-bold text-center mb-8">📝 My Todo App</h1>

            <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <div className="flex gap-2">
                    <input type="text" value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress}
                        placeholder="What needs to be done?"
                        className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button onClick={handleAddTodo}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">Add</button>
                </div>
            </div>

            {todos.length > 0 && (
                <div className="mb-4 text-sm text-gray-400">{remainingCount} task{remainingCount !== 1 ? "s" : ""} remaining</div>
            )}

            <div className="flex gap-2 mb-6">
                <button onClick={() => setCurrentView('all')}
                    className={`px-4 py-2 rounded-lg transition-colors ${currentView === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                    All ({todos.length})
                </button>
                <button onClick={() => setCurrentView('active')}
                    className={`px-4 py-2 rounded-lg transition-colors ${currentView === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                    Active ({todos.filter(t => !t.completed).length})
                </button>
                <button onClick={() => setCurrentView('completed')}
                    className={`px-4 py-2 rounded-lg transition-colors ${currentView === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                    Completed ({todos.filter(t => t.completed).length})
                </button>
            </div>

            <div className="space-y-2">
                {filteredTodos.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">No {currentView !== 'all' ? currentView : "todos"} yet. Add one above!</div>
                ) : (
                    filteredTodos.map((todo) => (
                        <div key={todo.id} className="bg-gray-800 rounded-lg p-3 flex items-center justify-between gap-3">
                            {editingId === todo.id ? (
                                <div className="flex items-center gap-3 flex-1">
                                    <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)}
                                        onKeyDown={(e) => handleEditKeyPress(e, todo.id)} onBlur={() => saveEdit(todo.id)}
                                        className="flex-1 bg-gray-700 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" autoFocus />
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 flex-1">
                                    <input type="checkbox" checked={todo.completed} onChange={() => toggleCompleted(todo.id)}
                                        className="w-5 h-5 cursor-pointer accent-blue-600" />
                                    <span onDoubleClick={() => startEditing(todo.id, todo.text)}
                                        className={`text-white flex-1 cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}>
                                        {todo.text}
                                    </span>
                                </div>
                            )}
                            <button onClick={() => deleteTodo(todo.id)} className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
