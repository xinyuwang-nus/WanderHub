import React from 'react'
import { Button } from '../../components/ui/button'
import { CiShare2 } from "react-icons/ci";

function InfoTag({tripData}) {
  return (
    <div>
        <img src='/placeholder-image.jpeg' className='w-full h-[300px] object-cover rounded-xl' />
        <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='text-4xl font-medium'> {tripData?.selection?.destination?.label} </h2>
                <div className='hidden sm:flex gap-5 mt-2 font-light'>
                    <h2 className='p-1 px-3 bg-gray-100 rounded-full text-gray-500'> {tripData?.selection?.duration} Days </h2>
                    <h2 className='p-1 px-3 bg-gray-100 rounded-full text-gray-500'> {tripData?.selection?.traveler} </h2>
                    <h2 className='p-1 px-3 bg-gray-100 rounded-full text-gray-500'> Hotel: {tripData?.selection?.budget}</h2>
                    <h2 className='p-1 px-3 bg-gray-100 rounded-full text-gray-500'> {tripData?.selection?.activities}</h2>
                </div>
            </div>
            <Button variant="ghost"> <CiShare2 /> </Button>
        </div>
    </div>
  )
}

export default InfoTag