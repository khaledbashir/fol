---
name: anythingllm-skill-builder
description: Create AnythingLLM custom agent skills (`plugin.json` + `handler.js`) for the user's Docker/EasyPanel deployment. Use when asked to build, scaffold, generate, fix, or validate an AnythingLLM agent skill, including hubId/folder matching, schema correctness, handler return contract, and deploy steps.
---

# AnythingLLM Skill Builder

Build skills that run inside AnythingLLM's custom agent-skill system.

## Environment Profile

- Target service: `basheer / anything-llm` (EasyPanel)
- Base API URL: `https://basheer-anything-llm.c9tnyg.easypanel.host/api/v1`
- Container storage mount: `/app/server/storage`
- Skills directory in container: `/app/server/storage/plugins/agent-skills/`
- Version assumption: Docker AnythingLLM `v1.2.2+`
- Auth variable used by related apps: `ANYTHING_LLM_KEY`
- Reload model: skills are hot-loaded; exit active agent session and refresh UI

## Build Workflow

1. Infer the skill purpose and required runtime parameters from the user request.
2. Generate a `hubId` in kebab-case.
3. Create one folder named exactly `hubId`.
4. Create `plugin.json` and `handler.js` in that folder.
5. Optionally add `README.md` only when user asks for docs.
6. Verify required constraints before returning output.
7. Include deploy commands for this Docker setup.

## Hard Constraints

- Keep folder name and `plugin.json.hubId` identical.
- Set `"schema": "skill-1.0.0"`.
- Set `"imported": true`.
- Include an `entrypoint` with `"file": "handler.js"` and `params`.
- Export `module.exports.runtime` in `handler.js`.
- Implement async `handler` with `try/catch`.
- Return a string from all paths (success and error).
- Destructure parameters from the single handler argument object.
- Read UI config from `this.runtimeArgs`.
- Use `this.introspect()` for user-visible progress and `this.logger()` for logs.
- Put `require()` statements inside the handler when extra modules are needed.
- If dependencies are required, bundle them in the skill folder.

## Output Contract

When generating a new skill, return:

- Skill folder name (`hubId`)
- `plugin.json` content
- `handler.js` content
- `deploy.sh` helper script content for `docker cp`
- A short test prompt list the user can run in AnythingLLM

## Deployment Steps To Include

Use these exact paths and container assumptions:

1. Copy skill folder into container:
   - `docker cp ./<hubId> basheer-anything-llm:/app/server/storage/plugins/agent-skills/`
2. Reload AnythingLLM UI:
   - Exit active agent chat and refresh browser.
3. Enable skill:
   - Agent Settings -> Skills -> toggle skill on.
4. Configure setup args:
   - Open gear icon and set any required values.
5. Test:
   - Start a new agent chat and use example prompts.

## ANC-Oriented Defaults

When user asks for ANC Proposal Engine integrations:

- Default ANC base URL: `https://basheer-natalia.prd42b.easypanel.host`
- Add configurable setup arg (example: `ANC_API_URL`) rather than hard-coding.
- Include clear `examples` in `plugin.json` so the model invokes the skill correctly.

## References

- Use [references/anythingllm-spec.md](/fol/skills/anythingllm-skill-builder/references/anythingllm-spec.md) for:
  - canonical `plugin.json` template
  - canonical `handler.js` template
  - field rules and supported types
  - example ANC product lookup skill
