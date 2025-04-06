import React, { useState } from 'react';
import { Card, Input, Button, message, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { CopyOutlined, FileTextOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Text } = Typography;

const JsonTool: React.FC = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const formatJSON = () => {
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj, null, 2));
      message.success(t('common.success'));
    } catch (e) {
      message.error(t('common.error') + ': ' + (e as Error).message);
    }
  };

  const minifyJSON = () => {
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj));
      message.success(t('common.success'));
    } catch (e) {
      message.error(t('common.error') + ': ' + (e as Error).message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    message.success(t('common.copy') + ' ' + t('common.success'));
  };

  const fillWithExample = () => {
    const exampleJson = `{
  "name": "EasyTools",
  "version": "1.0.0",
  "description": "A collection of useful tools",
  "features": [
    "JSON Formatter",
    "Markdown Preview",
    "Base64 Encoder/Decoder",
    "URL Encoder/Decoder",
    "Image Converter"
  ],
  "settings": {
    "theme": "default",
    "language": "zh-CN",
    "autoSave": true
  },
  "isOpenSource": true,
  "repository": "https://github.com/example/easytools"
}`;
    setInput(exampleJson);
  };

  return (
    <Card title={t('json.title')}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <Text type="secondary">{t('json.description')}</Text>
        </div>
        <div>
          <Text strong>{t('common.example')}:</Text>
          <Text type="secondary" style={{ marginLeft: 8 }}>{t('json.example')}</Text>
          <Button 
            type="link" 
            icon={<FileTextOutlined />} 
            onClick={fillWithExample}
            size="small"
            style={{ marginLeft: 8 }}
          >
            {t('common.fillExample')}
          </Button>
        </div>
        <div>
          <TextArea
            rows={6}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('json.input.placeholder')}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button type="primary" onClick={formatJSON}>
            {t('json.format')}
          </Button>
          <Button type="primary" onClick={minifyJSON}>
            {t('json.minify')}
          </Button>
        </div>
        {output && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text strong>{t('common.result')}:</Text>
              <Button
                type="text"
                icon={<CopyOutlined />}
                onClick={copyToClipboard}
                size="small"
              >
                {t('common.copy')}
              </Button>
            </div>
            <TextArea
              rows={6}
              value={output}
              readOnly
              placeholder={t('json.output.placeholder')}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default JsonTool; 