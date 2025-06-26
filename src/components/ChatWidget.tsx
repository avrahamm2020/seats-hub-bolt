import { useEffect } from 'react';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';
import '../styles/chatWidget.css';
import { 
  chatWidgetTheme, 
  chatWidgetI18n, 
  chatWidgetMetadata, 
  chatWidgetWebhookConfig 
} from '../styles/chatWidgetTheme';

const ChatWidget = () => {
  useEffect(() => {
    createChat({
      webhookUrl: import.meta.env.VITE_WEBHOOK_URL,
      theme: chatWidgetTheme,
      i18n: chatWidgetI18n,
      loadPreviousSession: true, // Enable chat history persistence
      metadata: chatWidgetMetadata,
      initialMessages: [
        "Welcome to the Community App!",
        "I'm here to help you with seat reservations, hospitality, and rides." +
        " How can I assist you today?"
      ],

      webhookConfig: chatWidgetWebhookConfig
    });
  }, []);

  return null;
};

export default ChatWidget;
