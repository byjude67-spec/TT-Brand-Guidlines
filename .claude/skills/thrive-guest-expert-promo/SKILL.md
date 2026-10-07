---
name: thrive-guest-expert-promo
description: Creates the full promotion pack for a new guest expert session in Jude Hill's Thrive Together Circle community. It covers the talk title, summary, Eventbrite listing (SEO title, meta description, full description, tags, FAQs), Skool, Facebook and LinkedIn posts, Instagram/TikTok reel scripts, and branded images (Eventbrite header, Facebook, Skool, LinkedIn, Instagram story). Use this whenever Jude shares a guest expert's or guest speaker's bio, session title, session description or event details, or asks for promo, posts, captions, an Eventbrite listing, reels or event graphics for a Thrive Together Circle session, workshop, masterclass or live, even if she doesn't mention this skill by name.
---

# Thrive Together Circle — Guest Expert Session Promo

Jude Hill runs **Thrive Together Circle**, a women's empowerment community on Skool that supports women in their life and business. Each time a guest expert is booked, Jude passes on what the guest sent her (usually a session title, a description and a bio). She then needs the same set of promo assets made every time.

**Your job:** take the guest's info and produce the promo pack below, in Jude's voice and on brand, in one go.

Before writing, read:
- `references/brand-and-voice.md` for voice, taglines, colours and fonts
- `references/deliverables.md` for exact specs for every piece (character limits, counts, structure, image sizes)

## Step 1 — Pull out the facts

From what Jude pasted, extract the following:
- the guest's name, credentials/roles and what makes them distinctive
- the session's original title, format, length and what happens in it
- the benefits ("you may leave feeling...")
- who it's for, and whether any experience is needed
- date, time and time zone
- the link (Skool / Eventbrite / Zoom) and the guest's social handles

Guests write in their own style, often in first person or as a sales pitch. Extract the facts and rewrite the copy in Jude's voice.

**Missing info:** date/time and links are often missing. Don't stop to ask; use clear placeholders (`[DATE]`, `[TIME + TIME ZONE]`, `[SKOOL LINK]`, `[EVENTBRITE LINK]`, `[GUEST @HANDLE]`). List every placeholder at the end. Only stop and ask if you can't tell what the session is about.

**Never invent** credentials, testimonials, statistics, prices, attendee numbers, a replay, or claims of outcomes the guest didn't make. Keep wellbeing/healing language as invitational as the guest's own ("you may feel...", "supporting you to..."), never a guaranteed cure. Use the guest's own pronouns if their bio shows them. Otherwise use their name or "they".

## Step 2 — Write the pack (in this order)

This mirrors Jude's own process. If she asks for only some pieces, make only those, in this order.

1. **Talk title**: under 30 characters (give the chosen one + 2 alternatives, with character counts)
2. **Session summary**: under 300 characters, focused on the main benefits (show the count)
3. **Promo key points**: extra details pulled out to use in posts: hooks, pain points, benefits, "who it's for", reassurance lines, quotable lines from the guest, guest credibility points
4. **Eventbrite listing**
   - SEO-optimised Eventbrite title
   - 150-character meta description (show the count; aim for 140–150, never over)
   - Full event description emphasising what participants will get out of it
   - Tags/keywords
   - Suggested FAQs with answers
5. **Social posts** for Skool, Facebook and LinkedIn (you are a social media expert and strategist), each promoting this as *another amazing session within Thrive Together Circle*, with varied ways of inviting people to join the Circle
6. **Reel scripts** for Instagram and TikTok (you are a short-form content strategist): 30–45 sec talking-head scripts with a 3-second hook, an emotional connection and a clear CTA. **Thrive Together Circle is the hero**, and the session is one of the many reasons to join
7. **Branded images**: Eventbrite header, Facebook, Skool, LinkedIn and Instagram story (see Step 3)
8. **Placeholders to fill**: a checklist

Start the pack with a 4-line **Event snapshot** (guest, session, date/time, link) so Jude can spot any wrong facts instantly.

## Step 3 — Make the branded images

Use `assets/graphic-template.html` + `scripts/render-graphics.mjs`:

1. Write a JSON config (see the example at the top of `scripts/render-graphics.mjs`) with the title (wrap **one** word in `*asterisks*` to make it the italic accent; never more than one), a short subtitle, the guest's name + a short role line, a date line, a CTA, and an optional guest photo path.
2. Run `node scripts/render-graphics.mjs config.json out-dir/`. It renders all five sizes as PNGs:
   - Eventbrite header **1460×752**
   - Facebook post **1080×1350**
   - Skool post **777×777**
   - LinkedIn post **1200×1200**
   - Instagram story **1080×1920**
3. **Look at every PNG** before delivering. Check that no text is clipped or overlapping, the title is readable at small size, the date is visible, and the guest name is spelled correctly. If a title is too long, shorten the image title (it can differ from the Eventbrite title) and re-render.

If Node/Playwright isn't available (e.g. running in claude.ai), use Python + Pillow, or build the images directly as HTML/SVG. Keep the same layout and brand rules: primary gradient background with a gold diagonal thread, DM Serif Display headline with one italic gold word, DM Sans text, a white pill CTA, and the Thrive Together Circle mark.

If Jude supplies a guest headshot, always use it. It's the biggest driver of clicks. If there isn't one, the template shows the Circle mark instead. Mention that adding the headshot will improve the images.

## Step 4 — Quality check, then deliver

Before handing over, check:
- The character limits are met (title < 30, summary < 300, meta ≤ 150), with the counts shown.
- The date, time and guest name are identical everywhere.
- The voice is warm, invitational and UK English, with no hype, no fake urgency and no "unlock your potential" phrasing (see the "Avoid" list in the brand reference).
- Each social post invites people to join the Circle in a *different* way.
- The reels make the **community** the hero, not the event.
- Nothing is invented.

Deliver the text as one document Jude can copy from (clear headings, one copy-ready block per post), plus the PNGs. End with the placeholder checklist and one line offering extras (email, WhatsApp reminder, countdown posts, host intro script, thank-you/replay post).

## Worked example

`examples/sandra-akashic-records-pack.md` is a complete pack made from a real guest submission, and `examples/sandra-graphics-config.json` is its image config. Use them as the quality and format benchmark: match their structure, depth and tone, not their wording.
