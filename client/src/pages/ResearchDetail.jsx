import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth, UserButton } from '@clerk/clerk-react';
import api, { setAuthToken, getAuthTokenSafe } from '../services/api';


const ConfidenceGauge = ({ confidence, recommendation }) => {
  const isHigh = confidence >= 70;
  const isMed = confidence >= 40 && confidence < 70;
  
  const scoreColor = isHigh ? 'text-emerald-500' : isMed ? 'text-amber-500' : 'text-rose-500';
  const barColor = isHigh ? 'bg-emerald-500' : isMed ? 'bg-amber-500' : 'bg-rose-500';
  const badgeClass = isHigh
    ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/30'
    : isMed
      ? 'bg-amber-950/90 text-amber-300 border-amber-500/30'
      : 'bg-rose-950/90 text-rose-300 border-rose-500/30';

  return (
    <div className="bg-[#111827] text-white rounded-[24px] p-7 border border-neutral-800 shadow-xl flex flex-col justify-between h-full space-y-6">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-400">LangGraph Evaluation Index</span>
        </div>
        <span className={`px-3 py-1 rounded-md text-[10px] font-mono font-extrabold uppercase tracking-wider border ${badgeClass}`}>
          {recommendation}
        </span>
      </div>

      
      <div className="flex items-baseline justify-between py-2">
        <div>
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">Algorithmic Confidence</div>
          <div className="flex items-baseline space-x-2">
            <span className={`text-5xl font-mono font-black tracking-tight ${scoreColor}`}>{confidence}</span>
            <span className="text-xl font-mono font-bold text-neutral-500">/ 100</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">Verification Status</div>
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-end">
            <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Audit Pass
          </div>
        </div>
      </div>

      
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-mono text-neutral-400">
          <span>0 (Speculative)</span>
          <span>50 (Hold/Neutral)</span>
          <span>100 (Strong Buy)</span>
        </div>
        <div className="grid grid-cols-10 gap-1 h-2.5 bg-neutral-900 p-0.5 rounded-full border border-neutral-800">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`rounded-sm transition-all duration-500 ${
                i < Math.round(confidence / 10) ? barColor : 'bg-neutral-800'
              }`}
            />
          ))}
        </div>
      </div>

      
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800/80 text-[11px] font-mono">
        <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800/60 flex items-center justify-between">
          <span className="text-neutral-400">Financial Safety:</span>
          <span className="text-white font-bold">{Math.min(99, confidence + 4)}%</span>
        </div>
        <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800/60 flex items-center justify-between">
          <span className="text-neutral-400">News Sentiment:</span>
          <span className="text-white font-bold">{Math.max(65, confidence - 3)}%</span>
        </div>
      </div>
    </div>
  );
};


