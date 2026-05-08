'use client';
import React, { useState, useEffect } from 'react';
import SystemMessage from '@/components/ui/SystemMessage';

export default function SystemMessageController() {
  const [visible, setVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    { type: 'quest-complete' as const, title: 'Push Day Completed', description: 'You have grown stronger.', xpGain: 150 },
    { type: 'streak' as const, title: '23-Day Streak Active', description: 'Keep the momentum going.', xpGain: 50 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SystemMessage
      type={messages[messageIndex].type}
      title={messages[messageIndex].title}
      description={messages[messageIndex].description}
      xpGain={messages[messageIndex].xpGain}
      visible={visible}
      onClose={() => setVisible(false)}
    />
  );
}