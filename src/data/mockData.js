export const orgStats = {
  org: 'Project X',
  owner: 'Nammagiri',
  totalScans: 100,
  scheduled: 1000,
  rescans: 100,
  failedScans: 100,
  lastUpdated: '10 mins ago',
}

export const severityStats = [
  { label: 'Critical', count: 86, change: '+2%', trend: 'up', color: 'red' },
  { label: 'High',     count: 16, change: '+0.9%', trend: 'up', color: 'orange' },
  { label: 'Medium',   count: 26, change: '+0.9%', trend: 'down', color: 'yellow' },
  { label: 'Low',      count: 16, change: '+0.9%', trend: 'up', color: 'green' },
]

export const scans = [
  { id: 1,  name: 'Web App Servers', type: 'Greybox',  status: 'Completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 2,  name: 'Web App Servers', type: 'Greybox',  status: 'Completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 3,  name: 'Web App Servers', type: 'Greybox',  status: 'Completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 4,  name: 'Web App Servers', type: 'Greybox',  status: 'Completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 5,  name: 'Web App Servers', type: 'Greybox',  status: 'Completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 6,  name: 'Web App Servers', type: 'Greybox',  status: 'Completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 7,  name: 'Web App Servers', type: 'Greybox',  status: 'Completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 8,  name: 'Web App Servers', type: 'Greybox',  status: 'Scheduled', progress: 100, vuln: { critical: 5, high: 12, medium: 0,  low: 0  }, lastScan: '4d ago' },
  { id: 9,  name: 'Web App Servers', type: 'Greybox',  status: 'Scheduled', progress: 100, vuln: { critical: 5, high: 12, medium: 0,  low: 0  }, lastScan: '4d ago' },
  { id: 10, name: 'IoT Devices',     type: 'Blackbox', status: 'Failed',    progress: 10,  vuln: { critical: 2, high: 4,  medium: 8,  low: 1  }, lastScan: '3d ago' },
  { id: 11, name: 'Temp Data',       type: 'Blackbox', status: 'Failed',    progress: 10,  vuln: { critical: 2, high: 4,  medium: 8,  low: 1  }, lastScan: '3d ago' },
]

export const scanDetail = {
  id: 1,
  name: 'New Scan',
  type: 'Grey Box',
  target: 'google.com',
  startedAt: 'Nov 22, 09:00AM',
  credentials: '2 Active',
  files: 'Control.pdf',
  checklists: '40/350',
  progress: 0,
  status: 'In Progress',
  steps: ['Spidering', 'Mapping', 'Testing', 'Validating', 'Reporting'],
  activeStep: 0,
  activityLog: [
    { time: '09:00:00', text: "I'll begin a systematic penetration test on ", highlight: 'helpdesk.democorp.com', after: '. Let me start with reconnaissance and enumeration.' },
    { time: '09:01:00', text: 'Good! target is online. Now let me perform port scanning to identify running services.' },
    { time: '09:02:00', text: 'Excellent reconnaissance results:\n- helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)\nLet me probe the web server on target first to understand its structure.' },
    { time: '09:03:00', text: 'Great! I found a login page for a Help Desk Platform. I can see a useful comment: ', code: 'TODO: Delete the testing account (test:test)', after: '. Let me test this credential. The login redirects to ', path: '/password/test', end: '. Let me follow that path and explore it.' },
    { time: '09:04:00', text: "The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to ", code: "'#'", after: ' which means the current page. Let me try a different approach.' },
    { time: '09:05:00', text: 'It redirects back to /password/test. Let me check if there\'s an /api endpoint or look for other paths. Let me also try exploring with the ', code: 'test:test', after: ' password directly on other endpoints.' },
    { time: '09:06:00', text: "Great! I can access the dashboard using the ", header: 'X-UserId: 10032', after: " header. The dashboard shows \"Welcome, John Doe\". This suggests an ", bold: 'IDOR vulnerability', end: ' - I can access any user\'s dashboard by just changing the X-UserId header. Let me explore more of the application...' },
  ],
  findings: [
    { severity: 'Critical', time: '10:45:23', title: 'SQL Injection in Authentication Endpoint', endpoint: '/api/users/profile', description: 'Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.' },
    { severity: 'High',     time: '10:45:23', title: 'Unauthorized Access to User Metadata',    endpoint: '/api/auth/login',    description: 'Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.' },
    { severity: 'Medium',   time: '10:45:23', title: 'Broken Authentication Rate Limiting',      endpoint: '/api/search',        description: 'No effective rate limiting detected on login attempts. Automated brute-force attempts possible.' },
  ],
  bottomStats: {
    subAgents: 0,
    parallelExecutions: 2,
    operations: 1,
    critical: 0, high: 0, medium: 0, low: 0
  }
}