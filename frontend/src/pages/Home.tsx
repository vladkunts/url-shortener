import { useState } from 'react';
import { apiUrl } from '../config';

function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(`${apiUrl}/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalUrl,
          alias: alias || undefined,
          expiresAt: expiresAt || undefined,
        }),
      });
      if (res.ok) {
        setMessage('Short URL created!');
      } else {
        setMessage('Error creating short URL');
      }
    } catch {
      setMessage('Network error');
    }
  };

  return (
    <div className="main-content-container">
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Original URL"
          value={originalUrl}
          onChange={e => setOriginalUrl(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Alias (optional)"
          value={alias}
          onChange={e => setAlias(e.target.value)}
          maxLength={20}
        />
        <input
          type="datetime-local"
          placeholder="Expires At (optional)"
          value={expiresAt}
          onChange={e => setExpiresAt(e.target.value)}
        />
        <button type="submit">Create</button>
        {message && <div>{message}</div>}
      </form>
    </div>
  );
}

export default Home;