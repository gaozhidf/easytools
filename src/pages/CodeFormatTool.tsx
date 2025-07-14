import React, { useState } from 'react';
import { Card, Select, Button, Input, Typography, message, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { FileTextOutlined } from '@ant-design/icons';
import { type Diagnostic } from '@astral-sh/ruff-wasm-web';
import * as prettier from 'prettier/standalone';
import * as parserBabel from 'prettier/parser-babel';
import prettierPluginEstree from "prettier/plugins/estree";


const { TextArea } = Input;
const { Text } = Typography;

const formatters = [
  { value: 'python', label: 'Python' },
  { value: 'sql', label: 'SQL' },
  { value: 'js', label: 'JavaScript' },
  { value: 'css', label: 'CSS' },
  { value: 'html', label: 'HTML' },
];

async function formatCode(code: string, lang: string, useDoubleQuote: boolean): Promise<{ formatted: string, diagnostics?: Diagnostic[] }> {
  if (lang === 'python') {
    const { default: init, Workspace } = await import('@astral-sh/ruff-wasm-web');
    await init();
    const ws = new Workspace({
      format: {
        'indent-style': 'space',
        'quote-style': useDoubleQuote ? 'double' : 'single',
      },
    });
    let diagnostics: Diagnostic[] = [];
    let formatted = code;
    try {
      diagnostics = await ws.check(code);
      formatted = await ws.format(code);
    } catch (e) {
      console.log(e);
      console.log(diagnostics);
    }
    return { formatted, diagnostics };
  } else if (lang === 'js') {
    // const prettier = await import('prettier/standalone');
    // const parserBabel = await import('prettier/parser-babel');
    const formatted = await prettier.format(code, {
      parser: 'babel',
      plugins: [parserBabel, prettierPluginEstree],
      singleQuote: !useDoubleQuote,
      semi: true
    });
    return { formatted };
  } else if (lang === 'sql') {
    const sqlFormatter = await import('sql-formatter');
    return { formatted: sqlFormatter.format(code) };
  } else if (lang === 'css') {
    const beautify = (await import('js-beautify')).css;
    return { formatted: beautify(code, { indent_size: 2 }) };
  } else if (lang === 'html') {
    const beautify = (await import('js-beautify')).html;
    return { formatted: beautify(code, { indent_size: 2 }) };
  }
  return { formatted: code };
}

const CodeFormatTool: React.FC = () => {
  const { t } = useTranslation();
  const [lang, setLang] = useState('python');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [useDoubleQuote, setUseDoubleQuote] = useState(true);
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);

  const handleFormat = async () => {
    setLoading(true);
    try {
      const result = await formatCode(input, lang, useDoubleQuote);
      setOutput(result.formatted);
      setDiagnostics(result.diagnostics || []);
    } catch (e) {
      console.log(e);
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
          {(lang === 'python' || lang === 'js') && (
            <Switch
              checked={useDoubleQuote}
              onChange={setUseDoubleQuote}
              checkedChildren={t('codeformat.doubleQuote')}
              unCheckedChildren={t('codeformat.singleQuote')}
            />
          )}
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
        {lang === 'python' && diagnostics.length > 0 && (
          <div style={{ marginTop: 8 }}>
            {diagnostics.map((d, idx) => (
              <Typography.Text type="warning" key={idx} style={{ display: 'block' }}>
                ⚠️ {d.start_location.row}:{d.start_location.column}-{d.end_location.row}:{d.end_location.column} {d.message}
              </Typography.Text>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default CodeFormatTool;
