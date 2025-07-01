// Lista corta de palabras (en minúsculas falta probar con la ñ )
export const validWords = [
  'perro',
  'gatos',
  'silla',
  'cielo',
  'arbol',
  'plaza',
  'tigre',
  'barco',
  'luzco',
  'viene',
];
// agregar diccionario con palabras
// Función para elegir palabra al azar y devolverla en mayúsculas
export const getRandomWord = () => {
  return validWords[Math.floor(Math.random() * validWords.length)].toUpperCase();
};
