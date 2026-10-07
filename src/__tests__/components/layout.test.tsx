import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Navbar } from '@/components/layout/navbar';

describe('Navbar Component', () => {
  it('renders logo title ShipFolio', () => {
    render(<Navbar />);
    expect(screen.getByText('ShipFolio')).toBeInTheDocument();
  });

  it('renders nav links', () => {
    render(<Navbar />);
    expect(screen.getByText('Start a Project')).toBeInTheDocument();
  });
});
