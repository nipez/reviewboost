import React, { useState, useEffect, useRef, useCallback } from "react";

const SAMPLE_REVIEWS = [{
  id: 1,
  name: "Sarah Mitchell",
  rating: 5,
  time: "2 days ago",
  text: "Absolutely wonderful experience! The staff was incredibly friendly and professional. Highly recommend to anyone looking for quality care.",
  avatar: "S"
}, {
  id: 2,
  name: "James Kim",
  rating: 5,
  time: "3 days ago",
  text: "Best experience I've had. Clean facility, short wait time, and the doctor was very thorough explaining everything.",
  avatar: "J"
}, {
  id: 3,
  name: "Maria Lopez",
  rating: 5,
  time: "5 days ago",
  text: "So glad I found this place! The team went above and beyond. Will definitely be coming back and telling all my friends.",
  avatar: "M"
}, {
  id: 4,
  name: "David Roberts",
  rating: 5,
  time: "1 week ago",
  text: "Five stars isn't enough. From the moment I walked in, I felt welcomed. The care I received was truly exceptional.",
  avatar: "D"
}, {
  id: 5,
  name: "Lisa Torres",
  rating: 4,
  time: "1 week ago",
  text: "Great service and very knowledgeable staff. The office is modern and well-maintained. Would definitely recommend!",
  avatar: "L"
}, {
  id: 6,
  name: "Robert Park",
  rating: 5,
  time: "2 weeks ago",
  text: "Outstanding! I was seen quickly and the entire process was smooth from start to finish.",
  avatar: "R"
}, {
  id: 7,
  name: "Jennifer Wu",
  rating: 5,
  time: "2 weeks ago",
  text: "Genuine care, transparent communication, and excellent results. This place truly stands out.",
  avatar: "J"
}, {
  id: 8,
  name: "Michael Chen",
  rating: 5,
  time: "3 weeks ago",
  text: "Incredible attention to detail. They took the time to listen to all my concerns thoroughly.",
  avatar: "M"
}, {
  id: 9,
  name: "Amanda Foster",
  rating: 5,
  time: "3 weeks ago",
  text: "This team is amazing! They made me feel so comfortable and the results speak for themselves.",
  avatar: "A"
}, {
  id: 10,
  name: "Chris Daniels",
  rating: 4,
  time: "1 month ago",
  text: "Very professional and efficient. The facility is top-notch and the staff genuinely cares.",
  avatar: "C"
}];
const MOCK_PLACES = [{
  placeId: "ChIJ_demo1",
  name: "Element Longevity",
  address: "123 Main St, Traverse City, MI 49684",
  rating: 4.8,
  reviewCount: 187
}, {
  placeId: "ChIJ_demo2",
  name: "Elev8 Climbing and Fitness",
  address: "777 Boyd Ave, Traverse City, MI 49686",
  rating: 4.9,
  reviewCount: 50
}, {
  placeId: "ChIJ_demo3",
  name: "The Filling Station Microbrewery",
  address: "642 Railroad Pl, Traverse City, MI 49686",
  rating: 4.5,
  reviewCount: 438
}, {
  placeId: "ChIJ_demo4",
  name: "Bright Smile Family Dental",
  address: "2211 N US-31, Traverse City, MI 49686",
  rating: 4.7,
  reviewCount: 156
}, {
  placeId: "ChIJ_demo5",
  name: "Rare Bird Brewpub",
  address: "229 Lake Ave, Traverse City, MI 49684",
  rating: 4.6,
  reviewCount: 312
}, {
  placeId: "ChIJ_demo6",
  name: "Zen Nail Spa",
  address: "3575 Market Pl Dr, Traverse City, MI 49684",
  rating: 4.4,
  reviewCount: 89
}, {
  placeId: "ChIJ_demo7",
  name: "Grand Traverse Pie Company",
  address: "525 W Front St, Traverse City, MI 49684",
  rating: 4.5,
  reviewCount: 527
}, {
  placeId: "ChIJ_demo8",
  name: "Traverse City CrossFit",
  address: "1125 Hastings St, Traverse City, MI 49686",
  rating: 4.8,
  reviewCount: 34
}];
const SOCIALS = [{
  id: "instagram",
  label: "Instagram",
  color: "#E1306C",
  grad: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)"
}, {
  id: "facebook",
  label: "Facebook",
  color: "#1877F2",
  grad: "linear-gradient(135deg,#1877F2,#0a5dc2)"
}, {
  id: "tiktok",
  label: "TikTok",
  color: "#ff0050",
  grad: "linear-gradient(135deg,#00f2ea,#ff0050)"
}];
const AVATAR_COLORS = [["#4285F4", "#34A853"], ["#EA4335", "#FBBC04"], ["#7c3aed", "#a78bfa"], ["#0891b2", "#06b6d4"], ["#c026d3", "#e879f9"], ["#059669", "#34d399"], ["#d97706", "#fbbf24"], ["#dc2626", "#f87171"], ["#4f46e5", "#818cf8"], ["#0d9488", "#2dd4bf"]];
const MOCK_ADS = [{
  id: 1,
  headline: "SmileBright Invisalign",
  body: "Straighter teeth in 6 months. Free consultation for new patients.",
  cta: "Book Now",
  color: "#0891b2",
  icon: "\uD83E\uDE77"
}, {
  id: 2,
  headline: "QuickBooks for Small Biz",
  body: "Manage invoices, payroll & taxes in one place. 50% off 3 months.",
  cta: "Try Free",
  color: "#2563eb",
  icon: "\uD83D\uDCCA"
}, {
  id: 3,
  headline: "State Farm — Jake Torres",
  body: "Your local agent. Auto + business insurance bundled & saved.",
  cta: "Get Quote",
  color: "#e11d48",
  icon: "\uD83C\uDFAF"
}, {
  id: 4,
  headline: "DoorDash for Business",
  body: "Free lunch delivery for your team. $0 delivery on first 3 orders.",
  cta: "Order Now",
  color: "#FF3008",
  icon: "\uD83C\uDF5C"
}, {
  id: 5,
  headline: "Square Appointments",
  body: "Free booking & scheduling. Reduce no-shows by 30%.",
  cta: "Start Free",
  color: "#006AFF",
  icon: "\uD83D\uDCC5"
}, {
  id: 6,
  headline: "Yelp Ads for Local Biz",
  body: "Get found by 178M monthly visitors. Targeted local advertising.",
  cta: "Learn More",
  color: "#d32323",
  icon: "\u2B50"
}];
function AdBanner({
  dark,
  compact,
  onUpgrade,
  dual
}) {
  var [adIdx, setAdIdx] = useState(0);
  var [ad2Idx, setAd2Idx] = useState(Math.floor(MOCK_ADS.length / 2));
  useEffect(function () {
    var iv = setInterval(function () {
      setAdIdx(function (i) {
        return (i + 1) % MOCK_ADS.length;
      });
      setAd2Idx(function (i) {
        return (i + 1) % MOCK_ADS.length;
      });
    }, 8000);
    return function () {
      clearInterval(iv);
    };
  }, []);
  var ad = MOCK_ADS[adIdx];
  var ad2 = MOCK_ADS[ad2Idx];
  function renderAd(a) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        borderRadius: compact ? 14 : 16,
        background: dark ? "rgba(255,255,255,0.06)" : "white",
        border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
        boxShadow: dark ? "none" : "0 2px 12px rgba(0,0,0,0.04)",
        padding: compact ? "10px 14px" : "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: compact ? 10 : 12,
        position: "relative",
        overflow: "hidden",
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: compact ? 36 : 40,
        height: compact ? 36 : 40,
        borderRadius: compact ? 10 : 10,
        background: a.color + "15",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: compact ? 18 : 20,
        flexShrink: 0
      }
    }, a.icon), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: compact ? 12 : 13,
        fontWeight: 700,
        color: dark ? "white" : "#1a1a2e",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, a.headline), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: compact ? 10 : 11,
        color: dark ? "rgba(255,255,255,0.45)" : "#888",
        lineHeight: 1.4,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, a.body)), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: compact ? "5px 10px" : "5px 12px",
        borderRadius: 8,
        background: a.color,
        color: "white",
        fontSize: compact ? 10 : 11,
        fontWeight: 700,
        flexShrink: 0,
        whiteSpace: "nowrap"
      }
    }, a.cta), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: compact ? 2 : 3,
        right: compact ? 6 : 8,
        display: "flex",
        alignItems: "center",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 8,
        color: dark ? "rgba(255,255,255,0.2)" : "#ccc",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Ad"), onUpgrade && /*#__PURE__*/React.createElement("span", {
      onClick: onUpgrade,
      style: {
        fontSize: 8,
        color: dark ? "#a855f7" : "#7c3aed",
        fontWeight: 700,
        cursor: "pointer",
        textDecoration: "underline"
      }
    }, "Remove")));
  }
  if (dual) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        width: "100%"
      }
    }, renderAd(ad), renderAd(ad2));
  }
  return renderAd(ad);
}

/* ── tiny icons ── */
function GoogleG({
  size
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size || 22,
    height: size || 22,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z",
    fill: "#4285F4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
    fill: "#34A853"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z",
    fill: "#FBBC05"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
    fill: "#EA4335"
  }));
}
function SocialSvg({
  id,
  size,
  color
}) {
  const sz = size || 18;
  const c = color || "white";
  if (id === "instagram") {
    return /*#__PURE__*/React.createElement("svg", {
      width: sz,
      height: sz,
      viewBox: "0 0 24 24",
      fill: c
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
    }));
  }
  if (id === "facebook") {
    return /*#__PURE__*/React.createElement("svg", {
      width: sz,
      height: sz,
      viewBox: "0 0 24 24",
      fill: c
    }, /*#__PURE__*/React.createElement("path", {
      d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    }));
  }
  if (id === "tiktok") {
    return /*#__PURE__*/React.createElement("svg", {
      width: sz,
      height: sz,
      viewBox: "0 0 24 24",
      fill: c
    }, /*#__PURE__*/React.createElement("path", {
      d: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.15v-3.44a4.85 4.85 0 01-3.59-1.43V6.69h3.59z"
    }));
  }
  return null;
}
function StarSvg({
  size,
  fill
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size || 20,
    height: size || 20,
    viewBox: "0 0 20 20"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 1.12l2.47 5.01 5.53.8-4 3.9.94 5.5L10 13.77l-4.94 2.56.94-5.5-4-3.9 5.53-.8z",
    fill: fill || "#FBBC04"
  }));
}

/* ReviewBoost Logo Icon — arrow + 5 stars */
function LogoIcon({
  size
}) {
  var s = size || 34;
  return /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 100 100"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "logoGrad",
    x1: "0%",
    y1: "100%",
    x2: "100%",
    y2: "0%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    style: {
      stopColor: "#EA4335"
    }
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    style: {
      stopColor: "#FBBC04"
    }
  }))), /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "4",
    width: "92",
    height: "92",
    rx: "22",
    fill: "url(#logoGrad)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50 14 L68 38 L58 38 L58 52 L42 52 L42 38 L32 38 Z",
    fill: "white",
    opacity: "0.95"
  }), /*#__PURE__*/React.createElement("g", {
    fill: "white"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 72 l2-4 4.4-.6-3.2-3.1.8-4.4-4 2.1-4-2.1.8 4.4-3.2 3.1 4.4.6z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M34 72 l2-4 4.4-.6-3.2-3.1.8-4.4-4 2.1-4-2.1.8 4.4-3.2 3.1 4.4.6z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50 72 l2-4 4.4-.6-3.2-3.1.8-4.4-4 2.1-4-2.1.8 4.4-3.2 3.1 4.4.6z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M66 72 l2-4 4.4-.6-3.2-3.1.8-4.4-4 2.1-4-2.1.8 4.4-3.2 3.1 4.4.6z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M82 72 l2-4 4.4-.6-3.2-3.1.8-4.4-4 2.1-4-2.1.8 4.4-3.2 3.1 4.4.6z"
  })));
}
function ProBadge({
  small
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: small ? "2px 6px" : "3px 8px",
      borderRadius: 6,
      background: "linear-gradient(135deg,#7c3aed,#a855f7)",
      fontSize: small ? 9 : 10,
      fontWeight: 800,
      color: "white",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      lineHeight: 1,
      flexShrink: 0
    }
  }, "PRO");
}
function Stars({
  rating,
  size
}) {
  const s = size || 20;
  const r = rating || 4.8;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 2
    }
  }, [1, 2, 3, 4, 5].map(function (i) {
    var f = i <= Math.floor(r) ? "#FBBC04" : "#e0e0e0";
    return /*#__PURE__*/React.createElement(StarSvg, {
      key: i,
      size: s,
      fill: f
    });
  }));
}

/* ── QR Code ── */
function generateQRMatrix(data) {
  var size = 29;
  var matrix = [];
  for (var y = 0; y < size; y++) {
    matrix[y] = [];
    for (var x = 0; x < size; x++) {
      matrix[y][x] = false;
    }
  }
  function addFinder(ox, oy) {
    for (var i = 0; i < 7; i++) for (var j = 0; j < 7; j++) matrix[oy + i][ox + j] = i === 0 || i === 6 || j === 0 || j === 6 || i >= 2 && i <= 4 && j >= 2 && j <= 4;
  }
  addFinder(0, 0);
  addFinder(size - 7, 0);
  addFinder(0, size - 7);
  for (var i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }
  var hash = 5381;
  for (var c = 0; c < data.length; c++) hash = (hash << 5) + hash + data.charCodeAt(c) & 0x7fffffff;
  var seed = hash;
  function rng() {
    seed = seed * 1103515245 + 12345 & 0x7fffffff;
    return seed / 0x7fffffff;
  }
  for (var ry = 0; ry < size; ry++) {
    for (var rx = 0; rx < size; rx++) {
      if (matrix[ry][rx]) continue;
      if (rx < 8 && ry < 8 || rx >= size - 8 && ry < 8 || rx < 8 && ry >= size - 8) continue;
      if (ry === 6 || rx === 6) continue;
      matrix[ry][rx] = rng() > 0.52;
    }
  }
  return matrix;
}
function QRCode({
  data,
  size
}) {
  var sz = size || 160;
  var m = generateQRMatrix(data);
  var cellSize = sz / m.length;
  var rects = [];
  for (var y = 0; y < m.length; y++) {
    for (var x = 0; x < m[y].length; x++) {
      if (m[y][x]) {
        rects.push(/*#__PURE__*/React.createElement("rect", {
          key: x + "-" + y,
          x: x * cellSize + 0.5,
          y: y * cellSize + 0.5,
          width: cellSize - 0.3,
          height: cellSize - 0.3,
          rx: 1,
          fill: "#1a1a2e"
        }));
      }
    }
  }
  return /*#__PURE__*/React.createElement("svg", {
    width: sz,
    height: sz,
    viewBox: "0 0 " + sz + " " + sz
  }, /*#__PURE__*/React.createElement("rect", {
    width: sz,
    height: sz,
    fill: "white",
    rx: 6
  }), rects);
}

/* ── Flip Counter ── */
function FlipDigit({
  digit,
  size
}) {
  var s = size || "md";
  var dims = {
    sm: [36, 48, 28],
    md: [52, 68, 40],
    lg: [68, 90, 54],
    xl: [88, 116, 72]
  };
  var d = dims[s] || dims.md;
  var w = d[0],
    h = d[1],
    fs = d[2];
  var rad = s === "xl" ? 14 : s === "lg" ? 12 : 8;
  var [display, setDisplay] = useState(digit);
  var [flipping, setFlipping] = useState(false);
  var prev = useRef(digit);
  useEffect(function () {
    if (digit !== prev.current) {
      setFlipping(true);
      var t1 = setTimeout(function () {
        setDisplay(digit);
      }, 140);
      var t2 = setTimeout(function () {
        setFlipping(false);
        prev.current = digit;
      }, 280);
      return function () {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [digit]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: w,
      height: h,
      perspective: 400,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      borderRadius: rad,
      background: "linear-gradient(180deg, #2a2a3eee 0%, #1a1a2e 47%, rgba(0,0,0,0.3) 48%, rgba(0,0,0,0.1) 50%, #1a1a2e 51%, #1a1a2edd 100%)",
      boxShadow: "0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: fs,
      fontWeight: 800,
      color: "white",
      transform: flipping ? "rotateX(8deg)" : "rotateX(0deg)",
      transition: "transform 0.14s ease-in-out",
      overflow: "hidden"
    }
  }, display));
}
function ReviewCounter({
  count,
  size
}) {
  var s = size || "md";
  var digits = String(count).padStart(3, "0").split("");
  var gap = {
    sm: 3,
    md: 4,
    lg: 5,
    xl: 6
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: gap[s] || 4
    }
  }, digits.map(function (d, i) {
    return /*#__PURE__*/React.createElement(FlipDigit, {
      key: i,
      digit: d,
      size: s
    });
  }));
}
function RatingHero({
  rating,
  count,
  size,
  light
}) {
  var s = size || "md";
  var starSz = {
    sm: 22,
    md: 28,
    lg: 36,
    xl: 48
  }[s] || 28;
  var valSz = {
    sm: 28,
    md: 36,
    lg: 52,
    xl: 64
  }[s] || 36;
  var lblSz = {
    sm: 11,
    md: 12,
    lg: 14,
    xl: 16
  }[s] || 12;
  var gapSz = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20
  }[s] || 12;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: gapSz
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: s === "xl" ? 14 : 10
    }
  }, /*#__PURE__*/React.createElement(Stars, {
    rating: rating,
    size: starSz
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: valSz,
      fontWeight: 800,
      color: light ? "white" : "#1a1a2e",
      lineHeight: 1
    }
  }, rating)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: lblSz,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      color: light ? "rgba(255,255,255,0.4)" : "#999"
    }
  }, "Google Reviews"), /*#__PURE__*/React.createElement(ReviewCounter, {
    count: count,
    size: s
  }));
}

/* ── Review Card ── */
function ReviewCard({
  review,
  compact,
  dark
}) {
  var colors = AVATAR_COLORS[review.id % AVATAR_COLORS.length];
  var pad = compact ? "18px 20px" : "24px 28px";
  var bg = dark ? "rgba(255,255,255,0.06)" : "white";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: compact ? 16 : 20,
      padding: pad,
      height: "100%",
      boxShadow: dark ? "none" : "0 2px 16px rgba(0,0,0,0.05)",
      border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.04)",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: compact ? 10 : 14,
      marginBottom: compact ? 10 : 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: compact ? 36 : 44,
      height: compact ? 36 : 44,
      borderRadius: "50%",
      background: "linear-gradient(135deg," + colors[0] + "," + colors[1] + ")",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: compact ? 14 : 17,
      fontWeight: 700,
      color: "white",
      flexShrink: 0
    }
  }, review.avatar), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: compact ? 14 : 16,
      color: dark ? "#fff" : "#1a1a2e"
    }
  }, review.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: compact ? 11 : 12,
      color: dark ? "rgba(255,255,255,0.35)" : "#bbb",
      marginTop: 1
    }
  }, review.time)), /*#__PURE__*/React.createElement(GoogleG, {
    size: compact ? 18 : 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: compact ? 8 : 10
    }
  }, /*#__PURE__*/React.createElement(Stars, {
    rating: review.rating,
    size: compact ? 14 : 17
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: compact ? 13 : 15,
      lineHeight: 1.6,
      flex: 1,
      margin: 0,
      color: dark ? "rgba(255,255,255,0.7)" : "#555"
    }
  }, "\"", review.text, "\""));
}

/* ── Review Carousel ── */
function ReviewCarousel({
  reviews,
  compact,
  dark,
  count,
  interval,
  gridCols
}) {
  var ct = count || 2;
  var iv = interval || 6000;
  var cols = gridCols || ct;
  var [idx, setIdx] = useState(0);
  var [visible, setVisible] = useState(true);
  useEffect(function () {
    if (reviews.length <= ct) return;
    var timer = setInterval(function () {
      setVisible(false);
      setTimeout(function () {
        setIdx(function (p) {
          return (p + ct) % reviews.length;
        });
        setVisible(true);
      }, 400);
    }, iv);
    return function () {
      clearInterval(timer);
    };
  }, [reviews.length, ct, iv]);
  var shown = [];
  for (var i = 0; i < ct; i++) {
    shown.push(reviews[(idx + i) % reviews.length]);
  }
  var totalPages = Math.ceil(reviews.length / ct);
  var currentPage = Math.floor(idx / ct) % totalPages;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(" + cols + ", 1fr)",
      gap: compact ? 12 : 16,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(12px)",
      transition: "all 0.45s ease-out"
    }
  }, shown.map(function (r, i) {
    return /*#__PURE__*/React.createElement(ReviewCard, {
      key: idx + "-" + i,
      review: r,
      compact: compact,
      dark: dark
    });
  })), reviews.length > ct && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      justifyContent: "center",
      marginTop: compact ? 14 : 18
    }
  }, Array(totalPages).fill(0).map(function (_, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        width: currentPage === i ? 22 : 7,
        height: 7,
        borderRadius: 4,
        background: currentPage === i ? "#FBBC04" : dark ? "rgba(255,255,255,0.15)" : "#ddd",
        transition: "all 0.4s ease"
      }
    });
  })));
}

/* ── Upgrade Modal ── */
function UpgradeModal({
  onClose,
  onUpgrade,
  trigger
}) {
  var [selectedPlan, setSelectedPlan] = useState("pro");
  var mob = typeof window !== "undefined" && window.innerWidth < 700;
  var plans = [{
    id: "plus",
    label: "Plus",
    price: "$9",
    period: "/mo",
    badge: null,
    color: "#2563eb",
    gradient: "linear-gradient(135deg,#2563eb,#3b82f6)",
    features: ["Remove branding + ads", "Upload your logo", "Dark mode theme", "Basic analytics"]
  }, {
    id: "pro",
    label: "Pro",
    price: "$29",
    period: "/mo",
    badge: "MOST POPULAR",
    color: "#7c3aed",
    gradient: "linear-gradient(135deg,#7c3aed,#a855f7)",
    features: ["Everything in Plus", "Smart review routing (happy\u2192Google, unhappy\u2192feedback)", "AI-drafted review responses", "Social followers + Follow Us QR", "TV / wall mount display", "Competitor tracking"]
  }, {
    id: "hardware",
    label: "Pro + Hardware",
    price: "$49",
    period: "/mo",
    badge: "ALL-IN-ONE",
    color: "#059669",
    gradient: "linear-gradient(135deg,#059669,#10b981)",
    features: ["Everything in Pro", "Pre-configured tablet + stand", "White-glove setup", "Free hardware replacement", "Zero upfront cost"]
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      display: "flex",
      alignItems: mob ? "flex-end" : "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(4px)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      maxWidth: mob ? "100%" : 740,
      maxHeight: mob ? "100vh" : "90vh",
      overflowY: "auto",
      background: "white",
      borderRadius: mob ? "20px 20px 0 0" : 24,
      padding: mob ? "24px 16px" : "36px 28px",
      boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
      animation: "fadeSlide 0.3s ease-out",
      margin: mob ? "auto 0 0 0" : undefined
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      position: "absolute",
      top: mob ? 12 : 16,
      right: mob ? 12 : 16,
      width: 32,
      height: 32,
      borderRadius: 8,
      background: "#f5f0ea",
      border: "none",
      cursor: "pointer",
      fontSize: 16,
      color: "#999",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "\u2715"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: mob ? 16 : 24
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: mob ? 20 : 26,
      fontWeight: 800,
      color: "#1a1a2e",
      marginBottom: 6
    }
  }, "Upgrade your display"), trigger && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: mob ? 12 : 14,
      color: "#888"
    }
  }, trigger)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: mob ? "flex" : "grid",
      gridTemplateColumns: mob ? undefined : "1fr 1fr 1fr",
      gap: mob ? 10 : 12,
      marginBottom: mob ? 16 : 24,
      overflowX: mob ? "auto" : undefined,
      WebkitOverflowScrolling: "touch",
      scrollSnapType: mob ? "x mandatory" : undefined,
      paddingBottom: mob ? 4 : 0
    }
  }, plans.map(function (p) {
    var isSelected = selectedPlan === p.id;
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      onClick: function () {
        setSelectedPlan(p.id);
      },
      style: {
        borderRadius: mob ? 14 : 18,
        padding: mob ? "16px 14px" : "22px 18px",
        cursor: "pointer",
        position: "relative",
        border: "2.5px solid " + (isSelected ? p.color : "#e8e0d4"),
        background: isSelected ? p.color + "08" : "white",
        transition: "all 0.15s ease",
        minWidth: mob ? "70vw" : undefined,
        flexShrink: mob ? 0 : undefined,
        scrollSnapAlign: mob ? "center" : undefined
      }
    }, p.badge && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: -9,
        right: 12,
        padding: "3px 10px",
        borderRadius: 6,
        background: p.gradient,
        fontSize: 9,
        fontWeight: 800,
        color: "white",
        letterSpacing: "0.04em"
      }
    }, p.badge), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: mob ? 11 : 12,
        fontWeight: 700,
        color: p.color,
        textTransform: "uppercase",
        marginBottom: 4
      }
    }, p.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: mob ? 26 : 32,
        fontWeight: 800,
        color: "#1a1a2e",
        lineHeight: 1
      }
    }, p.price, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: mob ? 12 : 14,
        fontWeight: 500,
        color: "#888"
      }
    }, p.period)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: mob ? 10 : 11,
        color: "#bbb",
        marginTop: 2
      }
    }, "per location \xB7 unlimited displays"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: mob ? 10 : 14,
        display: "flex",
        flexDirection: "column",
        gap: mob ? 5 : 6
      }
    }, p.features.map(function (f, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          display: "flex",
          alignItems: "flex-start",
          gap: 5,
          fontSize: mob ? 11 : 12,
          color: "#555",
          lineHeight: 1.3
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: p.color,
          fontWeight: 700,
          fontSize: 13,
          lineHeight: 1.3,
          flexShrink: 0
        }
      }, "\u2713"), f);
    })));
  })), /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      onUpgrade(selectedPlan);
    },
    style: {
      width: "100%",
      padding: mob ? 14 : 16,
      borderRadius: mob ? 12 : 14,
      border: "none",
      background: selectedPlan === "hardware" ? "linear-gradient(135deg,#059669,#10b981)" : selectedPlan === "pro" ? "linear-gradient(135deg,#7c3aed,#a855f7)" : "linear-gradient(135deg,#2563eb,#3b82f6)",
      color: "white",
      fontSize: 16,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'DM Sans', sans-serif",
      boxShadow: "0 4px 20px " + (selectedPlan === "hardware" ? "rgba(5,150,105,0.3)" : selectedPlan === "pro" ? "rgba(124,58,237,0.3)" : "rgba(37,99,235,0.3)")
    }
  }, selectedPlan === "hardware" ? "Get Pro + Hardware — $49/mo" : selectedPlan === "pro" ? "Upgrade to Pro — $29/mo" : "Upgrade to Plus — $9/mo"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      width: "100%",
      marginTop: 8,
      padding: 12,
      background: "none",
      border: "none",
      color: "#999",
      fontSize: 13,
      cursor: "pointer"
    }
  }, "Maybe later")));
}

