import React, { useEffect, useState, useCallback } from "react";
import classes from "./LinkList.module.css";
import { defaultSetting, GET_ALL_LINK_API } from "../../config";
import { useServer } from "../../hooks/useServer";
import { formatMongoTimestamp } from "../../helper/Common";
import {
  RiFileCopyLine,
  RiCheckLine,
  RiExternalLinkLine,
  RiDeleteBin6Line,
  RiLinkM,
  RiRefreshLine,
} from "react-icons/ri";

export default function LinkList({ refreshTrigger }) {
  const { handleAPICall, isLoading, error } = useServer();
  const [links, setLinks] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

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
      setLinks((prev) => prev.filter((l) => l._id !== id));
    }
    setDeletingId(null);
  };

  const totalClicks = links.reduce((sum, item) => sum + (item.click || 0), 0);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>
          <RiLinkM size={22} color="#2563eb" />
          My Shortened Links
        </h2>
        <div className={classes.stats}>
          <span className={classes.statBadge}>
            Total Links: <strong>{links.length}</strong>
          </span>
          <span className={classes.statBadge}>
            Total Clicks: <strong>{totalClicks}</strong>
          </span>
          <button
            onClick={fetchLinks}
            className={classes.actionBtn}
            title="Refresh link list"
          >
            <RiRefreshLine size={16} />
          </button>
        </div>
      </div>

      {isLoading && links.length === 0 ? (
        <div style={{ textAlign: "center", padding: "30px", color: "#6b7280" }}>
          Loading your links...
        </div>
      ) : links.length === 0 ? (
        <div className={classes.emptyState}>
          <RiLinkM size={40} color="#9ca3af" />
          <p>You haven't created any links yet.</p>
          <span style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
            Paste a URL above to create your first trackable short link!
          </span>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => {
                const shortUrl = `${defaultSetting.domain}${link.urlId}`;
                const isCopied = copiedId === link._id;
                const isDeleting = deletingId === link._id;

                return (
                  <tr key={link._id}>
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
                      <span className={classes.clickBadge}>
                        {link.click || 0} visits
                      </span>
                    </td>
                    <td style={{ color: "#6b7280", fontSize: "0.85rem" }}>
                      {formatMongoTimestamp(link.createdAt)}
                    </td>
                    <td>
                      <button
                        onClick={() => handleCopy(link._id, shortUrl)}
                        className={classes.actionBtn}
                        title="Copy short link"
                      >
                        {isCopied ? (
                          <RiCheckLine size={15} color="#059669" />
                        ) : (
                          <RiFileCopyLine size={15} />
                        )}
                        {isCopied ? "Copied" : "Copy"}
                      </button>

                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.actionBtn}
                        title="Visit short link"
                        style={{ textDecoration: "none" }}
                      >
                        <RiExternalLinkLine size={15} />
                      </a>

                      <button
                        onClick={() => handleDelete(link._id)}
                        disabled={isDeleting}
                        className={`${classes.actionBtn} ${classes.deleteBtn}`}
                        title="Delete link"
                      >
                        <RiDeleteBin6Line size={15} />
                        {isDeleting ? "..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
