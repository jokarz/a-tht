import React, { FC } from 'react'
import Pricing from './Pricing'
import Rating from './Rating'
import Comparisons from './Comparisons'
import { currencyRounding } from '../../helper/currency'

type HotelEntryProps = {
  name: string,
  id: number,
  photo: string,
  rating: number,
  stars: number,
  price?: number,
  currency: string,
  competitors?: {
    [key: string]: number
  }
  taxes_and_fees?: {
    [key: string]: number
  }
}

type PricingData = {
  company: string,
  price: number
}[]

const HotelEntry: FC<HotelEntryProps> = ({ id, name, photo, rating, stars, taxes_and_fees, price, currency, competitors }) => {
  let starClass = new Array(stars).fill('')
  let pricingData: PricingData = []
  if (price) {
    price = currencyRounding(currency, price)
  }

  if (competitors) {
    pricingData = Object.keys(competitors).map(key => ({ company: key, price: currencyRounding(currency, competitors[key]) }))
    if (price) {
      pricingData.push({ company: 'us', price })
    }
    pricingData = pricingData.sort((a, b) => {
      let diff = a.price - b.price
      if (diff !== 0) {
        return diff
      }
      if (a.company === 'us') {
        return -1
      }
      if (b.company === 'us') {
        return 1
      }

      return a.company.localeCompare(a.company)
    })
  }

  return (<div
    key={id}
    className="flex-col lg:flex-row flex border rounded-lg mb-6 bg-white shadow hover:shadow-lg"
  >
    <img src={photo} alt={name} title={name}
      className="object-cover rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg lg:h-256 lg:w-256 max-h-256" />
    <div className="flex lg:flex-row flex-col justify-between px-4 py-2 w-full">
      <div className="flex flex-col justify-between mr-4">
        <div className="flex flex-col">
          <div className="font-bold text-xl">
            {name}
          </div>
          <div className="text-yellow-500" title={`${stars} stars hotel`}>
            {
              starClass.map((e, i) => <i key={i} className="fas fa-star"></i>)
            }
          </div>
        </div>

        <div className="flex">
          {
            pricingData.length && !(pricingData.length === 1 && pricingData[0]['company'] === 'us') ?
              <Comparisons currency={currency} pricingData={pricingData} /> : null
          }
        </div>
      </div>
      <div className="flex-row lg:flex-col flex justify-between items-center lg:items-end py-2 h-full lg:my-0 my-4">
        <Rating rating={rating} />
        <Pricing {...{ price, currency, taxes_and_fees }} highest_price={pricingData.length ? pricingData[pricingData.length - 1].price : (price || 0)} />
        {
          typeof (price) === 'undefined' ? null :
            <button className="hidden lg:flex appearance-none focus:outline-none px-3 py-2 rounded bg-blue-500 flex justify-center items-center text-white font-bold hover:bg-blue-600 whitespace-no-wrap">
              Book now!
              </button>
        }

      </div>
      {
        typeof (price) === 'undefined' ? null :
          <button className="lg:mb-0 mb-2 lg:hidden w-full appearance-none focus:outline-none px-3 py-2 rounded bg-blue-500 flex justify-center items-center text-white font-bold hover:bg-blue-600 whitespace-no-wrap">
            Book now!
              </button>
      }
    </div>
  </div>
  )
}

export default HotelEntry