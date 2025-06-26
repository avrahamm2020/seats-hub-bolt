# Seats Hub Bolt

A community application for seat reservations and management.

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your actual webhook URL for the n8n Chat widget:
   ```
   VITE_WEBHOOK_URL=your_actual_webhook_url_here
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

The application uses the following environment variables:

- `VITE_WEBHOOK_URL`: The webhook URL for the n8n Chat widget. This is required for the chat functionality to work properly.

## Features

- Seat reservations and management
- Admin dashboard
- Member dashboard
- AI Chat assistant powered by n8n
