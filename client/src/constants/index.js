export function getTimeElapsed(createdAt) {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInSeconds = Math.floor((now - createdDate) / 1000);

  let interval = Math.floor(diffInSeconds / 31536000);

  if (interval > 1) {
    return `${interval} years ago`;
  }
  interval = Math.floor(diffInSeconds / 2592000);
  if (interval > 1) {
    return `${interval} months ago`;
  }
  interval = Math.floor(diffInSeconds / 86400);
  if (interval > 1) {
    return `${interval} days ago`;
  }
  interval = Math.floor(diffInSeconds / 3600);
  if (interval > 1) {
    return `${interval} hours ago`;
  }
  interval = Math.floor(diffInSeconds / 60);
  if (interval > 1) {
    return `${interval} minutes ago`;
  }
  return `${Math.floor(diffInSeconds)} seconds ago`;
}