/* ══════════════════════════════════════════════════════════════════════════════ */
/* ── LANDING PAGE                                                           ── */
/* ══════════════════════════════════════════════════════════════════════════════ */
function LandingPage({
  onGetStarted,
  onAdmin
}) {
  var [demoCount, setDemoCount] = useState(847);
  var [activeReview, setActiveReview] = useState(0);
  var [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(function () {
    function onResize() {
      setW(window.innerWidth);
    }
    window.addEventListener("resize", onResize);
    return function () {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  useEffect(function () {
    var iv = setInterval(function () {
      setDemoCount(function (c) {
        return c + 1;
      });
    }, 4000);
    return function () {
      clearInterval(iv);
    };
  }, []);
  useEffect(function () {
    var iv = setInterval(function () {
      setActiveReview(function (r) {
        return (r + 1) % 3;
      });
    }, 4500);
    return function () {
      clearInterval(iv);
    };
  }, []);
  var mob = w < 700;
  var tab = w < 960;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "#faf8f5",
      fontFamily: "'DM Sans', sans-serif"
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      padding: mob ? "14px 18px" : "18px 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(LogoIcon, {
    size: 34
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 19,
      fontWeight: 700,
      color: "#1a1a2e"
    }
  }, "ReviewBoost")), /*#__PURE__*/React.createElement("button", {
    onClick: onGetStarted,
    style: {
      padding: mob ? "8px 16px" : "10px 22px",
      borderRadius: 10,
      background: "#1a1a2e",
      color: "white",
      border: "none",
      fontSize: mob ? 13 : 14,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "Get Started Free")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: "0 auto",
      padding: mob ? "40px 20px 36px" : "72px 40px 60px",
      display: mob ? "flex" : "grid",
      flexDirection: mob ? "column" : undefined,
      gridTemplateColumns: mob ? undefined : "1fr 1fr",
      gap: mob ? 32 : 64,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: mob ? 34 : 50,
      fontWeight: 800,
      color: "#1a1a2e",
      lineHeight: 1.08,
      letterSpacing: "-0.035em",
      marginBottom: mob ? 14 : 20
    }
  }, "Turn every visit into a", " ", /*#__PURE__*/React.createElement("span", {
    style: {
      background: "linear-gradient(135deg,#FBBC04,#EA4335)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }
  }, "5-star review.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 14px",
      borderRadius: 20,
      background: "#EA433514",
      border: "1px solid #EA433540",
      fontSize: mob ? 12 : 13,
      fontWeight: 700,
      color: "#c0392b",
      marginBottom: mob ? 14 : 18
    }
  }, /*#__PURE__*/React.createElement(GoogleG, {
    size: 16
  }), " The rules have changed \u2014 is your business ready?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: mob ? 15 : 18,
      color: "#6b6580",
      lineHeight: 1.65,
      maxWidth: 480,
      marginBottom: mob ? 16 : 22
    }
  }, "91% of consumers read Google reviews before visiting your business. Google\u2019s AI now summarizes your reviews to decide who gets recommended. If your reviews aren\u2019t fresh, detailed, and 4.8+ stars \u2014 you\u2019re invisible."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: mob ? "1fr" : "1fr 1fr",
      gap: mob ? 8 : 10,
      marginBottom: mob ? 18 : 24,
      maxWidth: mob ? "100%" : 480
    }
  }, [{stat:"+28%", text:"higher conversions for 4.5+ star businesses", color:"#22c55e", bg:"#22c55e10", border:"#22c55e30"}, {stat:"3 mo", text:"Google ignores reviews older than 3 months", color:"#EA4335", bg:"#EA433510", border:"#EA433530"}, {stat:"4.8\u2605", text:"the new minimum to rank in Google\u2019s Local 3-Pack", color:"#FBBC04", bg:"#FBBC0410", border:"#FBBC0430"}, {stat:"89%", text:"of consumers expect you to respond to reviews", color:"#3b82f6", bg:"#3b82f610", border:"#3b82f630"}].map(function(s, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: mob ? 10 : 12,
        padding: mob ? "10px 12px" : "12px 14px",
        borderRadius: 12,
        background: s.bg,
        border: "1.5px solid " + s.border
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: mob ? 18 : 22,
        fontWeight: 800,
        color: s.color,
        lineHeight: 1,
        flexShrink: 0,
        minWidth: mob ? 44 : 52,
        textAlign: "center"
      }
    }, s.stat), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: mob ? 11 : 12,
        color: "#6b6580",
        lineHeight: 1.35,
        fontWeight: 500
      }
    }, s.text));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onGetStarted,
    style: {
      padding: mob ? "13px 24px" : "15px 32px",
      borderRadius: 12,
      border: "none",
      background: "linear-gradient(135deg,#1a1a2e,#2d2b55)",
      color: "white",
      fontSize: mob ? 15 : 16,
      fontWeight: 700,
      cursor: "pointer",
      boxShadow: "0 4px 20px rgba(26,26,46,0.3)",
      width: mob ? "100%" : "auto"
    }
  }, "Set Up Free Display \u2192"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: mob ? 14 : 14,
      color: "#999",
      width: mob ? "100%" : "auto",
      textAlign: mob ? "center" : "left"
    }
  }, "Free forever \xB7 Plus $9/mo \xB7 Pro $29/mo"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 auto",
      maxWidth: mob ? "100%" : 600,
      background: "linear-gradient(180deg, #2a2a3a, #1a1a2e)",
      borderRadius: mob ? 14 : 22,
      padding: mob ? "6px 14px" : "10px 20px",
      boxShadow: "0 24px 80px rgba(0,0,0,0.25), 0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "50%",
      right: mob ? 4 : 7,
      transform: "translateY(-50%)",
      width: mob ? 5 : 7,
      height: mob ? 5 : 7,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.03)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 1,
      borderRadius: "22px 22px 0 0",
      background: "rgba(255,255,255,0.06)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#0f0f1a,#1a1a2e)",
      borderRadius: mob ? 8 : 14,
      padding: mob ? "10px" : "18px 22px 14px",
      fontFamily: "'DM Sans', sans-serif",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: mob ? 6 : 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.92)",
      borderRadius: mob ? 5 : 8,
      padding: mob ? "3px 7px" : "5px 10px",
      display: "flex",
      alignItems: "center",
      gap: mob ? 3 : 6,
      marginBottom: mob ? 4 : 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: mob ? 14 : 22,
      height: mob ? 14 : 22,
      borderRadius: mob ? 3 : 5,
      background: "#e8dfd3",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: mob ? 6 : 9,
      fontWeight: 800,
      color: "#666"
    }
  }, "El"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: mob ? 7 : 11,
      fontWeight: 800,
      color: "#1a1a2e"
    }
  }, "Element Longevity")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: mob ? 5 : 8,
      color: "rgba(255,255,255,0.3)"
    }
  }, "777 Boyd Ave, Traverse City, MI 49686")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: mob ? 6 : 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: mob ? 3 : 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: mob ? 4 : 8
    }
  }, SOCIALS.map(function (p, i) {
    var counts = ["4,169", "4,762", "1,025"];
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: mob ? 3 : 5,
        background: "rgba(255,255,255,0.06)",
        borderRadius: mob ? 6 : 10,
        padding: mob ? "3px 6px" : "6px 10px",
        border: "1px solid rgba(255,255,255,0.08)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: mob ? 12 : 18,
        height: mob ? 12 : 18,
        borderRadius: mob ? 3 : 5,
        background: p.grad,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(SocialSvg, {
      id: p.id,
      size: mob ? 7 : 10
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: mob ? 8 : 12,
        fontWeight: 800,
        color: "white"
      }
    }, counts[i]));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.06)",
      borderRadius: mob ? 6 : 10,
      padding: mob ? "5px 6px" : "8px 10px",
      textAlign: "center",
      flexShrink: 0,
      border: "1px solid rgba(255,255,255,0.08)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: mob ? 20 : 32,
      height: mob ? 20 : 32,
      background: "white",
      borderRadius: mob ? 3 : 5,
      padding: 2,
      margin: "0 auto 3px"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "1",
    y: "1",
    width: "8",
    height: "8",
    rx: "1",
    fill: "#1a1a2e"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "4",
    height: "4",
    rx: "0.5",
    fill: "white"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "15",
    y: "1",
    width: "8",
    height: "8",
    rx: "1",
    fill: "#1a1a2e"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "17",
    y: "3",
    width: "4",
    height: "4",
    rx: "0.5",
    fill: "white"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "1",
    y: "15",
    width: "8",
    height: "8",
    rx: "1",
    fill: "#1a1a2e"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "17",
    width: "4",
    height: "4",
    rx: "0.5",
    fill: "white"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "5",
    width: "2",
    height: "4",
    fill: "#1a1a2e"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13",
    y: "11",
    width: "4",
    height: "2",
    fill: "#1a1a2e"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "15",
    width: "2",
    height: "4",
    fill: "#1a1a2e"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "17",
    y: "13",
    width: "4",
    height: "4",
    fill: "#1a1a2e"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: mob ? 5 : 8,
      fontWeight: 700,
      color: "white",
      marginBottom: mob ? 2 : 3
    }
  }, "Follow Us"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: mob ? 2 : 4,
      justifyContent: "center"
    }
  }, SOCIALS.map(function (p) {
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      style: {
        width: mob ? 10 : 16,
        height: mob ? 10 : 16,
        borderRadius: mob ? 3 : 5,
        background: p.grad,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(SocialSvg, {
      id: p.id,
      size: mob ? 6 : 9
    }));
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: mob ? 4 : 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: mob ? 5 : 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement(StarSvg, {
    size: mob ? 8 : 14
  }), /*#__PURE__*/React.createElement(StarSvg, {
    size: mob ? 8 : 14
  }), /*#__PURE__*/React.createElement(StarSvg, {
    size: mob ? 8 : 14
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: mob ? 13 : 22,
      fontWeight: 800,
      color: "white",
      textTransform: "uppercase"
    }
  }, "OUR CUSTOMERS LOVE US!"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement(StarSvg, {
    size: mob ? 8 : 14
  }), /*#__PURE__*/React.createElement(StarSvg, {
    size: mob ? 8 : 14
  }), /*#__PURE__*/React.createElement(StarSvg, {
    size: mob ? 8 : 14
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: mob ? 5 : 10,
      marginBottom: mob ? 8 : 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 1
    }
  }, /*#__PURE__*/React.createElement(StarSvg, {
    size: mob ? 7 : 11
  }), /*#__PURE__*/React.createElement(StarSvg, {
    size: mob ? 7 : 11
  }), /*#__PURE__*/React.createElement(StarSvg, {
    size: mob ? 7 : 11
  }), /*#__PURE__*/React.createElement(StarSvg, {
    size: mob ? 7 : 11
  }), /*#__PURE__*/React.createElement(StarSvg, {
    size: mob ? 7 : 11
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: mob ? 11 : 18,
      fontWeight: 800,
      color: "white",
      fontFamily: "'Bricolage Grotesque', sans-serif"
    }
  }, "4.8"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: mob ? 7 : 11,
      color: "rgba(255,255,255,0.4)",
      fontWeight: 600
    }
  }, "190 Google Reviews"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      padding: mob ? "2px 7px" : "4px 12px",
      borderRadius: 14,
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.1)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: mob ? 4 : 6,
      height: mob ? 4 : 6,
      borderRadius: "50%",
      background: "#22c55e"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: mob ? 6 : 10,
      fontWeight: 600,
      color: "white"
    }
  }, "New follower!"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: mob ? 6 : 12,
      marginBottom: mob ? 8 : 14
    }
  }, [{
    name: "Sarah Mitchell",
    time: "2 days ago",
    color: "#EA4335",
    letter: "S",
    text: "Absolutely wonderful experience! The staff was incredibly friendly and professional. Highly recommend."
  }, {
    name: "James Kim",
    time: "3 days ago",
    color: "#7c3aed",
    letter: "J",
    text: "Best experience I've had. Clean facility, short wait time, and the doctor was very thorough."
  }, {
    name: "Maria Lopez",
    time: "5 days ago",
    color: "#E91E8C",
    letter: "M",
    text: "So glad I found this place! The team went above and beyond. Will definitely be coming back."
  }, {
    name: "David Roberts",
    time: "1 week ago",
    color: "#9333ea",
    letter: "D",
    text: "Five stars isn't enough. From the moment I walked in, I felt welcomed. Truly exceptional."
  }].map(function (r, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: "rgba(255,255,255,0.04)",
        borderRadius: mob ? 8 : 14,
        padding: mob ? "8px 10px" : "14px 16px",
        border: "1px solid rgba(255,255,255,0.06)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: mob ? 5 : 8,
        marginBottom: mob ? 4 : 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: mob ? 18 : 28,
        height: mob ? 18 : 28,
        borderRadius: "50%",
        flexShrink: 0,
        background: r.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: mob ? 8 : 12,
        fontWeight: 700,
        color: "white"
      }
    }, r.letter), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: mob ? 8 : 12,
        fontWeight: 700,
        color: "white"
      }
    }, r.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: mob ? 6 : 9,
        color: "rgba(255,255,255,0.3)"
      }
    }, r.time)), /*#__PURE__*/React.createElement(GoogleG, {
      size: mob ? 12 : 18
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: mob ? 1 : 2,
        marginBottom: mob ? 4 : 6
      }
    }, /*#__PURE__*/React.createElement(StarSvg, {
      size: mob ? 7 : 10
    }), /*#__PURE__*/React.createElement(StarSvg, {
      size: mob ? 7 : 10
    }), /*#__PURE__*/React.createElement(StarSvg, {
      size: mob ? 7 : 10
    }), /*#__PURE__*/React.createElement(StarSvg, {
      size: mob ? 7 : 10
    }), /*#__PURE__*/React.createElement(StarSvg, {
      size: mob ? 7 : 10
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: mob ? 6 : 10,
        color: "rgba(255,255,255,0.5)",
        lineHeight: 1.5
      }
    }, "\"", r.text, "\""));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: mob ? 8 : 16,
      background: "linear-gradient(135deg, rgba(251,188,4,0.1), rgba(255,255,255,0.02))",
      borderRadius: mob ? 8 : 14,
      padding: mob ? "8px 10px" : "12px 18px",
      border: "1px solid rgba(251,188,4,0.15)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: mob ? 28 : 48,
      height: mob ? 28 : 48,
      background: "white",
      borderRadius: mob ? 5 : 8,
      padding: mob ? 2 : 4,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "1",
    y: "1",
    width: "8",
    height: "8",
    rx: "1",
    fill: "#1a1a2e"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "4",
    height: "4",
    rx: "0.5",
    fill: "white"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "15",
    y: "1",
    width: "8",
    height: "8",
    rx: "1",
    fill: "#1a1a2e"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "17",
    y: "3",
    width: "4",
    height: "4",
    rx: "0.5",
    fill: "white"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "1",
    y: "15",
    width: "8",
    height: "8",
    rx: "1",
    fill: "#1a1a2e"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "17",
    width: "4",
    height: "4",
    rx: "0.5",
    fill: "white"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "1",
    width: "2",
    height: "2",
    fill: "#1a1a2e"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "5",
    width: "2",
    height: "2",
    fill: "#1a1a2e"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "11",
    width: "2",
    height: "2",
    fill: "#1a1a2e"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "15",
    y: "11",
    width: "2",
    height: "2",
    fill: "#1a1a2e"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "19",
    y: "11",
    width: "2",
    height: "2",
    fill: "#1a1a2e"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "15",
    width: "2",
    height: "2",
    fill: "#1a1a2e"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "15",
    y: "15",
    width: "4",
    height: "4",
    fill: "#1a1a2e"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "21",
    y: "15",
    width: "2",
    height: "2",
    fill: "#1a1a2e"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "19",
    width: "2",
    height: "4",
    fill: "#1a1a2e"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "21",
    y: "19",
    width: "2",
    height: "4",
    fill: "#1a1a2e"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: mob ? 8 : 13,
      fontWeight: 800,
      color: "white"
    }
  }, "Loved your visit? Please leave us a Google review!"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: mob ? 6 : 9,
      color: "rgba(255,255,255,0.4)",
      lineHeight: 1.5,
      marginTop: mob ? 1 : 3
    }
  }, "Scan the QR code or search for us on Google. It really helps our independently owned business and only takes a minute. Thank you! ", "\u2B50")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: mob ? 12 : 18,
      fontSize: mob ? 11 : 13,
      color: "#999",
      fontWeight: 500,
      fontStyle: "italic"
    }
  }, "ReviewBoost in dark mode on an iPad at your front desk"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderTop: "1px solid #eee8dd",
      padding: mob ? "40px 20px" : "64px 40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: mob ? 26 : 34,
      fontWeight: 800,
      color: "#1a1a2e",
      textAlign: "center",
      marginBottom: mob ? 10 : 16
    }
  }, "Everything on one screen"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: mob ? 14 : 16,
      color: "#888",
      textAlign: "center",
      maxWidth: 540,
      margin: mob ? "0 auto 28px" : "0 auto 48px"
    }
  }, "Display on a tablet at the counter or a TV on the wall \u2014 your choice."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: mob ? "1fr" : tab ? "1fr 1fr" : "repeat(4, 1fr)",
      gap: mob ? 12 : 20
    }
  }, [{
    icon: "\u2B50",
    title: "Live Review Counter",
    desc: "A real-time flip counter that climbs as new Google reviews come in. Customers love watching it move."
  }, {
    icon: "\uD83D\uDCAC",
    title: "5-Star Showcase",
    desc: "Automatically display only your best reviews in a sliding carousel. Filter to 5-star only with Pro.",
    pro: true
  }, {
    icon: "\uD83D\uDCF1",
    title: "QR to Review",
    desc: "One scan takes customers straight to your Google Review page. No searching, no friction."
  }, {
    icon: "\uD83D\uDCCA",
    title: "Live Follower Counts",
    desc: "Show your Instagram, Facebook, and TikTok follower counts updating in real-time.",
    pro: true
  }].map(function (f, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: "#faf8f5",
        borderRadius: 18,
        padding: mob ? "20px 18px" : "28px 22px",
        border: "1px solid #eee8dd",
        position: "relative"
      }
    }, f.pro && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 14,
        right: 14
      }
    }, /*#__PURE__*/React.createElement(ProBadge, {
      small: true
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: mob ? 26 : 32,
        marginBottom: mob ? 8 : 14
      }
    }, f.icon), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: mob ? 15 : 16,
        fontWeight: 700,
        color: "#1a1a2e",
        marginBottom: 8
      }
    }, f.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "#888",
        lineHeight: 1.6
      }
    }, f.desc));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: mob ? "40px 20px" : "64px 40px",
      background: "linear-gradient(160deg, #1a1a2e, #2d2b55)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 960,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: mob ? 28 : 44
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 24px",
      borderRadius: 24,
      background: "rgba(251,188,4,0.15)",
      border: "1px solid rgba(251,188,4,0.3)",
      fontSize: mob ? 18 : 24,
      fontWeight: 800,
      color: "#FBBC04",
      marginBottom: mob ? 16 : 24
    }
  }, /*#__PURE__*/React.createElement(GoogleG, {
    size: mob ? 22 : 28
  }), " The data is clear"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: mob ? 26 : 38,
      fontWeight: 800,
      color: "white",
      lineHeight: 1.15,
      marginBottom: mob ? 10 : 14
    }
  }, "Google reviews directly impact", /*#__PURE__*/React.createElement("br", null), "your bottom line"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: mob ? 14 : 16,
      color: "rgba(255,255,255,0.5)",
      maxWidth: 600,
      margin: "0 auto"
    }
  }, "In 2026, Google\u2019s AI uses your reviews to decide who gets recommended. Here\u2019s what that means for your revenue.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)",
      gap: mob ? 12 : 16,
      marginBottom: mob ? 20 : 28
    }
  }, [{
    stat: "+28%",
    label: "Higher conversions",
    desc: "4.5+ star businesses convert at 28% higher rates than lower-rated competitors in 2026.",
    color: "#22c55e"
  }, {
    stat: "91%",
    label: "Read reviews first",
    desc: "91% of consumers now read Google reviews before visiting a local business \u2014 up from 81% just two years ago.",
    color: "#FBBC04"
  }, {
    stat: "89%",
    label: "Expect a response",
    desc: "89% of consumers expect businesses to respond to reviews. A professional response often builds more trust than a perfect rating.",
    color: "#3b82f6"
  }].map(function (s, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: "rgba(255,255,255,0.04)",
        borderRadius: mob ? 16 : 20,
        padding: mob ? "22px 20px" : "28px 24px",
        border: "1px solid rgba(255,255,255,0.06)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: mob ? 36 : 44,
        fontWeight: 800,
        color: s.color,
        lineHeight: 1,
        marginBottom: mob ? 6 : 10
      }
    }, s.stat), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: mob ? 15 : 17,
        fontWeight: 700,
        color: "white",
        marginBottom: 6
      }
    }, s.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: mob ? 12 : 13,
        color: "rgba(255,255,255,0.4)",
        lineHeight: 1.5
      }
    }, s.desc));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4, 1fr)",
      gap: mob ? 10 : 14
    }
  }, [{
    stat: "4.8+ stars",
    desc: "The new minimum to compete in Google\u2019s Local 3-Pack \u2014 4.2\u20134.6 is no longer enough in 2026",
    icon: "\u2B50"
  }, {
    stat: "3 months",
    desc: "Reviews must be fresh or Google treats your business as inactive. Recency now outweighs total count",
    icon: "\uD83D\uDD04"
  }, {
    stat: "AI-powered",
    desc: "Google\u2019s AI Overviews now summarize your reviews to decide who gets recommended to searchers",
    icon: "\uD83E\uDD16"
  }, {
    stat: "108%",
    desc: "Businesses with 25+ recent reviews earn 108% more revenue on average",
    icon: "\uD83D\uDCC8"
  }].map(function (s, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: "rgba(255,255,255,0.03)",
        borderRadius: mob ? 12 : 14,
        padding: mob ? "16px 14px" : "20px 18px",
        border: "1px solid rgba(255,255,255,0.04)",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: mob ? 20 : 24,
        marginBottom: mob ? 6 : 8
      }
    }, s.icon), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: mob ? 20 : 24,
        fontWeight: 800,
        color: "white",
        marginBottom: 4
      }
    }, s.stat), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: mob ? 10 : 11,
        color: "rgba(255,255,255,0.35)",
        lineHeight: 1.4
      }
    }, s.desc));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: mob ? 20 : 28,
      display: "grid",
      gridTemplateColumns: mob ? "1fr" : "1fr 1fr",
      gap: mob ? 12 : 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.04)",
      borderRadius: mob ? 14 : 18,
      padding: mob ? "20px 18px" : "24px 22px",
      border: "1px solid rgba(255,255,255,0.06)",
      display: "flex",
      gap: mob ? 12 : 16,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: mob ? 36 : 44,
      height: mob ? 36 : 44,
      borderRadius: mob ? 10 : 12,
      background: "rgba(59,130,246,0.12)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: mob ? 18 : 22,
      flexShrink: 0
    }
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: mob ? 15 : 17,
      fontWeight: 700,
      color: "white",
      marginBottom: 6
    }
  }, "AI Search & the Local 3-Pack"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: mob ? 12 : 13,
      color: "rgba(255,255,255,0.4)",
      lineHeight: 1.55
    }
  }, "Google\u2019s AI now weighs recency, frequency, and context of your reviews to decide who appears in the Local 3-Pack and AI Overviews. A steady flow of detailed reviews mentioning specific services ranks you higher than hundreds of old, generic ones."))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.04)",
      borderRadius: mob ? 14 : 18,
      padding: mob ? "20px 18px" : "24px 22px",
      border: "1px solid rgba(255,255,255,0.06)",
      display: "flex",
      gap: mob ? 12 : 16,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: mob ? 36 : 44,
      height: mob ? 36 : 44,
      borderRadius: mob ? 10 : 12,
      background: "rgba(251,188,4,0.12)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: mob ? 18 : 22,
      flexShrink: 0
    }
  }, "\uD83D\uDEE1\uFE0F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: mob ? 15 : 17,
      fontWeight: 700,
      color: "white",
      marginBottom: 6
    }
  }, "Search Justifications"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: mob ? 12 : 13,
      color: "rgba(255,255,255,0.4)",
      lineHeight: 1.55
    }
  }, "When customers search for specific features, Google pulls phrases directly from your reviews to justify showing your business. A review mentioning \u201cfast AC repair\u201d or \u201cgreat vegan options\u201d can rank you above competitors with more reviews.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: mob ? 24 : 36
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onGetStarted,
    style: {
      padding: mob ? "13px 24px" : "15px 32px",
      borderRadius: 12,
      border: "none",
      background: "linear-gradient(135deg,#FBBC04,#EA4335)",
      color: "white",
      fontSize: mob ? 15 : 16,
      fontWeight: 700,
      cursor: "pointer",
      boxShadow: "0 4px 20px rgba(234,67,53,0.3)",
      width: mob ? "100%" : "auto"
    }
  }, "Start Getting More Reviews \u2192"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: mob ? 11 : 12,
      color: "rgba(255,255,255,0.3)",
      marginTop: 8
    }
  }, "Free to set up. No credit card required.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: mob ? "40px 20px" : "64px 40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 900,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: mob ? 26 : 34,
      fontWeight: 800,
      color: "#1a1a2e",
      textAlign: "center",
      marginBottom: mob ? 28 : 48
    }
  }, "Set up in 30 seconds"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)",
      gap: mob ? 12 : 24
    }
  }, [{
    step: "01",
    title: "Find your business",
    desc: "Search by name — we find your Google listing and pull your reviews, rating, and count instantly."
  }, {
    step: "02",
    title: "Choose your display",
    desc: "Tablet at the counter or TV on the wall. Pick what fits your space and we optimize the layout."
  }, {
    step: "03",
    title: "Watch reviews grow",
    desc: "Customers see your reviews, scan the QR to leave theirs, and your counter climbs live."
  }].map(function (s, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: "white",
        borderRadius: 18,
        padding: mob ? "20px 18px" : "28px 24px",
        border: "1px solid #eee8dd"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: mob ? 32 : 40,
        fontWeight: 800,
        color: "#e8e0d4",
        marginBottom: mob ? 8 : 12,
        lineHeight: 1
      }
    }, s.step), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: mob ? 16 : 18,
        fontWeight: 700,
        color: "#1a1a2e",
        marginBottom: 8
      }
    }, s.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "#888",
        lineHeight: 1.6
      }
    }, s.desc));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: mob ? "36px 20px 16px" : "48px 40px 24px",
      background: "linear-gradient(180deg, #f0ebe3, #faf8f5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: mob ? 26 : 34,
      fontWeight: 800,
      color: "#1a1a2e",
      textAlign: "center",
      marginBottom: 8
    }
  }, "Simple pricing"), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      color: "#888",
      fontSize: mob ? 14 : 15,
      marginBottom: mob ? 24 : 36
    }
  }, "Start free. Upgrade when you're ready."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: mob ? "1fr" : "repeat(5, 1fr)",
      gap: mob ? 14 : 10
    }
  }, [{
    label: "Free",
    price: "$0",
    period: "forever",
    sub: "1 location · unlimited displays",
    color: "#888",
    features: ["Tablet counter display", "Live review counter", "Google Review QR code", "Ad-supported"],
    excluded: ["Custom logo", "Dark mode", "Social followers", "TV display mode", "Analytics"]
  }, {
    label: "Plus",
    price: "$9",
    period: "/mo",
    sub: "1 location · unlimited displays",
    color: "#2563eb",
    features: ["Remove branding + ads", "Upload your logo", "Dark mode theme", "Basic analytics"],
    excluded: ["Social followers", "TV display mode", "Review routing"]
  }, {
    label: "Pro",
    price: "$29",
    period: "/mo",
    sub: "Up to 3 locations · unlimited displays",
    color: "#7c3aed",
    badge: "MOST POPULAR",
    features: ["Everything in Plus", "Smart review routing (happy→Google, unhappy→feedback)", "AI-drafted review responses", "Social followers + Follow Us QR", "TV / wall mount display mode", "Competitor tracking (rating & review count)"],
    excluded: []
  }, {
    label: "Pro + Hardware",
    price: "$49",
    period: "/mo",
    sub: "Up to 3 locations · unlimited displays",
    color: "#059669",
    badge: "ALL-IN-ONE",
    features: ["Everything in Pro", "Pre-configured tablet", "Counter stand included", "White-glove setup", "Free replacement", "Zero upfront cost"],
    excluded: []
  }, {
    label: "Enterprise",
    price: "Custom",
    period: "",
    sub: "Unlimited locations & displays",
    color: "#1a1a2e",
    badge: "10+ LOCATIONS",
    features: ["Everything in Pro", "Volume pricing ($15-25/loc)", "Dedicated account manager", "Org-level analytics", "Bulk device management", "Custom integrations", "Annual billing options"],
    excluded: []
  }].map(function (t, i) {
    var isEnterprise = t.label === "Enterprise";
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: isEnterprise ? "linear-gradient(160deg,#1a1a2e,#2d2b55)" : "white",
        borderRadius: 20,
        padding: mob ? "22px 20px" : "24px 18px",
        position: "relative",
        border: t.badge ? "2px solid " + (isEnterprise ? "#1a1a2e" : t.color + "44") : "1px solid #eee8dd"
      }
    }, t.badge && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: -10,
        left: "50%",
        transform: "translateX(-50%)",
        padding: "3px 12px",
        borderRadius: 6,
        fontSize: 10,
        fontWeight: 800,
        color: "white",
        whiteSpace: "nowrap",
        background: isEnterprise ? "linear-gradient(135deg,#1a1a2e,#444)" : "linear-gradient(135deg,#7c3aed,#a855f7)"
      }
    }, t.badge), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: mob ? 13 : 11,
        fontWeight: 700,
        color: isEnterprise ? "#FBBC04" : t.color,
        textTransform: "uppercase",
        marginBottom: 8
      }
    }, t.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: mob ? 32 : 32,
        fontWeight: 800,
        color: isEnterprise ? "white" : "#1a1a2e",
        lineHeight: 1
      }
    }, t.price, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: mob ? 15 : 13,
        fontWeight: 500,
        color: isEnterprise ? "rgba(255,255,255,0.5)" : "#888"
      }
    }, t.period)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: mob ? 13 : 11,
        color: isEnterprise ? "rgba(255,255,255,0.4)" : "#bbb",
        marginBottom: 14
      }
    }, t.sub), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: mob ? 9 : 7
      }
    }, t.features.map(function (f, j) {
      return /*#__PURE__*/React.createElement("div", {
        key: j,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: mob ? 15 : 12,
          color: isEnterprise ? "rgba(255,255,255,0.8)" : "#555"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: isEnterprise ? "#22c55e" : t.color,
          fontWeight: 700,
          fontSize: mob ? 15 : 12
        }
      }, "\u2713"), " ", f);
    }), (t.excluded || []).map(function (f, j) {
      return /*#__PURE__*/React.createElement("div", {
        key: "x" + j,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: mob ? 15 : 12,
          color: "#ccc"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: "#ddd",
          fontWeight: 700,
          fontSize: mob ? 15 : 12
        }
      }, "\u2717"), /*#__PURE__*/React.createElement("span", {
        style: {
          textDecoration: "line-through"
        }
      }, f));
    })), isEnterprise && /*#__PURE__*/React.createElement("button", {
      style: {
        marginTop: 16,
        width: "100%",
        padding: "10px 0",
        borderRadius: 10,
        border: "1.5px solid rgba(255,255,255,0.2)",
        background: "transparent",
        color: "white",
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer"
      }
    }, "Contact Sales \u2192"));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: mob ? "24px 20px 48px" : "32px 40px 72px",
      background: "#faf8f5"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onGetStarted,
    style: {
      padding: mob ? "14px 28px" : "16px 40px",
      borderRadius: 14,
      border: "none",
      background: "linear-gradient(135deg,#1a1a2e,#2d2b55)",
      color: "white",
      fontSize: mob ? 15 : 17,
      fontWeight: 700,
      cursor: "pointer",
      boxShadow: "0 4px 20px rgba(26,26,46,0.3)",
      width: mob ? "100%" : "auto"
    }
  }, "Get Started \u2014 It's Free \u2192")));
}

