import '@ant-design/v5-patch-for-react-19';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/markdown.css';
import MainLayout from './components/Layout';
import Base64Tool from './pages/Base64Tool';
import JsonTool from './pages/JsonTool';
import IpTool from './pages/IpTool';
import ImageTool from './pages/ImageTool';
import TimestampTool from './pages/TimestampTool';
import UrlTool from './pages/UrlTool';
import RegexTool from './pages/RegexTool';
import ColorTool from './pages/ColorTool';
import QrCodeTool from './pages/QrCodeTool';
import MarkdownTool from './pages/MarkdownTool';
import NumberTool from './pages/NumberTool';
import Md5Tool from './pages/Md5Tool';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/base64" replace />} />
          <Route path="base64" element={<Base64Tool />} />
          <Route path="json" element={<JsonTool />} />
          <Route path="ip" element={<IpTool />} />
          <Route path="image" element={<ImageTool />} />
          <Route path="timestamp" element={<TimestampTool />} />
          <Route path="url" element={<UrlTool />} />
          <Route path="regex" element={<RegexTool />} />
          <Route path="color" element={<ColorTool />} />
          <Route path="qrcode" element={<QrCodeTool />} />
          <Route path="markdown" element={<MarkdownTool />} />
          <Route path="number" element={<NumberTool />} />
          <Route path="md5" element={<Md5Tool />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
