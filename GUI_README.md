# AutoTags React GUI

A React-based user interface for viewing documents and their automatically proposed tags/taxonomy.

## Features

✨ **Document List** - Browse through all uploaded documents in a searchable sidebar
📄 **Document Viewer** - View full document content with proper formatting
🏷️ **Tag Display** - See AI-suggested tags with confidence scores
🎯 **Tag Management** - Remove incorrect tags or add missing ones
📊 **Confidence Visualization** - Visual confidence score indicators for each tag

## Project Structure

```
src/
├── App.js                 # Main application component
├── App.css               # Main styling
└── components/
    ├── DocumentList.js   # Document list sidebar component
    ├── DocumentList.css
    ├── DocumentViewer.js # Document content viewer
    ├── DocumentViewer.css
    ├── TagDisplay.js     # Tag display and management
    └── TagDisplay.css
public/
├── index.html            # HTML entry point
test_dataset.json         # Test dataset with sample documents
package.json              # Project dependencies
```

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm start
```

The application will open at `http://localhost:3000`

## Usage

### Main Interface

- **Left Sidebar**: Lists all available documents with tag counts
- **Center Panel**: Shows the full text content of the selected document
- **Right Panel**: Displays proposed tags with confidence scores

### Managing Tags

1. **Remove Tags**: Click the ✕ button on any tag to remove it
2. **Restore Tags**: Click the ↻ button on removed tags to restore them
3. **Add Tags**: Tags can be selected from taxonomy (implementation in progress)
4. **Save Changes**: Click "Save Changes" button to persist modifications

### Confidence Scores

- **Green (≥90%)**: High confidence - likely correct
- **Orange (≥80%)**: Medium confidence - review recommended
- **Red (<80%)**: Low confidence - verify carefully

## Test Dataset

The application comes with 5 sample documents:

1. **Q4_2025_Financial_Report.txt** - Financial report (Finance)
2. **Invoice_INV-2026-001847.txt** - Service invoice (Sales)
3. **Meeting_Notes_Product_Roadmap.txt** - Meeting notes (Engineering)
4. **Employee_Onboarding_Policy.txt** - HR policy document (HR)
5. **Service_Agreement_ClientABC.txt** - Legal contract (Sales/Legal)

Each document includes:
- Full text content
- Expected tags from the taxonomy
- AI confidence scores for each tag

## Taxonomy Structure

The system supports a multi-dimensional taxonomy with categories:

- **Document Type**: Report, Invoice, Email, Meeting Notes, Contract
- **Department**: Sales, Engineering, HR, Finance, Operations
- **Confidentiality**: Public, Internal, Confidential
- **Priority**: Low, Medium, High, Urgent
- **Status**: Draft, Approved, Completed, Pending Review

## Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` folder.

## Future Enhancements

- [ ] Add taxonomy editor/selector
- [ ] Implement document upload feature
- [ ] Real-time progress tracking animation
- [ ] Tag filtering and search
- [ ] Export results to CSV
- [ ] Backend API integration
- [ ] Multi-user support with authentication
- [ ] Dark mode support
- [ ] Document preview with highlighting
