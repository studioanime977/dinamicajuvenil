
// ===============================================================================================
// 🔥 JUEGO BÍBLICO MULTIEQUIPO - CLIENTE (JUGADOR)
// ===============================================================================================

// -----------------------------------------------------------------------------------------------
// 📦 IMPORTACIONES DE FIREBASE
// -----------------------------------------------------------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, onSnapshot, collection, query, orderBy, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// -----------------------------------------------------------------------------------------------
// ⚙️ CONFIGURACIÓN DE FIREBASE
// -----------------------------------------------------------------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyC8xL6OM_ff7LqFJj_P87d9wVR-BT8OJsE",
    authDomain: "dinamica-en-tiempo-real.firebaseapp.com",
    projectId: "dinamica-en-tiempo-real",
    storageBucket: "dinamica-en-tiempo-real.firebasestorage.app",
    messagingSenderId: "1096669474654",
    appId: "1:1096669474654:web:0348238823f2a0cbdea9cf"
};

// -----------------------------------------------------------------------------------------------
// 🚀 INICIALIZACIÓN DE FIREBASE
// -----------------------------------------------------------------------------------------------
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// -----------------------------------------------------------------------------------------------
// ❓ PREGUNTAS DEL JUEGO (TEMA: LA HONRA)
// -----------------------------------------------------------------------------------------------
const preguntas = [
  {
    pregunta: "¿Cuál es la cita central del tema La Honra?",
    opciones: [
      "1 Samuel 2:30",
      "Proverbios 3:5",
      "Salmo 23:1"
    ],
    correcta: 0 // Índice de la opción correcta
  },
  {
    pregunta: "¿Qué significa honrar a Dios con mi vida?",
    opciones: [
      "Solo ir a la iglesia",
      "Vivir como sacrificio agradable a Dios",
      "Ayunar todos los días"
    ],
    correcta: 1,
    cita: "Salmo 51:16 y Romanos 12:1"
  },
  {
    pregunta: "¿Cómo honramos a Dios con nuestra familia?",
    opciones: [
      "Ignorando responsabilidades",
      "Guiando a la familia en el camino del Señor",
      "Solo orando los domingos"
    ],
    correcta: 1,
    cita: "Josué 24:15, 1 Timoteo 5:8"
  },
    {
    pregunta: "Honrar a los padres es...",
    opciones: [
      "Una sugerencia con recompensa",
      "El primer mandamiento con promesa",
      "Una opción cultural"
    ],
    correcta: 1,
    cita: "Efesios 6:2"
  }
];

// -----------------------------------------------------------------------------------------------
//  DOM & VARIABLES DE ESTADO
// -----------------------------------------------------------------------------------------------
const joinSection = document.getElementById('join-section');
const gameSection = document.getElementById('game-section');
const teamNameInput = document.getElementById('team-name');
const joinButton = document.getElementById('join-button');
const questionDisplay = document.getElementById('question');
const optionsContainer = document.getElementById('options-container'); // Contenedor para botones
const leaderboard = document.getElementById('leaderboard');
const statusDisplay = document.getElementById('status');

let currentTeamName = null;
const GAME_ID = "main-game";
let answeredCurrentQuestion = false;

// -----------------------------------------------------------------------------------------------
// 🕹️ LÓGICA DEL JUEGO
// -----------------------------------------------------------------------------------------------

// 1. Unirse al juego
joinButton.addEventListener('click', async () => {
  const teamName = teamNameInput.value.trim();
  if (!teamName) return alert('Por favor, ingresa el nombre de tu equipo.');
  
  currentTeamName = teamName;
  const teamRef = doc(db, `games/${GAME_ID}/teams`, currentTeamName);

  try {
    await setDoc(teamRef, { name: currentTeamName, points: 0, penalties: 0 });
  } catch (err) {
    console.error(err);
    statusDisplay.innerText = 'Error de permisos en Firestore. Revisa las reglas de Firestore (Missing or insufficient permissions).';
    return;
  }
  
  joinSection.classList.add('hidden');
  gameSection.classList.remove('hidden');
  statusDisplay.innerText = `¡Equipo '${currentTeamName}' conectado!`;
});

