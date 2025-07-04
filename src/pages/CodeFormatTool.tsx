import React, { useState } from 'react';
import { Card, Select, Button, Input, Typography, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { FileTextOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Text } = Typography;

const formatters = [
  { value: 'python', label: 'Python' },
  { value: 'sql', label: 'SQL' },
  { value: 'js', label: 'JavaScript' },
  { value: 'css', label: 'CSS' },
  { value: 'html', label: 'HTML' },
];

async function formatCode(code: string, lang: string): Promise<string> {
  if (lang === 'python') {
    // 使用 js-beautify 作为简单 python 格式化（有限支持）
    const beautify = (await import('js-beautify')).js;
    return beautify(code, { indent_size: 4 });
  } else if (lang === 'sql') {
    // 使用 sql-formatter
    const sqlFormatter = await import('sql-formatter');
    return sqlFormatter.format(code);
  } else if (lang === 'js') {
    // 使用 js-beautify 格式化 JavaScript 代码
    const beautify = (await import('js-beautify')).js;
    return beautify(code, { indent_size: 2 });
  } else if (lang === 'css') {
    // 使用 js-beautify 格式化 CSS 代码
    const beautify = (await import('js-beautify')).css;
    return beautify(code, { indent_size: 2 });
  } else if (lang === 'html') {
    // 使用 js-beautify 格式化 HTML 代码
    const beautify = (await import('js-beautify')).html;
    return beautify(code, { indent_size: 2 });
  }
  return code;
}

const CodeFormatTool: React.FC = () => {
  const { t } = useTranslation();
  const [lang, setLang] = useState('python');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFormat = async () => {
    setLoading(true);
    try {
      const result = await formatCode(input, lang);
      setOutput(result);
    } catch (e) {
      message.error(t('common.error') + ': ' + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title={t('codeformat.title')}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <Text type="secondary">{t('codeformat.description')}</Text>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Select
            value={lang}
            onChange={setLang}
            style={{ width: 120 }}
            options={formatters}
          />
          <Button type="primary" icon={<FileTextOutlined />} onClick={handleFormat} loading={loading}>
            {t('codeformat.format')}
          </Button>
        </div>
        <TextArea
          rows={8}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t('codeformat.inputPlaceholder')}
        />
        <TextArea
          rows={8}
          value={output}
          readOnly
          placeholder={t('codeformat.outputPlaceholder')}
        />
      </div>
    </Card>
  );
};

export default CodeFormatTool;
