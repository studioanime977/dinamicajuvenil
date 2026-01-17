### V3 - Theme "Cuando la fe se vuelve tradición" & Auto-Automation

*   **Core Technology:** HTML, TailwindCSS, Firebase Firestore.
*   **Design (Royal Amber Theme):**
    *   Solemn and premium look with Deep Midnight background and Gold/Amber accents.
    *   Glassmorphism effects on all cards.
*   **New Features:**
    *   **Automated Game Flow:** The Admin panel includes a "Modo Avance Automático" that detects when all registered teams have answered and advances to the next question after a 3-second delay.
    *   **Tricky Question Set:** 12 complex questions based on the theme "Cuando la fe se vuelve tradición", including scriptures like Lucas 3:8, Lucas 10, Mateo 16, and Genesis 32.
    *   **Updated Scoring:** Correct Answer: **+15 points** | Incorrect: **-10 points** | No Response: **-5 points** | Anti-Cheat: **-3 points**.
*   **Game Flow:**
    *   **Waiting State:** After answering, players see a message: "Esperando a los demás grupos...".
    *   **Real-time Admin Monitoring:** Admin sees live answers and can toggle between manual and automatic progression.

## Current State (V3)
The project is fully updated for the theme "Cuando la fe se vuelve tradición" with automated flow.

### Components & File Locations
(Same as V2, but with updated content in `main.js` and `admin.html`)

### Components & File Locations

*   **Player Interface:**
    *   [index.html](file:///c:/Users/Admin/Desktop/dinamica/dinamicajuvenil/index.html): Entry point for teams.
    *   [main.js](file:///c:/Users/Admin/Desktop/dinamica/dinamicajuvenil/main.js): Player-side logic, real-time sync, and the question database (themed: "La Honra y la Deshonra").
*   **Leader Control:**
    *   [leader.html](file:///c:/Users/Admin/Desktop/dinamica/dinamicajuvenil/leader.html): Simple control panel for the game host.
    *   [leader.js](file:///c:/Users/Admin/Desktop/dinamica/dinamicajuvenil/leader.js): Logic for advancing questions and resetting the game.
*   **Advanced Admin Panel:**
    *   [admin.html](file:///c:/Users/Admin/Desktop/dinamica/dinamicajuvenil/admin.html): Password-protected dashboard for managing teams, viewing live answers, and generating final reports. Contains a duplicate of the question set.
*   **Styling & Config:**
    *   [style.css](file:///c:/Users/Admin/Desktop/dinamica/dinamicajuvenil/style.css): Global custom styles (minimal).
    *   [GEMINI.md](file:///c:/Users/Admin/Desktop/dinamica/dinamicajuvenil/GEMINI.md): AI interaction guidelines.

### Database Schema (Firestore)

*   `games/main-game`: Syncs the current question index and game status.
*   `games/main-game/teams/`: Collection of registered teams and their scores.
*   `games/main-game/teams/{team}/answers/`: Individual responses per question.
*   `config/admin`: Stores the administrative access key.
