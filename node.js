// proxy-server.js
const express = require('express');
const fetch = require('node-fetch');
require('global-agent/bootstrap'); // For global proxy support

const app = express();
const port = 3000;

// Pick a proxy from the list
process.env.GLOBAL_AGENT_HTTP_PROXY = 'http://45.167.124.15:9991';

app.get('/proxy', async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send('No URL provided.');

  try {
    const response = await fetch(target);
    const data = await response.text();
    res.send(data);
  } catch (err) {
    res.status(500).send('Proxy fetch failed.');
  }
});

app.listen(port, () => console.log(`Proxy running at http://localhost:${port}`));
