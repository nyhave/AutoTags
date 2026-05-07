import React, { useState } from 'react';
import './DocumentViewer.css';
import TagDisplay from './TagDisplay';

function DocumentViewer({ document }) {
  const [contentVisible, setContentVisible] = useState(false);
  const contentLines = document.content.split('\n');

  return (
    <div className="document-viewer">
      <div className="document-header">
        <h2>{document.filename}</h2>
        <span className="doc-id">ID: {document.id}</span>
      </div>

      <div className="viewer-layout">
        <div className="document-content">
          <div className="content-header">
            <div className="content-header-row">
              <h3>Document Content</h3>
              <button
                className="toggle-content-btn"
                onClick={() => setContentVisible(!contentVisible)}
                title={contentVisible ? 'Hide content' : 'Show content'}
              >
                {contentVisible ? '▼ Hide' : '▶ Show'} ({document.content.length} chars)
              </button>
            </div>
          </div>
          {contentVisible && (
            <div className="text-content">
              {contentLines.map((line, idx) => (
                <p key={idx}>{line || '\u00A0'}</p>
              ))}
            </div>
          )}
          {!contentVisible && (
            <div className="content-placeholder">
              <p>📄 Click "Show" to view document content</p>
            </div>
          )}
        </div>

        <div className="tags-panel">
          <TagDisplay document={document} />
        </div>
      </div>
    </div>
  );
}

export default DocumentViewer;
