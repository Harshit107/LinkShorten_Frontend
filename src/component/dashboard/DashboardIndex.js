import  { useState } from 'react'
import classes from './DashboardIndex.module.css';
import DashboardHeading from './DashboardHeading';
import ShortLink from './ShortLink';
import Footer from '../footer/Footer';
import ShortLinkOption from './ShortLinkOption';
import QRCode from './QRCode';
import { useCallback } from 'react';


export default function DashboardIndex() {

   const [selectedOption, setSelectedOption] = useState("LINK")

  const handlePanelChange = useCallback((data)=> {
    setSelectedOption(data)
  },[])

  return (
    <div className={classes['main-container']}>
      <DashboardHeading />
      <ShortLinkOption handlePanelChange={handlePanelChange}/>
      {selectedOption === 'LINK' && <ShortLink />}
      {selectedOption === 'QR' &&<QRCode />}           
      <Footer />
    </div>
  )
}
