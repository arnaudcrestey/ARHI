import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { positionId } = body;

    if (!positionId) {
      return NextResponse.json(
        { error: "Identifiant du poste manquant." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("arhi_positions")
      .update({ status: "closed" })
      .eq("id", positionId);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur lors de la clôture du poste." },
      { status: 500 }
    );
  }
}
