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
        const downloadFile = () => {
            DifferencesStore.download();
        };

        return (
            <main className={cn(styles['main'], ...classNames)}>
                <FileInput onChange={uploadFile}/>
                {
                    DifferencesStore.differences ?
                        <>
                            <Table
                                rows={DifferencesStore.differencesView}
                                columns={DifferencesStore.differencesViewColumns}
                                onCheck={DifferencesStore.switchRow}
                                withChecker={true}
                                placeholder="X"
                            />
                            <Button onClick={downloadFile}>
                                Выгрузить
                            </Button>
                        </> :
                        null
                }
            </main>
        );
    }
);
