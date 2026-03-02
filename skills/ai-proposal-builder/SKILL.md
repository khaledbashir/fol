---
name: ai-proposal-builder
description: Build client-ready freelance AI proposals in Basheer's house style using the repository templates and PDF generator. Use when asked to create, customize, update, or regenerate proposals, proposal templates, package tables, retainer options, or deterministic page-break PDF outputs.
---

# AI Proposal Builder

Create proposal drafts and polished PDFs with Basheer defaults, minimal clean styling, and consistent section/page structure.

## Workflow

1. Read [references/basheer-proposal-system.md](/fol/skills/ai-proposal-builder/references/basheer-proposal-system.md).
2. Load source templates:
   - [proposal-preferences-basheer.md](/fol/docs/templates/proposal-preferences-basheer.md)
   - [ai-freelance-proposal-template.md](/fol/docs/templates/ai-freelance-proposal-template.md)
3. Collect client-specific inputs (client name, goals, scope, timeline, package choice, optional retainer).
4. Clone the master template to a client file:
   - `bash /fol/scripts/new_proposal_from_template.sh <client-slug> [YYYY-MM-DD]`
5. Update proposal content only in the cloned markdown file under `/fol/output/proposals/`.
6. Generate PDF from that cloned source using:
   - `python3 /fol/scripts/generate_ai_proposal_template_pdf.py --source <cloned-md> --output <client-pdf>`
7. Validate output exists and report file path.

## Rules

- Keep tone premium, direct, and jargon-free.
- Use USD unless user overrides currency.
- Keep fixed packages and optional retainer section unless user asks to remove.
- Preserve deterministic page layout from the generator (`PageBreak` before pricing section).
- Keep language outcome-focused (business impact first, implementation second).
- Do not edit master template during normal client proposal generation.

## Outputs

- Editable template source: [ai-freelance-proposal-template.md](/fol/docs/templates/ai-freelance-proposal-template.md)
- Generated PDF: [basheer-ai-freelance-proposal-template.pdf](/fol/output/pdf/basheer-ai-freelance-proposal-template.pdf)

## Scripts Location

All scripts are in `/fol/scripts/` (not in `/fol/skills/ai-proposal-builder/scripts/`).
