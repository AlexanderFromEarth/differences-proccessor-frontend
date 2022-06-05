import React from 'react';
import cn from 'classnames';
import styles from './styles.scss';

export const Table = (
    {
        columns,
        rows,
        withChecker = false,
        onCheck,
        placeholder = '',
        classNames = []
    }: {
        columns: string[],
        rows: { id: number, [_: string]: boolean | number | string | null }[],
        placeholder?: string,
        withChecker?: boolean,
        onCheck?: (rowIdx: number) => void,
        classNames?: string[]
    }
) =>
    <table className={cn(styles['table'], ...classNames)}>
        <thead>
        <tr className={cn(styles['table__row'])}>
            {
                withChecker && (
                    <th className={cn(styles['table__cell'])}></th>
                )
            }
            {
                columns.map(
                    (column) => <th key={column} className={cn(styles['table__cell'])}>{column}</th>
                )
            }
        </tr>
        </thead>
        <tbody>
        {
            rows.map(
                (row) => (
                    <tr key={row.id} className={cn(styles['table__row'])}>
                        {
                            withChecker && (
                                <td className={cn(styles['table__cell'])}>
                                    <input
                                        type="checkbox"
                                        className={cn(styles['table__checker'])}
                                        onChange={() => onCheck && onCheck(row.id)}
                                    />
                                </td>
                            )
                        }
                        {
                            columns
                                .map(
                                    (key) =>
                                        <td key={key} className={cn(styles['table__cell'])}>
                                            {row[key] || placeholder}
                                        </td>
                                )
                        }
                    </tr>
                )
            )
        }
        </tbody>
    </table>;