/* ══════════════════════════════════════════════════════════════════════════════ */
/* ── SETUP WIZARD                                                           ── */
/* ══════════════════════════════════════════════════════════════════════════════ */
function SetupWizard({
  onComplete
}) {
  var [step, setStep] = useState(1);
  var [search, setSearch] = useState("");
  var [results, setResults] = useState([]);
  var [searching, setSearching] = useState(false);
  var [selected, setSelected] = useState(null);
  var [confirmed, setConfirmed] = useState(false);
  var [displayMode, setDisplayMode] = useState(null);
  var [minStars, setMinStars] = useState(0);
  var [theme, setTheme] = useState("light");
  var [socialConn, setSocialConn] = useState({});
  var [socialHandles, setSocialHandles] = useState({});
  var [connecting, setConnecting] = useState(null);
  var [launching, setLaunching] = useState(false);
  var [logoUrl, setLogoUrl] = useState(null);
  function handleLogoUpload(e) {
    var file = e.target.files && e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (ev) {
        setLogoUrl(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
  useEffect(function () {
    if (search.length < 2) {
      setResults([]);
      return;
    }
    setSearching(true);
    var t = setTimeout(function () {
      var q = search.toLowerCase();
      var local = MOCK_PLACES.filter(function (p) {
        return p.name.toLowerCase().includes(q) || p.address.toLowerCase().includes(q);
      });
      fetch("/api/places?q=" + encodeURIComponent(search)).then(function (r) {
        return r.json();
      }).then(function (rows) {
        setResults(rows && rows.length ? rows : local);
        setSearching(false);
      }).catch(function () {
        setResults(local);
        setSearching(false);
      });
    }, 280);
    return function () {
      clearTimeout(t);
    };
  }, [search]);
  function selectBusiness(place) {
    setSelected(place);
    setResults([]);
    setSearch("");
  }
  function simulateConnect(id) {
    setConnecting(id);
    setTimeout(function () {
      setConnecting(null);
      setSocialConn(function (prev) {
        var next = Object.assign({}, prev);
        next[id] = true;
        return next;
      });
    }, 1200);
  }
  function launch() {
    setLaunching(true);
    setTimeout(function () {
      onComplete({
        businessName: selected.name,
        placeId: selected.placeId,
        address: selected.address || "",
        rating: selected.rating,
        reviewCount: selected.reviewCount,
        displayMode: displayMode,
        minStars: minStars,
        theme: theme,
        socialConnected: socialConn,
        socialHandles: socialHandles,
        logoUrl: logoUrl
      });
    }, 1200);
  }
  var stepLabels = ["Find Business", "Display", "Customize", "Launch"];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "linear-gradient(160deg,#faf8f5,#f0ebe3,#e8dfd3)",
      fontFamily: "'DM Sans', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(LogoIcon, {
    size: 34
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 19,
      fontWeight: 700,
      color: "#1a1a2e"
    }
  }, "ReviewBoost")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      marginBottom: 40
    }
  }, stepLabels.map(function (label, i) {
    var n = i + 1;
    var active = step === n;
    var done = step > n;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: done ? "#22c55e" : active ? "#1a1a2e" : "#e8e0d4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        fontWeight: 700,
        color: done || active ? "white" : "#999"
      }
    }, done ? "✓" : n), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: active ? "#1a1a2e" : "#bbb"
      }
    }, label)), i < 3 && /*#__PURE__*/React.createElement("div", {
      style: {
        width: 48,
        height: 2,
        background: done ? "#22c55e" : "#e8e0d4",
        margin: "0 8px",
        marginBottom: 20
      }
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 560
    }
  }, step === 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 30,
      fontWeight: 800,
      color: "#1a1a2e",
      marginBottom: 8
    }
  }, "Find your business"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#888",
      fontSize: 15,
      marginBottom: 32
    }
  }, "Search by name \u2014 we pull your reviews from Google automatically"), !selected ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: search,
    onChange: function (e) {
      setSearch(e.target.value);
    },
    placeholder: "Search your business name...",
    autoFocus: true,
    style: {
      width: "100%",
      padding: "16px 16px 16px 16px",
      fontSize: 16,
      border: "2px solid #e8e0d4",
      borderRadius: 16,
      outline: "none",
      background: "white",
      boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
      boxSizing: "border-box"
    }
  }), searching && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 16,
      top: "50%",
      transform: "translateY(-50%)",
      width: 18,
      height: 18,
      border: "2px solid #FBBC04",
      borderTopColor: "transparent",
      borderRadius: "50%",
      animation: "spin 0.6s linear infinite"
    }
  })), results.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 16,
      border: "1px solid #e8e0d4",
      boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
      overflow: "hidden",
      textAlign: "left"
    }
  }, results.map(function (place, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: place.placeId,
      onClick: function () {
        selectBusiness(place);
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "16px 20px",
        borderBottom: i < results.length - 1 ? "1px solid #f5f0ea" : "none",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 44,
        height: 44,
        borderRadius: 11,
        background: "linear-gradient(135deg,#4285F4,#34A853,#FBBC04,#EA4335)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(GoogleG, {
      size: 22
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: "#1a1a2e"
      }
    }, place.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#999",
        marginTop: 2
      }
    }, place.address)), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement(StarSvg, {
      size: 14
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: "#1a1a2e"
      }
    }, place.rating)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#999"
      }
    }, place.reviewCount, " reviews")));
  })), !search && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#bbb",
      fontSize: 13,
      marginTop: 20
    }
  }, "Try: \"Element Longevity\", \"Elev8 Climbing\", \"Filling Station\", or \"Rare Bird\"")) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 20,
      padding: "28px 24px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
      border: "2px solid #22c55e33",
      textAlign: "left",
      display: "flex",
      gap: 16,
      alignItems: "center",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 14,
      background: "linear-gradient(135deg,#4285F4,#34A853,#FBBC04,#EA4335)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(GoogleG, {
    size: 28
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 20,
      fontWeight: 800,
      color: "#1a1a2e",
      marginBottom: 4
    }
  }, selected.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#888",
      marginBottom: 8
    }
  }, selected.address), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Stars, {
    rating: selected.rating,
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "#1a1a2e"
    }
  }, selected.rating), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "#888"
    }
  }, selected.reviewCount, " reviews")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      setSelected(null);
      setSearch("");
      setConfirmed(false);
    },
    style: {
      flex: 1,
      padding: 12,
      borderRadius: 10,
      border: "1.5px solid #e8e0d4",
      background: "transparent",
      color: "#888",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "Change"), /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      setConfirmed(true);
      setStep(2);
    },
    style: {
      flex: 2,
      padding: 12,
      borderRadius: 10,
      border: "none",
      background: "linear-gradient(135deg,#1a1a2e,#2d2b55)",
      color: "white",
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer"
    }
  }, "Continue \u2192")))), step === 2 && confirmed && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 30,
      fontWeight: 800,
      color: "#1a1a2e",
      marginBottom: 8
    }
  }, "Choose your display"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#888",
      fontSize: 15,
      marginBottom: 32
    }
  }, "Where will customers see your reviews?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16,
      marginBottom: 32
    }
  }, [{
    id: "ipad",
    icon: "\uD83D\uDCF1",
    title: "Tablet",
    desc: "At the counter.",
    hasPro: false
  }, {
    id: "tv",
    icon: "ðŸ–¥️",
    title: "TV / Monitor",
    desc: "On the wall.",
    hasPro: true
  }].map(function (d) {
    var isSelected = displayMode === d.id;
    return /*#__PURE__*/React.createElement("div", {
      key: d.id,
      onClick: function () {
        setDisplayMode(d.id);
      },
      style: {
        padding: "28px 22px",
        borderRadius: 20,
        cursor: "pointer",
        textAlign: "left",
        border: "3px solid " + (isSelected ? "#1a1a2e" : "#e8e0d4"),
        background: isSelected ? "#1a1a2e08" : "white",
        position: "relative"
      }
    }, d.hasPro && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 12,
        right: 12
      }
    }, /*#__PURE__*/React.createElement(ProBadge, null)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 40,
        marginBottom: 12
      }
    }, d.icon), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 18,
        fontWeight: 800,
        color: "#1a1a2e",
        marginBottom: 4
      }
    }, d.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "#888",
        lineHeight: 1.5
      }
    }, d.desc));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      setStep(1);
    },
    style: {
      flex: 1,
      padding: 12,
      borderRadius: 10,
      border: "1.5px solid #e8e0d4",
      background: "transparent",
      color: "#888",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "\u2190 Back"), /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      if (displayMode) setStep(3);
    },
    style: {
      flex: 2,
      padding: 12,
      borderRadius: 10,
      border: "none",
      background: displayMode ? "linear-gradient(135deg,#1a1a2e,#2d2b55)" : "#e0dcd4",
      color: displayMode ? "white" : "#aaa",
      fontSize: 14,
      fontWeight: 700,
      cursor: displayMode ? "pointer" : "not-allowed"
    }
  }, "Continue \u2192"))), step === 3 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 30,
      fontWeight: 800,
      color: "#1a1a2e",
      marginBottom: 8
    }
  }, "Customize"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#888",
      fontSize: 15,
      marginBottom: 32
    }
  }, "Upload your logo, choose reviews, and add social media"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 20,
      padding: "28px 24px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
      marginBottom: 20,
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      fontSize: 12,
      fontWeight: 700,
      color: "#1a1a2e",
      textTransform: "uppercase"
    }
  }, "Your Logo"), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "2px 6px",
      borderRadius: 4,
      background: "#2563eb12",
      fontSize: 9,
      fontWeight: 800,
      color: "#2563eb"
    }
  }, "PLUS")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 72,
      height: 72,
      borderRadius: 16,
      flexShrink: 0,
      overflow: "hidden",
      background: logoUrl ? "transparent" : "#f5f0ea",
      border: logoUrl ? "2px solid #22c55e33" : "2px dashed #d4d0c8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, logoUrl ? /*#__PURE__*/React.createElement("img", {
    src: logoUrl,
    alt: "Logo",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "contain"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24
    }
  }, "\uD83C\uDFE2")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "8px 16px",
      borderRadius: 10,
      border: "1.5px solid #e8e0d4",
      background: "transparent",
      fontSize: 13,
      fontWeight: 600,
      color: "#666",
      cursor: "pointer"
    }
  }, logoUrl ? "Change Logo" : "Upload Logo", /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    onChange: handleLogoUpload,
    style: {
      display: "none"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#bbb",
      marginTop: 6
    }
  }, "PNG or JPG, shown on your display"), logoUrl && /*#__PURE__*/React.createElement("div", {
    onClick: function () {
      setLogoUrl(null);
    },
    style: {
      fontSize: 11,
      color: "#EA4335",
      cursor: "pointer",
      marginTop: 4,
      fontWeight: 600
    }
  }, "Remove"))), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      fontSize: 12,
      fontWeight: 700,
      color: "#1a1a2e",
      marginBottom: 12,
      textTransform: "uppercase"
    }
  }, "Theme"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 28
    }
  }, [{
    id: "light",
    label: "Light",
    preview: "linear-gradient(160deg,#faf8f5,#f0ebe3)",
    text: "#1a1a2e"
  }, {
    id: "dark",
    label: "Dark Mode",
    preview: "linear-gradient(135deg,#0f0f1a,#1a1a2e)",
    text: "#ffffff"
  }].map(function (t) {
    var isActive = theme === t.id;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: function () {
        setTheme(t.id);
      },
      style: {
        flex: 1,
        padding: 14,
        borderRadius: 12,
        cursor: "pointer",
        position: "relative",
        border: "2px solid " + (isActive ? "#1a1a2e" : "#e8e0d4"),
        background: "transparent",
        fontFamily: "'DM Sans', sans-serif"
      }
    }, t.id === "dark" && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: -6,
        right: -4
      }
    }, /*#__PURE__*/React.createElement(ProBadge, {
      small: true
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        height: 28,
        borderRadius: 6,
        marginBottom: 8,
        background: t.preview,
        border: "1px solid rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 16,
        height: 2,
        borderRadius: 1,
        background: t.text,
        opacity: 0.5
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        color: isActive ? "#1a1a2e" : "#999"
      }
    }, t.label));
  })), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      fontSize: 12,
      fontWeight: 700,
      color: "#1a1a2e",
      marginBottom: 12,
      textTransform: "uppercase"
    }
  }, "Show reviews with"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 28
    }
  }, [{
    n: 0,
    label: "All reviews"
  }, {
    n: 4,
    label: "4+ stars"
  }, {
    n: 5,
    label: "5 only"
  }].map(function (opt) {
    var isActive = minStars === opt.n;
    return /*#__PURE__*/React.createElement("button", {
      key: opt.n,
      onClick: function () {
        setMinStars(opt.n);
      },
      style: {
        flex: 1,
        padding: 12,
        borderRadius: 12,
        cursor: "pointer",
        position: "relative",
        border: "2px solid " + (isActive ? "#FBBC04" : "#e8e0d4"),
        background: isActive ? "#FBBC0412" : "transparent",
        fontFamily: "'DM Sans', sans-serif"
      }
    }, opt.n > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: -6,
        right: -4
      }
    }, /*#__PURE__*/React.createElement(ProBadge, {
      small: true
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        color: isActive ? "#B8860B" : "#999"
      }
    }, opt.label));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "#1a1a2e",
      textTransform: "uppercase"
    }
  }, "Social Media"), /*#__PURE__*/React.createElement(ProBadge, {
    small: true
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "#bbb"
    }
  }, "\u2014 optional")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "#888",
      marginBottom: 12,
      lineHeight: 1.5
    }
  }, "Display live follower counts and a \"Follow Us\" QR code that links to all your profiles."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, SOCIALS.map(function (p) {
    var connected = socialConn[p.id];
    var handle = socialHandles[p.id] || "";
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      style: {
        padding: "12px 14px",
        borderRadius: 12,
        background: connected ? p.color + "06" : "#faf8f5",
        border: "1.5px solid " + (connected ? p.color + "33" : "#e8e0d4")
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 32,
        height: 32,
        borderRadius: 8,
        background: p.grad,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(SocialSvg, {
      id: p.id,
      size: 16
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        fontSize: 14,
        fontWeight: 600,
        color: "#1a1a2e"
      }
    }, p.label), connected ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#22c55e",
        fontWeight: 700,
        fontSize: 13
      }
    }, "\u2713") : /*#__PURE__*/React.createElement("button", {
      onClick: function () {
        simulateConnect(p.id);
      },
      disabled: connecting === p.id,
      style: {
        padding: "6px 14px",
        borderRadius: 7,
        background: connecting === p.id ? "#ddd" : p.color,
        color: "white",
        border: "none",
        fontSize: 12,
        fontWeight: 600,
        cursor: connecting === p.id ? "wait" : "pointer",
        minWidth: 70
      }
    }, connecting === p.id ? "..." : "Connect")), connected && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        paddingLeft: 44
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      value: handle,
      onChange: function (e) {
        var val = e.target.value;
        setSocialHandles(function (prev) {
          var next = Object.assign({}, prev);
          next[p.id] = val;
          return next;
        });
      },
      placeholder: "@your" + p.label.toLowerCase() + "handle",
      style: {
        width: "100%",
        padding: "8px 12px",
        fontSize: 13,
        border: "1.5px solid #e8e0d4",
        borderRadius: 8,
        outline: "none",
        background: "white",
        boxSizing: "border-box",
        fontFamily: "'DM Sans', sans-serif"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#bbb",
        marginTop: 3
      }
    }, "Used for your Follow Us page")));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      setStep(2);
    },
    style: {
      flex: 1,
      padding: 12,
      borderRadius: 10,
      border: "1.5px solid #e8e0d4",
      background: "transparent",
      color: "#888",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "\u2190 Back"), /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      setStep(4);
    },
    style: {
      flex: 2,
      padding: 12,
      borderRadius: 10,
      border: "none",
      background: "linear-gradient(135deg,#1a1a2e,#2d2b55)",
      color: "white",
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer"
    }
  }, "Continue \u2192"))), step === 4 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, !launching ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 48,
      marginBottom: 16
    }
  }, "\uD83D\uDE80"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 30,
      fontWeight: 800,
      color: "#1a1a2e",
      marginBottom: 8
    }
  }, "Ready to launch!"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#888",
      fontSize: 15,
      marginBottom: 32
    }
  }, "Here is your setup summary"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 20,
      padding: 24,
      boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
      marginBottom: 20,
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "14px 0",
      borderBottom: "1px solid #f5f0ea"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "#888",
      fontWeight: 600
    }
  }, "Business"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "#1a1a2e"
    }
  }, selected ? selected.name : "")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "14px 0",
      borderBottom: "1px solid #f5f0ea"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "#888",
      fontWeight: 600
    }
  }, "Display"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "#1a1a2e",
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, displayMode === "tv" ? "\uD83D\uDDA5\uFE0F TV" : "\uD83D\uDCF1 Tablet", displayMode === "tv" && /*#__PURE__*/React.createElement(ProBadge, {
    small: true
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "14px 0",
      borderBottom: "1px solid #f5f0ea"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "#888",
      fontWeight: 600
    }
  }, "Filter"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "#1a1a2e",
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, minStars > 0 ? minStars + "+ stars" : "All reviews", minStars > 0 && /*#__PURE__*/React.createElement(ProBadge, {
    small: true
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "14px 0",
      borderBottom: "1px solid #f5f0ea"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "#888",
      fontWeight: 600
    }
  }, "Theme"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "#1a1a2e",
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, theme === "dark" ? "Dark Mode" : "Light", theme === "dark" && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "2px 6px",
      borderRadius: 4,
      background: "#2563eb15",
      fontSize: 9,
      fontWeight: 800,
      color: "#2563eb"
    }
  }, "PLUS"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "14px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "#888",
      fontWeight: 600
    }
  }, "Plan"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "#1a1a2e"
    }
  }, "Free"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#7c3aed08",
      border: "1px solid #7c3aed22",
      borderRadius: 14,
      padding: "14px 18px",
      marginBottom: 24,
      fontSize: 13,
      color: "#7c3aed",
      textAlign: "left"
    }
  }, "Items marked with badges need Plus ($9/mo) or Pro ($29/mo). You'll see the free version now \u2014 upgrade anytime from your dashboard."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      setStep(3);
    },
    style: {
      flex: 1,
      padding: 12,
      borderRadius: 10,
      border: "1.5px solid #e8e0d4",
      background: "transparent",
      color: "#888",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "\u2190 Back"), /*#__PURE__*/React.createElement("button", {
    onClick: launch,
    style: {
      flex: 2,
      padding: "14px 12px",
      borderRadius: 12,
      border: "none",
      background: "linear-gradient(135deg,#22c55e,#16a34a)",
      color: "white",
      fontSize: 16,
      fontWeight: 700,
      cursor: "pointer",
      boxShadow: "0 4px 20px rgba(34,197,94,0.3)"
    }
  }, "Launch Free Display \uD83D\uDE80"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "80px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      margin: "0 auto 24px",
      border: "3px solid #22c55e",
      borderTopColor: "transparent",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite"
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 24,
      fontWeight: 800,
      color: "#1a1a2e",
      marginBottom: 8
    }
  }, "Setting up your display...")))));
}

/* ══════════════════════════════════════════════════════════════════════════════ */
/* ── SMIIRL-STYLE FLIP COUNTER FOR SOCIAL FOLLOWER COUNTS                  ── */
/* ══════════════════════════════════════════════════════════════════════════════ */
function playFlipClick() {
  try {
    var ctx = new (window.AudioContext || window.webkitAudioContext)();
    var bufSize = ctx.sampleRate * 0.015; // 15ms noise burst
    var buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    var data = buf.getChannelData(0);
    // Sharp attack, fast decay noise = mechanical click
    for (var i = 0; i < bufSize; i++) {
      var env = Math.exp(-i / (bufSize * 0.15)); // very fast exponential decay
      data[i] = (Math.random() * 2 - 1) * env;
    }
    var src = ctx.createBufferSource();
    src.buffer = buf;
    // Bandpass filter to sound like plastic/metal click
    var bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2000 + Math.random() * 1500;
    bp.Q.value = 3;
    var gain = ctx.createGain();
    gain.gain.value = 0.06;
    src.connect(bp);
    bp.connect(gain);
    gain.connect(ctx.destination);
    src.start(ctx.currentTime);
    setTimeout(function () {
      try {
        ctx.close();
      } catch (e) {}
    }, 100);
  } catch (e) {}
}
function SmirlDigit({
  digit,
  dark,
  soundEnabled
}) {
  var prevRef = useRef(digit);
  var [flipping, setFlipping] = useState(false);
  var [shown, setShown] = useState(digit);
  useEffect(function () {
    if (String(digit) !== String(prevRef.current)) {
      setFlipping(true);
      // Sound (non-blocking)
      if (soundEnabled) {
        setTimeout(function () {
          playFlipClick();
        }, 0);
      }
      var t = setTimeout(function () {
        setShown(String(digit));
        prevRef.current = String(digit);
        setFlipping(false);
      }, 200);
      return function () {
        clearTimeout(t);
      };
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 46,
      borderRadius: 6,
      position: "relative",
      background: dark ? "linear-gradient(180deg, #2a2a3e 0%, #1e1e30 46%, rgba(0,0,0,0.5) 48%, rgba(0,0,0,0.2) 50%, #1e1e30 52%, #2a2a3e 100%)" : "linear-gradient(180deg, #f8f8fa 0%, #eeeef2 46%, rgba(0,0,0,0.15) 48%, rgba(0,0,0,0.05) 50%, #eeeef2 52%, #f8f8fa 100%)",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: dark ? "0 2px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)" : "0 2px 6px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
      transform: flipping ? "rotateX(50deg)" : "rotateX(0deg)",
      transition: flipping ? "transform 0.1s ease-in" : "transform 0.15s ease-out"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Bricolage Grotesque', monospace",
      fontSize: 28,
      fontWeight: 900,
      color: dark ? "white" : "#1a1a2e",
      lineHeight: 1,
      opacity: flipping ? 0 : 1,
      transition: "opacity 0.08s ease"
    }
  }, shown));
}
function SmirlCounter({
  value,
  dark,
  soundEnabled
}) {
  var str = String(value);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 3,
      perspective: 400
    }
  }, str.split("").map(function (d, i) {
    return /*#__PURE__*/React.createElement(SmirlDigit, {
      key: "d" + i + "_" + str.length,
      digit: d,
      dark: dark,
      soundEnabled: soundEnabled
    });
  }));
}
function SmirlDigitXL({
  digit,
  soundEnabled
}) {
  var prevRef = useRef(digit);
  var [flipping, setFlipping] = useState(false);
  var [shown, setShown] = useState(digit);
  useEffect(function () {
    if (String(digit) !== String(prevRef.current)) {
      setFlipping(true);
      if (soundEnabled) {
        setTimeout(function () {
          playFlipClick();
        }, 0);
      }
      var t = setTimeout(function () {
        setShown(String(digit));
        prevRef.current = String(digit);
        setFlipping(false);
      }, 250);
      return function () {
        clearTimeout(t);
      };
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      borderRadius: 10,
      position: "relative",
      background: "linear-gradient(180deg, #222236 0%, #1a1a2e 45%, rgba(0,0,0,0.6) 48%, rgba(0,0,0,0.25) 50%, #1a1a2e 52%, #222236 100%)",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.2)",
      transform: flipping ? "rotateX(50deg)" : "rotateX(0deg)",
      transition: flipping ? "transform 0.12s ease-in" : "transform 0.2s ease-out"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Bricolage Grotesque', monospace",
      fontSize: "min(12vw, 120px)",
      fontWeight: 900,
      color: "white",
      lineHeight: 1,
      opacity: flipping ? 0 : 1,
      transition: "opacity 0.1s ease"
    }
  }, shown));
}

