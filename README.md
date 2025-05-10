# SMS to Telegram Forwarder

This React Native application captures incoming SMS messages and forwards them to a Telegram bot.

## Important Note

This app demonstrates the UI and architecture for an SMS forwarding application, but **please be aware** that accessing SMS data on Android requires native code modules, which are not fully implemented in this demo.

## Features

- SMS permission handling and message interception
- Secure transmission of SMS data to Telegram bot
- Background service for continuous SMS monitoring
- Message queue system for handling offline scenarios
- User configuration for Telegram bot token and chat ID
- Message filtering options to control what gets forwarded
- Notification system for forwarding status updates

## Implementation Details

In a full implementation, this app would:

1. Use native modules to access SMS data on Android
2. Implement a foreground service to continuously monitor for new messages
3. Handle the SMS_RECEIVED broadcast intent in native code
4. Securely store credentials for Telegram API
5. Implement a queue for messages when offline
6. Provide filtering and notification features

## How to use

1. Configure your Telegram bot:
   - Create a bot using BotFather in Telegram
   - Get your bot token and chat ID
   - Enter these in the app settings

2. Grant SMS permissions to the app

3. Toggle the forwarding service to start receiving SMS in Telegram

## Privacy & Security

- Messages are only forwarded to your configured Telegram bot
- No message content is stored on external servers
- The app includes options to filter which messages are forwarded
- All credentials are stored securely on your device

## Technical Requirements

- Android 6.0 or higher
- SMS permissions
- Internet connection for forwarding