A simple chat app using Vonage Communications API.
- Create User
- Create a conversation
- Add the user to the conversation
- Chat between multiple users

## Getting Started

Clone the repo

```bash
git clone https://github.com/kapilrc/kapil-vonage-chat-app.git
cd kapil-vonage-chat-app
```

create .env.local file in the root folder

NEXT_PUBLIC_VONAGE_BASEURL=http://localhost:4000

For Chat-api service, an express backend,, [please refer instruction here](https://github.com/kapilrc/chat-api-service/blob/master/README.md)

Now, install dependencies

```bash
npm install
# or
yarn
```

run the development server:

```bash
npm run dev
# or
yarn dev
```

### Dependencies

- next
- redux/toolkit - store setup, rtk query
- react-redux - to let react components read data from a Redux store, and dispatch actions to the store to update state
- material ui - React component library
- nexmo-client - The Client SDK to provide a ready solution for developers to build Programmable Conversation applications across multiple Channels including: Messages, websockets

### Journeys
Home
- Create user, list users
- Create chat room, list chat rooms
- Enter chat room

Chat room
- load Messages
- type message to send
- logout from session

### Screenshots

![Create users and conversations view](https://github.com/kapilrc/kapil-vonage-chat-app/blob/master/public/home%20page.png)


![Chat room](https://github.com/kapilrc/kapil-vonage-chat-app/blob/master/public/chat%20room.png)