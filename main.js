
// ===============================================================================================
// 🔥 JUEGO BÍBLICO MULTIEQUIPO - CLIENTE (JUGADOR)
// ===============================================================================================

// -----------------------------------------------------------------------------------------------
// 📦 IMPORTACIONES DE FIREBASE
// -----------------------------------------------------------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, onSnapshot, collection, query, orderBy, updateDoc, increment, serverTimestamp, writeBatch } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
    pregunta: "Según 1 Samuel 2:30, Dios promete honrar a:",
    opciones: ["Los fuertes", "Los que lo honran", "Los que ayunan", "Los líderes"],
    correcta: 1
  },
  {
    pregunta: "En la Biblia, honrar significa:",
    opciones: ["Exaltar el ego", "Obedecer y respetar", "Ser famoso", "Tener autoridad"],
    correcta: 1
  },
  {
    pregunta: "Honramos a Dios cuando:",
    opciones: ["Hablamos bonito", "Vivimos en obediencia", "Solo vamos a la iglesia", "Cantamos fuerte"],
    correcta: 1
  },
  {
    pregunta: "Romanos 12:1 enseña que la honra se demuestra con:",
    opciones: ["Sacrificios externos", "Nuestro cuerpo como sacrificio vivo", "Ofrendas económicas", "Ayunos largos"],
    correcta: 1
  },
  {
    pregunta: "Honrar a los padres trae como resultado:",
    opciones: ["Fama", "Larga vida", "Riqueza inmediata", "Poder"],
    correcta: 1
  },
  {
    pregunta: "Proverbios 3:9 enseña honrar a Dios con:",
    opciones: ["Palabras", "Tiempo", "Bienes", "Ayuno"],
    correcta: 2
  },
  {
    pregunta: "Honrar a Dios incluye obedecer cuando:",
    opciones: ["Es cómodo", "Es público", "Nadie ve", "Hay recompensa"],
    correcta: 2
  },
  {
    pregunta: "Honra verdadera se demuestra con:",
    opciones: ["Intenciones", "Emociones", "Acciones", "Apariencia"],
    correcta: 2
  },
  {
    pregunta: "Juan 5:23 enseña que honrar al Hijo es:",
    opciones: ["Opcional", "Igual a honrar al Padre", "Solo para líderes", "Algo simbólico"],
    correcta: 1
  },
  {
    pregunta: "Honrar a la familia implica:",
    opciones: ["Palabras bonitas", "Responsabilidad y cuidado", "Control", "Autoridad"],
    correcta: 1
  },
  {
    pregunta: "La honra produce:",
    opciones: ["Orgullo", "Bendición", "Confusión", "Temor"],
    correcta: 1
  },
  {
    pregunta: "La honra comienza primero en:",
    opciones: ["La iglesia", "La sociedad", "El corazón", "El dinero"],
    correcta: 2
  },

  {
    pregunta: "La deshonra es:",
    opciones: ["Falta de conocimiento", "Desobediencia y desprecio", "Ignorancia", "Debilidad"],
    correcta: 1
  },
  {
    pregunta: "Según Proverbios 11:2, la deshonra trae:",
    opciones: ["Paz", "Prosperidad", "Humillación", "Autoridad"],
    correcta: 2
  },
  {
    pregunta: "Deshonrar a los padres provoca:",
    opciones: ["Bendición", "Consecuencias negativas", "Fama", "Sabiduría"],
    correcta: 1
  },
  {
    pregunta: "Malaquías 1:6 muestra deshonra cuando:",
    opciones: ["Dios no responde", "Se da lo peor a Dios", "Se ora poco", "No se canta"],
    correcta: 1
  },
  {
    pregunta: "La deshonra se manifiesta cuando:",
    opciones: ["Hay silencio", "Hay rebeldía", "Hay humildad", "Hay servicio"],
    correcta: 1
  },
  {
    pregunta: "Según la Biblia, hablar mal de autoridades es:",
    opciones: ["Libertad", "Opinión", "Deshonra", "Corrección"],
    correcta: 2
  },
  {
    pregunta: "La deshonra bloquea:",
    opciones: ["El perdón", "La bendición", "El tiempo", "El conocimiento"],
    correcta: 1
  },
  {
    pregunta: "Deshonrar a Dios ocurre cuando:",
    opciones: ["No entendemos", "Vivimos en pecado consciente", "Oramos poco", "No ayunamos"],
    correcta: 1
  },
  {
    pregunta: "La deshonra produce:",
    opciones: ["Orden", "Confianza", "Conflictos", "Gozo"],
    correcta: 2
  },
  {
    pregunta: "Ejemplo claro de deshonra es:",
    opciones: ["Obedecer con gozo", "Servir con amor", "Menospreciar la autoridad", "Respetar normas"],
    correcta: 2
  },
  {
    pregunta: "La deshonra comienza cuando:",
    opciones: ["Se habla", "Se piensa mal", "Se actúa", "Se decide obedecer"],
    correcta: 1
  },
  {
    pregunta: "El antídoto bíblico contra la deshonra es:",
    opciones: ["El silencio", "El castigo", "El arrepentimiento y la obediencia", "El temor humano"],
    correcta: 2
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
const timerDisplay = document.getElementById('timer-display');

let currentTeamName = null;
const GAME_ID = "main-game";
let answeredCurrentQuestion = false;
let currentQuestionIndex = -1;
let questionStartedAtMs = null;
let timerIntervalId = null;
const QUESTION_DURATION_SECONDS = 30;
let lastTimerQuestionIndex = null;
let lastTimerStartedAtMs = null;
let timeoutPenalizedQuestionIndex = null;
const TIMEOUT_POINTS_PENALTY = -1;

function stopTimer() {
  if (timerIntervalId) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  }
}

