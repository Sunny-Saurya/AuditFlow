import React, { useState, useEffect, useRef } from 'react';
import { useAuth, UserButton } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../services/api';
import { STOCKS_DATABASE } from '../services/stocksDatabase';

const Dashboard = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  
  const [symbol, setSymbol] = useState('');
  const [selectedStockPreview, setSelectedStockPreview] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(STOCKS_DATABASE.slice(0, 15));
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);

  // Tab state between Research Reports and Stock Directory
  const [activeTab, setActiveTab] = useState('reports'); // 'reports' or 'directory'
  const [directoryFilter, setDirectoryFilter] = useState('ALL'); // 'ALL', 'US', 'NSE'

  const stepsList = [
    { title: "Financial Data Gathering", desc: "Accessing Alpha Vantage APIs & Quantitative Engines..." },
    { title: "News & Web Scanning", desc: "Running Tavily Search nodes to read latest articles..." },
    { title: "Report Compilation", desc: "Invoking LangChain GPT-4o synthesis and valuation model..." },
    { title: "Audit Trail Finalization", desc: "Writing execution logs and validating decision metrics..." }
  ];

  // Fetch past reports
  const fetchReports = async () => {
    try {
      const token = await getToken();
      setAuthToken(token);
      const res = await api.get('/api/research');
      setReports(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch research history.');
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Filter suggestions and measure stock when symbol changes
  useEffect(() => {
    const term = symbol.trim().toLowerCase();
    if (!term) {
      setFilteredSuggestions(STOCKS_DATABASE.slice(0, 15));
      setActiveIndex(-1);
      setSelectedStockPreview(null);
      return;
    }

    const filtered = STOCKS_DATABASE.filter(
      item =>
        item.symbol.toLowerCase().includes(term) ||
        item.name.toLowerCase().includes(term) ||
        item.sector.toLowerCase().includes(term)
    );
    setFilteredSuggestions(filtered);
    setActiveIndex(-1);

    // Instant measurement & analysis if exact or close match found
    const exactMatch = STOCKS_DATABASE.find(
      item => item.symbol.toLowerCase() === term || item.name.toLowerCase() === term
    ) || filtered[0];

    if (exactMatch) {
      setSelectedStockPreview(exactMatch);
    } else {
      setSelectedStockPreview(null);
    }
  }, [symbol]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectSuggestion = (item) => {
    setSymbol(item.symbol);
    setSelectedStockPreview(item);
    setShowDropdown(false);
  };

  const handleKeyDown = (e) => {
    if (!showDropdown || filteredSuggestions.length === 0) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % filteredSuggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length);
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < filteredSuggestions.length) {
        e.preventDefault();
        handleSelectSuggestion(filteredSuggestions[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  // Handle agent loading simulation logs
  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < stepsList.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 2500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleRunResearch = async (e) => {
    e?.preventDefault();
    if (!symbol) return;
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      setAuthToken(token);
      const res = await api.post('/api/research', { symbol: symbol.trim() });
      setReports(prev => [res.data, ...prev]);
      setSymbol('');
      setSelectedStockPreview(null);
      setLoading(false);
      navigate(`/research/${res.data._id}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'An error occurred during analysis.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans relative overflow-x-hidden selection:bg-amber-100 selection:text-black">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 left-0 right-0 h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-amber-100/30 to-transparent blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-bl from-amber-100/20 to-transparent blur-[100px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #111 1px, transparent 1px),
            linear-gradient(to bottom, #111 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="flex items-center justify-between py-4 border-b border-gray-200/40">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-gray-200/60 flex items-center justify-center p-1.5 transition-all duration-300 group-hover:shadow group-hover:scale-105">
              <svg className="w-full h-full text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-extrabold tracking-tight text-lg text-gray-900">auditflow</span>
          </Link>

          <nav className="flex items-center space-x-8">
            <Link to="/" className="text-xs font-semibold text-gray-400 hover:text-black transition-colors">Home</Link>
            <Link to="/about" className="text-xs font-semibold text-gray-400 hover:text-black transition-colors">About us</Link>
            <span className="text-xs font-semibold text-black border-b-2 border-black pb-1">Dashboard</span>
          </nav>

          <div className="flex items-center space-x-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {/* Dashboard Main Content */}
        <main className="flex-grow py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Control Panel & Live Measurement */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
              <div>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider">Live Stock Analyzer</span>
                <h2 className="text-2xl font-extrabold text-black tracking-tight mt-2">Run Research Node</h2>
                <p className="text-gray-500 text-xs font-medium leading-relaxed mt-1">
                  Type any character (e.g. <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-[11px] font-bold text-black">A</code>, <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-[11px] font-bold text-black">T</code>, <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-[11px] font-bold text-black">RELIANCE</code>) to instantly measure, analyze, and inspect listed stocks across US & India markets.
                </p>
              </div>

              <form onSubmit={handleRunResearch} className="space-y-4">
                <div className="relative" ref={containerRef}>
                  <input
                    type="text"
                    value={symbol}
                    onChange={(e) => {
                      setSymbol(e.target.value.toUpperCase());
                      setShowDropdown(true);
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowDropdown(true)}
                    placeholder="Type symbol or name (e.g. A, AAPL, ADANI...)"
                    disabled={loading}
                    className="w-full bg-neutral-50/50 border border-gray-200/80 rounded-2xl px-5 py-4 text-sm font-extrabold tracking-wide focus:outline-none focus:border-black focus:bg-white transition-all uppercase placeholder-gray-400"
                  />
                  {showDropdown && filteredSuggestions.length > 0 && (
                    <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200/80 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto divide-y divide-neutral-100">
                      <div className="px-4 py-2 bg-neutral-50 border-b border-neutral-100 flex justify-between items-center sticky top-0 z-10 text-[10px] font-black text-gray-500 uppercase tracking-wider">
                        <span>Matching Listed Stocks ({filteredSuggestions.length})</span>
                        <span>Instant Measurement</span>
                      </div>
                      {filteredSuggestions.map((item, idx) => (
                        <div
                          key={item.symbol}
                          onClick={() => handleSelectSuggestion(item)}
                          className={`p-4 cursor-pointer transition-colors flex flex-col space-y-1.5 ${
                            idx === activeIndex ? 'bg-amber-50/70 border-l-4 border-amber-500' : 'hover:bg-neutral-50'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <span className="font-black text-xs text-white bg-black px-2.5 py-1 rounded-lg tracking-wider">{item.symbol}</span>
                              <span className="font-extrabold text-xs text-neutral-900">{item.name}</span>
                            </div>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              item.rating.includes('Buy') ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {item.rating} ● {item.qualityScore}/100
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold">
                            <span className="bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded text-[10px]">{item.exchange} | {item.sector}</span>
                            <span>P/E: <strong className="text-black">{item.pe}</strong> • Mkt Cap: <strong className="text-black">{item.marketCap}</strong></span>
                          </div>
                          <p className="text-[10px] text-gray-400 font-medium line-clamp-1 italic">
                            {item.analysisSnapshot}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || !symbol}
                  className="w-full bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 transition py-4 text-xs font-extrabold tracking-wider rounded-2xl shadow-sm uppercase flex items-center justify-center space-x-2 group"
                >
                  <span>{loading ? 'ANALYZING IN PROGRESS...' : 'RUN DEEP AGENT RESEARCH'}</span>
                  {!loading && symbol && (
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </button>
              </form>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-2xl">
                  {error}
                </div>
              )}
            </div>

            {/* Instant Live Stock Measurement & Analysis Card right below search box */}
            {selectedStockPreview && !loading && (
              <div className="bg-gradient-to-br from-white via-amber-50/20 to-white rounded-3xl p-8 border border-amber-200/60 shadow-lg space-y-5 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-700">Instant Measurement & Analysis</span>
                  </div>
                  <span className="bg-black text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">{selectedStockPreview.exchange}</span>
                </div>

                <div>
                  <div className="flex items-baseline space-x-2">
                    <h3 className="text-2xl font-black text-black tracking-tight">{selectedStockPreview.symbol}</h3>
                    <span className="text-sm font-extrabold text-gray-500">{selectedStockPreview.name}</span>
                  </div>
                  <span className="inline-block text-[11px] font-bold text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full mt-1.5">{selectedStockPreview.sector}</span>
                </div>

                {/* Quantitative Measurement Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/80 border border-gray-200/60 rounded-2xl p-3.5 text-center shadow-sm">
                    <div className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">Quality Score</div>
                    <div className="text-xl font-black text-black mt-0.5">{selectedStockPreview.qualityScore}<span className="text-xs text-gray-400">/100</span></div>
                  </div>
                  <div className="bg-white/80 border border-gray-200/60 rounded-2xl p-3.5 text-center shadow-sm">
                    <div className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">Est. P/E Ratio</div>
                    <div className="text-xl font-black text-black mt-0.5">{selectedStockPreview.pe}</div>
                  </div>
                  <div className="bg-white/80 border border-gray-200/60 rounded-2xl p-3.5 text-center shadow-sm">
                    <div className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">Market Cap</div>
                    <div className="text-lg font-black text-black mt-0.5 truncate">{selectedStockPreview.marketCap}</div>
                  </div>
                </div>

                {/* Qualitative Snapshot Analysis */}
                <div className="bg-white/90 border border-gray-200/60 rounded-2xl p-4 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Initial Analyst Assessment</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      selectedStockPreview.rating.includes('Buy') ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {selectedStockPreview.rating}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed">
                    {selectedStockPreview.analysisSnapshot}
                  </p>
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => handleRunResearch()}
                    className="w-full bg-neutral-900 hover:bg-black text-white py-3 text-xs font-black tracking-wider rounded-xl uppercase transition shadow-md flex items-center justify-center space-x-2"
                  >
                    <span>Generate Complete LangGraph Audit Report ({selectedStockPreview.symbol})</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Agent Live Progress Monitor (visible during loading) */}
            {loading && (
              <div className="bg-white rounded-3xl p-8 border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold tracking-wider text-amber-600 uppercase">Agent Status</span>
                  <div className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>

                {/* Progress Logs */}
                <div className="space-y-4">
                  {stepsList.map((step, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-start space-x-3 transition-opacity duration-300 ${
                        idx <= loadingStep ? 'opacity-100' : 'opacity-20'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold ${
                        idx < loadingStep 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : idx === loadingStep 
                            ? 'bg-amber-100 text-amber-700 border border-amber-200 animate-pulse' 
                            : 'bg-neutral-100 text-neutral-400 border border-neutral-200/40'
                      }`}>
                        {idx < loadingStep ? '✓' : idx + 1}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-extrabold text-neutral-800 leading-tight">{step.title}</span>
                        <span className="text-[10px] text-gray-400 font-medium leading-relaxed">{step.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Research History Ledger & Stock Directory Tabs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tab Header */}
            <div className="flex items-center justify-between border-b border-gray-200/60 pb-4">
              <div className="flex space-x-6">
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`text-sm font-extrabold pb-4 -mb-4 border-b-2 transition-all ${
                    activeTab === 'reports'
                      ? 'text-black border-black'
                      : 'text-gray-400 border-transparent hover:text-black'
                  }`}
                >
                  Research History ({reports.length})
                </button>
                <button
                  onClick={() => setActiveTab('directory')}
                  className={`text-sm font-extrabold pb-4 -mb-4 border-b-2 transition-all flex items-center space-x-2 ${
                    activeTab === 'directory'
                      ? 'text-black border-black'
                      : 'text-gray-400 border-transparent hover:text-black'
                  }`}
                >
                  <span>Listed Stocks & Measurement</span>
                  <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-black">{STOCKS_DATABASE.length}+</span>
                </button>
              </div>

              {activeTab === 'directory' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setDirectoryFilter('ALL')}
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase transition ${
                      directoryFilter === 'ALL' ? 'bg-black text-white' : 'bg-neutral-100 text-gray-500 hover:bg-neutral-200'
                    }`}
                  >
                    All Markets
                  </button>
                  <button
                    onClick={() => setDirectoryFilter('US')}
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase transition ${
                      directoryFilter === 'US' ? 'bg-black text-white' : 'bg-neutral-100 text-gray-500 hover:bg-neutral-200'
                    }`}
                  >
                    US (NYSE/NASDAQ)
                  </button>
                  <button
                    onClick={() => setDirectoryFilter('NSE')}
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase transition ${
                      directoryFilter === 'NSE' ? 'bg-black text-white' : 'bg-neutral-100 text-gray-500 hover:bg-neutral-200'
                    }`}
                  >
                    India (NSE)
                  </button>
                </div>
              )}
            </div>

            {/* TAB 1: Research Reports */}
            {activeTab === 'reports' && (
              <div>
                {reports.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] text-center flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-200/40">
                      <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="text-sm font-extrabold text-neutral-800">No reports generated yet</div>
                    <p className="text-xs text-gray-400 font-medium max-w-xs">
                      Run your first equity symbol lookup on the left panel or click any stock from our listed stocks directory.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {reports.map((report) => (
                      <Link 
                        key={report._id} 
                        to={`/research/${report._id}`}
                        className="group bg-white rounded-3xl p-6 border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-md hover:border-neutral-300 transition-all duration-300 flex justify-between items-center"
                      >
                        <div className="space-y-2 flex-grow pr-4">
                          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                            <span className="text-xs font-black tracking-wider text-black bg-neutral-100 px-2 py-1 rounded-md">{report.symbol}</span>
                            <h4 className="text-sm font-extrabold text-neutral-850 group-hover:text-black transition-colors">{report.companyName}</h4>
                            {report.confidence > 0 && (
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                report.confidence >= 70 
                                  ? 'bg-green-50 text-green-700 border-green-200' 
                                  : report.confidence >= 40 
                                    ? 'bg-amber-50 text-amber-700 border-amber-200' 
                                    : 'bg-red-50 text-red-700 border-red-200'
                              }`}>
                                {report.confidence}% {report.recommendation}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 font-medium line-clamp-2 leading-relaxed">
                            {report.summary}
                          </p>
                          <div className="text-[10px] text-gray-400 font-medium">
                            {new Date(report.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>

                        <div className="w-8 h-8 rounded-full bg-neutral-50 group-hover:bg-black flex items-center justify-center transition-all">
                          <svg className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Listed Stocks & Instant Measurement Directory */}
            {activeTab === 'directory' && (
              <div className="bg-white rounded-3xl p-6 border border-gray-200/50 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-xs font-black text-gray-500 uppercase tracking-wider">
                    {directoryFilter === 'ALL' ? 'Global & Indian Equities' : directoryFilter === 'US' ? 'US Equities (NYSE/NASDAQ)' : 'Indian Equities (NSE)'}
                  </span>
                  <span className="text-xs font-bold text-gray-400">Click any stock to measure instantly</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[650px] overflow-y-auto pr-1">
                  {STOCKS_DATABASE
                    .filter(s => directoryFilter === 'ALL' || (directoryFilter === 'US' && ['NASDAQ', 'NYSE'].includes(s.exchange)) || (directoryFilter === 'NSE' && s.exchange === 'NSE'))
                    .map((item) => (
                    <div
                      key={item.symbol}
                      onClick={() => {
                        setSymbol(item.symbol);
                        setSelectedStockPreview(item);
                        window.scrollTo({ top: 100, behavior: 'smooth' });
                      }}
                      className="p-4 rounded-2xl border border-gray-100 hover:border-black/30 hover:bg-neutral-50/80 transition cursor-pointer flex flex-col justify-between space-y-2 group"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-2">
                          <span className="font-black text-xs text-white bg-neutral-900 group-hover:bg-black px-2 py-1 rounded-md">{item.symbol}</span>
                          <span className="font-extrabold text-xs text-neutral-900 group-hover:text-black line-clamp-1">{item.name}</span>
                        </div>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${
                          item.rating.includes('Buy') ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {item.qualityScore}/100
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-gray-500 font-bold">
                        <span className="bg-neutral-100 px-2 py-0.5 rounded text-[10px] text-gray-600">{item.sector}</span>
                        <span>P/E: <strong className="text-black">{item.pe}</strong> | Mkt Cap: <strong className="text-black">{item.marketCap}</strong></span>
                      </div>

                      <p className="text-[10px] text-gray-400 font-medium line-clamp-2 italic">
                        {item.analysisSnapshot}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
