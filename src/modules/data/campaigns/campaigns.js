/**
 * Campaign fixture data used by the prototype.
 *
 * Each campaign carries its own related collections (members,
 * commercial policies, mechanics, files) so the detail page can
 * render the related lists without a separate relationship map.
 *
 * Status values mirror the standard Salesforce Campaign status
 * picklist (Planned → In Progress → Completed → Aborted).
 *
 * IMPORTANT: every record below is fully fabricated for prototyping.
 * No real company, person, or campaign data is represented.
 */

export const CAMPAIGN_STATUSES = [
    'Planned',
    'In Progress',
    'Completed',
    'Aborted'
];

export const CAMPAIGN_TYPES = [
    'Email',
    'Webinar',
    'Direct Mail',
    'Trade Show',
    'Partner',
    'Other'
];

/* Shared related-list fixtures. Each campaign reuses the same fake
   rows so the prototype reads consistently — production data would
   diverge per record. */
const MEMBERS = [
    { id: 'cm-1', type: 'Contact', firstName: 'Emily', lastName: 'Johnson', role: 'Account Manager' },
    { id: 'cm-2', type: 'Contact', firstName: 'Daniel', lastName: 'Miller', role: 'Marketing Analyst' },
    { id: 'cm-3', type: 'Contact', firstName: 'Sophia', lastName: 'Brown', role: 'Sales Coordinator' },
    { id: 'cm-4', type: 'Contact', firstName: 'Lucas', lastName: 'Davis', role: 'Graphic Designer' },
    { id: 'cm-5', type: 'Lead', firstName: 'Olivia', lastName: 'Wilson', role: 'Business Consultant' },
    { id: 'cm-6', type: 'Lead', firstName: 'Ethan', lastName: 'Moore', role: 'SEO Specialist' }
];

const COMMERCIAL_POLICIES = [
    { id: 'cp-1', policy: 'Early Payment Discount', category: 'Payment', validity: 'Sep 2025', condition: 'Applies to prepaid orders' },
    { id: 'cp-2', policy: 'Regional Bonus', category: 'Territory', validity: 'Q4 2025', condition: 'Available for selected regions' },
    { id: 'cp-3', policy: 'Volume Incentive', category: 'Sales Target', validity: 'Monthly', condition: 'Requires minimum purchase threshold' },
    { id: 'cp-4', policy: 'Product Bundle Rule', category: 'Product Mix', validity: 'Campaign Period', condition: 'Applies to eligible bundles' },
    { id: 'cp-5', policy: 'Dealer Margin Policy', category: 'Pricing', validity: 'Sep–Oct 2025', condition: 'Based on approved discount range' },
    { id: 'cp-6', policy: 'Loyalty Condition', category: 'Customer Segment', validity: 'Active', condition: 'Available for returning customers' }
];

const MECHANICS = [
    { id: 'mc-1', rule: 'Minimum Purchase', criteria: 'Orders above $5,000', application: 'Automatic', notes: 'Calculated at checkout' },
    { id: 'mc-2', rule: 'Eligible Products', criteria: 'Selected product families', application: 'Campaign-wide', notes: 'Excludes discontinued items' },
    { id: 'mc-3', rule: 'Reward Trigger', criteria: 'Approved order status', application: 'Per transaction', notes: 'Requires manager approval' },
    { id: 'mc-4', rule: 'Accumulation Rule', criteria: 'Monthly sales volume', application: 'Account level', notes: 'Resets every month' },
    { id: 'mc-5', rule: 'Validity Window', criteria: 'Campaign start and end dates', application: 'All participants', notes: 'Based on order date' },
    { id: 'mc-6', rule: 'Exception Handling', criteria: 'Manual review required', application: 'Sales operations', notes: 'Used for special cases' }
];

