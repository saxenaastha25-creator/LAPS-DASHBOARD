/* =====================================================================
   SCRIPT.JS
   Land Acquisition Delay Prediction System (LADS) - Dashboard Prototype
   Smart India Hackathon 2026

   What this file does:
   1. Stores SYNTHETIC sample data (risk distribution + recent projects)
   2. Renders that data into the dashboard's HTML on page load
   3. Handles sidebar navigation clicks (placeholder behaviour for now,
      since the other pages/backend do not exist yet)

   Nothing here talks to a real server or database. Everything is
   hand-written sample data, kept in this one file so it is easy for
   teammates to later swap in real API calls.
   ===================================================================== */

/* ---------------------------------------------------------------------
   1. SAMPLE DATA
   These arrays are placeholders. Later, this data will likely come
   from a backend API call instead of being hard-coded here.
--------------------------------------------------------------------- */

// Risk distribution: how many tracked projects fall into each risk band.
// counts are illustrative only.
const riskDistributionData = [
  { label: "Low", level: "low", count: 22 },
  { label: "Medium", level: "medium", count: 17 },
  { label: "High", level: "high", count: 9 }
];

// Sample "Recent Projects" table rows.
// riskLevel: "low" | "medium" | "high"
// status: "On Track" | "At Risk" | "Delayed"
const recentProjectsData = [
  {
    name: "NH-27 Bypass Widening",
    district: "Lucknow",
    acquisitionPct: 82,
    compensationPct: 74,
    riskLevel: "low",
    status: "On Track"
  },
  {
    name: "Gomti Riverfront Extension",
    district: "Lucknow",
    acquisitionPct: 46,
    compensationPct: 30,
    riskLevel: "high",
    status: "Delayed"
  },
  {
    name: "Varanasi Ring Road Ph-2",
    district: "Varanasi",
    acquisitionPct: 61,
    compensationPct: 55,
    riskLevel: "medium",
    status: "At Risk"
  },
  {
    name: "Kanpur Metro Corridor Extn.",
    district: "Kanpur Nagar",
    acquisitionPct: 90,
    compensationPct: 88,
    riskLevel: "low",
    status: "On Track"
  },
  {
    name: "Prayagraj Industrial Link Rd",
    district: "Prayagraj",
    acquisitionPct: 38,
    compensationPct: 21,
    riskLevel: "high",
    status: "Delayed"
  },
  {
    name: "Agra-Aligarh Feeder Road",
    district: "Agra",
    acquisitionPct: 67,
    compensationPct: 60,
    riskLevel: "medium",
    status: "At Risk"
  },
  {
    name: "Gorakhpur Bypass Ph-1",
    district: "Gorakhpur",
    acquisitionPct: 95,
    compensationPct: 91,
    riskLevel: "low",
    status: "On Track"
  }
];

/* ---------------------------------------------------------------------
   2. RENDER FUNCTIONS
--------------------------------------------------------------------- */

/**
 * Builds the horizontal risk distribution bars inside #risk-bars,
 * using riskDistributionData. Bar width is scaled against the
 * largest count so the biggest bar always fills the row.
 */
function renderRiskBars() {
  const container = document.getElementById("risk-bars");
  if (!container) return;

  const maxCount = Math.max(...riskDistributionData.map((item) => item.count));

  // Clear anything already inside (useful if this function is re-run later)
  container.innerHTML = "";

  riskDistributionData.forEach((item) => {
    const widthPercent = Math.round((item.count / maxCount) * 100);

    const row = document.createElement("div");
    row.className = "risk-bar-row";

    row.innerHTML = `
      <span>${item.label}</span>
      <span class="risk-bar-track">
        <span class="risk-bar-fill risk-bar-fill--${item.level}" style="width: ${widthPercent}%"></span>
      </span>
      <span>${item.count}</span>
    `;

    container.appendChild(row);
  });
}

/**
 * Returns the small CSS class suffix ("low" | "medium" | "high") that
 * matches a given status string, so the same pill styling logic
 * can be reused for both the Risk Level and Status columns.
 */
function riskLevelToPillClass(level) {
  // level is already "low" | "medium" | "high", so we can use it directly
  return `pill pill--${level}`;
}

function statusToPillClass(status) {
  if (status === "On Track") return "pill pill--ontrack";
  if (status === "At Risk") return "pill pill--atrisk";
  if (status === "Delayed") return "pill pill--delayed";
  return "pill"; // fallback, should not normally happen
}

/**
 * Fills the "Recent Projects" table body (#projects-table-body)
 * using recentProjectsData.
 */
function renderProjectsTable() {
  const tableBody = document.getElementById("projects-table-body");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  recentProjectsData.forEach((project) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${project.name}</td>
      <td>${project.district}</td>
      <td>${project.acquisitionPct}%</td>
      <td>${project.compensationPct}%</td>
      <td><span class="${riskLevelToPillClass(project.riskLevel)}">${capitalize(project.riskLevel)}</span></td>
      <td><span class="${statusToPillClass(project.status)}">${project.status}</span></td>
    `;

    tableBody.appendChild(row);
  });
}

/**
 * Small helper: turns "low" into "Low" for display purposes.
 */
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/* ---------------------------------------------------------------------
   3. SIDEBAR NAVIGATION (placeholder behaviour)
   The other pages (Project Details, Risk Prediction, GIS Map, Alerts)
   don't exist yet in this prototype stage. For now, clicking a link:
     - updates which link looks "active"
     - shows a small placeholder message instead of navigating away
   This keeps the sidebar fully functional visually without needing
   real pages or a backend yet.
--------------------------------------------------------------------- */
function setupSidebarNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // stop the "#" link from jumping the page

      // Remove "active" styling from every link, then add it to the one clicked
      navLinks.forEach((otherLink) => otherLink.classList.remove("active"));
      link.classList.add("active");

      const pageName = link.getAttribute("data-page");

      // Dashboard is the only real page right now; everything else is a placeholder.
      if (pageName !== "dashboard") {
        alert(
          `"${link.textContent.trim()}" page is not built yet in this prototype.\nThis will be connected once the backend and other pages are ready.`
        );
      }
    });
  });
}

/* ---------------------------------------------------------------------
   4. RUN EVERYTHING ONCE THE PAGE HAS LOADED
--------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderRiskBars();
  renderProjectsTable();
  setupSidebarNavigation();
});