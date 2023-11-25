import { defaultSetting } from '../../config';
import DataKeyValue from '../../utils/common/DataKeyValue'
import classes from './ShortLinkOutput.module.css';
import { formatMongoTimestamp } from '../../helper/Common'
import { RiExternalLinkLine } from "react-icons/ri";
import { HiLink } from "react-icons/hi";

export default function ShortLinkOutput(props) {
  let data = props.data;
  if (!data) return <></>;
  return (
    <div className={`${classes.container} ${props.className ?? ''}`}>
      <DataKeyValue title="Original URL" value={<a href={data.originalUrl} >{data.originalUrl}</a>} valueIcon={<HiLink />} />
      <DataKeyValue title="Short URL" value={<a href={defaultSetting.domain + data.urlId} >
        {defaultSetting.domain + data.urlId}</a>} valueIcon={<RiExternalLinkLine />} />
      <DataKeyValue title="Created  On" value={formatMongoTimestamp(data.createdAt)} />
      <DataKeyValue title="Last Update" value={formatMongoTimestamp(data.updatedAt)} />
    </div>
  )
}
