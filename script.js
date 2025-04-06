// Base64 编解码
function encodeBase64() {
    const input = document.getElementById('base64Input').value;
    const output = document.getElementById('base64Output');
    try {
        output.value = btoa(unescape(encodeURIComponent(input)));
    } catch (e) {
        output.value = '编码失败：' + e.message;
    }
}

function decodeBase64() {
    const input = document.getElementById('base64Input').value;
    const output = document.getElementById('base64Output');
    try {
        output.value = decodeURIComponent(escape(atob(input)));
    } catch (e) {
        output.value = '解码失败：' + e.message;
    }
}

// JSON 格式化
function formatJSON() {
    const input = document.getElementById('jsonInput').value;
    const output = document.getElementById('jsonOutput');
    try {
        const obj = JSON.parse(input);
        output.value = JSON.stringify(obj, null, 2);
    } catch (e) {
        output.value = '格式化失败：' + e.message;
    }
}

function compressJSON() {
    const input = document.getElementById('jsonInput').value;
    const output = document.getElementById('jsonOutput');
    try {
        const obj = JSON.parse(input);
        output.value = JSON.stringify(obj);
    } catch (e) {
        output.value = '压缩失败：' + e.message;
    }
}

// IP 地址解析
function parseIP() {
    const input = document.getElementById('ipInput').value;
    const output = document.getElementById('ipOutput');
    
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
            output.innerHTML = `
                <p>类型：IPv4</p>
                <p>有效：是</p>
                <p>网络类型：${getIPv4NetworkType(parts[0])}</p>
            `;
        } else {
            output.innerHTML = '<p>无效的 IPv4 地址</p>';
        }
    } else if (ipv6Regex.test(input)) {
        output.innerHTML = `
            <p>类型：IPv6</p>
            <p>有效：是</p>
            <p>网络类型：${getIPv6NetworkType(input)}</p>
        `;
    } else {
        output.innerHTML = '<p>无效的 IP 地址格式</p>';
    }
}

function getIPv4NetworkType(firstOctet) {
    if (firstOctet >= 1 && firstOctet <= 126) return 'A类';
    if (firstOctet >= 128 && firstOctet <= 191) return 'B类';
    if (firstOctet >= 192 && firstOctet <= 223) return 'C类';
    if (firstOctet >= 224 && firstOctet <= 239) return 'D类';
    if (firstOctet >= 240 && firstOctet <= 255) return 'E类';
    return '未知';
}

function getIPv6NetworkType(ip) {
    if (ip.startsWith('2001:db8::')) return '文档前缀';
    if (ip.startsWith('fc00::') || ip.startsWith('fd00::')) return '唯一本地地址';
    if (ip.startsWith('fe80::')) return '链路本地地址';
    if (ip.startsWith('ff00::')) return '多播地址';
    return '全局单播地址';
}

// 图片转换
function convertImage() {
    const fileInput = document.getElementById('imageInput');
    const format = document.getElementById('imageFormat').value;
    const preview = document.getElementById('imagePreview');
    
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                
                const convertedDataUrl = canvas.toDataURL(`image/${format}`);
                preview.innerHTML = `<img src="${convertedDataUrl}" alt="转换后的图片">`;
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

// 时间戳转换
function timestampToDate() {
    const input = document.getElementById('timestampInput').value;
    const output = document.getElementById('timestampOutput');
    
    const timestamp = parseInt(input);
    if (isNaN(timestamp)) {
        output.innerHTML = '无效的时间戳';
        return;
    }
    
    const date = new Date(timestamp * 1000);
    output.innerHTML = `
        <p>本地时间：${date.toLocaleString()}</p>
        <p>UTC时间：${date.toUTCString()}</p>
        <p>ISO时间：${date.toISOString()}</p>
    `;
}

function dateToTimestamp() {
    const input = document.getElementById('timestampInput').value;
    const output = document.getElementById('timestampOutput');
    
    const date = new Date(input);
    if (isNaN(date.getTime())) {
        output.innerHTML = '无效的日期格式';
        return;
    }
    
    output.innerHTML = `
        <p>Unix时间戳：${Math.floor(date.getTime() / 1000)}</p>
        <p>毫秒时间戳：${date.getTime()}</p>
    `;
}

// URL 编解码
function encodeURL() {
    const input = document.getElementById('urlInput').value;
    const output = document.getElementById('urlOutput');
    output.value = encodeURIComponent(input);
}

function decodeURL() {
    const input = document.getElementById('urlInput').value;
    const output = document.getElementById('urlOutput');
    output.value = decodeURIComponent(input);
}

// 正则表达式测试
function testRegex() {
    const pattern = document.getElementById('regexInput').value;
    const text = document.getElementById('regexText').value;
    const output = document.getElementById('regexOutput');
    
    try {
        const regex = new RegExp(pattern);
        const matches = text.match(regex);
        
        if (matches) {
            output.innerHTML = `
                <p>匹配结果：</p>
                <pre>${JSON.stringify(matches, null, 2)}</pre>
            `;
        } else {
            output.innerHTML = '没有找到匹配';
        }
    } catch (e) {
        output.innerHTML = '正则表达式错误：' + e.message;
    }
}

// 颜色转换
function convertToHex() {
    const color = document.getElementById('colorInput').value;
    const output = document.getElementById('colorOutput');
    output.innerHTML = `<p>HEX: ${color}</p>`;
}

function convertToRGB() {
    const color = document.getElementById('colorInput').value;
    const output = document.getElementById('colorOutput');
    const r = parseInt(color.substr(1,2), 16);
    const g = parseInt(color.substr(3,2), 16);
    const b = parseInt(color.substr(5,2), 16);
    output.innerHTML = `<p>RGB: rgb(${r}, ${g}, ${b})</p>`;
}

function convertToHSL() {
    const color = document.getElementById('colorInput').value;
    const output = document.getElementById('colorOutput');
    const r = parseInt(color.substr(1,2), 16) / 255;
    const g = parseInt(color.substr(3,2), 16) / 255;
    const b = parseInt(color.substr(5,2), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    
    output.innerHTML = `<p>HSL: hsl(${h}, ${s}%, ${l}%)</p>`;
} 