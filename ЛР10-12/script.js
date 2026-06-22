// A = (3 + (y - 1)^2) / ((1 + x^2) * |y - cos(x)|)

function calculateA(x, y) {
    const numerator = 3 + Math.pow(y - 1, 2);
    const denominator = 1 + Math.pow(x, 2) * Math.abs(y - Math.cos(x)); // 1 + x² * |y - cos(x)|
    
    // Проверка на деление на ноль
    if (denominator === 0) {
        return "Ошибка: деление на ноль (знаменатель равен 0)";
    }
    
    const result = numerator / denominator;
    return result;
}

// Пример вызова 
const x = 2;
const y = 3;
const A = calculateA(x, y);

// Вывод результата в элемент с id "mathResult"
const resultDiv = document.getElementById("mathResult");
if (resultDiv) {
    resultDiv.innerHTML = `
        <h3>Задание с Math</h3>
        <p>Формула: A = (3 + (y - 1)<sup>2</sup>) / ( 1 + x<sup>2</sup> * |y - cos(x)|)</p>
        <p>При x = ${x}, y = ${y}</p>
        <p><strong>A = ${typeof A === 'number' ? A.toFixed(4) : A}</strong></p>
    `;
}