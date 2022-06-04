import {makeAutoObservable} from 'mobx';
import {DifferencesApi} from '../api/DifferencesApi';

export class DifferencesStore {
    differences: Difference[] = [];
    selectedRows: number[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    *upload(file: File) {
        this.differences = yield new DifferencesApi().upload(file)
        this.selectedRows = [];
    }

    *download() {
        if (!this.differences.length || !this.selectedRows.length) {
            return;
        }

        yield new DifferencesApi().download(this.differences);

        this.differences = [];
        this.selectedRows = [];
    }

    selectRow(rowIdx: number) {
        this.selectedRows = [...this.selectedRows, rowIdx];
    }

    unselectRow(rowIdx: number) {
        this.selectedRows = this.selectedRows.filter((selectedRow) => selectedRow !== rowIdx);
    }
}
