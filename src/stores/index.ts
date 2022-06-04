import {createContext} from 'react';
import {DifferencesStore} from './DifferencesStore';

export class Store {
    DifferencesStore: DifferencesStore;

    constructor() {
        this.DifferencesStore = new DifferencesStore();
    }
}
export const StoreContext = createContext<Store>(new Store());
