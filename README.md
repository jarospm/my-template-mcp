# MCP Server Template

A template for quickly creating new MCP (Model Context Protocol) servers.

## Quick Start

After copying this template:

```bash
# Navigate to your new project
cd your-mcp-server

# Install dependencies (gets latest versions)
npm install

# Lock dependency versions in package.json (recommended)
npm install @modelcontextprotocol/sdk@latest zod@latest --save-exact
npm install -D @types/node@latest typescript@latest --save-exact

# Build the project
npm run build

# Test with MCP Inspector (recommended for development)
npm run inspect

# Start developing
# Edit src/index.ts to implement your MCP server
```

**Why `--save-exact`?**

Replace `"latest"` in package.json with the exact installed version (e.g., `"1.20.2"`).

## What's Included

- TypeScript configuration
- MCP SDK and Zod for schema validation
- Build scripts ready to go
- Clean .gitignore for production use

## Next Steps

1. Update `package.json` with your project name and description
2. Implement your MCP server logic in `src/index.ts`
3. Build and test your server

## Additional Resources

- [MCP Documentation](https://modelcontextprotocol.io/docs/)
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk/tree/main)
- [Example Servers](https://github.com/modelcontextprotocol/servers)
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector)
