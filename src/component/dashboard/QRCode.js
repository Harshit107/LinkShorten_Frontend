import React, { useEffect, useState } from 'react'
import Input from '../../utils/common/Input'
import Button from '../../utils/common/Button'
import CreateQRCode from './CreateQRCode'
import linkClasses from './shortLink.module.css'
import classes from './QRCode.module.css'
import { isValidUrl } from '../../helper/Validate'
import { useServer } from '../../hooks/useServer'
import { CREATE_LINK_API } from '../../config'

export default function QRCode() {

    const { error, handleAPICall, reset } = useServer();
    const [longLink, setLongLink] = useState("")
    const [blur, setBlur] = useState("blur");
    const [content, setContent] = useState("https://trimurl.online");

   

    function handleErrorFromServer(error) {

    }
    useEffect(() => { 
        handleErrorFromServer(error)
    }, [error])

    async function handleCreateQR() {
        if (isValidUrl(longLink)) {
            const body = { originalUrl: longLink }
            reset();
            const data = await handleAPICall(CREATE_LINK_API, "POST", body)
            if (!data) return;            
            setContent(data.urlId)
            setBlur('');
        }
        else
            setBlur('blur')
    }

    return (
        <div className={linkClasses.container}>
            <h1>Create a QR Code</h1>
            <Input
                label={"Enter your QR Code destination"}
                id={"qrcode"}
                placeholder={"Example : https://super-long-link.com"}
                value={longLink}
                onChange={(e) => setLongLink(e.target.value)}
                className={linkClasses.input}
            />
            <div className={classes.QRsection}>
                <div className={classes.description}>
                    <h4 className={classes.heading}>QR Codes are everywhere</h4>
                    <p className={classes.title}>Connect your real-world audience to your online content.</p>
                    <p>Once you've generated your QR code, you have the flexibility to personalize it further.
                        Take full control of the visual representation of your QR code to make it uniquely yours!</p>
                </div>
                <CreateQRCode className={blur} content={content} />
            </div>

            <Button className={linkClasses.create} name="Create Qr Code" action={{ onClick: handleCreateQR }}></Button>

            <p className={linkClasses.free}>No credit card required. Everything is <span>FREE</span></p>

        </div>
    )
}
