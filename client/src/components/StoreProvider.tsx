import { configure } from 'mobx';
import React from 'react';
import { RootStore } from '../store/index.store';

configure({ useProxies: 'never' });

export const store = new RootStore();
export const StoreContext = React.createContext(new RootStore());

const StoreProvider: React.FC = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export function useStore<Key extends keyof RootStore>(
  key: Key
): RootStore[Key] {
  const context = React.useContext(StoreContext);
  if (context === undefined)
    throw new Error('useStore must be used within StoreProvider');
  return context[key];
}

export default React.memo(StoreProvider);
