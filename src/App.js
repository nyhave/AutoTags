import React, { useState, useEffect } from 'react';
import './App.css';
import DocumentList from './components/DocumentList';
import DocumentViewer from './components/DocumentViewer';
import TaxonomyManager from './components/TaxonomyManager';
import testDataset from './data/test_dataset.json';

function App() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [taxonomy, setTaxonomy] = useState({});
  const [view, setView] = useState('documents'); // 'documents' or 'taxonomy'

  useEffect(() => {
    // Load test dataset
    setDocuments(testDataset.documents);
    setTaxonomy(testDataset.taxonomy);
    if (testDataset.documents.length > 0) {
      setSelectedDocId(testDataset.documents[0].id);
    }
  }, []);

  const selectedDoc = documents.find(doc => doc.id === selectedDocId);

  const handleTaxonomyChange = (newTaxonomy) => {
    setTaxonomy(newTaxonomy);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🏷️ AutoTags</h1>
          <p className="subtitle">Intelligent Document Tagging System</p>
        </div>
        <nav className="header-nav">
          <button
            className={`nav-btn ${view === 'documents' ? 'active' : ''}`}
            onClick={() => setView('documents')}
          >
            📄 Documents
          </button>
          <button
            className={`nav-btn ${view === 'taxonomy' ? 'active' : ''}`}
            onClick={() => setView('taxonomy')}
          >
            📚 Taxonomy
          </button>
        </nav>
      </header>

      <div className="app-container">
        {view === 'documents' ? (
          <>
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
          </>
        ) : (
          <div className="full-width-view">
            <TaxonomyManager 
              taxonomy={taxonomy}
              onTaxonomyChange={handleTaxonomyChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
