import { db } from './db.mjs';
import { identifyCompany } from './identify.mjs';

/** Read body stream helper */
function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) req.destroy(); // 1MB limit
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Company-Domain, X-Company-Name',
  });
  res.end(JSON.stringify(data));
}

/**
 * Handles `/api/*` requests. Returns true if handled, false otherwise.
 */
export async function handleApiRequest(req, res) {
  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = urlObj.pathname;

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Company-Domain, X-Company-Name',
    });
    res.end();
    return true;
  }

  // Route: POST /api/identify
  if (pathname === '/api/identify' && req.method === 'POST') {
    const body = await parseBody(req);
    const company = await identifyCompany(req);

    const record = db.recordVisitor({
      visitorId: body.visitorId,
      path: body.path || '/',
      userAgent: req.headers['user-agent'] || '',
      referrer: body.referrer || req.headers['referer'] || '',
      ip: company.ip,
      companyDomain: body.overrideDomain || company.domain,
      companyName: body.overrideName || company.name,
      city: company.city,
      country: company.country,
      isp: company.isp,
      isCorporate: company.isCorporate,
    });

    sendJson(res, 200, {
      ok: true,
      visitorId: record.visitorId,
      identified: {
        companyDomain: record.companyDomain,
        companyName: record.companyName,
        city: record.city,
        country: record.country,
        isp: record.isp,
        isCorporate: record.isCorporate,
        method: company.detectionMethod,
      },
    });
    return true;
  }

  // Route: POST /api/calculator
  if (pathname === '/api/calculator' && req.method === 'POST') {
    const body = await parseBody(req);

    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress || '127.0.0.1';

    const saved = db.recordCalculation({
      ...body,
      ip,
      userAgent: req.headers['user-agent'] || '',
    });

    sendJson(res, 201, {
      ok: true,
      leadId: saved.id,
      timestamp: saved.timestamp,
      message: 'Calculation session and channel composition saved to backend.',
    });
    return true;
  }

  // Route: GET /api/leads
  if (pathname === '/api/leads' && req.method === 'GET') {
    const limit = Number(urlObj.searchParams.get('limit')) || 100;
    const leads = db.getLeads(limit);
    sendJson(res, 200, { ok: true, count: leads.length, leads });
    return true;
  }

  // Route: GET /api/visitors
  if (pathname === '/api/visitors' && req.method === 'GET') {
    const limit = Number(urlObj.searchParams.get('limit')) || 100;
    const visitors = db.getVisitors(limit);
    sendJson(res, 200, { ok: true, count: visitors.length, visitors });
    return true;
  }

  // Route: GET /api/stats
  if (pathname === '/api/stats' && req.method === 'GET') {
    const stats = db.getStats();
    sendJson(res, 200, { ok: true, stats });
    return true;
  }

  return false;
}
