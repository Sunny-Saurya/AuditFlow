import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth, UserButton } from '@clerk/clerk-react';
import api, { setAuthToken, getAuthTokenSafe } from '../services/api';

// Confidence ring component
const ConfidenceGauge = ({ confidence, recommendation }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = (confidence / 100) * circumference;
  const color = confidence >= 70 ? '#22c55e' : confidence >= 40 ? '#f59e0b' : '#ef4444';
  const bgColor = confidence >= 70 ? 'bg-green-50' : confidence >= 40 ? 'bg-amber-50' : 'bg-red-50';
  const badgeColor = confidence >= 70
    ? 'bg-green-100 text-green-700 border-green-200'
    : confidence >= 40
      ? 'bg-amber-100 text-amber-700 border-amber-200'
      : 'bg-red-100 text-red-700 border-red-200';

  return (
    <div className={`${bgColor} rounded-3xl p-8 border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col items-center space-y-4`}>
      <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-500">Confidence Score</span>
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle
            cx="60" cy="60" r={radius} fill="none"
            stroke={color} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black" style={{ color }}>{confidence}%</span>
        </div>
      </div>
      <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border ${badgeColor}`}>
        {recommendation}
      </span>
    </div>
  );
};

// Price card component
const PriceCard = ({ priceData }) => {
  if (!priceData) return null;
  const isPositive = parseFloat(priceData.change) >= 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const changeBg = isPositive ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';

  // Day range progress bar
  const low = parseFloat(priceData.dayLow) || 0;
  const high = parseFloat(priceData.dayHigh) || 0;
  const current = parseFloat(priceData.price) || 0;
  const rangePercent = high > low ? ((current - low) / (high - low)) * 100 : 50;

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-500">Live Market Price</span>
        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${
          priceData.marketState === 'REGULAR' ? 'bg-green-50 text-green-600 border-green-200' :
          priceData.marketState === 'SIMULATED' ? 'bg-amber-50 text-amber-600 border-amber-200' :
          'bg-gray-50 text-gray-500 border-gray-200'
        }`}>
          {priceData.marketState === 'REGULAR' ? '● LIVE' : priceData.marketState === 'SIMULATED' ? '◉ SIMULATED' : priceData.marketState}
        </span>
      </div>

      <div className="flex items-end space-x-3">
        <span className="text-4xl font-black text-black tracking-tight">{priceData.currency} {priceData.price}</span>
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border text-xs font-bold ${changeBg}`}>
          <span className={changeColor}>{isPositive ? '▲' : '▼'}</span>
          <span className={changeColor}>{isPositive ? '+' : ''}{priceData.change} ({isPositive ? '+' : ''}{priceData.changePercent}%)</span>
        </div>
      </div>

      {/* Day Range */}
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold text-gray-400">
          <span>Day Low: {priceData.dayLow}</span>
          <span>Day High: {priceData.dayHigh}</span>
        </div>
        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-400 via-amber-400 to-green-400 rounded-full" style={{ width: '100%' }} />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full border-2 border-white shadow-md"
            style={{ left: `calc(${Math.max(2, Math.min(98, rangePercent))}% - 6px)` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-neutral-50 rounded-xl p-3 text-center">
          <div className="text-[9px] font-bold text-gray-400 uppercase">Prev Close</div>
          <div className="text-sm font-extrabold text-black">{priceData.previousClose}</div>
        </div>
        <div className="bg-neutral-50 rounded-xl p-3 text-center">
          <div className="text-[9px] font-bold text-gray-400 uppercase">Volume</div>
          <div className="text-sm font-extrabold text-black">{priceData.volume}</div>
        </div>
        <div className="bg-neutral-50 rounded-xl p-3 text-center">
          <div className="text-[9px] font-bold text-gray-400 uppercase">Exchange</div>
          <div className="text-sm font-extrabold text-black">{priceData.exchange}</div>
        </div>
      </div>
    </div>
  );
};

// Investment reasoning card
const ReasoningCard = ({ reasoning }) => {
  if (!reasoning) return null;

  const sections = [
    {
      title: 'Why Invest',
      items: reasoning.why || [],
      icon: (
        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-green-50',
      borderColor: 'border-green-100',
      dotColor: 'bg-green-500'
    },
    {
      title: 'When to Enter',
      items: reasoning.when || [],
      icon: (
        <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
      dotColor: 'bg-amber-500'
    },
    {
      title: 'Key Risks',
      items: reasoning.risks || [],
      icon: (
        <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100',
      dotColor: 'bg-red-500'
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
      <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-500">Investment Reasoning</span>
      
      {sections.map((section) => (
        section.items.length > 0 && (
          <div key={section.title} className={`${section.bgColor} rounded-2xl p-5 border ${section.borderColor} space-y-3`}>
            <div className="flex items-center space-x-2">
              {section.icon}
              <span className="text-xs font-extrabold text-black uppercase tracking-wider">{section.title}</span>
            </div>
            <div className="space-y-2.5">
              {section.items.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${section.dotColor} mt-1.5 shrink-0`} />
                  <p className="text-[11px] text-gray-700 font-medium leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

const ResearchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const isGuest = localStorage.getItem('auditflow_guest_mode') === 'true';

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportDetail = async () => {
      try {
        const token = await getAuthTokenSafe(getToken);
        setAuthToken(token);
        const res = await api.get(`/api/research/${id}`);
        setReport(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || 'Failed to load research report.');
        setLoading(false);
      }
    };

    fetchReportDetail();
  }, [id]);

  // Parse JSON fields safely
  const getPriceData = () => {
    try {
      return typeof report.currentPrice === 'string' ? JSON.parse(report.currentPrice) : report.currentPrice;
    } catch { return null; }
  };

  const getReasoning = () => {
    try {
      return typeof report.investmentReasoning === 'string' ? JSON.parse(report.investmentReasoning) : report.investmentReasoning;
    } catch { return null; }
  };

  // Clean custom markdown-like formatter
  const formatReportContent = (markdown) => {
    if (!markdown) return null;
    const lines = markdown.split('\n');
    let inTable = false;
    let tableHeaders = [];
    let tableRows = [];
    const elements = [];

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Check Table
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        inTable = true;
        const parts = trimmed.split('|').map(s => s.trim()).filter((s, i, arr) => i > 0 && i < arr.length - 1);
        
        if (trimmed.includes('---')) {
          return;
        }

        if (tableHeaders.length === 0) {
          tableHeaders = parts;
        } else {
          tableRows.push(parts);
        }
        return;
      } else if (inTable) {
        // Table closed
        elements.push(
          <div key={`table-${index}`} className="my-6 overflow-x-auto rounded-2xl border border-gray-200/60 shadow-sm bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-neutral-50">
                <tr>
                  {tableHeaders.map((h, i) => (
                    <th key={i} className="px-6 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/60 bg-white">
                {tableRows.map((row, ri) => (
                  <tr key={ri} className="hover:bg-neutral-50/50 transition">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-6 py-3.5 text-xs font-semibold text-gray-700 leading-relaxed">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        inTable = false;
        tableHeaders = [];
        tableRows = [];
      }

      if (trimmed.startsWith('# ')) {
        elements.push(<h1 key={index} className="text-2xl md:text-3xl font-extrabold text-black tracking-tight mt-8 mb-4 leading-tight">{trimmed.substring(2)}</h1>);
      } else if (trimmed.startsWith('## ')) {
        elements.push(<h2 key={index} className="text-lg md:text-xl font-extrabold text-black tracking-tight mt-8 mb-3 leading-tight border-b border-gray-200/60 pb-2">{trimmed.substring(3)}</h2>);
      } else if (trimmed.startsWith('### ')) {
        elements.push(<h3 key={index} className="text-sm md:text-base font-extrabold text-neutral-800 tracking-tight mt-6 mb-2 leading-tight">{trimmed.substring(4)}</h3>);
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        // Format bold prefix if exists in list like - **P/E Ratio**: value
        let content = trimmed.substring(2);
        const boldRegex = /\*\*(.*?)\*\*/g;
        const matches = [...content.matchAll(boldRegex)];
        let formattedContent = content;
        
        if (matches.length > 0) {
          formattedContent = content.replace(/\*\*(.*?)\*\*/g, '$1');
        }

        elements.push(
          <div key={index} className="flex items-start space-x-2.5 my-2.5 pl-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              {matches.length > 0 ? (
                <>
                  <span className="font-extrabold text-neutral-850">{matches[0][1]}</span>
                  {content.substring(matches[0][0].length + content.indexOf(matches[0][0]))}
                </>
              ) : formattedContent}
            </p>
          </div>
        );
      } else if (trimmed) {
        // Parse bold elements in standard paragraphs
        let content = trimmed;
        const boldRegex = /\*\*(.*?)\*\*/g;
        const matches = [...content.matchAll(boldRegex)];
        
        if (matches.length > 0) {
          elements.push(
            <p key={index} className="text-xs text-gray-600 font-medium leading-relaxed my-3">
              {content.split(/\*\*.*?\*\*/).map((segment, i) => (
                <React.Fragment key={i}>
                  {segment}
                  {matches[i] && <span className="font-extrabold text-black">{matches[i][1]}</span>}
                </React.Fragment>
              ))}
            </p>
          );
        } else {
          elements.push(<p key={index} className="text-xs text-gray-600 font-medium leading-relaxed my-3">{trimmed}</p>);
        }
      }
    });

    if (inTable && tableHeaders.length > 0) {
      elements.push(
        <div key="table-final" className="my-6 overflow-x-auto rounded-2xl border border-gray-200/60 shadow-sm bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-neutral-50">
              <tr>
                {tableHeaders.map((h, i) => (
                  <th key={i} className="px-6 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/60 bg-white">
              {tableRows.map((row, ri) => (
                <tr key={ri} className="hover:bg-neutral-50/50 transition">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-6 py-3.5 text-xs font-semibold text-gray-700 leading-relaxed">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return <div className="space-y-2">{elements}</div>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 rounded-full border-4 border-black border-t-transparent animate-spin mx-auto" />
          <span className="text-xs font-extrabold tracking-wider uppercase text-gray-400">Fetching report...</span>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 border border-red-200/60 shadow-lg text-center max-w-md space-y-4">
          <h3 className="text-lg font-extrabold text-red-650">Error Loading Details</h3>
          <p className="text-xs text-gray-500 font-medium">{error || 'Report not found or access denied.'}</p>
          <Link to="/dashboard" className="inline-block bg-black text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-850">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const priceData = getPriceData();
  const reasoning = getReasoning();

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans relative overflow-x-hidden selection:bg-amber-100 selection:text-black">
      
      {/* Background ambient glows */}
      <div className="absolute top-0 left-0 right-0 h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-amber-100/30 to-transparent blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-bl from-amber-100/20 to-transparent blur-[100px]" />
      </div>

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
            <Link to="/dashboard" className="text-xs font-semibold text-gray-400 hover:text-black transition-colors">Dashboard</Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isGuest ? (
              <div className="flex items-center space-x-3 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full">
                <span className="text-amber-800 text-[11px] font-black uppercase tracking-wider flex items-center">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse mr-1.5" />
                  Evaluator Mode
                </span>
                <button
                  onClick={() => {
                    localStorage.removeItem('auditflow_guest_mode');
                    navigate('/');
                  }}
                  className="text-[11px] font-extrabold text-gray-500 hover:text-red-600 transition pl-2 border-l border-amber-200"
                >
                  Exit Guest
                </button>
              </div>
            ) : (
              <UserButton afterSignOutUrl="/" />
            )}
          </div>
        </header>

        {/* Action Header */}
        <div className="py-6 flex items-center justify-between">
          <button 
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center space-x-2 text-xs font-bold text-gray-500 hover:text-black transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>BACK TO LEDGER</span>
          </button>
        </div>

        {/* Top Cards Row: Confidence + Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ConfidenceGauge 
            confidence={report.confidence || 0} 
            recommendation={report.recommendation || 'HOLD'} 
          />
          <div className="md:col-span-2">
            <PriceCard priceData={priceData} />
          </div>
        </div>

        {/* Investment Reasoning */}
        {reasoning && (
          <div className="mb-8">
            <ReasoningCard reasoning={reasoning} />
          </div>
        )}

        {/* Main Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-6">
          
          {/* Left Column: Report Contents */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 md:p-12 border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            {formatReportContent(report.markdownReport)}
          </div>

          {/* Right Column: Visual Audit Trail */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
              <h3 className="text-sm font-extrabold text-black uppercase tracking-wider mb-6 flex items-center justify-between">
                <span>Visual Audit Trail</span>
                <span className="text-[9px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-bold uppercase">Traceable</span>
              </h3>

              {/* Vertical Audit Trail Timeline */}
              <div className="relative border-l border-gray-200/60 ml-3 space-y-8 pb-4">
                {report.auditTrail?.map((step, idx) => (
                  <div key={step._id || idx} className="relative pl-6">
                    {/* Circle Pin Icon */}
                    <div className="absolute -left-[9px] top-1 w-4.5 h-4.5 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className="text-xs font-extrabold text-black leading-tight">{step.title}</span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {new Date(step.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                      <p className="text-[11px] text-gray-500 font-medium leading-relaxed pt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ResearchDetail;
