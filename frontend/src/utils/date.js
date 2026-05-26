export function formatDate(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  
  // reset time to midnight to calculate days correctly
  const dateMid = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const nowMid = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const diffTime = Math.abs(nowMid - dateMid);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
}
