import React from 'react';
import { render } from '@testing-library/react';
import Pricing from '../components/HotelEntry/Pricing';


it('Renders with price', () => {
  const { getByText } = render(<Pricing price={150} currency="USD" highest_price={0} />);
  let element = getByText('$150')
  expect(element).toBeInTheDocument()
  element = getByText('USD')
  expect(element).toBeInTheDocument()
})

it('Renders with no price', () => {
  const { getByText } = render(<Pricing currency="USD" highest_price={0} />);
  let element = getByText('Rates unavailable')
  expect(element).toBeInTheDocument()
})

it('Renders with tax and fees', async () => {
  const { container, getByText } = render(<Pricing price={150} currency="USD" highest_price={0} taxes_and_fees={{ tax: 15, fees: 10 }} />);
  let element = getByText('Tax and fees inclusive')
  expect(element).toBeInTheDocument()
  element = getByText('$150*')
  expect(element).toBeInTheDocument()
  expect(container.querySelector('div[aria-label="Tax at USD$15, Fees at USD$10"]')).toBeInTheDocument()
})

it('Renders with saving price', () => {
  const { container, getByText } = render(<Pricing currency="USD" price={80} highest_price={100} />);
  expect(container.querySelector('.line-through')?.innerHTML).toBe('USD$100')
  let element = getByText('Save 20%')
  expect(element).toBeInTheDocument()
})
