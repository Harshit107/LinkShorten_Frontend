import React, { useState } from "react";
import { defaultSetting } from "../../config";
import DataKeyValue from "../../utils/common/DataKeyValue";
import classes from "./ShortLinkOutput.module.css";
import { formatMongoTimestamp } from "../../helper/Common";
import { RiExternalLinkLine, RiFileCopyLine, RiCheckLine } from "react-icons/ri";
import { HiLink } from "react-icons/hi";

export default function ShortLinkOutput(props) {
  const [copied, setCopied] = useState(false);
  const rawData = props.data;

  if (!rawData) return null;
  const linkObj = rawData?.link || rawData;

  if (!linkObj?.urlId) return null;

  const fullShortUrl = `${defaultSetting.domain}${linkObj.urlId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullShortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  return (
    <div className={`${classes.container} ${props.className ?? ""}`}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
          paddingBottom: "8px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <span style={{ fontWeight: 600, color: "#10b981", fontSize: "0.95rem" }}>
          Short Link Ready!
        </span>
        <button
          onClick={handleCopy}
          type="button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 14px",
            background: copied ? "#10b981" : "#3b82f6",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "0.85rem",
            transition: "all 0.2s ease",
          }}
        >
          {copied ? <RiCheckLine size={16} /> : <RiFileCopyLine size={16} />}
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>

      <DataKeyValue
        title="Original URL"
        value={
          <a href={linkObj.originalUrl} target="_blank" rel="noopener noreferrer">
            {linkObj.originalUrl}
          </a>
        }
        valueIcon={<HiLink />}
      />

      <DataKeyValue
        title="Short URL"
        value={
          <a href={fullShortUrl} target="_blank" rel="noopener noreferrer">
            {fullShortUrl}
          </a>
        }
        valueIcon={<RiExternalLinkLine />}
      />

      {linkObj.createdAt && (
        <DataKeyValue
          title="Created On"
          value={formatMongoTimestamp(linkObj.createdAt)}
        />
      )}
      {linkObj.updatedAt && (
        <DataKeyValue
          title="Last Update"
          value={formatMongoTimestamp(linkObj.updatedAt)}
        />
      )}
    </div>
  );
}
