import React, {ChangeEventHandler} from 'react';
import cn from 'classnames';
import styles from './styles.scss';

export const Table = (
    {
        columns,
        rows,
        withChecker = false,
        onCheck,
        classNames = []
    }: {
        columns: string[],
        rows: { [_: string]: string }[],
        withChecker?: boolean,
        onCheck?: ChangeEventHandler,
        classNames?: string[]
    }
) =>
    <table className={cn(styles['table'], ...classNames)}>
        <thead>
        <tr className={cn(styles['table__row'])}>
            {
                columns.map(
                    (column, idx) => <th key={idx} className={cn(styles['table__cell'])}>{column}</th>
                )
            }
        </tr>
        </thead>
        <tbody>
        {
            rows.map(
                (row) => (
                    <tr className={cn(styles['table__row'])}>
                        <td className={cn(styles['table__cell'])}>
                            {
                                withChecker && (
                                    <input
                                        type="checkbox"
                                        className={cn(styles['table__checker'])}
                                        onChange={onCheck}
                                    />
                                )
                            }
                        </td>
                        {
                            Object
                                .values(row)
                                .map(
                                    (value, idx) =>
                                        <td key={idx} className={cn(styles['table__cell'])}>
                                            {value}
                                        </td>
                                )
                        }
                    </tr>
                )
            )
        }
        </tbody>
    </table>;
