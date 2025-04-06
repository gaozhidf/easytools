import React, { useState } from 'react';
import { Card, Input, Button, message, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { CopyOutlined, FileTextOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Text } = Typography;

const UrlTool: React.FC = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const encode = () => {
    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
      message.success(t('common.success'));
    } catch (e) {
      message.error(t('common.error') + ': ' + (e as Error).message);
    }
  };

  const decode = () => {
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
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
    const exampleUrl = 'https://example.com/search?q=你好世界&lang=zh-CN&page=1';
    setInput(exampleUrl);
  };

  return (
    <Card title={t('url.title')}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <Text type="secondary">{t('url.description')}</Text>
        </div>
        <div>
          <Text strong>{t('common.example')}:</Text>
          <Text type="secondary" style={{ marginLeft: 8 }}>{t('url.example')}</Text>
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
            placeholder={t('url.input.placeholder')}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button type="primary" onClick={encode}>
            {t('url.encode')}
          </Button>
          <Button type="primary" onClick={decode}>
            {t('url.decode')}
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
              placeholder={t('url.output.placeholder')}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default UrlTool; 