/* ══════════════════════════════════════════════════════════════════════════════ */
/* ── iPAD DISPLAY                                                           ── */
/* ══════════════════════════════════════════════════════════════════════════════ */
function IPadDisplay({
  businessName,
  locationAddress,
  logoUrl,
  reviewCount,
  rating,
  reviews,
  activeSocial,
  socialCounts,
  qrUrl,
  followUrl,
  hasFollow,
  latestEvent,
  isPro,
  isPlus,
  theme,
  onToggleTheme,
  onAdmin,
  onUpgrade
}) {
  var [showToast, setShowToast] = useState(false);
  var [toastText, setToastText] = useState("");
  var [soundOn, setSoundOn] = useState(false);
  var [focusedSocial, setFocusedSocial] = useState(null);
  var lastEv = useRef(null);
  var dark = theme === "dark";
  var [isLandscape, setIsLandscape] = useState(function () {
    return typeof window !== "undefined" ? window.innerWidth > window.innerHeight : false;
  });
  useEffect(function () {
    function handleResize() {
      setIsLandscape(window.innerWidth > window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
    return function () {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(function () {
    if (!latestEvent || latestEvent.id === lastEv.current) return;
    lastEv.current = latestEvent.id;
    setToastText(latestEvent.type === "review" ? "New review! ⭐" : "New follower!");
    setShowToast(true);
    var t = setTimeout(function () {
      setShowToast(false);
    }, 2500);
    return function () {
      clearTimeout(t);
    };
  }, [latestEvent]);
  var brandEl = logoUrl && isPlus ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: dark ? "10px 16px" : 0,
      background: dark ? "rgba(255,255,255,0.92)" : "transparent",
      borderRadius: dark ? 14 : 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoUrl,
    alt: "Logo",
    style: {
      height: 80,
      maxWidth: 300,
      objectFit: "contain",
      display: "block"
    }
  })), locationAddress && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: dark ? "rgba(255,255,255,0.35)" : "#aaa",
      marginTop: 5,
      fontWeight: 500
    }
  }, locationAddress)) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 28,
      fontWeight: 800,
      color: dark ? "white" : "#1a1a2e"
    }
  }, businessName), locationAddress && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: dark ? "rgba(255,255,255,0.35)" : "#aaa",
      marginTop: 2,
      fontWeight: 500
    }
  }, locationAddress));
  var toastEl = showToast ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "7px 16px",
      borderRadius: 20,
      background: dark ? "rgba(255,255,255,0.1)" : "white",
      border: dark ? "1px solid rgba(255,255,255,0.12)" : "none",
      boxShadow: dark ? "none" : "0 4px 16px rgba(0,0,0,0.07)",
      animation: "slideUp 0.3s ease-out",
      fontSize: 13,
      fontWeight: 600,
      color: dark ? "white" : "#1a1a2e"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "#22c55e",
      animation: "pulse 1.5s ease-in-out infinite"
    }
  }), toastText) : null;
  var socialRow = activeSocial.length > 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, activeSocial.map(function (p) {
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: dark ? "rgba(255,255,255,0.06)" : "white",
        borderRadius: 14,
        padding: "8px 10px 8px 8px",
        boxShadow: dark ? "none" : "0 2px 10px rgba(0,0,0,0.04)",
        border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.04)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 24,
        height: 24,
        borderRadius: 7,
        background: p.grad,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(SocialSvg, {
      id: p.id,
      size: 13
    })), /*#__PURE__*/React.createElement(SmirlCounter, {
      value: socialCounts[p.id] || 0,
      dark: dark,
      soundEnabled: soundOn
    }));
  })) : null;
  var watermark = function () {
    /* Enterprise (future): no watermark. Pro/Plus: subtle. Free: prominent with upgrade CTA */
    if (isPro) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          marginTop: 8,
          fontWeight: 500
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 18,
          height: 18,
          borderRadius: 5,
          background: "linear-gradient(135deg,#FBBC04,#EA4335)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, /*#__PURE__*/React.createElement(StarSvg, {
        size: 9,
        fill: "white"
      })), "Powered by ", /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 700
        }
      }, "ReviewBoost"));
    }
    if (isPlus) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          marginTop: 8,
          fontWeight: 500
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 18,
          height: 18,
          borderRadius: 4,
          background: "linear-gradient(135deg,#FBBC04,#EA4335)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, /*#__PURE__*/React.createElement(StarSvg, {
        size: 10,
        fill: "white"
      })), "Powered by ", /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 700
        }
      }, "ReviewBoost"));
    }
    return /*#__PURE__*/React.createElement("div", {
      onClick: onUpgrade,
      style: {
        cursor: "pointer",
        fontSize: 16,
        color: dark ? "rgba(255,255,255,0.5)" : "#999",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        marginTop: 8,
        fontWeight: 500
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 20,
        height: 20,
        borderRadius: 5,
        background: "linear-gradient(135deg,#FBBC04,#EA4335)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(StarSvg, {
      size: 11,
      fill: "white"
    })), "Powered by ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700
      }
    }, "ReviewBoost"), " ", "\u00B7", " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: dark ? "#a855f7" : "#7c3aed",
        fontWeight: 700
      }
    }, "Upgrade"));
  }();
  var adminBtn = /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 14,
      right: 14,
      display: "flex",
      flexDirection: "column",
      gap: 6,
      zIndex: 10
    }
  }, isPlus && /*#__PURE__*/React.createElement("button", {
    onClick: onToggleTheme,
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)",
      border: dark ? "1px solid rgba(255,255,255,0.1)" : "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16
    }
  }, dark ? "☀️" : "ðŸŒ™"), /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      setSoundOn(function (v) {
        return !v;
      });
    },
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: soundOn ? dark ? "rgba(251,188,4,0.15)" : "rgba(251,188,4,0.12)" : dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
      border: soundOn ? "1px solid rgba(251,188,4,0.3)" : dark ? "1px solid rgba(255,255,255,0.06)" : "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14
    }
  }, soundOn ? "ðŸ”Š" : "ðŸ”‡"), /*#__PURE__*/React.createElement("button", {
    onClick: onAdmin,
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
      border: "none",
      cursor: "pointer",
      color: dark ? "rgba(255,255,255,0.15)" : "#ccc",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "\u22EE"));

  /* Theme tokens */
  var bg = dark ? "linear-gradient(135deg,#0f0f1a,#1a1a2e,#1e1e35)" : "linear-gradient(160deg,#faf8f5 0%,#f0ebe3 50%,#e8dfd3 100%)";
  var cardBg = dark ? "rgba(255,255,255,0.04)" : "white";
  var cardBorder = dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.03)";
  var cardShadow = dark ? "none" : "0 4px 20px rgba(0,0,0,0.05)";
  var textColor = dark ? "white" : "#1a1a2e";
  var mutedColor = dark ? "rgba(255,255,255,0.4)" : "#888";
  var qrPadBg = dark ? "white" : "#faf8f5";
  var qrPadBorder = dark ? "none" : "1px solid #e8e0d4";

  /* ── SMIIRL FULLSCREEN OVERLAY ── */
  if (focusedSocial) {
    var fp = focusedSocial;
    var fCount = socialCounts[fp.id] || 0;
    var fStr = String(fCount).padStart(5, " ");
    var fDigits = fStr.split("");
    // 6 slots total (1 icon + 5 digits), each slot = (100vw - padding) / 6
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
        background: "#0a0a14",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "stretch",
        background: "linear-gradient(180deg, #d9cead 0%, #c8bc9a 40%, #bbb08c 100%)",
        borderRadius: 16,
        padding: 8,
        boxShadow: "0 12px 60px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.15)",
        border: "3px solid rgba(200,190,170,0.6)",
        width: "calc(100vw - 48px)",
        maxWidth: 1100,
        height: "min(28vh, 220px)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "0 0 calc((100% - 40px) / 6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1a1a2e",
        borderRadius: 10,
        marginRight: 8
      }
    }, /*#__PURE__*/React.createElement(SocialSvg, {
      id: fp.id,
      size: Math.min(80, 999)
    })), fDigits.map(function (d, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: "fs" + i,
        style: {
          flex: "0 0 calc((100% - 40px) / 6)",
          marginLeft: i > 0 ? 8 : 0
        }
      }, d === " " ? /*#__PURE__*/React.createElement("div", {
        style: {
          width: "100%",
          height: "100%",
          borderRadius: 10,
          background: "#1a1a2e"
        }
      }) : /*#__PURE__*/React.createElement(SmirlDigitXL, {
        digit: d,
        soundEnabled: soundOn
      }));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 28,
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 20,
        fontWeight: 800,
        color: "white",
        marginBottom: 4
      }
    }, businessName), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "rgba(255,255,255,0.3)",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.15em"
      }
    }, fp.label, " followers")), hasFollow && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 24,
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: "rgba(255,255,255,0.04)",
        borderRadius: 14,
        padding: "14px 20px",
        border: "1px solid rgba(255,255,255,0.06)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 5,
        background: "white",
        borderRadius: 8
      }
    }, /*#__PURE__*/React.createElement(QRCode, {
      data: followUrl,
      size: 60
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 15,
        fontWeight: 800,
        color: "white",
        marginBottom: 2
      }
    }, "Follow us on ", fp.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "rgba(255,255,255,0.35)"
      }
    }, "Scan the QR code to follow"))), /*#__PURE__*/React.createElement("div", {
      onClick: function () {
        setFocusedSocial(null);
      },
      style: {
        position: "absolute",
        bottom: 18,
        fontSize: 11,
        color: "rgba(255,255,255,0.15)",
        fontWeight: 600,
        cursor: "pointer",
        padding: "6px 16px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.05)"
      }
    }, "Tap to go back"), /*#__PURE__*/React.createElement("button", {
      onClick: function (e) {
        e.stopPropagation();
        setSoundOn(function (v) {
          return !v;
        });
      },
      style: {
        position: "absolute",
        top: 16,
        right: 16,
        width: 36,
        height: 36,
        borderRadius: 8,
        background: soundOn ? "rgba(251,188,4,0.15)" : "rgba(255,255,255,0.04)",
        border: soundOn ? "1px solid rgba(251,188,4,0.3)" : "1px solid rgba(255,255,255,0.06)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16
      }
    }, soundOn ? "ðŸ”Š" : "ðŸ”‡"));
  }

  /* ── LANDSCAPE ── */
  if (isLandscape) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        background: bg,
        color: textColor,
        display: "flex",
        flexDirection: "column",
        padding: "14px 28px 6px",
        position: "relative",
        overflow: "hidden"
      }
    }, adminBtn, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingRight: 60,
        flexShrink: 0
      }
    }, brandEl, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 12
      }
    }, activeSocial.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10
      }
    }, activeSocial.map(function (p) {
      return /*#__PURE__*/React.createElement("div", {
        key: p.id,
        onClick: isPro ? function () {
          setFocusedSocial(p);
        } : undefined,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: dark ? "rgba(255,255,255,0.06)" : "white",
          borderRadius: 16,
          padding: "8px 12px 8px 10px",
          border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.04)",
          cursor: isPro ? "pointer" : "default",
          transition: "transform 0.15s ease"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 36,
          height: 36,
          borderRadius: 10,
          background: p.grad,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, /*#__PURE__*/React.createElement(SocialSvg, {
        id: p.id,
        size: 20
      })), /*#__PURE__*/React.createElement(SmirlCounter, {
        value: socialCounts[p.id] || 0,
        dark: dark,
        soundEnabled: soundOn
      }));
    })), hasFollow && /*#__PURE__*/React.createElement("div", {
      style: {
        background: dark ? "rgba(255,255,255,0.06)" : "white",
        borderRadius: 14,
        padding: "8px 12px",
        textAlign: "center",
        border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 3,
        background: qrPadBg,
        borderRadius: 8,
        border: qrPadBorder
      }
    }, /*#__PURE__*/React.createElement(QRCode, {
      data: followUrl,
      size: 44
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 13,
        fontWeight: 800,
        color: textColor,
        marginBottom: 3
      }
    }, "Follow Us"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 5
      }
    }, activeSocial.map(function (p) {
      return /*#__PURE__*/React.createElement("div", {
        key: p.id,
        style: {
          width: 22,
          height: 22,
          borderRadius: 6,
          background: p.grad,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, /*#__PURE__*/React.createElement(SocialSvg, {
        id: p.id,
        size: 12
      }));
    })))))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: 0,
        paddingBottom: "8vh"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 5
      }
    }, /*#__PURE__*/React.createElement(StarSvg, {
      size: 26
    }), /*#__PURE__*/React.createElement(StarSvg, {
      size: 26
    }), /*#__PURE__*/React.createElement(StarSvg, {
      size: 26
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 48,
        fontWeight: 800,
        color: textColor,
        letterSpacing: "0.02em",
        textTransform: "uppercase"
      }
    }, "Our Customers Love Us!"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 5
      }
    }, /*#__PURE__*/React.createElement(StarSvg, {
      size: 26
    }), /*#__PURE__*/React.createElement(StarSvg, {
      size: 26
    }), /*#__PURE__*/React.createElement(StarSvg, {
      size: 26
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement(Stars, {
      rating: rating,
      size: 20
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 26,
        fontWeight: 800,
        color: textColor
      }
    }, rating), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 1,
        height: 20,
        background: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: mutedColor
      }
    }, reviewCount.toLocaleString(), " Google Reviews"), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 24,
        display: "flex",
        alignItems: "center"
      }
    }, toastEl)), /*#__PURE__*/React.createElement(ReviewCarousel, {
      reviews: reviews,
      count: 4,
      gridCols: 2,
      dark: dark,
      interval: 8000
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 24,
        maxWidth: 780,
        background: dark ? "linear-gradient(135deg, rgba(251,188,4,0.08), rgba(34,197,94,0.06))" : "linear-gradient(135deg, rgba(251,188,4,0.1), rgba(255,255,255,0.95))",
        borderRadius: 20,
        padding: "18px 28px",
        border: dark ? "1px solid rgba(251,188,4,0.15)" : "1.5px solid rgba(251,188,4,0.25)",
        boxShadow: dark ? "0 4px 24px rgba(251,188,4,0.06)" : "0 4px 24px rgba(251,188,4,0.1)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 8,
        background: qrPadBg,
        borderRadius: 14,
        border: qrPadBorder,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(QRCode, {
      data: qrUrl,
      size: 110
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 22,
        fontWeight: 800,
        color: textColor,
        marginBottom: 6
      }
    }, "Loved your visit? Please leave us a Google review!"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: mutedColor,
        lineHeight: 1.6
      }
    }, "Scan the QR code or search for us on Google. It only takes a minute!", " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#FBBC04"
      }
    }, "\u2605")))))), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingTop: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        flexShrink: 0
      }
    }, !isPlus && /*#__PURE__*/React.createElement(AdBanner, {
      dark: dark,
      onUpgrade: onUpgrade,
      dual: true
    }), watermark));
  }

  /* ── PORTRAIT ── */
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      fontFamily: "'DM Sans', sans-serif",
      background: bg,
      color: textColor,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "24px 18px 16px",
      position: "relative"
    }
  }, adminBtn, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 500,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, brandEl), hasFollow && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 8
    }
  }, socialRow, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: cardBg,
      borderRadius: 14,
      padding: "10px 14px",
      border: cardBorder,
      boxShadow: cardShadow
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 4,
      background: qrPadBg,
      borderRadius: 8,
      border: qrPadBorder
    }
  }, /*#__PURE__*/React.createElement(QRCode, {
    data: followUrl,
    size: 52
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 13,
      fontWeight: 800,
      color: textColor
    }
  }, "Follow Us"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5,
      marginTop: 4
    }
  }, activeSocial.map(function (p) {
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      style: {
        width: 20,
        height: 20,
        borderRadius: 5,
        background: p.grad,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(SocialSvg, {
      id: p.id,
      size: 11
    }));
  }))))), !hasFollow && socialRow && /*#__PURE__*/React.createElement("div", null, socialRow)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: cardBg,
      borderRadius: 24,
      padding: "24px 22px",
      width: "100%",
      textAlign: "center",
      boxShadow: cardShadow,
      border: cardBorder,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(RatingHero, {
    rating: rating,
    count: reviewCount,
    size: "md",
    light: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 4
    }
  }, toastEl), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      justifyContent: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement(StarSvg, {
    size: 14
  }), /*#__PURE__*/React.createElement(StarSvg, {
    size: 14
  }), /*#__PURE__*/React.createElement(StarSvg, {
    size: 14
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 20,
      fontWeight: 800,
      color: textColor,
      letterSpacing: "-0.02em"
    }
  }, "Our customers love us!"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement(StarSvg, {
    size: 14
  }), /*#__PURE__*/React.createElement(StarSvg, {
    size: 14
  }), /*#__PURE__*/React.createElement(StarSvg, {
    size: 14
  }))), /*#__PURE__*/React.createElement(ReviewCarousel, {
    reviews: reviews,
    compact: true,
    count: 2,
    dark: dark,
    interval: 6000
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: cardBg,
      borderRadius: 18,
      padding: "18px 20px",
      textAlign: "center",
      boxShadow: cardShadow,
      border: cardBorder,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 6,
      background: qrPadBg,
      borderRadius: 10,
      border: qrPadBorder
    }
  }, /*#__PURE__*/React.createElement(QRCode, {
    data: qrUrl,
    size: 80
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 15,
      fontWeight: 800,
      color: textColor,
      marginBottom: 4
    }
  }, "Loved your visit? Please leave us a Google review!"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: mutedColor,
      lineHeight: 1.5
    }
  }, "It really helps our independently owned business and only takes a minute. Scan the QR code or search for us on Google. Thank you! ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#FBBC04"
    }
  }, "\u2B50"))))), !isPlus && /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(AdBanner, {
    dark: dark,
    compact: true,
    onUpgrade: onUpgrade
  })), watermark));
}

/* ══════════════════════════════════════════════════════════════════════════════ */
/* ── TV DISPLAY                                                             ── */
/* ══════════════════════════════════════════════════════════════════════════════ */
function TVDisplay({
  businessName,
  logoUrl,
  reviewCount,
  rating,
  reviews,
  activeSocial,
  socialCounts,
  qrUrl,
  followUrl,
  hasFollow,
  latestEvent,
  isPro,
  onAdmin,
  onUpgrade
}) {
  var [showToast, setShowToast] = useState(false);
  var [toastText, setToastText] = useState("");
  var [soundOn, setSoundOn] = useState(false);
  var lastEv = useRef(null);
  useEffect(function () {
    if (!latestEvent || latestEvent.id === lastEv.current) return;
    lastEv.current = latestEvent.id;
    setToastText(latestEvent.type === "review" ? "New Google Review!" : "New follower!");
    setShowToast(true);
    var t = setTimeout(function () {
      setShowToast(false);
    }, 3000);
    return function () {
      clearTimeout(t);
    };
  }, [latestEvent]);
  var brandEl = logoUrl ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "6px 12px",
      background: "rgba(255,255,255,0.9)",
      borderRadius: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoUrl,
    alt: "Logo",
    style: {
      height: 48,
      maxWidth: 200,
      objectFit: "contain",
      display: "block"
    }
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 38,
      fontWeight: 800,
      letterSpacing: "-0.03em"
    }
  }, businessName);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      fontFamily: "'DM Sans', sans-serif",
      color: "white",
      background: "linear-gradient(135deg,#0f0f1a,#1a1a2e,#1e1e35)",
      display: "flex",
      flexDirection: "column",
      padding: "32px 36px",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onAdmin,
    style: {
      position: "absolute",
      top: 16,
      right: 16,
      width: 36,
      height: 36,
      borderRadius: 8,
      background: "rgba(255,255,255,0.04)",
      border: "none",
      cursor: "pointer",
      color: "rgba(255,255,255,0.15)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "\u22EE"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 36
    }
  }, brandEl, activeSocial.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12
    }
  }, activeSocial.map(function (p) {
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "rgba(255,255,255,0.06)",
        borderRadius: 14,
        padding: "10px 14px 10px 12px",
        border: "1px solid rgba(255,255,255,0.08)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 28,
        height: 28,
        borderRadius: 7,
        background: p.grad,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(SocialSvg, {
      id: p.id,
      size: 15
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SmirlCounter, {
      value: socialCounts[p.id] || 0,
      dark: true,
      soundEnabled: soundOn
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: "rgba(255,255,255,0.35)",
        fontWeight: 600,
        textTransform: "uppercase",
        marginTop: 2
      }
    }, "followers")));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "grid",
      gridTemplateColumns: "0.9fr 1.4fr 0.7fr",
      gap: 24,
      alignItems: "center",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.04)",
      borderRadius: 24,
      padding: "32px 28px",
      border: "1px solid rgba(255,255,255,0.06)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(RatingHero, {
    rating: rating,
    count: reviewCount,
    size: "xl",
    light: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 48,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20
    }
  }, showToast && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 24px",
      borderRadius: 24,
      background: "rgba(255,255,255,0.1)",
      border: "1px solid rgba(255,255,255,0.12)",
      animation: "slideUp 0.3s ease-out",
      fontSize: 15,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "#22c55e"
    }
  }), toastText))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      justifyContent: "center",
      marginBottom: 20,
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 3
    }
  }, /*#__PURE__*/React.createElement(StarSvg, {
    size: 16
  }), /*#__PURE__*/React.createElement(StarSvg, {
    size: 16
  }), /*#__PURE__*/React.createElement(StarSvg, {
    size: 16
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 26,
      fontWeight: 800,
      color: "white",
      letterSpacing: "-0.02em"
    }
  }, "Our customers love us!"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 3
    }
  }, /*#__PURE__*/React.createElement(StarSvg, {
    size: 16
  }), /*#__PURE__*/React.createElement(StarSvg, {
    size: 16
  }), /*#__PURE__*/React.createElement(StarSvg, {
    size: 16
  }))), /*#__PURE__*/React.createElement(ReviewCarousel, {
    reviews: reviews,
    count: 2,
    dark: true,
    interval: 7000
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.04)",
      borderRadius: 20,
      padding: "18px 16px",
      border: "1px solid rgba(255,255,255,0.06)",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 16,
      fontWeight: 800
    }
  }, "Leave a Review"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block",
      padding: 8,
      background: "white",
      borderRadius: 12,
      boxShadow: "0 4px 24px rgba(0,0,0,0.4)"
    }
  }, /*#__PURE__*/React.createElement(QRCode, {
    data: qrUrl,
    size: 90
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "rgba(255,255,255,0.4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#FBBC04",
      fontWeight: 700
    }
  }, "\u2605"), " Google Review")), hasFollow && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.04)",
      borderRadius: 20,
      padding: "18px 16px",
      border: "1px solid rgba(255,255,255,0.06)",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 16,
      fontWeight: 800
    }
  }, "Follow Us"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block",
      padding: 8,
      background: "white",
      borderRadius: 12,
      boxShadow: "0 4px 24px rgba(0,0,0,0.4)"
    }
  }, /*#__PURE__*/React.createElement(QRCode, {
    data: followUrl,
    size: 90
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      justifyContent: "center"
    }
  }, activeSocial.map(function (p) {
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      style: {
        width: 22,
        height: 22,
        borderRadius: 6,
        background: p.grad,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(SocialSvg, {
      id: p.id,
      size: 12
    }));
  }))))), !isPro && /*#__PURE__*/React.createElement("div", {
    onClick: onUpgrade,
    style: {
      cursor: "pointer",
      position: "absolute",
      bottom: 16,
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: 12,
      color: "rgba(255,255,255,0.3)",
      display: "flex",
      alignItems: "center",
      gap: 4,
      background: "rgba(255,255,255,0.06)",
      padding: "8px 16px",
      borderRadius: 10
    }
  }, "Powered by ReviewBoost \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#a855f7",
      fontWeight: 600
    }
  }, "Remove with Pro")));
}

