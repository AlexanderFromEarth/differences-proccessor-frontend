import React from 'react';
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
        rows: { [_: string]: string | null }[],
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
                    (column, idx) => <th key={idx} className={cn(styles['table__cell'])}>{column}</th>
                )
            }
        </tr>
        </thead>
        <tbody>
        {
            rows.map(
                (row, rowIdx) => (
                    <tr key={rowIdx} className={cn(styles['table__row'])}>
                        {
                            withChecker && (
                                <td className={cn(styles['table__cell'])}>
                                    <input
                                        type="checkbox"
                                        className={cn(styles['table__checker'])}
                                        onChange={() => onCheck && onCheck(rowIdx)}
                                    />
                                </td>
                            )
                        }
                        {
                            Object
                                .values(row)
                                .map(
                                    (value, colIdx) =>
                                        <td key={colIdx} className={cn(styles['table__cell'])}>
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
