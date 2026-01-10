# Blueprint: Juego Bíblico Multiequipo

## Overview

A real-time, multi-device Bible quiz game for youth groups. Teams can join from their own devices, answer questions simultaneously, and see a live leaderboard. The application is built with HTML, TailwindCSS, and vanilla JavaScript, using Firebase Firestore for real-time data synchronization. A separate interface is provided for the game leader to control the flow of questions.

## Project Outline & Features

### V2 - Leader-Controlled Quiz & Themed Questions

*   **Core Technology:** HTML, TailwindCSS, Firebase Firestore (v12.7.0).
*   **Design:**
    *   Player view with multiple-choice answer buttons.
    *   Leader view (`leader.html`) with simple controls to advance or reset the game.
*   **Game Flow & Logic:**
    *   **Themed Questions:** The game uses a predefined set of multiple-choice questions on the theme of "Honor" (La Honra).
    *   **Leader Control:** The game leader uses a separate page (`leader.html`) to control the game state. The leader can advance to the next question, which updates a `currentQuestionIndex` field in Firestore.
    *   **Real-time Question Sync:** All player devices listen for changes to the `currentQuestionIndex` in Firestore. When the index changes, the client displays the corresponding question and its multiple-choice options.
    *   **Answering:** Players click on an option. The client validates the answer against the correct index stored in the question object and updates the team's score in Firestore.
    *   **Live Leaderboard:** A real-time scoreboard shows all connected teams and their points, ordered from highest to lowest.
*   **Scoring System:**
    *   Correct Answer: **+2 points**
    *   Incorrect Answer: **-1 point**
    *   Anti-Cheat Penalty (leaving the app): **-3 points**

### V1 - Initial Implementation (Superseded)

*   ~~Real-time free-form question sync.~~ (Replaced with leader-controlled index)
*   ~~Simple correct/incorrect buttons.~~ (Replaced with multiple-choice options)

## Current Plan: Implement Leader-Controlled Quiz

**Objective:** Refactor the game to use a predefined list of multiple-choice questions, controlled by a game leader, and update the scoring rules.

**Steps:**
1.  **Update Firebase Config:** In `main.js` and `leader.js`, use the `12.7.0` SDK version and remove Firebase Analytics.
2.  **Implement Question Structure:** Add the `preguntas` array (theme: La Honra) to `main.js`.
3.  **Refactor `main.js` (Player View):**
    *   Listen for `currentQuestionIndex` changes in Firestore's `games/main-game` document.
    *   Dynamically generate multiple-choice buttons based on the current question.
    *   Implement the new scoring logic (`+2`, `-1`) when a player answers.
    *   Update the anti-cheat penalty to `-3` points.
4.  **Update `index.html` (Player View):**
    *   Remove the old static answer buttons.
    *   Add a container `div` for the dynamically generated multiple-choice buttons.
5.  **Create Leader Control Panel (`leader.html` & `leader.js`):**
    *   Create a new `leader.html` page with buttons for "Next Question" and "Reset Game".
    *   Create a corresponding `leader.js` file that initializes Firestore and contains the logic to update the `currentQuestionIndex` and `currentQuestion` text in the `games/main-game` document when the leader clicks the buttons.
