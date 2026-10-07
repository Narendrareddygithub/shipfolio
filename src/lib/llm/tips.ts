export interface VisibilityTip {
  platform: 'linkedin' | 'twitter' | 'reddit' | 'medium';
  emoji: string;
  title: string;
  advice: string;
}

export function getVisibilityTips(
  platform: 'linkedin' | 'twitter' | 'reddit' | 'medium',
  hasMedia: boolean = false
): VisibilityTip[] {
  switch (platform) {
    case 'linkedin':
      return [
        {
          platform: 'linkedin',
          emoji: '📸',
          title: 'Add a Dashboard or UI Screenshot',
          advice: 'Posts with a visual proof screenshot get 2x more organic reach on LinkedIn.',
        },
        {
          platform: 'linkedin',
          emoji: '💬',
          title: 'First-Comment Engagement Trick',
          advice: 'Put external GitHub links in the first comment rather than the main post text to avoid reach penalty.',
        },
        {
          platform: 'linkedin',
          emoji: '⏰',
          title: 'Optimal Posting Window',
          advice: 'Post between 8 AM – 10 AM on Tuesday or Wednesday for highest developer visibility.',
        },
      ];

    case 'twitter':
      return [
        {
          platform: 'twitter',
          emoji: '🎬',
          title: 'Record a 15-Second Screen GIF',
          advice: 'GIFs and short videos auto-play in the X timeline, driving 3x higher click-through rates.',
        },
        {
          platform: 'twitter',
          emoji: '📌',
          title: 'Pin Your Thread',
          advice: 'Pin this post to your profile for 48 hours so new profile visitors see your latest proof of work.',
        },
      ];

    case 'reddit':
      return [
        {
          platform: 'reddit',
          emoji: '🎯',
          title: 'Target r/sideproject & r/webdev',
          advice: 'Post during US morning hours (8 AM EST) when developer subreddits are most active.',
        },
        {
          platform: 'reddit',
          emoji: '🤝',
          title: 'Engage in Comments',
          advice: 'Reply to the first 5 comments within 30 minutes to boost post rank on hot feeds.',
        },
      ];

    case 'medium':
      return [
        {
          platform: 'medium',
          emoji: '🏷️',
          title: 'Tag Popular Medium Topics',
          advice: 'Add tags: #WebDevelopment #Programming #JavaScript #SoftwareEngineering.',
        },
      ];

    default:
      return [];
  }
}
