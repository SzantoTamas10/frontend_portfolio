// script.js

let lightState = "red"; // Kezdetben piros lámpa
let reactionStartTime = 0; // Az idő, amikor a lámpa zöldre vált
let gameRunning = false;
let lightInterval;
let results = []; // Eredmények tömbje, hogy tároljuk az összes próbálkozás reakcióidőit
let attempts = 5; // Kezdetben 5 próbálkozás
let stopwatchInterval; // Stopper időzítő

const reactionTimeElement = document.getElementById("reaction-time");
const resultElement = document.getElementById("result");
const clickButton = document.getElementById("clickButton");
const startButton = document.getElementById("startButton");
const resultsList = document.getElementById("results-list");
const stopwatchElement = document.getElementById("stopwatch");
const attemptsElement = document.getElementById("attempts");

const redLight = document.getElementById("red");
const yellowLight = document.getElementById("yellow");
const greenLight = document.getElementById("green");

// Kezdi a játékot, amikor a felhasználó rákattint az "Indítás" gombra vagy lenyomja az Entert
function startGame() {
    attempts = 5; // Minden új játék kezdetekor 5 próbálkozás van
    results = [];  // Eredmények törlése
    resultElement.textContent = '';
    reactionTimeElement.textContent = "Reakcióidő: 0 ms";
    stopwatchElement.textContent = "Idő: 0.0"; // Stopper kezdete
    attemptsElement.textContent = `Próbálkozások: ${attempts}`; // Kezdeti próbálkozások számának beállítása
    
    gameRunning = true;
    clickButton.disabled = false;
    clickButton.textContent = "Várj a zöld lámpára...";

    // Kezdjük el a lámpák váltását
    lightState = "red";
    redLight.style.opacity = 1;
    yellowLight.style.opacity = 0.3;
    greenLight.style.opacity = 0.3;

    // Lámpák váltása
    lightInterval = setInterval(function() {
        changeLight();
    }, 2000); // 2 másodpercenként változik a lámpa

    // Stopper indítása
    let startTime = Date.now();
    stopwatchInterval = setInterval(function() {
        if (gameRunning) {
            let elapsedTime = (Date.now() - startTime) / 1000; // Másodpercekben
            stopwatchElement.textContent = `Idő: ${elapsedTime.toFixed(1)}`;
        }
    }, 100); // Frissítés 0.1 másodpercenként
}

// Funkció, amely váltja a lámpákat
function changeLight() {
    if (!gameRunning) return;

    if (lightState === "red") {
        redLight.style.opacity = 0.3;
        yellowLight.style.opacity = 0.3;
        greenLight.style.opacity = 1;
        reactionStartTime = Date.now(); // A reakció kezdete
        lightState = "green"; // A lámpa zöldre vált
    } else if (lightState === "green") {
        greenLight.style.opacity = 0.3;
        yellowLight.style.opacity = 1;
        lightState = "yellow";
    } else if (lightState === "yellow") {
        yellowLight.style.opacity = 0.3;
        redLight.style.opacity = 1;
        lightState = "red";
    }
}

// A gomb kattintása
clickButton.addEventListener("click", function() {
    handleReaction();
});

// Az Enter billentyű lenyomása
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && gameRunning) {
        handleReaction();
    }
});

// Reakció logikájának kezelése
function handleReaction() {
    if (!gameRunning) return;

    // Ha a lámpa zöld, mérjük meg a reakcióidőt
    if (lightState === "green") {
        const reactionTime = Date.now() - reactionStartTime; // A reakcióidő milliszekundumban
        results.push(reactionTime); // Hozzáadjuk az eredményt
        attempts--; // Csökkentjük a hátralévő próbálkozások számát
        attemptsElement.textContent = `Próbálkozások: ${attempts}`;

        reactionTimeElement.textContent = `Reakcióidő: ${reactionTime} ms`;
        resultElement.textContent = `Sikeres kattintás! Reakcióidő: ${reactionTime} ms`;
    } else {
        resultElement.textContent = 'Túl hamar kattintottál vagy nyomtál Entert!';
    }

    // Ha elérjük az 5. próbálkozást, kiírjuk az összes eredményt
    if (attempts === 0) {
        setTimeout(function() {
            gameRunning = false;
            clickButton.disabled = true;
            clickButton.textContent = "Játék vége!";
            resultElement.textContent = `A játék véget ért!`;
            showFinalResults();
            clearInterval(stopwatchInterval); // Stopper leállítása
        }, 1000); // 1 másodperc várakozás, mielőtt kiírjuk az eredményeket
    } else {
        // Ha nem értük el az 5 próbát, újraindítjuk a következő kört
        clickButton.disabled = true;
        setTimeout(function() {
            clickButton.disabled = false;
            clickButton.textContent = "Várj a zöld lámpára...";
        }, 1500); // 1.5 másodperc várakozás
    }
}

// Kiírjuk az összes eredményt a végén a div-ben
function showFinalResults() {
    // Az eredményeket kiírjuk a results-list-be
    resultsList.innerHTML = ''; // Előző eredmények törlése

    results.forEach((time, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Próba #${index + 1}: ${time} ms`;
        resultsList.appendChild(listItem);
    });
}

// "S" gomb lenyomásával indítjuk a játékot
document.addEventListener("keydown", function(event) {
    if (event.key === "s" && !gameRunning) {
        startGame();
    }
});
