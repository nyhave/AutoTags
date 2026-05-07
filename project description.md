# AutoTags: Intelligent Document Tagging System

## Project Overview

AutoTags is an intelligent document tagging system that automatically categorizes and tags documents using machine learning and custom taxonomies. The system enables users to upload documents, automatically apply relevant tags based on content, monitor the tagging process in real-time, and manually correct tags when needed. The system is flexible and works with user-defined taxonomies to support various industries and use cases.

### Key Features
- **Intelligent Auto-Tagging**: Automatically analyzes document content and assigns relevant tags
- **Custom Taxonomy Support**: Works with user-provided taxonomies/ontologies for domain-specific tagging
- **Real-Time Progress Monitoring**: Users can watch the tagging process as it happens
- **Tag Correction Interface**: Easy-to-use interface for users to review and correct incorrect tags
- **Batch Processing**: Handle multiple document uploads simultaneously
- **Document Preview**: View original documents while reviewing tags

---

## MVP (Minimum Viable Product)

### Core Functionality

1. **Taxonomy Management**
   - Upload/import a custom taxonomy (CSV, JSON, or simple text format)
   - Store and manage taxonomy categories and tags
   - Support flat or hierarchical taxonomies

2. **Document Upload**
   - Simple drag-and-drop or file picker interface
   - Support for common document formats: PDF, TXT, DOCX, MD
   - Single or batch file upload capability
   - File size validation (max 50MB per document, 500MB per batch)

3. **Auto-Tagging Engine**
   - Simple keyword/pattern matching based on taxonomy
   - TF-IDF or basic ML model for content analysis
   - Tag suggestions with confidence scores (0-100%)
   - Apply tags based on configurable confidence threshold

4. **Progress Visualization**
   - Real-time progress bar showing processing status
   - List of documents being processed
   - Per-document status (queued, processing, completed, failed)

5. **Tag Review & Correction**
   - Display document with current tags
   - Show applied tags with confidence scores
   - One-click tag removal
   - Quick-add interface for missing tags from taxonomy
   - Document-level review interface

6. **Results Management**
   - Display final tagged documents
   - Export results (CSV with document name and assigned tags)
   - Basic search/filter by tags

### Tech Stack (MVP Recommendation)
- **Backend**: Python (FastAPI) + spaCy/scikit-learn for NLP
- **Frontend**: React/Vue for document upload and tag interface
- **Database**: SQLite or PostgreSQL for metadata
- **File Storage**: Local filesystem or S3-compatible storage

---

## Future Enhancements (Post-MVP)

### Phase 2 - Advanced NLP & ML
- Deep learning models (transformers like BERT) for better contextual understanding
- Multi-language support
- Named Entity Recognition (NER) integration
- Custom model training on user-provided labeled datasets
- Active learning: System learns from user corrections

### Phase 3 - Advanced Features
- **Hierarchical Tag Support**: Multi-level taxonomy with parent-child relationships
- **Confidence-Based Workflows**: Route high-confidence and low-confidence tags to different approval paths
- **Bulk Operations**: 
  - Bulk tag editing across multiple documents
  - Tag merge/consolidation
  - Taxonomy updates with retroactive re-tagging
- **Analytics Dashboard**:
  - Tag distribution across documents
  - Tagging accuracy metrics
  - Common misclassifications

### Phase 4 - Collaboration & Workflow
- Multi-user support with role-based access
- Team-based tagging workflows and approval processes
- Comment/annotation system for disputed tags
- Tag suggestion history and undo/redo
- Audit trail of tag changes

### Phase 5 - Integration & Automation
- API for external integrations
- Webhook support for external systems
- Scheduled document re-tagging
- Integration with document management systems (SharePoint, Alfresco, etc.)
- Automated email notifications on processing completion

---

## Test Document Sources

### Free & Open Sources

