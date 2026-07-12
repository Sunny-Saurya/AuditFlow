export const STOCKS_DATABASE = [
  // A - US & Global
  { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', sector: 'Consumer Electronics', marketCap: '$3.45T', pe: 31.2, rating: 'Strong Buy', qualityScore: 96, analysisSnapshot: 'Dominant ecosystem services and recurring hardware upgrade cycles.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ', sector: 'E-Commerce & Cloud', marketCap: '$1.95T', pe: 42.1, rating: 'Strong Buy', qualityScore: 94, analysisSnapshot: 'AWS cloud margin expansion and high margin advertising momentum.' },
  { symbol: 'AMD', name: 'Advanced Micro Devices', exchange: 'NASDAQ', sector: 'Semiconductors', marketCap: '$260B', pe: 48.5, rating: 'Buy', qualityScore: 89, analysisSnapshot: 'Gaining server CPU share and rapid data center AI accelerator adoption.' },
  { symbol: 'ADBE', name: 'Adobe Inc.', exchange: 'NASDAQ', sector: 'Software', marketCap: '$235B', pe: 34.8, rating: 'Buy', qualityScore: 92, analysisSnapshot: 'Monetizing generative AI (Firefly) across creative and enterprise workflows.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc. (Class A)', exchange: 'NASDAQ', sector: 'Internet Services & AI', marketCap: '$2.15T', pe: 24.3, rating: 'Strong Buy', qualityScore: 95, analysisSnapshot: 'Search cash flow durability paired with Gemini LLM enterprise cloud growth.' },
  { symbol: 'ABBV', name: 'AbbVie Inc.', exchange: 'NYSE', sector: 'Pharmaceuticals', marketCap: '$310B', pe: 16.4, rating: 'Buy', qualityScore: 90, analysisSnapshot: 'Strong immunology pipeline (Skyrizi/Rinvoq) offsetting Humira biosimilars.' },
  { symbol: 'ACN', name: 'Accenture plc', exchange: 'NYSE', sector: 'IT Consulting', marketCap: '$195B', pe: 26.1, rating: 'Hold', qualityScore: 88, analysisSnapshot: 'Global enterprise digital transformation and AI integration leadership.' },
  { symbol: 'AMAT', name: 'Applied Materials Inc.', exchange: 'NASDAQ', sector: 'Semiconductor Equipment', marketCap: '$175B', pe: 23.5, rating: 'Buy', qualityScore: 91, analysisSnapshot: 'Critical supplier for advanced logic and memory fabrication transitions.' },
  { symbol: 'AXP', name: 'American Express Company', exchange: 'NYSE', sector: 'Financial Services', marketCap: '$165B', pe: 18.2, rating: 'Buy', qualityScore: 89, analysisSnapshot: 'Premium cardholder demographics and sustained credit quality resilience.' },
  { symbol: 'AVGO', name: 'Broadcom Inc.', exchange: 'NASDAQ', sector: 'Semiconductors & Software', marketCap: '$810B', pe: 38.6, rating: 'Strong Buy', qualityScore: 95, analysisSnapshot: 'Custom AI ASIC dominance paired with VMware synergy realization.' },
  { symbol: 'ABT', name: 'Abbott Laboratories', exchange: 'NYSE', sector: 'Medical Devices', marketCap: '$185B', pe: 24.0, rating: 'Buy', qualityScore: 90, analysisSnapshot: 'Continuous glucose monitoring (FreeStyle Libre) market expansion.' },
  { symbol: 'AMGN', name: 'Amgen Inc.', exchange: 'NASDAQ', sector: 'Biotechnology', marketCap: '$168B', pe: 21.5, rating: 'Hold', qualityScore: 86, analysisSnapshot: 'Solid oncology portfolio with potential obesity pipeline catalysts.' },
  { symbol: 'ANSS', name: 'ANSYS Inc.', exchange: 'NASDAQ', sector: 'Engineering Simulation', marketCap: '$28B', pe: 41.2, rating: 'Hold', qualityScore: 87, analysisSnapshot: 'Mission-critical simulation software across automotive and aerospace.' },
  { symbol: 'AON', name: 'Aon plc', exchange: 'NYSE', sector: 'Insurance Brokerage', marketCap: '$64B', pe: 22.8, rating: 'Buy', qualityScore: 89, analysisSnapshot: 'Recurring fee revenue model with high client retention rates.' },
  { symbol: 'ARM', name: 'Arm Holdings plc', exchange: 'NASDAQ', sector: 'Semiconductor IP', marketCap: '$145B', pe: 68.0, rating: 'Buy', qualityScore: 91, analysisSnapshot: 'v9 architecture royalty uplift and data center compute market penetration.' },
  { symbol: 'ADP', name: 'Automatic Data Processing', exchange: 'NASDAQ', sector: 'Payroll & HR Software', marketCap: '$104B', pe: 27.3, rating: 'Hold', qualityScore: 88, analysisSnapshot: 'High float interest income balance and mission-critical enterprise HR.' },
  
  // A - India (NSE / BSE)
  { symbol: 'ASIANPAINT', name: 'Asian Paints Limited', exchange: 'NSE', sector: 'Paints & Coatings', marketCap: '₹2.85L Cr', pe: 52.4, rating: 'Hold', qualityScore: 88, analysisSnapshot: 'Market leader in decorative paints investing heavily in home decor integration.' },
  { symbol: 'ADANIENT', name: 'Adani Enterprises Limited', exchange: 'NSE', sector: 'Incubator & Infrastructure', marketCap: '₹3.65L Cr', pe: 85.1, rating: 'Speculative Buy', qualityScore: 80, analysisSnapshot: 'High growth capital expenditure across airports, green hydrogen, and data centers.' },
  { symbol: 'ADANIPORTS', name: 'Adani Ports & SEZ', exchange: 'NSE', sector: 'Logistics & Ports', marketCap: '₹3.10L Cr', pe: 34.2, rating: 'Buy', qualityScore: 89, analysisSnapshot: 'Dominant Indian cargo handling capacity with strong EBITDA conversion.' },
  { symbol: 'AXISBANK', name: 'Axis Bank Limited', exchange: 'NSE', sector: 'Banking', marketCap: '₹3.55L Cr', pe: 14.2, rating: 'Buy', qualityScore: 90, analysisSnapshot: 'Healthy deposit mobilization and improving net interest margin consistency.' },
  { symbol: 'APOLLOHOSP', name: 'Apollo Hospitals Enterprise', exchange: 'NSE', sector: 'Healthcare & Pharmacy', marketCap: '₹95,000 Cr', pe: 65.8, rating: 'Buy', qualityScore: 89, analysisSnapshot: 'Hospital occupancy expansion plus Apollo 24/7 digital health scaling.' },
  { symbol: 'ASTRAL', name: 'Astral Limited', exchange: 'NSE', sector: 'Building Materials & Pipes', marketCap: '₹54,000 Cr', pe: 75.0, rating: 'Hold', qualityScore: 86, analysisSnapshot: 'Premium CPVC plumbing brand with expanding adhesives segment footprint.' },
  { symbol: 'ALKEM', name: 'Alkem Laboratories Limited', exchange: 'NSE', sector: 'Pharmaceuticals', marketCap: '₹62,000 Cr', pe: 35.6, rating: 'Buy', qualityScore: 87, analysisSnapshot: 'Strong domestic acute formulation leadership and US margin normalization.' },
  { symbol: 'ABB', name: 'ABB India Limited', exchange: 'NSE', sector: 'Industrial Automation', marketCap: '₹1.75L Cr', pe: 92.0, rating: 'Hold', qualityScore: 91, analysisSnapshot: 'Direct beneficiary of industrial electrification and smart manufacturing capex.' },

  // B - US & Global
  { symbol: 'BA', name: 'The Boeing Company', exchange: 'NYSE', sector: 'Aerospace & Defense', marketCap: '$112B', pe: 'N/A', rating: 'Hold', qualityScore: 78, analysisSnapshot: 'Massive commercial jet backlog offset by near-term production audit recovery.' },
  { symbol: 'BAC', name: 'Bank of America Corporation', exchange: 'NYSE', sector: 'Banking', marketCap: '$315B', pe: 12.8, rating: 'Buy', qualityScore: 89, analysisSnapshot: 'Low cost retail deposit base benefiting from higher reinvestment yields.' },
  { symbol: 'BLK', name: 'BlackRock Inc.', exchange: 'NYSE', sector: 'Asset Management', marketCap: '$122B', pe: 21.0, rating: 'Buy', qualityScore: 93, analysisSnapshot: 'Unrivaled ETF (iShares) scale and Aladdin enterprise platform dominance.' },
  { symbol: 'BMY', name: 'Bristol-Myers Squibb Company', exchange: 'NYSE', sector: 'Pharmaceuticals', marketCap: '$95B', pe: 11.5, rating: 'Hold', qualityScore: 83, analysisSnapshot: 'Attractive dividend yield while transitioning through Revlimid patent cliff.' },
  { symbol: 'BRK.A', name: 'Berkshire Hathaway Inc.', exchange: 'NYSE', sector: 'Conglomerate & Insurance', marketCap: '$980B', pe: 19.4, rating: 'Strong Buy', qualityScore: 97, analysisSnapshot: 'Fortress cash reserves with steady insurance float and energy cash flows.' },

  // B - India
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance Limited', exchange: 'NSE', sector: 'Consumer Finance', marketCap: '₹4.35L Cr', pe: 28.5, rating: 'Strong Buy', qualityScore: 94, analysisSnapshot: 'Industry benchmark in customer acquisition, cross-sell algorithms, and ROE.' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel Limited', exchange: 'NSE', sector: 'Telecommunications', marketCap: '₹8.60L Cr', pe: 48.2, rating: 'Strong Buy', qualityScore: 93, analysisSnapshot: 'Leading industry ARPU expansion paired with rapid 5G infrastructure scaling.' },
  { symbol: 'BEL', name: 'Bharat Electronics Limited', exchange: 'NSE', sector: 'Defense Electronics', marketCap: '₹2.15L Cr', pe: 45.0, rating: 'Buy', qualityScore: 92, analysisSnapshot: 'Strong indigenous defense electronics order book and high operating leverage.' },
  { symbol: 'BRITANNIA', name: 'Britannia Industries Limited', exchange: 'NSE', sector: 'FMCG (Food & Bakery)', marketCap: '₹1.32L Cr', pe: 54.1, rating: 'Hold', qualityScore: 89, analysisSnapshot: 'Dominant biscuit shelf space with improving rural consumption trends.' },
  { symbol: 'BHEL', name: 'Bharat Heavy Electricals Ltd', exchange: 'NSE', sector: 'Power Equipment', marketCap: '₹98,000 Cr', pe: 'N/A', rating: 'Hold', qualityScore: 81, analysisSnapshot: 'Surge in thermal power equipment orders reviving revenue growth trajectory.' },

  // C - US & Global
  { symbol: 'CAT', name: 'Caterpillar Inc.', exchange: 'NYSE', sector: 'Heavy Machinery', marketCap: '$168B', pe: 16.2, rating: 'Buy', qualityScore: 91, analysisSnapshot: 'Infrastructure spending and mining equipment replacement demand.' },
  { symbol: 'CRM', name: 'Salesforce Inc.', exchange: 'NYSE', sector: 'Enterprise Cloud CRM', marketCap: '$268B', pe: 44.5, rating: 'Buy', qualityScore: 91, analysisSnapshot: 'Agentforce AI rollout driving margin expansion and enterprise cloud stickiness.' },
  { symbol: 'CSCO', name: 'Cisco Systems Inc.', exchange: 'NASDAQ', sector: 'Networking Hardware', marketCap: '$198B', pe: 16.8, rating: 'Hold', qualityScore: 87, analysisSnapshot: 'Transitioning toward recurring software subscriptions paired with Splunk acquisition.' },
  { symbol: 'COST', name: 'Costco Wholesale Corporation', exchange: 'NASDAQ', sector: 'Retail & Warehouse', marketCap: '$385B', pe: 52.0, rating: 'Strong Buy', qualityScore: 96, analysisSnapshot: 'Unmatched membership renewal rates and defensive consumer value proposition.' },
  { symbol: 'CVX', name: 'Chevron Corporation', exchange: 'NYSE', sector: 'Integrated Oil & Gas', marketCap: '$290B', pe: 14.5, rating: 'Buy', qualityScore: 90, analysisSnapshot: 'Permian basin production efficiency and shareholder-friendly capital returns.' },
  { symbol: 'COIN', name: 'Coinbase Global Inc.', exchange: 'NASDAQ', sector: 'Crypto Exchange & Fintech', marketCap: '$58B', pe: 32.1, rating: 'Buy', qualityScore: 86, analysisSnapshot: 'Institutional crypto custody leader benefiting from ETF inflows and Base L2 growth.' },

  // C - India
  { symbol: 'CIPLA', name: 'Cipla Limited', exchange: 'NSE', sector: 'Pharmaceuticals', marketCap: '₹1.24L Cr', pe: 28.9, rating: 'Buy', qualityScore: 90, analysisSnapshot: 'Strong respiratory portfolio in India & US with consistent EBITDA margins.' },
  { symbol: 'COALINDIA', name: 'Coal India Limited', exchange: 'NSE', sector: 'Mining & Fossil Fuels', marketCap: '₹3.15L Cr', pe: 8.8, rating: 'Buy', qualityScore: 86, analysisSnapshot: 'High dividend yield generator with record domestic production volumes.' },
  { symbol: 'CHOLAFIN', name: 'Cholamandalam Investment', exchange: 'NSE', sector: 'Vehicle & Home Finance', marketCap: '₹1.15L Cr', pe: 26.4, rating: 'Buy', qualityScore: 91, analysisSnapshot: 'Robust commercial vehicle financing growth with superior asset quality.' },
  { symbol: 'CUMMINSIND', name: 'Cummins India Limited', exchange: 'NSE', sector: 'Power Gensets & Engines', marketCap: '₹95,000 Cr', pe: 55.0, rating: 'Hold', qualityScore: 89, analysisSnapshot: 'Surging demand for data center backup power and industrial diesel engines.' },

  // D - US & Global
  { symbol: 'DIS', name: 'The Walt Disney Company', exchange: 'NYSE', sector: 'Media & Entertainment', marketCap: '$180B', pe: 21.4, rating: 'Buy', qualityScore: 88, analysisSnapshot: 'Streaming profitability turnaround paired with cash-generative Theme Parks.' },
  { symbol: 'DE', name: 'Deere & Company', exchange: 'NYSE', sector: 'Agricultural Machinery', marketCap: '$110B', pe: 13.8, rating: 'Buy', qualityScore: 90, analysisSnapshot: 'Precision agriculture software leadership driving high equipment retention.' },
  
  // D - India
  { symbol: 'DRREDDY', name: "Dr. Reddy's Laboratories", exchange: 'NSE', sector: 'Pharmaceuticals', marketCap: '₹1.08L Cr', pe: 21.5, rating: 'Buy', qualityScore: 89, analysisSnapshot: 'Balanced global generic portfolio with healthy balance sheet net cash.' },
  { symbol: 'DMART', name: 'Avenue Supermarts Limited', exchange: 'NSE', sector: 'Retail (Hypermarkets)', marketCap: '₹3.10L Cr', pe: 110.5, rating: 'Hold', qualityScore: 92, analysisSnapshot: 'Efficient store ownership model and disciplined everyday low cost strategy.' },
  { symbol: 'DIVISLAB', name: "Divi's Laboratories Limited", exchange: 'NSE', sector: 'API & Custom Synthesis', marketCap: '₹1.35L Cr', pe: 72.0, rating: 'Buy', qualityScore: 91, analysisSnapshot: 'Global API manufacturing preferred partner recovering from post-covid inventory destocking.' },
  { symbol: 'DLF', name: 'DLF Limited', exchange: 'NSE', sector: 'Real Estate & Development', marketCap: '₹2.10L Cr', pe: 65.4, rating: 'Buy', qualityScore: 88, analysisSnapshot: 'Luxury residential launch sell-outs coupled with annuity rental income strength.' },

  // E - US & Global
  { symbol: 'XOM', name: 'Exxon Mobil Corporation', exchange: 'NYSE', sector: 'Integrated Oil & Gas', marketCap: '$460B', pe: 13.5, rating: 'Strong Buy', qualityScore: 92, analysisSnapshot: 'Guyana offshore production growth and world-class refining scale.' },
  { symbol: 'LLY', name: 'Eli Lilly and Company', exchange: 'NYSE', sector: 'Pharmaceuticals', marketCap: '$880B', pe: 112.0, rating: 'Strong Buy', qualityScore: 98, analysisSnapshot: 'Unprecedented demand for GLP-1 weight loss and diabetes therapies (Zepbound/Mounjaro).' },

  // E - India
  { symbol: 'EICHERMOT', name: 'Eicher Motors Limited', exchange: 'NSE', sector: 'Automotive (Royal Enfield)', marketCap: '₹1.34L Cr', pe: 32.1, rating: 'Buy', qualityScore: 91, analysisSnapshot: 'Mid-size motorcycle market dominance with expanding export distribution.' },

  // F - US & Global
  { symbol: 'META', name: 'Meta Platforms Inc.', exchange: 'NASDAQ', sector: 'Social Media & AI', marketCap: '$1.45T', pe: 26.8, rating: 'Strong Buy', qualityScore: 95, analysisSnapshot: 'AI-enhanced ad targeting efficiency and massive global user engagement.' },
  { symbol: 'F', name: 'Ford Motor Company', exchange: 'NYSE', sector: 'Automotive', marketCap: '$44B', pe: 7.2, rating: 'Hold', qualityScore: 79, analysisSnapshot: 'Highly profitable Ford Pro commercial fleet business offsetting EV transition friction.' },

  // G - US & Global
  { symbol: 'GE', name: 'GE Aerospace', exchange: 'NYSE', sector: 'Aerospace Engines', marketCap: '$185B', pe: 38.0, rating: 'Strong Buy', qualityScore: 93, analysisSnapshot: 'LEAP commercial engine aftermarket servicing and robust defense backlog.' },
  
  // G - India
  { symbol: 'GRASIM', name: 'Grasim Industries Limited', exchange: 'NSE', sector: 'Cement & Chemicals', marketCap: '₹1.72L Cr', pe: 38.4, rating: 'Hold', qualityScore: 88, analysisSnapshot: 'Aditya Birla Group holding company launching major decorative paints offensive.' },
  { symbol: 'GODREJCP', name: 'Godrej Consumer Products', exchange: 'NSE', sector: 'FMCG', marketCap: '₹1.38L Cr', pe: 58.0, rating: 'Buy', qualityScore: 89, analysisSnapshot: 'Household insecticides and personal care innovation driving domestic recovery.' },

  // H - US & Global
  { symbol: 'HD', name: 'The Home Depot Inc.', exchange: 'NYSE', sector: 'Home Improvement Retail', marketCap: '$365B', pe: 24.5, rating: 'Buy', qualityScore: 93, analysisSnapshot: 'Pro contractor relationship strength and aging housing stock improvement demand.' },
  { symbol: 'HOOD', name: 'Robinhood Markets Inc.', exchange: 'NASDAQ', sector: 'Fintech Brokerage', marketCap: '$24B', pe: 28.4, rating: 'Buy', qualityScore: 85, analysisSnapshot: 'Surging retail trading volumes across options, equities, and cryptocurrency.' },

  // H - India
  { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', exchange: 'NSE', sector: 'Banking', marketCap: '₹13.2L Cr', pe: 18.5, rating: 'Strong Buy', qualityScore: 96, analysisSnapshot: 'India’s premier private lender normalizing post-merger deposit-to-credit ratios.' },
  { symbol: 'HCLTECH', name: 'HCL Technologies Limited', exchange: 'NSE', sector: 'IT Services & Software', marketCap: '₹4.35L Cr', pe: 26.8, rating: 'Buy', qualityScore: 91, analysisSnapshot: 'Stable engineering services performance plus high-margin software products.' },
  { symbol: 'HINDALCO', name: 'Hindalco Industries Limited', exchange: 'NSE', sector: 'Metals (Aluminum & Copper)', marketCap: '₹1.54L Cr', pe: 15.2, rating: 'Buy', qualityScore: 89, analysisSnapshot: 'Novelis beverage can and automotive aluminum rolling margins providing stability.' },
  { symbol: 'HAVELLS', name: 'Havells India Limited', exchange: 'NSE', sector: 'Electrical Consumer Durables', marketCap: '₹1.15L Cr', pe: 72.4, rating: 'Hold', qualityScore: 90, analysisSnapshot: 'Strong distribution reach across cables, switchgear, and Lloyd air conditioners.' },
  { symbol: 'HAL', name: 'Hindustan Aeronautics Ltd', exchange: 'NSE', sector: 'Aerospace & Defense', marketCap: '₹3.15L Cr', pe: 38.5, rating: 'Strong Buy', qualityScore: 94, analysisSnapshot: 'Monopoly supplier of fighter jets and helicopters to Indian armed forces.' },

  // I - US & Global
  { symbol: 'INTC', name: 'Intel Corporation', exchange: 'NASDAQ', sector: 'Semiconductors', marketCap: '$98B', pe: 'N/A', rating: 'Hold', qualityScore: 76, analysisSnapshot: 'Restructuring foundry operations and advancing 18A process node technology.' },
  { symbol: 'IBM', name: 'International Business Machines', exchange: 'NYSE', sector: 'Enterprise AI & IT Services', marketCap: '$198B', pe: 21.0, rating: 'Buy', qualityScore: 88, analysisSnapshot: 'watsonx enterprise AI adoption paired with Red Hat hybrid cloud consulting.' },

  // I - India
  { symbol: 'INFY', name: 'Infosys Limited', exchange: 'NSE', sector: 'IT Services', marketCap: '₹7.65L Cr', pe: 28.2, rating: 'Buy', qualityScore: 94, analysisSnapshot: 'Robust large-deal winning momentum and disciplined margin cost optimization.' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Limited', exchange: 'NSE', sector: 'Banking', marketCap: '₹8.95L Cr', pe: 18.2, rating: 'Strong Buy', qualityScore: 96, analysisSnapshot: 'Best-in-class asset quality, digital banking leadership, and superior ROA.' },
  { symbol: 'ITC', name: 'ITC Limited', exchange: 'NSE', sector: 'FMCG, Tobacco & Hotels', marketCap: '₹5.85L Cr', pe: 28.4, rating: 'Buy', qualityScore: 93, analysisSnapshot: 'High-cash-generating cigarette monopoly funding FMCG scale and hotel demerger upside.' },
  { symbol: 'INDUSINDBK', name: 'IndusInd Bank Limited', exchange: 'NSE', sector: 'Banking', marketCap: '₹1.10L Cr', pe: 12.5, rating: 'Buy', qualityScore: 87, analysisSnapshot: 'Specialized vehicle finance yield driver with attractive valuation entry point.' },
  { symbol: 'IREDA', name: 'Indian Renewable Energy Dev', exchange: 'NSE', sector: 'Green Energy Financing', marketCap: '₹52,000 Cr', pe: 42.0, rating: 'Buy', qualityScore: 88, analysisSnapshot: 'Premier government NBFC dedicated to financing India’s 500 GW renewable target.' },
  { symbol: 'IRFC', name: 'Indian Railway Finance Corp', exchange: 'NSE', sector: 'Railway Infrastructure Finance', marketCap: '₹2.10L Cr', pe: 32.5, rating: 'Hold', qualityScore: 86, analysisSnapshot: 'Zero NPA state-backed financing arm for Indian Railway rolling stock and tracks.' },

  // J - US & Global
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', exchange: 'NYSE', sector: 'Banking & Financials', marketCap: '$615B', pe: 12.4, rating: 'Strong Buy', qualityScore: 96, analysisSnapshot: 'Unmatched global balance sheet scale and fortress risk management discipline.' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', exchange: 'NYSE', sector: 'Pharmaceuticals & MedTech', marketCap: '$385B', pe: 16.8, rating: 'Buy', qualityScore: 91, analysisSnapshot: 'AAA-rated balance sheet with steady oncology drug growth and surgical robotics.' },

  // J - India
  { symbol: 'JSWSTEEL', name: 'JSW Steel Limited', exchange: 'NSE', sector: 'Steel & Metals', marketCap: '₹2.25L Cr', pe: 24.5, rating: 'Buy', qualityScore: 88, analysisSnapshot: 'Aggressive capacity expansion to 38.5 MTPA capturing Indian infrastructure boom.' },
  { symbol: 'JIOFIN', name: 'Jio Financial Services Ltd', exchange: 'NSE', sector: 'Digital Fintech & Lending', marketCap: '₹2.15L Cr', pe: 120.0, rating: 'Buy', qualityScore: 89, analysisSnapshot: 'Leveraging Reliance retail and telecom footprint for mass digital financial services.' },

  // K - US & Global
  { symbol: 'KO', name: 'The Coca-Cola Company', exchange: 'NYSE', sector: 'Beverages', marketCap: '$290B', pe: 24.8, rating: 'Buy', qualityScore: 93, analysisSnapshot: 'Unparalleled global brand pricing power and high margin concentrate model.' },

  // K - India
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Limited', exchange: 'NSE', sector: 'Banking', marketCap: '₹3.60L Cr', pe: 19.5, rating: 'Buy', qualityScore: 92, analysisSnapshot: 'Conservatively managed balance sheet and strong subsidiaries across wealth management.' },
  { symbol: 'KPITTECH', name: 'KPIT Technologies Limited', exchange: 'NSE', sector: 'Automotive Software', marketCap: '₹44,000 Cr', pe: 65.0, rating: 'Buy', qualityScore: 90, analysisSnapshot: 'Global pure-play embedded software partner for Software-Defined Vehicles (SDVs).' },

  // L - US & Global
  { symbol: 'LMT', name: 'Lockheed Martin Corporation', exchange: 'NYSE', sector: 'Aerospace & Defense', marketCap: '$135B', pe: 18.4, rating: 'Buy', qualityScore: 91, analysisSnapshot: 'F-35 fighter program stability and surging missile defense replenishment contracts.' },

  // L - India
  { symbol: 'LT', name: 'Larsen & Toubro Limited', exchange: 'NSE', sector: 'Infrastructure & EPC', marketCap: '₹5.15L Cr', pe: 34.0, rating: 'Strong Buy', qualityScore: 95, analysisSnapshot: 'Record ₹5 Lakh Crore EPC order backlog spanning green energy, defense, and metro rail.' },
  { symbol: 'LTIM', name: 'LTIMindtree Limited', exchange: 'NSE', sector: 'IT Services', marketCap: '₹1.55L Cr', pe: 34.2, rating: 'Hold', qualityScore: 89, analysisSnapshot: 'Cross-sell revenue synergies across BFSI and high-tech enterprise clients.' },
  { symbol: 'LUPIN', name: 'Lupin Limited', exchange: 'NSE', sector: 'Pharmaceuticals', marketCap: '₹95,000 Cr', pe: 38.0, rating: 'Buy', qualityScore: 88, analysisSnapshot: 'US respiratory product launches and domestic India formulation growth.' },

  // M - US & Global
  { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', sector: 'Software & Cloud AI', marketCap: '$3.20T', pe: 36.5, rating: 'Strong Buy', qualityScore: 98, analysisSnapshot: 'Azure AI cloud leadership paired with Copilot monetization across Microsoft 365.' },
  { symbol: 'MCD', name: "McDonald's Corporation", exchange: 'NYSE', sector: 'Quick Service Restaurants', marketCap: '$210B', pe: 23.2, rating: 'Buy', qualityScore: 92, analysisSnapshot: 'Highly scalable franchise royalty structure with digital loyalty app strength.' },
  { symbol: 'MA', name: 'Mastercard Incorporated', exchange: 'NYSE', sector: 'Payment Networks', marketCap: '$440B', pe: 34.8, rating: 'Strong Buy', qualityScore: 96, analysisSnapshot: 'Cross-border travel payment volume recovery and high-margin value-added services.' },

  // M - India
  { symbol: 'M&M', name: 'Mahindra & Mahindra Limited', exchange: 'NSE', sector: 'Automotive (SUVs & Tractors)', marketCap: '₹3.65L Cr', pe: 26.4, rating: 'Strong Buy', qualityScore: 94, analysisSnapshot: 'Dominant Indian SUV market share (Scorpio/XUV700) plus rural tractor leadership.' },
  { symbol: 'MARUTI', name: 'Maruti Suzuki India Limited', exchange: 'NSE', sector: 'Automotive (Passenger Cars)', marketCap: '₹4.10L Cr', pe: 29.8, rating: 'Buy', qualityScore: 93, analysisSnapshot: 'Unrivaled Indian passenger car distribution network and expanding SUV portfolio.' },
  { symbol: 'MUTHOOTFIN', name: 'Muthoot Finance Limited', exchange: 'NSE', sector: 'Gold Loan Finance', marketCap: '₹75,000 Cr', pe: 15.6, rating: 'Buy', qualityScore: 90, analysisSnapshot: 'High yield gold collateralized lending with superior asset safety and low credit losses.' },

  // N - US & Global
  { symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ', sector: 'Semiconductors & AI Compute', marketCap: '$3.15T', pe: 46.2, rating: 'Strong Buy', qualityScore: 99, analysisSnapshot: 'Hopper and Blackwell GPU monopoly powering global generative AI infrastructure.' },
  { symbol: 'NFLX', name: 'Netflix Inc.', exchange: 'NASDAQ', sector: 'Streaming Entertainment', marketCap: '$305B', pe: 42.0, rating: 'Strong Buy', qualityScore: 94, analysisSnapshot: 'Paid sharing password rollout plus high-growth ad-supported tier expansion.' },
  { symbol: 'NKE', name: 'NIKE Inc.', exchange: 'NYSE', sector: 'Athletic Footwear & Apparel', marketCap: '$115B', pe: 24.8, rating: 'Hold', qualityScore: 86, analysisSnapshot: 'Refocusing on wholesale retail partners and performance running innovation.' },

  // N - India
  { symbol: 'NESTLEIND', name: 'Nestle India Limited', exchange: 'NSE', sector: 'FMCG (Packaged Foods)', marketCap: '₹2.45L Cr', pe: 72.0, rating: 'Hold', qualityScore: 93, analysisSnapshot: 'Iconic Maggi and Nescafé brand pricing power with steady urban consumption.' },
  { symbol: 'NTPC', name: 'NTPC Limited', exchange: 'NSE', sector: 'Power Generation', marketCap: '₹3.95L Cr', pe: 18.5, rating: 'Strong Buy', qualityScore: 92, analysisSnapshot: 'India’s largest power utility scaling 60 GW renewable capacity alongside thermal base.' },
  { symbol: 'NYKAA', name: 'FSN E-Commerce Ventures (Nykaa)', exchange: 'NSE', sector: 'Beauty E-Commerce', marketCap: '₹52,000 Cr', pe: 140.0, rating: 'Hold', qualityScore: 85, analysisSnapshot: 'Market leader in Indian premium beauty retail expanding into omnichannel fashion.' },

  // O - US & Global
  { symbol: 'ORCL', name: 'Oracle Corporation', exchange: 'NYSE', sector: 'Cloud Infrastructure & DB', marketCap: '$460B', pe: 38.5, rating: 'Strong Buy', qualityScore: 93, analysisSnapshot: 'OCI cloud infrastructure booking boom fueled by OpenAI and enterprise AI training workloads.' },

  // O - India
  { symbol: 'ONGC', name: 'Oil & Natural Gas Corporation', exchange: 'NSE', sector: 'Crude Oil & Gas Exploration', marketCap: '₹3.75L Cr', pe: 8.4, rating: 'Buy', qualityScore: 88, analysisSnapshot: 'High dividend payout profile with KG basin deepwater production turnaround.' },

  // P - US & Global
  { symbol: 'PLTR', name: 'Palantir Technologies Inc.', exchange: 'NYSE', sector: 'AI Enterprise Software', marketCap: '$135B', pe: 95.0, rating: 'Buy', qualityScore: 91, analysisSnapshot: 'Explosive commercial adoption of Artificial Intelligence Platform (AIP) bootcamps.' },
  { symbol: 'PYPL', name: 'PayPal Holdings Inc.', exchange: 'NASDAQ', sector: 'Fintech & Payments', marketCap: '$82B', pe: 17.5, rating: 'Buy', qualityScore: 86, analysisSnapshot: 'Braintree unbranded checkout growth and Venmo monetization initiatives.' },
  { symbol: 'PG', name: 'The Procter & Gamble Company', exchange: 'NYSE', sector: 'Consumer Packaged Goods', marketCap: '$395B', pe: 26.2, rating: 'Buy', qualityScore: 94, analysisSnapshot: 'Everyday household brand dominance providing stable defensive cash flows.' },

  // P - India
  { symbol: 'POWERGRID', name: 'Power Grid Corporation of India', exchange: 'NSE', sector: 'Power Transmission', marketCap: '₹3.10L Cr', pe: 19.8, rating: 'Strong Buy', qualityScore: 93, analysisSnapshot: 'Interstate electricity grid transmission monopoly with predictable regulated returns.' },
  { symbol: 'PIDILITIND', name: 'Pidilite Industries Limited', exchange: 'NSE', sector: 'Specialty Chemicals & Adhesives', marketCap: '₹1.58L Cr', pe: 82.0, rating: 'Hold', qualityScore: 92, analysisSnapshot: 'Unassailable Fevicol brand equity dominating Indian waterproofing and adhesives.' },
  { symbol: 'POLICYBZR', name: 'PB Fintech Limited (Policybazaar)', exchange: 'NSE', sector: 'Insurance Aggregator Platform', marketCap: '₹76,000 Cr', pe: 110.0, rating: 'Buy', qualityScore: 88, analysisSnapshot: 'Profitable operating leverage turnaround as India’s leading online insurance marketplace.' },
  { symbol: 'POLYCAB', name: 'Polycab India Limited', exchange: 'NSE', sector: 'Wires & Cables', marketCap: '₹1.05L Cr', pe: 54.0, rating: 'Buy', qualityScore: 91, analysisSnapshot: 'Beneficiary of real estate housing boom and industrial electrification wire demand.' },

  // Q - US & Global
  { symbol: 'QCOM', name: 'QUALCOMM Incorporated', exchange: 'NASDAQ', sector: 'Mobile & AI Edge Chipsets', marketCap: '$188B', pe: 21.5, rating: 'Buy', qualityScore: 90, analysisSnapshot: 'On-device AI PC Snapdragon X Elite momentum paired with automotive cockpit chips.' },

  // R - US & Global
  { symbol: 'RTX', name: 'RTX Corporation', exchange: 'NYSE', sector: 'Aerospace & Defense', marketCap: '$162B', pe: 22.0, rating: 'Buy', qualityScore: 89, analysisSnapshot: 'Pratt & Whitney GTF engine inspection resolution and strong defense electronics demand.' },

  // R - India
  { symbol: 'RELIANCE', name: 'Reliance Industries Limited', exchange: 'NSE', sector: 'Conglomerate (Energy, Retail, Jio)', marketCap: '₹20.4L Cr', pe: 28.5, rating: 'Strong Buy', qualityScore: 97, analysisSnapshot: 'India’s largest corporation with upcoming retail and Jio telecom IPO value unlocking.' },
  { symbol: 'RVNL', name: 'Rail Vikas Nigam Limited', exchange: 'NSE', sector: 'Railway Infrastructure EPC', marketCap: '₹1.15L Cr', pe: 68.0, rating: 'Buy', qualityScore: 88, analysisSnapshot: 'Major beneficiary of Indian railway modernization and high-speed corridor projects.' },
  { symbol: 'RECLTD', name: 'REC Limited', exchange: 'NSE', sector: 'Power Infrastructure Finance', marketCap: '₹1.45L Cr', pe: 9.8, rating: 'Strong Buy', qualityScore: 91, analysisSnapshot: 'Extremely attractive P/E ratio and high dividend yield financing power distribution.' },

  // S - US & Global
  { symbol: 'SBUX', name: 'Starbucks Corporation', exchange: 'NASDAQ', sector: 'Coffee Retail', marketCap: '$110B', pe: 26.5, rating: 'Hold', qualityScore: 88, analysisSnapshot: 'New CEO operational turnaround plan targeting service speed and store experience.' },
  { symbol: 'SHOP', name: 'Shopify Inc.', exchange: 'NYSE', sector: 'E-Commerce Platform', marketCap: '$105B', pe: 75.0, rating: 'Buy', qualityScore: 91, analysisSnapshot: 'Global merchant GMV expansion and disciplined operating expense efficiency.' },
  { symbol: 'SQ', name: 'Block Inc.', exchange: 'NYSE', sector: 'Fintech (Square & Cash App)', marketCap: '$46B', pe: 22.0, rating: 'Buy', qualityScore: 86, analysisSnapshot: 'Cash App banking feature engagement and Square seller ecosystem recovery.' },

  // S - India
  { symbol: 'SBIN', name: 'State Bank of India', exchange: 'NSE', sector: 'Public Sector Banking', marketCap: '₹7.60L Cr', pe: 10.8, rating: 'Strong Buy', qualityScore: 94, analysisSnapshot: 'India’s largest banking network delivering multi-year low credit costs and strong ROE.' },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries', exchange: 'NSE', sector: 'Pharmaceuticals', marketCap: '₹4.35L Cr', pe: 36.2, rating: 'Strong Buy', qualityScore: 94, analysisSnapshot: 'Global specialty pharma expansion (Ilumya/Cequa) driving high margin expansion.' },
  { symbol: 'SIEMENS', name: 'Siemens India Limited', exchange: 'NSE', sector: 'Smart Infrastructure & Energy', marketCap: '₹2.65L Cr', pe: 98.0, rating: 'Buy', qualityScore: 93, analysisSnapshot: 'High-end rail electrification and factory industrial automation technology provider.' },
  { symbol: 'SUZLON', name: 'Suzlon Energy Limited', exchange: 'NSE', sector: 'Wind Turbine Generator', marketCap: '₹98,000 Cr', pe: 85.0, rating: 'Speculative Buy', qualityScore: 84, analysisSnapshot: 'Balance sheet debt-free turnaround coupled with massive wind turbine order pipeline.' },
  { symbol: 'SRF', name: 'SRF Limited', exchange: 'NSE', sector: 'Specialty Chemicals & Fluorochemicals', marketCap: '₹72,000 Cr', pe: 52.0, rating: 'Buy', qualityScore: 89, analysisSnapshot: 'Refrigerant gas demand recovery and fluorospecialty agrochemical capex.' },

  // T - US & Global
  { symbol: 'TSLA', name: 'Tesla Inc.', exchange: 'NASDAQ', sector: 'Electric Vehicles & AI Robotics', marketCap: '$780B', pe: 65.4, rating: 'Buy', qualityScore: 91, analysisSnapshot: 'Autonomous Full Self-Driving (FSD) software adoption and Megapack energy storage boom.' },
  { symbol: 'TXN', name: 'Texas Instruments Incorporated', exchange: 'NASDAQ', sector: 'Analog Semiconductors', marketCap: '$192B', pe: 35.0, rating: 'Hold', qualityScore: 91, analysisSnapshot: 'Industrial and automotive analog chip cycle bottoming with strong free cash flow.' },

  // T - India
  { symbol: 'TCS', name: 'Tata Consultancy Services', exchange: 'NSE', sector: 'IT Services', marketCap: '₹15.2L Cr', pe: 31.5, rating: 'Strong Buy', qualityScore: 96, analysisSnapshot: 'Crown jewel of Tata Group with pristine balance sheet and unmatched client stickiness.' },
  { symbol: 'TATAMOTORS', name: 'Tata Motors Limited', exchange: 'NSE', sector: 'Automotive (JLR & India EVs)', marketCap: '₹3.85L Cr', pe: 11.2, rating: 'Strong Buy', qualityScore: 93, analysisSnapshot: 'Jaguar Land Rover (Range Rover) cash flow turnaround paired with Indian EV leadership.' },
  { symbol: 'TATASTEEL', name: 'Tata Steel Limited', exchange: 'NSE', sector: 'Steel & Metallurgy', marketCap: '₹1.95L Cr', pe: 18.5, rating: 'Buy', qualityScore: 88, analysisSnapshot: 'UK decarbonization transition subsidy plus strong domestic Indian steel demand.' },
  { symbol: 'TITAN', name: 'Titan Company Limited', exchange: 'NSE', sector: 'Jewelry & Watches (Tanishq)', marketCap: '₹3.15L Cr', pe: 88.0, rating: 'Buy', qualityScore: 94, analysisSnapshot: 'Formalization of Indian gold jewelry retail market driving consistent store expansion.' },
  { symbol: 'TRENT', name: 'Trent Limited (Zudio/Westside)', exchange: 'NSE', sector: 'Fast Fashion Retail', marketCap: '₹2.45L Cr', pe: 165.0, rating: 'Strong Buy', qualityScore: 95, analysisSnapshot: 'Phenomenal store expansion and same-store sales growth for Zudio value fashion.' },
  { symbol: 'TATAPOWER', name: 'Tata Power Company Limited', exchange: 'NSE', sector: 'Integrated Utility & Solar', marketCap: '₹1.42L Cr', pe: 42.0, rating: 'Buy', qualityScore: 90, analysisSnapshot: 'Leading rooftop solar installation EPC, EV charging network, and utility transmission.' },

  // U - US & Global
  { symbol: 'UBER', name: 'Uber Technologies Inc.', exchange: 'NYSE', sector: 'Mobility & Delivery Platform', marketCap: '$155B', pe: 34.0, rating: 'Strong Buy', qualityScore: 92, analysisSnapshot: 'Sustained GAAP profitability and autonomous vehicle partnership integrations.' },
  { symbol: 'UNH', name: 'UnitedHealth Group Incorporated', exchange: 'NYSE', sector: 'Managed Healthcare & Optum', marketCap: '$540B', pe: 22.5, rating: 'Strong Buy', qualityScore: 95, analysisSnapshot: 'Integrated health insurance and medical services data analytics network scale.' },

  // U - India
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement Limited', exchange: 'NSE', sector: 'Cement Building Materials', marketCap: '₹3.35L Cr', pe: 46.5, rating: 'Strong Buy', qualityScore: 94, analysisSnapshot: 'Undisputed Indian cement leader crossing 150 MTPA capacity with high pricing discipline.' },
  { symbol: 'UPL', name: 'UPL Limited', exchange: 'NSE', sector: 'Agrochemicals & Crop Protection', marketCap: '₹42,000 Cr', pe: 18.0, rating: 'Hold', qualityScore: 83, analysisSnapshot: 'Global agrochemical destocking cycle tapering off towards operational recovery.' },

  // V - US & Global
  { symbol: 'V', name: 'Visa Inc.', exchange: 'NYSE', sector: 'Payment Networks', marketCap: '$560B', pe: 29.2, rating: 'Strong Buy', qualityScore: 97, analysisSnapshot: 'Mission-critical digital payment processing tollbooth with 65%+ operating margins.' },

  // V - India
  { symbol: 'VARUNBEV', name: 'Varun Beverages Limited', exchange: 'NSE', sector: 'Beverage Bottling (PepsiCo)', marketCap: '₹2.10L Cr', pe: 85.0, rating: 'Strong Buy', qualityScore: 94, analysisSnapshot: 'One of PepsiCo’s largest global bottlers expanding rapidly into African and Indian territories.' },
  { symbol: 'VEDL', name: 'Vedanta Limited', exchange: 'NSE', sector: 'Diversified Metals & Mining', marketCap: '₹1.72L Cr', pe: 14.5, rating: 'Buy', qualityScore: 86, analysisSnapshot: 'High dividend payout profile with proposed 6-way corporate demerger catalyst.' },
  { symbol: 'VOLTAS', name: 'Voltas Limited', exchange: 'NSE', sector: 'Air Conditioning & Electro-Mech', marketCap: '₹58,000 Cr', pe: 68.0, rating: 'Hold', qualityScore: 88, analysisSnapshot: 'Leading room air conditioner market share during intense summer heatwaves.' },

  // W - US & Global
  { symbol: 'WMT', name: 'Walmart Inc.', exchange: 'NYSE', sector: 'Omnichannel Retail', marketCap: '$580B', pe: 32.4, rating: 'Strong Buy', qualityScore: 95, analysisSnapshot: 'E-commerce marketplace acceleration and high-margin Walmart Connect advertising scale.' },
  
  // W - India
  { symbol: 'WIPRO', name: 'Wipro Limited', exchange: 'NSE', sector: 'IT Consulting & Services', marketCap: '₹2.85L Cr', pe: 24.2, rating: 'Hold', qualityScore: 88, analysisSnapshot: 'New leadership focus on consulting efficiency and enterprise AI account expansion.' },

  // Z - India
  { symbol: 'ZOMATO', name: 'Zomato Limited', exchange: 'NSE', sector: 'Food Delivery & Quick Commerce', marketCap: '₹2.35L Cr', pe: 145.0, rating: 'Strong Buy', qualityScore: 94, analysisSnapshot: 'Blinkit quick commerce hypergrowth driving explosive revenue and operating leverage.' }
];
