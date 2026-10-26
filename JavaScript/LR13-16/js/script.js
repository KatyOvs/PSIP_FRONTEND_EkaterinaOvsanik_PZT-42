
// WINDOW

let popupWindow = null;

function updateWindowInfo() {
    document.getElementById("win-width").textContent = window.innerWidth;
    document.getElementById("win-height").textContent = window.innerHeight;
    document.getElementById("popup-count").textContent =
        (popupWindow && !popupWindow.closed) ? 1 : 0;
}

window.addEventListener("resize", updateWindowInfo);

function openChildWindow() {
    if (popupWindow && !popupWindow.closed) {
        popupWindow.focus();
        return;
    }
    popupWindow = window.open("child.html", "childWindow",
        "width=500,height=400,resizable=yes");
    updateWindowInfo();
}

function closeChildWindow() {
    if (popupWindow && !popupWindow.closed) popupWindow.close();
    popupWindow = null;
    updateWindowInfo();
}

function sendMessageToChild() {
    if (!popupWindow || popupWindow.closed) {
        alert("Сначала откройте дочернее окно!");
        return;
    }
    popupWindow.postMessage("Привет из родительского окна!", "*");
}

function scrollTopPage() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
function scrollBottomPage() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

// Таймер
let seconds = 0;
setInterval(() => {
    seconds++;
    document.getElementById("timer").textContent =
        "Вы на странице: " + seconds + " сек";
}, 1000);

// Приём ответа от дочернего окна
window.addEventListener("message", (event) => {
    if (event.data && event.data.text) {
        alert("Ответ от дочернего окна: " + event.data.text);
    }
});

// LOCATION

function updateLocationInfo() {
    const loc = window.location;
    document.getElementById("loc-href").textContent = loc.href;
    document.getElementById("loc-protocol").textContent = loc.protocol;
    document.getElementById("loc-host").textContent = loc.host;
    document.getElementById("loc-path").textContent = loc.pathname;
    document.getElementById("loc-search").textContent = loc.search || "(нет)";
    document.getElementById("loc-hash").textContent = loc.hash || "(нет)";
}

function goToCatalog() {
    window.location.href = "catalog.html?category=phones&sort=price&page=1";
}
function reloadPage() {
    window.location.reload();
}
function replaceHash() {
    window.location.hash = "section1";
    updateLocationInfo();
}
window.addEventListener("hashchange", updateLocationInfo);

// NAVIGATOR

function detectDevice() {
    const ua = navigator.userAgent;
    const width = window.screen.width;
    let type = "Десктоп";
    let cls = "";
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(ua);
    const isTablet = /iPad|Android(?!.*Mobile)/i.test(ua);

    if (isTablet || (width >= 768 && width < 1024)) {
        type = "Планшет"; cls = "warn";
    } else if (isMobile || width < 768) {
        type = "Мобильное устройство"; cls = "mobile";
    } else if (width >= 1920) {
        type = "Большой десктопный экран";
    }
    const el = document.getElementById("device-type");
    el.textContent = type;
    el.className = "badge " + cls;
}

function updateNavigatorInfo() {
    document.getElementById("nav-ua").textContent = navigator.userAgent;
    document.getElementById("nav-lang").textContent = navigator.language;
    document.getElementById("nav-platform").textContent =
        navigator.platform || "(скрыто)";
    document.getElementById("nav-cookie").textContent = navigator.cookieEnabled;
    document.getElementById("nav-online").textContent = navigator.onLine;
    document.getElementById("nav-cores").textContent =
        navigator.hardwareConcurrency || "н/д";
    detectDevice();
}

// HISTORY

function updateHistoryInfo() {
    document.getElementById("hist-length").textContent = window.history.length;
}
function goBack()    { window.history.back(); }
function goForward() { window.history.forward(); }
function goToHistoryPage() { window.location.href = "history-page2.html"; }


// SCREEN

