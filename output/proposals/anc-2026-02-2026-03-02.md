# Phase 2 Proposal

## RFP Intelligence & Deal Automation

**Prepared for:** ANC Sports Enterprises  
**Prepared by:** Ahmad Basheer  
**Date:** February 2026  
**Validity:** 14 days  
**Currency:** USD

---

## Executive Summary

Phase 1 delivered the Proposal Engine — a system that replaced ANC's manual Excel-to-PDF pipeline with a centralized platform. The Proposals team now generates branded, error-free proposals directly from Excel workbooks, with consistent formatting and real-time margin calculations.

Phase 2 extends the platform upstream — to the front of the pipeline. Instead of starting with a blank estimate, the system starts with the RFP itself.

**The bottom line:** Upload an RFP. The system reads it, extracts every LED display, flags key requirements, and outputs a structured Excel the estimating team can price against immediately. What currently takes 8–12 hours of manual reading and re-typing becomes a 15-minute process.

---

## What This Replaces

Every new RFP triggers the same manual cycle. Phase 2 eliminates the most time-consuming steps:

| Manual Step                         | Today                     | With Phase 2                                  |
| ----------------------------------- | ------------------------- | --------------------------------------------- |
| Read 500+ page RFP manually         | 8–12 hours                | AI extracts all screens and specs ~15 minutes |
| Hunt for LED specs in Division 11   | Scattered across sections | Auto-locates display schedules                |
| Match specs to products by hand     | 2+ hours per project      | Auto-matched to ANC catalog                   |
| Build scoping workbook from scratch | 3–4 hours                 | One-click workbook generation                 |
| Diff addendums against base RFP     | Error-prone, manual       | Structured change report                      |

---

## What's Included

### 1. RFP Analyzer

Upload an RFP (PDF, any length). The system processes it through a multi-stage extraction pipeline:

| Stage                  | What It Does                                                                                                                            |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Text Extraction**    | OCR-powered processing handles scanned documents, typed PDFs, and mixed formats.                                                        |
| **Content Scoring**    | Pages are scored by relevance. Boilerplate, disclaimers, and filler are discarded — only the 30–40% that matters is kept.               |
| **Section Discovery**  | Automatically locates Division 11 specifications, Display Schedules (Section 11 06 60), and LED Systems (Section 11 63 10).             |
| **Display Extraction** | Structured tables are parsed for display names, dimensions, pixel pitch, quantity, and environment (indoor/outdoor).                    |
| **Drawing Detection**  | Technical drawings and blueprints are identified and flagged for manual review by the estimating team.                                  |
| **AI Analysis**        | High-value sections are analyzed, returning structured data: project name, venue, and a full list of screens with specifications.       |
| **Product Matching**   | Each extracted screen is matched to the closest product in the catalog by pitch, environment, and dimensions — with a confidence score. |

The output is an interactive split-panel view: the original PDF on the left, extracted specs on the right. Every extracted value links back to its source page so the team can verify without hunting.

### 2. Intelligence Mode

When ANC receives a vendor quote (Excel workbook with hardware pricing, install labor, and soft costs), Intelligence Mode imports the file directly and builds the proposal automatically.

The system detects and normalizes 20+ column types — pixel pitch, resolution, brightness, hardware cost, install labor, electrical, PM, engineering. It applies ANC's margin structure (20% services, 30% LED hardware, 35% CMS/software by default, adjustable per project), groups soft costs, flags alternate rows to prevent inflated base bids, and reconciles subtotals.

**Result:** A vendor quote that used to take 4–6 hours of manual re-keying is processed in under 45 minutes, with consistent margins and zero transcription errors.

### 3. Product Catalog

A centralized, searchable database of 20+ LED modules with full specifications: pixel pitch (2.5mm–10mm), power density, weight, brightness (1,000–10,000 nits), environment rating, and cabinet dimensions.

Enter screen dimensions and select a product — the system calculates cabinet grid, total resolution, power draw, and weight automatically. Loose specs from an RFP ("40x20 outdoor 4mm") are fuzzy-matched to the best product with a confidence score.

**Result:** One set of numbers, everywhere. No more inconsistencies between team members or outdated datasheets.

### 4. Scoping Workbook Export

One-click generation from extracted RFP data. The workbook includes dedicated sheets for:

