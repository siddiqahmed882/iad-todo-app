const LOCAL_STORAGE_KEY = 'todo-items';
// Save items to local storage
function saveToLocalStorage(items) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
}

// Get items from local storage
function getFromLocalStorage() {
  const rawData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return rawData ? JSON.parse(rawData) : []; // if rawData is null, return empty array
}

const todoStructure = {
  id: '', //window.crypto.randomUUID(), // use this or something else
  title: '', // from input
  isCompleted: false,
};
