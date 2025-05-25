// App.jsx
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import {
  tasksCollection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  signInWithGoogle,
  logout
} from "./firebase";

function App() {
  const { currentUser, loading } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
  const savedMode = localStorage.getItem("darkMode") === "true";
  setDarkMode(savedMode);
}, []);

useEffect(() => {
  localStorage.setItem("darkMode", darkMode);
  document.body.classList.toggle("dark-mode", darkMode);
}, [darkMode]);

  // Escuchar cambios en Firestore (filtrado por usuario)
  useEffect(() => {
    if (!currentUser) return;

    const q = query(tasksCollection, orderBy("createdAt")); // Ordenar por fecha
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const updatedTasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setTasks(updatedTasks);
        setError(null); // Limpiar errores anteriores
      },
      (err) => {
        console.error("Error al obtener tareas:", err);
        setError("No se pudieron cargar las tareas. Revisa tu conexión.");
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  // Agregar tarea
  const addTask = async () => {
    if (newTask.trim() === "") return;
    try {
      await addDoc(tasksCollection, {
        text: newTask,
        completed: false,
        createdAt: new Date(),
        userId: currentUser?.uid // ✅ Protección contra undefined
      });
      setNewTask("");
    } catch (err) {
      console.error("Error al agregar tarea:", err);
      setError("No se pudo agregar la tarea.");
    }
  };

  // Eliminar tarea
  const deleteTask = async (id) => {
    try {
      const taskDoc = doc(tasksCollection, id);
      await deleteDoc(taskDoc);
    } catch (err) {
      console.error("Error al eliminar tarea:", err);
      setError("No se pudo eliminar la tarea.");
    }
  };

  // Marcar como completada/incompleta
  const toggleComplete = async (id, currentStatus) => {
    try {
      const taskDoc = doc(tasksCollection, id);
      await updateDoc(taskDoc, {
        completed: !currentStatus
      });
    } catch (err) {
      console.error("Error al actualizar estado:", err);
      setError("No se pudo actualizar el estado de la tarea.");
    }
  };

  

  // Manejo de carga
  if (loading) {
    return (
      <div className="loading">
        <p>Cargando aplicación...</p>
      </div>
    );
  }

  // Pantalla de inicio de sesión
  if (!currentUser) {
    return (
      <div className="auth-container">
        <h2>🔐 Inicia sesión con Google</h2>
        <button
          onClick={async () => {
            try {
              await signInWithGoogle(); // ✅ Llamada segura
            } catch (err) {
              console.error("Error al iniciar sesión:", err);
              setError("No se pudo iniciar sesión. Inténtalo de nuevo.");
            }
          }}
        >
          Iniciar sesión con Google
        </button>
        {error && <div className="error-message">{error}</div>}
      </div>
    );
  }

  return (
    <div className="container">
      {/* Botón de modo oscuro */}
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <h1>📝 To-Do List</h1>
      <button
        onClick={async () => {
          try {
            await logout();
          } catch (err) {
            console.error("Error al cerrar sesión:", err);
            setError("No se pudo cerrar sesión. Inténtalo de nuevo.");
          }
        }}
        style={{ marginBottom: "1rem", cursor: "pointer" }}
      >
        Cerrar sesión
      </button>

      {/* Mensaje de error */}
      {error && <div className="error-message">{error}</div>}

      {/* Formulario de nueva tarea */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Escribe una tarea..."
        />
        <button type="submit">Agregar</button>
      </form>

      {/* Lista de tareas */}
      <ul>
        {tasks
          .filter((task) => task.userId === currentUser.uid) // Filtrar por usuario
          .map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <span onClick={() => toggleComplete(task.id, task.completed)}>
                {task.text}
              </span>
              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                🗑️
              </button>
            </li>
          ))}
        {/* Mensaje si no hay tareas */}
        {tasks.filter((task) => task.userId === currentUser.uid).length === 0 && (
          <li>No hay tareas. ¡Agrega una!</li>
        )}
      </ul>

      {/* Botón limpiar todas */}
      <button
        id="clear-all"
        onClick={async () => {
          try {
            tasks.forEach((task) => {
              if (task.userId === currentUser.uid) deleteTask(task.id);
            });
          } catch (err) {
            console.error("Error al limpiar tareas:", err);
            setError("No se pudieron limpiar las tareas.");
          }
        }}
      >
        Limpiar Tareas
      </button>
    </div>
  );
}

export default App;

