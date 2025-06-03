import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiUrl } from '../config';

type ShortUrl = {
  alias: string;
  originalUrl: string;
  clickCount: number;
  expiresAt?: string | null;
  createdAt: string;
};

function Details() {
  const { alias } = useParams();
  const [url, setUrl] = useState<ShortUrl | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiUrl}/info/${alias}`)
      .then(res => res.json())
      .then(setUrl)
      .catch(err => setError(err.message));
  }, [alias]);

  if (error) return <div className="main-content-container" style={{ color: 'red' }}>{error}</div>;
  if (!url) return <div className="main-content-container">Loading...</div>;

  const shortUrl = `${apiUrl}/${url.alias}`;
  return (
    <div className="main-content-container">
      <h2>Short URL Details</h2>
      <div>Alias: {url.alias}</div>
      <div>Original URL: {url.originalUrl}</div>
      <div>Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></div>
      <div>Created: {new Date(url.createdAt).toLocaleString()}</div>
      <div>Expires: {url.expiresAt ? new Date(url.expiresAt).toLocaleString() : 'Never'}</div>
      <div>Clicks: {url.clickCount}</div>
    </div>
  );
}

export default Details;