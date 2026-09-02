import { unlockAchievement } from './EasterEggEngine';

const coffeeQuotes = [
  "Warning: More coffee may cause more features.",
  "Coffee level: CRITICAL (98% full).",
  "Coffee detected. Full-stack coding mode activated! ☕",
  "Converted 500ml of coffee into 400 lines of clean code."
];

export function handleCoffee() {
  unlockAchievement('COFFEE_POWERED');

  const randomQuote = coffeeQuotes[Math.floor(Math.random() * coffeeQuotes.length)];

  return {
    type: 'output',
    content: `Brewing coffee...

    ( (
     ) )
  ........
  |      |]
  \\      /
   \`----'

✓ Coffee loaded.

Developer productivity:
[██████████████████░] 92%

${randomQuote}`
  };
}
