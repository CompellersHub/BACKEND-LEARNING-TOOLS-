import { IQuestion } from "./interface";

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizCategory {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}

// Generate 100 AML questions
export const amlQuestions: IQuestion[] = [];

// Generate remaining 95 AML questions
for (let i = 0; i <= 100; i++) {
  const questionTypes = [
    {
      question: "What does AML stand for?",
      options: [
        "Anti-Money Laundering",
        "Advanced Money Lending",
        "Automated Money Learning",
        "Asset Management Law",
      ],
      correctAnswer: 0,
      explanation:
        "AML stands for Anti-Money Laundering, which refers to laws, regulations, and procedures to prevent criminals from disguising illegally obtained funds as legitimate income.",
    },
    {
      question: "Which of the following is a red flag for money laundering?",
      options: [
        "Large cash deposits without clear source",
        "Regular salary deposits",
        "Online shopping transactions",
        "ATM withdrawals",
      ],
      correctAnswer: 0,
      explanation:
        "Large cash deposits without a clear legitimate source are often considered suspicious and require further investigation.",
    },
    {
      question: "What are the three stages of money laundering?",
      options: [
        "Placement, Layering, Integration",
        "Detection, Prevention, Reporting",
        "Collection, Processing, Distribution",
        "Identification, Verification, Monitoring",
      ],
      correctAnswer: 0,
      explanation:
        "The three stages are: Placement (introducing illegal money into financial system), Layering (complex transfers to obscure origin), Integration (clean money re-enters economy).",
    },
    {
      question: "What is a Suspicious Activity Report (SAR)?",
      options: [
        "A report filed when suspicious activity is detected",
        "A customer background check",
        "A transaction receipt",
        "A compliance audit report",
      ],
      correctAnswer: 0,
      explanation:
        "A SAR is filed by financial institutions to report suspected money laundering or other suspicious activities to authorities.",
    },
    {
      question: "What is the purpose of Customer Due Diligence (CDD)?",
      options: [
        "To verify customer identity and assess risk",
        "To sell products to customers",
        "To process transactions faster",
        "To reduce operational costs",
      ],
      correctAnswer: 0,
      explanation:
        "CDD helps institutions understand their customers, verify identities, and assess the risk of illegal activities.",
    },
    {
      question: `What is the main reason Enhanced Due Diligence (EDD) is applied? (Q${i})`,
      options: [
        "To mitigate risks from high-risk customers",
        "For standard retail customers",
        "To improve customer service",
        "To satisfy marketing regulations",
      ],
      correctAnswer: 0,
      explanation:
        "EDD is applied to mitigate risks from high-risk customers who pose greater potential for money laundering or terrorist financing.",
    },
    {
      question: `Which of the following is NOT typically part of EDD? (Q${i})`,
      options: [
        "Senior management approval",
        "Identifying source of wealth",
        "Lower frequency of monitoring",
        "Additional documentation",
      ],
      correctAnswer: 2,
      explanation:
        "EDD requires MORE frequent monitoring, not lower frequency. It includes senior management approval, additional documentation, and identifying source of wealth.",
    },
    {
      question: `When dealing with a PEP, what step is mandatory under EDD? (Q${i})`,
      options: [
        "Ignore additional checks",
        "Obtain senior management approval",
        "Rely only on third-party reports",
        "Send gifts to build relationship",
      ],
      correctAnswer: 1,
      explanation:
        "Senior management approval is mandatory when establishing or continuing business relationships with Politically Exposed Persons (PEPs).",
    },
    {
      question: `EDD is most likely required in which scenario? (Q${i})`,
      options: [
        "Student bank account",
        "High-value transaction from high-risk country",
        "Utility bill registration",
        "Local grocery store account",
      ],
      correctAnswer: 1,
      explanation:
        "High-value transactions from high-risk countries typically require Enhanced Due Diligence to assess potential money laundering risks.",
    },
  ];

  const questionTemplate = questionTypes[i % questionTypes.length];
  amlQuestions.push({
    quizId: i,
    type: "aml-fundamentals",
    ...questionTemplate,
  });
}

