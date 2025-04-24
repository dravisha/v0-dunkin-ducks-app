import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"

export async function POST() {
  const supabase = getSupabaseClient()

  await supabase.auth.signOut()

  return NextResponse.json({ success: true })
}
