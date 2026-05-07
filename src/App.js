import React, { useState, useEffect } from 'react';
import './App.css';
import DocumentList from './components/DocumentList';
import DocumentViewer from './components/DocumentViewer';
import testDataset from './data/test_dataset.json';

function App() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState(null);

  useEffect(() => {
    // Load test dataset
    setDocuments(testDataset.documents);
    if (testDataset.documents.length > 0) {
      setSelectedDocId(testDataset.documents[0].id);
    }
  }, []);

  const selectedDoc = documents.find(doc => doc.id === selectedDocId);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🏷️ AutoTags</h1>
          <p className="subtitle">Intelligent Document Tagging System</p>
        </div>
      </header>

      <div className="app-container">
        <div className="sidebar">
          <DocumentList
            documents={documents}
            selectedDocId={selectedDocId}
            onSelectDoc={setSelectedDocId}
          />
        </div>

        <div className="main-content">
          {selectedDoc ? (
            <DocumentViewer document={selectedDoc} />
          ) : (
            <div className="no-document">
              <p>Select a document to view details and tags</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
