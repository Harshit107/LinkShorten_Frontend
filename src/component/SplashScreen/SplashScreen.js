import React from 'react'
import classes from './SplashScreen.module.css'
import { defaultSetting } from '../../config'
import SPLASH_GIF from '../../image/link-gif.gif'
import GROWTH_BG from '../../image/growth.png'
import Button from '../../utils/common/Button'
import { useNavigate } from 'react-router-dom'
export default function SplashScreen() {

    const navigate = useNavigate()
    const handlestarted = () => {
        navigate('/dashboard')
    }
    return (
        <div className={classes.container}>
            <div className={classes.main}>
                <div className={classes.left}>
                    <img src={GROWTH_BG} alt='bg' className={classes.growthImg} />
                    <h1>Create <span className='special'>branded</span><br />and safe short URLs</h1>
                    <p>Empower Your Brand with us.<br />{defaultSetting.name} is your expressway to a custom-branded online presence.
                        Enhance your brand visibility, track performance,
                        and share confidently, the apex of fast and secure URL management</p>
                    <Button name="Get started" className={classes.getstartBtn} action={{ onClick: handlestarted }} />
                </div>
                <div className={classes.right}>
                    <img src={SPLASH_GIF} alt='link' />
                </div>
            </div>

        </div>
    )
}
