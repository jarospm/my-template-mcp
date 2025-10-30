#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

/**
 * Creates and configures the MCP server with all tools, resources, and prompts
 */
export function createServer(): McpServer {
  const server = new McpServer({
    name: "my-server-name",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
      },
  });

//   // Register tools
//   for (const [name, tool] of Object.entries(myTools)) {
//     server.tool(name, tool.description, tool.inputSchema, tool.handler);
//   }

//   // Register resources
//   for (const [name, resource] of Object.entries(myResources)) {
//     server.resource(name, resource.template, resource.metadata, resource.handler);
//   }

//   // Register prompts
//   for (const [name, prompt] of Object.entries(myPrompts)) {
//     server.prompt(name, prompt.description, prompt.argsSchema, prompt.handler);
//   }

  return server;
}


/**
 * Main entry point for the MCP server
 * Sets up stdio transport and starts the server
 */
async function main() {
    const server = createServer();
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("My MCP Server running on stdio");
  }
  
  main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });