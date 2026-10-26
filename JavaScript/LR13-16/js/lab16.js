
// ЛАБОРАТОРНАЯ РАБОТА 16. ОБЪЕКТЫ В JAVASCRIPT

// Вспомогательная функция для вывода на страницу
function print(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerHTML += text + "<br>";
}

function clearOut(id) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = "";
}

// ЗАДАНИЕ 1. Создание и доступ к объекту

function task1() {
    clearOut("out1");
    console.log("=== Задание 1 ===");

    // Создание объекта через литеральную нотацию
    const book = {
        title: "Война и мир",
        author: "Лев Толстой",
        year: 1869,
        genre: "Роман-эпопея"
    };

    // Доступ через точечную нотацию
    console.log("Точечная нотация:");
    console.log("title:", book.title);
    console.log("author:", book.author);
    console.log("year:", book.year);
    console.log("genre:", book.genre);

    // Доступ через скобочную нотацию
    console.log("Скобочная нотация:");
    console.log("title:", book["title"]);
    console.log("author:", book["author"]);
    console.log("year:", book["year"]);
    console.log("genre:", book["genre"]);

    print("out1", "<b>Объект book:</b>");
    print("out1", `title: ${book.title} | author: ${book.author} | year: ${book.year} | genre: ${book.genre}`);
    print("out1", `Через скобки: ${book["title"]}, ${book["author"]}, ${book["year"]}, ${book["genre"]}`);
    print("out1", "Подробный вывод — в консоли (F12).");
}

// ЗАДАНИЕ 2. Работа с методами объекта

function task2() {
    clearOut("out2");
    console.log("=== Задание 2 ===");

    const user = {
        firstName: "Иван",
        lastName: "Петров",
        age: 25,

        // Метод без this
        sayHello: function() {
            return "Привет!";
        },

        // Метод с this
        getFullName: function() {
            return this.firstName + " " + this.lastName;
        },

        // Метод, изменяющий свойство
        celebrateBirthday: function() {
            this.age++;
            return `С днём рождения! Теперь возраст: ${this.age}`;
        },

    };

    console.log(user.sayHello());
    console.log("Полное имя:", user.getFullName());
    console.log(user.celebrateBirthday());
    console.log("Возраст после:", user.age);

    print("out2", user.sayHello());
    print("out2", "Полное имя: " + user.getFullName());
    print("out2", user.celebrateBirthday());
}

// ЗАДАНИЕ 3. Удаление и проверка свойств
function task3() {
    clearOut("out3");
    console.log("=== Задание 3 ===");

    const car = {
        brand: "Toyota",
        model: "Camry",
        year: 2020,
        color: "black"
    };

    // Проверка через in
    console.log("'brand' in car:", "brand" in car);       // true
    console.log("'price' in car:", "price" in car);       // false

    // Проверка через hasOwnProperty
    console.log("car.hasOwnProperty('model'):", car.hasOwnProperty("model")); // true
    console.log("car.hasOwnProperty('price'):", car.hasOwnProperty("price")); // false

    // Удаление свойства
    console.log("До удаления color:", car.color);
    delete car.color;
    console.log("После удаления color:", car.color);
    console.log("'color' in car:", "color" in car);       // false

    print("out3", "'brand' in car: " + ("brand" in car));
    print("out3", "'price' in car: " + ("price" in car));
    print("out3", "hasOwnProperty('model'): " + car.hasOwnProperty("model"));
    print("out3", "hasOwnProperty('price'): " + car.hasOwnProperty("price"));
    print("out3", "После delete color: " + car.color + " | 'color' in car: " + ("color" in car));
}

// ЗАДАНИЕ 4. Перебор свойств объекта
function task4() {
    clearOut("out4");
    console.log("=== Задание 4 ===");

    const student = {
        name: "Анна",
        age: 20,
        group: "ПИ-21",
        city: "Москва"
    };

    // 1. for...in
    console.log("--- for...in ---");
    print("out4", "<b>for...in:</b>");
    for (let key in student) {
        console.log(key, "=", student[key]);
        print("out4", `${key} = ${student[key]}`);
    }

    // 2. Object.keys()
    console.log("--- Object.keys() ---");
    const keys = Object.keys(student);
    console.log(keys);
    print("out4", "<b>Object.keys():</b> " + keys.join(", "));

    // 3. Object.values()
    console.log("--- Object.values() ---");
    const values = Object.values(student);
    console.log(values);
    print("out4", "<b>Object.values():</b> " + values.join(", "));

    // 4. Object.entries()
    console.log("--- Object.entries() ---");
    const entries = Object.entries(student);
    console.log(entries);
    print("out4", "<b>Object.entries():</b>");
    entries.forEach(([k, v]) => print("out4", `&nbsp;&nbsp;${k}: ${v}`));
}

