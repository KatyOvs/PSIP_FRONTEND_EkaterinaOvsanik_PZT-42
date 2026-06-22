// Внешний JS файл

function showMessage() {
    alert("Это сообщение из внешнего файла!");
    document.getElementById('dialogOutput').innerHTML = "Внешний файл отработал";
}

// Добавляем дополнительную кнопку при загрузке
document.addEventListener('DOMContentLoaded', function() {
    var lastSection = document.querySelector('.section:last-child');
    var btn = document.createElement('button');
    btn.textContent = 'Внешний JS';
    btn.onclick = showMessage;
    lastSection.insertBefore(btn, lastSection.querySelector('.output'));
});

console.log('Внешний JS файл загружен');