import { useState, useEffect } from 'react';
import { dataStore, DataStoreState } from '../lib/dataStore';

export function useDataStore(): DataStoreState {
  const [store, setStore] = useState<DataStoreState>(dataStore.getStore());

  useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      setStore({ ...dataStore.getStore() });
    });
    return unsubscribe;
  }, []);

  return store;
}