/* ══════════════════════════════════════════════════════════════════════════════ */
/* ── ADMIN DASHBOARD                                                        ── */
/* ══════════════════════════════════════════════════════════════════════════════ */
function AdminDash({
  businessName,
  reviewCount,
  rating,
  activeSocial,
  socialCounts,
  totalGained,
  events,
  displayMode,
  effectiveDisplayMode,
  isPro,
  isPlus,
  plan,
  theme,
  onThemeToggle,
  onCustomer,
  onUpgrade,
  locations,
  activeLocationIdx,
  onSwitchLocation,
  onAddLocation,
  adminPin,
  onChangePin,
  socialConnected,
  onToggleSocial
}) {
  var [showLocDropdown, setShowLocDropdown] = useState(false);
  var [showAddLocation, setShowAddLocation] = useState(false);
  var [locSearch, setLocSearch] = useState("");
  var [locResults, setLocResults] = useState([]);
  var [locSearching, setLocSearching] = useState(false);
  var [editingPin, setEditingPin] = useState(false);
  var [newPin, setNewPin] = useState("");
  var [adminTab, setAdminTab] = useState("analytics");
  var [reviewTab, setReviewTab] = useState("pending");
  var mob = typeof window !== "undefined" && window.innerWidth < 700;
  var MOCK_LOC_RESULTS = [{
    name: "Element Longevity - Downtown",
    address: "123 Main St, Suite 200, Traverse City, MI 49684",
    rating: 4.6,
    reviewCount: 142,
    placeId: "ChIJx2_downtown"
  }, {
    name: "Element Longevity - Northside",
    address: "950 Hannah Ave, Traverse City, MI 49686",
    rating: 4.9,
    reviewCount: 87,
    placeId: "ChIJx2_northside"
  }, {
    name: "Element Longevity - Petoskey",
    address: "321 Mitchell St, Petoskey, MI 49770",
    rating: 4.7,
    reviewCount: 203,
    placeId: "ChIJx2_petoskey"
  }, {
    name: "Element Wellness & Longevity",
    address: "321 Oak Park Ave, Oak Park, IL 60302",
    rating: 4.4,
    reviewCount: 64,
    placeId: "ChIJx2_oakpark"
  }];
  function handleLocSearch() {
    if (!locSearch.trim()) return;
    setLocSearching(true);
    setLocResults([]);
    setTimeout(function () {
      var q = locSearch.toLowerCase();
      var filtered = MOCK_LOC_RESULTS.filter(function (r) {
        return r.name.toLowerCase().indexOf(q) >= 0 || r.address.toLowerCase().indexOf(q) >= 0;
      });
      setLocResults(filtered.length > 0 ? filtered : MOCK_LOC_RESULTS);
      setLocSearching(false);
    }, 800);
  }
  var weeklyData = [{
    week: "6 wks ago",
    reviews: 4,
    rating: 4.5
  }, {
    week: "5 wks ago",
    reviews: 6,
    rating: 4.6
  }, {
    week: "4 wks ago",
    reviews: 5,
    rating: 4.6
  }, {
    week: "3 wks ago",
    reviews: 9,
    rating: 4.7
  }, {
    week: "2 wks ago",
    reviews: 12,
    rating: 4.8
  }, {
    week: "Last week",
    reviews: 15,
    rating: 4.8
  }, {
    week: "This week",
    reviews: 11,
    rating: 4.8
  }];
  var maxReviews = Math.max.apply(null, weeklyData.map(function (w) {
    return w.reviews;
  }));
  var beforeReviews = 142;
  var beforeRating = 4.3;
  var afterReviews = reviewCount;
  var afterRating = rating;
  var thisWeek = weeklyData[weeklyData.length - 1].reviews;
  var lastWeek = weeklyData[weeklyData.length - 2].reviews;
  var wowChange = lastWeek > 0 ? Math.round((thisWeek - lastWeek) / lastWeek * 100) : 0;
  var totalNew = weeklyData.reduce(function (s, w) {
    return s + w.reviews;
  }, 0);
  var qrScans = 347;
  var conversionRate = Math.round(totalNew / qrScans * 100);
  var mockReviews = [{
    id: 1,
    name: "Sarah Mitchell",
    rating: 5,
    time: "2 days ago",
    text: "Absolutely wonderful experience! The staff was incredibly friendly and professional. Highly recommend!",
    avatar: "S",
    replied: false,
    aiDraft: "Thank you so much, Sarah! We\u2019re thrilled you had a great experience. Our team works hard to make every visit special. We look forward to seeing you again!"
  }, {
    id: 2,
    name: "James Kim",
    rating: 5,
    time: "3 days ago",
    text: "Best experience I've had. Clean facility, short wait time, and the doctor was very thorough.",
    avatar: "J",
    replied: false,
    aiDraft: "Thank you for the wonderful review, James! We\u2019re glad the wait time was short and that you felt well taken care of. We appreciate you choosing us!"
  }, {
    id: 3,
    name: "Michael Torres",
    rating: 3,
    time: "4 days ago",
    text: "Decent experience overall but the wait was longer than expected. Staff was friendly though.",
    avatar: "M",
    replied: false,
    aiDraft: "Thank you for your feedback, Michael. We apologize about the wait \u2014 we\u2019re actively working on improving our scheduling. We\u2019d love the chance to do better next time."
  }, {
    id: 4,
    name: "Lisa Chen",
    rating: 5,
    time: "1 week ago",
    text: "So glad I found this place! The team went above and beyond. Will definitely be coming back.",
    avatar: "L",
    replied: true,
    aiDraft: "",
    replyText: "Thank you Lisa! We love hearing that. Our team really appreciates your support \u2014 see you next time!"
  }, {
    id: 5,
    name: "Robert Park",
    rating: 4,
    time: "1 week ago",
    text: "Great service and very knowledgeable staff. Would definitely recommend to friends and family.",
    avatar: "R",
    replied: true,
    aiDraft: "",
    replyText: "Thanks so much, Robert! We\u2019re glad you had a great experience. Referrals from happy patients mean the world to us!"
  }, {
    id: 6,
    name: "Emily Davis",
    rating: 2,
    time: "2 weeks ago",
    text: "Had some issues with billing. The actual service was fine but the admin side needs work.",
    avatar: "E",
    replied: false,
    aiDraft: "Thank you for letting us know, Emily. We sincerely apologize for the billing issue. Our office manager will reach out to resolve this directly."
  }];
  var pendingReviews = mockReviews.filter(function (r) {
    return !r.replied;
  });
  var repliedReviews = mockReviews.filter(function (r) {
    return r.replied;
  });
  var competitors = [{
    name: "Lakeshore Dental",
    rating: 4.5,
    reviews: 142,
    reviewsPerMonth: 8,
    trend: -0.1,
    distance: "0.8 mi"
  }, {
    name: "Bay Area Family Care",
    rating: 4.3,
    reviews: 98,
    reviewsPerMonth: 5,
    trend: 0,
    distance: "1.2 mi"
  }, {
    name: "Grand Traverse Wellness",
    rating: 4.6,
    reviews: 215,
    reviewsPerMonth: 12,
    trend: 0.1,
    distance: "2.1 mi"
  }];
  var routingStats = {
    totalScans: 347,
    happyPath: 289,
    feedbackPath: 58,
    googleConversion: 218,
    feedbackSubmitted: 42,
    conversionRate: 75.4,
    feedbackRate: 72.4
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "linear-gradient(160deg,#faf8f5,#f0ebe3,#e8dfd3)",
      fontFamily: "'DM Sans', sans-serif"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: mob ? "10px 14px" : "14px 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid rgba(0,0,0,0.05)",
      background: "rgba(250,248,245,0.85)",
      backdropFilter: "blur(20px)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: "linear-gradient(135deg,#FBBC04,#EA4335)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(StarSvg, {
    size: 16,
    fill: "white"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function () {
      if (locations && locations.length > 0) setShowLocDropdown(function (s) {
        return !s;
      });
    },
    style: {
      cursor: locations && locations.length > 0 ? "pointer" : "default",
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontWeight: 700,
      fontSize: mob ? 13 : 15,
      color: "#1a1a2e"
    }
  }, businessName), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: mob ? 10 : 11,
      color: "#aaa"
    }
  }, locations && locations.length > 1 ? locations.length + " locations" : "Owner Dashboard")), locations && locations.length > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: "#aaa",
      marginLeft: 2,
      transform: showLocDropdown ? "rotate(180deg)" : "none",
      transition: "transform 0.2s"
    }
  }, "\u25BC")), showLocDropdown && locations && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "100%",
      left: 0,
      marginTop: 8,
      minWidth: 280,
      background: "white",
      borderRadius: 14,
      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      border: "1px solid rgba(0,0,0,0.06)",
      zIndex: 200,
      overflow: "hidden"
    }
  }, locations.map(function (loc, i) {
    var isActive = i === activeLocationIdx;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: function () {
        onSwitchLocation(i);
        setShowLocDropdown(false);
      },
      style: {
        padding: "12px 16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: isActive ? "#faf8f5" : "transparent",
        borderBottom: "1px solid #f5f0ea"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: isActive ? 700 : 500,
        color: "#1a1a2e"
      }
    }, loc.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#aaa"
      }
    }, loc.address)), isActive && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: "#22c55e"
      }
    }, "\u2713"));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid rgba(0,0,0,0.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function () {
      setShowLocDropdown(false);
      if (!isPro) {
        onUpgrade("Add multiple locations with Pro");
      } else {
        setShowAddLocation(true);
        setLocSearch("");
        setLocResults([]);
      }
    },
    style: {
      padding: "10px 14px",
      borderRadius: 10,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 10,
      color: "#2563eb",
      fontWeight: 600,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 7,
      background: "#2563eb12",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16
    }
  }, "+"), "Add Location", !isPro && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      padding: "2px 6px",
      borderRadius: 4,
      background: "#7c3aed12",
      color: "#7c3aed",
      fontWeight: 800
    }
  }, "PRO"))))), !isPro && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "3px 10px",
      borderRadius: 6,
      background: isPlus ? "#2563eb12" : "#f5f0ea",
      fontSize: 11,
      fontWeight: 700,
      color: isPlus ? "#2563eb" : "#888",
      marginLeft: 4
    }
  }, isPlus ? "PLUS" : "FREE"), isPro && /*#__PURE__*/React.createElement(ProBadge, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, !isPro && /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      onUpgrade(isPlus ? "Unlock review routing, AI responses, and more" : "Remove ads, add your logo, and more");
    },
    style: {
      padding: mob ? "6px 10px" : "8px 16px",
      borderRadius: 8,
      fontSize: mob ? 11 : 13,
      fontWeight: 700,
      border: "none",
      background: isPlus ? "linear-gradient(135deg,#7c3aed,#a855f7)" : "linear-gradient(135deg,#2563eb,#3b82f6)",
      color: "white",
      cursor: "pointer"
    }
  }, isPlus ? "Upgrade" : "Upgrade"), /*#__PURE__*/React.createElement("button", {
    onClick: onCustomer,
    style: {
      padding: mob ? "6px 10px" : "8px 16px",
      borderRadius: 8,
      fontSize: mob ? 11 : 13,
      fontWeight: 600,
      border: "none",
      background: "linear-gradient(135deg,#1a1a2e,#2d2b55)",
      color: "white",
      cursor: "pointer"
    }
  }, effectiveDisplayMode === "tv" ? "\uD83D\uDDA5\uFE0F" : "\uD83D\uDCF1", " ", mob ? "Display" : "Customer Display"))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 920,
      margin: "0 auto",
      padding: mob ? "16px 12px" : "28px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 2,
      marginBottom: mob ? 14 : 20,
      background: "white",
      borderRadius: 12,
      padding: 3,
      border: "1px solid #eee8dd"
    }
  }, [{
    id: "analytics",
    label: mob ? "\uD83D\uDCCA" : "\uD83D\uDCCA Analytics",
    count: 0
  }, {
    id: "reviews",
    label: mob ? "\u2B50" : "\u2B50 Reviews",
    count: pendingReviews.length
  }, {
    id: "competitors",
    label: mob ? "\uD83C\uDFAF" : "\uD83C\uDFAF Competitors",
    count: 0
  }, {
    id: "settings",
    label: mob ? "\u2699\uFE0F" : "\u2699\uFE0F Settings",
    count: 0
  }].map(function (t) {
    var active = adminTab === t.id;
    var locked = (t.id === "reviews" || t.id === "competitors") && !isPro;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: function () {
        if (locked) {
          onUpgrade("Unlock " + t.label + " with Pro");
        } else {
          setAdminTab(t.id);
        }
      },
      style: {
        flex: 1,
        padding: mob ? "8px 4px" : "10px 8px",
        borderRadius: 10,
        border: "none",
        cursor: "pointer",
        background: active ? "#1a1a2e" : "transparent",
        color: active ? "white" : locked ? "#ccc" : "#888",
        fontSize: 12,
        fontWeight: active ? 700 : 600,
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        transition: "all 0.15s ease"
      }
    }, t.label, t.count > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        padding: "1px 6px",
        borderRadius: 8,
        background: active ? "#FBBC04" : "#ef4444",
        color: active ? "#1a1a2e" : "white",
        fontSize: 10,
        fontWeight: 800
      }
    }, t.count), locked && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 8,
        fontWeight: 800,
        color: "#7c3aed",
        background: "#7c3aed12",
        padding: "1px 4px",
        borderRadius: 3
      }
    }, "PRO"));
  })), adminTab === "analytics" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
      gap: mob ? 8 : 12,
      marginBottom: mob ? 14 : 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: mob ? 12 : 16,
      padding: mob ? "14px 12px" : "18px 20px",
      border: "2px solid #FBBC0433"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(GoogleG, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#888"
    }
  }, "Total Reviews")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 28,
      fontWeight: 800,
      color: "#1a1a2e"
    }
  }, reviewCount.toLocaleString()), /*#__PURE__*/React.createElement(Stars, {
    rating: rating,
    size: 13
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 16,
      padding: "18px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#888",
      marginBottom: 8
    }
  }, "This Week"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 28,
      fontWeight: 800,
      color: "#1a1a2e"
    }
  }, "+", thisWeek), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: wowChange >= 0 ? "#22c55e" : "#ef4444",
      marginTop: 2
    }
  }, wowChange >= 0 ? "\u2191" : "\u2193", " ", Math.abs(wowChange), "% vs last week")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 16,
      padding: "18px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#888",
      marginBottom: 8
    }
  }, "QR Scans"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 28,
      fontWeight: 800,
      color: "#1a1a2e"
    }
  }, qrScans), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: "#3b82f6",
      marginTop: 2
    }
  }, conversionRate, "% conversion")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#1a1a2e,#2d2b55)",
      borderRadius: 16,
      padding: "18px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      opacity: 0.5,
      marginBottom: 8,
      color: "white"
    }
  }, "Rating Change"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 28,
      fontWeight: 800,
      color: "#FBBC04"
    }
  }, afterRating), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      opacity: 0.4,
      marginTop: 2,
      color: "white"
    }
  }, afterRating > beforeRating ? "\u2191 " + (afterRating - beforeRating).toFixed(1) + " since install" : "Tracking..."))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: mob ? 12 : 16,
      padding: mob ? "16px 14px" : "20px 22px",
      marginBottom: mob ? 14 : 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 14,
      fontWeight: 700,
      color: "#1a1a2e"
    }
  }, "ReviewBoost Impact"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "#bbb",
      fontWeight: 600
    }
  }, "Last 7 weeks")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: mob ? "1fr auto 1fr" : "1fr auto 1fr",
      gap: mob ? 8 : 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: mob ? "12px 8px" : "16px 12px",
      background: "#f5f0ea",
      borderRadius: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: mob ? 9 : 10,
      fontWeight: 700,
      color: "#888",
      textTransform: "uppercase",
      marginBottom: mob ? 4 : 8
    }
  }, "Before"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: mob ? 22 : 28,
      fontWeight: 800,
      color: "#888"
    }
  }, beforeRating), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: mob ? 10 : 12,
      color: "#aaa"
    }
  }, "reviews: ", beforeReviews), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "#aaa"
    }
  }, beforeReviews, " total"))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28
    }
  }, "\u2192"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#22c55e"
    }
  }, "+", totalNew), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#bbb"
    }
  }, "reviews")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: mob ? "12px 8px" : "16px 12px",
      background: "#22c55e08",
      borderRadius: 12,
      border: "1px solid #22c55e20"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: mob ? 9 : 10,
      fontWeight: 700,
      color: "#22c55e",
      textTransform: "uppercase",
      marginBottom: mob ? 4 : 8
    }
  }, "After"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: mob ? 22 : 28,
      fontWeight: 800,
      color: "#1a1a2e"
    }
  }, afterRating), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: mob ? 10 : 12,
      color: "#888"
    }
  }, "reviews: ", afterReviews), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "#22c55e"
    }
  }, "\u2B06\uFE0F", " ", Math.round((afterReviews - beforeReviews) / beforeReviews * 100), "% growth"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: mob ? 12 : 16,
      padding: mob ? "16px 14px" : "20px 22px",
      marginBottom: mob ? 14 : 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 14,
      fontWeight: 700,
      color: "#1a1a2e"
    }
  }, "Weekly Reviews"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: "#22c55e"
    }
  }, "+", totalNew, " total")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 6,
      height: 80
    }
  }, weeklyData.map(function (w, i) {
    var h = maxReviews > 0 ? w.reviews / maxReviews * 100 : 0;
    var isThisWeek = i === weeklyData.length - 1;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        color: "#1a1a2e"
      }
    }, "+", w.reviews), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        height: h + "%",
        minHeight: 4,
        borderRadius: 6,
        background: isThisWeek ? "linear-gradient(180deg,#FBBC04,#EA4335)" : "linear-gradient(180deg,#e8e0d4,#d4cbbf)",
        transition: "height 0.3s ease"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: "#bbb",
        fontWeight: 600,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "100%",
        textAlign: "center"
      }
    }, w.week));
  }))), isPro && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: mob ? 12 : 16,
      padding: mob ? "16px 14px" : "20px 22px",
      marginBottom: mob ? 14 : 20
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 14,
      fontWeight: 700,
      color: "#1a1a2e",
      marginBottom: 14
    }
  }, "Review Routing"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
      gap: mob ? 8 : 10,
      marginBottom: 14
    }
  }, [{
    label: "Total QR Scans",
    value: routingStats.totalScans,
    color: "#1a1a2e"
  }, {
    label: "Happy Path (\u2192Google)",
    value: routingStats.happyPath,
    color: "#22c55e"
  }, {
    label: "Feedback Path",
    value: routingStats.feedbackPath,
    color: "#f59e0b"
  }, {
    label: "Google Reviews Left",
    value: routingStats.googleConversion,
    color: "#3b82f6"
  }].map(function (s, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        fontWeight: 600,
        color: "#999",
        textTransform: "uppercase",
        marginBottom: 4
      }
    }, s.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 22,
        fontWeight: 800,
        color: s.color
      }
    }, s.value));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10,
      borderRadius: 5,
      overflow: "hidden",
      display: "flex",
      background: "#f0ebe3"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: routingStats.googleConversion / routingStats.totalScans * 100 + "%",
      background: "#22c55e",
      borderRadius: "5px 0 0 5px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: (routingStats.happyPath - routingStats.googleConversion) / routingStats.totalScans * 100 + "%",
      background: "#bbf7d0"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: routingStats.feedbackSubmitted / routingStats.totalScans * 100 + "%",
      background: "#f59e0b"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 6,
      fontSize: 10,
      color: "#999"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDFE2", " ", routingStats.conversionRate, "% left a Google review"), /*#__PURE__*/React.createElement("span", null, "\uD83D\uDFE1", " ", routingStats.feedbackRate, "% submitted private feedback"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 16,
      padding: "22px 24px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 15,
      fontWeight: 700,
      color: "#1a1a2e",
      marginBottom: 14
    }
  }, "Live Activity"), events.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#bbb",
      fontSize: 14,
      textAlign: "center",
      padding: 16
    }
  }, "Waiting for activity...") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, events.slice(0, 8).map(function (ev, i) {
    var isR = ev.type === "review";
    var soc = !isR ? SOCIALS.find(function (p) {
      return p.id === ev.platform;
    }) : null;
    return /*#__PURE__*/React.createElement("div", {
      key: ev.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "9px 12px",
        borderRadius: 10,
        background: i === 0 ? isR ? "#FBBC0406" : soc ? soc.color + "06" : "transparent" : "transparent",
        animation: i === 0 ? "slideIn 0.3s ease-out" : undefined
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 28,
        height: 28,
        borderRadius: 7,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isR ? "linear-gradient(135deg,#FBBC04,#EA4335)" : soc ? soc.grad : "#ddd"
      }
    }, isR ? /*#__PURE__*/React.createElement(StarSvg, {
      size: 14,
      fill: "white"
    }) : /*#__PURE__*/React.createElement(SocialSvg, {
      id: soc ? soc.id : "",
      size: 14
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: "#1a1a2e"
      }
    }, isR ? "+1 review" : "+1 follower"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#999"
      }
    }, " on ", ev.label)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "#bbb"
      }
    }, ev.time));
  })))), adminTab === "reviews" && isPro && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
      gap: mob ? 8 : 12,
      marginBottom: mob ? 14 : 20
    }
  }, [{
    label: "Pending Replies",
    value: pendingReviews.length,
    color: "#ef4444",
    icon: "\u23F3"
  }, {
    label: "Replied",
    value: repliedReviews.length,
    color: "#22c55e",
    icon: "\u2705"
  }, {
    label: "Avg Rating (30d)",
    value: "4.3",
    color: "#FBBC04",
    icon: "\u2B50"
  }, {
    label: "Response Rate",
    value: Math.round(repliedReviews.length / mockReviews.length * 100) + "%",
    color: "#3b82f6",
    icon: "\uD83D\uDCE8"
  }].map(function (s, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: "white",
        borderRadius: 16,
        padding: "18px 20px",
        border: "1px solid #eee8dd"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        color: "#999",
        textTransform: "uppercase",
        marginBottom: 6
      }
    }, s.icon, " ", s.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 28,
        fontWeight: 800,
        color: s.color
      }
    }, s.value));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg, #22c55e08, #3b82f608)",
      borderRadius: 16,
      padding: "18px 22px",
      border: "1px solid #22c55e20",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 14,
      fontWeight: 700,
      color: "#1a1a2e",
      marginBottom: 8
    }
  }, "\uD83D\uDEE3\uFE0F", " Smart Review Routing Active"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#666",
      lineHeight: 1.6
    }
  }, "When customers scan your QR code, they first rate their experience. Happy customers (4-5 stars) go to Google. Customers with issues (1-3 stars) go to a private feedback form."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: "#22c55e"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#666"
    }
  }, /*#__PURE__*/React.createElement("strong", null, routingStats.happyPath), " routed to Google (", Math.round(routingStats.happyPath / routingStats.totalScans * 100), "%)")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: "#f59e0b"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#666"
    }
  }, /*#__PURE__*/React.createElement("strong", null, routingStats.feedbackPath), " routed to feedback (", Math.round(routingStats.feedbackPath / routingStats.totalScans * 100), "%)")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      setReviewTab("pending");
    },
    style: {
      padding: "8px 18px",
      borderRadius: 10,
      border: "none",
      fontSize: 13,
      fontWeight: reviewTab === "pending" ? 700 : 500,
      background: reviewTab === "pending" ? "#1a1a2e" : "#f0ebe3",
      color: reviewTab === "pending" ? "white" : "#888",
      cursor: "pointer"
    }
  }, "Pending (", pendingReviews.length, ")"), /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      setReviewTab("replied");
    },
    style: {
      padding: "8px 18px",
      borderRadius: 10,
      border: "none",
      fontSize: 13,
      fontWeight: reviewTab === "replied" ? 700 : 500,
      background: reviewTab === "replied" ? "#1a1a2e" : "#f0ebe3",
      color: reviewTab === "replied" ? "white" : "#888",
      cursor: "pointer"
    }
  }, "Replied (", repliedReviews.length, ")")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, (reviewTab === "pending" ? pendingReviews : repliedReviews).map(function (rev) {
    var starsArr = [];
    for (var s = 0; s < 5; s++) {
      starsArr.push(s < rev.rating ? "#FBBC04" : "#e0dcd4");
    }
    return /*#__PURE__*/React.createElement("div", {
      key: rev.id,
      style: {
        background: "white",
        borderRadius: 16,
        padding: "20px 22px",
        border: "1px solid #eee8dd"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 20,
        background: rev.rating >= 4 ? "linear-gradient(135deg,#FBBC04,#EA4335)" : rev.rating >= 3 ? "linear-gradient(135deg,#f59e0b,#f97316)" : "linear-gradient(135deg,#ef4444,#dc2626)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 700,
        fontSize: 16
      }
    }, rev.avatar), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        color: "#1a1a2e",
        fontSize: 14
      }
    }, rev.name), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginTop: 2
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 1
      }
    }, starsArr.map(function (c, j) {
      return /*#__PURE__*/React.createElement(StarSvg, {
        key: j,
        size: 12,
        fill: c
      });
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "#bbb"
      }
    }, rev.time))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(GoogleG, {
      size: 18
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "#bbb"
      }
    }, "Google"))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "#555",
        lineHeight: 1.6,
        marginBottom: 16,
        paddingLeft: 52
      }
    }, "\"", rev.text, "\""), rev.replied ? /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 52,
        padding: "14px 18px",
        borderRadius: 12,
        background: "#22c55e08",
        border: "1px solid #22c55e20"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12
      }
    }, "\u2705"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "#22c55e"
      }
    }, "Reply posted")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "#555",
        lineHeight: 1.5
      }
    }, rev.replyText)) : /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 52,
        padding: "14px 18px",
        borderRadius: 12,
        background: "#7c3aed06",
        border: "1px solid #7c3aed15"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12
      }
    }, "\u2728"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "#7c3aed"
      }
    }, "AI-drafted reply"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        padding: "2px 6px",
        borderRadius: 4,
        background: "#7c3aed12",
        color: "#7c3aed",
        fontWeight: 600
      }
    }, "Claude")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "#555",
        lineHeight: 1.5,
        marginBottom: 12
      }
    }, rev.aiDraft), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        flexWrap: mob ? "wrap" : "nowrap"
      }
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        padding: "8px 18px",
        borderRadius: 8,
        border: "none",
        background: "linear-gradient(135deg,#22c55e,#16a34a)",
        color: "white",
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer"
      }
    }, "\u2705", " Approve & Post"), /*#__PURE__*/React.createElement("button", {
      style: {
        padding: "8px 18px",
        borderRadius: 8,
        border: "1px solid #e8e0d4",
        background: "transparent",
        color: "#888",
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer"
      }
    }, "\u270F\uFE0F", " Edit"), /*#__PURE__*/React.createElement("button", {
      style: {
        padding: "8px 18px",
        borderRadius: 8,
        border: "1px solid #e8e0d4",
        background: "transparent",
        color: "#888",
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer"
      }
    }, "\uD83D\uDD04", " Regenerate"))));
  }))), adminTab === "competitors" && isPro && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg, #1a1a2e, #2d2b55)",
      borderRadius: 16,
      padding: "24px 28px",
      marginBottom: 20,
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 18,
      fontWeight: 800,
      marginBottom: 16
    }
  }, "\uD83C\uDFC6", " Your Competitive Position"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: mob ? "repeat(3, 1fr)" : "repeat(3, 1fr)",
      gap: mob ? 8 : 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.4)",
      textTransform: "uppercase",
      fontWeight: 600,
      marginBottom: 4
    }
  }, "Your Rating"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: mob ? 26 : 36,
      fontWeight: 800,
      color: "#FBBC04"
    }
  }, rating), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,0.5)"
    }
  }, "vs avg ", (competitors.reduce(function (s, c) {
    return s + c.rating;
  }, 0) / competitors.length).toFixed(1))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.4)",
      textTransform: "uppercase",
      fontWeight: 600,
      marginBottom: 4
    }
  }, "Your Reviews"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: mob ? 26 : 36,
      fontWeight: 800,
      color: "#22c55e"
    }
  }, reviewCount), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,0.5)"
    }
  }, "vs avg ", Math.round(competitors.reduce(function (s, c) {
    return s + c.reviews;
  }, 0) / competitors.length))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.4)",
      textTransform: "uppercase",
      fontWeight: 600,
      marginBottom: 4
    }
  }, "Review Velocity"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: mob ? 26 : 36,
      fontWeight: 800,
      color: "#3b82f6"
    }
  }, thisWeek, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, "/wk"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 16,
      padding: "18px 22px",
      border: "2px solid #FBBC0433"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 40,
      borderRadius: 4,
      background: "linear-gradient(180deg,#FBBC04,#EA4335)"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: "#1a1a2e",
      fontSize: 15
    }
  }, businessName, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      color: "#22c55e",
      background: "#22c55e12",
      padding: "2px 6px",
      borderRadius: 4
    }
  }, "YOU")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement(Stars, {
    rating: rating,
    size: 12
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "#1a1a2e"
    }
  }, rating)))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 24,
      fontWeight: 800,
      color: "#1a1a2e"
    }
  }, reviewCount), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#22c55e",
      fontWeight: 600
    }
  }, "\u2191", " ", thisWeek, "/wk")))), competitors.map(function (comp, i) {
    var reviewDiff = reviewCount - comp.reviews;
    var ratingDiff = (rating - comp.rating).toFixed(1);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: "white",
        borderRadius: 16,
        padding: "18px 22px",
        border: "1px solid #eee8dd"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 8,
        height: 40,
        borderRadius: 4,
        background: "#e0dcd4"
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        color: "#1a1a2e",
        fontSize: 15
      }
    }, comp.name), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        marginTop: 3
      }
    }, /*#__PURE__*/React.createElement(Stars, {
      rating: comp.rating,
      size: 12
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#1a1a2e"
      }
    }, comp.rating), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: ratingDiff > 0 ? "#22c55e" : "#ef4444",
        fontWeight: 600,
        marginLeft: 4
      }
    }, ratingDiff > 0 ? "you're +" + ratingDiff + " higher" : "they're +" + Math.abs(ratingDiff) + " higher")))), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 24,
        fontWeight: 800,
        color: "#1a1a2e"
      }
    }, comp.reviews), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: reviewDiff > 0 ? "#22c55e" : "#ef4444",
        fontWeight: 600
      }
    }, reviewDiff > 0 ? "you lead by " + reviewDiff : "they lead by " + Math.abs(reviewDiff)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 16,
        marginTop: 12,
        paddingTop: 10,
        borderTop: "1px solid #f5f0ea"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#888"
      }
    }, "\uD83D\uDCCD", " ", comp.distance, " away"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#888"
      }
    }, "\uD83D\uDCC8", " ", comp.reviewsPerMonth, " reviews/mo"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: comp.trend > 0 ? "#ef4444" : comp.trend < 0 ? "#22c55e" : "#888"
      }
    }, comp.trend > 0 ? "\u2191 Rating rising" : comp.trend < 0 ? "\u2193 Rating dropping" : "\u2192 Rating stable")));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 16,
      padding: "20px 22px",
      border: "1px solid #eee8dd"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 14,
      fontWeight: 700,
      color: "#1a1a2e",
      marginBottom: 12
    }
  }, "\uD83D\uDCA1", " Competitive Insights"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, [{
    icon: "\uD83C\uDFC6",
    text: "You have the highest rating in your area (" + rating + ")",
    color: "#22c55e"
  }, {
    icon: "\uD83D\uDE80",
    text: "Your review velocity (" + thisWeek + "/wk) outpaces all competitors",
    color: "#3b82f6"
  }, {
    icon: "\u26A0\uFE0F",
    text: "Grand Traverse Wellness has 215 reviews \u2014 maintain pace to stay ahead",
    color: "#f59e0b"
  }, {
    icon: "\uD83D\uDCC8",
    text: "At your current rate, you'll hit 250 reviews in ~4 weeks",
    color: "#7c3aed"
  }].map(function (insight, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "10px 14px",
        background: insight.color + "06",
        borderRadius: 10,
        border: "1px solid " + insight.color + "15"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16,
        flexShrink: 0
      }
    }, insight.icon), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "#444",
        lineHeight: 1.5
      }
    }, insight.text));
  })))), adminTab === "settings" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: mob ? "1fr" : "1fr 1fr",
      gap: mob ? 10 : 14,
      marginBottom: mob ? 14 : 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 16,
      padding: "20px 22px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 14,
      fontWeight: 700,
      color: "#1a1a2e",
      marginBottom: 14
    }
  }, "Display Settings"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, theme === "dark" ? "\uD83C\uDF19" : "\u2600\uFE0F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "#1a1a2e"
    }
  }, "Dark Mode"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#aaa"
    }
  }, "Premium dark theme"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, !isPlus && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "2px 6px",
      borderRadius: 4,
      background: "#2563eb12",
      fontSize: 9,
      fontWeight: 800,
      color: "#2563eb"
    }
  }, "PLUS"), /*#__PURE__*/React.createElement("div", {
    onClick: function () {
      if (isPlus) {
        onThemeToggle();
      } else {
        onUpgrade("Unlock dark mode");
      }
    },
    style: {
      width: 40,
      height: 22,
      borderRadius: 11,
      cursor: "pointer",
      position: "relative",
      background: isPlus && theme === "dark" ? "#22c55e" : "#e0dcd4",
      transition: "background 0.2s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 9,
      background: "white",
      position: "absolute",
      top: 2,
      left: isPlus && theme === "dark" ? 20 : 2,
      transition: "left 0.2s ease",
      boxShadow: "0 1px 3px rgba(0,0,0,0.15)"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 16,
      paddingTop: 14,
      borderTop: "1px solid #f0ebe3"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, "\uD83D\uDD12"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "#1a1a2e"
    }
  }, "Admin PIN"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#aaa"
    }
  }, "Required to access dashboard"))), editingPin ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: newPin,
    onChange: function (e) {
      setNewPin(e.target.value.replace(/[^0-9]/g, "").slice(0, 6));
    },
    placeholder: "New PIN",
    autoFocus: true,
    maxLength: 6,
    style: {
      width: 80,
      padding: "5px 10px",
      borderRadius: 8,
      border: "1.5px solid #FBBC04",
      fontSize: 14,
      textAlign: "center",
      fontWeight: 700,
      letterSpacing: 4,
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      if (newPin.length >= 4) {
        onChangePin(newPin);
        setEditingPin(false);
      }
    },
    disabled: newPin.length < 4,
    style: {
      padding: "5px 12px",
      borderRadius: 8,
      border: "none",
      fontSize: 11,
      fontWeight: 700,
      background: newPin.length >= 4 ? "linear-gradient(135deg,#22c55e,#16a34a)" : "#e0dcd4",
      color: newPin.length >= 4 ? "white" : "#aaa",
      cursor: newPin.length >= 4 ? "pointer" : "default"
    }
  }, "Save"), /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      setEditingPin(false);
    },
    style: {
      padding: "5px 10px",
      borderRadius: 8,
      border: "none",
      fontSize: 11,
      fontWeight: 600,
      background: "transparent",
      color: "#888",
      cursor: "pointer"
    }
  }, "Cancel")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "#1a1a2e",
      letterSpacing: 3,
      fontFamily: "'Bricolage Grotesque', sans-serif"
    }
  }, adminPin), /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      setEditingPin(true);
      setNewPin("");
    },
    style: {
      padding: "4px 10px",
      borderRadius: 6,
      border: "1px solid #e8e0d4",
      fontSize: 11,
      fontWeight: 600,
      background: "transparent",
      color: "#666",
      cursor: "pointer"
    }
  }, "Change")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 16,
      padding: "20px 22px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 14,
      fontWeight: 700,
      color: "#1a1a2e",
      marginBottom: 14
    }
  }, "Rating Trend"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 4,
      height: 60
    }
  }, weeklyData.map(function (w, i) {
    var range = 0.5;
    var minR = Math.min.apply(null, weeklyData.map(function (d) {
      return d.rating;
    }));
    var h = range > 0 ? (w.rating - minR + 0.1) / (range + 0.2) * 100 : 50;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        fontWeight: 700,
        color: "#1a1a2e"
      }
    }, w.rating), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        height: h + "%",
        minHeight: 4,
        borderRadius: 4,
        background: i === weeklyData.length - 1 ? "linear-gradient(180deg,#22c55e,#16a34a)" : "#e8e0d4"
      }
    }));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 16,
      padding: "20px 22px",
      marginBottom: mob ? 10 : 14
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 14,
      fontWeight: 700,
      color: "#1a1a2e",
      marginBottom: 4
    }
  }, "Social Accounts"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#aaa",
      marginBottom: 14
    }
  }, "Connect your social profiles to show follower counts on your display"), !isPro && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 14px",
      background: "#7c3aed08",
      borderRadius: 10,
      border: "1px solid #7c3aed15",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#7c3aed",
      fontWeight: 600
    }
  }, "\u2B50", " Pro feature \u2014 ", /*#__PURE__*/React.createElement("span", {
    onClick: function () {
      onUpgrade("Unlock social follower display with Pro");
    },
    style: {
      textDecoration: "underline",
      cursor: "pointer"
    }
  }, "upgrade to enable"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, SOCIALS.map(function (soc) {
    var connected = socialConnected && socialConnected[soc.id];
    var count = socialCounts[soc.id];
    return /*#__PURE__*/React.createElement("div", {
      key: soc.id,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 14px",
        borderRadius: 10,
        border: "1px solid " + (connected ? soc.color + "30" : "#eee8dd"),
        background: connected ? soc.color + "06" : "transparent"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 32,
        height: 32,
        borderRadius: 8,
        background: soc.grad,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14
      }
    }, soc.id === "instagram" ? "\uD83D\uDCF7" : soc.id === "facebook" ? "\uD83D\uDC64" : "\uD83C\uDFB5")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: "#1a1a2e"
      }
    }, soc.label), connected && count && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: soc.color,
        fontWeight: 600
      }
    }, count.toLocaleString(), " followers"), !connected && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#bbb"
      }
    }, "Not connected"))), /*#__PURE__*/React.createElement("button", {
      onClick: function () {
        if (!isPro) {
          onUpgrade("Unlock social follower display with Pro");
          return;
        }
        onToggleSocial(soc.id);
      },
      style: {
        padding: "6px 14px",
        borderRadius: 8,
        border: connected ? "1px solid " + soc.color + "40" : "1px solid #ddd",
        background: connected ? "white" : isPro ? soc.grad : "#f5f0ea",
        color: connected ? soc.color : isPro ? "white" : "#aaa",
        fontSize: 11,
        fontWeight: 700,
        cursor: "pointer",
        opacity: isPro ? 1 : 0.6
      }
    }, connected ? "Disconnect" : "Connect"));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 16,
      padding: "20px 22px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 14,
      fontWeight: 700,
      color: "#1a1a2e",
      marginBottom: 14
    }
  }, "Account"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "#888"
    }
  }, "Current Plan"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "#1a1a2e"
    }
  }, plan.charAt(0).toUpperCase() + plan.slice(1))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "#888"
    }
  }, "Locations"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "#1a1a2e"
    }
  }, locations ? locations.length : 1)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "#888"
    }
  }, "Display Mode"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "#1a1a2e"
    }
  }, effectiveDisplayMode === "tv" ? "TV / Wall Mount" : "Tablet Counter"))), !isPro && /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      onUpgrade("Upgrade your plan");
    },
    style: {
      width: "100%",
      marginTop: 16,
      padding: 12,
      borderRadius: 10,
      border: "none",
      background: isPlus ? "linear-gradient(135deg,#7c3aed,#a855f7)" : "linear-gradient(135deg,#2563eb,#3b82f6)",
      color: "white",
      fontSize: 13,
      fontWeight: 700,
      cursor: "pointer"
    }
  }, isPlus ? "Upgrade to Pro" : "Upgrade Plan")))), showAddLocation && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 500,
      background: "rgba(0,0,0,0.4)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 24,
      width: "100%",
      maxWidth: 520,
      boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 28px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 20,
      fontWeight: 800,
      color: "#1a1a2e",
      margin: 0
    }
  }, "Add Location"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "#888",
      margin: "4px 0 0"
    }
  }, "Search for your Google Business Profile")), /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      setShowAddLocation(false);
    },
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      border: "none",
      background: "#f5f0ea",
      cursor: "pointer",
      fontSize: 16,
      color: "#888",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 28px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search business name or address...",
    value: locSearch,
    onChange: function (e) {
      setLocSearch(e.target.value);
    },
    onKeyDown: function (e) {
      if (e.key === "Enter") handleLocSearch();
    },
    style: {
      flex: 1,
      padding: "12px 16px",
      borderRadius: 12,
      fontSize: 14,
      border: "2px solid #e8e0d4",
      outline: "none",
      fontFamily: "'DM Sans', sans-serif",
      background: "#faf8f5"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: handleLocSearch,
    style: {
      padding: "12px 20px",
      borderRadius: 12,
      border: "none",
      fontSize: 14,
      fontWeight: 700,
      background: "linear-gradient(135deg,#FBBC04,#EA4335)",
      color: "white",
      cursor: "pointer",
      whiteSpace: "nowrap"
    }
  }, locSearching ? "Searching..." : "Search"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 28px 24px",
      maxHeight: 320,
      overflowY: "auto"
    }
  }, locSearching && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: 20,
      color: "#aaa",
      fontSize: 14
    }
  }, "Searching Google Business Profiles..."), !locSearching && locResults.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, locResults.map(function (r, i) {
    var alreadyAdded = locations.some(function (loc) {
      return loc.placeId === r.placeId;
    });
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        padding: "14px 16px",
        borderRadius: 14,
        border: "1.5px solid #e8e0d4",
        background: alreadyAdded ? "#f9f7f4" : "white",
        cursor: alreadyAdded ? "default" : "pointer",
        opacity: alreadyAdded ? 0.6 : 1
      },
      onClick: function () {
        if (alreadyAdded) return;
        onAddLocation({
          name: r.name,
          address: r.address,
          rating: r.rating,
          reviewCount: r.reviewCount,
          placeId: r.placeId
        });
        setShowAddLocation(false);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontWeight: 700,
        fontSize: 14,
        color: "#1a1a2e"
      }
    }, r.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#888",
        marginTop: 2
      }
    }, r.address)), alreadyAdded ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        padding: "3px 10px",
        borderRadius: 6,
        background: "#22c55e12",
        color: "#22c55e",
        fontWeight: 600
      }
    }, "Added") : /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        padding: "3px 10px",
        borderRadius: 6,
        background: "#2563eb12",
        color: "#2563eb",
        fontWeight: 600
      }
    }, "+ Add")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement(Stars, {
      rating: r.rating,
      size: 11
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: "#1a1a2e"
      }
    }, r.rating), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "#888"
      }
    }, "(", r.reviewCount, " reviews)")));
  })), !locSearching && locResults.length === 0 && locSearch && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: 20,
      color: "#bbb",
      fontSize: 14
    }
  }, "Type a business name and press Search")))));
}

