import React from 'react';
import './DocumentList.css';

function DocumentList({ documents, selectedDocId, onSelectDoc }) {
  return (
    <div className="document-list">
      <div className="document-list-header">
        <h2>Documents</h2>
        <span className="doc-count">{documents.length}</span>
      </div>

      <div className="document-items">
        {documents.map(doc => (
          <div
            key={doc.id}
            className={`document-item ${selectedDocId === doc.id ? 'selected' : ''}`}
            onClick={() => onSelectDoc(doc.id)}
          >
            <div className="doc-icon">📄</div>
            <div className="doc-info">
              <div className="doc-name">{doc.filename}</div>
              <div className="doc-tags-count">
                {doc.expected_tags.length} tags
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocumentList;
