import React, { useState } from 'react';
import { Card, Input, Button, message, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { CopyOutlined, FileTextOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const { TextArea } = Input;
const { Text } = Typography;

const MarkdownTool: React.FC = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [rendered, setRendered] = useState(false);

  const convertMarkdown = () => {
    if (input.trim() === '') {
      message.warning(t('common.error') + ': ' + t('markdown.emptyInput'));
      return;
    }
    setRendered(true);
    message.success(t('common.success'));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(input);
    message.success(t('common.copy') + ' ' + t('common.success'));
  };

  const fillWithExample = () => {
    const exampleMarkdown = `# Markdown 示例

## 这是二级标题

### 这是三级标题

这是普通文本，**这是粗体文本**，*这是斜体文本*，~~这是删除线文本~~。

- 这是无序列表项
- 这是另一个列表项
  - 这是嵌套列表项

1. 这是有序列表项
2. 这是另一个有序列表项

> 这是引用文本

\`\`\`javascript
// 这是代码块
function hello() {
  console.log('Hello World!');
}
\`\`\`

[这是链接](https://example.com)

![这是图片描述](https://picsum.photos/200/100)

| 表头1 | 表头2 | 表头3 |
|-------|-------|-------|
| 单元格1 | 单元格2 | 单元格3 |
| 单元格4 | 单元格5 | 单元格6 |
`;
    setInput(exampleMarkdown);
  };

  return (
    <Card title={t('markdown.title')}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <Text type="secondary">{t('markdown.description')}</Text>
        </div>
        <div>
          <Text strong>{t('common.example')}:</Text>
          <Text type="secondary" style={{ marginLeft: 8 }}>{t('markdown.example')}</Text>
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
            placeholder={t('markdown.input.placeholder')}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button type="primary" onClick={convertMarkdown}>
            {t('markdown.preview')}
          </Button>
          <Button onClick={copyToClipboard} icon={<CopyOutlined />}>
            {t('common.copy')}
          </Button>
        </div>
        {rendered && input && (
          <div>
            <div style={{ marginBottom: 8 }}>
              <Text strong>{t('common.preview')}:</Text>
            </div>
            <div
              className="markdown-preview"
              style={{
                padding: '16px',
                background: '#f5f5f5',
                borderRadius: '4px',
                minHeight: '200px',
                overflow: 'auto',
              }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {input}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MarkdownTool; 