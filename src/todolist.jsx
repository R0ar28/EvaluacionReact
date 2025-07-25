import React, { useState, useRef, Fragment } from "react";
import { v4 as uuid } from "uuid";
import { TodoItem } from "./TodoItem.jsx";
import {TodoFooter} from "./TodoFooter.jsx";

function ResumenTareas({ total, completadas }) {
    return (
        <div className="alert alert-info text-center mt-4">
            Completaste {completadas} de {total} tareas.
        </div>
    );
}

function TareasCompletadas({ tareas, onDelete, onToggle }) {
    return (
        <>
            <h5 className="mt-4 mb-3">Tareas Completadas</h5>
            <ul className="list-group">
                {tareas.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onDelete={onDelete}
                        onEdit={() => {}}
                        onToggle={onToggle}
                    />
                ))}
            </ul>
        </>
    );
}

export function TodoList() {
    const [todos, setTodos] = useState([
        { id: 1, task: "Aprender React", completed: false },
        { id: 2, task: "Estudiar SO", completed: false },
        { id: 3, task: "Bailar la macarena", completed: false },
        { id: 4, task: "Prueba 1", completed: false },
        { id: 5, task: "Prueba 2", completed: false },
        { id: 6, task: "Prueba 3", completed: true },
    ]);

    const taskRef = useRef();

    const agregarTarea = () => {
        const task = taskRef.current.value.trim();
        if (task === "") return;

        const newTask = {
            id: uuid(),
            task: task,
            completed: false,
        };
        setTodos((prevTodos) => [...prevTodos, newTask]);
        taskRef.current.value = "";
    };

    const eliminarTarea = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const editarTarea = (id, newTask) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, task: newTask } : todo
            )
        );
    };

    const toggleTareaCompletada = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const tareasActivas = todos.filter(todo => !todo.completed);
    const tareasCompletadas = todos.filter(todo => todo.completed);

    const borrarCompletadas = () => {
        setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
    };

    return (
        <Fragment>
            <div className="mt-5">
                <div className="row justify-content-center">
                    <div className="">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <h1 className="card-title text-center mb-4">📋 Gestor de Tareas</h1>
                                <p className="text-muted text-center">
                                    Agrega, edita o elimina tareas para organizar tu día.
                                </p>

                                <div className="input-group mb-4">
                                    <input
                                        className="form-control"
                                        ref={taskRef}
                                        placeholder="Escribe una nueva tarea"
                                        type="text"
                                    />
                                    <button onClick={agregarTarea} className="btn btn-success ms-2">
                                        <i className="bi bi-plus-circle me-1"></i> Agregar
                                    </button>
                                </div>

                                <ResumenTareas total={todos.length} completadas={tareasCompletadas.length} />

                                {tareasActivas.length === 0 ? (
                                    <div className="alert alert-secondary text-center">
                                        No hay tareas activas.
                                    </div>
                                ) : (
                                    <ul className="list-group">
                                        {tareasActivas.map((todo) => (
                                            <TodoItem
                                                key={todo.id}
                                                todo={todo}
                                                onDelete={eliminarTarea}
                                                onEdit={editarTarea}
                                                onToggle={toggleTareaCompletada}
                                            />
                                        ))}
                                    </ul>
                                )}

                                {tareasCompletadas.length > 0 && (
                                    <TareasCompletadas
                                        tareas={tareasCompletadas}
                                        onDelete={eliminarTarea}
                                        onToggle={toggleTareaCompletada}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TodoFooter
                total={todos.length}
                completadas={tareasCompletadas.length}
                onClearCompleted={borrarCompletadas}
            />
        </Fragment>

    );
}
