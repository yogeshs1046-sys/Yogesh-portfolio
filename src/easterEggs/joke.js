const jokes = [
  "Why do programmers prefer dark mode?\nBecause light attracts bugs. 😂",
  "There are 10 types of people in the world:\nThose who understand binary, and those who don't.",
  "A SQL query walks into a bar, walks up to two tables and asks...\n'Can I join you?' 🍺",
  "How many programmers does it take to change a lightbulb?\nNone. It's a hardware problem.",
  "Why did the developer go broke?\nBecause he used up all his cache. 💸"
];

export function handleJoke() {
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

  return {
    type: 'output',
    content: randomJoke
  };
}
