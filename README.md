# Vue Search Filter

Тестовый проект для демонстрации оптимизации работы с большими списками во Vue 3.

## Описание

Приложение состоит из двух частей:

- **Бэкенд (Express)**: генерирует и отдаёт список из 10 000 строковых элементов.
- **Фронтенд (Vue 3 + Vite)**: компонент с полем ввода и виртуализированным списком, который фильтрует элементы по введённому тексту.

## Технологии

- Vue 3 (Composition API, `<script setup>`)
- Vite
- Express.js
- vue-virtual-scroller
- lodash-es (debounce)

## Запуск

### 1. Клонирование

```bash
git clone <your-repo-url>
cd vue-search-filter
```

### 2. Бэкенд

```bash
cd backend
npm install
npm run dev   # запуск на порту 3000
```

### 3. Фронтенд

```bash
cd frontend
npm install
npm run dev   # запуск на порту 5173
```

## Структура

```
vue-search-filter/
├── backend/               # Express сервер
│   ├── server.js
│   ├── package.json
│   └── ...
├── frontend/              # Vue 3 + Vite приложение
│   ├── src/
│   │   ├── components/
│   │   │   └── SearchList.vue
│   │   ├── App.vue
│   │   └── main.ts
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
└── README.md
```

## Оптимизации

- **Debounce** (300 мс) — фильтрация не запускается на каждое нажатие клавиши.
- **Виртуализация** — рендерится только 20–30 видимых элементов из 10 000.
- **Кэширование** — результаты запросов сохраняются в Map для повторного использования.

## Лицензия

MIT