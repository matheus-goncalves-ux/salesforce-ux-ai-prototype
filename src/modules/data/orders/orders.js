/**
 * Order fixture data used by the prototype.
 *
 * Each order carries its own related collections (products, history,
 * notes & attachments, alerts) so the detail page can render related
 * lists without a separate relationship map.
 *
 * Status values mirror the six-step Order delivery path used in the
 * Path component on the detail page.
 *
 * IMPORTANT: every record below is fully fabricated for prototyping.
 * No real customer, person, or order data is represented.
 */

export const ORDER_STAGES = [
    { name: 'Integrated', label: 'Integrated' },
    { name: 'Credit Management', label: 'Credit Management' },
    { name: 'Approved', label: 'Approved' },
    { name: 'Invoiced', label: 'Invoiced' },
    { name: 'Delivery Started', label: 'Delivery Started' },
    { name: 'Delivered', label: 'Delivered' }
];

export const ORDER_STAGE_INDEX = Object.fromEntries(
    ORDER_STAGES.map((stage, index) => [stage.name, index])
);

export const ORDER_TYPES = [
    'Standard',
    'Contract',
    'Renewal',
    'Subscription',
    'Service'
];

export const ORDER_STATUSES = [
    'Draft',
    'Integrated',
    'Activated',
    'On Hold',
    'Cancelled'
];

/* Shared related-list fixtures. Each order reuses the same fake rows
   so the prototype reads consistently — production data would diverge
   per record. */
const ORDER_PRODUCTS = [
    {
        id: 'op-1',
        productCode: 'HND-CIVIC-SP-26',
        productName: 'Honda Civic Sport 2026',
        quantity: 8,
        unitPrice: '$28,500.00',
        discount: '5%',
        totalPrice: '$216,600.00'
    },
    {
        id: 'op-2',
        productCode: 'HND-CRV-HYB-26',
        productName: 'Honda CR-V Hybrid 2026',
        quantity: 4,
        unitPrice: '$36,900.00',
        discount: '3%',
        totalPrice: '$143,208.00'
    },
    {
        id: 'op-3',
        productCode: 'SVC-EXT-WARR-5',
        productName: 'Extended Warranty (5 yr)',
        quantity: 12,
        unitPrice: '$1,450.00',
        discount: '0%',
        totalPrice: '$17,400.00'
    },
    {
        id: 'op-4',
        productCode: 'SVC-MAINT-PRM',
        productName: 'Premium Maintenance Plan',
        quantity: 12,
        unitPrice: '$2,200.00',
        discount: '10%',
        totalPrice: '$23,760.00'
    },
    {
        id: 'op-5',
        productCode: 'ACC-FLOORMAT-AW',
        productName: 'All-Weather Floor Mats',
        quantity: 12,
        unitPrice: '$185.00',
        discount: '0%',
        totalPrice: '$2,220.00'
    }
];

const ORDER_HISTORY = [
    {
        id: 'oh-1',
        date: 'Jun 14, 2026 · 09:42 AM',
        user: 'Sarah Johnson',
        action: 'Status changed',
        field: 'Status',
        oldValue: 'Draft',
        newValue: 'Integrated'
    },
    {
        id: 'oh-2',
        date: 'Jun 13, 2026 · 04:18 PM',
        user: 'Integration Service',
        action: 'Created',
        field: 'Order',
        oldValue: '—',
        newValue: 'Created from quote Q-001260'
    },
    {
        id: 'oh-3',
        date: 'Jun 12, 2026 · 02:05 PM',
        user: 'Mark Torres',
        action: 'Updated',
        field: 'Delivery Stage',
        oldValue: 'Pending',
        newValue: 'Scheduled'
    },
    {
        id: 'oh-4',
        date: 'Jun 10, 2026 · 11:30 AM',
        user: 'Sarah Johnson',
        action: 'Updated',
        field: 'Order Value',
        oldValue: '$385,400.00',
        newValue: '$403,188.00'
    }
];

const ORDER_ALERTS = [
    {
        id: 'al-1',
        severity: 'warning',
        iconName: 'utility:warning',
        title: 'Credit limit nearing threshold',
        message: 'Customer has used 82% of the approved credit limit. Review before invoicing.'
    },
    {
        id: 'al-2',
        severity: 'warning',
        iconName: 'utility:clock',
        title: 'Delivery window at risk',
        message: 'Carrier reported a 24-hour delay on inbound CR-V Hybrid units expected this week.'
    },
    {
        id: 'al-3',
        severity: 'warning',
        iconName: 'utility:info',
        title: 'Missing extended warranty signature',
        message: 'Customer must sign the extended warranty addendum before the order can be invoiced.'
    },
    {
        id: 'al-4',
        severity: 'warning',
        iconName: 'utility:notification',
        title: 'Shipping address verification pending',
        message: 'Carrier validation could not confirm the corporate dock address. Please re-verify.'
    },
    {
        id: 'al-5',
        severity: 'warning',
        iconName: 'utility:warning',
        title: 'Tax exemption certificate expires soon',
        message: 'Account tax exemption certificate expires in 14 days. Renewal documents required.'
    }
];

