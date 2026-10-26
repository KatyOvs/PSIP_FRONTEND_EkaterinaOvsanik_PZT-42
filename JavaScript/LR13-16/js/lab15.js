///ЛАБОРАТОРНАЯ РАБОТА 15. ОБРАБОТКА СОБЫТИЙ В JAVASCRIPT

// 1. СОБЫТИЯ МЫШИ
(function initMouseEvents() {
    const zone = document.getElementById("mouse-zone");
    const coords = document.getElementById("mouse-coords");

    // mousemove — показать координаты
    zone.addEventListener("mousemove", (e) => {
        const rect = zone.getBoundingClientRect();
        const x = Math.round(e.clientX - rect.left);
        const y = Math.round(e.clientY - rect.top);
        coords.style.display = "block";
        coords.style.left = x + "px";
        coords.style.top = y + "px";
        coords.textContent = `X: ${x}, Y: ${y}`;
    });
    zone.addEventListener("mouseleave", () => { coords.style.display = "none"; });

    // click — создать "рябь"
    zone.addEventListener("click", (e) => {
        const rect = zone.getBoundingClientRect();
        const ripple = document.createElement("div");
        ripple.className = "ripple";
        ripple.style.left = (e.clientX - rect.left) + "px";
        ripple.style.top = (e.clientY - rect.top) + "px";
        zone.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });

    // contextmenu — правый клик (отменяем стандартное меню, красная рябь)
    zone.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        const rect = zone.getBoundingClientRect();
        const ripple = document.createElement("div");
        ripple.className = "ripple";
        ripple.style.left = (e.clientX - rect.left) + "px";
        ripple.style.top = (e.clientY - rect.top) + "px";
        ripple.style.background = "rgba(220,38,38,0.4)";
        zone.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });

    // dblclick, mousedown, mouseup, mouseover, mouseout —
    // визуально уже заметны через координаты и рябь от click
})();

// 2. СОБЫТИЯ КЛАВИАТУРЫ
(function initKeyboardEvents() {
    const box = document.getElementById("kbd-box");
    const lastEl = document.getElementById("kbd-last");
    const countEl = document.getElementById("kbd-count");
    let count = 0;

    box.addEventListener("keydown", (e) => {
        count++;
        countEl.textContent = count;
        lastEl.textContent = `"${e.key}" (code: ${e.code})` +
            (e.ctrlKey ? " + Ctrl" : "") +
            (e.altKey ? " + Alt" : "") +
            (e.shiftKey ? " + Shift" : "");
    });

    box.addEventListener("keyup", (e) => {
        // keyup и keypress обрабатываются, лог не выводим
    });

    box.addEventListener("keypress", (e) => {
        // устаревшее, но по заданию включаем
    });
})();

// 3. DRAG & DROP
(function initDragAndDrop() {
    const source = document.getElementById("dnd-source");
    const target = document.getElementById("dnd-target");

    source.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", source.textContent.trim());
        e.dataTransfer.effectAllowed = "move";
    });

    target.addEventListener("dragover", (e) => {
        e.preventDefault(); // необходимо для разрешения drop
        target.classList.add("dragover");
    });

    target.addEventListener("dragleave", () => {
        target.classList.remove("dragover");
    });

    target.addEventListener("drop", (e) => {
        e.preventDefault();
        target.classList.remove("dragover");
        const data = e.dataTransfer.getData("text/plain");
        target.textContent = "Получено: " + data;
    });
})();

// 4. СОБЫТИЯ УКАЗАТЕЛЯ (POINTER EVENTS)
(function initPointerEvents() {
    const zone = document.getElementById("pointer-zone");
    const typeEl = document.getElementById("pointer-type");
    const lastEl = document.getElementById("pointer-last");

    function show(e) {
        typeEl.textContent = e.pointerType;
        lastEl.textContent = e.type;
    }

    zone.addEventListener("pointerdown", show);
    zone.addEventListener("pointerup", show);
    zone.addEventListener("pointerover", show);
    zone.addEventListener("pointerout", show);
    zone.addEventListener("pointerenter", show);
    zone.addEventListener("pointerleave", show);
    zone.addEventListener("pointercancel", show);

    // pointermove — ограничим частоту, чтобы не спамить
    let moveThrottle = 0;
    zone.addEventListener("pointermove", (e) => {
        const now = Date.now();
        if (now - moveThrottle < 150) return;
        moveThrottle = now;
        const rect = zone.getBoundingClientRect();
        typeEl.textContent = e.pointerType;
        lastEl.textContent =
            `pointermove (x=${Math.round(e.clientX - rect.left)}, y=${Math.round(e.clientY - rect.top)}, pressure=${e.pressure.toFixed(2)})`;
    });
})();

