
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
  },
  {
    pregunta: "Según el texto, ¿por qué ya no necesitamos de intermediarios humanos para llegar al Padre?",
    opciones: ["Porque Jesús nos dio acceso directo al trono de la gracia", "Porque ahora somos descendientes biológicos de Abraham", "Porque las piedras pueden convertirse en hijos", "Porque el servicio en el altar nos santifica"],
    correcta: 0,
    explicacion: "La muerte de Jesús rompió el velo. Depender de intermediarios humanos puede volver nuestra fe una tradición lejana en lugar de una relación viva."
  },
  {
    pregunta: "¿Cuál es el punto de partida para que Dios transforme nuestra vida según la experiencia de 'rendirse'?",
    opciones: ["Hacer mil cosas para llamar Su atención", "Reconocer que sin Él no somos nada y decir 'Heme aquí'", "Prepararse teológicamente como los hijos de Elí", "Forzar un encuentro espiritual a través del esfuerzo"],
    correcta: 1,
    explicacion: "No se trata de cuánto hagamos (Marta), sino de reconocer nuestra total dependencia y estar dispuestos a escuchar con humildad (Samuel)."
  },
  {
    pregunta: "¿Por qué Jacob, siendo nieto de Abraham, necesitó ser quebrantado por Dios en Peniel?",
    opciones: ["Para ganar la pelea contra el ángel", "Para que su fe dejara de ser heredada y tuviera un encuentro personal", "Para poder heredar las riquezas de su abuelo", "Porque Dios quería castigarlo por sus pecados pasados"],
    correcta: 1,
    explicacion: "Ser 'nieto' (heredar la fe) no basta. Jacob necesitaba su propio encuentro para que su identidad fuera transformada de suplantador a príncipe."
  },
  {
    pregunta: "Según 1 Juan 4:18, ¿qué revela el hecho de que alguien sirva a Dios por miedo al castigo?",
    opciones: ["Que es una persona muy obediente", "Que ha alcanzado el amor perfecto", "Que no ha experimentado plenamente el perfecto amor de Dios", "Que tiene una fe más sólida que los demás"],
    correcta: 2,
    explicacion: "El servicio por miedo es esclavitud. El amor perfecto expulsa el temor, llevándonos a servir por gratitud y no por terror a las consecuencias."
  },
  {
    pregunta: "¿Qué significa realmente 'soltar el último ídolo' para alcanzar una vida de honra?",
    opciones: ["Abandonar nuestra propia manera de vivir y lo que nos estanca", "Dejar de ir a la iglesia por un tiempo para pensar", "Tratar de ganar el mundo entero con méritos propios", "Aferrarnos a la vida para no perder la salvación"],
    correcta: 0,
    explicacion: "La honra requiere negarse a sí mismo (Mateo 16:24) y soltar aquello que, aunque nos guste, sabemos que impide nuestra entrega total a Cristo."
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
const resultsSection = document.getElementById('results-section');
const podiumContainer = document.getElementById('podium-container');

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
let podiumDismissed = false;

// Consultas Globales
const teamsQuery = query(collection(db, `games/${GAME_ID}/teams`), orderBy('points', 'desc'));

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

      if (!podiumDismissed) {
        gameSection.classList.add('hidden');
        joinSection.classList.add('hidden');
        resultsSection.classList.remove('hidden');
        mostrarPodioFinal();
      }
      return;
    }

    // Si el juego NO ha terminado, reseteamos el descarte del podio para la próxima vez
    podiumDismissed = false;
    const questionIndex = gameData.currentQuestionIndex;
    const startedAt = gameData.questionStartedAt;
    const startedAtMs = startedAt && typeof startedAt.toMillis === 'function' ? startedAt.toMillis() : null;

    // Detectar Modo "Esperar Grupos" (Reset por el líder)
    if (questionIndex === -1 && !gameEnded) {
      currentQuestionIndex = -1;
      lastTimerQuestionIndex = null;
      lastTimerStartedAtMs = null;
      timeoutPenalizedQuestionIndex = null;
      resetTimerState();

      // Forzar vuelta al registro
      gameSection.classList.add('hidden');
      resultsSection.classList.add('hidden');
      joinSection.classList.remove('hidden');
      currentTeamName = null;
      teamNameInput.value = '';
      statusDisplay.innerHTML = '<span class="text-neonCyan animate-pulse">SISTEMA REINICIADO - INGRESE NOMBRE</span>';
      return;
    }

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
    button.className = 'w-full text-left p-4 rounded-xl border border-white/5 bg-white/5 hover:border-neonCyan hover:bg-neonCyan/5 hover:shadow-[0_0_20px_rgba(0,242,255,0.2)] transition-all duration-300 font-bold group relative overflow-hidden';

    // Indicador táctil lateral
    const bar = document.createElement('div');
    bar.className = 'absolute left-0 top-0 bottom-0 w-1 bg-neonCyan opacity-0 group-hover:opacity-100 transition-opacity';
    button.appendChild(bar);

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
  let timeLeft = QUESTION_DURATION_SECONDS;
  let timeSpent = 0;
  if (typeof questionStartedAtMs === 'number') {
    timeSpent = Math.floor((Date.now() - questionStartedAtMs) / 1000);
    timeLeft = QUESTION_DURATION_SECONDS - timeSpent;
    if (timeSpent >= QUESTION_DURATION_SECONDS) return;
  }
  answeredCurrentQuestion = true;

  // Al responder, se detiene el temporizador hasta la siguiente pregunta
  stopTimer();

  const isCorrect = selectedIndex === correctIndex;
  const timeBonus = isCorrect ? Math.max(0, Math.floor(timeLeft / 2)) : 0;
  const pointsChange = isCorrect ? (CORRECT_POINTS + timeBonus) : WRONG_POINTS;
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
      timeBonus,
      timeSpent,
      answeredAt: serverTimestamp()
    });
    batch.update(teamRef, {
      points: increment(pointsChange),
      totalTimeSpent: increment(timeSpent)
    });
    await batch.commit();

    const explicacion = preguntas[currentQuestionIndex].explicacion;
    if (isCorrect) {
      statusDisplay.innerHTML = `
        <div class="space-y-2 animate-bounce">
          <p class="text-neonCyan font-black tracking-widest uppercase text-sm drop-shadow-[0_0_10px_#00f2ff]">⚡ PUNTAJE ADQUIRIDO: +${pointsChange} ⚡</p>
          <p class="text-[9px] text-gray-500 font-bold uppercase mt-1">Bono por tiempo: +${timeBonus} | Restaban: ${timeLeft}s</p>
          <p class="text-[11px] text-gray-400 italic px-2">"${explicacion}"</p>
        </div>
      `;
    } else {
      const respuestaCorrectaTexto = preguntas[currentQuestionIndex].opciones[correctIndex];
      statusDisplay.innerHTML = `
        <div class="space-y-3">
          <p class="text-neonMagenta font-black tracking-widest uppercase text-sm drop-shadow-[0_0_10px_#ff00e5]">🛰️ ERROR DE CONEXIÓN</p>
          <p class="text-xs text-white bg-neonMagenta/20 border border-neonMagenta/40 py-2 rounded-lg">La respuesta era: <span class="font-bold underline">${respuestaCorrectaTexto}</span></p>
          <p class="text-[11px] text-gray-400 border-l-2 border-neonMagenta/40 pl-2 py-1">¿Por qué? ${explicacion}</p>
        </div>
      `;
    }
  } catch (err) {
    console.error(err);
    answeredCurrentQuestion = false;
    statusDisplay.innerHTML = '<span class="text-neonMagenta animate-pulse font-bold tracking-widest uppercase text-[10px]">⚠️ TIEMPO AGOTADO - TRANSFERENCIA FALLIDA</span>';
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

window.volverAlInicio = () => {
  podiumDismissed = true;
  resultsSection.classList.add('hidden');
  joinSection.classList.remove('hidden');
  currentTeamName = null;
  statusDisplay.innerHTML = '';
};

async function mostrarPodioFinal() {
  podiumContainer.innerHTML = '<p class="text-center text-gray-500 animate-pulse text-[10px] tracking-widest uppercase">Escaneando red de ganadores...</p>';
  try {
    const teamsSnap = await getDocs(teamsQuery);
    if (teamsSnap.empty) {
      podiumContainer.innerHTML = '<p class="text-center text-gray-500 text-[10px] uppercase">No hay nodos registrados en la red</p>';
      return;
    }
    const sortedTeams = teamsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    podiumContainer.innerHTML = '';

    // Top 3
    sortedTeams.slice(0, 3).forEach((team, index) => {
      const isWinner = index === 0;
      const card = document.createElement('div');
      card.className = `p-6 rounded-3xl border transition-all duration-700 ${isWinner
        ? 'bg-neonCyan/10 border-neonCyan shadow-[0_0_30px_rgba(0,242,255,0.2)] scale-105 z-10'
        : 'bg-white/5 border-white/10 opacity-80 scale-95'
        } flex items-center justify-between relative overflow-hidden`;

      if (isWinner) {
        card.innerHTML += `<div class="absolute -top-1 -right-1 text-3xl rotate-12 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">👑</div>`;
      }

      card.innerHTML += `
        <div class="flex items-center gap-4">
          <span class="text-4xl font-black italic ${isWinner ? 'text-neonCyan' : 'text-gray-600'}">${index + 1}</span>
          <div class="text-left">
            <h3 class="font-black text-xl italic uppercase tracking-tighter ${isWinner ? 'text-white' : 'text-gray-400'}">${team.name || team.id}</h3>
            <p class="text-[8px] font-bold text-gray-500 uppercase tracking-[0.2em]">Enlace Confirmado</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-2xl font-black ${isWinner ? 'text-neonCyan' : 'text-white'}">${team.points}</p>
          <p class="text-[8px] font-bold text-gray-500 uppercase">Puntos Red</p>
        </div>
      `;
      podiumContainer.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    podiumContainer.innerHTML = '<p class="text-[10px] text-neonMagenta text-center">⚠️ Error en la descarga del podio</p>';
  }
}

// 5. Actualizar el marcador en tiempo real
onSnapshot(teamsQuery, (snapshot) => {
  leaderboard.innerHTML = '';
  if (snapshot.empty) {
    leaderboard.innerHTML = '<p class="text-gray-500">Esperando jugadores...</p>';
    return;
  }
  const myTeamId = currentTeamName; // Asumiendo que currentTeamName es el ID del equipo actual
  snapshot.forEach((doc, index) => {
    const team = doc.data();
    const div = document.createElement('div');
    div.className = 'flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 transition-all hover:bg-white/10 group';

    const isMyTeam = (myTeamId && doc.id === myTeamId);
    if (isMyTeam) {
      div.className += ' border-neonCyan/40 bg-neonCyan/5 ring-1 ring-neonCyan/20';
    }

    div.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="w-6 h-6 rounded-lg bg-black/40 flex items-center justify-center text-[10px] font-bold text-gray-500 group-hover:text-neonCyan transition-colors">${index + 1}</span>
          <span class="font-bold ${isMyTeam ? 'text-neonCyan' : 'text-gray-200'}">${doc.id}</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="text-xs font-black p-1 px-2 rounded-lg bg-black/40 text-gray-400">${team.points}</span>
          <span class="text-[10px] text-gray-600 font-bold uppercase">pts</span>
        </div>
      `;
    leaderboard.appendChild(div);
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
