import React, {ChangeEvent, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import cn from 'classnames';
import {StoreContext} from '../../../stores';
import {FileInput} from '../../core/FileInput';
import {Table} from '../../core/Table';
import {Button} from '../../core/Button';
import styles from './styles.scss';

export const Main = observer(
    ({classNames = []}: { classNames?: string[] }) => {
        const {DifferencesStore} = useContext(StoreContext);
        const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
            if(e.target.files) {
                DifferencesStore.upload(e.target.files[0]);
            }
        };
        const switchChecker = (rowIdx: number) => {
            if (DifferencesStore.selectedRows.find((selectedRow) => selectedRow === rowIdx)) {
                DifferencesStore.unselectRow(rowIdx);
            } else {
                DifferencesStore.selectRow(rowIdx);
            }
        }

        return (
            <div className={cn(styles['main'], ...classNames)}>
                <FileInput onChange={uploadFile}/>
                {
                    DifferencesStore.differences.length ?
                        <>
                            <Table
                                rows={DifferencesStore.differences}
                                columns={Object.keys(DifferencesStore.differences[0])}
                                withChecker={true}
                                onCheck={switchChecker}
                            />
                            <Button>
                                Выгрузить
                            </Button>
                        </> :
                        null
                }
            </div>
        );
    }
);