const ORDERS = [
    {
        id: 'ord-001',
        orderNumber: 'O-100245',
        accountName: 'Global Media',
        accountId: 'a1',
        owner: 'Sarah Johnson',
        status: 'Integrated',
        orderValue: '$403,188.00',
        orderValueRaw: 403188,
        orderType: 'Standard',
        startDate: 'Jun 10, 2026',
        startDateIso: '2026-06-10',
        deliveryStage: 'Integrated',
        lastModified: 'Jun 14, 2026',
        lastModifiedIso: '2026-06-14',
        contractNumber: 'CN-204188',
        poNumber: 'PO-44218',
        currencyIsoCode: 'USD',
        billingStreet: '123 Market St',
        billingCity: 'San Francisco',
        billingState: 'CA',
        billingZip: '94105',
        billingCountry: 'United States',
        shippingStreet: '450 Mission St, Dock 3',
        shippingCity: 'San Francisco',
        shippingState: 'CA',
        shippingZip: '94105',
        shippingCountry: 'United States',
        description: 'Quarterly executive fleet refresh for the west coast leadership team. Includes extended warranty and premium maintenance riders.',
        createdDate: 'Jun 10, 2026',
        createdBy: 'Sarah Johnson',
        lastModifiedBy: 'Sarah Johnson',
        activatedDate: '',
        activatedBy: '',
        products: ORDER_PRODUCTS,
        history: ORDER_HISTORY,
        alerts: ORDER_ALERTS
    },
    {
        id: 'ord-002',
        orderNumber: 'O-100244',
        accountName: 'Acme',
        accountId: 'a2',
        owner: 'Mark Torres',
        status: 'Activated',
        orderValue: '$1,287,500.00',
        orderValueRaw: 1287500,
        orderType: 'Contract',
        startDate: 'May 28, 2026',
        startDateIso: '2026-05-28',
        deliveryStage: 'Delivery Started',
        lastModified: 'Jun 12, 2026',
        lastModifiedIso: '2026-06-12',
        contractNumber: 'CN-204150',
        poNumber: 'PO-44102',
        currencyIsoCode: 'USD',
        billingStreet: '456 Broadway',
        billingCity: 'New York',
        billingState: 'NY',
        billingZip: '10013',
        billingCountry: 'United States',
        shippingStreet: '120 Hudson St',
        shippingCity: 'New York',
        shippingState: 'NY',
        shippingZip: '10013',
        shippingCountry: 'United States',
        description: 'Annual contract refresh covering 28 vehicles for the Acme east coast distribution fleet.',
        createdDate: 'May 25, 2026',
        createdBy: 'Mark Torres',
        lastModifiedBy: 'Mark Torres',
        activatedDate: 'Jun 02, 2026',
        activatedBy: 'Mark Torres',
        products: ORDER_PRODUCTS,
        history: ORDER_HISTORY,
        alerts: ORDER_ALERTS.slice(0, 3)
    },
    {
        id: 'ord-003',
        orderNumber: 'O-100243',
        accountName: 'Pinnacle Corp',
        accountId: 'a3',
        owner: 'Lisa Chen',
        status: 'Draft',
        orderValue: '$58,400.00',
        orderValueRaw: 58400,
        orderType: 'Subscription',
        startDate: 'Jun 02, 2026',
        startDateIso: '2026-06-02',
        deliveryStage: 'Credit Management',
        lastModified: 'Jun 08, 2026',
        lastModifiedIso: '2026-06-08',
        contractNumber: 'CN-204133',
        poNumber: 'PO-44090',
        currencyIsoCode: 'USD',
        billingStreet: '789 Mission St',
        billingCity: 'San Francisco',
        billingState: 'CA',
        billingZip: '94103',
        billingCountry: 'United States',
        shippingStreet: '789 Mission St',
        shippingCity: 'San Francisco',
        shippingState: 'CA',
        shippingZip: '94103',
        shippingCountry: 'United States',
        description: 'Pilot subscription for two Civic Sport units while Pinnacle evaluates the fleet program for a broader rollout.',
        createdDate: 'May 30, 2026',
        createdBy: 'Lisa Chen',
        lastModifiedBy: 'Lisa Chen',
        activatedDate: '',
        activatedBy: '',
        products: ORDER_PRODUCTS.slice(0, 3),
        history: ORDER_HISTORY,
        alerts: ORDER_ALERTS.slice(0, 2)
    },
    {
        id: 'ord-004',
        orderNumber: 'O-100242',
        accountName: 'Globex Holdings',
        accountId: 'a4',
        owner: 'Sarah Johnson',
        status: 'Activated',
        orderValue: '$245,000.00',
        orderValueRaw: 245000,
        orderType: 'Renewal',
        startDate: 'Apr 15, 2026',
        startDateIso: '2026-04-15',
        deliveryStage: 'Delivered',
        lastModified: 'May 30, 2026',
        lastModifiedIso: '2026-05-30',
        contractNumber: 'CN-204090',
        poNumber: 'PO-43988',
        currencyIsoCode: 'USD',
        billingStreet: '200 N LaSalle',
        billingCity: 'Chicago',
        billingState: 'IL',
        billingZip: '60601',
        billingCountry: 'United States',
        shippingStreet: '200 N LaSalle',
        shippingCity: 'Chicago',
        shippingState: 'IL',
        shippingZip: '60601',
        shippingCountry: 'United States',
        description: 'Renewal of the Globex Holdings annual fleet contract with no scope changes from prior period.',
        createdDate: 'Apr 02, 2026',
        createdBy: 'Sarah Johnson',
        lastModifiedBy: 'Sarah Johnson',
        activatedDate: 'Apr 20, 2026',
        activatedBy: 'Sarah Johnson',
        products: ORDER_PRODUCTS,
        history: ORDER_HISTORY,
        alerts: ORDER_ALERTS.slice(0, 1)
    },
    {
        id: 'ord-005',
        orderNumber: 'O-100241',
        accountName: 'Initech',
        accountId: 'a5',
        owner: 'Mark Torres',
        status: 'On Hold',
        orderValue: '$92,750.00',
        orderValueRaw: 92750,
        orderType: 'Service',
        startDate: 'May 18, 2026',
        startDateIso: '2026-05-18',
        deliveryStage: 'Approved',
        lastModified: 'Jun 04, 2026',
        lastModifiedIso: '2026-06-04',
        contractNumber: 'CN-203998',
        poNumber: 'PO-43880',
        currencyIsoCode: 'USD',
        billingStreet: '500 Congress Ave',
        billingCity: 'Austin',
        billingState: 'TX',
        billingZip: '78701',
        billingCountry: 'United States',
        shippingStreet: '500 Congress Ave',
        shippingCity: 'Austin',
        shippingState: 'TX',
        shippingZip: '78701',
        shippingCountry: 'United States',
        description: 'Service-only order covering preventative maintenance for the Initech engineering shuttle fleet.',
        createdDate: 'May 15, 2026',
        createdBy: 'Mark Torres',
        lastModifiedBy: 'Mark Torres',
        activatedDate: '',
        activatedBy: '',
        products: ORDER_PRODUCTS.slice(2, 5),
        history: ORDER_HISTORY,
        alerts: ORDER_ALERTS.slice(0, 4)
    },
    {
        id: 'ord-006',
        orderNumber: 'O-100240',
        accountName: 'Cascade Logistics',
        accountId: 'a6',
        owner: 'Mark Torres',
        status: 'Cancelled',
        orderValue: '$12,000.00',
        orderValueRaw: 12000,
        orderType: 'Standard',
        startDate: 'Apr 02, 2026',
        startDateIso: '2026-04-02',
        deliveryStage: 'Invoiced',
        lastModified: 'May 12, 2026',
        lastModifiedIso: '2026-05-12',
        contractNumber: 'CN-203910',
        poNumber: 'PO-43770',
        currencyIsoCode: 'USD',
        billingStreet: '1500 SW 5th Ave',
        billingCity: 'Portland',
        billingState: 'OR',
        billingZip: '97201',
        billingCountry: 'United States',
        shippingStreet: '1500 SW 5th Ave',
        shippingCity: 'Portland',
        shippingState: 'OR',
        shippingZip: '97201',
        shippingCountry: 'United States',
        description: 'Cancelled after the customer paused fleet expansion. Held for re-quote in the next fiscal cycle.',
        createdDate: 'Mar 28, 2026',
        createdBy: 'Mark Torres',
        lastModifiedBy: 'Sarah Johnson',
        activatedDate: '',
        activatedBy: '',
        products: ORDER_PRODUCTS.slice(0, 2),
        history: ORDER_HISTORY,
        alerts: []
    }
];

export function getAllOrders() {
    return [...ORDERS];
}

export function getOrderById(id) {
    return ORDERS.find((order) => order.id === id) || null;
}
