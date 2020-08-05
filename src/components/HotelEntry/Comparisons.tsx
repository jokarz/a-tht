import React, { FC } from 'react'
import ComparisonItem from './ComparisonItem';

export type pricingInfo = {
  company: string,
  price: number,
}

export type AllPricingsProps = {
  pricingData: pricingInfo[]
  currency: string
}

export type extendedPricingInfo = pricingInfo & { extended?: boolean }

const Comparisons: FC<AllPricingsProps> = ({ pricingData, currency }) => {
  let priceGroup: extendedPricingInfo[] = []
  let extendedPriceGroup: pricingInfo[] = []
  let totalSites = pricingData.length
  let isExtended = false
  for (let i = 0; i < totalSites; i++) {
    let pricing = pricingData[i]
    if (i > 2 && totalSites !== 4) {
      if (!isExtended) {
        priceGroup.push({ company: `${totalSites - i} more sites`, price: 0, extended: true })
        isExtended = true
      }
      extendedPriceGroup.push(pricing)
    } else {
      priceGroup.push(pricing)
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="mt-4 mb-2 font-semibold">Price comparisons:</div>
      <div className="flex flex-wrap w-full lg:w-auto justify-start">
        {priceGroup.map(pricing => {
          return (
            <ComparisonItem key={pricing.company} pricing={{ ...pricing, currency }} extendedPricings={extendedPriceGroup} />
          )
        })}
      </div>
    </div>
  )
}

export default Comparisons