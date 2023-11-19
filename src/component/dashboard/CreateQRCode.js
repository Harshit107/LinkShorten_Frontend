import React from 'react'
import { QRCode } from 'react-qrcode-logo';
import './CreateQRCode.css'
import LOGO_IMAGE from '../../image/image.png'


export default function CreateQRCode(props) {
    return (
        <div className={`qrcode-container ${props.className || ''}`}>
            <QRCode
                content='https://trimurl.online'
                logoImage={LOGO_IMAGE}
                removeQrCodeBehindLogo = {true}
                logoPadding = {3}
                eyeRadius = {20}
                qrStyle = 'dots'
                
            />
        </div>
    )
}
