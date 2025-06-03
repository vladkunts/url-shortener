import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../config';

type ShortUrl = {
  alias: string;
  originalUrl: string;
  clickCount: number;
  expiresAt: string | null;
};

function List() {
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiUrl}/short-urls`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setUrls(data);
        } else {
          setError('Unexpected response from server');
        }
      })
      .catch(err => setError(err.message));
  }, []);

  const handleDelete = async (alias: string) => {
    if (!window.confirm('Delete this short URL?')) return;
    try {
      const res = await fetch(`${apiUrl}/delete/${alias}`, { method: 'DELETE' });
      if (res.ok) {
        setUrls(urls => urls.filter(url => url.alias !== alias));
      } else {
        setError('Failed to delete');
      }
    } catch {
      setError('Network error');
    }
  };

  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="main-content-container">
      <h2>All Short URLs</h2>
      <ul>
        {urls.map(url => (
          <li key={url.alias}>
            <Link to={`/details/${url.alias}`}>{url.alias}</Link> — {url.originalUrl} ({url.clickCount} clicks)
            <button style={{ marginLeft: 8 }} onClick={() => handleDelete(url.alias)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;