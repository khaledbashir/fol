# Basheer Proposal System

## Source Files

- Preferences: `/fol/docs/templates/proposal-preferences-basheer.md`
- Master proposal template (read-only for normal jobs): `/fol/docs/templates/ai-freelance-proposal-template.md`
- PDF generator: `/fol/scripts/generate_ai_proposal_template_pdf.py`
- Clone helper: `/fol/scripts/new_proposal_from_template.sh`
- Client markdown outputs: `/fol/output/proposals/`
- Client PDF outputs: `/fol/output/pdf/`

## Brand and Voice

- Use `Basheer` or `Ahmad Basheer`.
- Keep language direct and premium.
- Avoid buzzwords and filler.
- Lead with outcomes and workflow impact.

## Proposal Shape

1. Executive summary
2. Goals and scope
3. Deliverables
4. Timeline
5. Fixed packages (USD)
6. Optional retainer
7. Why Basheer
8. Terms
9. Signature

## Layout Rules

- PDF uses fixed left sidebar style.
- Pricing always starts on page 2 via hard page break.
- Keep content concise enough for 2-3 pages unless user asks for expansion.

## Safe Generation Commands

Create clone + initial PDF:

```bash
bash /fol/scripts/new_proposal_from_template.sh <client-slug> [YYYY-MM-DD]
```

Regenerate PDF from an edited clone:

```bash
python3 /fol/scripts/generate_ai_proposal_template_pdf.py --source /fol/output/proposals/<client>-<date>.md --output /fol/output/pdf/<client>-<date>.pdf
```
