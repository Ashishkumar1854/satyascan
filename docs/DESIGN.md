# TruthLayer — Design Reference
> Antigravity must read this file at the START of every phase before writing any UI code.

---

## App Identity

- **Product name:** TruthLayer
- **Tagline:** AI-powered fact-checking for marketing content
- **Logo icon:** Shield with checkmark (use lucide-react: `ShieldCheck`)
- **Primary accent:** Blue (`#178BFF` light / `#60AFFF` dark)

---

## Color Tokens

Use these CSS variable names everywhere. Never hardcode hex in components.

```css
/* Backgrounds */
--bg-primary:     #FFFFFF  (dark: #0F0F0F)
--bg-secondary:   #F5F5F3  (dark: #1A1A1A)
--bg-tertiary:    #EBEBEB  (dark: #252525)

/* Text */
--text-primary:   #1A1A1A  (dark: #F0F0F0)
--text-secondary: #6B6B6B  (dark: #9A9A9A)
--text-tertiary:  #9A9A9A  (dark: #6B6B6B)

/* Status colors */
--verified-bg:    #EAF3DE  --verified-text:   #3B6D11
--false-bg:       #FCEBEB  --false-text:      #A32D2D
--inaccurate-bg:  #FAEEDA  --inaccurate-text: #854F0B

/* Borders */
--border:         rgba(0,0,0,0.10)  (dark: rgba(255,255,255,0.10))
--border-strong:  rgba(0,0,0,0.20)  (dark: rgba(255,255,255,0.20))

/* Accent */
--accent:         #178BFF
--accent-hover:   #0F7AE8
```

### Tailwind Class Equivalents (use these in JSX)
```
bg-white dark:bg-[#0F0F0F]           → --bg-primary
bg-[#F5F5F3] dark:bg-[#1A1A1A]      → --bg-secondary
bg-[#EBEBEB] dark:bg-[#252525]       → --bg-tertiary
text-[#1A1A1A] dark:text-[#F0F0F0]  → --text-primary
text-[#6B6B6B] dark:text-[#9A9A9A]  → --text-secondary
border-black/10 dark:border-white/10 → --border
```

---

## Typography

| Use | Size | Weight | Tailwind |
|-----|------|--------|---------|
| Page title | 20px | 500 | `text-xl font-medium` |
| Section heading | 15px | 500 | `text-[15px] font-medium` |
| Body text | 14px | 400 | `text-sm` |
| Small / meta | 12px | 400 | `text-xs` |
| Label caps | 11px | 500 | `text-[11px] font-medium uppercase tracking-wide` |

**Font family:** System font stack — `font-sans` (Tailwind default). Never import external fonts.

---

## Spacing Scale

Use multiples of 4px only.
```
gap-1  = 4px     p-2   = 8px
gap-2  = 8px     p-3   = 12px
gap-3  = 12px    p-4   = 16px
gap-4  = 16px    p-5   = 20px
gap-5  = 20px    p-6   = 24px
```

---

## Border Radius

| Element | Class |
|---------|-------|
| Cards, panels | `rounded-xl` (12px) |
| Buttons, inputs | `rounded-lg` (8px) |
| Badges, chips | `rounded-full` |
| Tags | `rounded-md` (6px) |

---

## Component Patterns

### Badge (status pill)
```jsx
// Always use these three variants — no others
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EAF3DE] text-[#3B6D11]">
  <span className="w-1.5 h-1.5 rounded-full bg-[#3B6D11]" />
  Verified
</span>

<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FCEBEB] text-[#A32D2D]">
  <span className="w-1.5 h-1.5 rounded-full bg-[#A32D2D]" />
  False
</span>

<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FAEEDA] text-[#854F0B]">
  <span className="w-1.5 h-1.5 rounded-full bg-[#854F0B]" />
  Inaccurate
</span>
```

### Card
```jsx
<div className="bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-xl p-4">
  {/* content */}
</div>
```

### Primary Button
```jsx
<button className="px-4 py-2 bg-[#178BFF] hover:bg-[#0F7AE8] text-white text-sm font-medium rounded-lg transition-colors">
  Label
</button>
```

### Secondary Button
```jsx
<button className="px-4 py-2 border border-black/10 dark:border-white/10 text-sm font-medium rounded-lg hover:bg-[#F5F5F3] dark:hover:bg-[#1A1A1A] transition-colors">
  Label
</button>
```

