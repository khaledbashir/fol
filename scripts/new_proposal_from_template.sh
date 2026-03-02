#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <client-slug> [YYYY-MM-DD]"
  echo "Example: $0 acme-corp 2026-03-02"
  exit 1
fi

CLIENT_SLUG="$1"
DATE_STAMP="${2:-$(date +%F)}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

TEMPLATE_MD="${ROOT_DIR}/docs/templates/ai-freelance-proposal-template.md"
OUT_MD_DIR="${ROOT_DIR}/output/proposals"
OUT_PDF_DIR="${ROOT_DIR}/output/pdf"

OUT_MD="${OUT_MD_DIR}/${CLIENT_SLUG}-${DATE_STAMP}.md"
OUT_PDF="${OUT_PDF_DIR}/${CLIENT_SLUG}-${DATE_STAMP}.pdf"

mkdir -p "${OUT_MD_DIR}" "${OUT_PDF_DIR}"

cp "${TEMPLATE_MD}" "${OUT_MD}"

python3 "${ROOT_DIR}/scripts/generate_ai_proposal_template_pdf.py" \
  --source "${OUT_MD}" \
  --output "${OUT_PDF}" \
  --title "Proposal - ${CLIENT_SLUG}" \
  --author "Ahmad Basheer"

echo "Created working copy: ${OUT_MD}"
echo "Generated PDF: ${OUT_PDF}"