// Generate 100 KYC questions
export const kycQuestions: IQuestion[] = [];

// Generate remaining 95 KYC questions
for (let i = 100; i <= 200; i++) {
  const questionTypes = [
    {
      question: `What does KYC stand for?`,
      options: [
        "Know Your Customer",
        "Keep Your Capital",
        "Key Yield Calculation",
        "Know Your Compliance",
      ],
      correctAnswer: 0,
      explanation:
        "KYC (Know Your Customer) is the process of identifying and verifying customer identities to prevent illegal activities.",
    },
    {
      question: `What is the primary purpose of KYC procedures?`,
      options: [
        "To verify customer identity and assess risk",
        "To increase sales",
        "To reduce paperwork",
        "To speed up transactions",
      ],
      correctAnswer: 0,
      explanation:
        "KYC procedures are designed to verify customer identities and assess the risk of illegal intentions for the business relationship.",
    },
    {
      question: `Which document is typically required for KYC verification?`,
      options: [
        "Shopping receipt",
        "Government-issued ID",
        "Utility bill only",
        "Business card",
      ],
      correctAnswer: 1,
      explanation:
        "Government-issued identification documents are primary requirements for KYC verification to establish customer identity.",
    },
    {
      question: `What is beneficial ownership in KYC context?`,
      options: [
        "Owning bank shares",
        "Ultimate control or ownership of a legal entity",
        "Having multiple accounts",
        "Being a preferred customer",
      ],
      correctAnswer: 1,
      explanation:
        "Beneficial ownership refers to identifying natural persons who ultimately own or control a legal entity or arrangement.",
    },
    {
      question: `How often should KYC information be updated?`,
      options: [
        "Never",
        "Only when requested by customer",
        "Regularly based on risk assessment",
        "Every 10 years",
      ],
      correctAnswer: 2,
      explanation:
        "KYC information should be updated regularly based on the customer's risk profile and regulatory requirements.",
    },
    {
      question: `What is the key component of effective KYC procedures?`,
      options: [
        "Customer identification and verification",
        "Marketing strategies",
        "Product development",
        "Staff training only",
      ],
      correctAnswer: 0,
      explanation:
        "Customer identification and verification is the fundamental component of effective KYC procedures.",
    },
    {
      question: `Which customers require enhanced KYC procedures?`,
      options: [
        "All customers equally",
        "High-risk customers only",
        "Local customers",
        "Small account holders",
      ],
      correctAnswer: 1,
      explanation:
        "High-risk customers, including PEPs and those from high-risk jurisdictions, require enhanced KYC procedures.",
    },
    {
      question: `What is the purpose of ongoing monitoring in KYC?`,
      options: [
        "To annoy customers",
        "To detect changes in risk profile",
        "To increase fees",
        "To generate reports",
      ],
      correctAnswer: 1,
      explanation:
        "Ongoing monitoring helps detect changes in customer risk profiles and ensures compliance with regulatory requirements.",
    },
    {
      question: `Who qualifies as a UBO in KYC context?`,
      options: [
        "Auditor",
        "Compliance Officer",
        "Anyone owning 25% or more of a company",
        "Bank teller",
      ],
      correctAnswer: 2,
      explanation:
        "Ultimate Beneficial Owner (UBO) typically refers to natural persons who ultimately own or control 25% or more of a legal entity.",
    },
  ];

  const questionTemplate = questionTypes[(i - 100) % questionTypes.length];
  kycQuestions.push({
    quizId: i,
    type: "kyc-compliance",
    ...questionTemplate,
  });
}

// Generate 100 Sanctions questions
export const sanctionsQuestions: IQuestion[] = [];

