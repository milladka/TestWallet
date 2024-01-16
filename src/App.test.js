import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/test/i);
  const linkElement2 = screen.getByText(/maryam/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
});