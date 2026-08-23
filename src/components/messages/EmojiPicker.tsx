import { useState } from "react";

/** Main emoji set, grouped by simple Persian labels. */
const GROUPS: { label: string; emojis: string[] }[] = [
  {
    label: "چهره‌ها",
    emojis: [
      "😀","😃","😄","😁","😆","😅","😂","🤣","🙂","🙃","😉","😊","😇","🥰","😍","🤩",
      "😘","😗","😚","😋","😜","🤪","🤗","🤔","🤨","😐","😑","😴","😌","😔","😢","😭",
      "😤","😠","😡","🥵","🥶","😱","😰","😥","🤒","🤕","🤢","🤮","🥳","😎","🤓","🧐",
    ],
  },
  {
    label: "دست‌ها و افراد",
    emojis: ["👍","👎","👌","✌️","🤞","🤝","👏","🙌","🙏","💪","👋","✋","☝️","👀","🧑‍🔧","👨‍🔧","👩‍🔧","🚴","🚵","🧑‍💻"],
  },
  {
    label: "دل و نشانه‌ها",
    emojis: ["❤️","🧡","💛","💚","💙","💜","🖤","💔","💯","✅","❌","⚠️","❗","❓","⭐","🔥","✨","🎉","🎁","⏰"],
  },
  {
    label: "کار و اشیا",
    emojis: ["🚲","🛠️","🔧","🔩","⚙️","🧰","🔋","💡","📦","📸","📱","💰","🧾","📊","📝","📅","🚚","🏪","☕","🍵"],
  },
];

export function EmojiPicker({ onPick }: { onPick: (emoji: string) => void }) {
  const [tab, setTab] = useState(0);
  const group = GROUPS[tab]!;
  return (
    <div className="rounded-2xl border border-on-hero/20 bg-[oklch(0.2_0.02_52/0.92)] p-2 backdrop-blur-md">
      <div className="mb-2 flex gap-1 overflow-x-auto">
        {GROUPS.map((g, i) => (
          <button
            key={g.label}
            type="button"
            aria-pressed={tab === i}
            onClick={() => setTab(i)}
            className={`shrink-0 rounded-lg px-2 py-1 text-[11px] font-bold ${
              tab === i ? "bg-primary text-primary-foreground" : "bg-on-hero/10 text-on-hero"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>
      <div className="grid max-h-40 grid-cols-8 gap-1 overflow-y-auto">
        {group.emojis.map((e) => (
          <button
            key={e}
            type="button"
            aria-label={`ایموجی ${e}`}
            onClick={() => onPick(e)}
            className="grid h-9 place-items-center rounded-lg text-xl hover:bg-on-hero/10"
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  );
}
