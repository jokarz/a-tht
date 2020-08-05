import React, { FC, useState, useEffect } from 'react'
import { extendedPricingInfo, pricingInfo } from './Comparisons'
import { currencyFormat } from '../../helper/currency'
import { usePopper } from 'react-popper';

type ComparisonItemProps = {
  pricing: extendedPricingInfo & { currency: string },
  extendedPricings: pricingInfo[]
}

const useOnClickOutside = (ref: any, handler: Function) => {
  useEffect(
    () => {
      const listener = (event: { target: any; }) => {
        if (!ref || ref.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    [ref, handler]
  );
}


const ComparisonItem: FC<ComparisonItemProps> = ({ pricing, extendedPricings }) => {
  const [referenceElement, setReferenceElement] = useState<null | any>(null);
  const [popperElement, setPopperElement] = useState<null | any>(null);
  const [isClicked, setIsClicked] = useState(false)
  useOnClickOutside(popperElement, () => setIsClicked(false))
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom'
  });
  const { company, price, extended, currency } = pricing
  const isUs = company === 'us'
  return (
    <div className="relative">
      <div
        onClick={() => {
          if (extended) {
            setIsClicked(true)
          }
        }}
        style={{ minHeight:'60px', maxWidth: '120px' }}
        className={`comparison-item text-center rounded leading-tight p-2 border hover:shadow cursor-default select-none ${extended ? 'hover:bg-gray-200 cursor-pointer' : 'mr-2 mb-2'} ${isClicked ? 'bg-gray-200' : ''}`}>
        {
          extended ?
            <div
              className={`font-semibold flex items-center h-full `} ref={setReferenceElement}>
              {company} <i className="ml-2 fas fa-caret-down"></i>
            </div>
            : <div>
              <div className="block truncate">
                <span className="text-xxs currency">{currency}</span>
                <span className={`text-lg price`}>${currencyFormat(price, 0)}</span>
              </div>
              {
                isUs ?
                  <div className="text-sm font-bold text-green-600 company">Our price</div> :
                  <div className="text-sm truncate block font-medium company">{company}</div>
              }
            </div>
        }
      </div>

      {
        extended && extendedPricings.length ?
          <>
            <div className={`right-0 absolute select-none shadow-lg ${isClicked ? 'opacity-100' : 'opacity-0'} bg-white border rounded-lg `} ref={setPopperElement} style={styles.popper} {...attributes.popper}>
              {extendedPricings.map((info, index) => {
                const { company, price } = info
                return (
                  <div
                    key={company}
                    className={`block p-2 ${extendedPricings.length - 1 === index ? '' : 'border-b'}`}>
                    <div className="truncate">{currency}${price} -{' '}
                      {
                        company === 'us' ?
                          <span className="text-sm font-bold text-green-600">Our price</span> :
                          <span className="text-sm font-medium">{company}</span>
                      }
                    </div>
                  </div>
                )
              })}
            </div></> : null
      }
    </div >
  )
}

export default ComparisonItem