import {makeAutoObservable} from 'mobx';
import {DifferencesApi} from '../api/DifferencesApi';

export class DifferencesStore {
    differences = [];

    constructor() {
        makeAutoObservable(this);
    }

    *upload(file: File) {
        this.differences = yield new DifferencesApi().upload(file)
    }
}
