/**
 * Data Processing, KPI Engine, Aggregations & Filtering for ERMA Dashboard
 */

export function filterDataset(data, filters) {
  if (!Array.isArray(data)) return [];
  if (!filters) return data;

  return data.filter(item => {
    if (!item) return false;

    if (filters.search) {
      const q = String(filters.search).toLowerCase().trim();
      if (q) {
        const empName = String(item.EMP_NAME || '').toLowerCase();
        const emplid = String(item.EMPLID || '').toLowerCase();
        const projectId = String(item.PROJECT_ID || '').toLowerCase();
        const customerName = String(item.CUSTOMER_NAME || '').toLowerCase();
        const techSkill1 = String(item.TECH_SKILL_1 || '').toLowerCase();
        const techSkill2 = String(item.TECH_SKILL_2 || '').toLowerCase();
        const techSkill3 = String(item.TECH_SKILL_3 || '').toLowerCase();
        const techSkill4 = String(item.TECH_SKILL_4 || '').toLowerCase();
        const location = String(item.CURRENT_LOCATION || item.CURRENT_LOCATION_CITY || '').toLowerCase();
        const country = String(item.CURRENT_COUNTRY || '').toLowerCase();
        const ibu = String(item.EMPLOYEE_IBU || '').toLowerCase();
        const band = String(item.BAND || '').toLowerCase();
        const role = String(item.JOB_CODE_DESCRIPTION || '').toLowerCase();
        const cert = String(item.CERTIFICATION_SKILLS || '').toLowerCase();
        const projectTech = String(item.PROJECT_TECHNOLOGY || '').toLowerCase();

        const match = 
          empName.includes(q) ||
          emplid.includes(q) ||
          projectId.includes(q) ||
          customerName.includes(q) ||
          techSkill1.includes(q) ||
          techSkill2.includes(q) ||
          techSkill3.includes(q) ||
          techSkill4.includes(q) ||
          location.includes(q) ||
          country.includes(q) ||
          ibu.includes(q) ||
          band.includes(q) ||
          role.includes(q) ||
          cert.includes(q) ||
          projectTech.includes(q);

        if (!match) return false;
      }
    }

    if (filters.country && filters.country !== "All" && String(item.CURRENT_COUNTRY) !== filters.country) return false;
    if (filters.location && filters.location !== "All" && String(item.CURRENT_LOCATION) !== filters.location && String(item.CURRENT_LOCATION_CITY) !== filters.location) return false;
    if (filters.ibu && filters.ibu !== "All" && String(item.EMPLOYEE_IBU) !== filters.ibu) return false;
    if (filters.billability && filters.billability !== "All" && String(item.BILLABLITY_STATUS) !== filters.billability) return false;
    if (filters.status && filters.status !== "All" && String(item.EMPLOYMENT_STATUS) !== filters.status) return false;
    if (filters.technology && filters.technology !== "All") {
      const techStr = String(item.PROJECT_TECHNOLOGY || item.TECH_SKILL_1 || '');
      if (!techStr.toLowerCase().includes(filters.technology.toLowerCase())) return false;
    }
    if (filters.customer && filters.customer !== "All" && String(item.CUSTOMER_NAME) !== filters.customer) return false;
    if (filters.onshoreOffshore && filters.onshoreOffshore !== "All" && String(item.ONSHORE_OFFSHORE) !== filters.onshoreOffshore) return false;
    if (filters.band && filters.band !== "All" && String(item.BAND) !== filters.band) return false;

    return true;
  });
}

