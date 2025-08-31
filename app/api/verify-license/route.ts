import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { licenseKey } = await req.json();

    const Key = 'FOLIO-1234-ABCD-5678';
    if (Key === licenseKey) {
      return NextResponse.json({ valid: true });
    } else {
      return NextResponse.json({ valid: false });
    }

    // Example Gumroad verification
    /* const resp = await fetch("https://api.gumroad.com/v2/licenses/verify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        product_id: process.env.GUMROAD_PRODUCT_ID!, // add this in .env
        license_key: licenseKey,
      }),
    });

    const data = await resp.json();

    if (data.success) {
      return NextResponse.json({ valid: true });
    } else {
      return NextResponse.json({ valid: false });
    } */
  } catch (err) {
    console.error("License check error:", err);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
