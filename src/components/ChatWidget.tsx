import { useEffect } from 'react';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';

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
      },
      initialMessages: [
        {
          text: "Welcome to our Community App! 🏛️\n\nI'm here to help you with:\n• 📅 Seat reservations for services\n• 🏠 Hospitality arrangements\n• 🚗 Community ride sharing\n• ❓ General questions about our platform\n\nHow can I assist you today?",
          sender: 'bot',
          createdAt: new Date().toISOString()
        }
      ]
    });

    // Add custom CSS overrides for additional styling consistency
    const style = document.createElement('style');
    style.textContent = `
      /* Chat widget custom overrides */
      .n8n-chat {
        font-family: 'Inter', sans-serif !important;
      }
      
      .n8n-chat-window {
        border: 1px solid #e5e7eb !important; /* Gray-200 */
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
      }
      
      .n8n-chat-header {
        background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%) !important;
        border-bottom: 1px solid #1d4ed8 !important;
        padding: 16px !important;
      }
      
      .n8n-chat-header h3 {
        font-weight: 600 !important;
        font-size: 18px !important;
        margin: 0 !important;
      }
      
      .n8n-chat-header p {
        font-size: 14px !important;
        opacity: 0.9 !important;
        margin: 4px 0 0 0 !important;
      }
      
      .n8n-chat-messages {
        padding: 16px !important;
        background-color: #fafafa !important;
      }
      
      .n8n-chat-message {
        margin-bottom: 12px !important;
        border-radius: 8px !important;
        padding: 12px 16px !important;
        max-width: 85% !important;
      }
      
      .n8n-chat-message.user {
        background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%) !important;
        margin-left: auto !important;
        box-shadow: 0 2px 4px rgba(30, 64, 175, 0.2) !important;
      }
      
      .n8n-chat-message.bot {
        background-color: #ffffff !important;
        border: 1px solid #e5e7eb !important;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
      }
      
      .n8n-chat-input-container {
        padding: 16px !important;
        border-top: 1px solid #e5e7eb !important;
        background-color: #ffffff !important;
      }
      
      .n8n-chat-input {
        border: 2px solid #e5e7eb !important;
        border-radius: 8px !important;
        padding: 12px 16px !important;
        font-size: 14px !important;
        transition: all 0.2s ease !important;
      }
      
      .n8n-chat-input:focus {
        border-color: #3b82f6 !important;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
        outline: none !important;
      }
      
      .n8n-chat-send-button {
        background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%) !important;
        border: none !important;
        border-radius: 8px !important;
        padding: 12px 16px !important;
        margin-left: 8px !important;
        transition: all 0.2s ease !important;
        font-weight: 500 !important;
      }
      
      .n8n-chat-send-button:hover {
        background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%) !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 4px 8px rgba(30, 64, 175, 0.3) !important;
      }
      
      .n8n-chat-toggle {
        background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%) !important;
        border: none !important;
        border-radius: 50% !important;
        width: 60px !important;
        height: 60px !important;
        box-shadow: 0 8px 16px rgba(30, 64, 175, 0.3) !important;
        transition: all 0.3s ease !important;
      }
      
      .n8n-chat-toggle:hover {
        transform: translateY(-2px) scale(1.05) !important;
        box-shadow: 0 12px 20px rgba(30, 64, 175, 0.4) !important;
      }
      
      .n8n-chat-toggle svg {
        width: 24px !important;
        height: 24px !important;
        color: #ffffff !important;
        fill: #ffffff !important;
      }
      
      /* Override any red colors in the chat widget */
      .n8n-chat-toggle svg path {
        fill: #ffffff !important;
        stroke: #ffffff !important;
      }
      
      /* Bot avatar/icon styling */
      .n8n-chat-avatar,
      .n8n-chat-bot-avatar {
        background-color: #3b82f6 !important;
        color: #ffffff !important;
        border: 2px solid #1e40af !important;
      }
      
      .n8n-chat-avatar svg,
      .n8n-chat-bot-avatar svg {
        color: #ffffff !important;
        fill: #ffffff !important;
      }
      
      .n8n-chat-avatar svg path,
      .n8n-chat-bot-avatar svg path {
        fill: #ffffff !important;
        stroke: #ffffff !important;
      }
      
      /* Ensure all icons use blue theme */
      .n8n-chat svg {
        color: #ffffff !important;
      }
      
      .n8n-chat .icon,
      .n8n-chat .bot-icon,
      .n8n-chat .assistant-icon {
        color: #ffffff !important;
        fill: #ffffff !important;
      }
      
      /* Scrollbar styling */
      .n8n-chat-messages::-webkit-scrollbar {
        width: 6px !important;
      }
      
      .n8n-chat-messages::-webkit-scrollbar-track {
        background: #f1f5f9 !important;
        border-radius: 3px !important;
      }
      
      .n8n-chat-messages::-webkit-scrollbar-thumb {
        background: #cbd5e1 !important;
        border-radius: 3px !important;
      }
      
      .n8n-chat-messages::-webkit-scrollbar-thumb:hover {
        background: #94a3b8 !important;
      }
      
      /* Animation for message appearance */
      .n8n-chat-message {
        animation: slideInMessage 0.3s ease-out !important;
      }
      
      @keyframes slideInMessage {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      /* Typing indicator styling */
      .n8n-chat-typing {
        background-color: #ffffff !important;
        border: 1px solid #e5e7eb !important;
        border-radius: 8px !important;
        padding: 12px 16px !important;
        margin-bottom: 12px !important;
      }
      
      /* Error message styling */
      .n8n-chat-error {
        background-color: #fef2f2 !important;
        border: 1px solid #fecaca !important;
        color: #dc2626 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default ChatWidget;