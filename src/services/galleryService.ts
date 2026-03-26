// =============================================================================
// Gallery Service — Aggregated photo like tracking for admin dashboard
// =============================================================================

// Storage key for aggregated like counts
const LIKES_STORAGE_KEY = 'gallery-likes-aggregate';

export interface PhotoLikeStats {
  photoId: number;
  likeCount: number;
  lastUpdated: string;
}

export interface GalleryStats {
  totalLikes: number;
  photoStats: Record<number, PhotoLikeStats>;
  lastUpdated: string;
}

/**
 * Get aggregated gallery statistics
 */
export function getGalleryStats(): GalleryStats {
  try {
    const stored = localStorage.getItem(LIKES_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // localStorage not available or corrupted
  }

  return {
    totalLikes: 0,
    photoStats: {},
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Increment like count for a photo
 */
export function incrementPhotoLike(photoId: number): void {
  const stats = getGalleryStats();

  if (!stats.photoStats[photoId]) {
    stats.photoStats[photoId] = {
      photoId,
      likeCount: 0,
      lastUpdated: new Date().toISOString(),
    };
  }

  stats.photoStats[photoId].likeCount++;
  stats.photoStats[photoId].lastUpdated = new Date().toISOString();
  stats.totalLikes++;
  stats.lastUpdated = new Date().toISOString();

  saveGalleryStats(stats);
}

/**
 * Decrement like count for a photo (when user unlikes)
 */
export function decrementPhotoLike(photoId: number): void {
  const stats = getGalleryStats();

  if (stats.photoStats[photoId] && stats.photoStats[photoId].likeCount > 0) {
    stats.photoStats[photoId].likeCount--;
    stats.photoStats[photoId].lastUpdated = new Date().toISOString();
    stats.totalLikes = Math.max(0, stats.totalLikes - 1);
    stats.lastUpdated = new Date().toISOString();

    saveGalleryStats(stats);
  }
}

/**
 * Save gallery stats to localStorage
 */
function saveGalleryStats(stats: GalleryStats): void {
  try {
    localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // localStorage not available
  }
}

/**
 * Get like count for a specific photo
 */
export function getPhotoLikeCount(photoId: number): number {
  const stats = getGalleryStats();
  return stats.photoStats[photoId]?.likeCount || 0;
}

/**
 * Get top liked photos (for admin dashboard)
 */
export function getTopLikedPhotos(limit: number = 10): PhotoLikeStats[] {
  const stats = getGalleryStats();

  return Object.values(stats.photoStats)
    .filter(photo => photo.likeCount > 0)
    .sort((a, b) => b.likeCount - a.likeCount)
    .slice(0, limit);
}

/**
 * Get all photos with like counts (for admin gallery)
 */
export function getAllPhotoLikeCounts(): Record<number, number> {
  const stats = getGalleryStats();
  const counts: Record<number, number> = {};

  for (const [id, photoStat] of Object.entries(stats.photoStats)) {
    counts[Number(id)] = photoStat.likeCount;
  }

  return counts;
}

/**
 * Reset all gallery stats (admin function)
 */
export function resetGalleryStats(): void {
  try {
    localStorage.removeItem(LIKES_STORAGE_KEY);
  } catch {
    // localStorage not available
  }
}
