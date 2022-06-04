import React, {MouseEventHandler, ReactNode} from 'react';
import cn from 'classnames';
import styles from './styles.scss';

export const Button = (
    {
        onClick,
        children,
        isPrimary = false,
        classNames = []
    }: {
        onClick?: MouseEventHandler,
        children?: ReactNode[] | string | ReactNode,
        isPrimary?: boolean,
        classNames?: string[]
    }
) =>
    <button
        className={cn(
            styles['button'],
            isPrimary ? styles['button_primary'] : styles['button_secondary'],
            ...classNames
        )}
        onClick={onClick}
    >
        {children}
    </button>;
