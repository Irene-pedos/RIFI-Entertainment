import { createClient } from "@supabase/supabase-js";
import { env } from "../env.js";
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, // Use service role for admin access
{
    auth: {
        persistSession: false,
    },
});
/**
 * Upload a file to Supabase Storage
 */
export const uploadToStorage = async (bucket, path, file, contentType) => {
    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
        contentType,
        upsert: true,
    });
    if (error)
        throw error;
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
    return {
        path: data.path,
        publicUrl: urlData.publicUrl,
    };
};
/**
 * Delete a file from Supabase Storage
 */
export const deleteFromStorage = async (bucket, path) => {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error)
        throw error;
};
