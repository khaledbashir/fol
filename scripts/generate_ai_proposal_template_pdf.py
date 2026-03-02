from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, KeepTogether, Table, TableStyle, PageBreak
import re
import argparse
from pathlib import Path
from xml.sax.saxutils import escape

ROOT_DIR = Path(__file__).resolve().parents[1]
OUTPUT = str(ROOT_DIR / "output/pdf/basheer-ai-freelance-proposal-template.pdf")
MARKDOWN_SOURCE = str(ROOT_DIR / "docs/templates/ai-freelance-proposal-template.md")

PAGE_W, PAGE_H = A4
SIDEBAR_W = 52 * mm
MARGIN = 16 * mm
CONTENT_X = SIDEBAR_W + 8 * mm
CONTENT_W = PAGE_W - CONTENT_X - MARGIN


def md_inline_to_markup(text):
    escaped = escape(text)
    return re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", escaped)


def is_markdown_separator_row(cells):
    return all(re.fullmatch(r"[:\-\s]+", c or "") for c in cells)


def draw_sidebar(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(colors.HexColor("#0F172A"))
    canvas.rect(0, 0, SIDEBAR_W, PAGE_H, stroke=0, fill=1)

    canvas.setFillColor(colors.HexColor("#E2E8F0"))
    canvas.setFont("Helvetica-Bold", 12)
    canvas.drawString(10 * mm, PAGE_H - 18 * mm, "BASHEER")

    canvas.setFont("Helvetica", 8.5)
    y = PAGE_H - 28 * mm
    for line in [
        "AI FREELANCE SERVICES",
        "Proposal Template",
        "",
        "Sections",
        "01 Summary",
        "02 Scope",
        "03 Deliverables",
        "04 Timeline",
        "05 Investment",
    ]:
        canvas.drawString(10 * mm, y, line)
        y -= 5.2 * mm

    canvas.setStrokeColor(colors.HexColor("#334155"))
    canvas.setLineWidth(0.8)
    canvas.line(9 * mm, 44 * mm, SIDEBAR_W - 9 * mm, 44 * mm)

    canvas.setFont("Helvetica", 7.8)
    canvas.setFillColor(colors.HexColor("#94A3B8"))
    canvas.drawString(10 * mm, 36 * mm, "Prepared by Ahmad Basheer")
    canvas.drawString(10 * mm, 31 * mm, "Currency: USD")
    canvas.drawString(10 * mm, 26 * mm, f"Page {doc.page}")
    canvas.restoreState()


def make_styles():
    s = getSampleStyleSheet()
    s.add(ParagraphStyle(
        name="TitlePremium",
        parent=s["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=20,
        leading=24,
        textColor=colors.HexColor("#0B1220"),
        spaceAfter=8,
    ))
    s.add(ParagraphStyle(
        name="Subtle",
        parent=s["BodyText"],
        fontName="Helvetica",
        fontSize=10,
        leading=14,
        textColor=colors.HexColor("#475569"),
        spaceAfter=8,
    ))
    s.add(ParagraphStyle(
        name="Section",
        parent=s["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=16,
        textColor=colors.HexColor("#0F172A"),
        spaceBefore=10,
        spaceAfter=6,
    ))
    s.add(ParagraphStyle(
        name="Subsection",
        parent=s["Heading3"],
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=14,
        textColor=colors.HexColor("#0F172A"),
        spaceBefore=8,
        spaceAfter=4,
    ))
    s.add(ParagraphStyle(
        name="Body",
        parent=s["BodyText"],
        fontName="Helvetica",
        fontSize=10,
        leading=14,
        textColor=colors.HexColor("#0F172A"),
    ))
    s.add(ParagraphStyle(
        name="Small",
        parent=s["BodyText"],
        fontName="Helvetica",
        fontSize=9,
        leading=12,
        textColor=colors.HexColor("#334155"),
    ))
    s.add(ParagraphStyle(
        name="TableHeader",
        parent=s["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=9,
        leading=12,
        textColor=colors.HexColor("#0F172A"),
        wordWrap="CJK",
    ))
    s.add(ParagraphStyle(
        name="TableBody",
        parent=s["BodyText"],
        fontName="Helvetica",
        fontSize=9,
        leading=12,
        textColor=colors.HexColor("#0F172A"),
        wordWrap="CJK",
    ))
    return s


def build(source_path=MARKDOWN_SOURCE, output_path=OUTPUT, title="ANC Phase 2 Proposal - RFP Intelligence & Deal Automation", author="Ahmad Basheer"):
    with open(source_path, 'r') as f:
        md_content = f.read()
    
    styles = make_styles()

    doc = BaseDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=CONTENT_X,
        rightMargin=MARGIN,
        topMargin=16 * mm,
        bottomMargin=14 * mm,
        title=title,
        author=author,
    )
    frame = Frame(CONTENT_X, 14 * mm, CONTENT_W, PAGE_H - 30 * mm, id="content")
    tpl = PageTemplate(id="main", frames=[frame], onPage=draw_sidebar)
    doc.addPageTemplates([tpl])

    story = parse_markup_to_platypus(md_content, styles)
    
    investment_idx = None
    for i, elem in enumerate(story):
        if hasattr(elem, 'text') and 'Investment' in str(elem.text):
            investment_idx = i
            break
    
    if investment_idx is not None:
        story.insert(investment_idx, PageBreak())

    doc.build(story)


def parse_markup_to_platypus(md_content, styles):
    from reportlab.platypus import ListFlowable, ListItem
    
    story = []
    lines = md_content.split('\n')
    in_table = False
    table_data = []
    list_items = []
    
    def flush_list():
        nonlocal list_items
        if list_items:
            story.append(ListFlowable([ListItem(Paragraph(item, styles["Body"])) for item in list_items], bulletType='a'))
            list_items = []
    
    def flush_table():
        nonlocal table_data, in_table
        if table_data:
            cleaned_rows = [row for row in table_data if not is_markdown_separator_row(row)]
            if not cleaned_rows:
                table_data = []
                in_table = False
                return

            num_cols = len(cleaned_rows[0])
            # Distribute width based on column text volume so long description columns get more room.
            col_char_counts = []
            for col_idx in range(num_cols):
                col_char_counts.append(max(len((row[col_idx] if col_idx < len(row) else "").strip()) for row in cleaned_rows))
            total_chars = max(sum(col_char_counts), 1)
            col_widths = [CONTENT_W * (count / total_chars) for count in col_char_counts]
            min_col_w = 22 * mm
            col_widths = [max(w, min_col_w) for w in col_widths]
            scale = CONTENT_W / sum(col_widths)
            col_widths = [w * scale for w in col_widths]

            wrapped_rows = []
            for row_idx, row in enumerate(cleaned_rows):
                para_style = styles["TableHeader"] if row_idx == 0 else styles["TableBody"]
                wrapped_cells = []
                for cell in row:
                    wrapped_cells.append(Paragraph(md_inline_to_markup(cell), para_style))
                wrapped_rows.append(wrapped_cells)

            t = Table(wrapped_rows, colWidths=col_widths, repeatRows=1, splitByRow=1)
            t.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#E2E8F0")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#0F172A")),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]))
            story.append(t)
            table_data = []
        in_table = False
    
    i = 0
    while i < len(lines):
        line = lines[i].rstrip()
        
        if line.startswith('|') and not line.strip() == '|':
            if not in_table:
                in_table = True
                table_data = []
            cells = [c.strip() for c in line.split('|')[1:-1]]
            if cells and any(c for c in cells):
                table_data.append(cells)
            i += 1
            continue
        elif in_table:
            flush_table()
        
        if line.startswith('# '):
            story.append(Paragraph(line[2:], styles["TitlePremium"]))
        elif line.startswith('## '):
            story.append(Paragraph(line[3:], styles["Section"]))
        elif line.startswith('### '):
            story.append(Paragraph(line[4:], styles["Subsection"]))
        elif line.startswith('- ') or line.startswith('* '):
            list_items.append(line[2:])
        elif line.strip() == '':
            flush_list()
            story.append(Spacer(1, 6))
        else:
            flush_list()
            if line.strip():
                story.append(Paragraph(md_inline_to_markup(line), styles["Body"]))
        
        i += 1
    
    flush_list()
    flush_table()
    return story


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate proposal PDF from markdown source.")
    parser.add_argument("--source", default=MARKDOWN_SOURCE, help="Path to markdown source file.")
    parser.add_argument("--output", default=OUTPUT, help="Path to output PDF file.")
    parser.add_argument("--title", default="ANC Phase 2 Proposal - RFP Intelligence & Deal Automation", help="PDF document title metadata.")
    parser.add_argument("--author", default="Ahmad Basheer", help="PDF document author metadata.")
    args = parser.parse_args()

    build(
        source_path=args.source,
        output_path=args.output,
        title=args.title,
        author=args.author,
    )
