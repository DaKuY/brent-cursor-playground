import type { PlayerChoices } from "../types";

const labels: Record<string, Record<string, string>> = {
  whatIsCursor: {
    buddy: "robot buddy",
    teacher: "code teacher",
    builder: "builder helper",
  },
  superpower: {
    chat: "Chat questions",
    agent: "Agent missions",
    tab: "Tab speed typing",
  },
  pizza: { pepperoni: "pepperoni", cheese: "extra-cheese", veggie: "veggie" },
  drone: { scout: "scout drones", film: "camera drones", race: "racing drones" },
  minecraft: {
    diamonds: "diamond hunt",
    castle: "castle build",
    creeper: "creeper peace treaty",
  },
};

function L(group: keyof PlayerChoices, id: string): string {
  return labels[group]?.[id] ?? id;
}

export function buildMissionStory(c: PlayerChoices): string {
  const tool =
    c.superpower === "chat"
      ? "ask Chat every time you're confused"
      : c.superpower === "agent"
        ? "send Agent on big build missions"
        : "use Tab to type super fast";

  return (
    `You rolled up in the blue Tremor with your ${L("whatIsCursor", c.whatIsCursor)}. ` +
    `The Ooni is baking ${L("pizza", c.pizza)} pizza while ${L("drone", c.drone)} buzz overhead. ` +
    `Your Minecraft quest: ${L("minecraft", c.minecraft)}. ` +
    `In real life, you'd open Cursor and ${tool} — same adventure, but with real code!`
  );
}

export function buildMissionTitle(c: PlayerChoices): string {
  const emoji =
    c.minecraft === "diamonds" ? "💎" : c.minecraft === "castle" ? "🏰" : "🟩";
  return `${emoji} Operation ${L("pizza", c.pizza).replace(/\s/g, "-")} Tremor`;
}

export function superpowerBadge(c: PlayerChoices): { emoji: string; name: string } {
  if (c.superpower === "agent") return { emoji: "🚀", name: "Agent Captain" };
  if (c.superpower === "tab") return { emoji: "⚡", name: "Tab Speedrunner" };
  return { emoji: "💬", name: "Chat Explorer" };
}
