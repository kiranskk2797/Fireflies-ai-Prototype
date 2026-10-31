# Fireflies Commitments Prototype

An interactive, browser-based capstone prototype for owner-confirmed meeting commitments and explicit resolution.

## Open the prototype

Open the **Fireflies Commitments Prototype** preview in Replit. No Fireflies account, API key, or external service is required.

## Run locally in this workspace

From the workspace root:

```bash
pnpm --filter @workspace/fireflies-commitments run dev
```

The Replit preview runs the same app through its managed workflow.

## Demo behavior

- Example people, meetings, action candidates, and activity are synthetic.
- Changes are stored in this browser's local storage. They do not sync to Fireflies or other people.
- Follow-up and reminders are simulated interface state only; this prototype does not send notifications.
- Use **Reset demo** to restore the original examples.
- Download the matching Mini PRD from the **Project notes** view or `public/mini-prd.docx`.

## Project materials

- `docs/mini-prd.md` — editable source for the downloadable Mini PRD.
- `docs/reference-analysis.md` — summary of the supplied reference screenshots.
- `docs/acceptance-checklist.md` — Step 4 delivery checklist.
- `scripts/build_mini_prd.py` — standard-library script that builds `public/mini-prd.docx` from the Markdown source.

Build or refresh the DOCX with:

```bash
python3 artifacts/fireflies-commitments/scripts/build_mini_prd.py
```

## Product boundary

The prototype expresses the two selected Step 3 directions: owner-confirmed commitment handoff and lightweight explicit resolution. It is not a live Fireflies integration, production task manager, research result, or validated prediction of the 14-day resolution target.
