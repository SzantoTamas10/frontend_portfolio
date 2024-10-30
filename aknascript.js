// Globális változók: rács mérete és aknák száma
const gridSize = 5;
const mineCount = 5;
let grid = [];

// Létrehozza az üres rácsot és beállítja az aknákat, majd kirajzolja a játékot
function createGrid() {
    // Üres rácsot hoz létre minden cella alapbeállításaival
    grid = Array(gridSize).fill().map(() => Array(gridSize).fill({ isMine: false, revealed: false, adjacentMines: 0 }));
    placeMines();         // Aknák elhelyezése véletlenszerűen a rácson
    calculateAdjacency(); // Szomszédos aknák számának kiszámítása minden cellára
    renderGrid();         // A rács megjelenítése a böngészőben
}

// Véletlenszerű helyekre rakja le az aknákat
function placeMines() {
    let placedMines = 0;
    // Addig ismétli, amíg az összes aknát le nem helyeztük
    while (placedMines < mineCount) {
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);
        // Csak akkor helyez aknát, ha az adott helyen még nincs akna
        if (!grid[row][col].isMine) {
            grid[row][col] = { ...grid[row][col], isMine: true };
            placedMines++;
        }
    }
}

// Számolja a szomszédos aknák számát minden cellánál
function calculateAdjacency() {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (!grid[row][col].isMine) {
                grid[row][col].adjacentMines = countAdjacentMines(row, col);
            }
        }
    }
}

// Meghatározza, hány szomszédos cella tartalmaz aknát
function countAdjacentMines(row, col) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];
    return directions.reduce((count, [dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        // Ellenőrzi, hogy az új koordináta a rácson belül van-e és hogy tartalmaz-e aknát
        if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize && grid[newRow][newCol].isMine) {
            return count + 1;
        }
        return count;
    }, 0);
}

// Megjeleníti a rácsot a böngészőben
function renderGrid() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = ''; // Kiüríti a tárolót az újrarajzolás előtt
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.onclick = () => revealCell(rowIndex, colIndex); // Cellakattintás eseménykezelő
            if (cell.revealed) {
                cellElement.classList.add("revealed");
                cellElement.innerText = cell.isMine ? "💣" : cell.adjacentMines || '';
            }
            gameContainer.appendChild(cellElement);
        });
    });
}

// Felfedi a megadott cellát; ha aknát találunk, vége a játéknak
function revealCell(row, col) {
    if (grid[row][col].revealed) return; // Ha a cella már felfedett, nem történik semmi
    grid[row][col].revealed = true; // Felfedi a cellát
    if (grid[row][col].isMine) {
        alert("Vesztettél! Aknára léptél!");
        revealAll(); // Megmutatja az összes cellát
    } else if (grid[row][col].adjacentMines === 0) {
        revealAdjacentCells(row, col); // Ha nincs szomszédos akna, felfedi a környező cellákat is
    }
    renderGrid(); // Újrarajzolás
}

// Felfedi a szomszédos cellákat, ha az aktuális cella körül nincs akna
function revealAdjacentCells(row, col) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];
    directions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        // Ellenőrzi, hogy a cella határon belül van-e, és még nincs felfedve
        if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize && !grid[newRow][newCol].revealed) {
            revealCell(newRow, newCol); // Rekurzív hívás
        }
    });
}

// Megmutatja az összes cellát, amikor a játék véget ér
function revealAll() {
    grid.forEach(row => row.forEach(cell => cell.revealed = true));
    renderGrid();
}

// Új játékot kezd, amikor a gombra kattintunk
function resetGame() {
    createGrid();
}

// A játék betöltésekor létrehozza az első rácsot
window.onload = createGrid;
