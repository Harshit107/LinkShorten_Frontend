import React, { useState } from 'react'
import classes from './ShortLinkOption.module.css'
import { CiLink } from "react-icons/ci";
import { BsQrCodeScan } from "react-icons/bs";

export default function ShortLinkOption(props) {

    const [activeOption, setActiveOption] = useState(props.default)

    function handleSetActive(data) {
        setActiveOption(data);
        props.handlePanelChange(data);
    }   
    
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={`${classes.options} ${activeOption === "LINK" ? classes.active : ''}`} onClick={handleSetActive.bind(null,"LINK")}>
                    <CiLink />
                    <span className={classes.title}> Short link</span>
                </div>
                <div className={`${classes.options} ${activeOption === "QR" ? classes.active : ''}`} onClick={handleSetActive.bind(null,"QR")}>
                    <BsQrCodeScan />
                    <span className={classes.title}>QR Code</span>
                </div>
            </div>
        </div>
    )
}
