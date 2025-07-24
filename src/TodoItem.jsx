import React, { useState } from "react";

export function TodoItem({ todo, onDelete, onEdit, onToggle }) {
    const { id, task, completed } = todo;
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

    const handleSave = () => {
        if (editedTask.trim() !== '') {
            onEdit(id, editedTask);
            setIsEditing(false);
        }
    };

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center flex-grow-1 me-3">
                <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={completed}
                    onChange={() => onToggle(id)}
                    title="Marcar como completada"
                />
                {isEditing ? (
                    <input
                        type="text"
                        className="form-control"
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                    />
                ) : (
                    <span style={{ textDecoration: completed ? "line-through" : "none" }}>
                        {task}
                    </span>
                )}
            </div>

            <div className="d-flex gap-2">
                {!completed && (isEditing ? (
                    <button className="btn btn-primary" onClick={handleSave} title="Guardar">
                        <i className="bi bi-check-circle me-1"></i> Guardar
                    </button>
                ) : (
                    <button className="btn btn-warning" onClick={() => setIsEditing(true)} title="Editar">
                        <i className="bi bi-pencil-square me-1"></i> Editar
                    </button>
                ))}
                <button className="btn btn-danger" onClick={() => onDelete(id)} title="Eliminar">
                    <i className="bi bi-trash me-1"></i> Eliminar
                </button>
            </div>
        </li>
    );
}
