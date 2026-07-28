<template>
  <div class="search-container">
    <h2>🔍 Поиск по 10 000 элементам</h2>

    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Введите текст для фильтрации..."
        class="search-input"
      />
      <span v-if="isLoading" class="loader">⏳ Загрузка...</span>
      <span v-else-if="!error" class="counter">Найдено: {{ filteredItems.length }}</span>
    </div>

    <!-- Состояние ошибки -->
    <div v-if="error" class="error-state">
      <p>❌ {{ error }}</p>
      <button @click="retryLoad" class="retry-btn">Повторить</button>
    </div>

    <!-- Виртуальный список -->
    <DynamicScroller
      v-else-if="filteredItems.length"
      :items="filteredItems"
      :min-item-size="40"
      class="scroller"
    >
      <template v-slot="{ item, index }">
        <DynamicScrollerItem :item="item" :active="true" :data-index="index">
          <div class="list-item">{{ item }}</div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>

    <div v-else-if="!isLoading && !error" class="empty-state">
      <p>😕 Ничего не найдено</p>
    </div>

    <footer class="version">Версия {{ version }}</footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { debounce } from 'lodash-es';
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { VERSION } from '../version';
import axios from 'axios';

const version = VERSION;

const items = ref<string[]>([]);
const filteredItems = ref<string[]>([]);
const searchQuery = ref('');
const isLoading = ref(true);
const error = ref<string | null>(null);
const cache = new Map<string, string[]>();

const loadItems = async () => {
  error.value = null;
  isLoading.value = true;
  try {
    const response = await axios.get('/api/items');
    items.value = response.data;
    filteredItems.value = response.data;
  } catch (err) {
    console.error('Ошибка загрузки данных:', err);
    error.value = 'Не удалось загрузить данные. Проверьте, запущен ли бэкенд (порт 3000).';
    items.value = [];
    filteredItems.value = [];
  } finally {
    isLoading.value = false;
  }
};

const retryLoad = () => {
  loadItems();
};

const filterItems = debounce((query: string) => {
  if (!query.trim()) {
    filteredItems.value = items.value;
    return;
  }

  const trimmedQuery = query.trim().toLowerCase();

  if (cache.has(trimmedQuery)) {
    filteredItems.value = cache.get(trimmedQuery)!;
    return;
  }

  const result = items.value.filter((item) =>
    item.toLowerCase().includes(trimmedQuery)
  );

  cache.set(trimmedQuery, result);
  filteredItems.value = result;
}, 300);

watch(searchQuery, (newQuery) => {
  filterItems(newQuery);
});

onMounted(() => {
  loadItems();
});
</script>

<style scoped>
.search-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.search-bar {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  gap: 12px;
  margin-bottom: 20px;
  width: 100%;
}

.search-input {
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
  width: 100%;
  box-sizing: border-box;
}

.search-input:focus {
  border-color: #409eff;
}

.loader,
.counter {
  font-size: 14px;
  color: #666;
  white-space: nowrap;
  justify-self: end;
}

.error-state {
  text-align: center;
  padding: 30px 20px;
  background: #fff0f0;
  border: 1px solid #ffd4d4;
  border-radius: 8px;
  margin-bottom: 20px;
}

.error-state p {
  color: #d32f2f;
  margin-bottom: 12px;
}

.retry-btn {
  padding: 8px 20px;
  background: #d32f2f;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.retry-btn:hover {
  background: #b71c1c;
}

.scroller {
  height: 500px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fafafa;
}

.list-item {
  padding: 10px 16px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 15px;
  transition: background 0.2s;
}

.list-item:hover {
  background: #f0f5ff;
}

.empty-state {
  text-align: center;
  padding: 40px 0;
  color: #999;
}

.version {
  text-align: center;
  margin-top: 30px;
  font-size: 12px;
  color: #bbb;
}
</style>