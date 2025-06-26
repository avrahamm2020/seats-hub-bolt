import { useEffect } from 'react';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';

const ChatWidget = () => {
  useEffect(() => {
    createChat({
      webhookUrl: import.meta.env.VITE_WEBHOOK_URL,
      theme: {
        primaryColor: '#4f46e5', // Match with your site's primary color
        chatWindowPosition: 'bottom-right'
      },
      i18n: {
        en: {
          title: 'AI Assistant',
          subtitle: "How can I help you today?",
          footer: '',
          getStarted: 'Start new chat',
          inputPlaceholder: 'Ask me anything...',
          closeButtonTooltip: 'Close chat',
        }
      },
      loadPreviousSession: false, // Disable loading previous sessions to avoid JSON parsing errors
      metadata: {
        appName: 'Community App',
        userType: 'visitor'
      },
      webhookConfig: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    });
  }, []);

  return null; // This component doesn't render anything visible
};

export default ChatWidget;
