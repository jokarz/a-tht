import React from 'react';
import { render } from '@testing-library/react';
import Comparisons from '../components/HotelEntry/Comparisons';


it('Renders', () => {
  const { container } = render(<Comparisons pricingData={[{ company: 'test.com', price: 100 }, { company: 'test2.com', price: 150 }]} currency="USD" />);
  expect(container.querySelectorAll('.comparison-item').length).toBe(2)
})

it('Renders beyond 4', async () => {
  const { getByText, findByText, container } = render(<Comparisons pricingData={[{ company: 'test.com', price: 100 }, { company: 'test2.com', price: 150 }, { company: 'test3.com', price: 250 }, { company: 'test4.com', price: 350 }, { company: 'test5.com', price: 450 }]} currency="USD" />);
  await findByText('test.com')
  let element = getByText('2 more sites')
  expect(element).toBeInTheDocument()
  expect(container.querySelectorAll('.comparison-item').length).toBe(4)

})
