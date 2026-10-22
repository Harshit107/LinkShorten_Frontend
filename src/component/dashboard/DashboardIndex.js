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
import { motion, AnimatePresence } from "framer-motion";

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
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <AnimatePresence mode="wait">
          {selectedOption === "LINK" ? (
            <motion.div
              key="link-panel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              style={{ width: "100%" }}
            >
              <ShortLink onLinkCreated={triggerListRefresh} />
            </motion.div>
          ) : (
            <motion.div
              key="qr-panel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              style={{ width: "100%" }}
            >
              <QRCode onLinkCreated={triggerListRefresh} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <LinkList refreshTrigger={refreshCount} />
      <Footer />
    </div>
  );
}
