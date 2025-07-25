import React from "react";

export function TodoFooter({ total, completadas, onClearCompleted }) {
    const activas = total - completadas;

    return (
        <footer className="todo-footer mt-5 border-top pt-3">
            <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
                <div>
                    <span className="text-muted">
                        {activas === 0
                            ? "No tienes tareas pendientes"
                            : `Tienes ${activas} tarea${activas > 1 ? "s" : ""} pendiente${activas > 1 ? "s" : ""}`}
                    </span>
                </div>

                {completadas > 0 && (
                    <button
                        className="btn btn-sm btn-outline-danger mt-2 mt-md-0"
                        onClick={onClearCompleted}
                    >
                        Eliminar tareas completadas
                    </button>
                )}
            </div>
        </footer>
    );
}
