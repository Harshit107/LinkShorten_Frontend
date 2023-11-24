import { useState } from 'react'
import classes from './DashboardIndex.module.css';
import DashboardHeading from './DashboardHeading';
import ShortLink from './ShortLink';
import Footer from '../footer/Footer';
import ShortLinkOption from './ShortLinkOption';
import QRCode from './QRCode';
import { useCallback } from 'react';
import { AVAILABLE_MODE, getMode } from '../../helper/ParamsHelper';
import { useSearchParams } from 'react-router-dom';


export default function DashboardIndex() {

  let mode = AVAILABLE_MODE.includes(getMode()) || 'LINK';

  const [selectedOption, setSelectedOption] = useState(mode)
  const setSearchParams = useSearchParams()[1]

  const handlePanelChange = useCallback((data) => {
    setSelectedOption(data)
    setSearchParams({ mode: data });
  }, [setSearchParams])

  return (
    <div className={classes['main-container']}>
      <DashboardHeading />
      <ShortLinkOption handlePanelChange={handlePanelChange} default={selectedOption} />
      {selectedOption === "LINK" && <ShortLink />}
      {selectedOption === "QR" && <QRCode />}
      <Footer />
    </div>
  )
}