| Sheet           | Contents                                           |
| --------------- | -------------------------------------------------- |
| LED Cost        | Hardware pricing per display with product matches  |
| Margin Analysis | Cost vs. selling price with margin percentages     |
| Project Info    | Client, venue, dates, key contacts                 |
| Requirements    | Bond, insurance, prevailing wage, warranty terms   |
| Processor Count | Video processors calculated from total pixel count |
| Page Triage     | Which RFP pages were used, which were skipped      |
| P&L / Cash Flow | Project-level financial projections                |
| POs & Travel    | Purchase order tracking and travel cost estimates  |
| Rate Card       | Subcontractor distribution-ready pricing           |

### 5. Additional Capabilities

| Capability                    | Description                                                                                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Red Flag Detection**        | Auto-flags risky terms: uncapped liquidated damages, abnormal insurance requirements, ambiguous scope, contradictions between sections.           |
| **Addendum Tracker**          | When an addendum drops, the system diffs it against the base RFP and shows exactly what changed — added screens, revised specs, new requirements. |
| **Bid / No-Bid Scorecard**    | Scores each opportunity on project size, margin potential, competition, timeline risk, and strategic fit.                                         |
| **Prevailing Wage Detection** | Detects prevailing wage and union requirements from the RFP and flags applicable labor categories.                                                |
| **Contract Risk Scanner**     | Scans contract language for commercially significant terms. Example: "Liquidated Damages: $5,000/day — NO CAP DETECTED — CRITICAL"                |
| **Multi-Venue Support**       | Handles RFPs with multiple venues or buildings in a single document, splitting screens by location.                                               |
| **Multi-Currency**            | USD, CAD, EUR, GBP — switch per project.                                                                                                          |

---

## Time Savings

| Task                       | Today                | With Phase 2  | Savings |
| -------------------------- | -------------------- | ------------- | ------- |
| RFP analysis & scoping     | 8–12 hours           | 15–30 minutes | ~95%    |
| Vendor quote processing    | 4–6 hours            | 30–45 minutes | ~85%    |
| Product spec lookup        | 30–60 min per screen | Instant       | ~95%    |
| Full RFP-to-proposal cycle | 2–3 days             | Under 4 hours | ~80%    |

---

## Investment

### Phase 2 Development

**$4,500** — All capabilities listed above included. Ongoing maintenance, hosting, and support covered under the existing $500/month agreement.

### AI Processing Costs (Pass-Through)

The AI services that power extraction and analysis have a usage cost. This is the actual cost from the provider — no markup.

| Cost                   | When                               | Estimate          |
| ---------------------- | ---------------------------------- | ----------------- |
| Build-time API usage   | During development (one-time)      | $100 – $300       |
| Usage-based processing | After go-live (scales with volume) | $100 – $300/month |

ANC selects the AI provider that meets your compliance requirements (OpenAI, Azure OpenAI, Anthropic, or any compatible provider). The platform is model-agnostic — switching providers requires zero code changes.

---

## Deployment Timeline

Phase 2 is fully built and production-ready. Deployment requires:

| #   | Step                                                | Timeline            |
| --- | --------------------------------------------------- | ------------------- |
| 1   | ANC approval of Phase 2 scope                       | This week           |
| 2   | AI model selection — ANC chooses preferred provider | During kickoff call |
| 3   | API key provisioning + activation                   | 1–2 business days   |
| 4   | Team walkthrough (60 minutes)                       | Within first week   |

**Time to live from approval:** 1 week

---

## What We Need From the Team

To get the most out of Phase 2, we need the following from ANC:

| #   | Action Item                          | From                  | Purpose                                                            |
| --- | ------------------------------------ | --------------------- | ------------------------------------------------------------------ |
| 1   | 20 Excel examples of prior estimates | Matt / Jeremy / Jireh | Trains the extraction engine on real ANC data                      |
| 2   | 5–10 full scope-of-work packages     | Natalia / Team        | Shows the full RFP → manufacturer → electrician → final Excel flow |
| 3   | Product catalog data                 | Eric                  | LED specs for auto-matching engine                                 |
| 4   | Kickoff call on audit Excel format   | Finance / Eric        | Align on columns, layout, and export requirements                  |
| 5   | Green light on scope                 | Natalia / Jared       | Confirm capabilities and budget                                    |
| 6   | Folder access for gathering examples | Natalia               | Self-serve access to historical files                              |

---

## Next Steps

1. Review this proposal with the team.
2. Schedule a kickoff call — live demo of the RFP Analyzer with a real RFP, plus alignment on the audit Excel format.
3. Confirm scope and go live.

---

**Prepared by:** Ahmad Basheer — February 2026

---

Client Signature: ****\*\*****\_\_****\*\*****

Date: ****\*\*****\_\_****\*\*****
