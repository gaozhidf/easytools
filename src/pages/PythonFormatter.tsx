import React, { useRef, useState } from 'react';
import { Card, Button, message, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { FileTextOutlined } from '@ant-design/icons';
import { type Diagnostic } from '@astral-sh/ruff-wasm-web';
import CodeComparePanel from '../components/CodeComparePanel';

const PythonFormatter: React.FC = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [useDoubleQuote, setUseDoubleQuote] = useState(true);
  const editorRef = useRef<any>(null);

  async function formatPython(code: string, useDoubleQuote: boolean) {
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
      message.error(t('common.error') + ': ' + (e as Error).message);
    }
    return { formatted, diagnostics };
  }

  const handleFormat = async () => {
    setLoading(true);
    try {
      const result = await formatPython(input, useDoubleQuote);
      setOutput(result.formatted);
      // 设置 Monaco markers
      if (editorRef.current && result.diagnostics) {
        const monaco = await import('monaco-editor');
        const model = editorRef.current.getModel();
        if (model) {
          monaco.editor.setModelMarkers(model, 'ruff', result.diagnostics.map(d => ({
            startLineNumber: d.start_location.row,
            startColumn: d.start_location.column,
            endLineNumber: d.end_location.row,
            endColumn: d.end_location.column,
            message: d.message,
            severity: monaco.MarkerSeverity.Warning,
          })));
        }
      }
    } catch (e) {
      message.error(t('common.error') + ': ' + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title={t('codeformat.python', 'Python 格式化工具')}>
      <div style={{ marginBottom: 12, color: '#888' }}>{t('codeformat.pythonDesc', '支持 Python 代码格式化与 Ruff 诊断，单双引号可选。')}</div>
      <CodeComparePanel
        input={input}
        output={output}
        onInputChange={v => setInput(v || '')}
        inputLanguage="python"
        outputLanguage="python"
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
        inputTitle={null}
        outputTitle={null}
      />
      {/* 用 ref 绑定 input editor 以便高亮诊断 */}
      <div style={{ display: 'none' }}>
        <div ref={editorRef} />
      </div>
    </Card>
  );
};

export default PythonFormatter;
