import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import classes from "./SplashScreen.module.css";
import LOGO_IMAGE from "../../image/logo.jpg";
import {
  RiArrowRightLine,
  RiFlashlightLine,
  RiBarChartGroupedLine,
  RiQrCodeLine,
  RiFileCopyLine,
  RiCheckLine,
  RiTerminalBoxLine,
  RiCompass3Line,
  RiFireLine,
} from "react-icons/ri";

export default function SplashScreen() {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [demoInput, setDemoInput] = useState("https://growth.acme.co/launch-2026?utm_source=twitter&campaign=viral");
  const [shortenedUrl, setShortenedUrl] = useState("trimurl.in/launch26");
  const [clickCount, setClickCount] = useState(1420);

  // 3D Tilt Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["14deg", "-14deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-14deg", "14deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleCopyDemo = () => {
    navigator.clipboard.writeText(`https://${shortenedUrl}`).catch(() => {});
    setCopied(true);
    setClickCount((prev) => prev + 1);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDemoShorten = () => {
    if (!demoInput) return;
    const randomSlug = Math.random().toString(36).substring(2, 7);
    setShortenedUrl(`trimurl.in/${randomSlug}`);
    setClickCount((prev) => prev + 5);
  };

  return (
    <div className={classes.container}>
      {/* Background Ambient Glow Orbs */}
      <motion.div
        className={classes.bgOrb1}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={classes.bgOrb2}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className={classes.bgOrb3} />

      {/* Floating Top Navbar */}
      <header className={classes.navbar}>
        <div className={classes.brandLink} onClick={() => navigate("/")}>
          <div className={classes.brandLogo}>
            <img src={LOGO_IMAGE} alt="TrimURL Logo" />
          </div>
          <span className={classes.brandText}>
            TrimURL<span className={classes.brandDot}>.</span>
          </span>
        </div>

        <nav className={classes.navLinks}>
          <a href="#features" className={classes.navLink}>
            Features
          </a>
          <Link to="/analytics" className={classes.navLink}>
            Analytics
          </Link>
          <Link to="/api" className={classes.navLink}>
            Developer API
          </Link>
        </nav>

        <Link to="/dashboard" className={classes.navCta}>
          Open App
        </Link>
      </header>

      {/* Main 3D Hero Section */}
      <section className={classes.heroSection}>
        {/* Left Column: Headline, Value Prop & CTAs */}
        <motion.div
          className={classes.heroLeft}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={classes.badgePill}>
            <span className={classes.pulseDot} />
            <span>Next-Gen URL Infrastructure & Analytics</span>
          </div>

          <h1 className={classes.heroTitle}>
            Shorten. Brand. Track. <br />
            <span className={classes.gradientText}>With 3D Precision.</span>
          </h1>

          <p className={classes.heroDesc}>
            Elevate every link into a trackable powerhouse. Create branded short URLs, generate dynamic vector QR codes, and monitor visitor traffic with sub-15ms redirection latency.
          </p>

          <div className={classes.heroCtaGroup}>
            <button
              onClick={() => navigate("/dashboard")}
              className={classes.primaryCta}
            >
              <span>Get Started Free</span>
              <RiArrowRightLine size={18} />
            </button>

            <a href="#features" className={classes.secondaryCta}>
              <RiCompass3Line size={18} />
              <span>Explore Features</span>
            </a>
          </div>

          {/* Social Proof & Metrics Strip */}
          <div className={classes.heroStats}>
            <div className={classes.statItem}>
              <span className={classes.statNumber}>10M+</span>
              <span className={classes.statLabel}>Links Shortened</span>
            </div>
            <div className={classes.statItem}>
              <span className={classes.statNumber}>99.99%</span>
              <span className={classes.statLabel}>Uptime SLA</span>
            </div>
            <div className={classes.statItem}>
              <span className={classes.statNumber}>&lt; 15ms</span>
              <span className={classes.statLabel}>Redirect Speed</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Interactive Perspective Showcase */}
        <motion.div
          className={classes.heroRight}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
        >
          <div className={classes.stage3D}>
            {/* 3D Parallax Tilt Container */}
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className={classes.card3D}
            >
              <div className={classes.cardGlow} />

              {/* Mac-style Window Bar */}
              <div className={classes.cardHeader}>
                <div className={classes.windowDots}>
                  <div className={classes.dotRed} />
                  <div className={classes.dotYellow} />
                  <div className={classes.dotGreen} />
                </div>
                <span className={classes.cardTag}>Live 3D Console</span>
              </div>

              {/* Live Interactive Shorten Input Preview */}
              <div className={classes.mockInputWrapper}>
                <span style={{ color: "#38bdf8", fontWeight: 700 }}>⚡</span>
                <input
                  type="text"
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  className={classes.mockInputText}
                  placeholder="Paste URL..."
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    width: "100%",
                  }}
                />
                <button
                  onClick={handleDemoShorten}
                  className={classes.mockShortenBtn}
                >
                  Trim
                </button>
              </div>

              {/* Live Interactive Output Preview Card */}
              <div className={classes.mockOutputWrapper}>
                <div className={classes.mockShortUrl}>
                  <span className={classes.mockUrlValue}>https://{shortenedUrl}</span>
                  <span className={classes.mockUrlMeta}>
                    <RiFireLine size={12} /> {clickCount.toLocaleString()} real-time visits tracked
                  </span>
                </div>
                <button onClick={handleCopyDemo} className={classes.mockCopyBtn}>
                  {copied ? (
                    <>
                      <RiCheckLine size={14} color="#34d399" />
                      <span style={{ color: "#34d399" }}>Copied!</span>
                    </>
                  ) : (
                    <>
                      <RiFileCopyLine size={14} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Floating 3D Badge 1: Real-Time Analytics Pill */}
              <motion.div
                className={classes.floatingBadgeAnalytics}
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className={classes.sparkIconWrapper}>
                  <RiBarChartGroupedLine size={20} />
                </div>
                <div>
                  <div className={classes.badgeValue}>+48.6% CTR</div>
                  <div className={classes.badgeSub}>Visitor Retention</div>
                </div>
              </motion.div>

              {/* Floating 3D Badge 2: Holographic QR Generator */}
              <motion.div
                className={classes.floatingBadgeQR}
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className={classes.qrContainer}>
                  {/* Clean SVG QR mockup */}
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="2" y="2" width="14" height="14" rx="2" stroke="#0f172a" strokeWidth="2.5" fill="none" />
                    <rect x="6" y="6" width="6" height="6" fill="#0f172a" />
                    <rect x="24" y="2" width="14" height="14" rx="2" stroke="#0f172a" strokeWidth="2.5" fill="none" />
                    <rect x="28" y="6" width="6" height="6" fill="#0f172a" />
                    <rect x="2" y="24" width="14" height="14" rx="2" stroke="#0f172a" strokeWidth="2.5" fill="none" />
                    <rect x="6" y="28" width="6" height="6" fill="#0f172a" />
                    <circle cx="28" cy="28" r="3" fill="#2563eb" />
                    <circle cx="35" cy="35" r="2" fill="#10b981" />
                  </svg>
                  {/* Scanning beam */}
                  <motion.div
                    className={classes.scanLine}
                    animate={{ y: [0, 44, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <div className={classes.qrInfo}>
                  <span className={classes.qrTitle}>Dynamic 3D QR</span>
                  <span className={classes.qrStatus}>● Ready for Scan</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Feature Showcase Grid Section */}
      <section id="features" className={classes.featuresSection}>
        <div className={classes.featuresHeader}>
          <h2 className={classes.featuresSectionTitle}>
            Engineered For Speed, Precision & Scale
          </h2>
          <p className={classes.featuresSectionSub}>
            Everything you need to manage short URLs, print dynamic marketing codes, and measure click analytics in one unified dashboard.
          </p>
        </div>

        <div className={classes.featuresGrid}>
          {/* Feature 1 */}
          <motion.div
            className={classes.featureCard}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={classes.featureIcon}
              style={{ background: "rgba(37, 99, 235, 0.15)", color: "#38bdf8" }}
            >
              <RiFlashlightLine />
            </div>
            <h3 className={classes.featureTitle}>Sub-15ms Redirects</h3>
            <p className={classes.featureText}>
              Powered by high-throughput PostgreSQL indexing for lightning-fast atomic URL resolution without latency bottlenecks.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className={classes.featureCard}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={classes.featureIcon}
              style={{ background: "rgba(16, 185, 129, 0.15)", color: "#34d399" }}
            >
              <RiQrCodeLine />
            </div>
            <h3 className={classes.featureTitle}>Instant QR Generator</h3>
            <p className={classes.featureText}>
              Generate high-resolution branded QR codes ready for packaging, print menus, or digital marketing billboards.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className={classes.featureCard}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={classes.featureIcon}
              style={{ background: "rgba(139, 92, 246, 0.15)", color: "#a78bfa" }}
            >
              <RiBarChartGroupedLine />
            </div>
            <h3 className={classes.featureTitle}>Granular Click Analytics</h3>
            <p className={classes.featureText}>
              Measure campaign traffic, top-performing links, and conversion percentages in real time with intuitive charts.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            className={classes.featureCard}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={classes.featureIcon}
              style={{ background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24" }}
            >
              <RiTerminalBoxLine />
            </div>
            <h3 className={classes.featureTitle}>Developer REST API</h3>
            <p className={classes.featureText}>
              Programmatic link generation with Bearer authorization, standardized JSON envelopes, and cURL snippets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modern Call to Action Banner */}
      <div className={classes.ctaBanner}>
        <div className={classes.ctaText}>
          <h3>Ready to upgrade your links?</h3>
          <p>Join thousands of creators and teams leveraging modern URL intelligence today.</p>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className={classes.primaryCta}
          style={{ whiteSpace: "nowrap" }}
        >
          <span>Launch Free Dashboard</span>
          <RiArrowRightLine size={18} />
        </button>
      </div>
    </div>
  );
}
