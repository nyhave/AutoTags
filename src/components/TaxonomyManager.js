import React, { useState } from 'react';
import './TaxonomyManager.css';

function TaxonomyManager({ taxonomy, onTaxonomyChange }) {
  const [activeTab, setActiveTab] = useState('view');
  const [editMode, setEditMode] = useState(false);
  const [localTaxonomy, setLocalTaxonomy] = useState(taxonomy);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [uploadError, setUploadError] = useState('');

  const handleCategoryChange = (category, newName) => {
    setLocalTaxonomy(prev => {
      const updated = { ...prev };
      if (newName !== category && newName) {
        updated[newName] = updated[category];
        delete updated[category];
      }
      return updated;
    });
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !localTaxonomy[newCategory]) {
      setLocalTaxonomy(prev => ({
        ...prev,
        [newCategory]: []
      }));
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (category) => {
    setLocalTaxonomy(prev => {
      const updated = { ...prev };
      delete updated[category];
      return updated;
    });
    if (selectedCategory === category) {
      setSelectedCategory(null);
    }
  };

  const handleAddTag = (category) => {
    if (newTag.trim()) {
      setLocalTaxonomy(prev => ({
        ...prev,
        [category]: [...prev[category], newTag]
      }));
      setNewTag('');
    }
  };

  const handleDeleteTag = (category, tag) => {
    setLocalTaxonomy(prev => ({
      ...prev,
      [category]: prev[category].filter(t => t !== tag)
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        let parsed;

        if (file.name.endsWith('.json')) {
          parsed = JSON.parse(content);
          if (parsed.taxonomy) {
            setLocalTaxonomy(parsed.taxonomy);
          } else {
            setLocalTaxonomy(parsed);
          }
        } else if (file.name.endsWith('.csv')) {
          // Simple CSV parsing - one tag per line, categories separated by blank lines
          const lines = content.split('\n').map(l => l.trim()).filter(l => l);
          const newTax = {};
          let currentCategory = 'General';
          
          lines.forEach(line => {
            if (line.startsWith('#')) {
              currentCategory = line.slice(1).trim();
              newTax[currentCategory] = [];
            } else if (line) {
              if (!newTax[currentCategory]) newTax[currentCategory] = [];
              newTax[currentCategory].push(line);
            }
          });
          setLocalTaxonomy(newTax);
        }
        setUploadError('');
      } catch (err) {
        setUploadError(`Error parsing file: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  const handleSave = () => {
    onTaxonomyChange(localTaxonomy);
    setEditMode(false);
  };

  const handleCancel = () => {
    setLocalTaxonomy(taxonomy);
    setEditMode(false);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify({ taxonomy: localTaxonomy }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `taxonomy-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const getCategoryCount = () => Object.keys(localTaxonomy).length;
  const getTagCount = () => Object.values(localTaxonomy).reduce((sum, tags) => sum + tags.length, 0);

  return (
    <div className="taxonomy-manager">
      <div className="taxonomy-header">
        <h2>📚 Taxonomy Manager</h2>
        <div className="taxonomy-stats">
          <span className="stat">📂 {getCategoryCount()} categories</span>
          <span className="stat">🏷️ {getTagCount()} tags</span>
        </div>
      </div>

      <div className="taxonomy-tabs">
        <button
          className={`tab ${activeTab === 'view' ? 'active' : ''}`}
          onClick={() => setActiveTab('view')}
        >
          👁️ View
        </button>
        <button
          className={`tab ${activeTab === 'edit' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('edit');
            setEditMode(true);
          }}
        >
          ✏️ Edit
        </button>
        <button
          className={`tab ${activeTab === 'import' ? 'active' : ''}`}
          onClick={() => setActiveTab('import')}
        >
          ⬆️ Import
        </button>
      </div>

      <div className="taxonomy-content">
        {/* VIEW TAB */}
        {activeTab === 'view' && (
          <div className="tab-pane view-pane">
            <div className="taxonomy-grid">
              {Object.entries(localTaxonomy).map(([category, tags]) => (
                <div key={category} className="category-card">
                  <h3>{category}</h3>
                  <div className="tags-list">
                    {tags.length > 0 ? (
                      tags.map(tag => (
                        <span key={tag} className="tag-badge">
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="empty-message">No tags in this category</span>
                    )}
                  </div>
                  <div className="tag-count">{tags.length} tags</div>
                </div>
              ))}
            </div>
            {Object.keys(localTaxonomy).length === 0 && (
              <div className="empty-state">
                <p>No taxonomy defined yet. Click "Edit" to create one or "Import" to upload.</p>
              </div>
            )}
            <button className="btn-export" onClick={handleExport}>
              ⬇️ Export as JSON
            </button>
          </div>
        )}

        {/* EDIT TAB */}
        {activeTab === 'edit' && editMode && (
          <div className="tab-pane edit-pane">
            {/* Add New Category */}
            <div className="add-section">
              <h3>Add Category</h3>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Category name (e.g., Document Type)"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                />
                <button onClick={handleAddCategory} className="btn-add">
                  + Add Category
                </button>
              </div>
            </div>

            {/* Edit Categories */}
            <div className="categories-section">
              <h3>Categories & Tags</h3>
              {Object.entries(localTaxonomy).map(([category, tags]) => (
                <div key={category} className="category-editor">
                  <div className="category-header">
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => handleCategoryChange(category, e.target.value)}
                      className="category-name-input"
                    />
                    <button
                      onClick={() => handleDeleteCategory(category)}
                      className="btn-delete"
                    >
                      🗑️
                    </button>
                  </div>

                  <div className="tags-editor">
                    {tags.map(tag => (
                      <div key={tag} className="tag-editor-item">
                        <span className="tag-text">{tag}</span>
                        <button
                          onClick={() => handleDeleteTag(category, tag)}
                          className="btn-remove-tag"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    {selectedCategory === category && (
                      <div className="add-tag-input">
                        <input
                          type="text"
                          placeholder="New tag..."
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === 'Enter' && handleAddTag(category)
                          }
                          autoFocus
                        />
                        <button
                          onClick={() => handleAddTag(category)}
                          className="btn-add-tag"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>

                  {selectedCategory !== category && (
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className="btn-add-tag-section"
                    >
                      + Add Tag
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Save/Cancel Buttons */}
            <div className="edit-actions">
              <button onClick={handleSave} className="btn-save">
                💾 Save Taxonomy
              </button>
              <button onClick={handleCancel} className="btn-cancel">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* IMPORT TAB */}
        {activeTab === 'import' && (
          <div className="tab-pane import-pane">
            <div className="import-section">
              <h3>Import Taxonomy</h3>
              <div className="file-upload-area">
                <label htmlFor="tax-file-input" className="file-label">
                  <div className="file-icon">📁</div>
                  <p>Click to upload or drag and drop</p>
                  <p className="file-formats">JSON or CSV file</p>
                </label>
                <input
                  id="tax-file-input"
                  type="file"
                  accept=".json,.csv"
                  onChange={handleFileUpload}
                  className="file-input"
                />
              </div>

              {uploadError && (
                <div className="error-message">{uploadError}</div>
              )}

              <div className="format-guide">
                <h4>📋 File Format Guide</h4>

                <div className="format-example">
                  <h5>JSON Format:</h5>
                  <pre>{`{
  "document_type": ["Report", "Invoice", "Email"],
  "department": ["Sales", "HR", "Finance"],
  "priority": ["Low", "Medium", "High"]
}`}</pre>
                </div>

                <div className="format-example">
                  <h5>CSV Format:</h5>
                  <pre>{`#document_type
Report
Invoice
Email

#department
Sales
HR
Finance

#priority
Low
Medium
High`}</pre>
                </div>
              </div>

              <div className="import-actions">
                <button onClick={handleExport} className="btn-download-template">
                  ⬇️ Download Current as Template
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaxonomyManager;
