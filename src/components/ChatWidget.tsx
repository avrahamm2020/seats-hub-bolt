import { useEffect, useState } from 'react';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';

const ChatWidget = () => {
  const [isWebhookAvailable, setIsWebhookAvailable] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkWebhookAvailability = async () => {
      try {
        const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
        
        if (!webhookUrl) {
          console.warn('VITE_WEBHOOK_URL is not configured');
          setIsChecking(false);
          return;
        }

        // Test the webhook with a simple ping
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ test: true })
        });

        if (response.ok) {
          setIsWebhookAvailable(true);
        } else {
          console.warn('Webhook URL is not responding correctly:', response.status);
        }
      } catch (error) {
        console.warn('Webhook URL is not reachable:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkWebhookAvailability();
  }, []);

  useEffect(() => {
    if (!isChecking && isWebhookAvailable) {
      try {
        createChat({
          webhookUrl: import.meta.env.VITE_WEBHOOK_URL,
          theme: {
            primaryColor: '#4f46e5',
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
          loadPreviousSession: false,
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
      } catch (error) {
        console.error('Failed to initialize chat widget:', error);
      }
    }
  }, [isChecking, isWebhookAvailable]);

  return null;
};

export default ChatWidget;