// 2. Escuchar cambios en el estado del juego (pregunta actual)
const gameRef = doc(db, `games/${GAME_ID}`);
onSnapshot(gameRef, (docSnap) => {
  if (docSnap.exists()) {
    const gameData = docSnap.data();
    const questionIndex = gameData.currentQuestionIndex;

    if (
      typeof questionIndex !== 'undefined' &&
      questionIndex >= 0 &&
      questionIndex < preguntas.length
    ) {
      displayQuestion(preguntas[questionIndex]);
      answeredCurrentQuestion = false; // Resetear para la nueva pregunta
    } else {
      questionDisplay.innerText = "Esperando que el líder inicie el juego...";
      optionsContainer.innerHTML = '';
    }
  } else {
    // El líder aún no ha creado el documento del juego
    questionDisplay.innerText = "El juego aún no ha comenzado.";
  }
}, (err) => {
  console.error(err);
  if (err?.code === 'permission-denied') {
    statusDisplay.innerText = 'Firestore bloqueado por permisos. Ajusta las reglas para permitir lectura del juego.';
  } else {
    statusDisplay.innerText = 'Error escuchando el estado del juego.';
  }
});

// 3. Mostrar la pregunta y las opciones
function displayQuestion(q) {
  questionDisplay.innerText = q.pregunta;
  optionsContainer.innerHTML = '';

  q.opciones.forEach((opcion, index) => {
    const button = document.createElement('button');
    button.innerText = opcion;
    button.className = 'bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition-transform transform hover:scale-105';
    button.onclick = () => handleAnswer(index, q.correcta);
    optionsContainer.appendChild(button);
  });
}

// 4. Manejar la respuesta del jugador
async function handleAnswer(selectedIndex, correctIndex) {
  if (answeredCurrentQuestion) return; // Evitar respuestas múltiples
  if (!currentTeamName) return;
  answeredCurrentQuestion = true;

  const isCorrect = selectedIndex === correctIndex;
  const pointsChange = isCorrect ? 2 : -1;
  const teamRef = doc(db, `games/${GAME_ID}/teams`, currentTeamName);

  try {
    await updateDoc(teamRef, { points: increment(pointsChange) });
  } catch (err) {
    console.error(err);
    answeredCurrentQuestion = false;
    statusDisplay.innerText = 'No se pudo guardar tu respuesta (posible error de permisos en Firestore).';
    return;
  }

  // Feedback visual instantáneo
  Array.from(optionsContainer.children).forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIndex) {
      btn.classList.remove('bg-blue-500');
      btn.classList.add('bg-green-600'); // La correcta se marca en verde
    } else {
      btn.classList.remove('bg-blue-500');
      btn.classList.add('bg-gray-400'); // Las demás en gris
    }
  });
}

// 5. Actualizar el marcador en tiempo real
const teamsQuery = query(collection(db, `games/${GAME_ID}/teams`), orderBy('points', 'desc'));
onSnapshot(teamsQuery, (snapshot) => {
  leaderboard.innerHTML = '';
  if (snapshot.empty) {
    leaderboard.innerHTML = '<p class="text-gray-500">Esperando jugadores...</p>';
    return;
  }
  snapshot.forEach(doc => {
    const team = doc.data();
    const teamElement = document.createElement('div');
    teamElement.className = 'flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm';
    teamElement.innerHTML = `<span class="font-semibold text-indigo-700">${team.name}</span><span class="font-bold text-xl">${team.points} pts</span>`;
    leaderboard.appendChild(teamElement);
  });
}, (err) => {
  console.error(err);
  if (err?.code === 'permission-denied') {
    leaderboard.innerHTML = '<p class="text-red-600">Sin permisos para leer el marcador (Firestore).</p>';
  } else {
    leaderboard.innerHTML = '<p class="text-red-600">Error cargando el marcador.</p>';
  }
});

// 6. Penalización por anti-trampa
document.addEventListener('visibilitychange', async () => {
  if (document.hidden && currentTeamName) {
    const teamRef = doc(db, `games/${GAME_ID}/teams`, currentTeamName);
    try {
      await updateDoc(teamRef, {
        points: increment(-3), // Penalización más severa
        penalties: increment(1)
      });
    } catch (err) {
      console.error(err);
    }
  }
});
