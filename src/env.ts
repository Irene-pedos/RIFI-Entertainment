import { z } from "zod";

/**
 * Server-side environment variables schema.
 * These are only available in the Node.js runtime.
 */
const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),
  JWT_SECRET: z.string().min(8),
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

/**
 * Client-side environment variables schema.
 * These are prefixed with NEXT_PUBLIC_ and are available in the browser.
 */
const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

/**
 * A manual way to expose variables to the client.
 * Next.js will only include variables prefixed with NEXT_PUBLIC_ in the client bundle.
 */
const clientEnv = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

const isServer = typeof window === "undefined";

const mergedSchema = serverSchema.merge(clientSchema);

// Parse all variables on the server, only client-safe ones on the client.
const _env = isServer
  ? mergedSchema.safeParse(process.env)
  : clientSchema.safeParse(clientEnv);

if (!_env.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(_env.error.format(), null, 2)
  );
  throw new Error("Invalid environment variables");
}

// Use a Proxy to prevent accessing server-side variables on the client.
export const env = new Proxy(_env.data, {
  get(target, prop) {
    if (typeof prop !== "string") return undefined;

    // On the client, prevent access to non-public variables
    if (!isServer && !prop.startsWith("NEXT_PUBLIC_")) {
      throw new Error(
        `❌ Attempted to access server-side environment variable '${prop}' on the client.`
      );
    }

    return target[prop as keyof typeof target];
  },
}) as z.infer<typeof serverSchema> & z.infer<typeof clientSchema>;
