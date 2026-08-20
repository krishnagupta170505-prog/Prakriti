import { Question } from '../types';

export const QUEST_QUESTIONS: Question[] = [
  {
    id: 1,
    category: "When You're Alone",
    scenario: "When you're alone and have nothing to do, what usually happens?",
    icon: "psychology",
    choices: [
      {
        text: "My mind starts going everywhere. I think about random things, get new ideas, or suddenly want to do something.",
        weights: { vata: 3, pitta: 1, kapha: 0 },
        observation: "You have an active, imaginative mind that naturally sparks with creative ideas when you have free time.",
      },
      {
        text: "I usually start doing something useful or something I've been wanting to finish.",
        weights: { vata: 0, pitta: 3, kapha: 1 },
        observation: "You are naturally driven to make your downtime productive and finish tasks on your list.",
      },
      {
        text: "I enjoy relaxing. Give me my bed, music, food, and some peace.",
        weights: { vata: 0, pitta: 0, kapha: 3 },
        observation: "You deeply cherish quiet downtime and recharge with peaceful comfort.",
      },
    ],
  },
  {
    id: 2,
    category: "At Night",
    scenario: "You are in bed, but you're not sleepy yet. What happens?",
    icon: "bedtime",
    choices: [
      {
        text: "I start thinking about everything — old memories, tomorrow, random things... basically everything.",
        weights: { vata: 3, pitta: 1, kapha: 0 },
        observation: "Your thoughts wander broadly across memories, future plans, and spontaneous curiosity at night.",
      },
      {
        text: "I start thinking about things I need to do or problems I need to solve.",
        weights: { vata: 1, pitta: 3, kapha: 0 },
        observation: "You like processing practical plans and solving pending problems in your head.",
      },
      {
        text: "I usually just relax. If I'm tired, I'll probably fall asleep soon.",
        weights: { vata: 0, pitta: 0, kapha: 3 },
        observation: "You can ease into restful stillness without letting racing thoughts keep you awake.",
      },
    ],
  },
  {
    id: 3,
    category: "When Someone Hurts You",
    scenario: "Someone close to you says something that really hurts you. What do you usually do?",
    icon: "sentiment_dissatisfied",
    choices: [
      {
        text: "I keep thinking about it and wondering, 'Why did they say that?'",
        weights: { vata: 3, pitta: 0, kapha: 1 },
        observation: "You reflect deeply on emotional interactions and replay conversations to understand them.",
      },
      {
        text: "I want to talk about it and know exactly what happened.",
        weights: { vata: 0, pitta: 3, kapha: 0 },
        observation: "You prefer direct clarity and addressing conflicts head-on rather than letting them linger.",
      },
      {
        text: "I usually stay quiet and take some time for myself.",
        weights: { vata: 1, pitta: 0, kapha: 3 },
        observation: "You process hurt feelings quietly in your own space before responding.",
      },
    ],
  },
  {
    id: 4,
    category: "Surprise Money",
    scenario: "You suddenly get ₹2,000 that you don't need right now. What would you most likely do?",
    icon: "payments",
    choices: [
      {
        text: "Buy something I've suddenly wanted or spend it on something fun.",
        weights: { vata: 3, pitta: 0, kapha: 0 },
        observation: "You enjoy spontaneous treats and using unexpected windfalls for immediate joy.",
      },
      {
        text: "Think carefully about what would be the best use of the money.",
        weights: { vata: 0, pitta: 3, kapha: 1 },
        observation: "You are intentional and strategic about optimizing your resources.",
      },
      {
        text: "Save it. I might need it later.",
        weights: { vata: 0, pitta: 1, kapha: 3 },
        observation: "You have a natural sense of security and prudence with savings.",
      },
    ],
  },
  {
    id: 5,
    category: "Your Perfect Free Day",
    scenario: "Imagine tomorrow is completely free. No work. No responsibilities. What sounds best?",
    icon: "wb_sunny",
    choices: [
      {
        text: "Let's go somewhere! Meet people, explore, try something new — we'll decide along the way.",
        weights: { vata: 3, pitta: 1, kapha: 0 },
        observation: "You love spontaneous adventures, new environments, and free-flowing exploration.",
      },
      {
        text: "I'll make a plan, do something I've been wanting to do, and make the day count.",
        weights: { vata: 1, pitta: 3, kapha: 0 },
        observation: "You like making your free time purposeful and executing plans that matter to you.",
      },
      {
        text: "Honestly? A good sleep, good food, my favourite people and a peaceful day sounds perfect.",
        weights: { vata: 0, pitta: 0, kapha: 3 },
        observation: "You thrive when surrounded by warmth, comfort, nourishing food, and cherished loved ones.",
      },
    ],
  },
  {
    id: 6,
    category: "When Everything Goes Wrong",
    scenario: "You've had a really bad week. What's the first thing you usually do?",
    icon: "bolt",
    choices: [
      {
        text: "My mind gets busy. I start thinking about everything at once.",
        weights: { vata: 3, pitta: 0, kapha: 0 },
        observation: "Under stress, your mind can feel overstimulated with many thoughts racing simultaneously.",
      },
      {
        text: "I want to fix the problem immediately. I don't like leaving things unresolved.",
        weights: { vata: 0, pitta: 3, kapha: 0 },
        observation: "You are a proactive problem solver who dislikes lingering unresolved situations.",
      },
      {
        text: "I just want to switch off for a while and stay away from unnecessary things.",
        weights: { vata: 0, pitta: 0, kapha: 3 },
        observation: "Your natural coping mechanism is stepping back to recharge in quiet sanctuary.",
      },
    ],
  },
  {
    id: 7,
    category: "Be Honest",
    scenario: "Which one sounds MOST like you?",
    icon: "auto_awesome",
    choices: [
      {
        text: "I think too much about things that probably don't need this much thinking.",
        weights: { vata: 3, pitta: 1, kapha: 0 },
        observation: "You recognize a tendency to overthink small details and explore endless possibilities.",
      },
      {
        text: "I get annoyed when things aren't done properly.",
        weights: { vata: 0, pitta: 3, kapha: 0 },
        observation: "You have high standards of excellence and appreciate precision and thoroughness.",
      },
      {
        text: "I know I should do it... but my comfort zone is too comfortable.",
        weights: { vata: 0, pitta: 0, kapha: 3 },
        observation: "You enjoy stability so much that stepping beyond your cozy comfort zone takes a conscious push.",
      },
    ],
  },
  {
    id: 8,
    category: "Ask Your Best Friend",
    scenario: "If your best friend had to describe you in one sentence, what would they say?",
    icon: "favorite",
    choices: [
      {
        text: "You're always thinking, always curious, and you never know what you'll do next.",
        weights: { vata: 3, pitta: 0, kapha: 0 },
        observation: "Friends appreciate your spark of curiosity, lively imagination, and spontaneous energy.",
      },
      {
        text: "You're focused, confident, and when you want something, you really go for it.",
        weights: { vata: 0, pitta: 3, kapha: 0 },
        observation: "Friends admire your determination, focus, and drive to pursue your goals.",
      },
      {
        text: "You're calm, caring, loyal, and you love being comfortable.",
        weights: { vata: 0, pitta: 0, kapha: 3 },
        observation: "Friends treasure your dependable loyalty, gentle warmth, and steady grounding presence.",
      },
    ],
  },
];
