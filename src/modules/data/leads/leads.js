/**
 * Lead fixture data used by the prototype.
 *
 * Each lead carries its own related collections (purchase intents, quotes,
 * activities) so the detail page can render related lists without a separate
 * relationship map.
 *
 * Status values mirror the standard Salesforce Lead status picklist used to
 * drive the Path component on the detail page.
 */
export const LEAD_STAGES = [
    { name: 'New', label: 'New' },
    { name: 'Working', label: 'Working' },
    { name: 'Nurturing', label: 'Nurturing' },
    { name: 'Qualified', label: 'Qualified' },
    { name: 'Converted', label: 'Converted' }
];

export const LEAD_STAGE_INDEX = Object.fromEntries(
    LEAD_STAGES.map((stage, index) => [stage.name, index])
);

const LEADS = [
    {
        id: 'l1',
        name: 'Brenda Mcclure',
        title: 'Chief Technology Officer',
        company: 'Aurora Systems',
        leadSource: 'Web',
        industry: 'Technology',
        rating: 'Hot',
        status: 'Working',
        annualRevenue: '$45M',
        numberOfEmployees: '420',
        estimatedValue: '$280,000',
        email: 'bmcclure@aurorasystems.com',
        phone: '(415) 555-7821',
        mobile: '(415) 555-7900',
        dateOfBirth: '1985-04-12',
        street: '350 Mission St',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'United States',
        description: 'Evaluating fleet replacement for executive team. Prefers hybrid models with extended warranty coverage.',
        ownerName: 'Sarah Johnson',
        createdDate: 'May 18, 2026',
        lastModifiedDate: 'Jun 02, 2026',
        lastActivityDate: 'Jun 08, 2026',
        isConverted: 'No',
        purchaseIntents: [
            { id: 'l1-pi1', product: 'Honda Civic Sport', score: 92, predictedClose: 'Aug 12, 2026', signal: 'Strong' },
            { id: 'l1-pi2', product: 'Honda CR-V Hybrid', score: 74, predictedClose: 'Sep 30, 2026', signal: 'Moderate' }
        ],
        quotes: [
            { id: 'l1-q1', number: 'Q-001245', status: 'Draft', amount: '$32,500', expirationDate: 'Jul 15, 2026', owner: 'Sarah Johnson' },
            { id: 'l1-q2', number: 'Q-001260', status: 'Presented', amount: '$38,900', expirationDate: 'Aug 02, 2026', owner: 'Sarah Johnson' }
        ],
        activities: [
            {
                id: 'l1-a1', type: 'task', iconName: 'standard:task',
                subject: 'Send proposal follow-up',
                date: 'Due tomorrow',
                timestamp: '9:00 AM | Tomorrow',
                sectionId: 'future',
                defaultExpanded: true,
                actor: 'Sarah Johnson',
                actionVerb: 'assigned a task to',
                target: 'Brenda Mcclure',
                details: {
                    fields: [
                        { label: 'Name', value: 'Brenda Mcclure', isLink: true },
                        { label: 'Related to', value: 'Aurora Systems', isLink: true }
                    ],
                    description: 'Confirm financing options requested during the executive demo last Tuesday.'
                }
            },
            {
                id: 'l1-a2', type: 'event', iconName: 'standard:event',
                subject: 'Test drive scheduled',
                date: 'Jun 15, 2026 · 10:00 AM',
                timestamp: '10:00 AM | 06/15/26',
                sectionId: 'future',
                actor: 'You',
                actionVerb: 'created an event with',
                target: 'Brenda Mcclure',
                extraText: 'and 2 others',
                details: {
                    fields: [
                        { label: 'Location', value: '350 Mission St, San Francisco, CA', isLink: true },
                        { label: 'Attendees', value: 'Brenda Mcclure (Organizer) + 2 others', isLink: true },
                        { label: 'When', value: 'June 15, 10:00 AM – 11:30 AM PT', isLink: true, fullWidth: true }
                    ],
                    description: 'Civic Sport test drive at the downtown dealership.'
                }
            },
            {
                id: 'l1-a3', type: 'task', iconName: 'standard:task',
                subject: 'Email pricing breakdown',
                date: '2 days ago',
                timestamp: '4:30 PM | 06/09/26',
                sectionId: 'jun-2026',
                isComplete: true,
                actor: 'Sarah Johnson',
                actionVerb: 'completed a task for',
                target: 'Brenda Mcclure',
                details: {
                    fields: [
                        { label: 'Name', value: 'Brenda Mcclure', isLink: true },
                        { label: 'Related to', value: 'Aurora Systems', isLink: true }
                    ],
                    description: 'Sent itemized quote with extended warranty options for the executive fleet.'
                }
            },
            {
                id: 'l1-a4', type: 'event', iconName: 'standard:event',
                subject: 'Showroom visit',
                date: 'Last week',
                timestamp: '2:00 PM | 06/04/26',
                sectionId: 'jun-2026',
                actor: 'Sarah Johnson',
                actionVerb: 'logged an event with',
                target: 'Brenda Mcclure',
                details: {
                    fields: [
                        { label: 'Location', value: 'Honda San Francisco Showroom', isLink: true },
                        { label: 'Attendees', value: 'Brenda Mcclure + spouse', isLink: true }
                    ],
                    description: 'Initial showroom visit with spouse to compare trims and color options.'
                }
            }
        ],
        relatedContacts: [
            { id: 'l1-c1', name: 'Emily Bauer', title: 'Director of IT', mobilePhone: '(415) 555-7901', workPhone: '(415) 555-7810', email: 'ebauer@aurorasystems.com', dateOfBirth: '1987-06-23' },
            { id: 'l1-c2', name: 'Daniel Morales', title: 'Procurement Lead', mobilePhone: '(415) 555-7902', workPhone: '(415) 555-7811', email: 'dmorales@aurorasystems.com', dateOfBirth: '1982-09-14' },
            { id: 'l1-c3', name: 'Yuki Tanaka', title: 'Finance Manager', mobilePhone: '(415) 555-7903', workPhone: '(415) 555-7812', email: 'ytanaka@aurorasystems.com', dateOfBirth: '1990-01-30' }
        ]
    },
    {
        id: 'l2',
        name: 'Marcus Ellison',
        title: 'VP of Operations',
        company: 'Cascade Logistics',
        leadSource: 'Partner Referral',
        industry: 'Transportation',
        rating: 'Warm',
        status: 'Nurturing',
        annualRevenue: '$120M',
        numberOfEmployees: '1,200',
        estimatedValue: '$540,000',
        email: 'mellison@cascadelog.com',
        phone: '(503) 555-2244',
        mobile: '(503) 555-2280',
        dateOfBirth: '1979-11-03',
        street: '1500 SW 5th Ave',
        city: 'Portland',
        state: 'OR',
        postalCode: '97201',
        country: 'United States',
        description: 'Operates a regional last-mile fleet. Open to a phased migration plan starting next fiscal year.',
        ownerName: 'Mark Torres',
        createdDate: 'Apr 02, 2026',
        lastModifiedDate: 'May 28, 2026',
        lastActivityDate: 'Jun 04, 2026',
        isConverted: 'No',
        purchaseIntents: [
            { id: 'l2-pi1', product: 'Honda Ridgeline', score: 68, predictedClose: 'Oct 22, 2026', signal: 'Moderate' },
            { id: 'l2-pi2', product: 'Honda Odyssey', score: 51, predictedClose: 'Nov 15, 2026', signal: 'Weak' }
        ],
        quotes: [
            { id: 'l2-q1', number: 'Q-001188', status: 'Presented', amount: '$214,000', expirationDate: 'Jul 30, 2026', owner: 'Mark Torres' }
        ],
        activities: [
            {
                id: 'l2-a1', type: 'task', iconName: 'standard:task',
                subject: 'Prepare fleet ROI deck',
                date: 'Due Friday',
                timestamp: '5:00 PM | Fri 06/12',
                sectionId: 'future',
                defaultExpanded: true,
                actor: 'Mark Torres',
                actionVerb: 'assigned a task to',
                target: 'You',
                details: {
                    fields: [
                        { label: 'Name', value: 'Marcus Ellison', isLink: true },
                        { label: 'Related to', value: 'Cascade Logistics', isLink: true }
                    ],
                    description: 'Tailored ROI comparison vs current fleet for the upcoming executive briefing.'
                }
            },
            {
                id: 'l2-a2', type: 'event', iconName: 'standard:event',
                subject: 'Executive briefing',
                date: 'Jun 20, 2026 · 2:00 PM',
                timestamp: '2:00 PM | 06/20/26',
                sectionId: 'future',
                actor: 'You',
                actionVerb: 'created an event with',
                target: 'Marcus Ellison',
                extraText: 'and 3 others',
                details: {
                    fields: [
                        { label: 'Location', value: 'Cascade Logistics HQ, Portland', isLink: true },
                        { label: 'Attendees', value: 'Marcus Ellison + 3 others', isLink: true },
                        { label: 'When', value: 'June 20, 2:00 PM – 3:30 PM PT', isLink: true, fullWidth: true }
                    ],
                    description: 'Briefing with COO and procurement lead on phased migration plan.'
                }
            },
            {
                id: 'l2-a3', type: 'task', iconName: 'standard:task',
                subject: 'Log discovery call notes',
                date: 'Yesterday',
                timestamp: '11:30 AM | Yesterday',
                sectionId: 'jun-2026',
                isComplete: true,
                actor: 'Mark Torres',
                actionVerb: 'completed a task for',
                target: 'Marcus Ellison',
                details: {
                    fields: [
                        { label: 'Name', value: 'Marcus Ellison', isLink: true },
                        { label: 'Related to', value: 'Cascade Logistics', isLink: true }
                    ],
                    description: 'Captured pain points around maintenance downtime and fuel costs.'
                }
            }
        ],
        relatedContacts: [
            { id: 'l2-c1', name: 'Sofia Pereira', title: 'Fleet Manager', mobilePhone: '(503) 555-2281', workPhone: '(503) 555-2245', email: 'spereira@cascadelog.com', dateOfBirth: '1986-03-12' },
            { id: 'l2-c2', name: 'Aaron Whitfield', title: 'Operations Analyst', mobilePhone: '(503) 555-2282', workPhone: '(503) 555-2246', email: 'awhitfield@cascadelog.com', dateOfBirth: '1991-08-21' },
            { id: 'l2-c3', name: 'Linda Park', title: 'Procurement Director', mobilePhone: '(503) 555-2283', workPhone: '(503) 555-2247', email: 'lpark@cascadelog.com', dateOfBirth: '1978-05-04' }
        ]
    },
    {
        id: 'l3',
        name: 'Priya Raman',
        title: 'Procurement Manager',
        company: 'Helios Energy',
        leadSource: 'Trade Show',
        industry: 'Energy',
        rating: 'Hot',
        status: 'Qualified',
        annualRevenue: '$680M',
        numberOfEmployees: '3,400',
        estimatedValue: '$1,150,000',
        email: 'praman@heliosenergy.com',
        phone: '(713) 555-9090',
        mobile: '(713) 555-9120',
        dateOfBirth: '1982-07-29',
        street: '900 Louisiana St',
        city: 'Houston',
        state: 'TX',
        postalCode: '77002',
        country: 'United States',
        description: 'Looking to standardize field service vehicles across three regional hubs. Procurement approved budget for Q3.',
        ownerName: 'Lisa Chen',
        createdDate: 'Mar 11, 2026',
        lastModifiedDate: 'Jun 05, 2026',
        lastActivityDate: 'Jun 09, 2026',
        isConverted: 'No',
        purchaseIntents: [
            { id: 'l3-pi1', product: 'Honda Passport TrailSport', score: 88, predictedClose: 'Jul 28, 2026', signal: 'Strong' },
            { id: 'l3-pi2', product: 'Honda Pilot Elite', score: 81, predictedClose: 'Aug 05, 2026', signal: 'Strong' },
            { id: 'l3-pi3', product: 'Honda Accord Hybrid', score: 62, predictedClose: 'Sep 18, 2026', signal: 'Moderate' }
        ],
        quotes: [
            { id: 'l3-q1', number: 'Q-001302', status: 'Accepted', amount: '$612,400', expirationDate: 'Jun 25, 2026', owner: 'Lisa Chen' },
            { id: 'l3-q2', number: 'Q-001318', status: 'Presented', amount: '$489,000', expirationDate: 'Jul 22, 2026', owner: 'Lisa Chen' }
        ],
        activities: [
            {
                id: 'l3-a1', type: 'event', iconName: 'standard:event',
                subject: 'Contract review call',
                date: 'Jun 13, 2026 · 9:30 AM',
                timestamp: '9:30 AM | 06/13/26',
                sectionId: 'future',
                defaultExpanded: true,
                actor: 'You',
                actionVerb: 'created an event with',
                target: 'Priya Raman',
                extraText: 'and 4 others',
                details: {
                    fields: [
                        { label: 'Location', value: '900 Louisiana St, Houston, TX', isLink: true },
                        { label: 'Attendees', value: 'Priya Raman (Organizer) + 4 others', isLink: true },
                        { label: 'When', value: 'June 13, 9:30 AM – 11:00 AM CT', isLink: true, fullWidth: true }
                    ],
                    description: 'Legal and procurement walk-through of MSA terms before signature.'
                }
            },
            {
                id: 'l3-a2', type: 'task', iconName: 'standard:task',
                subject: 'Confirm vehicle availability',
                date: 'Due today',
                timestamp: '5:00 PM | Today',
                sectionId: 'future',
                actor: 'Lisa Chen',
                actionVerb: 'assigned a task to',
                target: 'You',
                details: {
                    fields: [
                        { label: 'Name', value: 'Priya Raman', isLink: true },
                        { label: 'Related to', value: 'Helios Energy', isLink: true }
                    ],
                    description: 'Verify allocation for Passport TrailSport units across all three regional hubs.'
                }
            },
            {
                id: 'l3-a3', type: 'task', iconName: 'standard:task',
                subject: 'Send signed quote',
                date: '3 days ago',
                timestamp: '3:15 PM | 06/08/26',
                sectionId: 'jun-2026',
                isComplete: true,
                actor: 'Lisa Chen',
                actionVerb: 'completed a task for',
                target: 'Priya Raman',
                details: {
                    fields: [
                        { label: 'Name', value: 'Priya Raman', isLink: true },
                        { label: 'Related to', value: 'Helios Energy', isLink: true }
                    ],
                    description: 'Counter-signed Q-001302 routed to finance for processing.'
                }
            },
            {
                id: 'l3-a4', type: 'event', iconName: 'standard:event',
                subject: 'Site visit',
                date: 'May 28, 2026',
                timestamp: '10:00 AM | 05/28/26',
                sectionId: 'may-2026',
                actor: 'Lisa Chen',
                actionVerb: 'logged an event with',
                target: 'Priya Raman',
                details: {
                    fields: [
                        { label: 'Location', value: 'Helios Houston Operations Center', isLink: true },
                        { label: 'Attendees', value: 'Priya Raman + 2 others', isLink: true }
                    ],
                    description: 'Onsite walkthrough of Houston operations center and fleet inspection.'
                }
            },
            {
                id: 'l3-a5', type: 'task', iconName: 'standard:task',
                subject: 'Log proposal review notes',
                date: 'Last week',
                timestamp: '4:45 PM | 06/03/26',
                sectionId: 'jun-2026',
                isComplete: true,
                actor: 'Lisa Chen',
                actionVerb: 'completed a task for',
                target: 'Priya Raman',
                details: {
                    fields: [
                        { label: 'Name', value: 'Priya Raman', isLink: true },
                        { label: 'Related to', value: 'Helios Energy', isLink: true }
                    ],
                    description: 'Captured procurement feedback on payment terms and delivery windows.'
                }
            }
        ],
        relatedContacts: [
            { id: 'l3-c1', name: 'Rajiv Mehta', title: 'Regional Operations Lead', mobilePhone: '(713) 555-9121', workPhone: '(713) 555-9091', email: 'rmehta@heliosenergy.com', dateOfBirth: '1980-10-17' },
            { id: 'l3-c2', name: 'Hannah Doyle', title: 'Procurement Specialist', mobilePhone: '(713) 555-9122', workPhone: '(713) 555-9092', email: 'hdoyle@heliosenergy.com', dateOfBirth: '1992-12-08' },
            { id: 'l3-c3', name: 'Marcus Bell', title: 'Fleet Maintenance Manager', mobilePhone: '(713) 555-9123', workPhone: '(713) 555-9093', email: 'mbell@heliosenergy.com', dateOfBirth: '1975-02-26' }
        ]
    },
    {
        id: 'l4',
        name: 'Theo Bishop',
        title: 'Operations Director',
        company: 'Midline Foods',
        leadSource: 'Cold Outreach',
        industry: 'Consumer Goods',
        rating: 'Warm',
        status: 'New',
        annualRevenue: '$78M',
        numberOfEmployees: '540',
        estimatedValue: '$95,000',
        email: 'tbishop@midlinefoods.com',
        phone: '(312) 555-4411',
        mobile: '(312) 555-4477',
        dateOfBirth: '1990-02-17',
        street: '210 N Wells St',
        city: 'Chicago',
        state: 'IL',
        postalCode: '60606',
        country: 'United States',
        description: 'Reached out after a webinar on cold-chain logistics. Early discovery phase, exploring delivery vehicles.',
        ownerName: 'Mark Torres',
        createdDate: 'Jun 03, 2026',
        lastModifiedDate: 'Jun 03, 2026',
        lastActivityDate: 'Jun 03, 2026',
        isConverted: 'No',
        purchaseIntents: [
            { id: 'l4-pi1', product: 'Honda CR-V Hybrid', score: 47, predictedClose: 'Dec 04, 2026', signal: 'Weak' }
        ],
        quotes: [],
        activities: [
            {
                id: 'l4-a1', type: 'task', iconName: 'standard:task',
                subject: 'Schedule discovery call',
                date: 'Due next week',
                timestamp: '10:00 AM | 06/16/26',
                sectionId: 'future',
                defaultExpanded: true,
                actor: 'Mark Torres',
                actionVerb: 'assigned a task to',
                target: 'You',
                details: {
                    fields: [
                        { label: 'Name', value: 'Theo Bishop', isLink: true },
                        { label: 'Related to', value: 'Midline Foods', isLink: true }
                    ],
                    description: 'Reach out to set up a 30-minute discovery session to scope fleet needs.'
                }
            },
            {
                id: 'l4-a2', type: 'task', iconName: 'standard:task',
                subject: 'Send welcome email',
                date: 'Today',
                timestamp: '8:00 AM | Today',
                sectionId: 'jun-2026',
                isComplete: true,
                actor: 'Mark Torres',
                actionVerb: 'completed a task for',
                target: 'Theo Bishop',
                details: {
                    fields: [
                        { label: 'Name', value: 'Theo Bishop', isLink: true },
                        { label: 'Related to', value: 'Midline Foods', isLink: true }
                    ],
                    description: 'Intro email with overview of fleet program and case studies.'
                }
            }
        ],
        relatedContacts: [
            { id: 'l4-c1', name: 'Carla Nguyen', title: 'Logistics Coordinator', mobilePhone: '(312) 555-4478', workPhone: '(312) 555-4412', email: 'cnguyen@midlinefoods.com', dateOfBirth: '1989-07-19' },
            { id: 'l4-c2', name: 'Steven Cole', title: 'Fleet Buyer', mobilePhone: '(312) 555-4479', workPhone: '(312) 555-4413', email: 'scole@midlinefoods.com', dateOfBirth: '1984-11-02' },
            { id: 'l4-c3', name: 'Ava Patel', title: 'Operations Analyst', mobilePhone: '(312) 555-4480', workPhone: '(312) 555-4414', email: 'apatel@midlinefoods.com', dateOfBirth: '1993-04-25' }
        ]
    },
    {
        id: 'l5',
        name: 'Ines Carvalho',
        title: 'Head of Customer Success',
        company: 'Lumen Health',
        leadSource: 'Inbound Lead',
        industry: 'Healthcare',
        rating: 'Cold',
        status: 'Unqualified',
        annualRevenue: '$22M',
        numberOfEmployees: '180',
        estimatedValue: '$0',
        email: 'icarvalho@lumenhealth.com',
        phone: '(617) 555-3030',
        mobile: '(617) 555-3070',
        dateOfBirth: '1988-09-21',
        street: '75 State St',
        city: 'Boston',
        state: 'MA',
        postalCode: '02109',
        country: 'United States',
        description: 'Not a fit for the current vehicle program; flagged for future re-engagement when fleet needs grow.',
        ownerName: 'Sarah Johnson',
        createdDate: 'Feb 14, 2026',
        lastModifiedDate: 'Apr 18, 2026',
        lastActivityDate: 'Apr 18, 2026',
        isConverted: 'No',
        purchaseIntents: [],
        quotes: [],
        activities: [
            {
                id: 'l5-a1', type: 'task', iconName: 'standard:task',
                subject: 'Move to nurture campaign',
                date: '2 months ago',
                timestamp: '9:00 AM | 04/18/26',
                sectionId: 'apr-2026',
                defaultExpanded: true,
                isComplete: true,
                actor: 'Sarah Johnson',
                actionVerb: 'completed a task for',
                target: 'Ines Carvalho',
                details: {
                    fields: [
                        { label: 'Name', value: 'Ines Carvalho', isLink: true },
                        { label: 'Related to', value: 'Lumen Health', isLink: true }
                    ],
                    description: 'Added to long-term nurture sequence for re-engagement when fleet needs grow next year.'
                }
            },
            {
                id: 'l5-a2', type: 'event', iconName: 'standard:event',
                subject: 'Discovery call',
                date: 'Mar 22, 2026',
                timestamp: '3:00 PM | 03/22/26',
                sectionId: 'mar-2026',
                actor: 'Sarah Johnson',
                actionVerb: 'logged an event with',
                target: 'Ines Carvalho',
                details: {
                    fields: [
                        { label: 'Location', value: 'Video call (Zoom)', isLink: true },
                        { label: 'Attendees', value: 'Ines Carvalho + 1 other', isLink: true }
                    ],
                    description: 'Determined timing not aligned with current procurement cycle.'
                }
            }
        ],
        relatedContacts: [
            { id: 'l5-c1', name: 'Robert Hayes', title: 'Facilities Director', mobilePhone: '(617) 555-3071', workPhone: '(617) 555-3031', email: 'rhayes@lumenhealth.com', dateOfBirth: '1976-09-10' },
            { id: 'l5-c2', name: 'Maya Sullivan', title: 'Operations Coordinator', mobilePhone: '(617) 555-3072', workPhone: '(617) 555-3032', email: 'msullivan@lumenhealth.com', dateOfBirth: '1990-06-14' },
            { id: 'l5-c3', name: 'Jordan Frye', title: 'Procurement Analyst', mobilePhone: '(617) 555-3073', workPhone: '(617) 555-3033', email: 'jfrye@lumenhealth.com', dateOfBirth: '1985-03-28' }
        ]
    },
    {
        id: 'l6',
        name: 'Daniel Okafor',
        title: 'CEO',
        company: 'Outline Studio',
        leadSource: 'Customer Referral',
        industry: 'Media',
        rating: 'Hot',
        status: 'Converted',
        annualRevenue: '$15M',
        numberOfEmployees: '95',
        estimatedValue: '$210,000',
        email: 'dokafor@outlinestudio.com',
        phone: '(323) 555-6611',
        mobile: '(323) 555-6688',
        dateOfBirth: '1981-12-05',
        street: '6500 Sunset Blvd',
        city: 'Los Angeles',
        state: 'CA',
        postalCode: '90028',
        country: 'United States',
        description: 'Converted into an account after signing a 24-month fleet agreement covering production support vehicles.',
        ownerName: 'Lisa Chen',
        createdDate: 'Jan 09, 2026',
        lastModifiedDate: 'May 30, 2026',
        lastActivityDate: 'May 30, 2026',
        isConverted: 'Yes',
        purchaseIntents: [
            { id: 'l6-pi1', product: 'Honda Odyssey', score: 95, predictedClose: 'Closed', signal: 'Strong' },
            { id: 'l6-pi2', product: 'Honda Ridgeline', score: 87, predictedClose: 'Closed', signal: 'Strong' }
        ],
        quotes: [
            { id: 'l6-q1', number: 'Q-001120', status: 'Accepted', amount: '$210,000', expirationDate: 'May 30, 2026', owner: 'Lisa Chen' }
        ],
        activities: [
            {
                id: 'l6-a1', type: 'event', iconName: 'standard:event',
                subject: 'Contract signed',
                date: 'May 30, 2026',
                timestamp: '4:00 PM | 05/30/26',
                sectionId: 'may-2026',
                defaultExpanded: true,
                actor: 'Lisa Chen',
                actionVerb: 'logged an event with',
                target: 'Daniel Okafor',
                details: {
                    fields: [
                        { label: 'Location', value: '6500 Sunset Blvd, Los Angeles, CA', isLink: true },
                        { label: 'Attendees', value: 'Daniel Okafor (CEO) + 2 others', isLink: true },
                        { label: 'When', value: 'May 30, 4:00 PM – 5:00 PM PT', isLink: true, fullWidth: true }
                    ],
                    description: 'Signed 24-month fleet agreement, converted lead to account.'
                }
            },
            {
                id: 'l6-a2', type: 'task', iconName: 'standard:task',
                subject: 'Schedule onboarding kickoff',
                date: 'Jun 10, 2026',
                timestamp: '10:00 AM | 06/10/26',
                sectionId: 'jun-2026',
                isComplete: true,
                actor: 'Lisa Chen',
                actionVerb: 'completed a task for',
                target: 'Daniel Okafor',
                details: {
                    fields: [
                        { label: 'Name', value: 'Daniel Okafor', isLink: true },
                        { label: 'Related to', value: 'Outline Studio', isLink: true }
                    ],
                    description: 'Coordinate kickoff with delivery team and dealership.'
                }
            },
            {
                id: 'l6-a3', type: 'event', iconName: 'standard:event',
                subject: 'Executive close call',
                date: 'May 22, 2026',
                timestamp: '11:00 AM | 05/22/26',
                sectionId: 'may-2026',
                actor: 'Lisa Chen',
                actionVerb: 'logged an event with',
                target: 'Daniel Okafor',
                details: {
                    fields: [
                        { label: 'Location', value: 'Video call (Zoom)', isLink: true },
                        { label: 'Attendees', value: 'Daniel Okafor, CFO + 1 other', isLink: true }
                    ],
                    description: 'Final terms confirmed with CEO and CFO ahead of contract signature.'
                }
            }
        ],
        relatedContacts: [
            { id: 'l6-c1', name: 'Camila Reyes', title: 'Production Manager', mobilePhone: '(323) 555-6689', workPhone: '(323) 555-6612', email: 'creyes@outlinestudio.com', dateOfBirth: '1988-08-05' },
            { id: 'l6-c2', name: 'Owen Brooks', title: 'Studio Operations Lead', mobilePhone: '(323) 555-6690', workPhone: '(323) 555-6613', email: 'obrooks@outlinestudio.com', dateOfBirth: '1983-01-18' },
            { id: 'l6-c3', name: 'Naomi Schultz', title: 'Finance Director', mobilePhone: '(323) 555-6691', workPhone: '(323) 555-6614', email: 'nschultz@outlinestudio.com', dateOfBirth: '1979-12-22' }
        ]
    }
];

export function getAllLeads() {
    return [...LEADS];
}

export function getLeadById(id) {
    return LEADS.find((lead) => lead.id === id) || null;
}
