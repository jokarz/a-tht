import React from 'react';
import { render} from '@testing-library/react';
import ComparisonItem from '../components/HotelEntry/ComparisonItem';

it('Renders', () => {
  const { getByText } = render(<ComparisonItem extendedPricings={[]} pricing={{ company: 'test.com', price: 100, currency: 'USD' }} />);
  let element = getByText('USD')
  expect(element).toBeInTheDocument();
  element = getByText('$100')
  expect(element).toBeInTheDocument();
  element = getByText('test.com')
  expect(element).toBeInTheDocument();
})

it('Renders our price', () => {
  const { getByText } = render(<ComparisonItem extendedPricings={[]} pricing={{ company: 'us', price: 150, currency: 'SGD' }} />);
  let element = getByText('SGD')
  expect(element).toBeInTheDocument();
  element = getByText('$150')
  expect(element).toBeInTheDocument();
  element = getByText('Our price')
  expect(element).toBeInTheDocument();
})

it('Renders extended', async() => {
  const { getByText,findByText } = render(<ComparisonItem extendedPricings={[{ company: 'testing.com', price: 150 }]} pricing={{ company: '1 more site', price: 100, currency: 'USD', extended: true }} />);
  let element = await findByText('testing.com')
  expect(element).toBeInTheDocument();
  element = getByText(/USD\$150/i)
  expect(element).toBeInTheDocument();
  element = getByText('1 more site')
  expect(element).toBeInTheDocument();
})

it('Renders our price in extended', async () => {
  const { getByText, findByText } = render(<ComparisonItem extendedPricings={[{ company: 'us', price: 150 }]} pricing={{ company: 'test.com', price: 100, currency: 'USD', extended: true }} />);
  let element = await findByText('Our price')
  expect(element).toBeInTheDocument();
  element = getByText(/USD\$150/i)
  expect(element).toBeInTheDocument();
  element = getByText('test.com')
  expect(element).toBeInTheDocument();
})