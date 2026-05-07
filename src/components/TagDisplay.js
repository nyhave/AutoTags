import React, { useState } from 'react';
import './TagDisplay.css';

function TagDisplay({ document }) {
  const [removedTags, setRemovedTags] = useState([]);
  const [newTags, setNewTags] = useState([]);

  const activeTags = document.expected_tags.filter(tag => !removedTags.includes(tag));

  const handleRemoveTag = (tag) => {
    setRemovedTags([...removedTags, tag]);
  };

  const handleRestoreTag = (tag) => {
    setRemovedTags(removedTags.filter(t => t !== tag));
  };

  const handleAddTag = (tag) => {
    if (!activeTags.includes(tag) && !newTags.includes(tag)) {
      setNewTags([...newTags, tag]);
    }
  };

  const handleRemoveNewTag = (tag) => {
    setNewTags(newTags.filter(t => t !== tag));
  };

  const getConfidence = (tag) => {
    return document.confidence[tag] || 0;
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return '#27ae60'; // Green
    if (confidence >= 0.8) return '#f39c12'; // Orange
    return '#e74c3c'; // Red
  };

  const getCategoryEmoji = (tag) => {
    const categoryMap = {
      'Report': '📊',
      'Invoice': '💰',
      'Email': '📧',
      'Meeting Notes': '📝',
      'Contract': '📋',
      'Sales': '💼',
      'Engineering': '⚙️',
      'HR': '👥',
      'Finance': '💵',
      'Operations': '🏭',
      'Public': '🌐',
      'Internal': '🔒',
      'Confidential': '🔐',
      'Low': '⬇️',
      'Medium': '➡️',
      'High': '⬆️',
      'Urgent': '🚨',
      'Draft': '✏️',
      'Approved': '✅',
      'Completed': '🎯',
      'Pending Review': '⏳'
    };
    return categoryMap[tag] || '🏷️';
  };

  return (
    <div className="tag-display">
      <div className="tags-header">
        <h3>Proposed Tags</h3>
        <span className="tags-summary">{activeTags.length + newTags.length}</span>
      </div>

      <div className="tags-content">
        {/* Active Tags */}
        {activeTags.length > 0 && (
          <div className="tags-section">
            <div className="section-title">Model Suggestions</div>
            <div className="tags-list">
              {activeTags.map(tag => {
                const confidence = getConfidence(tag);
                const percentage = Math.round(confidence * 100);
                return (
                  <div key={tag} className="tag-item">
                    <div className="tag-content">
                      <span className="tag-emoji">{getCategoryEmoji(tag)}</span>
                      <div className="tag-info">
                        <div className="tag-name">{tag}</div>
                        <div className="confidence-bar">
                          <div
                            className="confidence-fill"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: getConfidenceColor(confidence)
                            }}
                          />
                          <span className="confidence-text">{percentage}%</span>
                        </div>
                      </div>
                    </div>
                    <button
                      className="tag-remove-btn"
                      onClick={() => handleRemoveTag(tag)}
                      title="Remove tag"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* New/Added Tags */}
        {newTags.length > 0 && (
          <div className="tags-section">
            <div className="section-title">Added Tags</div>
            <div className="tags-list">
              {newTags.map(tag => (
                <div key={tag} className="tag-item new-tag">
                  <div className="tag-content">
                    <span className="tag-emoji">{getCategoryEmoji(tag)}</span>
                    <div className="tag-info">
                      <div className="tag-name">{tag}</div>
                      <div className="tag-added">Manually added</div>
                    </div>
                  </div>
                  <button
                    className="tag-remove-btn"
                    onClick={() => handleRemoveNewTag(tag)}
                    title="Remove tag"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Removed Tags */}
        {removedTags.length > 0 && (
          <div className="tags-section">
            <div className="section-title">Removed Tags</div>
            <div className="tags-list">
              {removedTags.map(tag => (
                <div key={tag} className="tag-item removed-tag">
                  <div className="tag-content">
                    <span className="tag-emoji">{getCategoryEmoji(tag)}</span>
                    <div className="tag-info">
                      <div className="tag-name">{tag}</div>
                      <div className="tag-removed">Removed</div>
                    </div>
                  </div>
                  <button
                    className="tag-restore-btn"
                    onClick={() => handleRestoreTag(tag)}
                    title="Restore tag"
                  >
                    ↻
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="tags-footer">
        <button className="btn-primary">Save Changes</button>
        <button className="btn-secondary">Cancel</button>
      </div>
    </div>
  );
}

export default TagDisplay;
