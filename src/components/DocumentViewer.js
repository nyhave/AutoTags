import React from 'react';
import './DocumentViewer.css';
import TagDisplay from './TagDisplay';

function DocumentViewer({ document }) {
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
            <h3>Document Content</h3>
          </div>
          <div className="text-content">
            {contentLines.map((line, idx) => (
              <p key={idx}>{line || '\u00A0'}</p>
            ))}
          </div>
        </div>

        <div className="tags-panel">
          <TagDisplay document={document} />
        </div>
      </div>
    </div>
  );
}

export default DocumentViewer;
