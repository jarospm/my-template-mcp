#!/usr/bin/env node

import "dotenv/config";  // side-effect import to ensure silent loading
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createMCPServer } from "./mcpServer.js";

/**
 * Main entry point for the Airtable MCP server
 *
 * Architecture:
 * - Entry point (this file): Wires together components and manages transport
 * - MCPServer: Implements MCP protocol and registers tools/resources
 * - SomeService: Handles all API operations
 * - ...
 */
async function main() {
  // Initialize services...

  // Create MCP server with the Airtable service
  const server = createMCPServer();

  // Set up stdio transport for MCP communication
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("Airtable MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});