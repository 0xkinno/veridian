import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url().optional(),
  VERIDIAN_ENV: z.enum(["development", "test", "production"]).default("development"),
  KANE_CLI_PATH: z.string().min(1).default("kane-cli"),
});

export type VeridianConfig = z.infer<typeof envSchema>;

export function loadConfig(environment: NodeJS.ProcessEnv = process.env): VeridianConfig {
  return envSchema.parse(environment);
}
