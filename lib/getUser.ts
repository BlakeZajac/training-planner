import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@/lib/useAuth";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function getUser() {
    const auth = useAuth();
    if (!auth) return null;

    const { data, error } = await supabase.from("users").select("*").eq("id", auth.id).single();

    if (error) {
        console.error("Error fetching user data:", error);
        return null;
    }

    return data;
}