// Generate remaining 95 Sanctions questions
for (let i = 200; i <= 300; i++) {
  const questionTypes = [
    {
      question: `What are economic sanctions?`,
      options: [
        "Trade promotions",
        "Restrictive measures to achieve policy objectives",
        "Investment opportunities",
        "Banking services",
      ],
      correctAnswer: 1,
      explanation:
        "Economic sanctions are restrictive measures imposed by countries or international organizations to achieve foreign policy and security objectives.",
    },
    {
      question: `Which organization maintains the OFAC sanctions list?`,
      options: [
        "European Union",
        "United Nations",
        "US Treasury Department",
        "World Bank",
      ],
      correctAnswer: 2,
      explanation:
        "The Office of Foreign Assets Control (OFAC) is a department of the US Treasury that maintains sanctions lists.",
    },
    {
      question: `What should you do if you find a potential sanctions match?`,
      options: [
        "Ignore it",
        "Process the transaction quickly",
        "Stop and investigate further",
        "Ask the customer directly",
      ],
      correctAnswer: 2,
      explanation:
        "Any potential sanctions match should trigger an immediate stop and thorough investigation before proceeding.",
    },
    {
      question: `What is a false positive in sanctions screening?`,
      options: [
        "A confirmed sanctions hit",
        "A match that turns out to be incorrect",
        "A missed sanctions entry",
        "A system error",
      ],
      correctAnswer: 1,
      explanation:
        "A false positive occurs when the screening system flags a potential match that, after investigation, proves to be incorrect.",
    },
    {
      question: `How frequently should sanctions lists be updated?`,
      options: ["Monthly", "Annually", "Daily or real-time", "When convenient"],
      correctAnswer: 2,
      explanation:
        "Sanctions lists should be updated daily or in real-time as they can change frequently and without advance notice.",
    },
    {
      question: `What is the primary purpose of sanctions screening?`,
      options: [
        "To prevent dealing with sanctioned entities",
        "To increase transaction fees",
        "To slow down transactions",
        "To gather customer data",
      ],
      correctAnswer: 0,
      explanation:
        "The primary purpose of sanctions screening is to prevent financial institutions from dealing with sanctioned individuals or entities.",
    },
    {
      question: `Which type of information is checked during sanctions screening?`,
      options: [
        "Customer preferences",
        "Names and identifying information",
        "Account balances",
        "Transaction history only",
      ],
      correctAnswer: 1,
      explanation:
        "Sanctions screening checks names and identifying information against various sanctions lists and watchlists.",
    },
    {
      question: `What action must be taken when a sanctions hit is confirmed?`,
      options: [
        "Notify the customer immediately",
        "Inform the media",
        "Block the transaction and report to authorities",
        "Continue the transaction",
      ],
      correctAnswer: 2,
      explanation:
        "When a sanctions match is confirmed, the transaction must be blocked immediately and reported to relevant authorities.",
    },
    {
      question: `Which of the following is a type of sanction?`,
      options: [
        "Trade embargo",
        "UN grant",
        "Tax relief",
        "Financial incentive",
      ],
      correctAnswer: 0,
      explanation:
        "A trade embargo is a common type of economic sanction that restricts trade with targeted entities.",
    },
  ];

  const questionTemplate = questionTypes[(i - 200) % questionTypes.length];
  sanctionsQuestions.push({
    quizId: i,
    type: "sanctions-screening",
    ...questionTemplate,
  });
}

// export const quizCategories: QuizCategory[] = [
//   {
//     id: "aml-fundamentals",
//     name: "AML Fundamentals",
//     description:
//       "Core anti-money laundering concepts and regulations (100 questions)",
//     questions: amlQuestions,
//   },
//   {
//     id: "kyc-compliance",
//     name: "KYC Compliance",
//     description:
//       "Know Your Customer procedures and requirements (100 questions)",
//     questions: kycQuestions,
//   },
//   {
//     id: "sanctions-screening",
//     name: "Sanctions Screening",
//     description:
//       "International sanctions and screening processes (100 questions)",
//     questions: sanctionsQuestions,
//   },
// ];
