import classes from './DashboardHeading.module.css';

export default function DashboardHeading() {
    return (
        <div className={classes.heading}>
            <div className={classes.content}>
                <h1>Make every <span className='special'>connection</span> count</h1>
                <p className='size-20'> Create short links and customized QR Codes. Share them anywhere.
                    Track what's working, and what's not. All inside the <span className='special bold'>TrimURL Connections Platform</span> </p>
            </div>
        </div>
    )
}
