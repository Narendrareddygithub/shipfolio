import { describe, it, expect, vi } from 'vitest';
import { getOptimizedUrl } from '@/lib/cloudinary/client';

describe('Cloudinary Utility Helper', () => {
  it('should generate platform-specific transformed image URLs', () => {
    const publicId = 'shipfolio/screenshot123';
    
    const linkedinUrl = getOptimizedUrl(publicId, 'linkedin');
    expect(linkedinUrl).toContain('w_1200');
    expect(linkedinUrl).toContain('h_627');

    const twitterUrl = getOptimizedUrl(publicId, 'twitter');
    expect(twitterUrl).toContain('w_1200');
    expect(twitterUrl).toContain('h_675');

    const redditUrl = getOptimizedUrl(publicId, 'reddit');
    expect(redditUrl).toContain('w_800');
  });
});
