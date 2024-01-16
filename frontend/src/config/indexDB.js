
export default function connectWithIndexDB() {
  const request = indexedDB.open('solaris', 1);


  request.onupgradeneeded = (e) => {
    const db = e.target.result;
    db.createObjectStore("searches", { autoIncrement: true });
    db.createObjectStore("users", { keyPath: 'id' });

  };

}


export const add = (store, object) => {
  const IDBRequest = indexedDB.open('solaris', 1);

  IDBRequest.onsuccess = (e) => {
    const db = e.target.result
    const objectStore = db
      .transaction(store, 'readwrite')
      .objectStore(store)
  
    objectStore.add(object)

  }

}



export const getAll = (store) => {
  const IDBRequest = indexedDB.open('solaris', 1);
  const result = [];

  IDBRequest.onsuccess = (e) => {
    const db = e.target.result
    const objectStore = db
      .transaction(store)
      .objectStore(store);
  
  
    objectStore
      .openCursor()
      .onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          result.push(cursor.value);
          cursor.continue();
        }
      };

  }

  return result
}