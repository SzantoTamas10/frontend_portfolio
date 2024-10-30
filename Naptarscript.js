// Kezdeti dátum beállítása
let currentDate = new Date();

function renderCalendar() {
    const monthYear = document.getElementById("monthYear");
    const calendarDays = document.getElementById("calendarDays");

    // Az aktuális hónap és év megjelenítése
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    monthYear.innerText = `${year} - ${currentDate.toLocaleString('hu-HU', { month: 'long' })}`;

    // Az adott hónap első napja és az utolsó napjának száma
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    // Naptár tisztítása
    calendarDays.innerHTML = "";

    // Üres cellák az első hét elejéhez igazítva
    for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) {
        const emptyCell = document.createElement("div");
        calendarDays.appendChild(emptyCell);
    }

    // Napok hozzáadása a naptárhoz
    for (let day = 1; day <= lastDateOfMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.innerText = day;

        // Aktuális nap kiemelése
        if (
            day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear()
        ) {
            dayCell.classList.add("today");
        }

        calendarDays.appendChild(dayCell);
    }
}

// Előző hónapra váltás
function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

// Következő hónapra váltás
function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

// Naptár inicializálása
renderCalendar();
