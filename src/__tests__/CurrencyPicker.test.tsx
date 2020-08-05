import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CurrencyPicker from '../components/HotelEntries/CurrencyPicker';


it('Renders options', () => {
  let currency = 'USD'
  const { getByText, container } = render(<CurrencyPicker currency={currency} setCurrency={() => { }} currencies={['USD', 'JPY']} />);
  let element = getByText(/^USD\$$/)
  expect(element).toBeInTheDocument();
  element = getByText(/^JPY\$$/)
  expect(element).toBeInTheDocument();
  element = container.getElementsByTagName('select')[0]
  expect(element.childElementCount).toBe(2)
});


it('Updates currency', () => {
  let currency = 'USD'
  let setCurrency = (curr: string) => currency = curr
  const { container } = render(<CurrencyPicker currency={currency} setCurrency={setCurrency} currencies={['USD', 'JPY']} />);
  let element = container.getElementsByTagName('select')[0]
  fireEvent.change(element, { target: { value: 'JPY' } })
  expect(currency).toBe('JPY')
});
