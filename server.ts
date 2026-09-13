import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Snapchat OAuth endpoints
  app.get('/api/snapchat/auth/url', (req, res) => {
    const redirectUri = `${req.protocol}://${req.get('host')}/auth/callback`;
    
    // Construct Snapchat Auth URL (mocked to point to our own callback if missing real credentials, 
    // but formatted as a real OAuth URL to satisfy the flow)
    const clientId = process.env.SNAPCHAT_CLIENT_ID || 'mock-client-id';
    
    // In a real scenario, this goes to Snapchat. Here we will simulate the OAuth redirect for the preview.
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'snapchat-profile snapchat-stories',
    });

    const providerAuthUrl = 'https://accounts.snapchat.com/accounts/oauth2/auth';
    const authUrl = `${providerAuthUrl}?${params}`;

    res.json({ url: authUrl });
  });

  // Callback handler for OAuth
  app.get(['/auth/callback', '/auth/callback/'], async (req, res) => {
    // We send a success message back to the parent window
    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', provider: 'snapchat' }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Authentication successful. This window should close automatically.</p>
        </body>
      </html>
    `);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
