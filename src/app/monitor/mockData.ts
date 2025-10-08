import { Types } from "mongoose";
import { Alert, IProfile, ITransactions } from "./interface";

// generate user profile
export const generateProfiles = (count: number): IProfile[] => {
  const alertTypes = [
    // Transaction Pattern Alerts
    "Unusual Transaction Size",
    "Rapid Movement of Funds",
    "High-Value Cash Deposits",
    "Structuring",
    "Smurfing",
    "Round Amount Transactions",
    "Multiple Small Credits",

    // Geographic Risk Alerts
    "High Risk Country",
    "Cross-Border Transfers",
    "High-Risk IP Location",

    // Customer Behavior-Based Alerts
    "Dormant Account Reactivation",
    "New Account High Activity",
    "Behavior Deviation",

    // Product or Channel Risk Alerts
    "Multiple Channels Usage",
    "Third-Party Payment Systems",
    "Unusual Product Use",

    // Regulatory and Rule-Based Alerts
    "Threshold Breach",
    "Failed Login Attempts",
    "PEP Match",
    "Sanctions Hit",
    "Adverse Media Match",

    // Suspicious Transfer Methods
    "Back-to-Back Transactions",
    "Shell Company Transfer",
    "Crypto Conversion",

    // Legacy alerts
    "Velocity Check",
    "Layering",
    "Device Anomaly",
    "Frequency Alert",
  ];

  const nationalities = [
    "Afghan",
    "Albanian",
    "Algerian",
    "American",
    "Andorran",
    "Angolan",
    "Argentine",
    "Armenian",
    "Australian",
    "Austrian",
    "Azerbaijani",
    "Bahamian",
    "Bahraini",
    "Bangladeshi",
    "Barbadian",
    "Belarusian",
    "Belgian",
    "Belizean",
    "Beninese",
    "Bhutanese",
    "Bolivian",
    "Bosnian",
    "Botswanan",
    "Brazilian",
    "British",
    "Bruneian",
    "Bulgarian",
    "Burkinabe",
    "Burmese",
    "Burundian",
    "Cambodian",
    "Cameroonian",
    "Canadian",
    "Cape Verdean",
    "Central African",
    "Chadian",
    "Chilean",
    "Chinese",
    "Colombian",
    "Comoran",
    "Congolese",
    "Costa Rican",
    "Croatian",
    "Cuban",
    "Cypriot",
    "Czech",
    "Danish",
    "Djiboutian",
    "Dominican",
    "Dutch",
    "East Timorese",
    "Ecuadorian",
    "Egyptian",
    "Emirati",
    "English",
    "Equatorial Guinean",
    "Eritrean",
    "Estonian",
    "Ethiopian",
    "Fijian",
    "Filipino",
    "Finnish",
    "French",
    "Gabonese",
    "Gambian",
    "Georgian",
    "German",
    "Ghanaian",
    "Greek",
    "Grenadian",
    "Guatemalan",
    "Guinean",
    "Guyanese",
    "Haitian",
    "Honduran",
    "Hungarian",
    "Icelandic",
    "Indian",
    "Indonesian",
    "Iranian",
    "Iraqi",
    "Irish",
    "Israeli",
    "Italian",
    "Ivorian",
    "Jamaican",
    "Japanese",
    "Jordanian",
    "Kazakh",
    "Kenyan",
    "Kiribati",
    "Korean",
    "Kosovar",
    "Kuwaiti",
    "Kyrgyz",
    "Laotian",
    "Latvian",
    "Lebanese",
    "Liberian",
    "Libyan",
    "Liechtensteiner",
    "Lithuanian",
    "Luxembourger",
    "Macedonian",
    "Malagasy",
    "Malawian",
    "Malaysian",
    "Maldivian",
    "Malian",
    "Maltese",
    "Marshallese",
    "Mauritanian",
    "Mauritian",
    "Mexican",
    "Micronesian",
    "Moldovan",
    "Monegasque",
    "Mongolian",
    "Montenegrin",
    "Moroccan",
    "Mozambican",
    "Myanmar",
    "Namibian",
    "Nauruan",
    "Nepalese",
    "Dutch",
    "New Zealander",
    "Nicaraguan",
    "Nigerien",
    "Nigerian",
    "North Korean",
    "Norwegian",
    "Omani",
    "Pakistani",
    "Palauan",
    "Palestinian",
    "Panamanian",
    "Papua New Guinean",
    "Paraguayan",
    "Peruvian",
    "Polish",
    "Portuguese",
    "Qatari",
    "Romanian",
    "Russian",
    "Rwandan",
    "Saint Lucian",
    "Salvadoran",
    "Sammarinese",
    "Saudi Arabian",
    "Scottish",
    "Senegalese",
    "Serbian",
    "Seychellois",
    "Sierra Leonean",
    "Singaporean",
    "Slovak",
    "Slovenian",
    "Solomon Islander",
    "Somali",
    "South African",
    "South Korean",
    "Spanish",
    "Sri Lankan",
    "Sudanese",
    "Surinamese",
    "Swazi",
    "Swedish",
    "Swiss",
    "Syrian",
    "Taiwanese",
    "Tajik",
    "Tanzanian",
    "Thai",
    "Togolese",
    "Tongan",
    "Trinidadian",
    "Tobagonian",
    "Tunisian",
    "Turkish",
    "Turkmen",
    "Tuvaluan",
    "Ugandan",
    "Ukrainian",
    "Uruguayan",
    "Uzbek",
    "Vanuatuan",
    "Venezuelan",
    "Vietnamese",
    "Welsh",
    "Yemeni",
    "Zambian",
    "Zimbabwean",
  ];

  const customers = [
    "Sarah Johnson",
    "Michael Chen",
    "Elena Rodriguez",
    "James Wilson",
    "Priya Patel",
    "Ahmed Hassan",
    "Lisa Anderson",
    "David Kim",
    "Roberto Silva",
    "Fatima Al-Zahra",
    "Viktor Petrov",
    "Aisha Okafor",
    "Zhang Wei",
    "Maria Gonzalez",
    "John Smith",
    "Amara Okonkwo",
    "Pierre Dubois",
    "Yuki Tanaka",
    "Omar Al-Rashid",
    "Anna Kowalski",
  ];

  const locations = [
    "New York, NY",
    "London, UK",
    "Singapore",
    "Hong Kong",
    "Dubai, UAE",
    "Miami, FL",
    "Geneva, CH",
    "Panama City, PA",
    "Moscow, RU",
    "Lagos, NG",
    "Mumbai, IN",
    "Cayman Islands",
    "Zurich, CH",
    "Frankfurt, DE",
    "Tokyo, JP",
    "Sydney, AU",
    "Luxembourg",
    "Monaco",
    "Liechtenstein",
    "Andorra",
  ];

  const accountTypes = [
    "Personal",
    "Business",
    "Premium",
    "Corporate",
    "PEP",
    "High-Risk",
    "Dormant",
    "New",
  ];
  const accountNumbers = Array.from(
    { length: 20 },
    () =>
      "GB" +
      Array.from({ length: 20 }, () => Math.floor(Math.random() * 10)).join("")
  );
  const identities = [
    "UK Passport (No: 987654321)",
    "Driver's License (No: A1234567)",
    "National ID Card (No: 543210987)",
  ];
  const addresses = [
    "Council Tax Bill - Westminster Council",
    "Utility Bill - Camden Borough",
    "Bank Statement - Barclays",
  ];
  const occupations = [
    "Investment Fund Manager",
    "Financial Analyst",
    "Wealth Advisor",
    "Portfolio Manager",
  ];
  const businessActivities = [
    "Alternative Investment Management",
    "Equity Trading",
    "Bond Trading",
    "Hedge Fund Management",
  ];
  const customerTypes = [
    "High Net Worth Individual (HNWI)",
    "Ultra High Net Worth Individual (UHNWI)",
  ];
  const sourcesOfFunds = [
    "Employment income",
    "Investment returns",
    "Real estate sales",
    "Inheritance",
  ];
  const sourcesOfWealth = [
    "Inherited assets",
    "Professional earnings",
    "Real estate holdings",
    "Business profits",
  ];
  const riskRatings = ["Low", "Medium", "Medium-High", "High"];
  const riskReasons = [
    "Frequent international transactions",
    "High transaction volume",
    "Complex investment portfolio",
    "Exposure to volatile markets",
  ];

  const volumes = [
    "£150,000 - £300,000 monthly",
    "£200,000 - £400,000 monthly",
    "£100,000 - £250,000 monthly",
  ];
  const frequencies = [
    "20-30 transactions per month",
    "10-20 transactions per month",
    "30-50 transactions per month",
  ];
  const jurisdictionsList = [
    ["UK", "EU", "Switzerland", "Singapore"],
    ["UK", "Germany", "US", "Canada"],
    ["Switzerland", "Singapore", "Hong Kong", "UAE"],
  ];
  const counterpartiesList = [
    ["Investment Firms", "Private Banks", "Corporate Entities"],
    ["Insurance Companies", "Fintechs", "Family Offices"],
    ["Regulated Funds", "Trusts", "SPVs"],
  ];
  const purposes = [
    "Investment management",
    "Personal banking",
    "Asset diversification",
    "Wealth preservation",
  ];
  const countries = ["United Kingdom", "Switzerland", "Singapore", "Germany"];
  const transactionCountriesList = [
    ["UK", "Switzerland", "Germany"],
    ["Singapore", "Hong Kong", "UAE"],
    ["UK", "US", "Canada"],
  ];
  const citizenships = ["None", "Dual UK/Singapore"];
  const linkedJurisdictionsList = [
    ["London Branch (Primary)", "Geneva (Occasional)"],
    ["Singapore Office", "Dubai Branch"],
    ["New York Branch", "Tokyo Office"],
  ];
  const channels = [
    "Branch referral",
    "Online application",
    "Advisor referral",
  ];
  const dateOfBirths = [
    "1985-07-22",
    "1945-05-22",
    "1980-01-25",
    "1985-09-02",
    "1985-03-28",
    "1985-02-05",
    "1985-07-22",
    "1985-06-28",
    "1984-07-29",
    "1986-10-20",
    "1988-12-20",
    "1981-03-19",
    "1989-01-25",
    "1988-01-10",
    "1975-08-15",
    "1995-07-20",
    "1945-03-23",
    "1965-06-06",
    "1966-09-12",
    "1990-12-14",
  ];

  return Array.from({ length: count }, (_, i) => {
    const accountNumber = accountNumbers[i % accountNumbers.length];
    const proofOfIdentity =
      identities[Math.floor(Math.random() * identities.length)];
    const proofOfAddress =
      addresses[Math.floor(Math.random() * addresses.length)];
    const occupation =
      occupations[Math.floor(Math.random() * occupations.length)];
    const businessActivity =
      businessActivities[Math.floor(Math.random() * businessActivities.length)];
    const customerType =
      customerTypes[Math.floor(Math.random() * customerTypes.length)];
    const sourceOfFunds =
      sourcesOfFunds[Math.floor(Math.random() * sourcesOfFunds.length)];
    const sourceOfWealth =
      sourcesOfWealth[Math.floor(Math.random() * sourcesOfWealth.length)];
    // const sourceOfWealth = [
    //   ...new Set([
    //     sourcesOfWealth[Math.floor(Math.random() * sourcesOfWealth.length)],
    //     sourcesOfWealth[Math.floor(Math.random() * sourcesOfWealth.length)],
    //   ]),
    // ];
    const riskRating =
      riskRatings[Math.floor(Math.random() * riskRatings.length)];
    const riskReason =
      riskReasons[Math.floor(Math.random() * riskReasons.length)];
    const expectedVolume = volumes[Math.floor(Math.random() * volumes.length)];
    const expectedFrequency =
      frequencies[Math.floor(Math.random() * frequencies.length)];
    const anticipatedJurisdictions =
      jurisdictionsList[Math.floor(Math.random() * jurisdictionsList.length)];
    const anticipatedCounterparties =
      counterpartiesList[Math.floor(Math.random() * counterpartiesList.length)];
    const accountPurpose =
      purposes[Math.floor(Math.random() * purposes.length)];
    const countryOfResidence =
      countries[Math.floor(Math.random() * countries.length)];
    const expectedTransactionCountries =
      transactionCountriesList[
        Math.floor(Math.random() * transactionCountriesList.length)
      ];
    const dualCitizenship =
      citizenships[Math.floor(Math.random() * citizenships.length)];
    const linkedJurisdictions =
      linkedJurisdictionsList[
        Math.floor(Math.random() * linkedJurisdictionsList.length)
      ];
    const onboardingChannel =
      channels[Math.floor(Math.random() * channels.length)];

    const type = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const dateOfBirth =
      dateOfBirths[Math.floor(Math.random() * customers.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const nationality =
      nationalities[Math.floor(Math.random() * nationalities.length)];
    const accountType =
      accountTypes[Math.floor(Math.random() * accountTypes.length)];

    // Adjust amounts based on alert type
    let amount: number;
    if (["High-Value Cash Deposits", "Threshold Breach"].includes(type)) {
      amount = Math.floor(Math.random() * 500000) + 10000; // £10k+
    } else if (["Structuring", "Smurfing"].includes(type)) {
      amount = Math.floor(Math.random() * 9000) + 1000; // Just under £10k
    } else if (type === "Round Amount Transactions") {
      const roundAmounts = [1000, 5000, 10000, 25000, 50000, 100000];
      amount = roundAmounts[Math.floor(Math.random() * roundAmounts.length)];
    } else {
      amount = Math.floor(Math.random() * 250000) + 500;
    }

    const customerId = `CUST-${Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, "0")}`;

    return {
      id: `ALT-${String(i + 1).padStart(6, "0")}`,
      fullName: customer,
      aliases: [customer],
      dateOfBirth,
      nationality,
      customerId,
      accountNumber,
      proofOfIdentity,
      proofOfAddress,
      occupation,
      businessActivity,
      customerType,
      sourceOfFunds,
      sourceOfWealth,
      riskRating,
      riskReason,

      // Business/Corporate Data (applicable for business customers)
      legalStructure: "N/A - Personal Account",
      registeredAddress: "N/A",
      directors: "N/A",
      beneficialOwners: "N/A",
      natureOfBusiness: "N/A",
      sicCodes: "N/A",
      corporateWebsite: "N/A",

      // Expected Account Activity
      expectedVolume,
      expectedFrequency,
      typicalTransactionTypes: [
        "Wire Transfers",
        "Investment Trades",
        "Salary Credits",
      ],
      anticipatedJurisdictions,
      anticipatedCounterparties,
      accountPurpose,

      // Geographic Information
      countryOfResidence,
      expectedTransactionCountries,
      dualCitizenship,
      linkedJurisdictions,

      // Account History
      openingDate: "2019-03-15",
      onboardingChannel,
      joinDate: "2019-03-15",
      riskScore: Math.floor(Math.random() * 100) + 1,
      location,
      accountType,
      totalTransactions: 1247,
      averageMonthly: 185000,

      // Risk and Watchlist Indicators
      pepStatus: "No",
      sanctionsFlags: "None",
      adverseMedia: "None",
      sarHistory: "No previous SARs",
      internalWatchlist: "Enhanced Monitoring - High Value",

      behaviorChanges: [
        {
          date: "2024-01-01",
          change: "50% increase in international wire transfers",
          riskImpact: "Medium",
        },
        {
          date: "2023-11-15",
          change: "New counterparty in Singapore added",
          riskImpact: "Low",
        },
        {
          date: "2023-09-22",
          change: "Investment activity increased significantly",
          riskImpact: "Medium",
        },
      ],
    };
  });
};

// generate recent transaction
export const generateCustomerHistory = (
  count: number,
  customerId: Types.ObjectId
): ITransactions[] => {
  const transactionTypes = [
    "Wire Transfer",
    "ACH Transfer",
    "Check Deposit",
    "Cash Deposit",
    "Card Payment",
    "Crypto Exchange",
  ];
  const statuses = ["Completed", "Pending", "Flagged", "Reversed"];

  return Array.from({ length: count }, (_, i) => ({
    id: `TXN-${Math.random().toString(36).substr(2, 9)}`,
    date: new Date(
      Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
    amount: Math.floor(Math.random() * 50000) + 100,
    type: transactionTypes[Math.floor(Math.random() * transactionTypes.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    counterparty: `Entity-${Math.floor(Math.random() * 1000)}`,
    riskScore: Math.floor(Math.random() * 100),
    flagged: Math.random() < 0.2,
    transactionType: "recent",
    customer: customerId,
  }));
};

// generate two years history
export function generateTwoYearHistory(
  customerId: Types.ObjectId
): ITransactions[] {
  const transactions = [];
  const transactionTypes = [
    "Salary Credit",
    "Investment Transfer",
    "Wire Transfer",
    "Investment Redemption",
    "Property Transaction",
    "Dividend Payment",
    "Interest Credit",
    "ATM Withdrawal",
    "Card Payment",
    "Standing Order",
    "Direct Debit",
    "International Transfer",
    "Cash Deposit",
    "Cash Withdrawal",
    "Cheque Deposit",
    "Investment Purchase",
    "Currency Exchange",
    "Loan Repayment",
    "Insurance Premium",
    "Tax Payment",
  ];

  const counterparties = [
    "Henderson Global Investors",
    "Zurich Private Bank",
    "Singapore Investment Corp",
    "BlackRock Funds",
    "Knight Frank LLP",
    "UBS Wealth Management",
    "Credit Suisse",
    "Deutsche Bank",
    "HSBC Private Bank",
    "Barclays Investment",
    "JP Morgan",
    "Goldman Sachs",
    "Morgan Stanley",
    "Vanguard",
    "Fidelity International",
    "Tesco PLC",
    "Amazon UK",
    "British Gas",
    "Thames Water",
    "Council Tax",
    "HMRC",
    "John Lewis",
    "Marks & Spencer",
    "Waitrose",
    "Selfridges",
    "Property Investment Ltd",
    "London Property Co",
    "Mayfair Estates",
  ];

  const jurisdictions = [
    "UK",
    "Switzerland",
    "Germany",
    "Singapore",
    "Luxembourg",
    "Monaco",
    "Jersey",
    "USA",
  ];
  const statuses = ["Completed", "Pending", "Flagged", "Cancelled"];

  // Generate transactions for last 2 years
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 2);
  const startTime = startDate.getTime();
  const twoYearsInMs = 2 * 365 * 24 * 60 * 60 * 1000;

  // function getRandomDateBetween(startYear = 2022, endYear = 2024) {
  //   const start = new Date(`${startYear}-01-01`).getTime();
  //   const end = new Date(`${endYear}-12-31`).getTime();
  //   const randomTime = start + Math.random() * (end - start);
  //   return new Date(randomTime);
  // }

  for (let i = 0; i < 486; i++) {
    // ~20 transactions per month for 24 months
    const transactionDate = new Date(startTime + Math.random() * twoYearsInMs);
    const type =
      transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
    const counterparty =
      counterparties[Math.floor(Math.random() * counterparties.length)];
    const jurisdiction =
      jurisdictions[Math.floor(Math.random() * jurisdictions.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    // Generate realistic amounts based on transaction type
    let amount;
    if (type === "Salary Credit") {
      amount = Math.floor(Math.random() * 5000) + 8000; // £8k-£13k
    } else if (type.includes("Investment")) {
      amount = Math.floor(Math.random() * 200000) + 10000; // £10k-£210k
    } else if (type === "Property Transaction") {
      amount = Math.floor(Math.random() * 500000) + 50000; // £50k-£550k
    } else if (type.includes("ATM") || type.includes("Card")) {
      amount = Math.floor(Math.random() * 500) + 20; // £20-£520
    } else {
      amount = Math.floor(Math.random() * 50000) + 100; // £100-£50k
    }

    transactions.push({
      id: `TXN-${Math.random().toString(36).substr(2, 9)}`,
      date: transactionDate.toLocaleDateString("en-GB"),
      amount,
      type,
      counterparty,
      status,
      jurisdiction,
      reference: `REF-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      channel: [
        "Online Banking",
        "Mobile App",
        "Branch",
        "ATM",
        "Phone Banking",
      ][Math.floor(Math.random() * 5)],
      riskScore: Math.floor(Math.random() * 100) + 1,
      flagged: Math.random() < 0.05, // 5% flagged
      customer: customerId,
      transactionType: "years",
      createdAt: new Date(startTime + Math.random() * twoYearsInMs),
      updatedAt: new Date(startTime + Math.random() * twoYearsInMs),
    });
  }

  // Sort by date (most recent first)
  return transactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// generate alert
export const generateMockAlerts = (
  count: number = 10000,
  user: { name: string; id: Types.ObjectId }[],
  name: string[]
): Alert[] => {
  const alertTypes = [
    // Transaction Pattern Alerts
    "Unusual Transaction Size",
    "Rapid Movement of Funds",
    "High-Value Cash Deposits",
    "Structuring",
    "Smurfing",
    "Round Amount Transactions",
    "Multiple Small Credits",

    // Geographic Risk Alerts
    "High Risk Country",
    "Cross-Border Transfers",
    "High-Risk IP Location",

    // Customer Behavior-Based Alerts
    "Dormant Account Reactivation",
    "New Account High Activity",
    "Behavior Deviation",

    // Product or Channel Risk Alerts
    "Multiple Channels Usage",
    "Third-Party Payment Systems",
    "Unusual Product Use",

    // Regulatory and Rule-Based Alerts
    "Threshold Breach",
    "Failed Login Attempts",
    "PEP Match",
    "Sanctions Hit",
    "Adverse Media Match",

    // Suspicious Transfer Methods
    "Back-to-Back Transactions",
    "Shell Company Transfer",
    "Crypto Conversion",

    // Legacy alerts
    "Velocity Check",
    "Layering",
    "Device Anomaly",
    "Frequency Alert",
  ];

  const severities = ["High", "Medium", "Low"];

  const locations = [
    "New York, NY",
    "London, UK",
    "Singapore",
    "Hong Kong",
    "Dubai, UAE",
    "Miami, FL",
    "Geneva, CH",
    "Panama City, PA",
    "Moscow, RU",
    "Lagos, NG",
    "Mumbai, IN",
    "Cayman Islands",
    "Zurich, CH",
    "Frankfurt, DE",
    "Tokyo, JP",
    "Sydney, AU",
    "Luxembourg",
    "Monaco",
    "Liechtenstein",
    "Andorra",
  ];
  const counterparties = [
    "Henderson Global Investors",
    "Zurich Private Bank",
    "Singapore Investment Corp",
    "BlackRock Funds",
    "Knight Frank LLP",
    "UBS Wealth Management",
    "Credit Suisse",
    "Deutsche Bank",
    "HSBC Private Bank",
    "Barclays Investment",
    "JP Morgan",
    "Goldman Sachs",
    "Morgan Stanley",
    "Vanguard",
    "Fidelity International",
    "Tesco PLC",
    "Amazon UK",
    "British Gas",
    "Thames Water",
    "Council Tax",
    "HMRC",
    "John Lewis",
    "Marks & Spencer",
    "Waitrose",
    "Selfridges",
    "Property Investment Ltd",
    "London Property Co",
    "Mayfair Estates",
  ];

  const accountTypes = [
    "Personal",
    "Business",
    "Premium",
    "Corporate",
    "PEP",
    "High-Risk",
    "Dormant",
    "New",
  ];
  const monitoringTypes = ["Real-time", "Batch", "Post-transaction"];

  const riskFactors = {
    "Unusual Transaction Size": [
      "Transaction amount 500% above customer average",
      "Single transaction exceeds annual income declared",
      "Amount inconsistent with business type",
      "Sudden spike in transaction values",
    ],
    "Rapid Movement of Funds": [
      "Multiple credits followed by immediate debits",
      "Fund movement within 24-hour window",
      "Sequential transfers across multiple accounts",
      "Rapid clearing of incoming funds",
    ],
    "High-Value Cash Deposits": [
      "Cash deposit over £10,000 threshold",
      "Multiple cash deposits in short timeframe",
      "Cash activity inconsistent with declared income",
      "Business account with excessive cash deposits",
    ],
    Structuring: [
      "Multiple transactions just under £10,000",
      "Systematic deposit splitting detected",
      "Pattern consistent with threshold avoidance",
      "Coordinated transactions across locations",
    ],
    Smurfing: [
      "Multiple individuals making similar deposits",
      "Coordinated deposit pattern detected",
      "Network of related depositors identified",
      "Similar timing across multiple accounts",
    ],
    "Round Amount Transactions": [
      "Frequent exact round-number transactions",
      "Pattern of £1,000, £5,000, £10,000 amounts",
      "Artificial transaction structuring detected",
      "Business type inconsistent with round amounts",
    ],
    "Multiple Small Credits": [
      "Numerous small credits followed by large debit",
      "Potential fund pooling activity detected",
      "Aggregation of illicit proceeds suspected",
      "Credit pattern inconsistent with business model",
    ],
    "High Risk Country": [
      "Transaction originated from FATF blacklisted country",
      "Beneficiary in non-cooperative jurisdiction",
      "Routing through sanctioned territory",
      "High-risk geography per OFSI guidance",
    ],
    "Cross-Border Transfers": [
      "Frequent transfers to secrecy jurisdictions",
      "Multiple cross-border transactions daily",
      "Transfers to known tax havens",
      "Pattern suggesting capital flight",
    ],
    "High-Risk IP Location": [
      "Login from high-risk IP address",
      "Geographic inconsistency with profile",
      "VPN or proxy usage detected",
      "IP location flagged by intelligence services",
    ],
    "Dormant Account Reactivation": [
      "Account inactive for 12+ months suddenly active",
      "High-value transactions after dormancy",
      "Profile changes following reactivation",
      "Suspicious timing of account revival",
    ],
    "New Account High Activity": [
      "Large transactions within days of opening",
      "Activity level inconsistent with stated purpose",
      "Rapid escalation in transaction values",
      "KYC documentation quality concerns",
    ],
    "Behavior Deviation": [
      "Activity inconsistent with declared occupation",
      "Transaction pattern changed dramatically",
      "Source of funds not matching profile",
      "Risk assessment requires updating",
    ],
    "Multiple Channels Usage": [
      "ATM + online + mobile within minutes",
      "Simultaneous access from different locations",
      "Unusual multi-channel transaction pattern",
      "Potential account compromise indicators",
    ],
    "Third-Party Payment Systems": [
      "Transactions through unregulated fintech",
      "E-wallet transfers to high-risk entities",
      "Payment aggregator red flags",
      "Non-bank payment service concerns",
    ],
    "Unusual Product Use": [
      "Business account used for personal transactions",
      "Investment account used for trading operations",
      "Product usage outside intended purpose",
      "Terms of service violations detected",
    ],
    "Threshold Breach": [
      "Transaction exceeds £10,000 cash reporting limit",
      "Multiple threshold-approaching transactions",
      "CTR filing requirements triggered",
      "MLR 2017 reporting obligations activated",
    ],
    "Failed Login Attempts": [
      "Multiple failed authentication attempts",
      "Brute force attack pattern detected",
      "Suspicious login behavior flagged",
      "Account security compromise suspected",
    ],
    "PEP Match": [
      "Customer matches Politically Exposed Person database",
      "Enhanced due diligence requirements triggered",
      "High-profile government official identified",
      "Family member of known PEP detected",
    ],
    "Sanctions Hit": [
      "Entity appears on OFAC sanctions list",
      "OFSI consolidated list match confirmed",
      "UN Security Council sanctions applicable",
      "EU restrictive measures triggered",
    ],
    "Adverse Media Match": [
      "Negative news coverage identified",
      "Criminal investigation reports found",
      "Regulatory enforcement actions reported",
      "Reputational risk factors elevated",
    ],
    "Back-to-Back Transactions": [
      "Identical amounts in and out within hours",
      "Mirror transactions with minimal time gap",
      "Potential trade-based money laundering",
      "Layering scheme characteristics",
    ],
    "Shell Company Transfer": [
      "Beneficiary entity lacks business substance",
      "Dormant company suddenly receiving funds",
      "Shell corporation red flags identified",
      "Beneficial ownership obscured",
    ],
    "Crypto Conversion": [
      "Conversion to privacy coins detected",
      "Cryptocurrency mixer usage identified",
      "Anonymous wallet transactions flagged",
      "Digital asset regulatory concerns",
    ],
  };

  const descriptions = {
    "Unusual Transaction Size":
      "Transaction amount significantly deviates from customer's established pattern and risk profile.",
    "Rapid Movement of Funds":
      "Multiple credits followed by immediate debits suggesting potential fund movement scheme.",
    "High-Value Cash Deposits":
      "Large cash deposits inconsistent with customer profile and declared income source.",
    Structuring:
      "Multiple transactions designed to avoid regulatory reporting thresholds under MLR 2017.",
    Smurfing:
      "Coordinated deposit activity across multiple individuals suggesting organized layering scheme.",
    "Round Amount Transactions":
      "Frequent exact round-number transactions inconsistent with genuine business activity.",
    "Multiple Small Credits":
      "Pattern of small credits followed by large debits suggesting fund aggregation activity.",
    "High Risk Country":
      "Transaction involves jurisdiction classified as high-risk per FATF or OFSI guidance.",
    "Cross-Border Transfers":
      "Frequent international transfers to secrecy jurisdictions raising capital flight concerns.",
    "High-Risk IP Location":
      "Transaction initiated from IP address flagged as high-risk or inconsistent with profile.",
    "Dormant Account Reactivation":
      "Previously inactive account suddenly showing high-value transaction activity.",
    "New Account High Activity":
      "Recently opened account showing transaction patterns inconsistent with stated purpose.",
    "Behavior Deviation":
      "Customer activity significantly deviates from established risk profile and KYC data.",
    "Multiple Channels Usage":
      "Simultaneous usage of multiple banking channels suggesting potential compromise.",
    "Third-Party Payment Systems":
      "Transactions through unregulated fintech or e-wallet systems raising oversight concerns.",
    "Unusual Product Use":
      "Account or product usage outside intended purpose per terms and conditions.",
    "Threshold Breach":
      "Transaction exceeds regulatory reporting thresholds requiring CTR or SAR consideration.",
    "Failed Login Attempts":
      "Multiple failed authentication attempts suggesting potential account compromise.",
    "PEP Match":
      "Customer profile matches against politically exposed persons database requiring enhanced due diligence.",
    "Sanctions Hit":
      "Transaction involves entity or individual on current OFAC, OFSI, or UN sanctions lists.",
    "Adverse Media Match":
      "Customer associated with negative media coverage raising reputational and compliance risks.",
    "Back-to-Back Transactions":
      "Mirror transactions with minimal time gaps suggesting potential layering scheme.",
    "Shell Company Transfer":
      "Transaction involves entity lacking business substance or beneficial ownership transparency.",
    "Crypto Conversion":
      "Cryptocurrency transactions involving privacy coins, mixers, or anonymous wallets.",
  };

  return Array.from({ length: count }, (_, i) => {
    const type = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const customer = name[Math.floor(Math.random() * name.length)];
    const userId = user.find((value) => value.name === customer);
    const location = locations[Math.floor(Math.random() * locations.length)];
    const accountType =
      accountTypes[Math.floor(Math.random() * accountTypes.length)];
    const monitoringType =
      monitoringTypes[Math.floor(Math.random() * monitoringTypes.length)];

    // Adjust amounts based on alert type
    let amount;
    if (["High-Value Cash Deposits", "Threshold Breach"].includes(type)) {
      amount = Math.floor(Math.random() * 500000) + 10000; // £10k+
    } else if (["Structuring", "Smurfing"].includes(type)) {
      amount = Math.floor(Math.random() * 9000) + 1000; // Just under £10k
    } else if (type === "Round Amount Transactions") {
      const roundAmounts = [1000, 5000, 10000, 25000, 50000, 100000];
      amount = roundAmounts[Math.floor(Math.random() * roundAmounts.length)];
    } else {
      amount = Math.floor(Math.random() * 250000) + 500;
    }

    const customerId = `CUST-${Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, "0")}`;

    const transactionReference = `TXN-${Math.floor(Math.random() * 100000)
      .toString()
      .padStart(8, "0")}`;

    return {
      id: `ALT-${String(i + 1).padStart(6, "0")}`,
      type,
      severity,
      customer,
      customerId,
      userId: userId.id,
      amount,
      timestamp: new Date(
        Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
      location,
      accountType,
      monitoringType,
      riskScore: Math.floor(Math.random() * 100) + 1,
      riskFactors: riskFactors[type] || riskFactors["Structuring"],
      description:
        descriptions[type] ||
        "Suspicious activity detected requiring investigation.",
      status: "Open",
      aiScore: Math.floor(Math.random() * 100) + 1,
      deviceFingerprint: `DEV-${Math.random().toString(36).substr(2, 9)}`,
      geoLocation: location,
      relatedAlerts: Math.floor(Math.random() * 5),
      investigationNotes: [],
      escalationLevel:
        severity === "High"
          ? "Senior Analyst"
          : severity === "Medium"
          ? "Analyst"
          : "Junior Analyst",
      transactionReference,
      counterparty: counterparties[i],
      transactionDetails: "SWIFT: DEUTGB2L",
      cleared: new Date(),
    };
  });
};
