import styles from './index.module.scss';

type TSeparatorProps = {
  color?: string
}

export function Separator({color}: TSeparatorProps) {
  return <div className={styles.separator} style={ color ? {'backgroundColor': color} : undefined }></div>;
};
