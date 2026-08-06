'use client';
import { useTheme } from '@/context/ThemeContext';

export default function FooterSpacer() {
  const { dark } = useTheme();
  return (
    <div style={{
      height: '100vh',
      position: 'relative',
      zIndex: 1,
      background: dark ? '#12103d' : '#faf8f3',
    }} />
  );
}
