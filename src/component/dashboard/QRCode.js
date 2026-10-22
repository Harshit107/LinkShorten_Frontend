import React, { useState } from "react";
import Input from "../../utils/common/Input";
import Button from "../../utils/common/Button";
import CreateQRCode from "./CreateQRCode";
import linkClasses from "./shortLink.module.css";
import classes from "./QRCode.module.css";
import { isValidUrl } from "../../helper/Validate";
import { useServer } from "../../hooks/useServer";
import { CREATE_LINK_API } from "../../config";
import ShortLinkOutput from "./ShortLinkOutput";

export default function QRCode(props) {
  const { error, handleAPICall, reset, data, isLoading } = useServer();
  const [longLink, setLongLink] = useState("");
  const [blur, setBlur] = useState("blur");
  const [content, setContent] = useState("");

  async function handleCreateQR() {
    if (!longLink || !isValidUrl(longLink)) {
      setBlur("blur");
      return;
    }

    const body = { originalUrl: longLink.trim() };
    reset();
    const result = await handleAPICall(CREATE_LINK_API, "POST", body);

    if (result) {
      const linkObj = result.data || result.link || result;
      const shortId = linkObj.urlId || "";
      setContent(shortId);
      setBlur("");
      if (typeof props.onLinkCreated === "function") {
        props.onLinkCreated(linkObj);
      }
    } else {
      setBlur("blur");
    }
  }

  return (
    <div className={linkClasses.container}>
      <h1>Create a QR Code</h1>
      <Input
        label={"Enter your QR Code destination URL"}
        id={"qrcode"}
        placeholder={"Example : https://super-long-link.com"}
        value={longLink}
        onChange={(e) => setLongLink(e.target.value)}
        className={linkClasses.input}
      />

      <div className={classes.QRsection}>
        <div className={classes.description}>
          <h4 className={classes.heading}>QR Codes are everywhere</h4>
          <p className={classes.title}>
            Connect your real-world audience to your online content.
          </p>
          <p>
            Generate a personalized, branded QR code linked to your high-speed short URL.
            Scan directly with any mobile camera!
          </p>
        </div>
        <CreateQRCode className={blur} content={content} />
      </div>

      {error && (
        <div
          style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid #ef4444",
            borderRadius: "8px",
            padding: "10px 14px",
            color: "#ef4444",
            fontSize: "0.9rem",
            marginBottom: "16px",
          }}
        >
          {error.message}
        </div>
      )}

      <ShortLinkOutput data={data} className={classes.resultContainer} />

      <Button
        className={linkClasses.create}
        name={isLoading ? "Generating..." : "Create QR Code"}
        action={{
          disabled: !longLink || isLoading,
          onClick: handleCreateQR,
        }}
      />

      <p className={linkClasses.free}>
        No credit card required. Everything is <span>FREE</span>
      </p>
    </div>
  );
}