/* ══════════════════════════════════════════════════════════════════════════════ */
/* ── DASHBOARD (state controller)                                           ── */
/* ══════════════════════════════════════════════════════════════════════════════ */
function Dashboard({
  config,
  onPersistPlan,
  onPersistTheme,
  onPersistPin,
  onPersistLocation,
  onVerifyPin
}) {
  var [plan, setPlan] = useState(config.plan || "free");
  var [showUpgrade, setShowUpgrade] = useState(false);
  var [upgradeTrigger, setUpgradeTrigger] = useState("");
  var [mode, setMode] = useState("customer");
  var [showPinEntry, setShowPinEntry] = useState(false);
  var [pin, setPin] = useState("1234");
  var [pinInput, setPinInput] = useState("");
  var [pinError, setPinError] = useState(false);
  var [theme, setTheme] = useState(config.theme || "light");
  var [reviewCount, setReviewCount] = useState(config.reviewCount);
  var [totalGained, setTotalGained] = useState(config.qrScans || 0);
  var [events, setEvents] = useState(config.events || []);
  var [latestEvent, setLatestEvent] = useState(null);
  var lastReviewId = useRef(null);
  var [locations, setLocations] = useState(config.locations && config.locations.length ? config.locations : [{
    name: config.businessName,
    address: config.address || "",
    placeId: config.placeId,
    rating: config.rating,
    reviewCount: config.reviewCount
  }]);
  var [activeLocationIdx, setActiveLocationIdx] = useState(0);
  var [socialCounts, setSocialCounts] = useState(function () {
    var c = {};
    SOCIALS.filter(function (p) {
      return config.socialConnected[p.id];
    }).forEach(function (p) {
      c[p.id] = Math.floor(Math.random() * 5000) + 500;
    });
    return c;
  });
  useEffect(function () {
    if (config.plan) setPlan(config.plan);
    if (config.theme) setTheme(config.theme);
    if (typeof config.reviewCount === "number") setReviewCount(config.reviewCount);
    if (typeof config.qrScans === "number") setTotalGained(config.qrScans);
    if (config.events) setEvents(config.events);
    if (config.locations && config.locations.length) setLocations(config.locations);
  }, [config.plan, config.theme, config.reviewCount, config.qrScans, config.events, config.locations]);
  useEffect(function () {
    var list = config.reviews || [];
    if (!list.length) return;
    var newest = list[0];
    if (lastReviewId.current && lastReviewId.current !== newest.id) {
      setLatestEvent({
        id: newest.id,
        type: "review",
        label: "Google Reviews",
        time: newest.time || "just now"
      });
    }
    lastReviewId.current = newest.id;
  }, [config.reviews]);
  var isPro = plan === "pro" || plan === "hardware" || plan === "enterprise";
  var isPlus = plan === "plus" || isPro;
  var activeLoc = locations[activeLocationIdx] || locations[0];
  var activeBusinessName = activeLoc.name;
  var activeRating = activeLoc.rating || config.rating;
  var activePlaceId = activeLoc.placeId || config.placeId;
  var effectiveDisplayMode = isPro ? config.displayMode : "ipad";
  var effectiveMinStars = isPro ? config.minStars : 0;
  var effectiveTheme = isPlus ? theme : "light";
  var activeSocial = isPro ? SOCIALS.filter(function (p) {
    return config.socialConnected[p.id];
  }) : [];
  var sourceReviews = config.reviews && config.reviews.length ? config.reviews : SAMPLE_REVIEWS;
  var filteredReviews = effectiveMinStars > 0 ? sourceReviews.filter(function (r) {
    return r.rating >= effectiveMinStars;
  }) : sourceReviews;
  var qrUrl = config.slug ? window.location.origin + "/r/" + config.slug : "https://search.google.com/local/writereview?placeid=" + activePlaceId;
  var followUrl = "https://reviewboost.com/follow/" + activeBusinessName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  var hasFollow = activeSocial.length > 0;
  function triggerUpgrade(reason) {
    setUpgradeTrigger(reason);
    setShowUpgrade(true);
  }
  var modal = showUpgrade ? /*#__PURE__*/React.createElement(UpgradeModal, {
    onClose: function () {
      setShowUpgrade(false);
    },
    onUpgrade: function (selectedPlan) {
      var next = selectedPlan || "pro";
      setPlan(next);
      setShowUpgrade(false);
      if (onPersistPlan) onPersistPlan(next);
    },
    trigger: upgradeTrigger
  }) : null;
  if (mode === "customer") {
    var DisplayComp = effectiveDisplayMode === "tv" ? TVDisplay : IPadDisplay;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DisplayComp, {
      businessName: activeBusinessName,
      locationAddress: activeLoc.address || "",
      logoUrl: config.logoUrl,
      reviewCount: reviewCount,
      rating: activeRating,
      reviews: filteredReviews,
      activeSocial: activeSocial,
      socialCounts: socialCounts,
      qrUrl: qrUrl,
      followUrl: followUrl,
      hasFollow: hasFollow,
      latestEvent: latestEvent,
      isPro: isPro,
      isPlus: isPlus,
      theme: effectiveTheme,
      onToggleTheme: function () {
        setTheme(function (t) {
          var next = t === "dark" ? "light" : "dark";
          if (onPersistTheme) onPersistTheme(next);
          return next;
        });
      },
      onAdmin: function () {
        setShowPinEntry(true);
        setPinInput("");
        setPinError(false);
      },
      onUpgrade: function () {
        triggerUpgrade("");
      }
    }), modal, showPinEntry && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 600,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      onClick: function () {
        setShowPinEntry(false);
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: function (e) {
        e.stopPropagation();
      },
      style: {
        background: "white",
        borderRadius: 28,
        width: 320,
        padding: "36px 32px",
        boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 52,
        height: 52,
        borderRadius: 14,
        background: "linear-gradient(135deg,#FBBC04,#EA4335)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 16px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 24
      }
    }, "\uD83D\uDD12")), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 20,
        fontWeight: 800,
        color: "#1a1a2e",
        margin: "0 0 6px"
      }
    }, "Admin Access"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        color: "#888",
        margin: "0 0 24px"
      }
    }, "Enter your 4-digit PIN to continue"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "center",
        gap: 12,
        marginBottom: 24
      }
    }, [0, 1, 2, 3].map(function (i) {
      var filled = pinInput.length > i;
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          width: 16,
          height: 16,
          borderRadius: 8,
          background: pinError ? "#ef4444" : filled ? "#1a1a2e" : "#e8e0d4",
          transition: "all 0.15s ease",
          transform: pinError ? "translateX(" + (i % 2 === 0 ? "-3" : "3") + "px)" : "none"
        }
      });
    })), pinError && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#ef4444",
        fontWeight: 600,
        marginBottom: 16
      }
    }, "Incorrect PIN. Try again."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 8,
        maxWidth: 240,
        margin: "0 auto"
      }
    }, [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"].map(function (n) {
      if (n === "") return /*#__PURE__*/React.createElement("div", {
        key: "empty"
      });
      var isDel = n === "del";
      return /*#__PURE__*/React.createElement("button", {
        key: n,
        onClick: function () {
          if (isDel) {
            setPinInput(function (p) {
              return p.slice(0, -1);
            });
            setPinError(false);
          } else {
            var newPin = pinInput + n;
            if (newPin.length <= 4) {
              setPinInput(newPin);
              setPinError(false);
              if (newPin.length === 4) {
                function accept() {
                  setShowPinEntry(false);
                  setMode("admin");
                }
                function reject() {
                  setPinError(true);
                  setTimeout(function () {
                    setPinInput("");
                  }, 600);
                }
                if (onVerifyPin) {
                  onVerifyPin(newPin).then(function (ok) {
                    if (ok) accept();
                    else reject();
                  }).catch(reject);
                } else if (newPin === pin) {
                  accept();
                } else {
                  reject();
                }
              }
            }
          }
        },
        style: {
          width: "100%",
          height: 52,
          borderRadius: 14,
          border: "none",
          background: isDel ? "transparent" : "#f5f0ea",
          fontSize: isDel ? 18 : 22,
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 700,
          color: isDel ? "#888" : "#1a1a2e",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, isDel ? "\u232B" : n);
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 20,
        fontSize: 11,
        color: "#bbb"
      }
    }, "Contact your administrator if you forgot the PIN"))));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AdminDash, {
    businessName: activeBusinessName,
    reviewCount: reviewCount,
    rating: activeRating,
    activeSocial: activeSocial,
    socialCounts: socialCounts,
    totalGained: totalGained,
    events: events,
    displayMode: config.displayMode,
    effectiveDisplayMode: effectiveDisplayMode,
    isPro: isPro,
    isPlus: isPlus,
    plan: plan,
    theme: theme,
    onThemeToggle: function () {
      setTheme(function (t) {
        var next = t === "dark" ? "light" : "dark";
        if (onPersistTheme) onPersistTheme(next);
        return next;
      });
    },
    onCustomer: function () {
      setMode("customer");
    },
    onUpgrade: function (reason) {
      triggerUpgrade(reason);
    },
    locations: locations,
    activeLocationIdx: activeLocationIdx,
    onSwitchLocation: function (idx) {
      setActiveLocationIdx(idx);
      var loc = locations[idx];
      if (loc) {
        setReviewCount(loc.reviewCount || config.reviewCount);
      }
    },
    onAddLocation: function (locData) {
      if (!isPro) {
        triggerUpgrade("Add multiple locations with Pro");
      } else if (locData && locData.name) {
        setLocations(function (prev) {
          return prev.concat([locData]);
        });
        setActiveLocationIdx(locations.length);
        if (onPersistLocation) onPersistLocation(locData);
      }
    },
    adminPin: pin,
    onChangePin: function (newPin) {
      setPin(newPin);
      if (onPersistPin) onPersistPin(newPin);
    },
    socialConnected: config.socialConnected,
    onToggleSocial: function (id) {
      config.socialConnected[id] = !config.socialConnected[id];
      var newCounts = {};
      SOCIALS.filter(function (p) {
        return config.socialConnected[p.id];
      }).forEach(function (p) {
        newCounts[p.id] = socialCounts[p.id] || Math.floor(Math.random() * 5000) + 500;
      });
      setSocialCounts(newCounts);
    }
  }), modal);
}

