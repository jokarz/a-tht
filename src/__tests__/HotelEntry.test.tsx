import React from 'react';
import { render } from '@testing-library/react';
import HotelEntry from '../components/HotelEntry';

let data = {
  "id": 1,
  "name": "Shinagawa Prince Hotel",
  "photo": "https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg",
  "rating": 7.7,
  "stars": 4,
  "taxes_and_fees": {
    "tax": 13.12,
    "hotel_fees": 16.4
  },
  "price": 164,
  "currency": "SGD",
  "competitors": {
    "Traveloka": 190,
    "Expedia": 163
  }
}

it('Renders correctly', async () => {
  const { container, getByText, findByText } = render(<HotelEntry {...data} />);
  await findByText('Shinagawa Prince Hotel') //name
  expect(container.querySelectorAll('.fa-star').length).toBe(4) //stars
  let element = getByText('7.7') 
  expect(element).toBeInTheDocument() //rating
  element = getByText('Tax and fees inclusive') 
  expect(element).toBeInTheDocument() //tax and fees
  expect(container.querySelector('div[aria-label="Tax at SGD$13, Hotel fees at SGD$16"]')).toBeInTheDocument() //tax and fees
  element = getByText('$164*')
  expect(element).toBeInTheDocument() //pricing
  element = getByText('Save 14%')
  expect(element).toBeInTheDocument() //pricing
  expect(container.querySelectorAll('.comparison-item').length).toBe(3) //comparison
  let elements = container.querySelectorAll('.comparison-item')

  //sorted comparisons
  expect(elements[0].querySelector('.price')?.innerHTML).toBe('$163')
  expect(elements[0].querySelector('.company')?.innerHTML).toBe('Expedia')

  expect(elements[1].querySelector('.price')?.innerHTML).toBe('$164')
  expect(elements[1].querySelector('.company')?.innerHTML).toBe('Our price')

  expect(elements[2].querySelector('.price')?.innerHTML).toBe('$190')
  expect(elements[2].querySelector('.company')?.innerHTML).toBe('Traveloka')
})

