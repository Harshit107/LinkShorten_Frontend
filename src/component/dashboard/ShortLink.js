import React, { useCallback, useState } from 'react'
import Input from '../../utils/common/Input'
import classes from './shortLink.module.css'
import ShortLinkCustomURL from './ShortLinkCustomURL'
import PARTY from '../../image/party.png'
import Button from '../../utils/common/Button'
import useInput from '../../hooks/useInput'
import { isValidUrl } from '../../helper/Validate'
import { useServer } from '../../hooks/useServer'
import { CREATE_LINK_API } from '../../config'

export default function ShortLink() {
  const {
    data: longLink, textChangeHandler,
    blurHandler,
    actionError: longLinkActionError,
    error: longLinkError
  } = useInput((data) => isValidUrl(data));

  const {error, handleAPICall}  = useServer();

  const [endUrl, setendUrl] = useState('');

  const handleAddEndURL = useCallback((url) => setendUrl(url),[]);

  const handleCreateLink = async () => {
    if(longLinkError)  return;
    
    const body = {
      originalUrl : longLink,
      shortLink : endUrl
    }
    const data = await handleAPICall(CREATE_LINK_API, "POST", body);
    if(data) {
      console.log(data);
    }

  }


  return (
    <div className={classes.container}>
      <h1>Shorten a long link</h1>

      <Input
        label={"Paste a long URL"}
        id={"longLink"}
        placeholder={"Example : https://super-long-link.com/shorten-it"}
        value={longLink}
        onChange={textChangeHandler}
        className={classes.input+" "+ (longLinkActionError ? 'border-error' : '')}
        onBlur={blurHandler}
      />
      {longLinkActionError && <p className='error'>URL is not valid, Please enter valid URL</p>}

      <ShortLinkCustomURL handleAddEndURL={handleAddEndURL}/>
      <div className={classes.enlight}>
        <img src={PARTY} className={classes.party} alt='' />
        <p >End your link with words that will make it unique</p>
      </div >

      <Button className={classes.create} name="Create Link" action = {{disabled : longLinkError, onClick : handleCreateLink}}></Button>

      <p className={classes.free}>No credit card required. Everything is <span>FREE</span></p>

    </div>
  )
}
