const ACCOUNTS = [
    {
        id: 'a1',
        name: 'Global Media',
        industry: 'Media',
        type: 'Customer - Direct',
        location: 'San Francisco, CA',
        employees: '5,000+',
        phone: '(415) 555-1212',
        website: 'www.globalmedia.com',
        annualRevenue: '$1.2B',
        rating: 'Hot',
        ownership: 'Public',
        accountOwner: 'Sarah Johnson',
        billingStreet: '123 Market St',
        billingCity: 'San Francisco',
        billingState: 'CA',
        billingZip: '94105',
        description: 'Global Media is a leading multimedia conglomerate with operations spanning broadcast, digital, and print across the west coast.'
    },
    {
        id: 'a2',
        name: 'Acme',
        industry: 'Manufacturing',
        type: 'Customer - Channel',
        location: 'New York, NY',
        employees: '10,000+',
        phone: '(212) 555-5555',
        website: 'www.acme.com',
        annualRevenue: '$4.5B',
        rating: 'Hot',
        ownership: 'Public',
        accountOwner: 'Mark Torres',
        billingStreet: '456 Broadway',
        billingCity: 'New York',
        billingState: 'NY',
        billingZip: '10013',
        description: 'Acme is a Fortune 500 manufacturer with a long-standing channel partnership and recurring annual contract.'
    },
    {
        id: 'a3',
        name: 'Pinnacle Corp',
        industry: 'Technology',
        type: 'Prospect',
        location: 'San Francisco, CA',
        employees: '1,200',
        phone: '(415) 555-2020',
        website: 'www.pinnaclecorp.io',
        annualRevenue: '$180M',
        rating: 'Warm',
        ownership: 'Private',
        accountOwner: 'Lisa Chen',
        billingStreet: '789 Mission St',
        billingCity: 'San Francisco',
        billingState: 'CA',
        billingZip: '94103',
        description: 'High-growth SaaS prospect introduced through a Q2 partner referral. Actively evaluating platform options.'
    },
    {
        id: 'a4',
        name: 'Globex Holdings',
        industry: 'Financial Services',
        type: 'Customer - Direct',
        location: 'Chicago, IL',
        employees: '8,500',
        phone: '(312) 555-7700',
        website: 'www.globexholdings.com',
        annualRevenue: '$3.1B',
        rating: 'Hot',
        ownership: 'Public',
        accountOwner: 'Sarah Johnson',
        billingStreet: '200 N LaSalle',
        billingCity: 'Chicago',
        billingState: 'IL',
        billingZip: '60601',
        description: 'Long-time enterprise customer expanding into wealth management. Strategic for cross-sell into the Premier product line.'
    },
    {
        id: 'a5',
        name: 'Initech',
        industry: 'Software',
        type: 'Partner',
        location: 'Austin, TX',
        employees: '650',
        phone: '(512) 555-8989',
        website: 'www.initech.com',
        annualRevenue: '$95M',
        rating: 'Warm',
        ownership: 'Private',
        accountOwner: 'Mark Torres',
        billingStreet: '500 Congress Ave',
        billingCity: 'Austin',
        billingState: 'TX',
        billingZip: '78701',
        description: 'Tier 2 ISV partner co-selling into mid-market. Joint solution launched at Dreamforce.'
    }
];

// Mimics Salesforce AccountContactRelation: a contact can be linked to many accounts.
const CONTACT_ACCOUNT_RELATIONS = {
    '1': ['a1', 'a4'],
    '2': ['a2', 'a5'],
    '3': ['a1'],
    '4': ['a2'],
    '5': ['a1', 'a3'],
    '6': ['a2'],
    '7': ['a3', 'a5']
};

export function getAllAccounts() {
    return [...ACCOUNTS];
}

export function getAccountById(id) {
    return ACCOUNTS.find((account) => account.id === id) || null;
}

export function getAccountsForContact(contactId) {
    const ids = CONTACT_ACCOUNT_RELATIONS[contactId] || [];
    return ACCOUNTS.filter((account) => ids.includes(account.id));
}

export function getContactIdsForAccount(accountId) {
    return Object.entries(CONTACT_ACCOUNT_RELATIONS)
        .filter(([, accountIds]) => accountIds.includes(accountId))
        .map(([contactId]) => contactId);
}
