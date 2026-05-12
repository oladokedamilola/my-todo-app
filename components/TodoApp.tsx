"use client";

import { useState, useEffect } from "react";
import { fetchTodos, addTodo, updateTodo, deleteTodoApi, Todo } from "@/lib/api";


// type Todo = {
//     id: number;
//     text: string;
//     completed: boolean;
// }

export default function TodoApp() {
    // State for the input value (what the user is typing)
    const [inputValue, setInputValue] = useState("");

    // State for the list of Todos
    const [todos, setTodos] = useState<Todo[]>([]);

    // Loading state
    const [ loading, setLoading ] = useState(true);

    // State for editing
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editText, setEditText] = useState("");


    // Filter: 'all' | 'active' | 'completed'
    const [currentView, setCurrentView] = useState<'all' | 'active' | 'completed'>('all');


    // LOAD: Fetch todos from API when app starts
    useEffect(()=>{
        const loadTodos = async ()=> {
            try {
                const data = await fetchTodos();
                setTodos(data);
            }
            catch (error) {
                console.error("Failed to load todos:", error)
            }
            finally {
                setLoading(false);
            }
        };
        loadTodos();
    }, []);


    // Add a new todo
    const handleAddTodo = async () => {
        if (inputValue.trim() === "") return;

        const newTodo = {
            text: inputValue,
            completed: false,
        };

        try {
            const saveTodo = await addTodo(newTodo);
            setTodos([...todos, saveTodo]);
            setInputValue("");
            
        }
        catch (error){
            console.error("Failed to add todo:", error)
        }
    }

    // Toggle completed status
    const toggleCompleted = async (id: number, completed: boolean) => {
        try{
            const updated = await updateTodo(id, {completed: !completed});
            setTodos(todos.map(todo => todo.id === id ? updated: todo))
        }
        catch (error){
            console.error("Failed to update todo:", error)
        }
    };


    // Delete a todo
    const deleteTodo = async (id: number) => {
        try{
            await deleteTodoApi(id);
            setTodos(todos.filter(todo => todo.id != id))
        }
        catch (error){
            console.error("Failed to delete todo:", error);
        }
    }

    // Save edited todo
    const saveEdit = async (id: number) => {
        if (editText.trim() === "") return;
        try{
            const updated = await updateTodo(id, {text: editText});
            setTodos(todos.map(todo=> todo.id === id ? updated: todo));
            setEditingId(null);
            setEditText("");
        }
        catch (error){
            console.error("Failed to save edit:", error)
        }
    }


    // Handle when the user is typing
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    // // Handle when the user clicks on the "Add" button
    // const handleAddTodo = () => {
    //     if (inputValue.trim() === "") return;

    //     const newTodo: Todo = {
    //         id: Date.now(),
    //         text: inputValue,
    //         completed: false,
    //     };
    //     setTodos([...todos, newTodo]);
    //     setInputValue("");
    // };

    // Handle enter key press
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleAddTodo();
        }
    };

    // // Toggle completed status
    // const toggleCompleted = (id: number) => {
    //     setTodos(
    //         todos.map((todo) =>
    //             todo.id === id ? { ...todo, completed: !todo.completed } : todo
    //         )
    //     );
    // };

    // // Delete a todo
    // const deleteTodo = (id: number) => {
    //     setTodos(todos.filter((todo) => todo.id !== id));
    // };

    // Start editing a todo
    const startEditing = (id: number, currentText: string) => {
        setEditingId(id);
        setEditText(currentText);
    };

    // // Save the edited todo
    // const saveEdit = (id: number) => {
    //     if (editText.trim() === "") return;
        
    //     setTodos(
    //         todos.map((todo) =>
    //             todo.id === id ? { ...todo, text: editText } : todo
    //         )
    //     );
    //     setEditingId(null);
    //     setEditText("");
    // };

    // Cancel editing
    const cancelEdit = () => {
        setEditingId(null);
        setEditText("");
    };

    // Handle key press in edit input
    const handleEditKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
        if (e.key === "Enter") {
            saveEdit(id);
        } else if (e.key === "Escape") {
            cancelEdit();
        }
    };

    // Count incomplete todos
    const remainingCount = todos.filter((todo) => !todo.completed).length;


    // Get filtered todos based on current filter
    const filteredTodos = todos.filter((todo)=>{
        if (currentView === 'active') return !todo.completed;
        if (currentView === 'completed') return todo.completed;
        return true;
    });

    // // Load Todos from localStorage when the app starts
    // useEffect(()=>{
    //     const saveTodos = localStorage.getItem("todos");
    //     if (saveTodos){
    //         setTodos(JSON.parse(saveTodos));
    //     }
    // }, []); // Empty array= runs only once when component mounts


    // // Save todos to localStorage whenever they change
    // useEffect(()=>{
    //     localStorage.setItem("todos", JSON.stringify(todos));
    // }, [todos]); // Runs everytime 'todos' change


    if (loading){
        return(
            <div className="max-w-2xl mx-auto mt-16 p-6 text-center text-gray-400">
                Loading todos...
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-16 p-6">
            <h1 className="text-3xl font-bold text-center mb-8">
                📝 My Todo App
            </h1>

            {/* Input section */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="What needs to be done?"
                        className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAddTodo}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Status bar */}
            {todos.length > 0 && (
                <div className="mb-4 text-sm text-gray-400">
                    {remainingCount} task{remainingCount !== 1 ? "s" : ""} remaining
                </div>
            )}

            {/* Filter buttons */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={()=>setCurrentView('all')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                        currentView === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    All ({todos.length})
                </button>
                <button
                    onClick={()=>setCurrentView('active')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                        currentView === 'active'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    Active ({todos.filter(t => !t.completed).length})
                </button>
                <button
                    onClick={()=>setCurrentView('completed')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                        currentView === 'completed'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    Completed ({todos.filter(t => t.completed).length})
                </button>

            </div>

            {/* Todo List */}
            <div className="space-y-2">
                {filteredTodos.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        No {currentView !=='all' ? currentView : "" } yet. Add one above!
                    </div>
                ) : (
                    filteredTodos.map((todo) => (
                        <div
                            key={todo.id}
                            className="bg-gray-800 rounded-lg p-3 flex items-center justify-between gap-3"
                        >
                            {editingId === todo.id ? (
                                // Edit Mode
                                <div className="flex items-center gap-3 flex-1">
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        onKeyDown={(e) => handleEditKeyPress(e, todo.id)}
                                        onBlur={() => saveEdit(todo.id)}
                                        className="flex-1 bg-gray-700 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        autoFocus
                                    />
                                </div>
                            ) : (
                                // View Mode
                                <div className="flex items-center gap-3 flex-1">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleCompleted(todo.id, todo.completed)}
                                        className="w-5 h-5 cursor-pointer accent-blue-600"
                                    />
                                    <span
                                        onDoubleClick={() => startEditing(todo.id, todo.text)}
                                        className={`text-white flex-1 cursor-pointer ${
                                            todo.completed ? "line-through text-gray-500" : ""
                                        }`}
                                    >
                                        {todo.text}
                                    </span>
                                </div>
                            )}
                            
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}