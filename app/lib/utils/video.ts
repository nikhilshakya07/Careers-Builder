/**
 * Converts YouTube watch URLs to embed URLs
 * Also handles YouTube short URLs and Vimeo URLs
 */
export function convertToEmbedUrl(url: string): string {
  if (!url) return '';

  // YouTube watch URL: https://www.youtube.com/watch?v=VIDEO_ID
  const youtubeWatchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  if (youtubeWatchMatch) {
    return `https://www.youtube.com/embed/${youtubeWatchMatch[1]}`;
  }

  // YouTube embed URL (already correct)
  if (url.includes('youtube.com/embed/')) {
    return url;
  }

  // Vimeo URL: https://vimeo.com/VIDEO_ID
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  // Vimeo embed URL (already correct)
  if (url.includes('player.vimeo.com')) {
    return url;
  }

  // If it's already an embed URL or unknown format, return as-is
  return url;
}