function renderScreenTable() {
    const s = window.screen;
    const rows = [
        ["Ширина экрана (screen.width)", s.width + " px"],
        ["Высота экрана (screen.height)", s.height + " px"],
        ["Доступная ширина (availWidth)", s.availWidth + " px"],
        ["Доступная высота (availHeight)", s.availHeight + " px"],
        ["Глубина цвета (colorDepth)", s.colorDepth + " бит"],
        ["Пиксельная глубина (pixelDepth)", s.pixelDepth + " бит"],
        ["Ориентация", (screen.orientation && screen.orientation.type) || "н/д"],
        ["Соотношение сторон", (s.width / s.height).toFixed(2)]
    ];
    const tbody = document.getElementById("screen-tbody");
    tbody.innerHTML = "";
    rows.forEach(([k, v]) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${k}</td><td>${v}</td>`;
        tbody.appendChild(tr);
    });
}

// DOM — ПРАКТИЧЕСКАЯ ЧАСТЬ


// 1. Изменить текст на странице
function changeDomText() {
    const el = document.getElementById("dom-text");
    el.textContent = "Текст изменён через DOM! Время: " +
        new Date().toLocaleTimeString();
}

// 2. Добавить новый блок
let blockCounter = 0;
function addDomBlock() {
    blockCounter++;
    const container = document.getElementById("dom-container");

    const newBlock = document.createElement("div");
    newBlock.className = "new-block";
    newBlock.textContent = "Новый блок №" + blockCounter;

    // Кнопка удаления внутри блока
    const delBtn = document.createElement("button");
    delBtn.textContent = "×";
    delBtn.style.marginLeft = "10px";
    delBtn.onclick = () => newBlock.remove();

    newBlock.appendChild(delBtn);
    container.appendChild(newBlock);
}

// 3. Удалить элемент
function removeDomElement() {
    const list = document.getElementById("dom-list");
    if (list.lastElementChild) {
        list.removeChild(list.lastElementChild);
    } else {
        alert("Список пуст!");
    }
}

// 4. Изменить стиль
let styleToggle = false;
function changeDomStyle() {
    const el = document.getElementById("dom-style");
    styleToggle = !styleToggle;

    if (styleToggle) {
        el.style.background = "#1a73e8";
        el.style.color = "#fff";
        el.style.fontWeight = "bold";
        el.style.transform = "scale(1.02)";
    } else {
        el.style.background = "";
        el.style.color = "";
        el.style.fontWeight = "";
        el.style.transform = "";
    }
}

// 5. Реагировать на действия пользователя
let clickCount = 0;
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("dom-event-btn");
    const counter = document.getElementById("dom-click-count");

    btn.addEventListener("click", () => {
        clickCount++;
        counter.textContent = clickCount;
        btn.textContent = "Нажато " + clickCount + " раз";
    });
});
// DOCUMENT — информация о документе
function updateDocumentInfo() {
    document.getElementById("doc-title").textContent    = document.title;
    document.getElementById("doc-url").textContent      = document.URL;
    document.getElementById("doc-location").textContent = window.location.href;
    document.getElementById("doc-domain").textContent   = document.domain || "(скрыто)";
    document.getElementById("doc-charset").textContent  = document.characterSet;
   
    document.getElementById("doc-width").textContent    = document.documentElement.scrollWidth;
    document.getElementById("doc-height").textContent   = document.documentElement.scrollHeight;

    document.getElementById("doc-elements").textContent = document.getElementsByTagName("*").length;
    document.getElementById("doc-buttons").textContent  = document.getElementsByTagName("button").length;
    document.getElementById("doc-links").textContent    = document.getElementsByTagName("a").length;
}

// ИНИЦИАЛИЗАЦИЯ

window.addEventListener("DOMContentLoaded", () => {
    updateWindowInfo();
    updateLocationInfo();
    updateNavigatorInfo();
    updateHistoryInfo();
    renderScreenTable();
    updateDocumentInfo();
    window.addEventListener("online", () =>
        document.getElementById("nav-online").textContent = "true");
    window.addEventListener("offline", () =>
        document.getElementById("nav-online").textContent = "false");
});
window.addEventListener("resize", updateDocumentInfo);