export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

export const themes: Record<string, Theme> = {
  default: {
    primaryColor: '#1890ff',
    secondaryColor: '#52c41a',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    borderColor: '#d9d9d9',
  }
}; 