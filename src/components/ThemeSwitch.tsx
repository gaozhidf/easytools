import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

interface ThemeSwitchProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = () => {
  const { t } = useTranslation();

  return (
    <Select
      value="default"
      disabled
      style={{ width: 120 }}
    >
      <Option value="default">{t('theme.default')}</Option>
    </Select>
  );
};

export default ThemeSwitch; 