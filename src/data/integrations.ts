import type { IconName } from '@/components/Icon';

/**
 * Integrations.
 *
 * Written against the honest position: Crizant One does not ship a certified
 * connector for every system in every market, and claiming otherwise is
 * discovered in the first technical call. What it ships is two ingestion
 * paths that work against anything, plus the field mapping for the systems
 * these industries actually run. That is the claim this page makes.
 */

export type IntegrationGroup = {
  slug: string;
  name: string;
  icon: IconName;
  intro: string;
  systems: string[];
  what: string;
};

export const integrationGroups: IntegrationGroup[] = [
  {
    slug: 'core-transaction',
    name: 'Core transaction systems',
    icon: 'layers',
    intro:
      'The system of record for the thing being paid on — a policy, an invoice, a booking, a dispatch. This is the feed that decides the payout, so it is the one with arrival validation and period-continuity checks against it.',
    systems: [
      'Policy administration systems (insurance)',
      'Distributor management systems (FMCG)',
      'Stockist and secondary-sales platforms (pharma)',
      'CRM and booking systems (real estate)',
      'Order management and billing systems',
    ],
    what: 'Transaction, reversal, cancellation and status-change events, with the dates that decide which scheme version applies.',
  },
  {
    slug: 'erp-finance',
    name: 'ERP and finance',
    icon: 'scale',
    intro:
      'Commission is a cost line and a liability, so the computed cycle has to land in the ledger in the shape finance already books it — by cost centre, by period, with the accrual separated from the paid.',
    systems: [
      'SAP (ECC and S/4HANA)',
      'Oracle Financials and NetSuite',
      'Microsoft Dynamics 365',
      'Tally and regional ERPs',
      'In-house ledgers over a flat-file or API contract',
    ],
    what: 'Payout postings, accruals, reversals, credit notes and the GST or VAT treatment the market requires.',
  },
  {
    slug: 'hr-hierarchy',
    name: 'HR, master data and hierarchy',
    icon: 'network',
    intro:
      'The hierarchy is the second input that decides a payout, and it is the one that changes most often. Joins, exits, territory moves and promotions arrive effective-dated, so a payout computed for July uses the July structure even when it is computed in September.',
    systems: [
      'SAP SuccessFactors, Workday',
      'Darwinbox, Keka, Zoho People',
      'Agent and partner onboarding systems',
      'Active Directory and SCIM for platform access',
    ],
    what: 'Seller master, reporting structure, territory, role, status and the effective date of every change to them.',
  },
  {
    slug: 'payout-banking',
    name: 'Payout and banking',
    icon: 'wallet',
    intro:
      'Crizant One computes and approves the cycle; disbursement stays with your bank or payment partner. We produce the file or the API call in their format, with the reconciliation back against what actually settled.',
    systems: [
      'Bank payment file formats by market',
      'Payment gateways and payout APIs',
      'Payroll systems, where incentive runs with salary',
      'TDS, withholding and statutory-deduction handling',
    ],
    what: 'Approved payout instructions, settlement confirmations, failed-payment returns and the deduction schedule.',
  },
  {
    slug: 'bi-warehouse',
    name: 'BI and the warehouse',
    icon: 'chart',
    intro:
      'Commission data belongs in your warehouse too — channel profitability does not stop at the payout. The computed cycle is available at line level, with the derivation attached, not just as a summary.',
    systems: [
      'Snowflake, BigQuery, Databricks',
      'Power BI, Tableau, Looker',
      'Azure Data Factory, AWS Glue and equivalents',
      'Scheduled extracts to object storage',
    ],
    what: 'Cycle results at line level, exception history, scheme versions and the full audit trail.',
  },
  {
    slug: 'messaging',
    name: 'Notification and messaging',
    icon: 'chat',
    intro:
      'A seller finds out their cycle has closed on the channel they already read, which in most of these markets is WhatsApp rather than email.',
    systems: [
      'WhatsApp Business API',
      'SMS gateways by market',
      'Email (SMTP or transactional providers)',
      'Push notification through the seller app',
    ],
    what: 'Cycle-closed and payout-released notifications, clawback notices, scheme-change announcements.',
  },
];

export const ingestion: { title: string; body: string }[] = [
  {
    title: 'REST API, for systems that can push',
    body: 'A documented, versioned API for transactions, hierarchy, master data and status changes. Idempotent on your own reference, so a retried send cannot double-count a transaction into a payout — which is the failure mode that matters here.',
  },
  {
    title: 'Scheduled file exchange, for systems that cannot',
    body: 'SFTP or object storage, CSV or fixed-width, on your schedule. A large share of the core systems in these industries cannot push an event, and a platform that only accepts an API has quietly made integration the client’s problem.',
  },
  {
    title: 'Arrival validation on every feed, both ways in',
    body: 'Completeness, shape and continuity against the previous period are checked before a feed is accepted. A file that arrives short, duplicated or with a silently changed schema raises an exception against the cycle instead of producing a smaller payout run that looks like a slow month.',
  },
  {
    title: 'Mapping is configuration, not a release',
    body: 'Field mapping and transformation are configured per client rather than coded, so a changed column name upstream is a configuration change the same day, not a ticket in someone else’s release calendar.',
  },
];
