Extraction Layer

Separate extraction from business logic.

/extraction
   ├── pdf-extractor
   ├── spreadsheet-extractor
   ├── image-extractor
   ├── ai-extractor
   └── extraction-normalizer

Pipeline:

Input
 ↓
File identification
 ↓
Native parser
 ↓
OCR if necessary
 ↓
AI extraction
 ↓
Normalization
 ↓
Schema validation
 ↓
Confidence evaluation