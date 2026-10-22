import React, { useEffect, useState, useCallback, useMemo } from "react";
import classes from "./LinkList.module.css";
import { defaultSetting, GET_ALL_LINK_API } from "../../config";
import { useServer } from "../../hooks/useServer";
import { formatMongoTimestamp } from "../../helper/Common";
import { isValidUrl } from "../../helper/Validate";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiFileCopyLine,
  RiCheckLine,
  RiExternalLinkLine,
  RiDeleteBin6Line,
  RiLinkM,
  RiRefreshLine,
  RiSearchLine,
  RiFireLine,
  RiEditLine,
  RiLockLine,
  RiCloseLine,
} from "react-icons/ri";

export default function LinkList({ refreshTrigger }) {
  const { handleAPICall, isLoading } = useServer();
  const [links, setLinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Edit Link State
  const [editingLink, setEditingLink] = useState(null);
  const [editUrl, setEditUrl] = useState("");
  const [editError, setEditError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const fetchLinks = useCallback(async () => {
    const result = await handleAPICall(GET_ALL_LINK_API, "GET");
    const linkList = Array.isArray(result?.data)
      ? result.data
      : Array.isArray(result?.links)
      ? result.links
      : null;

    if (Array.isArray(linkList)) {
      setLinks(linkList);
    }
  }, [handleAPICall]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks, refreshTrigger]);

  const handleCopy = async (id, shortUrl) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this short link?")) {
      return;
    }
    setDeletingId(id);
    const deleteUrl = `${GET_ALL_LINK_API}/${id}`;
    const res = await handleAPICall(deleteUrl, "DELETE");
    if (res) {
      setLinks((prev) => prev.filter((l) => (l.id || l._id) !== id));
    }
    setDeletingId(null);
  };

  const handleOpenEdit = (link) => {
    setEditingLink(link);
    setEditUrl(link.originalUrl || "");
    setEditError("");
  };

  const handleCloseEdit = () => {
    setEditingLink(null);
    setEditUrl("");
    setEditError("");
    setIsSaving(false);
  };

  const handleSaveEdit = async () => {
    if (!editingLink) return;
    const trimmed = (editUrl || "").trim();
    if (!trimmed) {
      setEditError("Destination URL cannot be empty");
      return;
    }

    let finalUrl = trimmed;
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`;
    }

    if (!isValidUrl(finalUrl)) {
      setEditError("Please enter a valid URL (e.g. https://example.com/target)");
      return;
    }

    const linkId = editingLink.id || editingLink._id;
    if (finalUrl === editingLink.originalUrl) {
      handleCloseEdit();
      return;
    }

    setIsSaving(true);
    setEditError("");
    const updateEndpoint = `${GET_ALL_LINK_API}/${linkId}`;
    const result = await handleAPICall(updateEndpoint, "PATCH", {
      originalUrl: finalUrl,
    });
    setIsSaving(false);

    if (result) {
      setLinks((prev) =>
        prev.map((item) =>
          (item.id || item._id) === linkId
            ? { ...item, originalUrl: finalUrl }
            : item
        )
      );
      handleCloseEdit();
    } else {
      setEditError("Failed to update URL. Please check server connection.");
    }
  };

  const totalClicks = useMemo(() => {
    return links.reduce((sum, item) => sum + (item.click || 0), 0);
  }, [links]);

  const filteredLinks = useMemo(() => {
    if (!searchTerm.trim()) return links;
    const term = searchTerm.toLowerCase();
    return links.filter(
      (link) =>
        link.urlId?.toLowerCase().includes(term) ||
        link.originalUrl?.toLowerCase().includes(term)
    );
  }, [links, searchTerm]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.titleArea}>
          <h2>
            <RiLinkM size={24} color="#2563eb" />
            <span>Shortened Links</span>
          </h2>
        </div>

        <div className={classes.statsArea}>
          <span className={classes.statBadge}>
            Total Links: <strong>{links.length}</strong>
          </span>
          <span className={classes.statBadge}>
            Total Clicks: <strong>{totalClicks}</strong>
          </span>
          <button
            onClick={fetchLinks}
            className={classes.refreshBtn}
            title="Refresh links"
          >
            <RiRefreshLine size={15} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {links.length > 0 && (
        <div className={classes.filterBar}>
          <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center" }}>
            <RiSearchLine
              size={16}
              style={{ position: "absolute", left: "12px", color: "#94a3b8" }}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search links by alias or destination URL..."
              className={classes.searchInput}
              style={{ paddingLeft: "36px" }}
            />
          </div>
        </div>
      )}

      {isLoading && links.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
          Loading your links...
        </div>
      ) : links.length === 0 ? (
        <div className={classes.emptyState}>
          <div className={classes.emptyIconWrapper}>
            <RiLinkM size={28} />
          </div>
          <h4>No short links created yet</h4>
          <p>Paste a long URL above to generate your first trackable short link.</p>
        </div>
      ) : filteredLinks.length === 0 ? (
        <div className={classes.emptyState}>
          <h4>No matching links found</h4>
          <p>No links matched "{searchTerm}". Try a different search term.</p>
        </div>
      ) : (
        <div className={classes.tableWrapper}>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>Short Link</th>
                <th>Destination URL</th>
                <th>Clicks</th>
                <th>Created</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredLinks.map((link) => {
                  const linkId = link.id || link._id;
                  const shortUrl = `${defaultSetting.domain}${link.urlId}`;
                  const isCopied = copiedId === linkId;
                  const isDeleting = deletingId === linkId;
                  const hasVisits = (link.click || 0) > 0;

                  return (
                    <motion.tr
                      key={linkId}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <td>
                        <div className={classes.shortUrlCell}>
                          <a
                            href={shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            /{link.urlId}
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className={classes.longUrlCell} title={link.originalUrl}>
                          {link.originalUrl}
                        </div>
                      </td>
                      <td>
                        <span
                          className={
                            hasVisits
                              ? classes.clickBadgeActive
                              : classes.clickBadgeZero
                          }
                        >
                          {hasVisits && <RiFireLine size={13} />}
                          {link.click || 0} visits
                        </span>
                      </td>
                      <td style={{ color: "#64748b", fontSize: "0.85rem" }}>
                        {formatMongoTimestamp(link.createdAt)}
                      </td>
                      <td>
                        <div className={classes.actionBtns} style={{ justifyContent: "flex-end" }}>
                          <button
                            onClick={() => handleCopy(linkId, shortUrl)}
                            className={`${classes.actionBtn} ${
                              isCopied ? classes.actionBtnCopied : ""
                            }`}
                            title="Copy link"
                          >
                            {isCopied ? (
                              <RiCheckLine size={14} color="#059669" />
                            ) : (
                              <RiFileCopyLine size={14} />
                            )}
                            <span>{isCopied ? "Copied" : "Copy"}</span>
                          </button>

                          <button
                            onClick={() => handleOpenEdit(link)}
                            className={`${classes.actionBtn} ${classes.editBtn}`}
                            title="Edit destination URL"
                          >
                            <RiEditLine size={14} />
                            <span>Edit</span>
                          </button>

                          <a
                            href={shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.actionBtn}
                            title="Open short link"
                          >
                            <RiExternalLinkLine size={14} />
                          </a>

                          <button
                            onClick={() => handleDelete(linkId)}
                            disabled={isDeleting}
                            className={`${classes.actionBtn} ${classes.deleteBtn}`}
                            title="Delete link"
                          >
                            <RiDeleteBin6Line size={14} />
                            <span>{isDeleting ? "..." : "Delete"}</span>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Link Destination Modal */}
      <AnimatePresence>
        {editingLink && (
          <motion.div
            className={classes.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseEdit}
          >
            <motion.div
              className={classes.modalContent}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={classes.modalHeader}>
                <div className={classes.modalTitleArea}>
                  <h3>
                    <RiEditLine size={20} color="#38bdf8" />
                    <span>Edit Destination URL</span>
                  </h3>
                  <p className={classes.modalSubtitle}>
                    Update where this short link points. The short alias is permanent.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  className={classes.modalCloseBtn}
                  title="Close modal"
                >
                  <RiCloseLine size={20} />
                </button>
              </div>

              <div className={classes.modalBody}>
                <div className={classes.formGroup}>
                  <label className={classes.formLabel}>
                    <RiLockLine size={13} color="#94a3b8" />
                    <span>Short Link Alias (Permanent & Locked)</span>
                  </label>
                  <div className={classes.lockedAliasBox}>
                    <span className={classes.lockedDomain}>{defaultSetting.domain}</span>
                    <span className={classes.lockedSlug}>{editingLink.urlId}</span>
                    <span className={classes.lockedBadge}>
                      <RiLockLine size={11} /> Locked
                    </span>
                  </div>
                  <span className={classes.fieldNote}>
                    The short alias cannot be changed to prevent broken bookmarks, QR codes, or external links.
                  </span>
                </div>

                <div className={classes.formGroup}>
                  <label className={classes.formLabel} htmlFor="editOriginalUrl">
                    <span>Original Destination URL</span>
                    <span className={classes.requiredStar}>*</span>
                  </label>
                  <input
                    id="editOriginalUrl"
                    type="text"
                    value={editUrl}
                    onChange={(e) => {
                      setEditUrl(e.target.value);
                      if (editError) setEditError("");
                    }}
                    placeholder="https://example.com/target-page"
                    className={`${classes.modalInput} ${editError ? classes.inputError : ""}`}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveEdit();
                      if (e.key === "Escape") handleCloseEdit();
                    }}
                  />
                  {editError && (
                    <span className={classes.errorMessage}>{editError}</span>
                  )}
                </div>
              </div>

              <div className={classes.modalFooter}>
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  className={classes.cancelBtn}
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  disabled={isSaving}
                  className={classes.saveBtn}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