// ЗАДАНИЕ 5. Вложенные объекты
function task5() {
    clearOut("out5");
    console.log("=== Задание 5 ===");

    const company = {
        name: "TechCorp",
        address: {
            country: "Россия",
            city: "Санкт-Петербург",
            street: {
                name: "Невский проспект",
                building: 28,
                apartment: 15
            }
        },
        employees: {
            ceo: {
                name: "Сергей Иванов",
                contact: {
                    email: "ceo@techcorp.ru",
                    phone: "+375-999-123-45-67"
                }
            },
            developer: {
                name: "Мария Смирнова",
                contact: {
                    email: "dev@techcorp.ru",
                    phone: "+375-999-765-43-21"
                }
            }
        }
    };

    // Доступ к вложенным свойствам
    console.log("Город:", company.address.city);
    console.log("Улица:", company.address.street.name);
    console.log("Дом:", company.address.street.building);
    console.log("CEO:", company.employees.ceo.name);
    console.log("Email CEO:", company.employees.ceo.contact.email);
    console.log("Разработчик:", company.employees.developer.name);
    console.log("Телефон разработчика:", company.employees.developer.contact.phone);

    print("out5", "Город: " + company.address.city);
    print("out5", "Улица: " + company.address.street.name + ", дом " + company.address.street.building);
    print("out5", "CEO: " + company.employees.ceo.name + " (" + company.employees.ceo.contact.email + ")");
    print("out5", "Разработчик: " + company.employees.developer.name + " (" + company.employees.developer.contact.phone + ")");

    // Безопасный доступ через optional chaining
    console.log("Безопасный доступ:", company?.address?.street?.name);
    print("out5", "Optional chaining: " + company?.address?.street?.name);
}

// ЗАДАНИЕ 6. Практическое применение — телефонный справочник
function task6() {
    clearOut("out6");
    console.log("=== Задание 6. Телефонный справочник ===");

    const phoneBook = {
        "Иванов Иван": {
            phone: "+375-900-111-22",
            email: "ivanov@mail.ru",
            address: {
                city: "Москва",
                street: "Тверская",
                building: 10
            }
        },
        "Петрова Мария": {
            phone: "+375-900-444-55",
            email: "petrova@mail.ru",
            address: {
                city: "Санкт-Петербург",
                street: "Невский",
                building: 25
            }
        },
        "Сидоров Алексей": {
            phone: "+375-900-777-88",
            email: "sidorov@mail.ru",
            address: {
                city: "Казань",
                street: "Баумана",
                building: 7
            }
        }
    };

    // 1. Вывод всех контактов через Object.entries()
    print("out6", "<b>Все контакты:</b>");
    console.log("Все контакты:");
    Object.entries(phoneBook).forEach(([name, info]) => {
        const line = `${name} — ${info.phone} — ${info.email} — ${info.address.city}, ул. ${info.address.street}, д. ${info.address.building}`;
        console.log(line);
        print("out6", line);
    });

    // 2. Поиск по имени
    const searchName = "Петрова Мария";
    print("out6", `<b>Поиск "${searchName}":</b>`);
    if (searchName in phoneBook) {
        const info = phoneBook[searchName];
        print("out6", `Найден: ${searchName}, тел: ${info.phone}`);
        console.log("Найден:", searchName, info);
    } else {
        print("out6", "Контакт не найден");
    }

    // 3. Добавление нового контакта
    phoneBook["Кузнецов Дмитрий"] = {
        phone: "+375-900-000-11",
        email: "kuznetsov@mail.ru",
        address: {
            city: "Новосибирск",
            street: "Красный проспект",
            building: 100
        }
    };
    print("out6", "<b>Добавлен контакт «Кузнецов Дмитрий»</b>");
    console.log("После добавления:", Object.keys(phoneBook));

    // 4. Удаление контакта
    delete phoneBook["Сидоров Алексей"];
    print("out6", "<b>Удалён контакт «Сидоров Алексей»</b>");
    console.log("После удаления:", Object.keys(phoneBook));

    // 5. Проверка наличия
    print("out6", `<b>Проверка:</b>`);
    print("out6", `"Сидоров Алексей" in phoneBook: ${"Сидоров Алексей" in phoneBook}`);
    print("out6", `hasOwnProperty("Иванов Иван"): ${phoneBook.hasOwnProperty("Иванов Иван")}`);

    // 6. Подсчёт количества контактов
    const count = Object.keys(phoneBook).length;
    print("out6", `<b>Всего контактов: ${count}</b>`);

    // 7. Список всех городов через Object.values() и вложенные объекты
    const cities = Object.values(phoneBook).map(contact => contact.address.city);
    print("out6", `<b>Города контактов:</b> ${cities.join(", ")}`);
    console.log("Города:", cities);

    // 8. Формирование строки для вывода
    let summary = "Итоговая сводка:\n";
    for (let name in phoneBook) {
        summary += `${name}: ${phoneBook[name].phone}\n`;
    }
    console.log(summary);
}