# Workflow: Verify PDF

1. Ensure the PDF template HTML and CSS is compiled.
2. Execute the `npm run generate-pdf-fixture` script in `packages/pdf-template`.
3. Check the output `test-output.pdf` against the visual specification.
4. If regressions are found, fix the CSS and re-run.
