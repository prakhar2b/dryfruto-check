import React, { useState, useEffect, useRef } from 'react';
import { Download, Upload, Trash2, History, FileJson, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DataManager = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/data-history`);
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
      showMessage('Error fetching history', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const response = await axios.get(`${API}/export-data`);
      
      // Create and download the file
      const blob = new Blob([JSON.stringify(response.data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dryfruto_data_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      showMessage('Data exported successfully!', 'success');
      fetchHistory();
    } catch (error) {
      console.error('Error exporting data:', error);
      showMessage('Error exporting data', 'error');
    } finally {
      setExporting(false);
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.json')) {
      showMessage('Please select a JSON file', 'error');
      return;
    }

    try {
      setImporting(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${API}/import-data`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const changes = response.data.changes;
      const summary = [];
      
      if (changes.categories.added > 0 || changes.categories.updated > 0) {
        summary.push(`Categories: ${changes.categories.added} added, ${changes.categories.updated} updated`);
      }
      if (changes.products.added > 0 || changes.products.updated > 0) {
        summary.push(`Products: ${changes.products.added} added, ${changes.products.updated} updated`);
      }
      if (changes.heroSlides.added > 0 || changes.heroSlides.updated > 0) {
        summary.push(`Hero Slides: ${changes.heroSlides.added} added, ${changes.heroSlides.updated} updated`);
      }
      if (changes.testimonials.added > 0 || changes.testimonials.updated > 0) {
        summary.push(`Testimonials: ${changes.testimonials.added} added, ${changes.testimonials.updated} updated`);
      }
      if (changes.giftBoxes.added > 0 || changes.giftBoxes.updated > 0) {
        summary.push(`Gift Boxes: ${changes.giftBoxes.added} added, ${changes.giftBoxes.updated} updated`);
      }
      if (changes.siteSettings.updated) {
        summary.push('Site Settings updated');
      }

      showMessage(`Import successful!\n${summary.join('\n')}`, 'success');
      fetchHistory();
    } catch (error) {
      console.error('Error importing data:', error);
      showMessage(error.response?.data?.detail || 'Error importing data', 'error');
    } finally {
      setImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteRecord = async (recordId) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    try {
      await axios.delete(`${API}/data-history/${recordId}`);
      showMessage('Record deleted successfully', 'success');
      fetchHistory();
    } catch (error) {
      console.error('Error deleting record:', error);
      showMessage('Error deleting record', 'error');
    }
  };

  const handleClearHistory = async () => {
    if (!window.confirm('Are you sure you want to clear all history? This cannot be undone.')) return;

    try {
      await axios.delete(`${API}/data-history`);
      showMessage('History cleared successfully', 'success');
      fetchHistory();
    } catch (error) {
      console.error('Error clearing history:', error);
      showMessage('Error clearing history', 'error');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActionBadge = (action) => {
    const badges = {
      'export': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Export' },
      'import': { bg: 'bg-green-100', text: 'text-green-800', label: 'Import' },
      'seed': { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Seed' }
    };
    const badge = badges[action] || { bg: 'bg-gray-100', text: 'text-gray-800', label: action };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  const formatSummary = (summary) => {
    if (!summary) return '-';
    
    if (typeof summary === 'object') {
      const parts = [];
      if (summary.categories !== undefined) {
        if (typeof summary.categories === 'number') {
          parts.push(`${summary.categories} categories`);
        } else {
          parts.push(`Categories: +${summary.categories.added || 0}, ~${summary.categories.updated || 0}`);
        }
      }
      if (summary.products !== undefined) {
        if (typeof summary.products === 'number') {
          parts.push(`${summary.products} products`);
        } else {
          parts.push(`Products: +${summary.products.added || 0}, ~${summary.products.updated || 0}`);
        }
      }
      if (summary.heroSlides !== undefined) {
        if (typeof summary.heroSlides === 'number') {
          parts.push(`${summary.heroSlides} slides`);
        }
      }
      if (summary.testimonials !== undefined) {
        if (typeof summary.testimonials === 'number') {
          parts.push(`${summary.testimonials} testimonials`);
        }
      }
      if (summary.giftBoxes !== undefined) {
        if (typeof summary.giftBoxes === 'number') {
          parts.push(`${summary.giftBoxes} gift boxes`);
        }
      }
      return parts.join(', ') || '-';
    }
    return String(summary);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Data Manager</h1>
        <p className="text-gray-600">Export, import, and manage your store data</p>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          )}
          <pre className="whitespace-pre-wrap text-sm">{message.text}</pre>
        </div>
      )}

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Export Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Export Data</h2>
              <p className="text-sm text-gray-500">Download all store data as JSON</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Export all products (with price variations), categories, hero slides, testimonials, 
            gift boxes, and site settings to a JSON file.
          </p>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {exporting ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download Data
              </>
            )}
          </button>
        </div>

        {/* Import Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Upload className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Import Data</h2>
              <p className="text-sm text-gray-500">Upload JSON file to update data</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Import data from a JSON file. Existing items will be updated by ID, 
            new items will be added. All fields including price variations are supported.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
            id="import-file"
          />
          <label
            htmlFor="import-file"
            className={`w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              importing ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            {importing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Upload JSON File
              </>
            )}
          </label>
        </div>
      </div>

      {/* Data Format Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <FileJson className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800 mb-2">JSON File Format</h3>
            <p className="text-amber-700 text-sm mb-3">
              The export/import file includes all data with the following structure:
            </p>
            <pre className="bg-amber-100 p-3 rounded-lg text-xs text-amber-900 overflow-x-auto">
{`{
  "exportDate": "2025-01-01T00:00:00Z",
  "version": "1.0",
  "categories": [...],
  "products": [
    {
      "id": "prod-001",
      "name": "Product Name",
      "basePrice": 100,
      "priceVariants": {
        "250g": 100,
        "500g": 180,
        "1kg": 350
      },
      ...
    }
  ],
  "heroSlides": [...],
  "testimonials": [...],
  "giftBoxes": [...],
  "siteSettings": {...}
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Change History */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <History className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Change History</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchHistory}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            {history.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
            Loading history...
          </div>
        ) : history.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <History className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p>No change history yet</p>
            <p className="text-sm">Export or import data to see history here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Summary
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {history.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(record.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getActionBadge(record.action)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {record.filename || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {formatSummary(record.summary)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDeleteRecord(record.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataManager;
