import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import HotelEntry from '../HotelEntry'
import CurrencyPicker from './CurrencyPicker'

const staticUrl = 'https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo'
const currenciesUrlPrefix = 'https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1/'

const getCurrencyStorage = (): string => {
  let defaultCurrency = 'USD'
  if (!(window && window.localStorage)) {
    return defaultCurrency
  }
  let currency = window.localStorage.getItem('currency')
  if (!currency) {
    window.localStorage.setItem('currency', defaultCurrency)
    return defaultCurrency
  }
  return currency
}

const setCurrencyStorage = (currency: string) => {
  if (window && window.localStorage) {
    window.localStorage.setItem('currency', currency)
  }
}

const HotelEntries = () => {
  const currencies = ['USD', 'SGD', 'CNY', 'KRW']

  const [data, setData] = useState<any[]>([])
  const [currency, setCurrency] = useState(getCurrencyStorage())
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(() => {
    setCurrencyStorage(currency)
    setLoading(true)
    axios.all([
      axios.get(staticUrl),
      axios.get(currenciesUrlPrefix + currency)
    ]).then(axios.spread((hotels, pricings) => {
      setData(combineData(hotels.data, pricings.data))
    })).catch(e => {
      //err
    }).finally(() => {
      setLoading(false)
    });
  }, [currency])

  const combineData = (hotels: any[], pricings: any[]) => {
    return hotels.map((hotel) => {
      let priceData = pricings.find(pricing => pricing.id === hotel.id) || {}
      return { ...hotel, ...priceData }
    }).sort((a, b) => {
      if (typeof (a.price) === 'undefined') {
        return 1
      }
      if (typeof (b.price) === 'undefined') {
        return -1
      }
      return 0
    })
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>{
      loading ?
        <div className="rounded-lg p-8 mx-6 flex justify-center items-center h-screen">
          <div className="fa-3x mb-16">
            <i className="fas fa-spinner fa-pulse"></i>
          </div>
        </div>
        :
        <div className="rounded-lg mx-6 flex flex-col">
          <div className="px-6 flex flex justify-between items-center">
            <div className="font-semibold text-xl">
            <i className="fas fa-search"></i> {data.length} hotels found
        </div>
            <CurrencyPicker currency={currency} setCurrency={setCurrency} currencies={currencies} />
          </div>
          <div className="p-6 flex flex-col">
            {
              data.map(
                hotel => {
                  return (
                    <HotelEntry key={hotel.id} {...hotel} currency={currency} />
                  )
                }
              )
            }
          </div>
        </div >
    }
    </>
  )
}

export default HotelEntries