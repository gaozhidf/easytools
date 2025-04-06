import React, { useState } from 'react';
import { Card, Input, Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { CopyOutlined, FileTextOutlined } from '@ant-design/icons';

const { Text } = Typography;

const IpTool: React.FC = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<{
    type: string;
    isValid: boolean;
    networkType: string;
  } | null>(null);

  const getIPv4NetworkType = (firstOctet: number) => {
    if (firstOctet >= 1 && firstOctet <= 126) return t('ip.networkTypes.classA');
    if (firstOctet >= 128 && firstOctet <= 191) return t('ip.networkTypes.classB');
    if (firstOctet >= 192 && firstOctet <= 223) return t('ip.networkTypes.classC');
    if (firstOctet >= 224 && firstOctet <= 239) return t('ip.networkTypes.classD');
    if (firstOctet >= 240 && firstOctet <= 255) return t('ip.networkTypes.classE');
    return t('ip.networkTypes.unknown');
  };

  const getIPv6NetworkType = (ip: string) => {
    if (ip.startsWith('2001:db8::')) return t('ip.networkTypes.documentation');
    if (ip.startsWith('fc00::') || ip.startsWith('fd00::')) return t('ip.networkTypes.uniqueLocal');
    if (ip.startsWith('fe80::')) return t('ip.networkTypes.linkLocal');
    if (ip.startsWith('ff00::')) return t('ip.networkTypes.multicast');
    return t('ip.networkTypes.globalUnicast');
  };

  const parseIP = () => {
    // IPv4 验证正则
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    // IPv6 验证正则
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

    if (ipv4Regex.test(input)) {
      const parts = input.split('.');
      const isValid = parts.every(part => {
        const num = parseInt(part);
        return num >= 0 && num <= 255;
      });

      if (isValid) {
        setOutput({
          type: 'IPv4',
          isValid: true,
          networkType: getIPv4NetworkType(parseInt(parts[0])),
        });
      } else {
        setOutput({
          type: 'IPv4',
          isValid: false,
          networkType: t('ip.invalid'),
        });
      }
    } else if (ipv6Regex.test(input)) {
      setOutput({
        type: 'IPv6',
        isValid: true,
        networkType: getIPv6NetworkType(input),
      });
    } else {
      setOutput({
        type: t('ip.networkTypes.unknown'),
        isValid: false,
        networkType: t('ip.invalid'),
      });
    }
  };

  const copyToClipboard = () => {
    if (output) {
      const text = `${t('ip.type')}：${output.type}\n${t('ip.valid')}：${output.isValid ? t('common.yes') : t('common.no')}\n${t('ip.networkType')}：${output.networkType}`;
      navigator.clipboard.writeText(text);
    }
  };

  const fillWithExample = () => {
    setInput('192.168.1.1');
  };

  return (
    <Card title={t('ip.title')}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <Text type="secondary">{t('ip.description')}</Text>
        </div>
        <div>
          <Text strong>{t('common.example')}:</Text>
          <Text type="secondary" style={{ marginLeft: 8 }}>{t('ip.example')}</Text>
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
        <div style={{ display: 'flex', gap: '8px' }}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('ip.input.placeholder')}
            style={{ flex: 1 }}
          />
          <Button type="primary" onClick={parseIP}>
            {t('ip.parse')}
          </Button>
        </div>
        {output && (
          <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '4px' }}>
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
            <Text>{t('ip.type')}：{output.type}</Text>
            <br />
            <Text>{t('ip.valid')}：{output.isValid ? t('common.yes') : t('common.no')}</Text>
            <br />
            <Text>{t('ip.networkType')}：{output.networkType}</Text>
          </div>
        )}
      </div>
    </Card>
  );
};

export default IpTool; 