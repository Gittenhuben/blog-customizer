import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import './styles/index.scss';
import styles from './styles/index.module.scss';
import { settingsPage } from './settings';


const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
  const [counter, setCounter] = useState(-1);
  return (
    <div
      className={clsx(styles.main)}
      style={
        {
          '--font-family': settingsPage.fontFamilyOption.value,
          '--font-size': settingsPage.fontSizeOption.value,
          '--font-color': settingsPage.fontColor.value,
          '--container-width': settingsPage.contentWidth.value,
          '--bg-color': settingsPage.backgroundColor.value,
        } as CSSProperties
      }>
      <ArticleParamsForm setMainCounter={setCounter}/>
      <Article />
    </div>
  );
};

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
