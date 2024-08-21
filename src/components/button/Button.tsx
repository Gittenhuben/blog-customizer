import { Text } from 'components/text';
import styles from './Button.module.scss';
import { useState } from 'react';
import classNames from 'classnames';


export const Button = ({
  title,
  onClick,
  type,
}: {
  title: string;
  onClick?: (evt: React.FormEvent<HTMLButtonElement>) => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}) => {
  const [hover, setHover] = useState(false);
  return (
    <button className={classNames(styles.button, type!='submit' ? styles.button_secondary : null)}
            type={type}
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
    >
      <Text weight={800} uppercase color={type!='submit' && hover? '#ffffff' : undefined}>
        {title}
      </Text>
    </button>
  );
};
