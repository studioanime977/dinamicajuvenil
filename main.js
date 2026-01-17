
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
    pregunta: "Según Lucas 3:8, ¿qué prueba que una persona se ha arrepentido de verdad y ha vuelto a Dios?",
    opciones: ["Realizar sacrificios y ofrendas", "Demostrarlo con su forma de vivir", "Pertenecer a una familia con linaje espiritual", "Decir 'estamos a salvo por Abraham'"],
    correcta: 1,
    explicacion: "El arrepentimiento real produce frutos; es un cambio de dirección que se nota en la conducta, no solo en palabras o herencia espiritual."
  },
  {
    pregunta: "¿A qué se refiere el concepto de que 'Dios no tiene nietos'?",
    opciones: ["A que la fe no se hereda; cada uno necesita un encuentro personal", "A que Dios solo ama a sus hijos biológicos", "A que los ancianos no pueden conocer a Dios de verdad", "A que la descendencia de Abraham fue un error"],
    correcta: 0,
    explicacion: "Nadie nace siendo cristiano por sus padres; la salvación es una relación individual y una decisión personal de cada ser humano."
  },
  {
    pregunta: "En Lucas 10:41-42, ¿cuál fue la 'única cosa' necesaria que María descubrió y Marta ignoró?",
    opciones: ["Servir con excelencia a los invitados", "La preocupación por los detalles del altar", "Estar en Su presencia y escuchar Su palabra", "Ayudar a los pobres de la aldea"],
    correcta: 2,
    explicacion: "El servicio es bueno, pero estar a los pies de Jesús escuchando Su voz es la prioridad que sustenta todo lo demás."
  },
  {
    pregunta: "¿Qué sucede cuando el servicio a Dios carece de una relación personal?",
    opciones: ["Se santifica por el esfuerzo realizado", "Se vuelve más eficiente por la disciplina", "Te garantiza un lugar en el cielo", "Se convierte en rutina y la rutina en vacío"],
    correcta: 3,
    explicacion: "Las actividades religiosas sin amor e intimidad con Dios se vuelven mecánicas, aburridas y eventualmente nos dejan vacíos."
  },
  {
    pregunta: "Según Efesios 2:8-9, ¿por qué razón ninguno de nosotros puede jactarse de ser salvo?",
    opciones: ["Porque la salvación es un regalo de Dios, no por méritos", "Porque la salvación es un premio individual", "Porque el orgullo es un pecado menor", "Porque las obras buenas son opcionales"],
    correcta: 0,
    explicacion: "La salvación es por GRACIA (regalo inmerecido). No la ganamos por portarnos bien, para que el orgullo no tenga lugar."
  },
  {
    pregunta: "En Génesis 32, ¿cuál fue el propósito real del quebrantamiento de Jacob al luchar con el ángel?",
    opciones: ["Castigarlo por engañar a su hermano Esaú", "Transformar su identidad de 'suplantador' a Israel", "Demostrar que el ángel era más fuerte que él", "Quitarle sus riquezas acumuladas"],
    correcta: 1,
    explicacion: "Jacob necesitaba dejar de confiar en sus fuerzas y sus mañas ('suplantador') para rendirse a Dios y recibir una nueva identidad ('Israel')."
  },
  {
    pregunta: "El 'Heme aquí' de Samuel, a diferencia de los hijos de Elí, representaba:",
    opciones: ["Que él era el más preparado teológicamente", "Que no tenía otros compromisos en el templo", "Una respuesta automática por miedo al castigo", "Una actitud de obediencia radical y honra desde el corazón"],
    correcta: 3,
    explicacion: "La honra no es un cargo; es una disposición del corazón que dice 'estoy dispuesto a escucharte y hacer lo que digas'."
  },
  {
    pregunta: "Según las notas, ¿cuál es la raíz común de todas las cosas 'disfrazadas de honra'?",
    opciones: ["El orgullo disfrazado que se resiste a renunciar al 'yo'", "La falta de recursos económicos", "La falta de tiempo para orar", "La timidez de los creyentes"],
    correcta: 0,
    explicacion: "A veces servimos o damos para ser vistos o sentirnos bien, sin realmente rendir nuestro orgullo al señorío de Cristo."
  },
  {
    pregunta: "Según Mateo 16:24, ¿cuál es el requisito indispensable para ser un seguidor de Jesús?",
    opciones: ["Ganar el mundo entero primero", "Tener una reputación intachable en la sociedad", "Negarse a sí mismo, tomar su cruz y seguirlo", "Cumplir con todas las tradiciones heredadas"],
    correcta: 2,
    explicacion: "Seguir a Jesús requiere morir a nuestros propios deseos ('tomar la cruz') para que Su voluntad sea lo primero en nuestra vida."
  },
  {
    pregunta: "Basado en 1 Juan 4:18, quien aún tiene miedo al castigo demuestra que:",
    opciones: ["Es una persona muy prudente", "Tiene un temor santo y necesario", "No ha experimentado plenamente el perfecto amor de Dios", "Está a un paso de la perfección"],
    correcta: 2,
    explicacion: "El amor de Dios es perfecto y nos da seguridad. Si servimos por miedo al castigo, aún no hemos entendido cuán profundamente nos ama."
  },
  {
    pregunta: "¿Cuál es la diferencia fundamental entre los actos fingidos y los frutos del corazón?",
    opciones: ["Los actos son siempre más visibles", "Los actos pueden fingirse, pero los frutos revelan el corazón real", "Los frutos solo aparecen en personas perfectas", "No hay diferencia si la intención es buena"],
    correcta: 1,
    explicacion: "Cualquiera puede actuar bien por un rato, pero el fruto (amor, gozo, paz) es lo que sale naturalmente cuando Dios vive en nosotros."
  },
  {
    pregunta: "¿Por qué el amor es descrito como el elemento que 'mata el orgullo'?",
    opciones: ["Porque el amor es una emoción pasajera", "Porque te hace sentir superior a los que no aman", "Porque elimina la necesidad de tener una relación", "Porque te lleva a desear tanto a Dios que ya no quieres pecar"],
    correcta: 3,
    explicacion: "Cuando amamos a Dios sobre todas las cosas, nuestro deseo de agradarle supera nuestro deseo de satisfacernos a nosotros mismos o al pecado."
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
const TIMEOUT_POINTS_PENALTY = -5;
const CORRECT_POINTS = 15;
const WRONG_POINTS = -10;
let gameEnded = false;

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
      const answerRef = doc(db, `games/${GAME_ID}/teams/${currentTeamName}/answers`, String(currentQuestionIndex));
      const correctIndex = preguntas[currentQuestionIndex]?.correcta;
      const batch = writeBatch(db);
      batch.set(answerRef, {
        questionIndex: currentQuestionIndex,
        selectedIndex: null,
        correctIndex: typeof correctIndex === 'number' ? correctIndex : null,
        isCorrect: false,
        timeout: true,
        pointsChange: TIMEOUT_POINTS_PENALTY,
        answeredAt: serverTimestamp()
      });
      batch.update(teamRef, {
        points: increment(TIMEOUT_POINTS_PENALTY),
        penalties: increment(1)
      });
      batch.commit().catch((err) => console.error(err));
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
    gameEnded = !!gameData.ended;
    if (gameEnded) {
      currentQuestionIndex = -1;
      lastTimerQuestionIndex = null;
      lastTimerStartedAtMs = null;
      timeoutPenalizedQuestionIndex = null;
      resetTimerState();
      questionDisplay.innerText = '✅ Juego terminado.';
      optionsContainer.innerHTML = '';
      return;
    }
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

        // Solo barajamos y mostramos cuando la pregunta cambia realmente
        displayQuestion(preguntas[questionIndex]);
        answeredCurrentQuestion = false; // Resetear para la nueva pregunta
      }
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
    gameEnded = false;
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
  gameEnded = false;
  resetTimerState();
});

