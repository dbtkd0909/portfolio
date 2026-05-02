"use client";

import { Code2, Copy, Check, Terminal } from "lucide-react";
import { useState } from "react";

type Plugin = {
  name: string;
  filename: string;
  description: string;
  code: string;
};

const plugins: Plugin[] = [
  {
    name: "Auto Rotopaint Cleaner",
    filename: "auto_rotopaint.py",
    description:
      "선택한 노드의 불필요 stroke 를 정리하고 frame range 별로 split 한다.",
    code: `import nuke

def clean_rotopaint(node):
    if node.Class() != "RotoPaint":
        return
    curves = node["curves"].rootLayer
    for stroke in list(curves):
        if stroke.getAttributes().getValue("ltn") < 1:
            curves.remove(stroke)

for n in nuke.selectedNodes():
    clean_rotopaint(n)`,
  },
  {
    name: "Shot Naming Validator",
    filename: "shot_validator.py",
    description:
      "Write 노드의 file path 가 스튜디오 네이밍 컨벤션을 따르는지 검사한다.",
    code: `import re, nuke

PATTERN = r"^[A-Z]{3}_\\d{4}_v\\d{3}\\.exr$"

def validate():
    invalid = []
    for w in nuke.allNodes("Write"):
        name = w["file"].value().split("/")[-1]
        if not re.match(PATTERN, name):
            invalid.append((w.name(), name))
    return invalid`,
  },
];

function PluginCard({ plugin }: { plugin: Plugin }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(plugin.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = plugin.code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <article className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/60">
      <header className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-neutral-300">
          <Code2 className="h-4 w-4 text-emerald-400" />
          <span className="font-mono">{plugin.filename}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 rounded border border-neutral-700 px-2 py-1 text-xs text-neutral-400 transition hover:border-emerald-400 hover:text-emerald-400"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </header>

      <div className="p-5">
        <h3 className="text-lg font-semibold">{plugin.name}</h3>
        <p className="mt-2 text-sm text-neutral-400">{plugin.description}</p>

        <pre className="mt-4 overflow-x-auto rounded-md bg-black/60 p-4 text-xs leading-relaxed text-neutral-300">
          <code className="font-mono">{plugin.code}</code>
        </pre>
      </div>
    </article>
  );
}

export default function NukePlugins() {
  return (
    <section
      id="tools"
      className="border-t border-neutral-900 bg-neutral-950 px-4 py-16 md:px-8 md:py-24 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center gap-3">
          <Terminal className="h-6 w-6 text-emerald-400" />
          <div>
            <p className="mb-1 text-xs uppercase tracking-[0.3em] text-emerald-400">
              Tooling
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Nuke Python Plugins
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {plugins.map((plugin) => (
            <PluginCard key={plugin.filename} plugin={plugin} />
          ))}
        </div>
      </div>
    </section>
  );
}
