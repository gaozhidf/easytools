import React, { useState } from 'react';
import { Card, Input, Button, Typography, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { FileTextOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Option } = Select;

const NumberTool: React.FC = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(16);
  const [output, setOutput] = useState<string>('');

  const convertNumber = () => {
    try {
      const decimal = parseInt(input, fromBase);
      if (isNaN(decimal)) {
        setOutput(t('number.invalid'));
        return;
      }
      setOutput(decimal.toString(toBase).toUpperCase());
    } catch (e) {
      setOutput(t('common.error') + ': ' + (e as Error).message);
    }
  };

  const fillWithExample = () => {
    setInput('255');
    setFromBase(10);
    setToBase(16);
  };

  const bases = [
    { value: 2, label: t('number.bases.binary') },
    { value: 8, label: t('number.bases.octal') },
    { value: 10, label: t('number.bases.decimal') },
    { value: 16, label: t('number.bases.hexadecimal') },
    { value: 32, label: t('number.bases.base32') },
    { value: 36, label: t('number.bases.base36') },
  ];

  return (
    <Card title={t('number.title')}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <Text type="secondary">{t('number.description')}</Text>
        </div>
        <div>
          <Text strong>{t('common.example')}:</Text>
          <Text type="secondary" style={{ marginLeft: 8 }}>{t('number.example')}</Text>
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
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('number.input.placeholder')}
            style={{ flex: 1 }}
          />
          <Select
            value={fromBase}
            onChange={setFromBase}
            style={{ width: 150 }}
          >
            {bases.map(base => (
              <Option key={base.value} value={base.value}>
                {base.label}
              </Option>
            ))}
          </Select>
          <Button type="primary" onClick={convertNumber}>
            {t('number.convert')}
          </Button>
          <Select
            value={toBase}
            onChange={setToBase}
            style={{ width: 150 }}
          >
            {bases.map(base => (
              <Option key={base.value} value={base.value}>
                {base.label}
              </Option>
            ))}
          </Select>
        </div>
        {output && (
          <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '4px' }}>
            <Text>{t('common.result')}：{output}</Text>
          </div>
        )}
      </div>
    </Card>
  );
};

export default NumberTool; 