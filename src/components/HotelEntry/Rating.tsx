import React, { FC } from 'react'

type RatingProps = {
  rating: number
}

const ratingInText = (rating: number) => {
  if (rating >= 9) {
    return 'Excellent'
  } else if (rating >= 8) {
    return 'Great'
  } else if (rating >= 7) {
    return 'Good'
  } else {
    return 'Okay'
  }
}

const Rating: FC<RatingProps> = ({ rating }) => {
  return (
    <div className="">
      <div className="flex flex-row-reverse items-center">
        <div className=" h-10 w-10 bg-blue-800 rounded flex justify-center items-center text-white font-semibold select-none" >
          {rating}
        </div>
        <div className="mx-2 font-semibold">
          {ratingInText(rating)}
        </div>
      </div>
    </div>
  )
}

export default Rating