
// ===============================================================================================
// 🔥 JUEGO BÍBLICO MULTIEQUIPO - PANEL DE LÍDER
// ===============================================================================================

// -----------------------------------------------------------------------------------------------
// 📦 IMPORTACIONES DE FIREBASE
// -----------------------------------------------------------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
//  DOM & VARIABLES DE ESTADO
// -----------------------------------------------------------------------------------------------
const nextQuestionButton = document.getElementById('next-question-button');
const resetGameButton = document.getElementById('reset-game-button');
const questionStatusDisplay = document.getElementById('current-question-status');
const teamCountDisplay = document.getElementById('team-count');

const GAME_ID = "main-game";
const TOTAL_QUESTIONS = 4;

// -----------------------------------------------------------------------------------------------
// 🕹️ LÓGICA DEL PANEL DE LÍDER
// -----------------------------------------------------------------------------------------------

// 1. Botón para pasar a la siguiente pregunta
nextQuestionButton.addEventListener('click', async () => {
  const gameRef = doc(db, `games/${GAME_ID}`);
  let gameDoc;
  try {
    gameDoc = await getDoc(gameRef);
  } catch (err) {
    console.error(err);
    questionStatusDisplay.textContent = 'Error leyendo el estado del juego (posible error de permisos).';
    return;
  }

  let nextIndex = 0;
  if (gameDoc.exists() && typeof gameDoc.data().currentQuestionIndex !== 'undefined') {
    nextIndex = gameDoc.data().currentQuestionIndex + 1;
  } 

  if (nextIndex >= TOTAL_QUESTIONS) {
    nextIndex = 0;
  }

  // Aquí podrías añadir un límite para que no se pase del total de preguntas.
  // Por ahora, simplemente actualiza el índice.
  try {
    await setDoc(gameRef, { currentQuestionIndex: nextIndex }, { merge: true });
  } catch (err) {
    console.error(err);
    questionStatusDisplay.textContent = 'No se pudo avanzar la pregunta (posible error de permisos en Firestore).';
  }
});

// 2. Botón para reiniciar el juego
resetGameButton.addEventListener('click', async () => {
  if (!confirm("¿Estás seguro de que quieres reiniciar el juego? Esto borrará el progreso de la pregunta actual, pero no los puntos de los equipos.")) {
    return;
  }
  
  const gameRef = doc(db, `games/${GAME_ID}`);
  // Esto regresa el juego al estado inicial donde los jugadores esperan al líder.
  try {
    await setDoc(gameRef, { currentQuestionIndex: -1 });
  } catch (err) {
    console.error(err);
    questionStatusDisplay.textContent = 'No se pudo reiniciar (posible error de permisos en Firestore).';
  }
});


// 3. Escuchar el estado del juego para feedback del líder
onSnapshot(doc(db, `games/${GAME_ID}`), (docSnap) => {
    if (docSnap.exists()) {
        const gameData = docSnap.data();
        const index = gameData.currentQuestionIndex;
        if (typeof index === 'undefined' || index < 0) {
            questionStatusDisplay.textContent = "Juego no iniciado. Pulsa 'Siguiente Pregunta' para empezar.";
        } else {
            questionStatusDisplay.textContent = `Pregunta #${index + 1}`;
        }
    }
}, (err) => {
    console.error(err);
    if (err?.code === 'permission-denied') {
        questionStatusDisplay.textContent = 'Firestore bloqueado por permisos. Ajusta las reglas para leer/escribir el juego.';
    } else {
        questionStatusDisplay.textContent = 'Error escuchando el estado del juego.';
    }
});

// 4. Escuchar la cantidad de equipos conectados
onSnapshot(collection(db, `games/${GAME_ID}/teams`), (snapshot) => {
    teamCountDisplay.textContent = snapshot.size;
}, (err) => {
    console.error(err);
    if (err?.code === 'permission-denied') {
        teamCountDisplay.textContent = '—';
    }
});
