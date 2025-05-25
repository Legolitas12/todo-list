🌟 Descripción
Una aplicación de tareas pendientes desarrollada con React + Vite , integrada con Firebase Authentication para inicio de sesión con Google y modo oscuro totalmente funcional.

Diseñada para ser responsiva, visualmente atractiva y fácil de usar , con animaciones suaves, persistencia de datos en localStorage y manejo de errores claro.

✨ Características Principales
✅ Inicio de sesión con Google (Firebase Authentication)
✅ Modo oscuro persistente con localStorage
✅ Animaciones de entrada/salida de tareas
✅ Filtrado de tareas (opcional futuro)
✅ Notificaciones amigables (opcional futuro)
✅ Diseño responsivo y moderno

🛠️ Tecnologías Usadas
React + Vite
Firebase (Authentication)
CSS puro (variables, transiciones y responsive design)
react-transition-group (para animaciones)
react-toastify (opcional para notificaciones)

todo-list/
├── public/
├── src/
│   ├── components/         # Componentes reutilizables (opcional futuro)
│   ├── contexts/           # AuthContext para manejar autenticación
│   ├── firebase.js         # Configuración de Firebase
│   ├── App.jsx             # Componente principal
│   └── main.jsx            # Punto de entrada
│── styles.css              # Estilos globales
│── index.html              # HTML base
└── README.md               # Este archivo


Problema,Solución
auth is undefined,Asegúrate de pasar auth y provider explícitamente en signInWithGoogle()
Modo oscuro no funciona,Verifica que la clase dark-mode se aplique al body y uses variables CSS
Pantalla en blanco,Revisa la consola del navegador y asegúrate de que todas las exportaciones/importaciones sean correctas
Error de Firestore,Desactiva Firestore si no lo usas y usa localStorage temporalmente


🧩 Posibles Mejoras Futuras
✅ Conectar tareas a Firebase Firestore para persistencia en la nube
✅ Agregar filtros (pendientes/completadas)
✅ Añadir notificaciones con react-toastify
✅ Implementar drag and drop para reordenar tareas
✅ Agregar fechas de vencimiento y prioridades
✅ Crear un sistema de etiquetas o categorías
✅ Desplegar con Vercel/Netlify y agregar dominio personalizado

 Contribuir
¡Si quieres contribuir al proyecto, eres bienvenido!

Haz un fork del repositorio
Crea una rama (git checkout -b feature/nueva-funcionalidad)
Haz commit de tus cambios (git commit -m 'Agrega nueva funcionalidad')
Haz push (git push origin feature/nueva-funcionalidad)
Crea un Pull Request


📄 Licencia
Este proyecto está bajo la licencia MIT .
¡Puedes usarlo, modificarlo y distribuirlo libremente!

📬 Contacto
📮 samuel.campeon@gmail.com
📸 Capturas de Pantalla (opcional)
Agrega imágenes de tu app aquí (modo claro y oscuro).
Ejemplo:
Modo Claro

Modo Oscuro

📊 Créditos
Firebase para autenticación
React + Vite para el frontend
Inspiración en proyectos open-source de GitHub