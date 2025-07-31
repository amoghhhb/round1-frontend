const questions = [
  {
    question: "Who invented the World Wide Web?",
    options: ["Tim Berners-Lee", "Steve Jobs", "Mark Zuckerberg", "Bill Gates"],
    correctAnswer: "Tim Berners-Lee",
  },
  {
    question: "What does URL stand for?",
    options: ["Uniform Recording Level", "Uniform Resource Locator", "United Resource Location", "Universal Record Link"],
    correctAnswer: "Uniform Resource Locator",
  },
  {
    question: "Which tag is used in HTML to insert an image?",
    options: ["<img>", "<src>", "<picture>", "<image>"],
    correctAnswer: "<img>",
  },
  {
    question: "What does “phishing” mean in cybersecurity?",
    options: ["Hacking Wi-Fi", "Cleaning your hard drive", "Stealing data through fake websites", "Encrypting files"],
    correctAnswer: "Stealing data through fake websites",
  },
  {
    question: "Firewall is used to:",
    options: ["Store cookies", "Block unauthorized access", "Boost internet speed", "Encrypt emails"],
    correctAnswer: "Block unauthorized access",
  },
  {
    question: "What is two-factor authentication?",
    options: ["A password plus another verification", "A backup password", "Using two browsers", "Disabling login"],
    correctAnswer: "A password plus another verification",
  },
  {
    question: "What is the use of Git?",
    options: ["Code version control", "Compress files", "Scan viruses", "Design graphics"],
    correctAnswer: "Code version control",
  },
  {
    question: "What is the function of the browser cache?",
    options: ["Protect from phishing", "Store frequently accessed data to improve speed", "Monitor web traffic", "Store passwords"],
    correctAnswer: "Store frequently accessed data to improve speed",
  },
  {
    question: "What does \"CAPTCHA\" stand for?",
    options: [
      "Completely Automated Public Turing test to tell Computers and Humans Apart",
      "Computer-Aided Picture Testing Challenge & Human Authentication",
      "Controlled Access Protocol for Text and Character Handling",
      "Coded Algorithm Programmed To Check Human Actions",
    ],
    correctAnswer: "Completely Automated Public Turing test to tell Computers and Humans Apart",
  },
  {
    question: "Which programming language has a logo that resembles a coffee cup?",
    options: ["Java", "C++", "Python", "Ruby"],
    correctAnswer: "Java",
  },
];

export default questions;

/**
 * If you want to randomize the options every time your app runs,
 * you can use a function like this to shuffle the array in place.
 *
 * The Fisher-Yates (aka Knuth) Shuffle algorithm.
 */
/*
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

// You would then map over your questions and shuffle the options for each one.
const randomizedQuestions = questions.map(q => {
  // Create a copy to avoid modifying the original options array directly
  const shuffledOptions = [...q.options];
  shuffleArray(shuffledOptions);
  return { ...q, options: shuffledOptions };
});

export default randomizedQuestions;
*/