// export default function connectWithIndexDB() {
//   let db;
//   let request = indexedDB.open('myDB');
//   request.onupgradeneeded = function(e) {
//     db = e.target.result;
//     if (!db.objectStoreNames.contains('strings')) {
//       db.createObjectStore('strings', { keyPath: 'id' });
//     }
//   };
//   request.onsuccess = function(e) {
//     db = e.target.result;
//   };

// }


export default function connectWithIndexDB() {
  let db;
  let request = indexedDB.open('solaris');
  request.onupgradeneeded = function(e) {
    db = e.target.result;
    const objectStore = db.createObjectStore("searches", { keyPath: "id" });
    objectStore.createIndex("search", { unique: false });


    objectStore.transaction.oncomplete = () => {
    // Store values in the newly created objectStore.
    const customerObjectStore = db
      .transaction("searches", "readwrite")
      .objectStore("searches");

    customerObjectStore.add('almejo');
  };
  };
  // request.onsuccess = function(e) {
  //   db = e.target.result;
  //   // Guardar una cadena de texto
  //   let transaction = db.transaction(['searchs'], 'readwrite');
  //   let store = transaction.objectStore('searchs');
  //   let item = 'almejo'
  //   store.put(item);
  //   // Guardar un objeto con dos propiedades
  //   transaction = db.transaction(['profilesSearched'], 'readwrite');
  //   store = transaction.objectStore('profilesSearched');
  //   item = { id: '1', prop1: 'valor1', prop2: 'valor2' };
  //   store.put(item);
  // };
}