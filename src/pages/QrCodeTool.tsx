import React, { useState } from 'react';
import { Card, Input, Button, message, Typography, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { DownloadOutlined, FileTextOutlined } from '@ant-design/icons';
import { QRCodeSVG } from 'qrcode.react';

const { TextArea } = Input;
const { Text } = Typography;

const QrCodeTool: React.FC = () => {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);
  const [qrCode, setQrCode] = useState<string>('');

  const generateQRCode = () => {
    try {
      if (text) {
        setQrCode('generated');
        message.success(t('common.success'));
      } else {
        message.warning(t('common.emptyInput'));
      }
    } catch (e) {
      message.error(t('common.error') + ': ' + (e as Error).message);
    }
  };

  const downloadQRCode = () => {
    try {
      const svgElement = document.getElementById('qrcode');
      if (svgElement) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = size;
        canvas.height = size;
        
        const img = new Image();
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
        const url = URL.createObjectURL(svgBlob);
        
        img.onload = () => {
          ctx?.drawImage(img, 0, 0);
          URL.revokeObjectURL(url);
          
          const pngUrl = canvas.toDataURL('image/png');
          
          const link = document.createElement('a');
          link.download = 'qrcode.png';
          link.href = pngUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          message.success(t('common.success'));
        };
        
        img.src = url;
      }
    } catch (e) {
      message.error(t('common.error') + ': ' + (e as Error).message);
    }
  };

  const fillWithExample = () => {
    setText('https://www.example.com');
    setSize(256);
    setTimeout(() => {
      generateQRCode();
    }, 100);
  };

  return (
    <Card title={t('qrcode.title')}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Text type="secondary">{t('qrcode.description')}</Text>
        </div>
        <div>
          <Space wrap>
            <Text strong>{t('common.example')}:</Text>
            <Text type="secondary">{t('qrcode.example')}</Text>
            <Button 
              type="link" 
              icon={<FileTextOutlined />} 
              onClick={fillWithExample}
              size="small"
            >
              {t('common.fillExample')}
            </Button>
          </Space>
        </div>
        <div>
          <TextArea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('qrcode.input.placeholder')}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <Space wrap>
            <Input
              type="number"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              style={{ width: 120 }}
              placeholder={t('qrcode.size.placeholder')}
            />
            <Button type="primary" onClick={generateQRCode}>
              {t('qrcode.generate')}
            </Button>
          </Space>
        </div>
        {qrCode && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text strong>{t('common.preview')}:</Text>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={downloadQRCode}
              >
                {t('qrcode.download')}
              </Button>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              padding: '16px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px'
            }}>
              <QRCodeSVG
                id="qrcode"
                value={text}
                size={Math.min(size, window.innerWidth * 0.8)}
                level="H"
                includeMargin={true}
              />
            </div>
          </div>
        )}
      </Space>
    </Card>
  );
};

export default QrCodeTool; 