/* ══════════════════════════════════════════════════════════════════════════════ */
/* ── SAAS ADMIN DASHBOARD (Owner View)                                      ── */
/* ══════════════════════════════════════════════════════════════════════════════ */
function SaasAdmin({
  onBack,
  extraCustomers
}) {
  var [tab, setTab] = useState("overview");
  var [searchTerm, setSearchTerm] = useState("");
  var [mobileMenu, setMobileMenu] = useState(false);
  var [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(function () {
    function onResize() {
      setW(window.innerWidth);
    }
    window.addEventListener("resize", onResize);
    return function () {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  var mob = w < 700;

  /* Demo data — would come from your backend */

  var customers = [/* Enterprise accounts */
  {
    id: 1,
    name: "Aspen Dental Group",
    email: "ops@aspendg.com",
    plan: "enterprise",
    mrr: 3750,
    locations: 15,
    displays: 22,
    reviews: 4280,
    rating: 4.7,
    ratingBefore: 4.1,
    joined: "2025-06-10",
    status: "active",
    lastActive: "10 min ago",
    gbpUrl: "https://g.page/aspen-dental-group",
    phone: "(231) 555-0100",
    qrScans: 1842,
    reviewsPerMonth: 95,
    industry: "Dental"
  }, {
    id: 2,
    name: "VitalCare Medical Network",
    email: "admin@vitalcare.com",
    plan: "enterprise",
    mrr: 5000,
    locations: 20,
    displays: 28,
    reviews: 5120,
    rating: 4.8,
    ratingBefore: 4.2,
    joined: "2025-07-01",
    status: "active",
    lastActive: "5 min ago",
    gbpUrl: "https://g.page/vitalcare-medical",
    phone: "(312) 555-0200",
    qrScans: 2450,
    reviewsPerMonth: 128,
    industry: "Healthcare"
  }, {
    id: 3,
    name: "Radiant Skin Clinics",
    email: "hello@radiantskin.com",
    plan: "enterprise",
    mrr: 3000,
    locations: 12,
    displays: 16,
    reviews: 2890,
    rating: 4.9,
    ratingBefore: 4.3,
    joined: "2025-08-15",
    status: "active",
    lastActive: "1 hour ago",
    gbpUrl: "https://g.page/radiant-skin-clinics",
    phone: "(415) 555-0300",
    qrScans: 1680,
    reviewsPerMonth: 72,
    industry: "Med Spa"
  }, {
    id: 4,
    name: "PetFirst Veterinary",
    email: "dr.chen@petfirst.com",
    plan: "enterprise",
    mrr: 2500,
    locations: 10,
    displays: 14,
    reviews: 1950,
    rating: 4.8,
    ratingBefore: 4.0,
    joined: "2025-09-01",
    status: "active",
    lastActive: "2 hours ago",
    gbpUrl: "https://g.page/petfirst-vet",
    phone: "(512) 555-0400",
    qrScans: 1320,
    reviewsPerMonth: 58,
    industry: "Veterinary"
  }, {
    id: 5,
    name: "LuxeAuto Detailing",
    email: "mike@luxeauto.com",
    plan: "enterprise",
    mrr: 2250,
    locations: 9,
    displays: 12,
    reviews: 1680,
    rating: 4.7,
    ratingBefore: 4.2,
    joined: "2025-09-20",
    status: "active",
    lastActive: "30 min ago",
    gbpUrl: "https://g.page/luxeauto-detail",
    phone: "(310) 555-0500",
    qrScans: 980,
    reviewsPerMonth: 45,
    industry: "Auto"
  }, /* Pro + Hardware (multi-location) */
  {
    id: 6,
    name: "Element Longevity",
    email: "sarah@elementlongevity.com",
    plan: "hardware",
    mrr: 147,
    locations: 3,
    displays: 3,
    reviews: 315,
    rating: 4.8,
    ratingBefore: 4.2,
    joined: "2025-10-15",
    status: "active",
    lastActive: "2 hours ago",
    gbpUrl: "https://g.page/element-longevity",
    phone: "(231) 555-0600",
    qrScans: 347,
    reviewsPerMonth: 22,
    industry: "Wellness"
  }, {
    id: 51,
    name: "Elev8 Climbing and Fitness",
    email: "info@elev8climbing.com",
    plan: "pro",
    mrr: 29,
    locations: 1,
    displays: 2,
    reviews: 50,
    rating: 4.9,
    ratingBefore: 4.7,
    joined: "2026-01-20",
    status: "active",
    lastActive: "4 hours ago",
    gbpUrl: "https://g.page/elev8-climbing",
    phone: "(231) 600-7260",
    qrScans: 185,
    reviewsPerMonth: 8,
    industry: "Fitness"
  }, {
    id: 52,
    name: "The Filling Station Microbrewery",
    email: "hello@fillingstationbrew.com",
    plan: "pro",
    mrr: 29,
    locations: 1,
    displays: 1,
    reviews: 438,
    rating: 4.5,
    ratingBefore: 4.3,
    joined: "2026-02-01",
    status: "active",
    lastActive: "1 hour ago",
    gbpUrl: "https://g.page/filling-station-tc",
    phone: "(231) 946-8168",
    qrScans: 290,
    reviewsPerMonth: 18,
    industry: "Restaurant"
  }, {
    id: 53,
    name: "Rare Bird Brewpub",
    email: "hello@rarebirdpub.com",
    plan: "plus",
    mrr: 9,
    locations: 1,
    displays: 1,
    reviews: 312,
    rating: 4.6,
    ratingBefore: 4.4,
    joined: "2026-02-05",
    status: "active",
    lastActive: "6 hours ago",
    gbpUrl: "https://g.page/rare-bird-tc",
    phone: "(231) 252-2292",
    qrScans: 140,
    reviewsPerMonth: 12,
    industry: "Restaurant"
  }, {
    id: 7,
    name: "Zen Med Spa",
    email: "lisa@zenmedspa.com",
    plan: "hardware",
    mrr: 196,
    locations: 4,
    displays: 5,
    reviews: 580,
    rating: 4.7,
    ratingBefore: 4.1,
    joined: "2025-10-20",
    status: "active",
    lastActive: "5 hours ago",
    gbpUrl: "https://g.page/zen-med-spa",
    phone: "(305) 555-0700",
    qrScans: 520,
    reviewsPerMonth: 35,
    industry: "Med Spa"
  }, {
    id: 8,
    name: "Summit Physical Therapy",
    email: "david@summitpt.com",
    plan: "hardware",
    mrr: 147,
    locations: 3,
    displays: 4,
    reviews: 410,
    rating: 4.9,
    ratingBefore: 4.4,
    joined: "2025-11-01",
    status: "active",
    lastActive: "30 min ago",
    gbpUrl: "https://g.page/summit-pt",
    phone: "(720) 555-0800",
    qrScans: 380,
    reviewsPerMonth: 28,
    industry: "Physical Therapy"
  }, {
    id: 9,
    name: "Golden State Chiropractic",
    email: "dr.kim@goldenstatechiro.com",
    plan: "hardware",
    mrr: 98,
    locations: 2,
    displays: 2,
    reviews: 290,
    rating: 4.8,
    ratingBefore: 4.3,
    joined: "2025-11-10",
    status: "active",
    lastActive: "1 hour ago",
    gbpUrl: "https://g.page/goldenstate-chiro",
    phone: "(916) 555-0900",
    qrScans: 245,
    reviewsPerMonth: 18,
    industry: "Chiropractic"
  }, {
    id: 10,
    name: "Bella Vita Salon Collection",
    email: "nina@bellavita.com",
    plan: "hardware",
    mrr: 245,
    locations: 5,
    displays: 6,
    reviews: 720,
    rating: 4.6,
    ratingBefore: 4.0,
    joined: "2025-11-15",
    status: "active",
    lastActive: "3 hours ago",
    gbpUrl: "https://g.page/bella-vita-salon",
    phone: "(213) 555-1000",
    qrScans: 680,
    reviewsPerMonth: 42,
    industry: "Salon"
  }, /* Pro accounts */
  {
    id: 11,
    name: "Bright Smile Dental",
    email: "mike@brightsmile.com",
    plan: "pro",
    mrr: 87,
    locations: 3,
    displays: 3,
    reviews: 450,
    rating: 4.9,
    ratingBefore: 4.3,
    joined: "2025-11-20",
    status: "active",
    lastActive: "1 hour ago",
    gbpUrl: "https://g.page/bright-smile-dental",
    phone: "(617) 555-1100",
    qrScans: 310,
    reviewsPerMonth: 24,
    industry: "Dental"
  }, {
    id: 12,
    name: "Pawfect Vet Clinic",
    email: "anna@pawfectvet.com",
    plan: "pro",
    mrr: 58,
    locations: 2,
    displays: 2,
    reviews: 280,
    rating: 4.8,
    ratingBefore: 4.1,
    joined: "2025-12-01",
    status: "active",
    lastActive: "3 hours ago",
    gbpUrl: "https://g.page/pawfect-vet",
    phone: "(503) 555-1200",
    qrScans: 220,
    reviewsPerMonth: 16,
    industry: "Veterinary"
  }, {
    id: 13,
    name: "Iron Temple Gym",
    email: "coach@irontemple.com",
    plan: "pro",
    mrr: 58,
    locations: 2,
    displays: 3,
    reviews: 340,
    rating: 4.7,
    ratingBefore: 4.2,
    joined: "2025-12-05",
    status: "active",
    lastActive: "6 hours ago",
    gbpUrl: "https://g.page/iron-temple-gym",
    phone: "(480) 555-1300",
    qrScans: 290,
    reviewsPerMonth: 20,
    industry: "Fitness"
  }, {
    id: 14,
    name: "Serenity Yoga Studio",
    email: "amy@serenityyoga.com",
    plan: "pro",
    mrr: 29,
    locations: 1,
    displays: 1,
    reviews: 167,
    rating: 4.8,
    ratingBefore: 4.3,
    joined: "2025-12-10",
    status: "active",
    lastActive: "12 hours ago",
    gbpUrl: "https://g.page/serenity-yoga",
    phone: "(541) 555-1400",
    qrScans: 145,
    reviewsPerMonth: 12,
    industry: "Fitness"
  }, {
    id: 15,
    name: "ClearView Optometry",
    email: "dr.patel@clearview.com",
    plan: "pro",
    mrr: 87,
    locations: 3,
    displays: 3,
    reviews: 390,
    rating: 4.7,
    ratingBefore: 4.0,
    joined: "2025-12-15",
    status: "active",
    lastActive: "4 hours ago",
    gbpUrl: "https://g.page/clearview-optometry",
    phone: "(408) 555-1500",
    qrScans: 280,
    reviewsPerMonth: 22,
    industry: "Optometry"
  }, {
    id: 16,
    name: "Coastal Dermatology",
    email: "info@coastalderm.com",
    plan: "pro",
    mrr: 58,
    locations: 2,
    displays: 2,
    reviews: 310,
    rating: 4.9,
    ratingBefore: 4.5,
    joined: "2025-12-20",
    status: "active",
    lastActive: "2 hours ago",
    gbpUrl: "https://g.page/coastal-derm",
    phone: "(858) 555-1600",
    qrScans: 195,
    reviewsPerMonth: 15,
    industry: "Dermatology"
  }, {
    id: 17,
    name: "FreshBite Kitchen",
    email: "chef@freshbite.com",
    plan: "pro",
    mrr: 29,
    locations: 1,
    displays: 2,
    reviews: 520,
    rating: 4.6,
    ratingBefore: 4.1,
    joined: "2026-01-02",
    status: "active",
    lastActive: "1 hour ago",
    gbpUrl: "https://g.page/freshbite-kitchen",
    phone: "(773) 555-1700",
    qrScans: 410,
    reviewsPerMonth: 32,
    industry: "Restaurant"
  }, {
    id: 18,
    name: "Harmony Dental Arts",
    email: "dr.lee@harmonydental.com",
    plan: "pro",
    mrr: 58,
    locations: 2,
    displays: 2,
    reviews: 260,
    rating: 4.8,
    ratingBefore: 4.2,
    joined: "2026-01-05",
    status: "active",
    lastActive: "5 hours ago",
    gbpUrl: "https://g.page/harmony-dental",
    phone: "(206) 555-1800",
    qrScans: 185,
    reviewsPerMonth: 14,
    industry: "Dental"
  }, {
    id: 19,
    name: "Peak Performance PT",
    email: "coach@peakpt.com",
    plan: "pro",
    mrr: 29,
    locations: 1,
    displays: 1,
    reviews: 145,
    rating: 4.9,
    ratingBefore: 4.4,
    joined: "2026-01-08",
    status: "active",
    lastActive: "8 hours ago",
    gbpUrl: "https://g.page/peak-performance-pt",
    phone: "(303) 555-1900",
    qrScans: 120,
    reviewsPerMonth: 10,
    industry: "Physical Therapy"
  }, {
    id: 20,
    name: "Luxe Nail Lounge",
    email: "tina@luxenails.com",
    plan: "pro",
    mrr: 29,
    locations: 1,
    displays: 1,
    reviews: 210,
    rating: 4.7,
    ratingBefore: 4.2,
    joined: "2026-01-10",
    status: "active",
    lastActive: "2 hours ago",
    gbpUrl: "https://g.page/luxe-nail-lounge",
    phone: "(702) 555-2000",
    qrScans: 175,
    reviewsPerMonth: 14,
    industry: "Salon"
  }, /* Pro accounts continued */
  {
    id: 21,
    name: "Mountain View Family Medicine",
    email: "dr.garcia@mvfm.com",
    plan: "pro",
    mrr: 87,
    locations: 3,
    displays: 4,
    reviews: 480,
    rating: 4.8,
    ratingBefore: 4.1,
    joined: "2026-01-12",
    status: "active",
    lastActive: "45 min ago",
    gbpUrl: "https://g.page/mv-family-med",
    phone: "(650) 555-2100",
    qrScans: 340,
    reviewsPerMonth: 26,
    industry: "Healthcare"
  }, {
    id: 22,
    name: "Revive Aesthetics",
    email: "dr.jones@revive.com",
    plan: "pro",
    mrr: 58,
    locations: 2,
    displays: 2,
    reviews: 320,
    rating: 4.8,
    ratingBefore: 4.3,
    joined: "2026-01-14",
    status: "active",
    lastActive: "3 hours ago",
    gbpUrl: "https://g.page/revive-aesthetics",
    phone: "(949) 555-2200",
    qrScans: 260,
    reviewsPerMonth: 18,
    industry: "Med Spa"
  }, {
    id: 23,
    name: "TrueSmile Orthodontics",
    email: "dr.wong@truesmile.com",
    plan: "pro",
    mrr: 58,
    locations: 2,
    displays: 2,
    reviews: 275,
    rating: 4.9,
    ratingBefore: 4.4,
    joined: "2026-01-15",
    status: "active",
    lastActive: "6 hours ago",
    gbpUrl: "https://g.page/truesmile-ortho",
    phone: "(425) 555-2300",
    qrScans: 200,
    reviewsPerMonth: 15,
    industry: "Dental"
  }, /* Hardware accounts */
  {
    id: 24,
    name: "Maple Street Bakery",
    email: "kate@maplestreet.com",
    plan: "hardware",
    mrr: 49,
    locations: 1,
    displays: 1,
    reviews: 340,
    rating: 4.7,
    ratingBefore: 4.2,
    joined: "2026-01-16",
    status: "active",
    lastActive: "20 min ago",
    gbpUrl: "https://g.page/maple-street-bakery",
    phone: "(615) 555-2400",
    qrScans: 290,
    reviewsPerMonth: 22,
    industry: "Restaurant"
  }, {
    id: 25,
    name: "Evergreen Family Dental",
    email: "office@evergreendental.com",
    plan: "hardware",
    mrr: 98,
    locations: 2,
    displays: 2,
    reviews: 380,
    rating: 4.8,
    ratingBefore: 4.1,
    joined: "2026-01-18",
    status: "active",
    lastActive: "1 hour ago",
    gbpUrl: "https://g.page/evergreen-dental",
    phone: "(503) 555-2500",
    qrScans: 275,
    reviewsPerMonth: 20,
    industry: "Dental"
  }, /* Plus accounts */
  {
    id: 26,
    name: "Urban Cuts Barbershop",
    email: "james@urbancuts.com",
    plan: "plus",
    mrr: 9,
    locations: 1,
    displays: 1,
    reviews: 92,
    rating: 4.6,
    ratingBefore: 4.2,
    joined: "2026-01-20",
    status: "active",
    lastActive: "1 day ago",
    gbpUrl: "https://g.page/urban-cuts",
    phone: "(404) 555-2600",
    qrScans: 65,
    reviewsPerMonth: 6,
    industry: "Barbershop"
  }, {
    id: 27,
    name: "Glow Up Beauty",
    email: "rachel@glowup.com",
    plan: "plus",
    mrr: 9,
    locations: 1,
    displays: 1,
    reviews: 134,
    rating: 4.7,
    ratingBefore: 4.3,
    joined: "2026-01-22",
    status: "active",
    lastActive: "6 hours ago",
    gbpUrl: "https://g.page/glow-up-beauty",
    phone: "(704) 555-2700",
    qrScans: 95,
    reviewsPerMonth: 8,
    industry: "Beauty"
  }, {
    id: 28,
    name: "Happy Paws Grooming",
    email: "jen@happypaws.com",
    plan: "plus",
    mrr: 9,
    locations: 1,
    displays: 1,
    reviews: 78,
    rating: 4.5,
    ratingBefore: 4.1,
    joined: "2026-01-24",
    status: "active",
    lastActive: "1 day ago",
    gbpUrl: "https://g.page/happy-paws-groom",
    phone: "(919) 555-2800",
    qrScans: 55,
    reviewsPerMonth: 5,
    industry: "Pet Care"
  }, {
    id: 29,
    name: "Craft Coffee House",
    email: "brew@craftcoffee.com",
    plan: "plus",
    mrr: 9,
    locations: 1,
    displays: 1,
    reviews: 210,
    rating: 4.6,
    ratingBefore: 4.3,
    joined: "2026-01-25",
    status: "active",
    lastActive: "3 hours ago",
    gbpUrl: "https://g.page/craft-coffee",
    phone: "(971) 555-2900",
    qrScans: 180,
    reviewsPerMonth: 12,
    industry: "Restaurant"
  }, {
    id: 30,
    name: "Studio Pilates",
    email: "maria@studiopilates.com",
    plan: "plus",
    mrr: 9,
    locations: 1,
    displays: 1,
    reviews: 95,
    rating: 4.8,
    ratingBefore: 4.5,
    joined: "2026-01-26",
    status: "active",
    lastActive: "8 hours ago",
    gbpUrl: "https://g.page/studio-pilates",
    phone: "(512) 555-3000",
    qrScans: 70,
    reviewsPerMonth: 6,
    industry: "Fitness"
  }, {
    id: 31,
    name: "The Wax Bar",
    email: "hello@thewaxbar.com",
    plan: "plus",
    mrr: 9,
    locations: 1,
    displays: 1,
    reviews: 145,
    rating: 4.7,
    ratingBefore: 4.3,
    joined: "2026-01-27",
    status: "active",
    lastActive: "12 hours ago",
    gbpUrl: "https://g.page/the-wax-bar",
    phone: "(303) 555-3100",
    qrScans: 110,
    reviewsPerMonth: 9,
    industry: "Beauty"
  }, {
    id: 32,
    name: "Sunrise Pediatrics",
    email: "dr.brown@sunrisepeds.com",
    plan: "plus",
    mrr: 9,
    locations: 1,
    displays: 1,
    reviews: 180,
    rating: 4.9,
    ratingBefore: 4.5,
    joined: "2026-01-28",
    status: "active",
    lastActive: "2 hours ago",
    gbpUrl: "https://g.page/sunrise-peds",
    phone: "(972) 555-3200",
    qrScans: 130,
    reviewsPerMonth: 10,
    industry: "Healthcare"
  }, {
    id: 33,
    name: "Five Points Pizza",
    email: "tony@fivepointspizza.com",
    plan: "plus",
    mrr: 9,
    locations: 1,
    displays: 1,
    reviews: 420,
    rating: 4.5,
    ratingBefore: 4.1,
    joined: "2026-01-29",
    status: "active",
    lastActive: "40 min ago",
    gbpUrl: "https://g.page/five-points-pizza",
    phone: "(615) 555-3300",
    qrScans: 350,
    reviewsPerMonth: 28,
    industry: "Restaurant"
  }, /* Free accounts */
  {
    id: 34,
    name: "The Breakfast Spot",
    email: "tom@breakfastspot.com",
    plan: "free",
    mrr: 0,
    locations: 1,
    displays: 1,
    reviews: 67,
    rating: 4.4,
    ratingBefore: 4.2,
    joined: "2026-01-30",
    status: "active",
    lastActive: "2 days ago",
    gbpUrl: "https://g.page/breakfast-spot",
    phone: "(231) 555-3400",
    qrScans: 40,
    reviewsPerMonth: 4,
    industry: "Restaurant"
  }, {
    id: 35,
    name: "Bella Italia Restaurant",
    email: "marco@bellaitalia.com",
    plan: "free",
    mrr: 0,
    locations: 1,
    displays: 1,
    reviews: 45,
    rating: 4.3,
    ratingBefore: 4.1,
    joined: "2026-02-01",
    status: "trial",
    lastActive: "4 hours ago",
    gbpUrl: "https://g.page/bella-italia",
    phone: "(212) 555-3500",
    qrScans: 28,
    reviewsPerMonth: 3,
    industry: "Restaurant"
  }, {
    id: 36,
    name: "Lucky Dog Wash",
    email: "sam@luckydogwash.com",
    plan: "free",
    mrr: 0,
    locations: 1,
    displays: 1,
    reviews: 32,
    rating: 4.2,
    ratingBefore: 4.0,
    joined: "2026-02-03",
    status: "active",
    lastActive: "1 day ago",
    gbpUrl: "https://g.page/lucky-dog-wash",
    phone: "(615) 555-3600",
    qrScans: 22,
    reviewsPerMonth: 2,
    industry: "Pet Care"
  }, {
    id: 37,
    name: "Quick Lube Express",
    email: "rick@quicklube.com",
    plan: "free",
    mrr: 0,
    locations: 1,
    displays: 1,
    reviews: 18,
    rating: 4.1,
    ratingBefore: 4.0,
    joined: "2026-02-05",
    status: "trial",
    lastActive: "3 days ago",
    gbpUrl: "https://g.page/quick-lube-express",
    phone: "(817) 555-3700",
    qrScans: 12,
    reviewsPerMonth: 1,
    industry: "Auto"
  }, /* Churned */
  {
    id: 38,
    name: "Premier Auto Detailing",
    email: "carlos@premierauto.com",
    plan: "free",
    mrr: 0,
    locations: 1,
    displays: 1,
    reviews: 23,
    rating: 4.2,
    ratingBefore: 4.1,
    joined: "2026-02-10",
    status: "churned",
    lastActive: "2 weeks ago",
    gbpUrl: "https://g.page/premier-auto",
    phone: "(832) 555-3800",
    qrScans: 8,
    reviewsPerMonth: 1,
    industry: "Auto"
  }, {
    id: 39,
    name: "Faded Glory Tattoo",
    email: "ink@fadedglory.com",
    plan: "plus",
    mrr: 0,
    locations: 1,
    displays: 1,
    reviews: 55,
    rating: 4.4,
    ratingBefore: 4.3,
    joined: "2025-12-01",
    status: "churned",
    lastActive: "3 weeks ago",
    gbpUrl: "https://g.page/faded-glory",
    phone: "(503) 555-3900",
    qrScans: 30,
    reviewsPerMonth: 3,
    industry: "Tattoo"
  }, /* More Pro to hit $45K */
  {
    id: 40,
    name: "NorthShore Dental Partners",
    email: "admin@northshoredental.com",
    plan: "enterprise",
    mrr: 4500,
    locations: 18,
    displays: 24,
    reviews: 3800,
    rating: 4.7,
    ratingBefore: 4.0,
    joined: "2025-07-15",
    status: "active",
    lastActive: "15 min ago",
    gbpUrl: "https://g.page/northshore-dental",
    phone: "(847) 555-4000",
    qrScans: 2100,
    reviewsPerMonth: 105,
    industry: "Dental"
  }, {
    id: 41,
    name: "Pacific Wellness Group",
    email: "ops@pacificwellness.com",
    plan: "enterprise",
    mrr: 3500,
    locations: 14,
    displays: 18,
    reviews: 2950,
    rating: 4.8,
    ratingBefore: 4.2,
    joined: "2025-08-01",
    status: "active",
    lastActive: "25 min ago",
    gbpUrl: "https://g.page/pacific-wellness",
    phone: "(206) 555-4100",
    qrScans: 1750,
    reviewsPerMonth: 82,
    industry: "Wellness"
  }, {
    id: 42,
    name: "AllSmiles Orthodontics",
    email: "dr.rivera@allsmiles.com",
    plan: "enterprise",
    mrr: 3250,
    locations: 13,
    displays: 16,
    reviews: 2680,
    rating: 4.9,
    ratingBefore: 4.3,
    joined: "2025-08-20",
    status: "active",
    lastActive: "1 hour ago",
    gbpUrl: "https://g.page/allsmiles-ortho",
    phone: "(602) 555-4200",
    qrScans: 1480,
    reviewsPerMonth: 68,
    industry: "Dental"
  }, {
    id: 43,
    name: "Metro Physical Therapy Group",
    email: "admin@metropt.com",
    plan: "enterprise",
    mrr: 2750,
    locations: 11,
    displays: 14,
    reviews: 2200,
    rating: 4.7,
    ratingBefore: 4.1,
    joined: "2025-09-05",
    status: "active",
    lastActive: "45 min ago",
    gbpUrl: "https://g.page/metro-pt-group",
    phone: "(617) 555-4300",
    qrScans: 1350,
    reviewsPerMonth: 60,
    industry: "Physical Therapy"
  }, {
    id: 44,
    name: "SkinPerfect Aesthetics",
    email: "info@skinperfect.com",
    plan: "enterprise",
    mrr: 2000,
    locations: 8,
    displays: 10,
    reviews: 1800,
    rating: 4.8,
    ratingBefore: 4.2,
    joined: "2025-09-15",
    status: "active",
    lastActive: "2 hours ago",
    gbpUrl: "https://g.page/skinperfect",
    phone: "(310) 555-4400",
    qrScans: 1100,
    reviewsPerMonth: 52,
    industry: "Med Spa"
  }, {
    id: 45,
    name: "FitLife Gyms",
    email: "ops@fitlifegyms.com",
    plan: "enterprise",
    mrr: 3750,
    locations: 15,
    displays: 20,
    reviews: 3200,
    rating: 4.6,
    ratingBefore: 3.9,
    joined: "2025-09-25",
    status: "active",
    lastActive: "10 min ago",
    gbpUrl: "https://g.page/fitlife-gyms",
    phone: "(469) 555-4500",
    qrScans: 2800,
    reviewsPerMonth: 110,
    industry: "Fitness"
  }, {
    id: 46,
    name: "Lakeside Family Dental",
    email: "office@lakesidedental.com",
    plan: "pro",
    mrr: 87,
    locations: 3,
    displays: 3,
    reviews: 350,
    rating: 4.8,
    ratingBefore: 4.2,
    joined: "2026-01-01",
    status: "active",
    lastActive: "4 hours ago",
    gbpUrl: "https://g.page/lakeside-dental",
    phone: "(231) 555-4600",
    qrScans: 255,
    reviewsPerMonth: 18,
    industry: "Dental"
  }, {
    id: 47,
    name: "Ageless Beauty Clinic",
    email: "dr.shah@agelessbeauty.com",
    plan: "pro",
    mrr: 58,
    locations: 2,
    displays: 2,
    reviews: 290,
    rating: 4.9,
    ratingBefore: 4.4,
    joined: "2026-01-03",
    status: "active",
    lastActive: "5 hours ago",
    gbpUrl: "https://g.page/ageless-beauty",
    phone: "(214) 555-4700",
    qrScans: 210,
    reviewsPerMonth: 16,
    industry: "Med Spa"
  }, {
    id: 48,
    name: "Rivertown Brewing Co",
    email: "tap@rivertownbrew.com",
    plan: "pro",
    mrr: 29,
    locations: 1,
    displays: 2,
    reviews: 680,
    rating: 4.5,
    ratingBefore: 4.1,
    joined: "2026-01-04",
    status: "active",
    lastActive: "20 min ago",
    gbpUrl: "https://g.page/rivertown-brew",
    phone: "(616) 555-4800",
    qrScans: 520,
    reviewsPerMonth: 38,
    industry: "Restaurant"
  }, {
    id: 49,
    name: "Precision Eye Care",
    email: "dr.mehta@precisioneye.com",
    plan: "pro",
    mrr: 58,
    locations: 2,
    displays: 2,
    reviews: 230,
    rating: 4.8,
    ratingBefore: 4.3,
    joined: "2026-01-06",
    status: "active",
    lastActive: "7 hours ago",
    gbpUrl: "https://g.page/precision-eye",
    phone: "(408) 555-4900",
    qrScans: 170,
    reviewsPerMonth: 12,
    industry: "Optometry"
  }, {
    id: 50,
    name: "CoreFit CrossBox",
    email: "coach@corefitcb.com",
    plan: "pro",
    mrr: 29,
    locations: 1,
    displays: 1,
    reviews: 185,
    rating: 4.7,
    ratingBefore: 4.3,
    joined: "2026-01-07",
    status: "active",
    lastActive: "1 day ago",
    gbpUrl: "https://g.page/corefit-crossbox",
    phone: "(720) 555-5000",
    qrScans: 140,
    reviewsPerMonth: 10,
    industry: "Fitness"
  }];
  if (extraCustomers && extraCustomers.length) {
    customers = extraCustomers.concat(customers);
  }
  var computedMrr = customers.reduce(function (sum, c) {
    return sum + c.mrr;
  }, 0);
  var payingCustomers = customers.filter(function (c) {
    return c.mrr > 0;
  });
  var activeCustomers = customers.filter(function (c) {
    return c.status !== "churned";
  });
  var metrics = {
    totalCustomers: customers.length,
    activeDisplays: customers.reduce(function (sum, c) {
      return sum + c.displays;
    }, 0),
    mrr: computedMrr,
    arr: computedMrr * 12,
    churnRate: 3.2,
    trialConversions: 68,
    avgRevenuePerAccount: customers.length > 0 ? Math.round(computedMrr / customers.length * 100) / 100 : 0,
    totalReviews: customers.reduce(function (sum, c) {
      return sum + c.reviews;
    }, 0),
    qrScansThisMonth: 2847,
    newCustomersThisMonth: 8
  };
  var recentEvents = [{
    time: "2 min ago",
    text: "Bright Smile Dental display scanned 3 times",
    type: "scan"
  }, {
    time: "18 min ago",
    text: "New signup: Lakeside Chiropractic (free trial)",
    type: "signup"
  }, {
    time: "45 min ago",
    text: "Summit PT upgraded from Plus to Hardware bundle",
    type: "upgrade"
  }, {
    time: "1 hr ago",
    text: "Element Longevity received 2 new Google reviews",
    type: "review"
  }, {
    time: "2 hrs ago",
    text: "Elev8 Climbing and Fitness activated their display",
    type: "event"
  }, {
    time: "3 hrs ago",
    text: "The Filling Station Microbrewery upgraded to Pro",
    type: "upgrade"
  }, {
    time: "2 hrs ago",
    text: "Zen Med Spa added 3rd location",
    type: "expansion"
  }, {
    time: "3 hrs ago",
    text: "Payment received: Pawfect Vet $29.00",
    type: "payment"
  }, {
    time: "5 hrs ago",
    text: "Glow Up Beauty enabled dark mode",
    type: "config"
  }, {
    time: "8 hrs ago",
    text: "New signup: Mountain View Dental (pro trial)",
    type: "signup"
  }, {
    time: "1 day ago",
    text: "Premier Auto Detailing cancelled (churned)",
    type: "churn"
  }, {
    time: "1 day ago",
    text: "Happy Paws display scanned 12 times",
    type: "scan"
  }];
  var planColors = {
    free: "#888",
    plus: "#2563eb",
    pro: "#7c3aed",
    hardware: "#059669",
    enterprise: "#FBBC04"
  };
  var planLabels = {
    free: "Free",
    plus: "Plus",
    pro: "Pro",
    hardware: "Pro+HW",
    enterprise: "Enterprise"
  };
  var statusColors = {
    active: "#22c55e",
    trial: "#FBBC04",
    churned: "#ef4444"
  };
  var [selectedCustomer, setSelectedCustomer] = useState(null);
  var filteredCustomers = customers.filter(function (c) {
    return c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()) || c.plan.includes(searchTerm.toLowerCase());
  });
  var planBreakdown = {
    enterprise: 0,
    free: 0,
    plus: 0,
    pro: 0,
    hardware: 0
  };
  customers.forEach(function (c) {
    if (planBreakdown[c.plan] !== undefined) planBreakdown[c.plan]++;
  });
  var navItems = [{
    id: "overview",
    label: "Overview",
    icon: "\uD83D\uDCCA"
  }, {
    id: "customers",
    label: "Customers",
    icon: "\uD83D\uDC65"
  }, {
    id: "revenue",
    label: "Revenue",
    icon: "\uD83D\uDCB0"
  }, {
    id: "ads",
    label: "Ad Network",
    icon: "\uD83D\uDCE2"
  }, {
    id: "activity",
    label: "Activity",
    icon: "\u26A1"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "#f8f7f4",
      fontFamily: "'DM Sans', sans-serif",
      display: "flex",
      flexDirection: mob ? "column" : "row"
    }
  }, mob ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg, #1a1a2e, #2d2b55)",
      padding: "14px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(LogoIcon, {
    size: 28
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 14,
      fontWeight: 700,
      color: "white"
    }
  }, "ReviewBoost"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      color: "rgba(255,255,255,0.35)",
      fontWeight: 600
    }
  }, "ADMIN CONSOLE"))), /*#__PURE__*/React.createElement("div", {
    onClick: onBack,
    style: {
      fontSize: 12,
      color: "rgba(255,255,255,0.4)",
      cursor: "pointer"
    }
  }, "\u2190 Back")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4
    }
  }, navItems.map(function (item) {
    var active = tab === item.id;
    return /*#__PURE__*/React.createElement("div", {
      key: item.id,
      onClick: function () {
        setTab(item.id);
      },
      style: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        padding: "8px 4px",
        cursor: "pointer",
        borderRadius: 8,
        background: active ? "rgba(255,255,255,0.12)" : "transparent",
        borderBottom: active ? "2px solid #FBBC04" : "2px solid transparent",
        color: active ? "white" : "rgba(255,255,255,0.4)",
        fontSize: 11,
        fontWeight: active ? 600 : 500
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13
      }
    }, item.icon), item.label);
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: 240,
      background: "linear-gradient(180deg, #1a1a2e, #2d2b55)",
      padding: "24px 0",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "0 20px",
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(LogoIcon, {
    size: 32
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 16,
      fontWeight: 700,
      color: "white"
    }
  }, "ReviewBoost"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.35)",
      fontWeight: 600
    }
  }, "ADMIN CONSOLE"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, navItems.map(function (item) {
    var active = tab === item.id;
    return /*#__PURE__*/React.createElement("div", {
      key: item.id,
      onClick: function () {
        setTab(item.id);
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 20px",
        cursor: "pointer",
        background: active ? "rgba(255,255,255,0.08)" : "transparent",
        borderRight: active ? "3px solid #FBBC04" : "3px solid transparent",
        color: active ? "white" : "rgba(255,255,255,0.4)",
        fontSize: 14,
        fontWeight: active ? 600 : 500,
        transition: "all 0.15s"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16
      }
    }, item.icon), item.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onBack,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 0",
      fontSize: 13,
      color: "rgba(255,255,255,0.3)",
      cursor: "pointer"
    }
  }, "\u2190 Back to app"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: mob ? "20px 16px" : "32px 40px",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: mob ? 20 : 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: mob ? 22 : 28,
      fontWeight: 800,
      color: "#1a1a2e",
      marginBottom: 4
    }
  }, tab === "overview" && "Dashboard", tab === "customers" && "Customers", tab === "revenue" && "Revenue", tab === "ads" && "Ad Network", tab === "activity" && "Activity Feed"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#999"
    }
  }, "Last updated: just now")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 16px",
      borderRadius: 10,
      background: "white",
      border: "1px solid #e8e0d4",
      fontSize: 13,
      color: "#666"
    }
  }, "Feb 17, 2026"))), tab === "overview" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(5, 1fr)",
      gap: mob ? 10 : 14,
      marginBottom: mob ? 20 : 28
    }
  }, [{
    label: "MRR",
    value: "$" + metrics.mrr.toLocaleString(),
    change: "+12%",
    color: "#22c55e"
  }, {
    label: "Total Customers",
    value: metrics.totalCustomers,
    change: "+" + metrics.newCustomersThisMonth + " this mo",
    color: "#22c55e"
  }, {
    label: "Active Displays",
    value: metrics.activeDisplays,
    change: "",
    color: ""
  }, {
    label: "Rev / Account",
    value: "$" + metrics.avgRevenuePerAccount,
    change: "+$3.20",
    color: "#22c55e"
  }, {
    label: "Churn Rate",
    value: metrics.churnRate + "%",
    change: "-0.4%",
    color: "#22c55e"
  }].map(function (kpi, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: "white",
        borderRadius: 16,
        padding: "20px 18px",
        border: "1px solid #eee8dd"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#999",
        fontWeight: 500,
        marginBottom: 8
      }
    }, kpi.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 28,
        fontWeight: 800,
        color: "#1a1a2e",
        marginBottom: 4
      }
    }, kpi.value), kpi.change && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: kpi.color,
        fontWeight: 600
      }
    }, kpi.change));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: mob ? "1fr" : "1fr 1fr",
      gap: mob ? 16 : 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 16,
      padding: 24,
      border: "1px solid #eee8dd"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 16,
      fontWeight: 700,
      color: "#1a1a2e",
      marginBottom: 18
    }
  }, "Plan Distribution"), Object.keys(planBreakdown).map(function (plan) {
    var count = planBreakdown[plan];
    var pct = Math.round(count / customers.length * 100);
    return /*#__PURE__*/React.createElement("div", {
      key: plan,
      style: {
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 8,
        height: 8,
        borderRadius: 4,
        background: planColors[plan]
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: "#555"
      }
    }, planLabels[plan])), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "#999"
      }
    }, count, " (", pct, "%)")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        background: "#f0ebe3",
        borderRadius: 3,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        width: pct + "%",
        background: planColors[plan],
        borderRadius: 3,
        transition: "width 0.5s"
      }
    })));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      paddingTop: 16,
      borderTop: "1px solid #f0ebe3"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#999",
      marginBottom: 10
    }
  }, "Monthly Revenue by Plan"), [{
    plan: "pro",
    rev: planBreakdown.pro * 29
  }, {
    plan: "hardware",
    rev: planBreakdown.hardware * 49
  }, {
    plan: "plus",
    rev: planBreakdown.plus * 9
  }, {
    plan: "free",
    rev: 0
  }].map(function (r) {
    return /*#__PURE__*/React.createElement("div", {
      key: r.plan,
      style: {
        display: "flex",
        justifyContent: "space-between",
        padding: "4px 0"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "#666"
      }
    }, planLabels[r.plan]), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#1a1a2e"
      }
    }, "$", r.rev, "/mo"));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 16,
      padding: 24,
      border: "1px solid #eee8dd"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 16,
      fontWeight: 700,
      color: "#1a1a2e",
      marginBottom: 18
    }
  }, "Recent Activity"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 0
    }
  }, recentEvents.slice(0, 8).map(function (evt, i) {
    var iconMap = {
      scan: "\uD83D\uDCF1",
      signup: "\uD83C\uDF89",
      upgrade: "\u2B06\uFE0F",
      review: "\u2B50",
      expansion: "\uD83D\uDCCD",
      payment: "\uD83D\uDCB3",
      config: "\u2699\uFE0F",
      churn: "\uD83D\uDEA8"
    };
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "10px 0",
        borderBottom: i < 7 ? "1px solid #f5f0ea" : "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        flexShrink: 0,
        marginTop: 1
      }
    }, iconMap[evt.type] || "\u2022"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "#333",
        lineHeight: 1.4
      }
    }, evt.text), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#bbb",
        marginTop: 2
      }
    }, evt.time)));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)",
      gap: mob ? 10 : 14,
      marginTop: mob ? 16 : 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 16,
      padding: "20px 18px",
      border: "1px solid #eee8dd"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#999",
      marginBottom: 6
    }
  }, "Total Reviews Generated"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 32,
      fontWeight: 800,
      color: "#1a1a2e"
    }
  }, metrics.totalReviews.toLocaleString()), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#22c55e",
      fontWeight: 600
    }
  }, "Across all customers")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 16,
      padding: "20px 18px",
      border: "1px solid #eee8dd"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#999",
      marginBottom: 6
    }
  }, "QR Scans This Month"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 32,
      fontWeight: 800,
      color: "#1a1a2e"
    }
  }, metrics.qrScansThisMonth.toLocaleString()), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#3b82f6",
      fontWeight: 600
    }
  }, "18% scan-to-review rate")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 16,
      padding: "20px 18px",
      border: "1px solid #eee8dd"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#999",
      marginBottom: 6
    }
  }, "Trial \u2192 Paid Conversion"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 32,
      fontWeight: 800,
      color: "#1a1a2e"
    }
  }, metrics.trialConversions, "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#22c55e",
      fontWeight: 600
    }
  }, "+5% vs last month")))), tab === "customers" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
      gap: mob ? 10 : 14,
      marginBottom: mob ? 16 : 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 14,
      padding: "16px 20px",
      border: "1px solid #eee8dd"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#999",
      fontWeight: 600,
      marginBottom: 4
    }
  }, "TOTAL MRR"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 28,
      fontWeight: 800,
      color: "#22c55e"
    }
  }, "$", computedMrr.toLocaleString(), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: "#999"
    }
  }, "/mo"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 14,
      padding: "16px 20px",
      border: "1px solid #eee8dd"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#999",
      fontWeight: 600,
      marginBottom: 4
    }
  }, "TOTAL ARR"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 28,
      fontWeight: 800,
      color: "#1a1a2e"
    }
  }, "$", (computedMrr * 12).toLocaleString(), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: "#999"
    }
  }, "/yr"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 14,
      padding: "16px 20px",
      border: "1px solid #eee8dd"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#999",
      fontWeight: 600,
      marginBottom: 4
    }
  }, "PAYING CUSTOMERS"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 28,
      fontWeight: 800,
      color: "#1a1a2e"
    }
  }, payingCustomers.length, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: "#999"
    }
  }, " of ", customers.length))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 14,
      padding: "16px 20px",
      border: "1px solid #eee8dd"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#999",
      fontWeight: 600,
      marginBottom: 4
    }
  }, "REV / ACCOUNT"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 28,
      fontWeight: 800,
      color: "#1a1a2e"
    }
  }, "$", metrics.avgRevenuePerAccount, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: "#999"
    }
  }, "/mo")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: mob ? "column" : "row",
      gap: mob ? 8 : 12,
      marginBottom: mob ? 16 : 20
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: searchTerm,
    onChange: function (e) {
      setSearchTerm(e.target.value);
    },
    placeholder: "Search customers...",
    style: {
      flex: 1,
      padding: "10px 16px",
      borderRadius: 10,
      border: "1px solid #e8e0d4",
      fontSize: 14,
      fontFamily: "'DM Sans', sans-serif",
      background: "white",
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      flexWrap: "wrap"
    }
  }, ["all", "free", "plus", "pro", "hardware", "enterprise"].map(function (f) {
    return /*#__PURE__*/React.createElement("button", {
      key: f,
      onClick: function () {
        setSearchTerm(f === "all" ? "" : f);
      },
      style: {
        padding: mob ? "6px 10px" : "8px 14px",
        borderRadius: 8,
        border: "1px solid #e8e0d4",
        background: f === "all" && !searchTerm || searchTerm === f ? "#1a1a2e" : "white",
        color: f === "all" && !searchTerm || searchTerm === f ? "white" : "#666",
        fontSize: mob ? 11 : 12,
        fontWeight: 600,
        cursor: "pointer",
        textTransform: "capitalize"
      }
    }, f);
  }))), mob ?
  /*#__PURE__*/
  /* Mobile: Card list */
  React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, filteredCustomers.map(function (c) {
    return /*#__PURE__*/React.createElement("div", {
      key: c.id,
      onClick: function () {
        setSelectedCustomer(c);
        setTimeout(function () {
          var el = document.getElementById("customer-detail");
          if (el) el.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }, 50);
      },
      style: {
        background: "white",
        borderRadius: 14,
        padding: "14px 16px",
        border: "1px solid #eee8dd",
        cursor: "pointer",
        border: selectedCustomer && selectedCustomer.id === c.id ? "2px solid #FBBC04" : "1px solid #eee8dd"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        color: "#1a1a2e",
        fontSize: 14
      }
    }, c.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#bbb"
      }
    }, c.email)), /*#__PURE__*/React.createElement("span", {
      style: {
        padding: "3px 8px",
        borderRadius: 6,
        fontSize: 10,
        fontWeight: 700,
        textTransform: "uppercase",
        background: planColors[c.plan] + "15",
        color: planColors[c.plan]
      }
    }, planLabels[c.plan])), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "#666"
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: "#22c55e"
      }
    }, "$", c.mrr), "/mo"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "#666"
      }
    }, c.locations, " loc"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "#666"
      }
    }, c.reviews, " reviews"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: c.rating >= 4.7 ? "#22c55e" : "#FBBC04"
      }
    }, "\u2605 ", c.rating), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        fontSize: 11,
        color: statusColors[c.status]
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 5,
        height: 5,
        borderRadius: 3,
        background: statusColors[c.status]
      }
    }), c.status)));
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 16,
      border: "1px solid #eee8dd",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: "2px solid #f0ebe3"
    }
  }, ["Business", "Plan", "MRR", "Locations", "Reviews", "Rating", "Status", "Last Active"].map(function (h) {
    return /*#__PURE__*/React.createElement("th", {
      key: h,
      style: {
        padding: "14px 16px",
        textAlign: "left",
        fontSize: 11,
        fontWeight: 700,
        color: "#999",
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, h);
  }))), /*#__PURE__*/React.createElement("tbody", null, filteredCustomers.map(function (c) {
    return /*#__PURE__*/React.createElement("tr", {
      key: c.id,
      onClick: function () {
        setSelectedCustomer(c);
        setTimeout(function () {
          var el = document.getElementById("customer-detail");
          if (el) el.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }, 50);
      },
      style: {
        borderBottom: "1px solid #f5f0ea",
        cursor: "pointer",
        background: selectedCustomer && selectedCustomer.id === c.id ? "#faf8f5" : "transparent"
      },
      onMouseOver: function (e) {
        if (!(selectedCustomer && selectedCustomer.id === c.id)) e.currentTarget.style.background = "#fdfcfa";
      },
      onMouseOut: function (e) {
        if (!(selectedCustomer && selectedCustomer.id === c.id)) e.currentTarget.style.background = "transparent";
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "14px 16px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        color: "#1a1a2e"
      }
    }, c.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#bbb"
      }
    }, c.email)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "14px 16px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 6,
        background: planColors[c.plan] + "15",
        color: planColors[c.plan],
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase"
      }
    }, planLabels[c.plan])), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "14px 16px",
        fontWeight: 700,
        color: "#1a1a2e"
      }
    }, "$", c.mrr), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "14px 16px",
        color: "#666"
      }
    }, c.locations), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "14px 16px",
        color: "#666"
      }
    }, c.reviews), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "14px 16px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: c.rating >= 4.7 ? "#22c55e" : c.rating >= 4.5 ? "#FBBC04" : "#f97316"
      }
    }, "\u2605 ", c.rating)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "14px 16px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 11,
        fontWeight: 600,
        color: statusColors[c.status]
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: 3,
        background: statusColors[c.status]
      }
    }), c.status)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: "14px 16px",
        fontSize: 12,
        color: "#999"
      }
    }, c.lastActive));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontSize: 12,
      color: "#999",
      textAlign: "right"
    }
  }, "Showing ", filteredCustomers.length, " of ", customers.length, " customers"), selectedCustomer && /*#__PURE__*/React.createElement("div", {
    id: "customer-detail",
    style: {
      marginTop: 20,
      background: "white",
      borderRadius: 16,
      border: "1px solid #eee8dd",
      overflow: "hidden",
      animation: "fadeSlide 0.2s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: mob ? "16px" : "24px 28px",
      background: "linear-gradient(135deg, #1a1a2e, #2d2b55)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: mob ? 8 : 12,
      marginBottom: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: mob ? 17 : 22,
      fontWeight: 800,
      color: "white"
    }
  }, selectedCustomer.name), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "3px 10px",
      borderRadius: 6,
      fontSize: 10,
      fontWeight: 700,
      textTransform: "uppercase",
      background: planColors[selectedCustomer.plan] + "30",
      color: planColors[selectedCustomer.plan],
      border: "1px solid " + planColors[selectedCustomer.plan] + "40"
    }
  }, planLabels[selectedCustomer.plan]), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      fontSize: 11,
      fontWeight: 600,
      color: statusColors[selectedCustomer.status]
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 3,
      background: statusColors[selectedCustomer.status]
    }
  }), selectedCustomer.status)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "rgba(255,255,255,0.4)"
    }
  }, selectedCustomer.email, " \xB7 ", selectedCustomer.phone || "No phone", " \xB7 ", selectedCustomer.industry || "General")), /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      setSelectedCustomer(null);
    },
    style: {
      background: "rgba(255,255,255,0.1)",
      border: "none",
      color: "rgba(255,255,255,0.5)",
      width: 32,
      height: 32,
      borderRadius: 8,
      fontSize: 18,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: mob ? "16px" : "24px 28px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: mob ? "repeat(3, 1fr)" : "repeat(6, 1fr)",
      gap: mob ? 8 : 12,
      marginBottom: mob ? 16 : 24
    }
  }, [{
    label: "MRR",
    value: "$" + selectedCustomer.mrr,
    color: "#22c55e"
  }, {
    label: "Locations",
    value: selectedCustomer.locations,
    color: "#1a1a2e"
  }, {
    label: "Displays",
    value: selectedCustomer.displays,
    color: "#1a1a2e"
  }, {
    label: "Total Reviews",
    value: selectedCustomer.reviews,
    color: "#1a1a2e"
  }, {
    label: "Reviews/Month",
    value: selectedCustomer.reviewsPerMonth || "—",
    color: "#3b82f6"
  }, {
    label: "QR Scans",
    value: selectedCustomer.qrScans ? selectedCustomer.qrScans.toLocaleString() : "—",
    color: "#7c3aed"
  }].map(function (m, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        textAlign: "center",
        padding: "14px 8px",
        background: "#faf8f5",
        borderRadius: 12,
        border: "1px solid #f0ebe3"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: "#999",
        fontWeight: 600,
        textTransform: "uppercase",
        marginBottom: 6
      }
    }, m.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 22,
        fontWeight: 800,
        color: m.color
      }
    }, m.value));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: mob ? "1fr" : "1fr 1fr 1fr",
      gap: mob ? 10 : 16,
      marginBottom: mob ? 16 : 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      background: "#faf8f5",
      borderRadius: 14,
      border: "1px solid #f0ebe3"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#999",
      fontWeight: 600,
      textTransform: "uppercase",
      marginBottom: 10
    }
  }, "Rating Before ReviewBoost"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 36,
      fontWeight: 800,
      color: "#f97316"
    }
  }, selectedCustomer.ratingBefore || "—"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#f97316",
      fontSize: 18
    }
  }, "\u2605"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      background: "#faf8f5",
      borderRadius: 14,
      border: "1px solid #f0ebe3"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#999",
      fontWeight: 600,
      textTransform: "uppercase",
      marginBottom: 10
    }
  }, "Rating After ReviewBoost"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: mob ? 26 : 36,
      fontWeight: 800,
      color: "#22c55e"
    }
  }, selectedCustomer.rating), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#22c55e",
      fontSize: 18
    }
  }, "\u2605"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      background: "linear-gradient(135deg, #22c55e08, #22c55e03)",
      borderRadius: 14,
      border: "1px solid #22c55e22"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#999",
      fontWeight: 600,
      textTransform: "uppercase",
      marginBottom: 10
    }
  }, "Rating Improvement"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: mob ? 26 : 36,
      fontWeight: 800,
      color: "#22c55e"
    }
  }, "+", selectedCustomer.ratingBefore ? (selectedCustomer.rating - selectedCustomer.ratingBefore).toFixed(1) : "—"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "#22c55e",
      fontWeight: 700
    }
  }, "\u2191")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: mob ? "1fr" : "1fr 1fr",
      gap: mob ? 10 : 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      background: "#faf8f5",
      borderRadius: 14,
      border: "1px solid #f0ebe3"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#999",
      fontWeight: 600,
      textTransform: "uppercase",
      marginBottom: 12
    }
  }, "Account Details"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, [{
    label: "Customer Since",
    value: selectedCustomer.joined
  }, {
    label: "Last Active",
    value: selectedCustomer.lastActive
  }, {
    label: "Industry",
    value: selectedCustomer.industry || "General"
  }, {
    label: "Scan-to-Review Rate",
    value: selectedCustomer.qrScans && selectedCustomer.reviewsPerMonth ? Math.round(selectedCustomer.reviewsPerMonth / (selectedCustomer.qrScans / 30) * 100) + "%" : "—"
  }].map(function (row, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "#888"
      }
    }, row.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: "#1a1a2e"
      }
    }, row.value));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      background: "#faf8f5",
      borderRadius: 14,
      border: "1px solid #f0ebe3"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#999",
      fontWeight: 600,
      textTransform: "uppercase",
      marginBottom: 12
    }
  }, "Links & Actions"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, selectedCustomer.gbpUrl && /*#__PURE__*/React.createElement("a", {
    href: selectedCustomer.gbpUrl,
    target: "_blank",
    rel: "noreferrer",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 14px",
      background: "white",
      borderRadius: 10,
      border: "1px solid #e8e0d4",
      textDecoration: "none",
      fontSize: 13,
      fontWeight: 600,
      color: "#1a1a2e"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z",
    fill: "#4285F4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
    fill: "#34A853"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
    fill: "#FBBC04"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
    fill: "#EA4335"
  })), "Google Business Profile ", "\u2192"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 14px",
      background: "white",
      borderRadius: 10,
      border: "1px solid #e8e0d4",
      fontSize: 13,
      color: "#666"
    }
  }, "\uD83D\uDCE7", " ", selectedCustomer.email), selectedCustomer.phone && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 14px",
      background: "white",
      borderRadius: 10,
      border: "1px solid #e8e0d4",
      fontSize: 13,
      color: "#666"
    }
  }, "\uD83D\uDCDE", " ", selectedCustomer.phone))))))), tab === "revenue" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
      gap: mob ? 10 : 14,
      marginBottom: mob ? 20 : 28
    }
  }, [{
    label: "MRR",
    value: "$" + metrics.mrr,
    sub: "Monthly Recurring Revenue"
  }, {
    label: "ARR",
    value: "$" + metrics.arr.toLocaleString(),
    sub: "Annual Run Rate"
  }, {
    label: "ARPU",
    value: "$" + metrics.avgRevenuePerAccount,
    sub: "Revenue Per Account"
  }, {
    label: "LTV (est)",
    value: "$" + Math.round(metrics.avgRevenuePerAccount / (metrics.churnRate / 100)),
    sub: "Lifetime Value"
  }].map(function (kpi, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: "white",
        borderRadius: 16,
        padding: "20px 18px",
        border: "1px solid #eee8dd"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#999",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: 8
      }
    }, kpi.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 32,
        fontWeight: 800,
        color: "#1a1a2e",
        marginBottom: 4
      }
    }, kpi.value), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#bbb"
      }
    }, kpi.sub));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 16,
      padding: mob ? 16 : 24,
      border: "1px solid #eee8dd",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 16,
      fontWeight: 700,
      color: "#1a1a2e",
      marginBottom: 18
    }
  }, "MRR Breakdown"), function () {
    var revByPlan = {
      enterprise: 0,
      pro: 0,
      hardware: 0,
      plus: 0,
      free: 0
    };
    customers.forEach(function (c) {
      if (revByPlan[c.plan] !== undefined) revByPlan[c.plan] += c.mrr;
    });
    var segments = [{
      plan: "Enterprise",
      key: "enterprise",
      color: "#FBBC04",
      rev: revByPlan.enterprise
    }, {
      plan: "Pro",
      key: "pro",
      color: "#7c3aed",
      rev: revByPlan.pro
    }, {
      plan: "Pro+HW",
      key: "hardware",
      color: "#059669",
      rev: revByPlan.hardware
    }, {
      plan: "Plus",
      key: "plus",
      color: "#2563eb",
      rev: revByPlan.plus
    }].filter(function (s) {
      return s.rev > 0;
    });
    var total = segments.reduce(function (sum, s) {
      return sum + s.rev;
    }, 0);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        height: 40,
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 16
      }
    }, segments.map(function (seg) {
      var pct = total > 0 ? seg.rev / total * 100 : 0;
      return /*#__PURE__*/React.createElement("div", {
        key: seg.key,
        style: {
          width: pct + "%",
          background: seg.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: mob ? 9 : 11,
          fontWeight: 700,
          color: seg.key === "enterprise" ? "#1a1a2e" : "white",
          minWidth: pct > 3 ? "auto" : 0,
          overflow: "hidden"
        }
      }, pct > 8 ? "$" + seg.rev.toLocaleString() : "");
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: mob ? 10 : 20,
        flexWrap: "wrap"
      }
    }, segments.map(function (l) {
      return /*#__PURE__*/React.createElement("div", {
        key: l.key,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 10,
          height: 10,
          borderRadius: 3,
          background: l.color
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          color: "#666"
        }
      }, l.plan, ": $", l.rev.toLocaleString(), "/mo"));
    })));
  }()), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 16,
      padding: 24,
      border: "1px solid #eee8dd"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: 16,
      fontWeight: 700,
      color: "#1a1a2e",
      marginBottom: 18
    }
  }, "Recent Payments"), customers.filter(function (c) {
    return c.mrr > 0;
  }).map(function (c, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: c.id,
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 0",
        borderBottom: i < 7 ? "1px solid #f5f0ea" : "none"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: "#1a1a2e"
      }
    }, c.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#bbb"
      }
    }, c.joined, " \xB7 ", planLabels[c.plan])), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 16,
        fontWeight: 700,
        color: "#22c55e"
      }
    }, "+$", c.mrr, ".00"));
  }))), tab === "ads" && function () {
    var advertisers = [{
      id: 1,
      name: "Midwest Family Insurance",
      industry: "Insurance",
      logo: "\uD83D\uDEE1\uFE0F",
      headline: "Protect What Matters",
      body: "Local family coverage from $29/mo. Free quote today.",
      cta: "Get Quote",
      url: "https://midwestfamily.com",
      status: "active",
      budget: 2400,
      spent: 1847,
      impressions: 48200,
      qrScans: 312,
      cpm: 38.3,
      startDate: "2026-01-15",
      endDate: "2026-03-15",
      targeting: {
        geo: "Traverse City, MI (25mi)",
        industries: ["Dental", "Healthcare", "Wellness"]
      }
    }, {
      id: 2,
      name: "LakeView Orthodontics",
      industry: "Dental",
      logo: "\uD83E\uDE77",
      headline: "Straighter Smile, 6 Months",
      body: "Invisible aligners starting at $99/mo. Free consult.",
      cta: "Book Free Consult",
      url: "https://lakeviewortho.com",
      status: "active",
      budget: 1800,
      spent: 1205,
      impressions: 35600,
      qrScans: 245,
      cpm: 33.8,
      startDate: "2026-01-20",
      endDate: "2026-04-20",
      targeting: {
        geo: "Grand Traverse County, MI",
        industries: ["Med Spa", "Salon", "Fitness"]
      }
    }, {
      id: 3,
      name: "TC Brewing Co",
      industry: "Restaurant",
      logo: "\uD83C\uDF7A",
      headline: "Craft Beer, Local Roots",
      body: "Live music Fridays. Happy hour 4-6pm daily.",
      cta: "See Events",
      url: "https://tcbrewing.com",
      status: "active",
      budget: 800,
      spent: 620,
      impressions: 22400,
      qrScans: 187,
      cpm: 27.7,
      startDate: "2026-02-01",
      endDate: "2026-02-28",
      targeting: {
        geo: "Traverse City, MI (10mi)",
        industries: ["Restaurant", "Barbershop", "Auto"]
      }
    }, {
      id: 4,
      name: "Northern Michigan Realty",
      industry: "Real Estate",
      logo: "\uD83C\uDFE0",
      headline: "Find Your Dream Home",
      body: "200+ listings in TC area. Market is hot — act now.",
      cta: "Browse Homes",
      url: "https://nmrealty.com",
      status: "active",
      budget: 3200,
      spent: 2890,
      impressions: 62100,
      qrScans: 428,
      cpm: 46.5,
      startDate: "2026-01-01",
      endDate: "2026-03-31",
      targeting: {
        geo: "Northern Michigan",
        industries: ["All"]
      }
    }, {
      id: 5,
      name: "PureFit Supplements",
      industry: "Health",
      logo: "\uD83D\uDCAA",
      headline: "Fuel Your Workout",
      body: "Lab-tested protein & pre-workout. 20% off first order.",
      cta: "Shop Now",
      url: "https://purefit.com",
      status: "paused",
      budget: 1200,
      spent: 450,
      impressions: 14800,
      qrScans: 98,
      cpm: 30.4,
      startDate: "2026-01-10",
      endDate: "2026-04-10",
      targeting: {
        geo: "National",
        industries: ["Fitness", "Wellness", "Physical Therapy"]
      }
    }, {
      id: 6,
      name: "Bright Path Tutoring",
      industry: "Education",
      logo: "\uD83D\uDCDA",
      headline: "Your Kid Can Ace Math",
      body: "1-on-1 tutoring, K-12. First session free.",
      cta: "Book Session",
      url: "https://brightpath.com",
      status: "ended",
      budget: 600,
      spent: 600,
      impressions: 18200,
      qrScans: 134,
      cpm: 33.0,
      startDate: "2025-12-01",
      endDate: "2026-01-31",
      targeting: {
        geo: "Traverse City, MI",
        industries: ["Dental", "Healthcare", "Pediatrics"]
      }
    }];
    var activeAds = advertisers.filter(function (a) {
      return a.status === "active";
    });
    var totalImpressions = advertisers.reduce(function (s, a) {
      return s + a.impressions;
    }, 0);
    var totalScans = advertisers.reduce(function (s, a) {
      return s + a.qrScans;
    }, 0);
    var totalAdRevenue = advertisers.reduce(function (s, a) {
      return s + a.spent;
    }, 0);
    var totalBudget = advertisers.reduce(function (s, a) {
      return s + a.budget;
    }, 0);
    var freeDisplays = customers.filter(function (c) {
      return c.plan === "free";
    }).length;
    var totalDisplays = customers.reduce(function (s, c) {
      return s + c.displays;
    }, 0);
    var adEligibleDisplays = customers.filter(function (c) {
      return c.plan === "free";
    }).reduce(function (s, c) {
      return s + c.displays;
    }, 0) + Math.round(totalDisplays * 0.1);
    var avgScanRate = totalImpressions > 0 ? (totalScans / totalImpressions * 100).toFixed(1) : 0;
    var statusColors2 = {
      active: "#22c55e",
      paused: "#f59e0b",
      ended: "#888"
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        gap: mob ? 10 : 14,
        marginBottom: mob ? 16 : 24
      }
    }, [{
      label: "Ad Revenue (MTD)",
      value: "$" + totalAdRevenue.toLocaleString(),
      sub: "of $" + totalBudget.toLocaleString() + " total budget",
      color: "#22c55e"
    }, {
      label: "Total Impressions",
      value: totalImpressions.toLocaleString(),
      sub: "across " + adEligibleDisplays + " ad-eligible displays",
      color: "#3b82f6"
    }, {
      label: "QR Scan-Throughs",
      value: totalScans.toLocaleString(),
      sub: avgScanRate + "% scan rate",
      color: "#7c3aed"
    }, {
      label: "Active Campaigns",
      value: activeAds.length,
      sub: advertisers.length + " total campaigns",
      color: "#f59e0b"
    }].map(function (kpi, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          background: "white",
          borderRadius: 16,
          padding: mob ? "16px 14px" : "20px 18px",
          border: "1px solid #eee8dd"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          fontWeight: 700,
          color: "#999",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 8
        }
      }, kpi.label), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: mob ? 24 : 30,
          fontWeight: 800,
          color: "#1a1a2e"
        }
      }, kpi.value), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: kpi.color,
          fontWeight: 600,
          marginTop: 4
        }
      }, kpi.sub));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "linear-gradient(135deg, #1a1a2e, #2d2b55)",
        borderRadius: 16,
        padding: mob ? 20 : 28,
        marginBottom: mob ? 16 : 24,
        color: "white"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20
      }
    }, "\uD83D\uDCE2"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: mob ? 16 : 18,
        fontWeight: 800
      }
    }, "Network Media Kit")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        gap: mob ? 10 : 16
      }
    }, [{
      stat: totalDisplays,
      label: "Total Displays",
      icon: "\uD83D\uDCF1"
    }, {
      stat: Math.round(totalImpressions * 2.4).toLocaleString(),
      label: "Monthly Impressions",
      icon: "\uD83D\uDC41\uFE0F"
    }, {
      stat: "15-20 min",
      label: "Avg Dwell Time",
      icon: "\u23F1\uFE0F"
    }, {
      stat: customers.length,
      label: "Business Locations",
      icon: "\uD83D\uDCCD"
    }].map(function (s, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          background: "rgba(255,255,255,0.06)",
          borderRadius: 12,
          padding: mob ? "12px 10px" : "16px 14px",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,0.08)"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: mob ? 18 : 24,
          marginBottom: 4
        }
      }, s.icon), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: mob ? 20 : 24,
          fontWeight: 800,
          color: "#FBBC04"
        }
      }, s.stat), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: mob ? 10 : 11,
          color: "rgba(255,255,255,0.5)",
          fontWeight: 600,
          marginTop: 2
        }
      }, s.label));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        display: "grid",
        gridTemplateColumns: mob ? "1fr" : "1fr 1fr 1fr",
        gap: mob ? 8 : 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "rgba(255,255,255,0.04)",
        borderRadius: 10,
        padding: "12px 14px",
        border: "1px solid rgba(255,255,255,0.06)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: "rgba(255,255,255,0.4)",
        fontWeight: 600,
        textTransform: "uppercase",
        marginBottom: 4
      }
    }, "Top Industries"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "rgba(255,255,255,0.8)"
      }
    }, "Dental (28%) \xB7 Healthcare (22%) \xB7 Med Spa (16%) \xB7 Fitness (12%)")), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "rgba(255,255,255,0.04)",
        borderRadius: 10,
        padding: "12px 14px",
        border: "1px solid rgba(255,255,255,0.06)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: "rgba(255,255,255,0.4)",
        fontWeight: 600,
        textTransform: "uppercase",
        marginBottom: 4
      }
    }, "Top Metros"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "rgba(255,255,255,0.8)"
      }
    }, "Traverse City \xB7 Chicago \xB7 San Francisco \xB7 Denver \xB7 Austin")), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "rgba(255,255,255,0.04)",
        borderRadius: 10,
        padding: "12px 14px",
        border: "1px solid rgba(255,255,255,0.06)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: "rgba(255,255,255,0.4)",
        fontWeight: 600,
        textTransform: "uppercase",
        marginBottom: 4
      }
    }, "Avg CPM"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "rgba(255,255,255,0.8)"
      }
    }, "$27-46 \xB7 QR scan rate: ", avgScanRate, "% \xB7 Captive audience")))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: mob ? "1fr" : "1fr 1fr",
        gap: mob ? 16 : 20,
        marginBottom: mob ? 16 : 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "white",
        borderRadius: 16,
        padding: mob ? 20 : 24,
        border: "1px solid #eee8dd"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 16,
        fontWeight: 700,
        color: "#1a1a2e",
        marginBottom: 16
      }
    }, "Ad Creative Specs"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, [{
      label: "Logo / Icon",
      spec: "80Ã—80px, PNG or SVG",
      note: "Square format, will be rounded"
    }, {
      label: "Headline",
      spec: "30 characters max",
      note: "Bold, attention-grabbing"
    }, {
      label: "Body Text",
      spec: "60 characters max",
      note: "Value prop + offer"
    }, {
      label: "CTA Button",
      spec: "20 characters max",
      note: "e.g. 'Get Quote', 'Book Now'"
    }, {
      label: "Landing URL",
      spec: "Any valid URL",
      note: "QR auto-generated from this"
    }].map(function (row, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          padding: "10px 14px",
          background: "#faf8f5",
          borderRadius: 10,
          border: "1px solid #f0ebe3"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          fontWeight: 700,
          color: "#1a1a2e"
        }
      }, row.label), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          fontWeight: 600,
          color: "#7c3aed",
          background: "#7c3aed10",
          padding: "2px 8px",
          borderRadius: 4
        }
      }, row.spec)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#999"
        }
      }, row.note));
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "white",
        borderRadius: 16,
        padding: mob ? 20 : 24,
        border: "1px solid #eee8dd"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 16,
        fontWeight: 700,
        color: "#1a1a2e",
        marginBottom: 16
      }
    }, "Live Ad Preview"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 12,
        fontSize: 11,
        color: "#999",
        fontWeight: 600,
        textTransform: "uppercase"
      }
    }, "Light Theme"), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#faf8f5",
        borderRadius: 14,
        padding: "14px 16px",
        border: "1px solid #f0ebe3",
        marginBottom: 16,
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 48,
        height: 48,
        borderRadius: 12,
        background: "linear-gradient(135deg,#2563eb,#3b82f6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
        flexShrink: 0
      }
    }, "\uD83D\uDEE1\uFE0F"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#1a1a2e"
      }
    }, "Protect What Matters"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#888",
        marginTop: 1
      }
    }, "Local family coverage from $29/mo")), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "6px 12px",
        borderRadius: 8,
        background: "#1a1a2e",
        color: "white",
        fontSize: 10,
        fontWeight: 700,
        flexShrink: 0,
        cursor: "pointer"
      }
    }, "Get Quote")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 12,
        fontSize: 11,
        color: "#999",
        fontWeight: 600,
        textTransform: "uppercase"
      }
    }, "Dark Theme"), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "linear-gradient(135deg,#0f0f1a,#1a1a2e)",
        borderRadius: 14,
        padding: "14px 16px",
        border: "1px solid rgba(255,255,255,0.08)",
        marginBottom: 16,
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 48,
        height: 48,
        borderRadius: 12,
        background: "rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
        flexShrink: 0
      }
    }, "\uD83D\uDEE1\uFE0F"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "white"
      }
    }, "Protect What Matters"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "rgba(255,255,255,0.45)",
        marginTop: 1
      }
    }, "Local family coverage from $29/mo")), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "6px 12px",
        borderRadius: 8,
        background: "rgba(255,255,255,0.1)",
        color: "white",
        fontSize: 10,
        fontWeight: 700,
        flexShrink: 0,
        border: "1px solid rgba(255,255,255,0.15)",
        cursor: "pointer"
      }
    }, "Get Quote")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 12,
        fontSize: 11,
        color: "#999",
        fontWeight: 600,
        textTransform: "uppercase"
      }
    }, "Dual Banner (Landscape)"), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#faf8f5",
        borderRadius: 14,
        padding: "12px 14px",
        border: "1px solid #f0ebe3",
        display: "flex",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 10px",
        background: "white",
        borderRadius: 8,
        border: "1px solid #eee"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 32,
        height: 32,
        borderRadius: 8,
        background: "linear-gradient(135deg,#f59e0b,#f97316)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16
      }
    }, "\uD83C\uDF7A"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        color: "#1a1a2e"
      }
    }, "Craft Beer, Local Roots"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        color: "#999"
      }
    }, "Live music Fridays"))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 10px",
        background: "white",
        borderRadius: 8,
        border: "1px solid #eee"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 32,
        height: 32,
        borderRadius: 8,
        background: "linear-gradient(135deg,#22c55e,#10b981)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16
      }
    }, "\uD83C\uDFE0"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        color: "#1a1a2e"
      }
    }, "Find Your Dream Home"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        color: "#999"
      }
    }, "200+ listings in TC")))))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "white",
        borderRadius: 16,
        padding: mob ? 20 : 24,
        border: "1px solid #eee8dd",
        marginBottom: mob ? 16 : 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 16,
        fontWeight: 700,
        color: "#1a1a2e",
        marginBottom: 16
      }
    }, "Rate Card"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)",
        gap: mob ? 10 : 14
      }
    }, [{
      tier: "Local",
      price: "$200",
      period: "/mo",
      desc: "Single metro area",
      reach: "~5K impressions/mo",
      targeting: "1 city, all industries",
      color: "#3b82f6"
    }, {
      tier: "Regional",
      price: "$750",
      period: "/mo",
      desc: "Multi-metro or state",
      reach: "~20K impressions/mo",
      targeting: "State or radius, industry filter",
      color: "#7c3aed",
      badge: "POPULAR"
    }, {
      tier: "National",
      price: "$2,500",
      period: "/mo",
      desc: "Full network access",
      reach: "~80K+ impressions/mo",
      targeting: "All locations, all industries",
      color: "#f59e0b",
      badge: "PREMIUM"
    }].map(function (t, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          padding: mob ? "16px 14px" : "20px 18px",
          borderRadius: 14,
          border: "2px solid " + (t.badge ? t.color + "33" : "#eee8dd"),
          position: "relative",
          background: t.badge ? t.color + "04" : "white"
        }
      }, t.badge && /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          top: -8,
          right: 12,
          padding: "2px 8px",
          borderRadius: 4,
          fontSize: 9,
          fontWeight: 800,
          color: "white",
          background: t.color
        }
      }, t.badge), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          fontWeight: 700,
          color: t.color,
          textTransform: "uppercase",
          marginBottom: 6
        }
      }, t.tier), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: 28,
          fontWeight: 800,
          color: "#1a1a2e",
          lineHeight: 1
        }
      }, t.price, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          fontWeight: 500,
          color: "#888"
        }
      }, t.period)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#888",
          marginTop: 4,
          marginBottom: 12
        }
      }, t.desc), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 6
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#555"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: t.color,
          fontWeight: 700
        }
      }, "\u2713"), " ", t.reach), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#555"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: t.color,
          fontWeight: 700
        }
      }, "\u2713"), " ", t.targeting), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#555"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: t.color,
          fontWeight: 700
        }
      }, "\u2713"), " QR code tracking included"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#555"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: t.color,
          fontWeight: 700
        }
      }, "\u2713"), " Monthly performance report")));
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "white",
        borderRadius: 16,
        padding: mob ? 16 : 24,
        border: "1px solid #eee8dd"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 16,
        fontWeight: 700,
        color: "#1a1a2e"
      }
    }, "Campaigns"), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "6px 14px",
        borderRadius: 8,
        background: "#1a1a2e",
        color: "white",
        fontSize: 11,
        fontWeight: 700,
        cursor: "pointer"
      }
    }, "+ New Campaign")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: mob ? 10 : 8
      }
    }, advertisers.map(function (ad) {
      var pctSpent = ad.budget > 0 ? Math.round(ad.spent / ad.budget * 100) : 0;
      var costPerScan = ad.qrScans > 0 ? (ad.spent / ad.qrScans).toFixed(2) : "—";
      return /*#__PURE__*/React.createElement("div", {
        key: ad.id,
        style: {
          padding: mob ? "14px" : "16px 20px",
          borderRadius: 14,
          border: "1px solid #f0ebe3",
          background: "#faf8f5"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "white",
          border: "1px solid #eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20
        }
      }, ad.logo), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          color: "#1a1a2e"
        }
      }, ad.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#999"
        }
      }, ad.industry, " \xB7 ", ad.targeting.geo))), /*#__PURE__*/React.createElement("span", {
        style: {
          padding: "3px 10px",
          borderRadius: 6,
          fontSize: 10,
          fontWeight: 700,
          textTransform: "uppercase",
          background: statusColors2[ad.status] + "15",
          color: statusColors2[ad.status]
        }
      }, ad.status)), /*#__PURE__*/React.createElement("div", {
        style: {
          background: "white",
          borderRadius: 10,
          padding: "10px 14px",
          border: "1px solid #eee",
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 36,
          height: 36,
          borderRadius: 8,
          background: "#f0ebe3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          flexShrink: 0
        }
      }, ad.logo), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          fontWeight: 700,
          color: "#1a1a2e"
        }
      }, ad.headline), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          color: "#888",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }
      }, ad.body)), /*#__PURE__*/React.createElement("div", {
        style: {
          padding: "4px 10px",
          borderRadius: 6,
          background: "#f0ebe3",
          fontSize: 9,
          fontWeight: 700,
          color: "#666",
          flexShrink: 0
        }
      }, ad.cta)), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: mob ? 8 : 16,
          flexWrap: "wrap"
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 9,
          color: "#999",
          fontWeight: 600,
          textTransform: "uppercase"
        }
      }, "Impressions"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          color: "#1a1a2e"
        }
      }, ad.impressions.toLocaleString())), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 9,
          color: "#999",
          fontWeight: 600,
          textTransform: "uppercase"
        }
      }, "QR Scans"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          color: "#7c3aed"
        }
      }, ad.qrScans)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 9,
          color: "#999",
          fontWeight: 600,
          textTransform: "uppercase"
        }
      }, "Scan Rate"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          color: "#3b82f6"
        }
      }, (ad.qrScans / ad.impressions * 100).toFixed(1), "%")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 9,
          color: "#999",
          fontWeight: 600,
          textTransform: "uppercase"
        }
      }, "Cost/Scan"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          color: "#059669"
        }
      }, "$", costPerScan)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 9,
          color: "#999",
          fontWeight: 600,
          textTransform: "uppercase"
        }
      }, "CPM"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          color: "#f59e0b"
        }
      }, "$", ad.cpm)), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 100
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 9,
          color: "#999",
          fontWeight: 600,
          textTransform: "uppercase"
        }
      }, "Budget Used"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          height: 6,
          background: "#eee",
          borderRadius: 3
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: pctSpent + "%",
          height: "100%",
          background: pctSpent > 80 ? "#f59e0b" : "#22c55e",
          borderRadius: 3
        }
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: "#1a1a2e"
        }
      }, "$", ad.spent.toLocaleString(), " / $", ad.budget.toLocaleString())))), /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 8,
          display: "flex",
          gap: 4,
          flexWrap: "wrap"
        }
      }, ad.targeting.industries.map(function (ind, j) {
        return /*#__PURE__*/React.createElement("span", {
          key: j,
          style: {
            padding: "2px 8px",
            borderRadius: 4,
            background: "#f0ebe3",
            fontSize: 9,
            fontWeight: 600,
            color: "#888"
          }
        }, ind);
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          padding: "2px 8px",
          borderRadius: 4,
          background: "#3b82f610",
          fontSize: 9,
          fontWeight: 600,
          color: "#3b82f6"
        }
      }, ad.targeting.geo)));
    }))));
  }(), tab === "activity" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 16,
      padding: 24,
      border: "1px solid #eee8dd"
    }
  }, recentEvents.map(function (evt, i) {
    var iconMap = {
      scan: "\uD83D\uDCF1",
      signup: "\uD83C\uDF89",
      upgrade: "\u2B06\uFE0F",
      review: "\u2B50",
      expansion: "\uD83D\uDCCD",
      payment: "\uD83D\uDCB3",
      config: "\u2699\uFE0F",
      churn: "\uD83D\uDEA8"
    };
    var bgMap = {
      signup: "#22c55e10",
      upgrade: "#7c3aed10",
      payment: "#22c55e10",
      churn: "#ef444410"
    };
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        padding: "16px 12px",
        borderBottom: i < recentEvents.length - 1 ? "1px solid #f5f0ea" : "none",
        background: bgMap[evt.type] || "transparent",
        borderRadius: 10,
        marginBottom: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20,
        flexShrink: 0
      }
    }, iconMap[evt.type] || "\u2022"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "#333",
        lineHeight: 1.5
      }
    }, evt.text), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#bbb",
        marginTop: 3
      }
    }, evt.time)), /*#__PURE__*/React.createElement("span", {
      style: {
        padding: "3px 10px",
        borderRadius: 6,
        fontSize: 10,
        fontWeight: 700,
        textTransform: "uppercase",
        color: "#999",
        background: "#f5f0ea"
      }
    }, evt.type));
  })))));
}

/* ══════════════════════════════════════════════════════════════════════════════ */
/* ── APP                                                                    ── */
/* ══════════════════════════════════════════════════════════════════════════════ */

export { LandingPage, SetupWizard, Dashboard, SaasAdmin };
