import { useState, useCallback } from "react";
import classes from "./DashboardIndex.module.css";
import DashboardHeading from "./DashboardHeading";
import ShortLink from "./ShortLink";
import Footer from "../footer/Footer";
import ShortLinkOption from "./ShortLinkOption";
import QRCode from "./QRCode";
import LinkList from "./LinkList";
import { AVAILABLE_MODE } from "../../helper/ParamsHelper";
import { useSearchParams } from "react-router-dom";

export default function DashboardIndex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [refreshCount, setRefreshCount] = useState(0);

  const mode = AVAILABLE_MODE.includes(searchParams.get("mode"))
    ? searchParams.get("mode")
    : "LINK";

  const [selectedOption, setSelectedOption] = useState(mode);

  const handlePanelChange = useCallback(
    (data) => {
      setSelectedOption(data);
      setSearchParams({ mode: data });
    },
    [setSearchParams]
  );

  const triggerListRefresh = useCallback(() => {
    setRefreshCount((prev) => prev + 1);
  }, []);

  return (
    <div className={classes["main-container"]}>
      <DashboardHeading />
      <ShortLinkOption
        handlePanelChange={handlePanelChange}
        default={selectedOption}
      />
      {selectedOption === "LINK" && (
        <ShortLink onLinkCreated={triggerListRefresh} />
      )}
      {selectedOption === "QR" && (
        <QRCode onLinkCreated={triggerListRefresh} />
      )}
      <LinkList refreshTrigger={refreshCount} />
      <Footer />
    </div>
  );
}
