# Memory Card Game

## Project Overview
This is a web-based Memory Card Game developed as part of the Unified Mentor Internship Program. The game challenges players to match pairs of cards in a grid, tracking moves and time, with a high score system to record the best performance. It features a responsive design, flip animations, and a clean user interface built using HTML, CSS, and JavaScript.

### Technologies Used
- **HTML**: Structures the game board, controls, and congratulatory message.
- **CSS**: Implements a responsive grid layout, 3D flip animations, and responsive styling.
- **JavaScript**: Handles game logic, card shuffling, matching, move counting, timer, and high score persistence.

### Features
- **Card Matching**: Players flip two cards at a time to find matching pairs in a 4x4 grid.
- **Move and Time Tracking**: Displays the number of moves and elapsed time during gameplay.
- **High Score System**: Saves the best score (based on moves and time) using `localStorage`.
- **Responsive Design**: Adapts to various screen sizes (desktop, tablet, mobile).
- **Visual Effects**: Includes 3D card flip animations and a dimmed effect for matched cards.
- **Game Over Screen**: Shows a congratulatory message with final moves and time, with a "Play Again" option.

### Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone <repository-link>
   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd memory-card-game
   ```
3. **Place Image Files**:
   - Ensure the `images/` folder contains the card images referenced in `script.js` (e.g., `anu.jpg`, `anup.jpg`, etc.).
4. **Open the Application**:
   - Open `index.html` in a web browser (e.g., Chrome, Firefox).
   - No additional dependencies are required, as the project uses vanilla HTML, CSS, and JavaScript.

### How to Use
1. **Start the Game**:
   - The game begins automatically with a 4x4 grid of face-down cards.
   - Click "New Game" to reset and start a fresh game.
2. **Play the Game**:
   - Click any two cards to flip them and reveal their images.
   - If the images match, the cards remain face-up and are marked as matched.
   - If they don’t match, the cards flip back after a short delay.
3. **Track Progress**:
   - The "Moves" counter increments with each pair of flips.
   - The "Time" counter starts on the first card flip and updates every second.
   - The high score (lowest moves and time) is displayed at the top.
4. **Game Over**:
   - When all pairs are matched, a congratulatory message shows the final moves and time.
   - Click "Play Again" to start a new game.
5. **High Score**:
   - The best score (moves * 1000 + seconds) is saved in `localStorage` and updated if a better score is achieved.

### Project Structure
```
memory-card-game/
├── index.html      # Main HTML file for the game structure
├── style.css       # CSS file for styling and animations
├── script.js       # JavaScript file for game logic
├── images/         # Folder containing card images (e.g., anu.jpg, anup.jpg)
└── README.md       # Project documentation
```

### Code Quality
- **Modular**: Separate functions for game initialization, card shuffling, rendering, and matching logic.
- **Safe**: Prevents invalid actions (e.g., flipping matched cards or more than two cards at once).
- **Testable**: Game logic functions are isolated for potential unit testing.
- **Maintainable**: Clear variable names, comments, and structured code.
- **Portable**: Runs in any modern browser without dependencies.

### Optional Features Implemented
- **High Score System**: Tracks and displays the best score using `localStorage`.
- **Visual Animations**: 3D card flip effects and dimming for matched cards.
- **Responsive Design**: Adjusts card sizes and layout for smaller screens.

### Submission Details
- **GitHub Repository**: [Insert your GitHub repo link here]
- **Live Demo**: [Insert live demo link if hosted, e.g., on GitHub Pages]
- **Contact**: For queries, reach out to moganram10@gmail.com

### Future Enhancements
- Add difficulty levels (e.g., 6x6 grid or time limits).
- Include sound effects for card flips or matches.
- Support theme selection for different card image sets.