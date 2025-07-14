import React, { useState } from 'react';
import { Card, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { FileTextOutlined } from '@ant-design/icons';
import CodeComparePanel from '../components/CodeComparePanel';

const SQLFormatter: React.FC = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFormat = async () => {
    setLoading(true);
    try {
      const sqlFormatter = await import('sql-formatter');
      const formatted = sqlFormatter.format(input);
      setOutput(formatted);
    } catch (e) {
      message.error(t('common.error') + ': ' + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title={t('codeformat.sql', 'SQL 格式化工具')}>
      <div style={{ marginBottom: 12, color: '#888' }}>{t('codeformat.sqlDesc', '支持 SQL 代码格式化，自动缩进和美化。')}</div>
      <CodeComparePanel
        input={input}
        output={output}
        onInputChange={v => setInput(v || '')}
        inputLanguage="sql"
        outputLanguage="sql"
        height={200}
        toolbar={
          <Button
            type="primary"
            icon={<FileTextOutlined />}
            onClick={handleFormat}
            loading={loading}
          >
            {t('codeformat.format', '格式化')}
          </Button>
        }
      />
    </Card>
  );
};

export default SQLFormatter;
