/** Shared appearance for the homepage feature sections and illustration shells. */
export const theme = {
  colors: {
    primaryText: "text-white",
    headingText: "text-[#eee8f1]",
    secondaryText: "text-[#cbc4d1]",
    mutedText: "text-[#c6c2ca]",
    subtleText: "text-[#a59bad]",
    captionText: "text-[#918699]",
    eyebrowText: "text-[color:var(--activeHighlightColor)]",
    accentText: "text-[#cd8cdb]",
    icon: "text-[#c68bd6]",
    pluginDetailText: "text-[#998da4]",
    ctaText: "text-[#c0b2c6]",
    linkText: "text-[#deb2e8] hover:text-white",
    underlinedLinkText: "text-[#c9a0d4]",
  },
  cards: {
    eyebrow: "text-xs font-bold uppercase tracking-[0.16em]",
    bg: "bg-gradient-to-br from-[#322031]/30 to-[#1d1522]/50 backdrop-blur-[5px]",
    topGlow:
      "pointer-events-none absolute left-1/2 top-0 -z-10 size-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--activeBaseColor)_0%,transparent_70%)] opacity-60",
    border: "border border-white/10",
    divider: "border-t border-white/10",
    hover: "transition-colors hover:border-[#b66bc4]/50 hover:bg-[#211529]/50",
    iconBadge: "border border-[#ab6bbc]/20 bg-[#a45dbc]/10 text-[#d8a2e7]",
  },
  links: {
    base: "inline-flex items-center gap-2 text-sm font-semibold transition-colors focus-visible:rounded-sm",
  },
  illustrations: {
    shell: "border border-white/[0.08] bg-[#15111c]/50",
    pairedViewport: "h-[440px] sm:h-[420px]",
    controls: "border-t border-white/[0.07] bg-[#1c1623]/50",
    chatSurfaces: "[--editor-bg:#201e2a80] [--editor-raised:#2b273980]",
    applicationCanvas:
      "bg-[#211928]/30 bg-[radial-gradient(#b694c826_0.7px,transparent_0.7px)] [background-size:12px_12px]",
    applicationNode: "rounded-lg border border-[#bc87d6]/20 bg-[#241b2d]/70",
    editorFrame:
      "grid grid-cols-[calc(2.8*var(--editor-unit))_minmax(0,1fr)] overflow-hidden [--editor-unit:clamp(8px,2.4cqw,13px)]",
    editorPanel:
      "min-w-0 overflow-hidden border-r border-[color:var(--editor-border)] bg-[color:var(--editor-bg)]",
    panelHeader:
      "flex h-8 shrink-0 items-center justify-between border-b border-[color:var(--editor-border)] px-2 text-[11px]",
    panelInput:
      "flex min-w-0 items-center gap-1 rounded-sm border border-[color:var(--editor-border)] bg-[color:var(--editor-bg)] px-1.5 py-1",
    templateCanvas:
      "min-h-0 min-w-0 flex-1 overflow-hidden bg-[color:var(--editor-canvas)] p-3",
  },
} as const;
