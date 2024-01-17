import { INDEX_DB_NAME, INDEX_DB_VERSION } from "../utils/constants";

export default function connectWithIndexDB() {
  const request = indexedDB.open(INDEX_DB_NAME, INDEX_DB_VERSION);


  request.onupgradeneeded = (e) => {
    const db = e.target.result;
    db.createObjectStore("searches", { autoIncrement: true });
    db.createObjectStore("users", { keyPath: 'id' });
    db.createIndex('addIndexDBDate', 'addIndexDBDate', { unique: false });

  };

  IDBRequest.onerror = () => {
      console.error("Error abriendo la base de datos");
  };

}


export const deleteOne = (store, id) => {
  const IDBRequest = indexedDB.open(INDEX_DB_NAME, INDEX_DB_VERSION)

  IDBRequest.onsuccess = (e) => {
    const db = e.target.result
    const request = db
      .transaction(store, "readwrite")
      .objectStore(store)
      .delete(id);

    request.onError = (err) => {
      console.error(err);
    }

  }

}


export const getOne = (store, key) => {
  return new Promise((resolve, reject) => {
    const IDBRequest = indexedDB.open(INDEX_DB_NAME, INDEX_DB_VERSION);

    IDBRequest.onerror = () => {
      reject("Error abriendo la base de datos");
    };


    IDBRequest.onsuccess = (e) => {
      const db = e.target.result;
      const objectStore = db
        .transaction(store, 'readwrite')
        .objectStore(store);
      const req = objectStore.get(key);

      req.onsuccess = (e) => {
        resolve(e.target.result);
      };

      req.onerror = () => {
        reject("Error obteniendo todos los objetos");
      };
    };


  })
}


export const getAll = (store) => {
  return new Promise((resolve, reject) => {
    const IDBRequest = indexedDB.open(INDEX_DB_NAME, INDEX_DB_VERSION);

    IDBRequest.onerror = () => {
      reject("Error abriendo la base de datos");
    };

    IDBRequest.onsuccess = (e) => {
      const db = e.target.result;
      const objectStore = db
        .transaction(store, 'readwrite')
        .objectStore(store);
      const req = objectStore.getAll();

      req.onsuccess = (e) => {
        resolve(e.target.result);
      };

      req.onerror = () => {
        reject("Error obteniendo todos los objetos");
      };
    };
  });
};


export const getSize = (store) => {
  return new Promise((resolve, reject) => {
      const IDBRequest = indexedDB.open(INDEX_DB_NAME, INDEX_DB_VERSION);

    IDBRequest.onerror = () => {
      reject("Error abriendo la base de datos");
    };

    IDBRequest.onsuccess = (e) => {
      const db = e.target.result;
      const objectStore = db
        .transaction(store, 'readonly')
        .objectStore(store);
        const countRequest = objectStore.count();

      countRequest.onsuccess = () => {
        resolve(countRequest.result);
      };

      countRequest.onerror = () => {
        reject("Error obteniendo todos los objetos");
      };
    };

  })
}


export const add = (store, object) => {
  const IDBRequest = indexedDB.open(INDEX_DB_NAME, INDEX_DB_VERSION);
  const newObject = {
    ...object,
    addIndexDBDate: Date.now()
  }

  IDBRequest.onsuccess = (e) => {
    const db = e.target.result
    getAll(store)
      .then(all => {


        if(all.length > 4) {
          for(let i = 4; i < all.length; i++) {
            const element = all[i]
            db
              .transaction(store, 'readwrite')
              .objectStore(store)
              .delete(element.id)
    
          }
        }

        db
          .transaction(store, 'readwrite')
          .objectStore(store)
          .add(newObject)

      })

  }
}
