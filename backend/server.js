const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Разрешаем CORS (для разработки)
app.use(cors());

// Генерируем массив из 10 000 элементов (например, "Item 1", "Item 2", ...)
const generateItems = (count) => {
  const items = [];
  for (let i = 1; i <= count; i++) {
    items.push(`Item ${i}`);
  }
  return items;
};

const items = generateItems(10000);

// Эндпоинт для получения всех элементов
app.get('/api/items', (req, res) => {
  // Имитируем небольшую задержку, чтобы показать состояние загрузки
  setTimeout(() => {
    res.json(items);
  }, 200);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});