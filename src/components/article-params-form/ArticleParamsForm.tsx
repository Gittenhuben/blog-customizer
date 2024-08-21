import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { Text } from 'components/text';
import * as constants from '../../constants/articleProps'
import { settingsForm, settingsPage } from '../../settings';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './ArticleParamsForm.module.scss';


type TArticleParamsFormProps = {
  setMainCounter: (value: number) => void;
}

export function ArticleParamsForm({setMainCounter}: TArticleParamsFormProps) {
  const [stateOpened, setStateOpened] = useState(false);
  const [counter, setCounter] = useState(0);

  function inTree(elem: HTMLElement, tagName: string) {
    if (!elem) return null;
    if (elem.tagName == tagName) return tagName;
    if (elem == document.body) return "body";
    if (!(elem.parentNode)) return elem.tagName;
    return inTree(elem.parentNode as HTMLElement, tagName);
  }

  function toggleContainerState() {
    setStateOpened(!stateOpened);
  }

  function closeContainer() {
    setStateOpened(false);
  }

  useEffect(() => {
    const handleEscapeKeyDown = (event: KeyboardEvent) => {
      if (event.key == 'Escape') closeContainer();
    };

    const handleMouse = (event: MouseEvent) => {
      if (inTree(event.target as HTMLElement, 'ARTICLE') == 'ARTICLE') closeContainer();
    };

    document.addEventListener('keydown', handleEscapeKeyDown);
    document.addEventListener('click', handleMouse);

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyDown);
      document.removeEventListener('click', handleMouse);
    };
  }, []);

  function onChangeFontFamily(value: constants.OptionType) {
    settingsForm.fontFamilyOption = value;
    setCounter(counter+1);
  }

  function onChangeFontSize(value: constants.OptionType) {
    settingsForm.fontSizeOption = value;
    setCounter(counter+1);
  }

  function onChangeFontColor(value: constants.OptionType) {
    settingsForm.fontColor = value;
    setCounter(counter+1);
  }

  function onChangeBackgroundColor(value: constants.OptionType) {
    settingsForm.backgroundColor = value;
    setCounter(counter+1);
  }

  function onChangeContentWidth(value: constants.OptionType) {
    settingsForm.contentWidth = value;
    setCounter(counter+1);
  }

  function onButtonReset(evt: React.FormEvent<HTMLButtonElement>) {
    evt.preventDefault();
    Object.assign(settingsForm, constants.defaultArticleState);
    Object.assign(settingsPage, constants.defaultArticleState);
    setMainCounter(counter);
    setCounter(counter+1);
  }

  function onButtonSubmit(evt: React.FormEvent<HTMLButtonElement>) {
    evt.preventDefault();
    Object.assign(settingsPage, settingsForm);
    setMainCounter(counter);
    setCounter(counter+1);
    closeContainer();
  }

  return (
    <>
      <ArrowButton opened={stateOpened} onClick={toggleContainerState} />
      <aside className={stateOpened ? classNames(styles.container, styles.container_open) : styles.container}>
        <form className={styles.form}>
          <Text as='h2' size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            selected={settingsForm.fontFamilyOption}
            options={constants.fontFamilyOptions}
            title='ШРИФТ'
            onChange={onChangeFontFamily}
          />
          <RadioGroup
            name='fontSizeRadioGroup'
            selected={settingsForm.fontSizeOption}
            options={constants.fontSizeOptions}
            title='РАЗМЕР ШРИФТА'
            onChange={onChangeFontSize}
          />
          <Select
            selected={settingsForm.fontColor}
            options={constants.fontColors}
            title='ЦВЕТ ШРИФТА'
            onChange={onChangeFontColor}
          />
          <Separator color={'#d7d7d7'} />
          <Select
            selected={settingsForm.backgroundColor}
            options={constants.backgroundColors}
            title='ЦВЕТ ФОНА'
            onChange={onChangeBackgroundColor}
          />
          <Select
            selected={settingsForm.contentWidth}
            options={constants.contentWidthArr}
            title='ШИРИНА КОНТЕНТА'
            onChange={onChangeContentWidth}
          />
          <div className={styles.bottomContainer}>
            <Button title='Сбросить' type='reset' onClick={onButtonReset} />
            <Button title='Применить' type='submit' onClick={onButtonSubmit} />
          </div>
        </form>
      </aside>
    </>
  );
};
