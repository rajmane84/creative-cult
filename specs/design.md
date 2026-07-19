# DESIGN.md — Micro-interaction Pattern Catalog

## 1. Staged / sequential reveals

**Source: impeccable.style**

Rather than showing a finished state immediately, content builds up in visible
steps — e.g. a mock terminal command prints its output line by line (scanning
codebase → matching tokens → confirming components → "Matching your system, not
inventing one"). Each line lands with a slight delay, mimicking real work being
done.

**Applicable pattern for Cre8ive Cult:** Use for any process that takes a moment
conceptually, even if the actual computation is instant — e.g. matching a Client's
brief to Creatives, generating a portfolio preview, submitting a booking request.
A staged reveal ("Reading brief → Matching creatives → 3 matches found") reads as
considered rather than instantaneous-and-cheap.

**Rule:** Each stage must represent a real, truthful step — never fabricate steps
just to slow things down artificially.

---

## 2. Diff / before-after reveal as confirmation

**Source: impeccable.style**

Accepted changes are shown as an actual diff (`- "Book Now"` / `+ "Reserve your
stay"`), with a small checkmark and file path ("Wrote src/Hero.astro"). This turns
an abstract "AI changed something" into a concrete, reviewable, trustable action.

**Applicable pattern:** Any place where the platform makes a suggestion or edit on
the user's behalf (e.g. auto-suggested portfolio tags, an AI-assisted bio rewrite)
should show the before/after explicitly rather than silently swapping content.

---

## 3. Multi-variant carousel with lightweight selection

**Source: impeccable.style**

When multiple options are generated (design variants), they're shown as a small
numbered carousel (`1/3`) with prev/next and a clear accept action — low-friction
browsing before commitment.

**Applicable pattern:** Portfolio image reordering, or presenting multiple
AI-suggested profile taglines/cover images to a Creative during onboarding.

---

## 4. Hover-to-target, click-to-select (element-level affordance)

**Source: impeccable.style ("Live Mode")**

Hovering over a page element highlights just that element before it's selected for
editing — the interaction target is made obvious before commitment, not after.

**Applicable pattern:** Any inline-editing surface (e.g. editing a portfolio grid
item, reordering suite/service cards) should highlight the exact editable region on
hover, distinctly from its resting state, before a click commits to an action.

---

## 5. Purpose-built, isolated motion primitives

**Source: amicro.vercel.app**

This site's entire premise is packaging micro-transitions as discrete, reusable,
tree-shakeable components rather than one-off animations buried in page code.

**Applicable pattern:** Treat Cre8ive Cult's own micro-interactions the same way —
as a small internal library (button press states, card hover lift, skeleton
loaders, toast entrances) defined once and reused everywhere, rather than
redefined per page. This keeps motion consistent across the Creative and Client
surfaces even though their layouts differ.

_(Since this site is client-rendered, verify actual timing/easing values by
inspecting it directly — treat this entry as "adopt the component-library
philosophy," not a literal spec.)_

---

## 6. Restrained, text-forward link/card interaction

**Source: nikhilwho.in**

A minimal personal site with almost no ornamentation — the only interactive
richness comes from simple, clearly-labeled link cards (e.g. "Design Engineer" /
"Product Engineer" as two distinct entry points) and inline-underline link states.
Nothing fights for attention.

**Applicable pattern:** A useful counter-example / calibration point — proof that
restraint itself is a legitimate interaction choice. Not every surface in Cre8ive
Cult needs heavy motion; simple, confident hover-underline and clear tap targets
are sometimes the correct, tasteful choice (e.g. footer nav, secondary settings
pages).

---

## 7. Data-as-interface: heatmaps, countdowns, leaderboards

**Source: timmo.co.in, samworks.vercel.app**

Both sites use a GitHub-style contribution heatmap as a piece of "alive" UI —
data visualized as small colored cells that reward engagement/consistency over
time. Timmo pairs this with countdown timers and leaderboards as core product
mechanics rather than decoration.

**Applicable pattern:** Consider for a Creative's dashboard — an activity heatmap
of bookings/inquiries over time, or a lightweight "response time" indicator, gives
the same feeling of a living, working product without needing heavy animation.
Feedback through _data density_, not motion.

---

## 8. Hover/click "play" affordance on static icons

**Source: samworks.vercel.app (Tech Stack section)**

Tech stack icons are static by default but explicitly labeled "(hover to play)
(click to play)" — turning an otherwise inert icon list into a small rewarding
interaction without cluttering the default view.

**Applicable pattern:** Useful for a Creative's skill/tool tags on their public
profile — icons that stay calm at rest but offer a small reward (subtle animation,
tooltip with project count, etc.) on intentional interaction, not on passive
scroll-by.

---

## 9. Marquee / auto-scrolling social proof

**Source: samworks.vercel.app, impeccable.style**

Both use a horizontally auto-scrolling row of short testimonial quotes with
avatar + name + handle, looping continuously. Impeccable pairs this with a dense
wall of real tweet embeds; Sam's site keeps it shorter and more curated.

**Applicable pattern:** Directly usable for Cre8ive Cult's landing/marketing page —
a marquee of Client testimonials about Creatives they've booked, or a Creative's
own client reviews on their public profile. Keep it slow, pause-on-hover, and
never so dense it becomes noise (Impeccable's version is closer to "wall," Sam's
is closer to "highlight reel" — the latter is the better fit for a marketplace
profile page).

---

## 10. Scroll-triggered personality/easter-egg copy

**Source: samworks.vercel.app**

Scrolling to the very bottom of the page reveals a small aside — "Scrolled Too
Far" with a closing thought and a quote — rewarding users who explore fully
without being required content.

**Applicable pattern:** A tasteful option for empty states or the very bottom of a
Creative's portfolio page — a small, on-brand closing note. Should be optional
flavor, never load-bearing for navigation or core tasks.

---

## Cross-cutting principles observed across all five

1. **Every animation communicates something** — state, hierarchy, confirmation,
   or reward. None of it is motion for motion's sake.
2. **Timing is short and confident.** Nothing lingers; reveals and transitions
   feel immediate even when staged.
3. **Interactions are earned, not forced.** Hover/click affordances (heatmaps,
   tech-stack icons, easter-egg copy) reward intentional exploration rather than
   interrupting passive scrolling.
4. **Motion respects content hierarchy.** The most important actions (accept a
   variant, reserve a suite, install a command) get the clearest, simplest
   interaction — flourish is reserved for secondary/exploratory surfaces.

## 11. Impeccable Forms & Inputs

**Source: impeccable.style**

Inputs and buttons break away from typical rounded, boxed aesthetics. Instead, they embrace a raw, minimal, editorial look. Inputs use `border-b-2` with large, elegant typography (`font-editorial`), feeling more like signing a document than filling a web form. Buttons use thin borders, mono-spaced uppercase tracking, and a kinetic "fill" hover effect to add motion to an otherwise static element.

**Applicable pattern:** Use this pattern for all core forms (login, signup, waitlist). Remove unnecessary boxing in favor of clear typography and ample whitespace.

---

## Reminder

None of the above should translate into copying fonts, colors, spacing systems,
or layout structure from these sites. Extract the _mechanics_, discard the _skin_.
