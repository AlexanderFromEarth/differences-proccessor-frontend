import {makeAutoObservable} from 'mobx';
import {DifferencesApi} from '../api/DifferencesApi';

export class DifferencesStore {
    differences: {
        previousName: string | null,
        previousCode: string | null,
        previousAmount: string | null,
        currentName: string | null,
        currentCode: string | null,
        currentAmount: string | null,
        budgetCode: string | null,
        budgetAmount: string | null,
        temporaryCode: string | null,
        temporaryAmount: string | null,
        hasDifference: string | null
    }[] = [];
    selectedRows: number[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    *upload(file: File) {
        this.differences = yield new DifferencesApi().upload(file)
        this.selectedRows = [];
    }

    selectRow(rowIdx: number) {
        this.selectedRows = [...this.selectedRows, rowIdx];
    }

    unselectRow(rowIdx: number) {
        this.selectedRows = this.selectedRows.filter((selectedRow) => selectedRow !== rowIdx);
    }
}
