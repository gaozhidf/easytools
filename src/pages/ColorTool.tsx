import React, { useState } from 'react';
import { Card, Button, message, Typography, ColorPicker } from 'antd';
import { useTranslation } from 'react-i18next';
import { CopyOutlined, FileTextOutlined } from '@ant-design/icons';
import type { Color } from 'antd/es/color-picker';

const { Text } = Typography;

const ColorTool: React.FC = () => {
  const { t } = useTranslation();
  const [color, setColor] = useState<Color | null>(null);
  const [hex, setHex] = useState('');
  const [rgb, setRgb] = useState('');
  const [hsb, setHsb] = useState('');

  const convertColor = (color: Color) => {
    try {
      const hexValue = color.toHexString();
      const rgbValue = color.toRgbString();
      const hsbValue = color.toHsbString();
      setHex(hexValue);
      setRgb(rgbValue);
      setHsb(hsbValue);
      message.success(t('common.success'));
    } catch (e) {
      message.error(t('common.error') + ': ' + (e as Error).message);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success(t('common.copy') + ' ' + t('common.success'));
  };

  const fillWithExample = () => {
    // 直接设置 HEX 和 RGB 值
    setHex('#1890ff');
    setRgb('rgb(24, 144, 255)');
    setHsb('hsb(215, 91%, 100%)');
    // 无法直接设置 ColorPicker 的内部颜色值，所以只展示转换结果
    message.info(t('color.exampleMessage'));
  };

  return (
    <Card title={t('color.title')}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <Text type="secondary">{t('color.description')}</Text>
        </div>
        <div>
          <Text strong>{t('common.example')}:</Text>
          <Text type="secondary" style={{ marginLeft: 8 }}>{t('color.example')}</Text>
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
          <ColorPicker
            value={color}
            onChange={setColor}
            onChangeComplete={convertColor}
          />
          <Button type="primary" onClick={() => color && convertColor(color)}>
            {t('color.convert')}
          </Button>
        </div>
        {(hex || rgb || hsb) && (
          <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text strong>{t('common.result')}:</Text>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <Text strong>HEX:</Text>
                <Text style={{ marginLeft: 8 }}>{hex}</Text>
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  onClick={() => copyToClipboard(hex)}
                  size="small"
                />
              </div>
              <div>
                <Text strong>RGB:</Text>
                <Text style={{ marginLeft: 8 }}>{rgb}</Text>
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  onClick={() => copyToClipboard(rgb)}
                  size="small"
                />
              </div>
              <div>
                <Text strong>HSB:</Text>
                <Text style={{ marginLeft: 8 }}>{hsb}</Text>
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  onClick={() => copyToClipboard(hsb)}
                  size="small"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ColorTool;