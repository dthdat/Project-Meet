# Project Meet

**Project Meet** is a web-based video conferencing app inspired by Google Meet. It uses WebRTC for real-time peer-to-peer video and audio communication, and Socket.IO for real-time chat functionality.

## Features

- **Real-Time Video & Audio** using WebRTC
- **Text Chat** powered by Socket.IO
- **Room System**: Create or join rooms via a unique URL
- **Responsive UI** with Tailwind CSS

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, Tailwind CSS
- **Backend**: Node.js, Express.js, Socket.IO
- **WebRTC**: Real-time media streaming between peers

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dthdat/Project-Meet.git
   cd Project-Meet
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root (if needed for config):

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and go to:
   ```
   http://localhost:3000
   ```

## How to Use

- **Create a meeting**: Visit the homepage and click "Create Meeting"
- **Join a meeting**: Enter an existing Room ID or follow a shared link
- **During a call**:
  - Toggle video/audio
  - Chat with other participants
  - See who’s in the room

## Known Limitations

- No user authentication or login system
- No screen sharing or recording features
- Works best with Chromium-based browsers (Chrome, Edge, etc.)
- Not optimized for large-scale meetings

## Roadmap / TODO

- Add screen sharing
- User authentication (OAuth or custom login)
- Meeting recording
- Improve UI/UX with better controls and layout

## License

MIT License. See [LICENSE](LICENSE) for more details.
