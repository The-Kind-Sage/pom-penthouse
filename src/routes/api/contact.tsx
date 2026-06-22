import { createFileRoute } from "@tanstack/react-router";
import { createServiceClient } from "@/lib/supabase-server";
import { sendContactNotification } from "@/lib/email";
import { contactSchema } from "@/lib/validators";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const validated = contactSchema.parse(body);

          const supabase = createServiceClient();
          const { error } = await supabase
            .from("contact_messages")
            .insert({
              name: validated.name,
              email: validated.email,
              message: validated.message,
            });

          if (error) throw error;

          // Send notification email
          sendContactNotification({
            name: validated.name,
            email: validated.email,
            message: validated.message,
          }).catch(console.error);

          return new Response(JSON.stringify({ success: true }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err: any) {
          const message = err?.issues?.[0]?.message || err?.message || "Failed to send message";
          return new Response(JSON.stringify({ success: false, error: message }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
