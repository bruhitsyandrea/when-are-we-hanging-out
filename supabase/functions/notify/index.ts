import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  const payload = await req.json();

  const record = payload.record ?? payload.new ?? payload;

  if (!record) {
    return new Response("No record found", { status: 400 });
  }

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "lisachen20000226@gmail.com",
    subject: `New Café Order from ${record.name}`,
    html: `
      <div style="font-family: monospace; max-width: 400px;">
        <h2 style="text-align:center;">CAFÉ WITH ANDREA</h2>
        <p>----------------------------------------</p>
        <p>Order ID: ${Math.floor(1000 + Math.random() * 9000)}</p>
        <p>Date: ${record.date}</p>
        <p>----------------------------------------</p>

        <p>Name: ${record.name}</p>
        <p>Order: ${record.options?.join(", ")}</p>
        <p>Details: ${record.details || "-"}</p>
        <p>Contact: ${record.contact}</p>

        <p>----------------------------------------</p>
        <p>Status: Pending Review</p>
      </div>
    `,

  });

  return new Response("ok");
});
