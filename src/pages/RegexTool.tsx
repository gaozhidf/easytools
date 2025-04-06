import React, { useState } from 'react';
import { Card, Input, Button, Typography, List } from 'antd';
import { useTranslation } from 'react-i18next';
import { CopyOutlined, FileTextOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Text } = Typography;

const RegexTool: React.FC = () => {
  const { t } = useTranslation();
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('');
  const [text, setText] = useState('');
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const results = [...text.matchAll(regex)];
      setMatches(results);
    } catch (e) {
      console.error('Invalid regex:', e);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const fillWithExample = () => {
    setPattern('\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b');
    setFlags('g');
    setText('联系我们：support@example.com 或 sales@company.cn\n更多信息请访问 https://www.example.com');
  };

  return (
    <Card title={t('regex.title')}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <Text type="secondary">{t('regex.description')}</Text>
        </div>
        <div>
          <Text strong>{t('common.example')}:</Text>
          <Text type="secondary" style={{ marginLeft: 8 }}>{t('regex.example')}</Text>
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
          <Text>{t('regex.pattern.label')}</Text>
          <Input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder={t('regex.pattern.placeholder')}
          />
        </div>
        <div>
          <Text>{t('regex.flags.label')}</Text>
          <Input
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder={t('regex.flags.placeholder')}
          />
        </div>
        <div>
          <Text>{t('regex.text.label')}</Text>
          <TextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('regex.text.placeholder')}
            rows={4}
          />
        </div>
        <Button type="primary" onClick={testRegex}>
          {t('regex.test')}
        </Button>
        {matches.length > 0 && (
          <div>
            <Text strong>{t('regex.match')}:</Text>
            <List
              bordered
              dataSource={matches}
              renderItem={(item, index) => (
                <List.Item
                  key={index}
                  actions={[
                    <Button
                      key="copy"
                      type="text"
                      icon={<CopyOutlined />}
                      onClick={() => copyToClipboard(item[0])}
                    />
                  ]}
                >
                  <div>
                    <Text>{item[0]}</Text>
                    {item.length > 1 && (
                      <div style={{ marginTop: 8 }}>
                        <Text type="secondary">{t('regex.groups')}:</Text>
                        <ul style={{ margin: 0, paddingLeft: 16 }}>
                          {item.slice(1).map((group, i) => (
                            <li key={i}>
                              <Text code>{group}</Text>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </List.Item>
              )}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default RegexTool; 