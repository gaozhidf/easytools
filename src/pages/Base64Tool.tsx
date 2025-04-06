import React, { useState } from 'react';
import { Card, Input, Button, message, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { CopyOutlined, FileTextOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Text } = Typography;

const Base64Tool: React.FC = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  // 安全的 Base64 编码函数，支持 Unicode 字符
  const safeEncode = (text: string) => {
    try {
      // 使用 encodeURIComponent 处理 Unicode 字符
      return btoa(encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (_, p1) => 
        String.fromCharCode(parseInt(p1, 16))
      ));
    } catch (e) {
      throw new Error(t('base64.encodeError'));
    }
  };

  // 安全的 Base64 解码函数，支持 Unicode 字符
  const safeDecode = (text: string) => {
    try {
      // 解码 Base64 并处理 Unicode 字符
      return decodeURIComponent(Array.prototype.map.call(atob(text), (c) => 
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));
    } catch (e) {
      throw new Error(t('base64.decodeError'));
    }
  };

  const encode = () => {
    try {
      const encoded = safeEncode(input);
      setOutput(encoded);
      message.success(t('common.success'));
    } catch (e) {
      message.error(t('common.error') + ': ' + (e as Error).message);
    }
  };

  const decode = () => {
    try {
      const decoded = safeDecode(input);
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
    const exampleText = 'Hello, EasyTools! 你好，易工具！';
    setInput(exampleText);
  };

  return (
    <Card title={t('base64.title')}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <Text type="secondary">{t('base64.description')}</Text>
        </div>
        <div>
          <Text strong>{t('common.example')}:</Text>
          <Text type="secondary" style={{ marginLeft: 8 }}>{t('base64.example')}</Text>
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
            placeholder={t('base64.input.placeholder')}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button type="primary" onClick={encode}>
            {t('base64.encode')}
          </Button>
          <Button type="primary" onClick={decode}>
            {t('base64.decode')}
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
              placeholder={t('base64.output.placeholder')}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default Base64Tool; 