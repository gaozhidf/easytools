import React, { useState } from 'react';
import { Card, Input, Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { FileTextOutlined } from '@ant-design/icons';

const { Text } = Typography;

const TimestampTool: React.FC = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<{
    localTime: string;
    utcTime: string;
    isoTime: string;
  } | null>(null);

  const timestampToDate = () => {
    const timestamp = parseInt(input);
    if (isNaN(timestamp)) {
      setOutput(null);
      return;
    }

    const date = new Date(timestamp * 1000);
    setOutput({
      localTime: date.toLocaleString(),
      utcTime: date.toUTCString(),
      isoTime: date.toISOString(),
    });
  };

  const dateToTimestamp = () => {
    const date = new Date(input);
    if (isNaN(date.getTime())) {
      setOutput(null);
      return;
    }

    setOutput({
      localTime: `${t('timestamp.unixTimestamp')}：${Math.floor(date.getTime() / 1000)}`,
      utcTime: `${t('timestamp.millisecondTimestamp')}：${date.getTime()}`,
      isoTime: '',
    });
  };

  const fillWithExample = () => {
    // 使用当前时间作为示例
    const now = Math.floor(Date.now() / 1000);
    setInput(now.toString());
  };

  return (
    <Card title={t('timestamp.title')}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <Text type="secondary">{t('timestamp.description')}</Text>
        </div>
        <div>
          <Text strong>{t('common.example')}:</Text>
          <Text type="secondary" style={{ marginLeft: 8 }}>{t('timestamp.example')}</Text>
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
            placeholder={t('timestamp.input.placeholder')}
            style={{ flex: 1 }}
          />
          <Button type="primary" onClick={timestampToDate}>
            {t('timestamp.toDate')}
          </Button>
          <Button type="primary" onClick={dateToTimestamp}>
            {t('timestamp.toTimestamp')}
          </Button>
        </div>
        {output && (
          <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '4px' }}>
            <Text>{t('timestamp.localTime')}：{output.localTime}</Text>
            <br />
            <Text>{t('timestamp.utcTime')}：{output.utcTime}</Text>
            {output.isoTime && (
              <>
                <br />
                <Text>{t('timestamp.isoTime')}：{output.isoTime}</Text>
              </>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default TimestampTool; 