// 2.5 Función de barajado (Shuffle)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 3. Mostrar la pregunta y las opciones barajadas
function displayQuestion(q) {
  questionDisplay.innerText = q.pregunta;
  optionsContainer.innerHTML = '';

  // Creamos un array de objetos con el texto y el índice original
  const opcionesConIndice = q.opciones.map((opt, idx) => ({ texto: opt, originalIndex: idx }));

  // Barajamos las opciones
  const opcionesBarajadas = shuffleArray([...opcionesConIndice]);

  opcionesBarajadas.forEach((obj) => {
    const button = document.createElement('button');
    button.innerText = obj.texto;
    button.className = 'bg-[#0f0c05] text-gray-100 border border-amber-500/30 p-3 rounded-lg font-extrabold hover:bg-[#1a1409] hover:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/60 transition-transform transform hover:scale-[1.02]';
    // Enviamos el índice original para que la validación sea correcta
    button.onclick = () => handleAnswer(obj.originalIndex, q.correcta);
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
  const pointsChange = isCorrect ? CORRECT_POINTS : WRONG_POINTS;
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

    const explicacion = preguntas[currentQuestionIndex].explicacion;
    if (isCorrect) {
      statusDisplay.innerHTML = `
        <div class="space-y-2">
          <p class="text-emerald-400 font-bold">✅ ¡Correcto!</p>
          <p class="text-[11px] text-gray-300 italic px-2">"${explicacion}"</p>
          <p class="text-[10px] text-gray-500">Esperando a los demás grupos...</p>
        </div>
      `;
    } else {
      const respuestaCorrectaTexto = preguntas[currentQuestionIndex].opciones[correctIndex];
      statusDisplay.innerHTML = `
        <div class="space-y-2">
          <p class="text-rose-400 font-bold">❌ Incorrecto.</p>
          <p class="text-xs text-amber-200">La respuesta era: <span class="font-bold underline">${respuestaCorrectaTexto}</span></p>
          <p class="text-[11px] text-gray-300 border-l-2 border-amber-500/40 pl-2 py-1">¿Por qué? ${explicacion}</p>
          <p class="text-[10px] text-gray-500 italic">Esperando a los demás grupos...</p>
        </div>
      `;
    }
  } catch (err) {
    console.error(err);
    answeredCurrentQuestion = false;
    statusDisplay.innerText = 'No se pudo guardar tu respuesta.';
    return;
  }

  // Feedback visual instantáneo
  Array.from(optionsContainer.children).forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIndex) {
      btn.classList.add('border-emerald-300/70');
      btn.classList.add('bg-emerald-500');
      btn.classList.add('text-gray-900');
    } else {
      btn.classList.add('border-gray-600');
      btn.classList.add('bg-[#0b1020]');
      btn.classList.add('text-gray-400');
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
    teamElement.className = 'flex justify-between items-center bg-[#0f0c05] border border-amber-500/20 p-3 rounded-lg';
    teamElement.innerHTML = `<span class="font-extrabold text-amber-200">${team.name}</span><span class="font-extrabold text-xl text-yellow-500">${team.points} pts</span>`;
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
    !answeredCurrentQuestion &&
    !gameEnded
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
