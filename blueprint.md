### V4 - Theme "Honrar a Dios" (Proverbios 3:9-10)

*   **Core Technology:** HTML, TailwindCSS, Firebase Firestore.
*   **Design (Cyber-Tech Theme):**
    *   Cyberpunk aesthetics with Neon Cyan and Magenta accents.
    *   Glassmorphism and deep shadows for a premium feel.
*   **New Features:**
    *   **Unified Saturdays Content:** Combined content from Jan 17 and Jan 24.
    *   **Thematic Focus:** Honoring God with priority, time, and decisions.
    *   **Question Set:** 10 targeted questions based on Proverbs 3:9-10 and youth application.
*   **Game Flow:**
    *   **Manual/Auto Progression:** Admin can advance questions or wait for all teams to sync.
    *   **Real-time Scoring:** Points for speed and correctness; penalties for anti-cheat and timeouts.

## Current State (V4)
The project is updated for the theme "Honrar a Dios" with a new question set focusing on Biblical priorities for youth.

### Components & File Locations

*   **Player Interface:**
    *   [index.html](file:///c:/Users/Admin/Desktop/dinamica/dinamicajuvenil/index.html): Entry point for teams. (Theme title updated).
    *   [main.js](file:///c:/Users/Admin/Desktop/dinamica/dinamicajuvenil/main.js): Player-side logic and question database (V4 set).
*   **Leader Control:**
    *   [leader.html](file:///c:/Users/Admin/Desktop/dinamica/dinamicajuvenil/leader.html): Simple control panel for the game host.
    *   [leader.js](file:///c:/Users/Admin/Desktop/dinamica/dinamicajuvenil/leader.js): Logic for advancing questions and resetting the game.
*   **Advanced Admin Panel:**
    *   [admin.html](file:///c:/Users/Admin/Desktop/dinamica/dinamicajuvenil/admin.html): Central dashboard with duplicate question set for reporting.

### Database Schema (Firestore)
*   `games/main-game`: Syncs current index and status.
*   `games/main-game/teams/`: Collection of registered teams and scores.
*   `config/admin`: Stores access key.
