import { useEffect } from 'react';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';
import '../styles/chatWidget.css';

const ChatWidget = () => {
  useEffect(() => {
    createChat({
      webhookUrl: import.meta.env.VITE_WEBHOOK_URL,
      theme: {
        primaryColor: '#1e40af', // Blue-700 to match your site
        secondaryColor: '#3b82f6', // Blue-500 for accents
        backgroundColor: '#ffffff',
        textColor: '#1f2937', // Gray-800
        chatWindowPosition: 'bottom-right',
        chatWindowWidth: '400px',
        chatWindowHeight: '600px',
        borderRadius: '12px', // Rounded-xl to match your cards
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', // xl shadow
        headerBackgroundColor: '#1e40af', // Blue-700
        headerTextColor: '#ffffff',
        inputBackgroundColor: '#f9fafb', // Gray-50
        inputBorderColor: '#d1d5db', // Gray-300
        inputTextColor: '#1f2937', // Gray-800
        buttonBackgroundColor: '#1e40af', // Blue-700
        buttonTextColor: '#ffffff',
        buttonHoverBackgroundColor: '#1d4ed8', // Blue-600
        messageBackgroundColor: '#f3f4f6', // Gray-100
        messageTextColor: '#1f2937', // Gray-800
        userMessageBackgroundColor: '#1e40af', // Blue-700
        userMessageTextColor: '#ffffff',
        timestampColor: '#6b7280', // Gray-500
        scrollbarColor: '#d1d5db', // Gray-300
        scrollbarThumbColor: '#9ca3af', // Gray-400
      },
      i18n: {
        en: {
          title: 'Community Assistant',
          subtitle: "How can I help you with seat reservations, hospitality, or rides?",
          footer: '',
          getStarted: 'Start conversation',
          inputPlaceholder: 'Ask about seats, events, or community services...',
          closeButtonTooltip: 'Close chat',
        }
      },
      loadPreviousSession: true, // Enable chat history persistence
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

  return null;
};

export default ChatWidget;