const CAMPAIGNS = [
    {
        id: 'cmp-001',
        name: 'Spring Loyalty Drive',
        type: 'Email',
        status: 'In Progress',
        startDate: 'Apr 01, 2026',
        endDate: 'Jun 30, 2026',
        budgetedCost: '$45,000',
        actualCost: '$28,400',
        expectedRevenue: '$320,000',
        expectedResponse: '12%',
        numSent: '24,800',
        parentCampaign: 'FY26 Customer Retention',
        ownerName: 'Sarah Johnson',
        description: 'Three-month email and digital cadence rewarding returning customers with tiered offers tied to historical purchase volume.',
        createdDate: 'Mar 18, 2026',
        lastModifiedDate: 'Jun 02, 2026',
        members: MEMBERS,
        commercialPolicies: COMMERCIAL_POLICIES,
        mechanics: MECHANICS,
        files: []
    },
    {
        id: 'cmp-002',
        name: 'Q3 Dealer Activation',
        type: 'Partner',
        status: 'Planned',
        startDate: 'Jul 15, 2026',
        endDate: 'Sep 15, 2026',
        budgetedCost: '$120,000',
        actualCost: '$0',
        expectedRevenue: '$1,250,000',
        expectedResponse: '18%',
        numSent: '0',
        parentCampaign: 'FY26 Channel Programs',
        ownerName: 'Marcus Allen',
        description: 'Coordinated dealer-facing program combining co-funded territory bonuses with a regional incentive trip for top performers.',
        createdDate: 'May 22, 2026',
        lastModifiedDate: 'Jun 06, 2026',
        members: MEMBERS,
        commercialPolicies: COMMERCIAL_POLICIES,
        mechanics: MECHANICS,
        files: []
    },
    {
        id: 'cmp-003',
        name: 'Hybrid Lineup Webinar',
        type: 'Webinar',
        status: 'Completed',
        startDate: 'Feb 10, 2026',
        endDate: 'Feb 10, 2026',
        budgetedCost: '$8,500',
        actualCost: '$7,920',
        expectedRevenue: '$95,000',
        expectedResponse: '24%',
        numSent: '6,400',
        parentCampaign: 'FY26 Product Launch',
        ownerName: 'Priya Natarajan',
        description: 'Live product walkthrough of the FY27 hybrid lineup for fleet buyers and existing service customers, followed by a recorded asset distribution.',
        createdDate: 'Jan 20, 2026',
        lastModifiedDate: 'Feb 14, 2026',
        members: MEMBERS,
        commercialPolicies: COMMERCIAL_POLICIES,
        mechanics: MECHANICS,
        files: []
    },
    {
        id: 'cmp-004',
        name: 'Auto Show Local Activation',
        type: 'Trade Show',
        status: 'In Progress',
        startDate: 'May 28, 2026',
        endDate: 'Jun 14, 2026',
        budgetedCost: '$210,000',
        actualCost: '$184,500',
        expectedRevenue: '$680,000',
        expectedResponse: '8%',
        numSent: '0',
        parentCampaign: 'FY26 Brand Awareness',
        ownerName: 'Sarah Johnson',
        description: 'On-floor booth presence with VIP customer experience program, integrated with local dealer test-drive scheduling.',
        createdDate: 'Apr 04, 2026',
        lastModifiedDate: 'Jun 05, 2026',
        members: MEMBERS,
        commercialPolicies: COMMERCIAL_POLICIES,
        mechanics: MECHANICS,
        files: []
    },
    {
        id: 'cmp-005',
        name: 'New Driver Direct Mail',
        type: 'Direct Mail',
        status: 'Planned',
        startDate: 'Aug 05, 2026',
        endDate: 'Oct 05, 2026',
        budgetedCost: '$32,000',
        actualCost: '$0',
        expectedRevenue: '$215,000',
        expectedResponse: '4%',
        numSent: '0',
        parentCampaign: 'FY26 New Driver Acquisition',
        ownerName: 'Daniel Lee',
        description: 'Personalized direct mail piece targeting prospective first-time buyers, paired with a starter-financing pre-qualification offer.',
        createdDate: 'May 30, 2026',
        lastModifiedDate: 'Jun 08, 2026',
        members: MEMBERS,
        commercialPolicies: COMMERCIAL_POLICIES,
        mechanics: MECHANICS,
        files: []
    },
    {
        id: 'cmp-006',
        name: 'Service Loyalty Renewal',
        type: 'Other',
        status: 'Aborted',
        startDate: 'Jan 05, 2026',
        endDate: 'Mar 05, 2026',
        budgetedCost: '$18,000',
        actualCost: '$4,750',
        expectedRevenue: '$72,000',
        expectedResponse: '6%',
        numSent: '2,200',
        parentCampaign: 'FY26 Customer Retention',
        ownerName: 'Priya Natarajan',
        description: 'Cancelled mid-flight after segmentation review uncovered overlap with the Spring Loyalty Drive audience.',
        createdDate: 'Dec 10, 2025',
        lastModifiedDate: 'Feb 01, 2026',
        members: MEMBERS,
        commercialPolicies: COMMERCIAL_POLICIES,
        mechanics: MECHANICS,
        files: []
    }
];

export function getAllCampaigns() {
    return [...CAMPAIGNS];
}

export function getCampaignById(id) {
    return CAMPAIGNS.find((campaign) => campaign.id === id) || null;
}
