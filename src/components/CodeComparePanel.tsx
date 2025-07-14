import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Button, Tooltip } from 'antd';
import { ColumnWidthOutlined, ColumnHeightOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export interface CodeComparePanelProps {
  input: string;
  output: string;
  onInputChange?: (v: string) => void;
  inputLanguage?: string;
  outputLanguage?: string;
  inputTitle?: React.ReactNode;
  outputTitle?: React.ReactNode;
  toolbar?: React.ReactNode;
  layout?: 'horizontal' | 'vertical';
  height?: string | number;
}

const CodeComparePanel: React.FC<CodeComparePanelProps> = ({
  input,
  output,
  onInputChange,
  inputLanguage = 'plaintext',
  outputLanguage = 'plaintext',
  inputTitle,
  outputTitle,
  toolbar,
  layout = 'horizontal', // 默认横排
  height = 200,
}) => {
  const { t } = useTranslation();
  const [currentLayout, setCurrentLayout] = useState<'horizontal' | 'vertical'>(layout);
  const [showInput, setShowInput] = useState(true);
  const [showOutput, setShowOutput] = useState(true);

  const isVertical = currentLayout === 'vertical';
  const inputTitleFinal = inputTitle ?? t('codecompare.input', 'Input');
  const outputTitleFinal = outputTitle ?? t('codecompare.output', 'Output');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, gap: 8, justifyContent: 'space-between' }}>
        {toolbar && <div>{toolbar}</div>}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Tooltip title={isVertical ? 'Horizontal' : 'Vertical'}>
            <Button
              size="small"
              icon={isVertical ? <ColumnWidthOutlined /> : <ColumnHeightOutlined />}
              onClick={() => setCurrentLayout(isVertical ? 'horizontal' : 'vertical')}
            />
          </Tooltip>
          <Tooltip title={showInput ? 'Collapse Input' : 'Expand Input'}>
            <Button
              size="small"
              icon={<VerticalAlignTopOutlined style={{ color: showInput ? '#1677ff' : '#aaa' }} />}
              onClick={() => setShowInput(v => !v)}
              style={{ color: showInput ? '#1677ff' : '#aaa' }}
            />
          </Tooltip>
          <Tooltip title={showOutput ? 'Collapse Output' : 'Expand Output'}>
            <Button
              size="small"
              icon={<VerticalAlignBottomOutlined style={{ color: showOutput ? '#52c41a' : '#aaa' }} />}
              onClick={() => setShowOutput(v => !v)}
              style={{ color: showOutput ? '#52c41a' : '#aaa' }}
            />
          </Tooltip>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: isVertical ? 'column' : 'row',
          gap: 0,
          width: '100%',
        }}
      >
        {showInput && (
          <div style={{ flex: 1, minWidth: 0, paddingRight: isVertical ? 0 : (showOutput ? 6 : 0), display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}>{inputTitleFinal}</div>
            <MonacoEditor
              height={height}
              defaultLanguage={inputLanguage}
              value={input}
              onChange={v => onInputChange?.(v || '')}
              options={{ minimap: { enabled: false } }}
            />
          </div>
        )}
        {showInput && showOutput && !isVertical && (
          <div style={{ width: 1, background: '#eee', margin: '0 4px' }} />
        )}
        {showOutput && (
          <div style={{ flex: 1, minWidth: 0, paddingLeft: isVertical ? 0 : (showInput ? 6 : 0), display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}>{outputTitleFinal}</div>
            <MonacoEditor
              height={height}
              defaultLanguage={outputLanguage}
              value={output}
              options={{ readOnly: true, minimap: { enabled: false } }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeComparePanel;
