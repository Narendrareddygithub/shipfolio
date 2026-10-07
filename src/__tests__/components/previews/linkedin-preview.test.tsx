import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LinkedInPreview } from '@/components/previews/linkedin-preview';

describe('LinkedIn Preview Component', () => {
  it('renders LinkedIn layout with user name and post text', () => {
    render(
      <LinkedInPreview
        content="I built a task manager using Next.js 15."
        userName="Narendra Reddy"
        mediaUrls={[]}
      />
    );

    expect(screen.getByText('Narendra Reddy')).toBeInTheDocument();
    expect(screen.getByText(/I built a task manager/i)).toBeInTheDocument();
  });
});