### Input
```jsx
<input className="w-full px-3 py-2 text-sm border border-black/10 dark:border-white/10 rounded-lg bg-transparent focus:outline-none focus:ring-1 focus:ring-[#178BFF]" />
```

### Confidence Bar
```jsx
<div className="h-1 w-full bg-[#EBEBEB] dark:bg-[#252525] rounded-full overflow-hidden">
  <div
    className="h-full rounded-full"
    style={{ width: `${confidence}%`, background: confidence > 80 ? '#3B6D11' : confidence > 60 ? '#854F0B' : '#A32D2D' }}
  />
</div>
```

### Section Label
```jsx
<p className="text-[11px] font-medium uppercase tracking-wide text-[#9A9A9A] mb-2">
  Claims Found
</p>
```

### Metric Card
```jsx
<div className="bg-[#F5F5F3] dark:bg-[#1A1A1A] rounded-xl p-3 text-center">
  <p className="text-2xl font-medium text-[#1A1A1A] dark:text-[#F0F0F0]">{value}</p>
  <p className="text-xs text-[#6B6B6B] dark:text-[#9A9A9A] mt-1">{label}</p>
</div>
```

---

## Layout Structure

```
┌─────────────────────────────────────────────────┐
│  SIDEBAR (180px fixed)  │  MAIN CONTENT (flex-1) │
│  ─────────────────────  │  ─────────────────────  │
│  Logo + name            │  View content here      │
│                         │                         │
│  Nav items              │                         │
│    • Upload             │                         │
│    • Results            │                         │
│    • History            │                         │
│                         │                         │
│  (bottom) Usage quota   │                         │
└─────────────────────────────────────────────────┘
```

```jsx
// Root layout shell — do not change this structure
<div className="flex h-screen bg-[#F5F5F3] dark:bg-[#0F0F0F]">
  <Sidebar />
  <main className="flex-1 overflow-y-auto">
    <Outlet />  {/* React Router views render here */}
  </main>
</div>
```

### Sidebar Nav Item
```jsx
// Active state
<div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#EBEBEB] dark:bg-[#252525] text-sm font-medium text-[#1A1A1A] dark:text-[#F0F0F0] cursor-pointer">
  <Icon size={16} />
  Upload
</div>

// Inactive state  
<div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#6B6B6B] dark:text-[#9A9A9A] cursor-pointer hover:bg-[#EBEBEB] dark:hover:bg-[#252525]">
  <Icon size={16} />
  Results
</div>
```

---

## Pages & Views

### 1. Upload Page (`/`)
- Large drag-and-drop zone, dashed border
- Three feature cards below (Extract / Verify / Report)
- No auth required for MVP

### 2. Processing Page (`/processing/:reportId`)
- File name + size shown
- 5-step progress list with icons (done ✓ / active spinner / pending number)
- Progress bar showing % complete
- Poll `/api/report/:id/status` every 2 seconds
- Auto-redirect to Results when status = "complete"

### 3. Results Page (`/results/:reportId`)
- Top: 4 metric cards (Trust Score ring, Verified count, Inaccurate count, False count)
- Filter tabs: All / Verified / Inaccurate / False
- Claims table: Claim text | Corrected fact | Status badge | Confidence bar | Sources
- Export button (downloads JSON or PDF)

### 4. History Page (`/history`)
- List of past reports, newest first
- Each row: filename, date, trust score, status summary badges
- Click row → navigate to `/results/:reportId`

---

## Trust Score Ring (SVG)

```jsx
// trustScore = number 0–100
const radius = 20;
const circumference = 2 * Math.PI * radius; // 125.7
const offset = circumference - (trustScore / 100) * circumference;
const color = trustScore >= 70 ? '#3B6D11' : trustScore >= 40 ? '#854F0B' : '#A32D2D';

<svg width="52" height="52" viewBox="0 0 52 52">
  <circle cx="26" cy="26" r={radius} fill="none" stroke="#EBEBEB" strokeWidth="5"/>
  <circle
    cx="26" cy="26" r={radius} fill="none"
    stroke={color} strokeWidth="5"
    strokeDasharray={circumference}
    strokeDashoffset={offset}
    strokeLinecap="round"
    transform="rotate(-90 26 26)"
  />
  <text x="26" y="30" textAnchor="middle" fontSize="12" fontWeight="500" fill="currentColor">
    {trustScore}%
  </text>
</svg>
```

---

## Processing Steps Config

