// Local-only signaling for browser integration tests. Not a game server or deployment requirement.
const { PeerServer } = require('peer');
PeerServer({ port: 9000, host: '127.0.0.1', path: '/' });
