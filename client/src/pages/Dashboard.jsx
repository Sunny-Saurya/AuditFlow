import React, { useState, useEffect, useRef } from 'react';
import { useAuth, UserButton } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../services/api';

const POPULAR_SYMBOLS = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.' },
  { symbol: 'META', name: 'Meta Platforms, Inc.' },
  { symbol: 'NFLX', name: 'Netflix, Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'ZOMATO', name: 'Zomato Limited' },
  { symbol: 'RELIANCE', name: 'Reliance Industries' },
  { symbol: 'TCS', name: 'Tata Consultancy Services' },
  { symbol: 'INFY', name: 'Infosys Limited' }
];

const Dashboard = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  
  const [symbol, setSymbol] = useState('');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(POPULAR_SYMBOLS);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);

  const stepsList = [
    { title: "Financial Data Gathering", desc: "Accessing Alpha Vantage APIs for ticker metrics..." },
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

  // Filter suggestions when symbol changes
  useEffect(() => {
    const term = symbol.trim();
    if (!term) {
      setFilteredSuggestions(POPULAR_SYMBOLS);
      setActiveIndex(-1);
      return;
    }
    const filtered = POPULAR_SYMBOLS.filter(
      item =>
        item.symbol.toLowerCase().includes(term.toLowerCase()) ||
        item.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setActiveIndex(-1);
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
    e.preventDefault();
    if (!symbol) return;
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      setAuthToken(token);
      const res = await api.post('/api/research', { symbol: symbol.trim() });
      setReports(prev => [res.data, ...prev]);
      setSymbol('');
      setLoading(false);
      // Automatically redirect to the details page of the newly generated report
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
          
          {/* Left Column: Control Panel */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
              <h2 className="text-2xl font-extrabold text-black tracking-tight">Run Research Node</h2>
              <p className="text-gray-500 text-xs font-medium leading-relaxed">
                Enter a global equity symbol (e.g. <code className="bg-neutral-100 px-1 py-0.5 rounded text-[11px] font-bold">AAPL</code>, <code className="bg-neutral-100 px-1 py-0.5 rounded text-[11px] font-bold">MSFT</code>, <code className="bg-neutral-100 px-1 py-0.5 rounded text-[11px] font-bold">TSLA</code>) to trigger our LangGraph state machine agent.
              </p>

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
                    placeholder="Ticker Symbol (e.g. AAPL)"
                    disabled={loading}
                    className="w-full bg-neutral-50/50 border border-gray-200/80 rounded-2xl px-5 py-4 text-sm font-extrabold tracking-wide focus:outline-none focus:border-black focus:bg-white transition-all uppercase placeholder-gray-400"
                  />
                  {showDropdown && filteredSuggestions.length > 0 && (
                    <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200/80 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto divide-y divide-neutral-100">
                      {filteredSuggestions.map((item, idx) => (
                        <div
                          key={item.symbol}
                          onClick={() => handleSelectSuggestion(item)}
                          className={`px-5 py-3.5 cursor-pointer transition-colors flex justify-between items-center ${
                            idx === activeIndex ? 'bg-neutral-100' : 'hover:bg-neutral-50'
                          }`}
                        >
                          <span className="font-extrabold text-sm text-black">{item.symbol}</span>
                          <span className="text-[11px] text-gray-400 font-bold">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || !symbol}
                  className="w-full bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 transition py-4 text-xs font-extrabold tracking-wider rounded-2xl shadow-sm uppercase flex items-center justify-center space-x-2"
                >
                  {loading ? 'ANALYZING...' : 'RUN RESEARCH AGENT'}
                </button>
              </form>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-2xl">
                  {error}
                </div>
              )}
            </div>

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

          {/* Right Column: Research History Ledger */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-extrabold text-black tracking-tight flex items-center justify-between">
              <span>Research History</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-neutral-100 px-3 py-1 rounded-full">{reports.length} Reports</span>
            </h2>

            {reports.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-200/40">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-sm font-extrabold text-neutral-800">No reports generated yet</div>
                <p className="text-xs text-gray-400 font-medium max-w-xs">
                  Run your first equity symbol lookup on the left panel to trigger the autonomous LangGraph researcher.
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

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
