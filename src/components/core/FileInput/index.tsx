import React, {ChangeEventHandler} from 'react';
import cn from 'classnames';
import styles from './styles.scss';

export const FileInput = (
    {
        onChange,
        classNames = []
    }: {
        onChange?: ChangeEventHandler,
        classNames?: string[]
    }
) =>
    <input
        className={cn(
            styles['file-input'],
            classNames
        )}
        type="file"
        onChange={onChange}
    />;