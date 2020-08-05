import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';

import HotelEntries from '../components/HotelEntries/index';

import HotelsData from './data/hotels.json'
import CNYPricingData from './data/cny.json'
import SGDPricingData from './data/sgd.json'

it('Renders', async () => {
  axios.get = jest.fn().mockResolvedValueOnce({ data: HotelsData }).mockResolvedValueOnce({ data: CNYPricingData })
  const { getByText, findByText } = render(<HotelEntries />);
  await findByText('Shinagawa Prince Hotel')
  let element = getByText('6 hotels found')
  expect(element).toBeInTheDocument()
})


it('Renders rates unavailable', async () => {
  axios.get = jest.fn().mockResolvedValueOnce({ data: HotelsData }).mockResolvedValueOnce({ data: SGDPricingData })
  const { getAllByText, findByText } = render(<HotelEntries />);
  await findByText('Shinagawa Prince Hotel')
  let elements = getAllByText('Rates unavailable')
  expect(elements.length).toBe(2)
})