```js
// Use this exact array in ProcessingPage.jsx
export const PROCESSING_STEPS = [
  { id: 1, label: 'Parsing PDF text',          apiStatus: 'parsing'     },
  { id: 2, label: 'Extracting factual claims', apiStatus: 'extracting'  },
  { id: 3, label: 'Searching live web sources',apiStatus: 'searching'   },
  { id: 4, label: 'Verifying claims with AI',  apiStatus: 'verifying'   },
  { id: 5, label: 'Building report',           apiStatus: 'building'    },
];
// Status from API: { currentStep: 'searching', searchProgress: { done: 7, total: 12 } }
```

---

## API Contract (Frontend ↔ Backend)

```
POST   /api/upload              → { reportId: "abc123" }
GET    /api/report/:id/status   → { status: "processing"|"complete"|"error", currentStep, progress }
GET    /api/report/:id          → Full report object (see below)
GET    /api/reports             → Array of past reports
```

### Report Object Shape
```json
{
  "id": "abc123",
  "filename": "marketing-report-2024.pdf",
  "createdAt": "2025-05-26T10:00:00Z",
  "trustScore": 42,
  "summary": { "verified": 5, "inaccurate": 3, "false": 4, "total": 12 },
  "claims": [
    {
      "id": "c1",
      "claim": "India GDP grew 12% in 2024",
      "status": "FALSE",
      "confidence": 91,
      "actualFact": "IMF data shows India GDP grew 6.8% in 2024",
      "explanation": "Marked FALSE because IMF and World Bank data contradict the 12% figure",
      "sources": [
        { "name": "IMF World Economic Outlook", "url": "https://imf.org/..." },
        { "name": "World Bank", "url": "https://worldbank.org/..." }
      ]
    }
  ]
}
```

---

## File Structure (follow exactly)

```
fact-check-agent/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StatusBadge.jsx       ← badge component from DESIGN.md
│   │   │   ├── ConfidenceBar.jsx     ← bar component from DESIGN.md
│   │   │   ├── MetricCard.jsx        ← metric card from DESIGN.md
│   │   │   ├── TrustScoreRing.jsx    ← SVG ring from DESIGN.md
│   │   │   ├── ClaimRow.jsx          ← single row in claims table
│   │   │   └── ProcessingSteps.jsx   ← step list with icons
│   │   ├── pages/
│   │   │   ├── UploadPage.jsx
│   │   │   ├── ProcessingPage.jsx
│   │   │   ├── ResultsPage.jsx
│   │   │   └── HistoryPage.jsx
│   │   ├── api/
│   │   │   └── client.js             ← axios instance + API calls
│   │   ├── utils/
│   │   │   └── trustScore.js         ← color logic for score
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── uploadController.js
│   │   │   └── reportController.js
│   │   ├── routes/
│   │   │   └── index.js
│   │   ├── models/
│   │   │   └── Report.js             ← Mongoose schema
│   │   ├── services/
│   │   │   └── aiConnector.js        ← calls Python FastAPI
│   │   └── server.js
│   └── package.json
│
├── ai-service/
│   ├── app/
│   │   ├── routes/
│   │   │   └── analyze.py
│   │   ├── services/
│   │   │   ├── pdf_extractor.py
│   │   │   ├── claim_extractor.py
│   │   │   └── verifier.py
│   │   ├── prompts/
│   │   │   ├── extract_claims.txt
│   │   │   └── verify_claim.txt
│   │   └── main.py
│   └── requirements.txt
│
├── docs/
│   └── DESIGN.md                     ← THIS FILE — read before every phase
│
└── README.md
```

---

## DO NOT Rules

1. **Never** hardcode hex colors outside of Tailwind class strings
2. **Never** use `font-bold` (weight 700) — use `font-medium` (500) max
3. **Never** add box-shadows or gradients to cards
4. **Never** use `position: fixed` for anything except the sidebar
5. **Never** import Google Fonts or any external font
6. **Never** use ALL CAPS text in UI (only label caps via CSS `uppercase`)
7. **Never** add more than 2 nav items to sidebar without approval
8. **Never** show raw API errors to users — always show friendly message
9. **Never** auto-submit without user clicking a button
10. **Never** change the 3-status system (Verified / Inaccurate / False) — these are fixed

---

## Checklist Before Every Component

- [ ] Read DESIGN.md first
- [ ] Using color tokens (not raw hex)
- [ ] Font sizes from typography table
- [ ] Status badges match exact pattern
- [ ] Dark mode classes included (`dark:`)
- [ ] No shadows, no gradients
- [ ] All spacing in 4px multiples
