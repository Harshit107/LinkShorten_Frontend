import React, { useState } from 'react'
import classes from './ShortLinkCustomURL.module.css'
import Input from '../../utils/common/Input'

export default function ShortLinkCustomURL() {
    const availableDomains = ["Trimurl.online", "Harshit107.in"]

    const [domain, setDomain] = useState(availableDomains[0])
    const [shortLink, setShortLink] = useState("")

    const [domainError, setDomainError] = useState(false)
    const [shortLinkError, setShortLinkError] = useState(false)

    const domainClassName = `${classes.domains} ${domainError ? classes.error : ''}`
    const shortLinkClassName = `${classes.shortLink} ${shortLinkError ? classes.error : ''}`
    const containerClassOfShortLink = classes.inputContainerClass

    const handleDomainChange = (e) => {
        const searching = e.target.value;
        const searchedDomain = availableDomains.filter(domain => domain.toLowerCase().includes(searching.toLowerCase()))
        if (searchedDomain.length <= 0) {
            if (!domainError)
                setDomainError(true);
            return;
        }
        setDomain(searching)
        setDomainError(false)
    }

    const handleCustomshortLink = (e) => {
        const shortLinkTyping = e.target.value;
        setShortLink(shortLinkTyping)
        setShortLinkError(false)
    }

    const handleRemovedFocus = () => {
        if (shortLink.length <= 2)
            setShortLinkError(true)
    }

    return (
        <div className={classes.container}>

            <Input id="domain-input" list="domain-list"
                label="Domain"
                value={domain}
                className={domainClassName}
                onChange={handleDomainChange}
                data={containerClassOfShortLink}
            />
            <datalist id='domain-list'>
                {availableDomains.map(domain => <option value={domain} key={domain} />)}
            </datalist>
            <span className={classes.divider}>/</span>
            <Input id="short-link"
                label="Enter a back-half (optional)"
                value={shortLink}
                className={shortLinkClassName}
                data={containerClassOfShortLink}
                onChange={handleCustomshortLink}
                onBlur={handleRemovedFocus}
                placeholder="Example : Favorite-link"
            />

        </div>
    )
}
