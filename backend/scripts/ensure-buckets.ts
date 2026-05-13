import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function ensureBucket(name: string) {
  console.log(`Checking bucket: ${name}...`);
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  
  if (listError) {
    console.error("Error listing buckets:", listError);
    return;
  }

  const exists = buckets.find(b => b.name === name);
  if (!exists) {
    console.log(`Bucket ${name} not found. Creating...`);
    const { data, error } = await supabase.storage.createBucket(name, {
      public: true,
      fileSizeLimit: 10485760, // 10MB
    });
    
    if (error) {
      console.error(`Error creating bucket ${name}:`, error);
    } else {
      console.log(`Bucket ${name} created successfully.`);
    }
  } else {
    console.log(`Bucket ${name} already exists.`);
  }
}

async function main() {
  await ensureBucket("rifi-media");
}

main().catch(console.error);
