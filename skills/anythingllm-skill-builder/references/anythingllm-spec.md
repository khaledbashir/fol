# AnythingLLM Skill Spec

## Folder Structure

Each custom skill is one folder:

```text
plugins/agent-skills/{hubId}/
├── plugin.json
├── handler.js
└── README.md (optional)
```

Folder name must match `plugin.json.hubId` exactly.

## `plugin.json` Template

```json
{
  "active": true,
  "name": "Human Readable Skill Name",
  "hubId": "kebab-case-folder-name",
  "schema": "skill-1.0.0",
  "version": "1.0.0",
  "description": "Explain exactly when the model should call this skill",
  "author": "@basheer",
  "author_url": "https://github.com/khaledbashir",
  "license": "MIT",
  "setup_args": {
    "API_KEY": {
      "type": "string",
      "required": false,
      "input": {
        "type": "text",
        "default": "",
        "placeholder": "sk-xxxxx",
        "hint": "Optional API key for the service"
      },
      "value": ""
    }
  },
  "examples": [
    {
      "prompt": "Example user request that should trigger the skill",
      "call": "{\"param1\":\"value1\"}"
    }
  ],
  "entrypoint": {
    "file": "handler.js",
    "params": {
      "param1": {
        "description": "Purpose of parameter",
        "type": "string"
      }
    }
  },
  "imported": true
}
```

### Field Rules

- Required: `active`, `name`, `hubId`, `schema`, `version`, `description`, `entrypoint`, `imported`
- `schema` must be `"skill-1.0.0"`
- `imported` must be `true`
- `entrypoint.params.*.type` is one of: `string`, `number`, `boolean`
- `setup_args.*.input.type` should be `text` for this setup

## `handler.js` Template

```javascript
module.exports.runtime = {
  handler: async function ({ param1, param2 }) {
    try {
      this.introspect(`Processing request...`);
      // const apiKey = this.runtimeArgs["API_KEY"];
      // const { name, hubId, version } = this.config;

      const response = await fetch("https://api.example.com/endpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ param1, param2 }),
      });

      if (!response.ok) {
        return `API error: ${response.status} ${response.statusText}`;
      }

      const data = await response.json();
      return JSON.stringify(data, null, 2);
    } catch (e) {
      this.introspect(`Error: ${e.message}`);
      this.logger("Skill error", e.message);
      return `Skill failed: ${e.message}`;
    }
  },
};
```

### Runtime Rules

1. Export `module.exports.runtime` with `handler`.
2. Return string in every code path.
3. Wrap logic in `try/catch`.
4. Use `this.introspect()` and `this.logger()` for traceability.
5. Read setup args from `this.runtimeArgs`.
6. Keep imports local to handler when adding dependencies.

## Deployment Commands

```bash
docker cp ./<hubId> basheer-anything-llm:/app/server/storage/plugins/agent-skills/
```

Then:

1. Exit any active agent session and refresh page.
2. Enable skill in Agent Settings > Skills.
3. Configure setup args via the gear icon.
4. Start a new agent chat and test with a sample prompt.

## ANC Example

For ANC endpoints, prefer configurable setup args:

- `ANC_API_URL` default: `https://basheer-natalia.prd42b.easypanel.host`
- Optional token args if endpoint requires auth