export function computeExecutiveKPIs(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      totalEmployees: 0,
      activeEmployees: 0,
      resignedEmployees: 0,
      attritionRate: "0.0%",
      billableResources: 0,
      billablePercentage: "0.0%",
      nonBillableResources: 0,
      benchCount: 0,
      benchPercentage: "0.0%",
      avgBenchDays: 0,
      totalProjects: 0,
      totalCustomers: 0,
      avgExperience: 0,
      monthlyRevenueUSD: 0,
      monthlyCostUSD: 0,
      grossMarginUSD: 0,
      grossMarginPerc: "0.0%",
      fullyAllocated: 0,
      overAllocated: 0,
      underAllocated: 0
    };
  }

  const totalEmployees = data.length;
  const activeEmployees = data.filter(d => d && d.EMPLOYMENT_STATUS === "Active").length;
  const resignedEmployees = data.filter(d => d && (d.EMPLOYMENT_STATUS === "Resigned" || d.RESIGNED === "Yes")).length;
  const attritionRate = totalEmployees > 0 ? ((resignedEmployees / totalEmployees) * 100).toFixed(1) + "%" : "0.0%";

  const billableResources = data.filter(d => d && d.BILLABLITY_STATUS === "Billable").length;
  const billablePercentage = totalEmployees > 0 ? ((billableResources / totalEmployees) * 100).toFixed(1) + "%" : "0.0%";
  const nonBillableResources = totalEmployees - billableResources;

  const benchEmployees = data.filter(d => d && (d.BW_STATUS === "Bench (BW)" || d.BILLABLITY_STATUS === "Non Billable"));
  const benchCount = benchEmployees.length;
  const benchPercentage = totalEmployees > 0 ? ((benchCount / totalEmployees) * 100).toFixed(1) + "%" : "0.0%";
  const totalBenchDays = benchEmployees.reduce((acc, curr) => acc + (Number(curr?.BUSINESS_WAIT_AGE) || 0), 0);
  const avgBenchDays = benchCount > 0 ? (totalBenchDays / benchCount).toFixed(0) : 0;

  const uniqueProjects = new Set(data.filter(d => d && d.PROJECT_ID && !String(d.PROJECT_ID).startsWith("BENCH-")).map(d => d.PROJECT_ID)).size;
  const uniqueCustomers = new Set(data.filter(d => d && d.CUSTOMER_NAME && d.CUSTOMER_NAME !== "Internal Bench Pool").map(d => d.CUSTOMER_NAME)).size;

  const totalExp = data.reduce((acc, curr) => acc + (Number(curr?.TOTAL_EXPERIENCE) || 0), 0);
  const avgExperience = totalEmployees > 0 ? (totalExp / totalEmployees).toFixed(1) : 0;

  const monthlyRevenueUSD = data.reduce((acc, curr) => acc + (Number(curr?.MONTHLY_RATE_USD) || 0), 0);
  const monthlyCostUSD = data.reduce((acc, curr) => acc + (Number(curr?.MONTHLY_COST_USD) || 0), 0);
  const grossMarginUSD = monthlyRevenueUSD - monthlyCostUSD;
  const grossMarginPerc = monthlyRevenueUSD > 0 ? (((grossMarginUSD) / monthlyRevenueUSD) * 100).toFixed(1) + "%" : "0.0%";

  const fullyAllocated = data.filter(d => d && Number(d.TOTAL_ALLOC_PERC) === 100).length;
  const overAllocated = data.filter(d => d && Number(d.TOTAL_ALLOC_PERC) > 100).length;
  const underAllocated = data.filter(d => d && Number(d.TOTAL_ALLOC_PERC) > 0 && Number(d.TOTAL_ALLOC_PERC) < 100).length;

  return {
    totalEmployees,
    activeEmployees,
    resignedEmployees,
    attritionRate,
    billableResources,
    billablePercentage,
    nonBillableResources,
    benchCount,
    benchPercentage,
    avgBenchDays,
    totalProjects: uniqueProjects,
    totalCustomers: uniqueCustomers,
    avgExperience,
    monthlyRevenueUSD,
    monthlyCostUSD,
    grossMarginUSD,
    grossMarginPerc,
    fullyAllocated,
    overAllocated,
    underAllocated
  };
}

export function groupBy(data, key) {
  if (!Array.isArray(data)) return [];
  const counts = {};
  data.forEach(item => {
    if (!item) return;
    const val = item[key] ? String(item[key]) : "Unknown";
    counts[val] = (counts[val] || 0) + 1;
  });
  return Object.keys(counts).map(k => ({ name: k, value: counts[k] }));
}

