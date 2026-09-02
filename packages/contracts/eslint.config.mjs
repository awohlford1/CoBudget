import parser from "@typescript-eslint/parser";
import { defineConfig, globalIgnores } from "eslint/config";

/**
 * Lint rules that enforce the claim this package makes about itself.
 *
 * CBD-109 requires that nothing here reaches for a database, queue, or provider
 * SDK, and CBD-17 places those with CBD-19, CBD-103, and CBD-104 respectively.
 * A convention nobody checks is not a constraint, so the claim is a failing
 * build rather than a comment.
 */

const BOUNDARY_MESSAGE =
  "CBD-109 keeps the contract package free of databases, queues, and provider " +
  "SDKs so that both applications can depend on it without either inheriting " +
  "the other's infrastructure. Persistence arrives with CBD-19, hosting " +
  "clients with CBD-103, and identity with CBD-104. Put the dependency in the " +
  "application that needs it.";

const INFRASTRUCTURE_PATTERNS = [
  "pg",
  "pg-*",
  "postgres",
  "mysql*",
  "sqlite*",
  "better-sqlite3",
  "typeorm",
  "prisma",
  "@prisma/*",
  "knex",
  "drizzle-orm",
  "ioredis",
  "redis",
  "bullmq",
  "bull",
  "amqplib",
  "kafkajs",
  "@aws-sdk/*",
  "aws-sdk",
  "@google-cloud/*",
  "@azure/*",
  "plaid",
  "@nestjs/*",
  "fastify",
  "express",
  "next",
];

export default defineConfig([
  globalIgnores(["node_modules/**"]),

  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser,
      ecmaVersion: 2023,
      sourceType: "module",
    },
    rules: {
      "no-restricted-imports": [
        "error",
        { patterns: [{ group: INFRASTRUCTURE_PATTERNS, message: BOUNDARY_MESSAGE }] },
      ],
    },
  },
]);
