#!/usr/bin/env node

import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { completable } from '@modelcontextprotocol/sdk/server/completable.js';
import { z } from 'zod';

/**
 * Creates and configures the MCP server with all tools, resources, and prompts
 */
export function createMCPServer(): McpServer {
  const server = new McpServer({
    name: "my-server-name",
    version: "1.0.0"
  });

  // Simple tool with parameters
  server.registerTool(
    'calculate-bmi',
    {
        title: 'BMI Calculator',
        description: 'Calculate Body Mass Index',
        inputSchema: {
            weightKg: z.number(),
            heightM: z.number()
        },
        outputSchema: { bmi: z.number() }
    },
    async ({ weightKg, heightM }) => {
        const output = { bmi: weightKg / (heightM * heightM) };
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(output)
                }
            ],
            structuredContent: output
        };
    }
  );


  // Static resource
  server.registerResource(
    'config',
    'config://app',
    {
        title: 'Application Config',
        description: 'Application configuration data',
        mimeType: 'text/plain'
    },
    async uri => ({
        contents: [
            {
                uri: uri.href,
                text: 'App configuration here'
            }
        ]
    })
  );

  // Dynamic resource
  server.registerResource(
    'greeting',
    new ResourceTemplate('greeting://{name}', {
        list: async () => {
            const names = ['alice', 'bob'];
            return {
                resources: names.map(name => ({
                    uri: `greeting://${name}`,
                    name: `greeting-${name}`,
                    description: `Greeting for ${name.charAt(0).toUpperCase() + name.slice(1)}`,
                    mimeType: 'text/plain'
                }))
            };
        }
    }),
    {
        title: 'Greeting Resource', // Display name for UI
        description: 'Dynamic greeting generator'
    },
    async (uri, { name }) => ({
        contents: [
            {
                uri: uri.href,
                text: `Hello, ${name}!`
            }
        ]
    })
  );


  // Tool that returns a list of available resources
  server.registerTool(
    'list-resources',
    {
        title: 'List Resources',
        description: 'Lists all available resources in this MCP server',
        inputSchema: {},
        outputSchema: {
            resources: z.array(z.object({
                name: z.string(),
                uri: z.string(),
                description: z.string(),
                mimeType: z.string().optional()
            }))
        }
    },
    async () => {
        const resources = [
            {
                name: 'config',
                uri: 'config://app',
                description: 'Application configuration data',
                mimeType: 'text/plain'
            },
            {
                name: 'greeting-alice',
                uri: 'greeting://alice',
                description: 'Greeting for Alice'
            },
            {
                name: 'greeting-bob',
                uri: 'greeting://bob',
                description: 'Greeting for Bob'
            }
        ];

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({ resources }, null, 2)
                },
                ...resources.map((resource) => ({
                    type: 'resource_link' as const,
                    uri: resource.uri,
                    name: resource.name,
                    description: resource.description,
                    ...(resource.mimeType && { mimeType: resource.mimeType })
                }))
            ],
            structuredContent: { resources }
        };
    }
  );


  // Simple prompt
  server.registerPrompt(
      'review-code',
      {
          title: 'Code Review',
          description: 'Review code for best practices and potential issues',
          argsSchema: { code: z.string() }
      },
      ({ code }) => ({
          messages: [
              {
                  role: 'user',
                  content: {
                      type: 'text',
                      text: `Please review this code:\n\n${code}`
                  }
              }
          ]
      })
  );
  
  // Prompt with context-aware completion
  server.registerPrompt(
      'team-greeting',
      {
          title: 'Team Greeting',
          description: 'Generate a greeting for team members',
          argsSchema: {
              department: completable(z.string(), value => {
                  // Department suggestions
                  return ['engineering', 'sales', 'marketing', 'support'].filter(d => d.startsWith(value));
              }),
              name: completable(z.string(), (value, context) => {
                  // Name suggestions based on selected department
                  const department = context?.arguments?.['department'];
                  if (department === 'engineering') {
                      return ['Alice', 'Bob', 'Charlie'].filter(n => n.startsWith(value));
                  } else if (department === 'sales') {
                      return ['David', 'Eve', 'Frank'].filter(n => n.startsWith(value));
                  } else if (department === 'marketing') {
                      return ['Grace', 'Henry', 'Iris'].filter(n => n.startsWith(value));
                  }
                  return ['Guest'].filter(n => n.startsWith(value));
              })
          }
      },
      ({ department, name }) => ({
          messages: [
              {
                  role: 'assistant',
                  content: {
                      type: 'text',
                      text: `Hello ${name}, welcome to the ${department} team!`
                  }
              }
          ]
      })
  );

  return server;
}