function resetTimerState() {
  stopTimer();
  questionStartedAtMs = null;
  if (timerDisplay) timerDisplay.textContent = '--';
}

function updateTimerUi() {
  if (!timerDisplay) return;
  if (typeof questionStartedAtMs !== 'number') {
    timerDisplay.textContent = '--';
    return;
  }

  const elapsedSeconds = Math.floor((Date.now() - questionStartedAtMs) / 1000);
  const remaining = Math.max(0, QUESTION_DURATION_SECONDS - elapsedSeconds);
  timerDisplay.textContent = `${remaining}s`;

  if (remaining <= 0) {
    Array.from(optionsContainer.children).forEach((btn) => {
      btn.disabled = true;
    });

    // Penalización por no responder a tiempo (solo una vez por pregunta)
    if (
      currentTeamName &&
      currentQuestionIndex >= 0 &&
      !answeredCurrentQuestion &&
      timeoutPenalizedQuestionIndex !== currentQuestionIndex
    ) {
      timeoutPenalizedQuestionIndex = currentQuestionIndex;
      const teamRef = doc(db, `games/${GAME_ID}/teams`, currentTeamName);
      updateDoc(teamRef, {
        points: increment(TIMEOUT_POINTS_PENALTY),
        penalties: increment(1)
      }).catch((err) => console.error(err));
    }

    // Detener el temporizador cuando se acaba el tiempo
    stopTimer();
  }
}

function startTimer(startMs) {
  questionStartedAtMs = typeof startMs === 'number' ? startMs : null;
  stopTimer();
  updateTimerUi();
  if (typeof questionStartedAtMs === 'number') {
    timerIntervalId = setInterval(updateTimerUi, 250);
  }
}

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
    const startedAt = gameData.questionStartedAt;
    const startedAtMs = startedAt && typeof startedAt.toMillis === 'function' ? startedAt.toMillis() : null;

    // Solo se considera "iniciada" si el admin/la líder puso el índice Y un timestamp de inicio.
    if (
      typeof questionIndex !== 'undefined' &&
      questionIndex >= 0 &&
      questionIndex < preguntas.length &&
      typeof startedAtMs === 'number'
    ) {
      currentQuestionIndex = questionIndex;

      // No reiniciar el temporizador en cada snapshot; solo si cambia pregunta o start time
      if (lastTimerQuestionIndex !== questionIndex || lastTimerStartedAtMs !== startedAtMs) {
        startTimer(startedAtMs);
        lastTimerQuestionIndex = questionIndex;
        lastTimerStartedAtMs = startedAtMs;
        timeoutPenalizedQuestionIndex = null;
      }

      displayQuestion(preguntas[questionIndex]);
      answeredCurrentQuestion = false; // Resetear para la nueva pregunta
    } else {
      currentQuestionIndex = -1;
      lastTimerQuestionIndex = null;
      lastTimerStartedAtMs = null;
      timeoutPenalizedQuestionIndex = null;
      resetTimerState();
      questionDisplay.innerText = "Esperando que el líder inicie el juego...";
      optionsContainer.innerHTML = '';
    }
  } else {
    currentQuestionIndex = -1;
    lastTimerQuestionIndex = null;
    lastTimerStartedAtMs = null;
    timeoutPenalizedQuestionIndex = null;
    resetTimerState();
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
  lastTimerQuestionIndex = null;
  lastTimerStartedAtMs = null;
  timeoutPenalizedQuestionIndex = null;
  resetTimerState();
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
  if (currentQuestionIndex < 0 || currentQuestionIndex >= preguntas.length) return;
  if (typeof questionStartedAtMs === 'number') {
    const elapsedSeconds = Math.floor((Date.now() - questionStartedAtMs) / 1000);
    if (elapsedSeconds >= QUESTION_DURATION_SECONDS) return;
  }
  answeredCurrentQuestion = true;

  // Al responder, se detiene el temporizador hasta la siguiente pregunta
  stopTimer();

  const isCorrect = selectedIndex === correctIndex;
  const pointsChange = isCorrect ? 2 : -1;
  const teamRef = doc(db, `games/${GAME_ID}/teams`, currentTeamName);
  const answerRef = doc(db, `games/${GAME_ID}/teams/${currentTeamName}/answers`, String(currentQuestionIndex));

  try {
    const batch = writeBatch(db);
    batch.set(answerRef, {
      questionIndex: currentQuestionIndex,
      selectedIndex,
      correctIndex,
      isCorrect,
      pointsChange,
      answeredAt: serverTimestamp()
    });
    batch.update(teamRef, { points: increment(pointsChange) });
    await batch.commit();
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
  if (
    document.hidden &&
    currentTeamName &&
    currentQuestionIndex >= 0 &&
    typeof questionStartedAtMs === 'number' &&
    !answeredCurrentQuestion
  ) {
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
