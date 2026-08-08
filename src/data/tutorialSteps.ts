import type { TutorialStepData } from "../types";

export const TUTORIAL_STEPS: TutorialStepData[] = [
  {
    id: 1,
    title: "Meet Cursor",
    kidLine: "Cursor is a coding app with a smart AI friend built in.",
    cursorFeature:
      "It is like VS Code (where you write code) plus a helper that can read your whole project.",
    graphic: "buddy",
    choices: [
      {
        id: "buddy",
        label: "A robot buddy",
        emoji: "🤖",
        kidReply: "Yes! It is like a robot teammate who reads your files with you.",
      },
      {
        id: "teacher",
        label: "A patient teacher",
        emoji: "🎓",
        kidReply: "Totally — you can ask “how does this work?” as many times as you want.",
      },
      {
        id: "builder",
        label: "A builder helper",
        emoji: "🧱",
        kidReply: "Right — it can suggest code to fix bugs or add cool features.",
      },
    ],
  },
  {
    id: 2,
    title: "Three superpowers",
    kidLine: "Cursor has 3 main tricks. Tap the one that sounds most fun!",
    cursorFeature: "Chat = ask stuff · Agent = big jobs · Tab = speedy typing help.",
    graphic: "powers",
    choices: [
      {
        id: "chat",
        label: "Chat — ask questions",
        emoji: "💬",
        kidReply:
          "Chat is for “What does this do?” — like texting a friend who saw your whole project.",
      },
      {
        id: "agent",
        label: "Agent — big missions",
        emoji: "🚀",
        kidReply:
          "Agent is for big missions — add a button, fix errors, touch lots of files at once.",
      },
      {
        id: "tab",
        label: "Tab — finish my typing",
        emoji: "⚡",
        kidReply:
          "Tab guesses your next lines — like autocomplete on super speed while you type.",
      },
    ],
  },
  {
    id: 3,
    title: "Pack the Tremor",
    kidLine: "Pick gear for your truck mission! Choose one in each row.",
    cursorFeature: "Real Cursor lets YOU pick the task — pizza night code or drone app, same tools.",
    graphic: "mission",
    choices: [],
    choiceGroups: [
      {
        key: "pizza",
        prompt: "Ooni pizza",
        options: [
          { id: "pepperoni", label: "Pepperoni", emoji: "🍕", kidReply: "Classic!" },
          { id: "cheese", label: "Extra cheese", emoji: "🧀", kidReply: "Cheesy victory!" },
          { id: "veggie", label: "Veggie", emoji: "🥬", kidReply: "Green power!" },
        ],
      },
      {
        key: "drone",
        prompt: "Drone job",
        options: [
          { id: "scout", label: "Scout ahead", emoji: "🛸", kidReply: "Eyes in the sky!" },
          { id: "film", label: "Film the road", emoji: "🎥", kidReply: "Movie mode!" },
          { id: "race", label: "Race the truck", emoji: "🏁", kidReply: "Zoom zoom!" },
        ],
      },
      {
        key: "minecraft",
        prompt: "Minecraft goal",
        options: [
          { id: "diamonds", label: "Find diamonds", emoji: "💎", kidReply: "Shiny!" },
          { id: "castle", label: "Build a castle", emoji: "🏰", kidReply: "Royal build!" },
          { id: "creeper", label: "Befriend a creeper", emoji: "🟩", kidReply: "Brave choice!" },
        ],
      },
    ],
  },
];
