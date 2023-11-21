import React from 'react'
import { QRCode } from 'react-qrcode-logo';
import './CreateQRCode.css'
import LOGO_IMAGE from '../../image/image.png'
import { defaultSetting } from '../../config';


export default function CreateQRCode(props) {
    const urlToSet = defaultSetting.domain + props.content;
    return (
        <div className={`qrcode-container ${props.className || ''}`}>
            
            <QRCode
                value={urlToSet || 'https://trimurl.online'}
                logoImage={LOGO_IMAGE}
                removeQrCodeBehindLogo = {true}
                logoPadding = {3}
                eyeRadius = {20}
                qrStyle = 'dots'
                
            />
        </div>
    )
}
