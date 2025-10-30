# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **template repository** for quickly creating new MCP (Model Context Protocol) servers. It's designed to be copied when starting a new MCP server project.

## Key Commands

```bash
# Install dependencies (gets latest versions due to "latest" in package.json)
npm install

# Lock dependency versions for a new project (recommended after copying template)
npm install @modelcontextprotocol/sdk@latest zod@latest --save-exact
npm install -D @types/node@latest typescript@latest --save-exact

# Build TypeScript to JavaScript
npm run build

# Test with MCP Inspector (opens web interface for interactive testing)
npm run inspect
```

## Architecture

**Single-file server structure**: The entire MCP server is defined in `src/index.ts` with two main functions:

1. `createServer()` - Configures the MCP server with tools, resources, and prompts
2. `main()` - Sets up stdio transport and connects the server

**Transport**: Uses stdio (standard input/output) for communication, which is the standard for MCP servers used with Claude Desktop.

**Registration pattern**: Tools, resources, and prompts are registered by calling methods on the `McpServer` instance:
- `server.tool(name, description, inputSchema, handler)`
- `server.resource(name, template, metadata, handler)`
- `server.prompt(name, description, argsSchema, handler)`

## MCP Documentation

When working with MCP concepts or the TypeScript SDK, reference these files:
- `docs/mcp-typescript-sdk.txt` - Official MCP TypeScript SDK documentation and API reference
- `docs/mcp-docs.txt` - Full MCP specification and protocol documentation

## Template Strategy

**Dependencies**: This template uses `"latest"` in package.json to pull the newest versions when starting a new project. After copying the template, use `--save-exact` to lock versions for that specific project.

**When creating a new server from this template**:
1. Copy the template directory
2. Update `package.json` (name, description, author)
3. Run `npm install` to get latest dependencies
4. Lock versions with `--save-exact` commands
5. Implement your server logic in `src/index.ts`
