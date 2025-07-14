import React, { useState } from 'react';
import { Card, Button, message, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { FileTextOutlined } from '@ant-design/icons';
import * as prettier from 'prettier/standalone';
import * as parserBabel from 'prettier/parser-babel';
import prettierPluginEstree from "prettier/plugins/estree";
import CodeComparePanel from '../components/CodeComparePanel';

const JSFormatter: React.FC = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [useDoubleQuote, setUseDoubleQuote] = useState(true);

  const handleFormat = async () => {
    setLoading(true);
    try {
      const formatted = await prettier.format(input, {
        parser: 'babel',
        plugins: [parserBabel, prettierPluginEstree],
        singleQuote: !useDoubleQuote,
        semi: true
      });
      setOutput(formatted);
    } catch (e) {
      message.error(t('common.error') + ': ' + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title={t('codeformat.js', 'JS 格式化工具')}>
      <div style={{ marginBottom: 12, color: '#888' }}>{t('codeformat.jsDesc', '支持 JavaScript 代码格式化，单双引号可选。')}</div>
      <CodeComparePanel
        input={input}
        output={output}
        onInputChange={v => setInput(v || '')}
        inputLanguage="javascript"
        outputLanguage="javascript"
        height={200}
        toolbar={
          <>
            <Switch
              checked={useDoubleQuote}
              onChange={setUseDoubleQuote}
              checkedChildren={t('codeformat.doubleQuote', '双引号')}
              unCheckedChildren={t('codeformat.singleQuote', '单引号')}
            />
            <Button
              type="primary"
              icon={<FileTextOutlined />}
              onClick={handleFormat}
              loading={loading}
              style={{ marginLeft: 16 }}
            >
              {t('codeformat.format', '格式化')}
            </Button>
          </>
        }
      />
    </Card>
  );
};

export default JSFormatter;
