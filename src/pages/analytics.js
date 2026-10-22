import React, { useEffect, useState, useCallback } from "react";
import { GET_ALL_LINK_API, defaultSetting } from "../config";
import { useServer } from "../hooks/useServer";
import { formatMongoTimestamp } from "../helper/Common";
import { motion } from "framer-motion";
import {
  RiBarChartBoxLine,
  RiCursorLine,
  RiLinkM,
  RiFireLine,
  RiExternalLinkLine,
  RiRefreshLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Analytics() {
  const { handleAPICall, isLoading } = useServer();
  const [links, setLinks] = useState([]);

  const fetchAnalytics = useCallback(async () => {
    const res = await handleAPICall(GET_ALL_LINK_API, "GET");
    const linkList = Array.isArray(res?.data)
      ? res.data
      : Array.isArray(res?.links)
      ? res.links
      : null;

    if (Array.isArray(linkList)) {
      setLinks(linkList);
    }
  }, [handleAPICall]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const totalLinks = links.length;
  const totalClicks = links.reduce((sum, l) => sum + (l.click || 0), 0);
  const avgClicks = totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : 0;

  const topLink =
    links.length > 0
      ? [...links].sort((a, b) => (b.click || 0) - (a.click || 0))[0]
      : null;

  return (
    <div style={{ maxWidth: "1060px", margin: "40px auto", padding: "0 24px", position: "relative", zIndex: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "2.2rem",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Analytics & Performance
          </h1>
          <p style={{ color: "#94a3b8", margin: "8px 0 0", fontSize: "1rem" }}>
            Real-time telemetry, visitor attribution, and conversion metrics
          </p>
        </div>
        <button
          onClick={fetchAnalytics}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "10px",
            color: "#ffffff",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.9rem",
            backdropFilter: "blur(12px)",
            transition: "all 0.2s ease",
          }}
        >
          <RiRefreshLine size={16} /> Refresh Metrics
        </button>
      </div>

      {/* KPI Cards with 3D Parallax Hover */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "20px",
          marginBottom: "36px",
        }}
      >
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ duration: 0.2 }}
          style={{
            background: "linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)",
            padding: "24px",
            borderRadius: "18px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 25px rgba(37, 99, 235, 0.12)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#38bdf8" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                background: "rgba(56, 189, 248, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RiLinkM size={22} />
            </div>
            <span style={{ color: "#94a3b8", fontSize: "0.9rem", fontWeight: 600 }}>
              Total Short Links
            </span>
          </div>
          <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "#ffffff", marginTop: "16px" }}>
            {totalLinks}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ duration: 0.2 }}
          style={{
            background: "linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)",
            padding: "24px",
            borderRadius: "18px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 25px rgba(16, 185, 129, 0.12)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#34d399" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                background: "rgba(16, 185, 129, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RiCursorLine size={22} />
            </div>
            <span style={{ color: "#94a3b8", fontSize: "0.9rem", fontWeight: 600 }}>
              Total Visits
            </span>
          </div>
          <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "#ffffff", marginTop: "16px" }}>
            {totalClicks}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ duration: 0.2 }}
          style={{
            background: "linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)",
            padding: "24px",
            borderRadius: "18px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 25px rgba(139, 92, 246, 0.12)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#a78bfa" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                background: "rgba(139, 92, 246, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RiBarChartBoxLine size={22} />
            </div>
            <span style={{ color: "#94a3b8", fontSize: "0.9rem", fontWeight: 600 }}>
              Average per Link
            </span>
          </div>
          <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "#ffffff", marginTop: "16px" }}>
            {avgClicks}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ duration: 0.2 }}
          style={{
            background: "linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)",
            padding: "24px",
            borderRadius: "18px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 25px rgba(245, 158, 11, 0.12)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#fbbf24" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                background: "rgba(245, 158, 11, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RiFireLine size={22} />
            </div>
            <span style={{ color: "#94a3b8", fontSize: "0.9rem", fontWeight: 600 }}>
              Top Performer
            </span>
          </div>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "#ffffff",
              marginTop: "16px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {topLink ? `/${topLink.urlId}` : "N/A"}
          </div>
          <span style={{ fontSize: "0.85rem", color: "#34d399", fontWeight: 600 }}>
            {topLink ? `${topLink.click || 0} visits recorded` : "No visits recorded"}
          </span>
        </motion.div>
      </div>

      {/* Breakdown Table Card */}
      <div
        style={{
          background: "linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.6), 0 0 30px rgba(37, 99, 235, 0.12)",
          backdropFilter: "blur(20px)",
          padding: "32px",
        }}
      >
        <h3 style={{ margin: "0 0 20px", color: "#ffffff", fontSize: "1.25rem", fontWeight: 800 }}>
          Link Engagement Breakdown
        </h3>

        {isLoading && links.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
            Loading analytics...
          </div>
        ) : links.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 20px", color: "#94a3b8" }}>
            <p style={{ margin: "0 0 12px", fontSize: "1rem" }}>No analytics data yet.</p>
            <Link
              to="/dashboard"
              style={{
                color: "#38bdf8",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "0.95rem",
              }}
            >
              Go to Dashboard to create your first link →
            </Link>
          </div>
        ) : (
          <div style={{ overflowX: "auto", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "12px", background: "rgba(15, 23, 42, 0.5)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(15, 23, 42, 0.85)", color: "#94a3b8", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  <th style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    Short ID
                  </th>
                  <th style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    Destination URL
                  </th>
                  <th style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    Visits
                  </th>
                  <th style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    Engagement Share
                  </th>
                  <th style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {links.map((link) => {
                  const percent =
                    totalClicks > 0
                      ? Math.round(((link.click || 0) / totalClicks) * 100)
                      : 0;
                  const shortUrl = `${defaultSetting.domain}${link.urlId}`;

                  return (
                    <tr
                      key={link._id}
                      style={{
                        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                        fontSize: "0.9rem",
                      }}
                    >
                      <td style={{ padding: "16px", fontWeight: 700, color: "#38bdf8" }}>
                        <a
                          href={shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#38bdf8",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          /{link.urlId} <RiExternalLinkLine size={13} />
                        </a>
                      </td>
                      <td
                        style={{
                          padding: "16px",
                          maxWidth: "320px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          color: "#94a3b8",
                        }}
                        title={link.originalUrl}
                      >
                        {link.originalUrl}
                      </td>
                      <td style={{ padding: "16px" }}>
                        <span
                          style={{
                            background: (link.click || 0) > 0 ? "rgba(16, 185, 129, 0.15)" : "rgba(255, 255, 255, 0.06)",
                            color: (link.click || 0) > 0 ? "#34d399" : "#94a3b8",
                            border: `1px solid ${(link.click || 0) > 0 ? "rgba(16, 185, 129, 0.3)" : "rgba(255, 255, 255, 0.1)"}`,
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontWeight: 700,
                            fontSize: "0.82rem",
                          }}
                        >
                          {link.click || 0}
                        </span>
                      </td>
                      <td style={{ padding: "16px", minWidth: "160px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div
                            style={{
                              flex: 1,
                              background: "rgba(255, 255, 255, 0.08)",
                              height: "8px",
                              borderRadius: "4px",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                width: `${percent}%`,
                                background: "linear-gradient(90deg, #2563eb, #38bdf8)",
                                height: "100%",
                                borderRadius: "4px",
                              }}
                            />
                          </div>
                          <span style={{ fontSize: "0.82rem", color: "#cbd5e1", minWidth: "32px", fontWeight: 600 }}>
                            {percent}%
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: "16px", color: "#94a3b8", fontSize: "0.85rem" }}>
                        {formatMongoTimestamp(link.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
