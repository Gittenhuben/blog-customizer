import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import { useState } from 'react';
import classNames from 'classnames';


type TArrowButtonProps = {
  opened?: boolean;
  onClick?: () => void;
}

export function ArrowButton({opened = false, onClick }: TArrowButtonProps) {
  const [hover, setHover] = useState(false);

  function onMouseEnter() {
    setHover(true);
  }

  function onMouseLeave() {
    setHover(false);
  }

  function onClickWithUnhover() {
    if (onClick) {
      setHover(false);
      onClick();
    }  
  }

  return (
    <div
      onClick={onClickWithUnhover}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role='button'
      aria-label='Открыть/Закрыть форму параметров статьи'
      tabIndex={0}
      className={classNames(styles.container,
                            opened ? styles.container_open : null,
                            hover ? styles.container_hover : null
      )}
    >
      <img
        src={arrow}
        alt='иконка стрелочки'
        className={classNames(styles.arrow, opened ? styles.arrow_open: null)}
      />
    </div>
  );
};
