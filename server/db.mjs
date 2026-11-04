import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dataDir = path.join(root, 'data');
const leadsFile = path.join(dataDir, 'leads.json');
const visitorsFile = path.join(dataDir, 'visitors.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize files if not existing
if (!fs.existsSync(leadsFile)) {
  fs.writeFileSync(leadsFile, JSON.stringify([], null, 2), 'utf8');
}
if (!fs.existsSync(visitorsFile)) {
  fs.writeFileSync(visitorsFile, JSON.stringify([], null, 2), 'utf8');
}

/** Atomic read of JSON file with fallback */
function readJson(file, fallback = []) {
  try {
    if (!fs.existsSync(file)) return fallback;
    const content = fs.readFileSync(file, 'utf8').trim();
    if (!content) return fallback;
    return JSON.parse(content);
  } catch (err) {
    console.error(`[DB] Error reading ${file}:`, err);
    return fallback;
  }
}

/** Atomic write to JSON file */
function writeJson(file, data) {
  try {
    const tempFile = `${file}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tempFile, file);
    return true;
  } catch (err) {
    console.error(`[DB] Error writing ${file}:`, err);
    return false;
  }
}

export const db = {
  /** Record or update a visitor with identified company */
  recordVisitor(visitor) {
    const visitors = readJson(visitorsFile);
    const existingIdx = visitors.findIndex((v) => v.visitorId === visitor.visitorId);

    const now = new Date().toISOString();
    let updatedRecord;

    if (existingIdx >= 0) {
      const existing = visitors[existingIdx];
      updatedRecord = {
        ...existing,
        lastSeen: now,
        ip: visitor.ip || existing.ip,
        companyDomain: visitor.companyDomain || existing.companyDomain,
        companyName: visitor.companyName || existing.companyName,
        city: visitor.city || existing.city,
        country: visitor.country || existing.country,
        isp: visitor.isp || existing.isp,
        isCorporate: visitor.isCorporate ?? existing.isCorporate,
        pageViews: [
          ...(existing.pageViews || []),
          { path: visitor.path || '/', timestamp: now },
        ].slice(-50), // keep last 50
      };
      visitors[existingIdx] = updatedRecord;
    } else {
      updatedRecord = {
        visitorId: visitor.visitorId || `vis_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        firstSeen: now,
        lastSeen: now,
        ip: visitor.ip || '127.0.0.1',
        companyDomain: visitor.companyDomain || null,
        companyName: visitor.companyName || null,
        city: visitor.city || null,
        country: visitor.country || null,
        isp: visitor.isp || null,
        isCorporate: !!visitor.isCorporate,
        userAgent: visitor.userAgent || '',
        referrer: visitor.referrer || '',
        pageViews: [{ path: visitor.path || '/', timestamp: now }],
      };
      visitors.unshift(updatedRecord);
    }

    // Keep max 2000 visitors
    const trimmed = visitors.slice(0, 2000);
    writeJson(visitorsFile, trimmed);
    return updatedRecord;
  },

  /** Save a detailed calculator submission / simulation */
  recordCalculation(calc) {
    const leads = readJson(leadsFile);
    const now = new Date().toISOString();

    const record = {
      id: `calc_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      timestamp: now,
      visitorId: calc.visitorId || 'anonymous',
      companyDomain: calc.companyDomain || null,
      companyName: calc.companyName || null,
      contactEmail: calc.contactEmail || null,
      // Granular Channel Footprint
      currency: calc.currency || 'INR',
      annualSpend: Number(calc.annualSpend) || 0,
      annualSpendFormatted: calc.annualSpendFormatted || '',
      distributorsCount: Number(calc.distributorsCount) || 0,
      employeesCount: Number(calc.employeesCount) || 0,
      brokersCount: Number(calc.brokersCount) || 0,
      banksCount: Number(calc.banksCount) || 0,
      tiers: Number(calc.tiers) || 1,
      schemes: Number(calc.schemes) || 1,
      manual: !!calc.manual,
      // Results
      leakagePct: calc.leakagePct || 0,
      annualLeakage: Number(calc.annualLeakage) || 0,
      annualLeakageFormatted: calc.annualLeakageFormatted || '',
      // Segment & Root Cause Breakdowns
      channelBreakdown: calc.channelBreakdown || {},
      rootCauseBreakdown: calc.rootCauseBreakdown || {},
      // Device Context
      ip: calc.ip || '127.0.0.1',
      userAgent: calc.userAgent || '',
    };

    leads.unshift(record);
    const trimmed = leads.slice(0, 5000);
    writeJson(leadsFile, trimmed);

    // Also update visitor record to link domain/company if available
    if (calc.visitorId) {
      const visitors = readJson(visitorsFile);
      const vIdx = visitors.findIndex((v) => v.visitorId === calc.visitorId);
      if (vIdx >= 0) {
        if (calc.companyDomain && !visitors[vIdx].companyDomain) {
          visitors[vIdx].companyDomain = calc.companyDomain;
        }
        if (calc.companyName && !visitors[vIdx].companyName) {
          visitors[vIdx].companyName = calc.companyName;
        }
        visitors[vIdx].hasCalculated = true;
        writeJson(visitorsFile, visitors);
      }
    }

    return record;
  },

  getLeads(limit = 100) {
    const leads = readJson(leadsFile);
    return leads.slice(0, limit);
  },

  getVisitors(limit = 100) {
    const visitors = readJson(visitorsFile);
    return visitors.slice(0, limit);
  },

  getStats() {
    const leads = readJson(leadsFile);
    const visitors = readJson(visitorsFile);

    const corporateVisitors = visitors.filter((v) => v.isCorporate || v.companyDomain);
    const totalSpendModeled = leads.reduce((acc, l) => acc + (l.annualSpend || 0), 0);
    const totalLeakageIdentified = leads.reduce((acc, l) => acc + (l.annualLeakage || 0), 0);

    return {
      totalVisitors: visitors.length,
      corporateVisitorsCount: corporateVisitors.length,
      totalCalculations: leads.length,
      totalSpendModeled,
      totalLeakageIdentified,
      recentCompanies: [
        ...new Set(
          visitors
            .map((v) => v.companyName || v.companyDomain)
            .filter(Boolean),
        ),
      ].slice(0, 10),
    };
  },
};