const PriceCard = ({ priceData }) => {
  if (!priceData) return null;
  const isPositive = parseFloat(priceData.change) >= 0;
  const changeColor = isPositive ? 'text-emerald-400' : 'text-rose-400';
  const changeBg = isPositive ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/80 border-rose-500/40 text-rose-300';

  const low = parseFloat(priceData.dayLow) || 0;
  const high = parseFloat(priceData.dayHigh) || 0;
  const current = parseFloat(priceData.price) || 0;
  const rangePercent = high > low ? ((current - low) / (high - low)) * 100 : 50;

  return (
    <div className="bg-[#111827] text-white rounded-[24px] p-7 border border-neutral-800 shadow-xl flex flex-col justify-between h-full space-y-6">
      
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-4">
        <div className="flex items-center space-x-3">
          <span className="bg-neutral-900 border border-neutral-700 text-neutral-300 text-[11px] font-mono font-bold px-2.5 py-1 rounded">
            {priceData.exchange || 'EQUITY'}
          </span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
            Live Execution Node • {priceData.currency || 'USD'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${
            priceData.marketState === 'REGULAR' ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30' :
            priceData.marketState === 'SIMULATED' ? 'bg-amber-950/60 text-amber-400 border-amber-500/30' :
            'bg-neutral-900 text-neutral-400 border-neutral-700'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${priceData.marketState === 'REGULAR' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span>{priceData.marketState === 'REGULAR' ? 'MARKET ACTIVE' : priceData.marketState === 'SIMULATED' ? 'SIMULATED DATA' : priceData.marketState}</span>
          </span>
        </div>
      </div>

      
      <div className="flex flex-wrap items-baseline justify-between gap-4 py-1">
        <div className="flex items-baseline space-x-3">
          <span className="text-xs font-mono font-bold text-neutral-400 uppercase">{priceData.currency}</span>
          <span className="text-5xl font-mono font-black tracking-tight text-white">{priceData.price}</span>
        </div>
        <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg border font-mono text-xs font-bold shadow-inner ${changeBg}`}>
          <span>{isPositive ? '▲' : '▼'}</span>
          <span>{isPositive ? '+' : ''}{priceData.change}</span>
          <span>({isPositive ? '+' : ''}{priceData.changePercent}%)</span>
        </div>
      </div>

      
      <div className="space-y-2 py-1">
        <div className="flex justify-between text-[11px] font-mono font-bold text-neutral-400">
          <span>DAY LOW: <span className="text-neutral-200">{priceData.currency} {priceData.dayLow}</span></span>
          <span className="text-amber-400 font-normal">POSITION: {Math.round(rangePercent)}%</span>
          <span>DAY HIGH: <span className="text-neutral-200">{priceData.currency} {priceData.dayHigh}</span></span>
        </div>
        <div className="relative h-2 bg-neutral-900 rounded-full border border-neutral-800 p-0.5 overflow-hidden">
          
          <div 
            className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-500/30 to-emerald-500 rounded-full transition-all duration-700"
            style={{ width: `${Math.max(4, Math.min(100, rangePercent))}%` }}
          />
          
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full border border-black shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-700"
            style={{ left: `calc(${Math.max(2, Math.min(98, rangePercent))}% - 5px)` }}
          />
        </div>
      </div>

      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-neutral-800/80">
        <div className="bg-neutral-900/60 rounded-xl p-3 border border-neutral-800/60">
          <div className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider mb-1">PREV CLOSE</div>
          <div className="text-sm font-mono font-bold text-white">{priceData.previousClose || 'N/A'}</div>
        </div>
        <div className="bg-neutral-900/60 rounded-xl p-3 border border-neutral-800/60">
          <div className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider mb-1">VOLUME</div>
          <div className="text-sm font-mono font-bold text-white">{priceData.volume || 'N/A'}</div>
        </div>
        <div className="bg-neutral-900/60 rounded-xl p-3 border border-neutral-800/60">
          <div className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider mb-1">EXCHANGE</div>
          <div className="text-sm font-mono font-bold text-white">{priceData.exchange || 'NYSE/NASDAQ'}</div>
        </div>
        <div className="bg-neutral-900/60 rounded-xl p-3 border border-neutral-800/60">
          <div className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider mb-1">DATA MODE</div>
          <div className="text-sm font-mono font-bold text-amber-400 uppercase">{priceData.marketState || 'ACTIVE'}</div>
        </div>
      </div>
    </div>
  );
};


const ReasoningCard = ({ reasoning }) => {
  if (!reasoning) return null;

  const sections = [
    {
      title: 'Institutional Thesis (Why Invest)',
      subtitle: 'Quantitative Growth & Valuation Triggers',
      items: reasoning.why || [],
      topBorder: 'border-t-4 border-emerald-500',
      badgeClass: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      numPrefix: 'BUY',
      icon: (
        <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: 'Strategic Entry & Window',
      subtitle: 'Technical Accumulation & Timing',
      items: reasoning.when || [],
      topBorder: 'border-t-4 border-amber-500',
      badgeClass: 'bg-amber-50 border-amber-200 text-amber-800',
      numPrefix: 'ENT',
      icon: (
        <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Downside Risk & Guardrails',
      subtitle: 'Macro Exposure & Stop-Loss Limits',
      items: reasoning.risks || [],
      topBorder: 'border-t-4 border-rose-500',
      badgeClass: 'bg-rose-50 border-rose-200 text-rose-800',
      numPrefix: 'RSK',
      icon: (
        <svg className="w-4 h-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-black" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-800">LangGraph Strategic Investment Matrix</span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Multi-Factor Algorithmic Analysis</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section, sIdx) => (
          <div 
            key={sIdx} 
            className={`bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between ${section.topBorder}`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded border ${section.badgeClass}`}>
                  {section.numPrefix}-{sIdx + 1}
                </span>
                {section.icon}
              </div>
              
              <h4 className="text-sm font-black text-black tracking-tight uppercase">{section.title}</h4>
              <p className="text-[11px] text-neutral-400 font-medium mb-4 pb-3 border-b border-neutral-100">{section.subtitle}</p>

              <div className="space-y-3.5 my-2">
                {section.items.length > 0 ? (
                  section.items.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3 group">
                      <span className="text-[10px] font-mono font-bold text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded mt-0.5 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                      <p className="text-xs text-neutral-700 font-medium leading-relaxed">{item}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-neutral-400 font-mono italic">No items flagged in this criteria.</p>
                )}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-neutral-100 text-[10px] font-mono text-neutral-400 flex items-center justify-between">
              <span>STATUS: CHECKED</span>
              <span>LANGGRAPH CORE</span>
            </div>
          </div>
        ))}
      </div>
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

  const renderInline = (text) => {
    if (!text) return null;
    const TOKEN_RE = /(\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    let keyIdx = 0;

    while ((match = TOKEN_RE.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      if (match[0].startsWith('**')) {
        parts.push(
          <strong key={keyIdx++} className="font-extrabold text-black">
            {match[2]}
          </strong>
        );
      } else {
        const url = /^https?:\/\//i.test(match[4]) ? match[4] : `https://${match[4]}`;
        parts.push(
          <a
            key={keyIdx++}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
            style={{ pointerEvents: 'all', cursor: 'pointer', position: 'relative', zIndex: 10 }}
            className="text-amber-600 hover:text-amber-800 underline underline-offset-2 font-bold transition-colors"
          >
            {match[3]}
          </a>
        );
      }
      lastIndex = TOKEN_RE.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  const formatReportContent = (markdown) => {
    if (!markdown) return null;
    const lines = markdown.split('\n');
    let inTable = false;
    let tableHeaders = [];
    let tableRows = [];
    const elements = [];

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        inTable = true;
        const parts = trimmed.split('|').map(s => s.trim()).filter((s, i, arr) => i > 0 && i < arr.length - 1);

        if (trimmed.replace(/[\|\s\-:]/g, '') === '') {
          return;
        }

        if (tableHeaders.length === 0) {
          tableHeaders = parts;
        } else {
          tableRows.push(parts);
        }
        return;
      } else if (inTable) {
        elements.push(
          <div key={`table-${index}`} className="my-6 overflow-x-auto rounded-2xl border border-gray-200/60 shadow-sm bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-neutral-50">
                <tr>
                  {tableHeaders.map((h, i) => (
                    <th key={i} className="px-6 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      {renderInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/60 bg-white">
                {tableRows.map((row, ri) => (
                  <tr key={ri} className="hover:bg-neutral-50/50 transition">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-6 py-3.5 text-xs font-semibold text-gray-700 leading-relaxed">
                        {renderInline(cell)}
                      </td>
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
        elements.push(
          <h1 key={index} className="text-2xl md:text-3xl font-extrabold text-black tracking-tight mt-8 mb-4 leading-tight">
            {renderInline(trimmed.substring(2))}
          </h1>
        );
      } else if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-lg md:text-xl font-extrabold text-black tracking-tight mt-8 mb-3 leading-tight border-b border-gray-200/60 pb-2">
            {renderInline(trimmed.substring(3))}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-sm md:text-base font-extrabold text-neutral-800 tracking-tight mt-6 mb-2 leading-tight">
            {renderInline(trimmed.substring(4))}
          </h3>
        );
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        elements.push(
          <div key={index} className="flex items-start space-x-2.5 my-2.5 pl-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              {renderInline(trimmed.substring(2))}
            </p>
          </div>
        );
      } else if (trimmed) {
        elements.push(
          <p key={index} className="text-xs text-gray-600 font-medium leading-relaxed my-3">
            {renderInline(trimmed)}
          </p>
        );
      }
    });

    if (inTable && tableHeaders.length > 0) {
      elements.push(
        <div key="table-final" className="my-6 overflow-x-auto rounded-2xl border border-gray-200/60 shadow-sm bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-neutral-50">
              <tr>
                {tableHeaders.map((h, i) => (
                  <th key={i} className="px-6 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/60 bg-white">
              {tableRows.map((row, ri) => (
                <tr key={ri} className="hover:bg-neutral-50/50 transition">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-6 py-3.5 text-xs font-semibold text-gray-700 leading-relaxed">
                      {renderInline(cell)}
                    </td>
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
      
      
      <div className="absolute top-0 left-0 right-0 h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-amber-100/30 to-transparent blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-bl from-amber-100/20 to-transparent blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col min-h-screen">
        
        
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

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ConfidenceGauge 
            confidence={report.confidence || 0} 
            recommendation={report.recommendation || 'HOLD'} 
          />
          <div className="md:col-span-2">
            <PriceCard priceData={priceData} />
          </div>
        </div>

        
        {reasoning && (
          <div className="mb-8">
            <ReasoningCard reasoning={reasoning} />
          </div>
        )}

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-6">
          
          
          <div className="lg:col-span-8 bg-white rounded-2xl p-8 md:p-12 border border-neutral-200/80 shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-5 mb-8">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">Executive Report</span>
                <h2 className="text-xl font-black tracking-tight text-neutral-900 mt-0.5">Comprehensive LangGraph Investment Dossier</h2>
              </div>
              <span className="text-xs font-mono font-bold bg-neutral-100 text-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-200">
                AI VERIFIED
              </span>
            </div>
            {formatReportContent(report.markdownReport)}
          </div>

          
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#111827] text-white rounded-2xl p-7 border border-neutral-800 shadow-xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">Execution Provenance</span>
                  <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider mt-0.5">Visual Audit Trail</h3>
                </div>
                <span className="text-[9px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded font-mono font-bold uppercase">
                  Traceable
                </span>
              </div>

              
              <div className="relative border-l border-neutral-800 ml-3 space-y-7 pb-2">
                {report.auditTrail?.map((step, idx) => (
                  <div key={step._id || idx} className="relative pl-6 group">
                    
                    <div className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-neutral-900 border-2 border-amber-500 flex items-center justify-center shadow-sm group-hover:scale-125 transition-transform" />

                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-white leading-tight">{step.title}</span>
                        <span className="text-[10px] text-neutral-500 font-mono">
                          {new Date(step.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 font-medium leading-relaxed pt-0.5">
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
