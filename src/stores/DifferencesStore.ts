import {makeAutoObservable} from 'mobx';
import {saveAs} from 'file-saver';
import {DifferencesApi} from '../api/DifferencesApi';

export class DifferencesStore {
    differences?: Differences = undefined;
    selectedRows: number[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    *upload(file: File) {
        this.differences = yield new DifferencesApi().upload(file);
        this.selectedRows = [];
    }

    *download() {
        if(!this.differences) {
            return;
        }

        const {blob, filename} = yield new DifferencesApi().download(
            {
                ...this.differences,
                rows: this.differences.rows.filter(({id}) => this.selectedRows.includes(id))
            }
        );

        saveAs(blob, filename || 'result');

        this.differences = undefined;
        this.selectedRows = [];
    }

    switchRow(rowIdx: number) {
        if(this.selectedRows.find((selectedRow) => selectedRow === rowIdx)) {
            this.selectedRows = this.selectedRows.filter((selectedRow) => selectedRow !== rowIdx);
        } else {
            this.selectedRows = [...this.selectedRows, rowIdx];
        }
    }

    get differencesView(): DifferenceView[] {
        if(!this.differences) {
            return [];
        }

        return this.differences?.rows.map((difference) => ({
            id: difference.id,
            previousName: difference.previous.name,
            previousCode: difference.previous.code,
            previousAmount: difference.previous.amount,
            currentName: difference.current.name,
            currentCode: difference.current.code,
            currentAmount: difference.current.amount,
            budgetCode: difference.budget.code,
            budgetAmount: difference.budget.amount,
            temporaryCode: difference.temporary.code,
            temporaryAmount: difference.temporary.amount,
            hasDifference: difference.hasDifference ? null : ''
        }));
    }

    get differencesViewColumns(): string[] {
        return [
            'previousName',
            'previousCode',
            'previousAmount',
            'currentName',
            'currentCode',
            'currentAmount',
            'budgetCode',
            'budgetAmount',
            'temporaryCode',
            'temporaryAmount',
            'hasDifference'
        ];
    }
}