export function getTopSkills(data) {
  if (!Array.isArray(data)) return [];
  const skillCount = {};
  data.forEach(item => {
    if (!item) return;
    [item.TECH_SKILL_1, item.TECH_SKILL_2, item.TECH_SKILL_3, item.TECH_SKILL_4].forEach(s => {
      if (s && String(s).trim()) {
        const cleanSkill = String(s).trim();
        skillCount[cleanSkill] = (skillCount[cleanSkill] || 0) + 1;
      }
    });
  });

  return Object.keys(skillCount)
    .map(k => ({ skill: k, count: skillCount[k] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

export function getTopCertifications(data) {
  if (!Array.isArray(data)) return [];
  const certCount = {};
  data.forEach(item => {
    if (!item) return;
    const cert = item.CERTIFICATION_SKILLS;
    if (cert && cert !== "None" && String(cert).trim()) {
      const cleanCert = String(cert).trim();
      certCount[cleanCert] = (certCount[cleanCert] || 0) + 1;
    }
  });

  return Object.keys(certCount)
    .map(k => ({ name: k, count: certCount[k] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

export function getManagerAnalytics(data) {
  if (!Array.isArray(data)) return [];
  const mgrMap = {};
  data.forEach(item => {
    if (!item) return;
    const pm = item.PM_NAME ? String(item.PM_NAME).trim() : "Unassigned";
    if (!mgrMap[pm]) {
      mgrMap[pm] = {
        name: pm,
        totalResources: 0,
        billable: 0,
        bench: 0,
        revenueUSD: 0
      };
    }
    mgrMap[pm].totalResources += 1;
    if (item.BILLABLITY_STATUS === "Billable") mgrMap[pm].billable += 1;
    if (item.BW_STATUS === "Bench (BW)") mgrMap[pm].bench += 1;
    mgrMap[pm].revenueUSD += (Number(item.MONTHLY_RATE_USD) || 0);
  });

  return Object.values(mgrMap).map(m => ({
    ...m,
    utilization: m.totalResources > 0 ? ((m.billable / m.totalResources) * 100).toFixed(0) : 0
  })).sort((a, b) => b.totalResources - a.totalResources);
}

export function getBenchAgeingBuckets(data) {
  const buckets = {
    "0-30 Days (Early)": 0,
    "31-60 Days (Moderate)": 0,
    "61-90 Days (High)": 0,
    "90+ Days (Critical)": 0
  };

  if (Array.isArray(data)) {
    data.filter(d => d && (d.BW_STATUS === "Bench (BW)" || d.BILLABLITY_STATUS === "Non Billable")).forEach(item => {
      const days = Number(item.BUSINESS_WAIT_AGE) || 0;
      if (days <= 30) buckets["0-30 Days (Early)"] += 1;
      else if (days <= 60) buckets["31-60 Days (Moderate)"] += 1;
      else if (days <= 90) buckets["61-90 Days (High)"] += 1;
      else buckets["90+ Days (Critical)"] += 1;
    });
  }

  return Object.keys(buckets).map(k => ({ bucket: k, count: buckets[k] }));
}

export function getExperienceBuckets(data) {
  const buckets = {
    "0-2 Years (Associate)": 0,
    "3-5 Years (Mid-level)": 0,
    "6-9 Years (Senior)": 0,
    "10-14 Years (Lead/Architect)": 0,
    "15+ Years (Executive/Principal)": 0
  };

  if (Array.isArray(data)) {
    data.forEach(item => {
      if (!item) return;
      const exp = Number(item.TOTAL_EXPERIENCE) || 0;
      if (exp <= 2) buckets["0-2 Years (Associate)"] += 1;
      else if (exp <= 5) buckets["3-5 Years (Mid-level)"] += 1;
      else if (exp <= 9) buckets["6-9 Years (Senior)"] += 1;
      else if (exp <= 14) buckets["10-14 Years (Lead/Architect)"] += 1;
      else buckets["15+ Years (Executive/Principal)"] += 1;
    });
  }

  return Object.keys(buckets).map(k => ({ range: k, count: buckets[k] }));
}

