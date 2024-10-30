// Hozzáadja a megadott értéket a kijelzőhöz
function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

// Törli a kijelzőn található összes adatot
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Törli a kijelzőn lévő utolsó karaktert
function deleteLast() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1); // Levágja az utolsó karaktert
}

// Kiszámítja a kijelzőn lévő kifejezést
function calculate() {
    let display = document.getElementById('display');
    try {
        // A 'eval' használata a kijelző értékének kiszámításához
        display.value = eval(display.value);
    } catch {
        // Hiba esetén "Error" jelenik meg a kijelzőn
        display.value = "Error";
    }
}
