// Függvény egy új elem hozzáadására a bevásárlólistához
function addItem() {
    const itemInput = document.getElementById("item-input");
    const itemText = itemInput.value.trim(); // Az input szöveg lekérése és a szóközök eltávolítása

    // Ellenőrzi, hogy az input nem üres
    if (itemText === "") {
        alert("Adj meg egy tételt a hozzáadáshoz!");
        return;
    }

    // Új listaelem létrehozása
    const listItem = document.createElement("li");
    listItem.innerText = itemText;

    // Esemény hozzáadása az elemhez, hogy megjelölje késznek
    listItem.addEventListener("click", () => {
        listItem.classList.toggle("completed"); // Átváltja a "completed" osztályt a stílushoz
    });

    // Törlés gomb létrehozása az elemhez
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Törlés";
    deleteButton.classList.add("delete-button");

    // Törlés gomb eseménykezelője az elem eltávolításához
    deleteButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Megakadályozza, hogy a kattintás a szülő elemre is kihatással legyen
        listItem.remove(); // Eltávolítja az elemet a listából
    });

    // Törlés gomb hozzáadása a listaelemhez
    listItem.appendChild(deleteButton);

    // Listaelem hozzáadása a bevásárlólistához
    document.getElementById("shopping-list").appendChild(listItem);

    // Input mező kiürítése a hozzáadás után
    itemInput.value = "";
}
