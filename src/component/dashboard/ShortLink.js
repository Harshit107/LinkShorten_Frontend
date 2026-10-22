import React, { useCallback, useState } from "react";
import Input from "../../utils/common/Input";
import classes from "./shortLink.module.css";
import ShortLinkCustomURL from "./ShortLinkCustomURL";
import PARTY from "../../image/party.png";
import Button from "../../utils/common/Button";
import useInput from "../../hooks/useInput";
import { isValidUrl } from "../../helper/Validate";
import { useServer } from "../../hooks/useServer";
import { CREATE_LINK_API } from "../../config";
import ShortLinkOutput from "./ShortLinkOutput";

export default function ShortLink(props) {
  const {
    data: longLink,
    textChangeHandler,
    blurHandler,
    actionError: longLinkActionError,
    error: longLinkError,
  } = useInput((data) => isValidUrl(data));

  const { handleAPICall, data, error: serverError, isLoading, reset: resetServer } = useServer();

  const [endUrl, setEndUrl] = useState("");

  const handleAddEndURL = useCallback((url) => setEndUrl(url), []);

  const handleCreateLink = async () => {
    if (longLinkError || !longLink) return;
    resetServer();

    const body = {
      originalUrl: longLink.trim(),
      shortLink: endUrl.trim() || undefined,
      urlId: endUrl.trim() || undefined,
    };

    const result = await handleAPICall(CREATE_LINK_API, "POST", body);
    if (result) {
      if (typeof props.onLinkCreated === "function") {
        props.onLinkCreated(result.link || result);
      }
    }
  };

  return (
    <div className={classes.container}>
      <h1>Shorten a long link</h1>

      <Input
        label={"Paste a long URL"}
        id={"longLink"}
        placeholder={"Example : https://super-long-link.com/shorten-it"}
        value={longLink}
        onChange={textChangeHandler}
        className={
          classes.input + " " + (longLinkActionError ? "border-error" : "")
        }
        onBlur={blurHandler}
      />
      {longLinkActionError && (
        <p className="error">URL is not valid, Please enter valid URL</p>
      )}

      <ShortLinkCustomURL handleAddEndURL={handleAddEndURL} />

      <div className={classes.enlight}>
        <img src={PARTY} className={classes.party} alt="" />
        <p>End your link with words that will make it unique</p>
      </div>

      {serverError && (
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
          {serverError.message}
        </div>
      )}

      <ShortLinkOutput data={data} className={classes.resultContainer} />

      <Button
        className={classes.create}
        name={isLoading ? "Creating..." : "Create Link"}
        action={{
          disabled: longLinkError || !longLink || isLoading,
          onClick: handleCreateLink,
        }}
      />
      <p className={classes.free}>
        No credit card required. Everything is <span>FREE</span>
      </p>
    </div>
  );
}
