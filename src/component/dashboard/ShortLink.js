import React, { useState } from 'react'
import Input from '../../utils/common/Input'
import classes from './shortLink.module.css'
import ShortLinkCustomURL from './ShortLinkCustomURL'
import PARTY from '../../image/party.png'
import Button from '../../utils/common/Button'

export default function ShortLink() {
  const [longLink, setLongLink] = useState("")

  return (
    <div className={classes.container}>
      <h1>Shorten a long link</h1>

      <Input
        label={"Paste a long URL"}
        id={"longLink"}
        placeholder={"Example : https://super-ling-link.com/shorten-it"}
        value={longLink}
        onChange={(e) => setLongLink(e.target.value)}
        className={classes.input}
      />
      <ShortLinkCustomURL />
      <div className={classes.enlight}>
        <img src={PARTY} className={classes.party} alt='' />
        <p >End your link with words that will make it unique</p>
      </div >

      <Button className = {classes.create} name="Create Link"></Button>
      
      <p className={classes.free}>No credit card required. Everything is <span>FREE</span></p>

    </div>
  )
}
