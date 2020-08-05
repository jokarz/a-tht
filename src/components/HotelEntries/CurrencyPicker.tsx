import React, { FC } from 'react'

type CurrencyPickerProps = {
  currency: string,
  setCurrency: Function,
  currencies: string[]
}

const CurrencyPicker: FC<CurrencyPickerProps> = ({ currency, setCurrency, currencies }) => {
  return (
    <div className="relative border rounded hover:shadow-lg">
      <select
        value={currency}
        onChange={e => setCurrency(e.target.value)}
        className="block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none bg-white font-semibold">
        {
          currencies.map(curr => {
            return (
              <option key={curr} value={curr}>
                {curr}$
              </option>
            )
          })
        }
      </select>
      <div className="absolute flex inset-y-0 items-center px-2 right-0 text-gray-700 bg-gray-300 rounded-r pointer-events-none">
        <i className="fas fa-caret-down"></i>
      </div>

    </div>
  )
}

export default CurrencyPicker