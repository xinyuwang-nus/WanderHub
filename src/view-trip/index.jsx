import React from 'react'
import Accommodation from './components/Accommodation';
import InfoTag from './components/InfoTag';
import Plan from './components/Plan';

function ViewTrip() {

  return (
    <div className="sm:px-20 md:px-30 lg:px-60 xl:px-80 px-10 my-10">

        {/* <InfoSection trip={trip} /> */}
        <InfoTag />
        <Accommodation />
        <Plan />
    </div>
  )
}

export default ViewTrip