1. **Government & Public Documents**
   - [USA Government Documents](https://www.govinfo.gov/) - Public government documents
   - [European Union Publications](https://publications.europa.eu/) - EU official documents
   - [UN Documents](https://documents.un.org/) - United Nations publications

2. **Academic & Research**
   - [arXiv](https://arxiv.org/) - Scientific papers (PDF downloads)
   - [Google Scholar](https://scholar.google.com/) - Research papers with links
   - [OpenAlex](https://openalex.org/) - Open access research metadata

3. **News & Media**
   - [BBC News](https://www.bbc.com/news/) - Publicly available articles
   - [Reuters](https://www.reuters.com/) - News articles
   - [Medium](https://medium.com/) - Published articles

4. **Project & Technical Documentation**
   - [GitHub README files](https://github.com/) - Software project documentation
   - [Read the Docs](https://readthedocs.org/) - Technical documentation
   - [Stack Overflow](https://stackoverflow.com/) - Q&A content

5. **Datasets & Collections**
   - [20 Newsgroups Dataset](http://qwone.com/~jason/20Newsgroups/) - Classic ML dataset
   - [Reuters Corpus](https://trec.nist.gov/) - News document collection
   - [Common Crawl](https://commoncrawl.org/) - Web page archives
   - [Kaggle Datasets](https://www.kaggle.com/datasets) - Various document collections

6. **Legal & Compliance**
   - [PACER (Public Access to Court Electronic Records)](https://www.pacer.uscourts.gov/) - Court documents
   - [SEC Edgar](https://www.sec.gov/edgar) - Company filings
   - [Copyright Office](https://www.copyright.gov/) - Legal documents

### Synthetic Test Data
- Generate dummy documents using templates
- Create sample PDFs with known content for testing
- Use Lorem Ipsum with injected keywords matching your taxonomy

---

## File Upload & Tagging UI/UX Flow

### Upload Phase
```
1. User navigates to Upload section
   ↓
2. Select/define taxonomy (or use existing)
   ↓
3. Drag-and-drop or file picker → select documents
   ↓
4. Optional: Set tagging confidence threshold (e.g., 60%)
   ↓
5. Click "Start Processing" button
```

### Real-Time Progress Monitoring
```
Display during processing:
┌─────────────────────────────────────────┐
│  Processing: 3 of 10 documents         │
│  ████████░░░░░░░░░░░░░░░░░░░░  30%    │
├─────────────────────────────────────────┤
│  ✓ document1.pdf (completed)           │
│  ⏳ document2.pdf (processing...)      │
│  ⋯ document3.pdf (queued)              │
│  ⋯ document4.pdf (queued)              │
└─────────────────────────────────────────┘
```

### Tag Review & Correction Phase
```
Once processing complete or for individual documents:

┌──────────────────────────────────────────────┐
│  Document: report2024.pdf                    │
├──────────────────────────────────────────────┤
│  Preview: [PDF content preview pane]         │
├──────────────────────────────────────────────┤
│  Applied Tags:                               │
│  ✓ [Finance] 95% confidence     [✕]         │
│  ✓ [Q4 Report] 87% confidence   [✕]         │
│  ✓ [Internal] 72% confidence    [✕]         │
│                                              │
│  Available Tags from Taxonomy:               │
│  + [Annual Report]                           │
│  + [Market Analysis]                         │
│  + [Confidential]                            │
├──────────────────────────────────────────────┤
│  [← Previous] [Save] [Next →]               │
└──────────────────────────────────────────────┘
```

### Results Export
```
Results available in:
- Interactive table view (searchable/filterable)
- CSV export (document name | tags | confidence)
- Document view with tags overlay
```

---

## Taxonomy Support

### Input Format Examples

#### Simple Flat Taxonomy (TXT/CSV)
```
Finance
HR
Operations
Marketing
Legal
```

#### Structured Taxonomy (JSON)
```json
{
  "taxonomy": {
    "document_type": ["Report", "Invoice", "Email", "Meeting Notes"],
    "department": ["Sales", "Engineering", "HR", "Finance"],
    "confidentiality": ["Public", "Internal", "Confidential", "Secret"],
    "priority": ["Low", "Medium", "High", "Urgent"]
  }
}
```

#### Hierarchical Taxonomy (JSON)
```json
{
  "taxonomy": {
    "Business": {
      "Finance": ["Budget", "Audit", "Payroll"],
      "Sales": ["Proposal", "Contract", "Lead"],
      "Operations": ["Process", "Quality", "Safety"]
    },
    "Legal": {
      "Compliance": ["Regulation", "Audit", "Training"],
      "Contracts": ["NDA", "Service Agreement", "Purchase Order"]
    }
  }
}
```

### Taxonomy Features
- Support for multi-label tagging (documents can have multiple tags)
- Tag aliases/synonyms for better matching
- Optional tag descriptions/definitions for the AI model
- Validation to prevent invalid tag assignments

---

## Technical Architecture Overview

### High-Level Components

```
┌─────────────────────────────────────────────┐
│           Frontend (React/Vue)              │
│  - Upload interface                         │
│  - Progress monitoring                      │
│  - Tag review & correction UI               │
└─────────┬──────────────────────────────────┘
          │ REST API / WebSocket
          ↓
┌─────────────────────────────────────────────┐
│         Backend API (FastAPI/Flask)         │
│  - Document management                      │
│  - Taxonomy management                      │
│  - Job queue & progress tracking            │
│  - Tag suggestion API                       │
└─────────┬──────────────────────────────────┘
          │
    ┌─────┴──────┬────────────┐
    ↓            ↓            ↓
┌────────┐  ┌─────────┐  ┌──────────┐
│ File   │  │Database │  │NLP/ML    │
│Storage │  │(Metadata)│  │Engine    │
└────────┘  └─────────┘  └──────────┘
```

---

## Success Metrics (MVP)

- ✓ Support 4+ document formats (PDF, TXT, DOCX, MD)
- ✓ Process 10+ documents in < 60 seconds
- ✓ Baseline accuracy: 70%+ correct tag assignments
- ✓ User can correct tags in < 30 seconds per document
- ✓ Export results in machine-readable format
- ✓ Support custom taxonomies with 50+ tags

---

## Next Steps

1. **Define Final Taxonomy**: Create/finalize the taxonomy/categories to support
2. **Gather Test Documents**: Download sample documents from sources listed above
3. **Architecture Design**: Detail API endpoints and database schema
4. **Prototype NLP Model**: Test keyword matching and simple ML approaches
5. **UI/UX Mockups**: Create wireframes for upload and review interfaces
6. **Implementation Sprint**: Build MVP in phases (backend → frontend → integration)
