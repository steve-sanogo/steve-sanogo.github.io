# Steve Sanogo — Personal Portfolio

Static portfolio for Steve Sanogo, MVA student at ENS Paris-Saclay, focused on AI, machine learning, NLP, Speech AI, knowledge graphs and data engineering.

Production URL: https://steve-sanogo.github.io/

## Structure

- `index.html`: profile, education, experience, projects, distinctions, certifications and contact.
- `assets/css/style.css`: existing dark/gold theme, responsive layouts and accessibility rules.
- `assets/js/script.js`: navigation, synchronized filters, native project dialog, logo animation controls and email draft preparation.
- `assets/images/`: original artwork and icons. No image was recompressed during the audit.
- `LICENSE`: original template MIT attribution, retained.
- `index.txt` and `website-demo-image/`: legacy template material, not required at runtime, retained for review.

## Local preview

Open `index.html` directly or, with Python installed, run from this directory:

```sh
python -m http.server 8765 --bind 127.0.0.1
```

Then open http://127.0.0.1:8765/. No package installation or build is required.

## Editing

Keep project `data-category` values consistent with `data-filter-btn` and `data-select-item`. Current categories are `academic` and `professional`; `all` is the combined view. Add both filter controls when introducing another category. Use exact filename casing for GitHub Pages.

Navigation uses matching `data-nav-link`, `data-page` and section IDs. Section URLs such as `#portfolio` support direct opening and browser history. Professional project descriptions remain in their existing `data-desc` attributes and are rendered as text.

Contact prepares a `mailto:` draft. The visitor must open a configured email app and send the message themselves. There is no server, delivery confirmation or form service. Do not claim that the site sends email. Long drafts and mail app handling require manual checks.

Certification cards show issuer artwork. The shared Drive link leads to the existing certificate folder. Add individual credential links only when verified URLs are available. Discord keeps the existing username; a verified numeric user ID is required before restoring a profile link.

## Verification before publication

- Review `git status` and `git diff`; preserve any unrelated work.
- Test all six sections, 13 cards, both filter controls and the three professional dialogs.
- Check the keyboard, Escape, focus return, contact validation and reduced motion.
- Check widths 320, 375, 430, 768, 1024, 1280, 1440 and 1920 px.
- Check GitHub links and local assets, including filename casing.
- Publish the root of the intended branch through GitHub Pages only after review.

Google Fonts (Poppins) and Ionicons 5.5.2 are the only external display dependencies. An internet connection is needed for them. The page retains text and system-font fallbacks if unavailable. Modern browsers with native `<dialog>` support are the target.

## Historical files

Some original images, template text and demo screenshots are unreferenced. They are deliberately retained rather than deleted without reviewing their archival value. `website-demo-image/Thumbs.db` is already tracked; the ignore rule only prevents adding further copies and does not untrack it.