// 5. СОБЫТИЯ ПРОКРУТКИ
(function initScrollEvents() {
    const box = document.getElementById("scroll-box");
    const bar = document.getElementById("scroll-progress");
    const percentEl = document.getElementById("scroll-percent");

    box.addEventListener("scroll", () => {
        const max = box.scrollHeight - box.clientHeight;
        const percent = max > 0 ? Math.round((box.scrollTop / max) * 100) : 0;
        bar.style.width = percent + "%";
        percentEl.textContent = percent + "%";
    });

    box.addEventListener("wheel", () => {
        // прогресс обновится через scroll
    });
})();

// 6. СОБЫТИЯ СЕНСОРНЫХ ЭКРАНОВ
(function initTouchEvents() {
    const zone = document.getElementById("touch-area");
    const countEl = document.getElementById("touch-count");

    function showDots(touches) {
        // удаляем предыдущие точки
        zone.querySelectorAll(".touch-dot").forEach(d => d.remove());
        const rect = zone.getBoundingClientRect();
        for (const t of touches) {
            const dot = document.createElement("div");
            dot.className = "touch-dot";
            dot.style.left = (t.clientX - rect.left) + "px";
            dot.style.top  = (t.clientY - rect.top)  + "px";
            zone.appendChild(dot);
        }
        countEl.textContent = touches.length;
    }

    zone.addEventListener("touchstart", (e) => {
        showDots(e.touches);
    }, { passive: true });

    zone.addEventListener("touchmove", (e) => {
        showDots(e.touches);
    }, { passive: true });

    zone.addEventListener("touchend", (e) => {
        countEl.textContent = e.touches.length;
        setTimeout(() => zone.querySelectorAll(".touch-dot").forEach(d => d.remove()), 300);
    });

    zone.addEventListener("touchcancel", () => {
        countEl.textContent = 0;
        zone.querySelectorAll(".touch-dot").forEach(d => d.remove());
    });
})();

// 7. ТАЙМЕРЫ
let intervalId = null;
let timerStart = 0;
let timeoutId = null;

const timerDisplay = () => document.getElementById("timer-display");

function formatMs(ms) {
    const m = String(Math.floor(ms / 60000)).padStart(2, "0");
    const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
    const t = String(ms % 1000).padStart(3, "0");
    return `${m}:${s}:${t}`;
}

function startTimer() {
    if (intervalId) return;
    if (!timerStart) timerStart = Date.now();
    intervalId = setInterval(() => {
        const elapsed = Date.now() - timerStart;
        timerDisplay().textContent = formatMs(elapsed);
    }, 20);
}

function stopTimer() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

function resetTimer() {
    stopTimer();
    timerStart = 0;
    timerDisplay().textContent = "00:00:000";
}

function scheduleTimeout() {
    if (timeoutId) clearTimeout(timeoutId);
    const status = document.getElementById("timeout-status");
    status.textContent = "Ожидание 3 секунды…";
    timeoutId = setTimeout(() => {
        status.textContent = "Сработал!";
        timeoutId = null;
        setTimeout(() => { status.textContent = ""; }, 2000);
    }, 3000);
}

// requestAnimationFrame секундомер
let rafId = null;
let rafStart = 0;
let rafRunning = false;

function rafLoop(ts) {
    if (!rafStart) rafStart = ts;
    document.getElementById("raf-display").textContent =
        ((ts - rafStart) / 1000).toFixed(3) + " c";
    if (rafRunning) rafId = requestAnimationFrame(rafLoop);
}

function toggleRaf() {
    const btn = document.getElementById("raf-btn");
    if (rafRunning) {
        rafRunning = false;
        cancelAnimationFrame(rafId);
        btn.textContent = "Старт RAF";
    } else {
        rafStart = 0;
        rafRunning = true;
        rafId = requestAnimationFrame(rafLoop);
        btn.textContent = "Стоп RAF";
    }
}
// Инициализация при загрузке
window.addEventListener("DOMContentLoaded", () => {
    console.log("ЛР15: обработчики событий инициализированы.");
});