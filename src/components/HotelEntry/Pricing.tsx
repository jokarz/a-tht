import React, { FC } from 'react'
import { currencyRounding, currencyFormat } from '../../helper/currency'

type PricingProps = {
  price?: number,
  highest_price: number,
  currency: string,
  taxes_and_fees?: {
    [key: string]: number
  }
}

const Pricing: FC<PricingProps> = ({ price, currency, taxes_and_fees, highest_price }) => {
  let popUp = {}
  if (taxes_and_fees) {
    let msg = Object.keys(taxes_and_fees).map(key => {
      let entry = key.replace(/_/g, ' ')
      entry = entry[0].toUpperCase() + entry.substring(1)
      let cost = currencyRounding(currency, taxes_and_fees[key])
      return (`${entry} at ${currency}$${cost}`)
    }).join(", ")
    popUp = {
      'aria-label': msg,
      'data-balloon-pos': "left"
    }
  }
  return (

    <div className="mb-0 lg:mb-4 ">
      {
        price ?
          <div>
            {
              highest_price - price > 0 ?

                <div className="text-sm text-right leading-tight line-through text-red-500">
                  {currency}${currencyFormat(highest_price, 0)}{taxes_and_fees ? '*' : ''}
                </div> : null
            }
            <div {...popUp} className="text-sm text-right leading-tight">{currency}
              <span className="text-3xl">${currencyFormat(price, 0)}{
                taxes_and_fees ? '*' : ''
              }</span>
            </div>
            {
              taxes_and_fees ?
                <div className="text-xs text-right leading-tight mb-1">Tax and fees inclusive
                </div> : null
            }

            {
              highest_price - price > 0 ?
                <div className="text-right text-green-600 font-bold text-lg leading-tight">
                  Save {Math.ceil((highest_price - price) / highest_price * 100)}%
                </div> : null
            }

          </div> :
          <span className="text-red-600 font-semibold text-lg">Rates unavailable</span>
      }
    </div>


  )
}

export default Pricing