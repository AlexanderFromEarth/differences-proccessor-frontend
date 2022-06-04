import React from 'react';
import {observer} from 'mobx-react-lite';
import cn from 'classnames';
import {Main} from './pages/Main';
import styles from './styles.scss';

export const App = observer(
    () => (
        <div className={cn(styles['app'])}>
            <Main classNames={[styles['app__content'], styles['app__content_centered']]}/>
        </div>
    )
);
