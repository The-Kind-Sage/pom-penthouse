import { createFileRoute } from "@tanstack/react-router";
import { useContactMessages, useMarkContactRead } from "@/lib/hooks";
import { toast } from "sonner";
import { Mail, MailOpen, Clock, User } from "lucide-react";

export const Route = createFileRoute("/admin/inquiries")({
  component: InquiriesPage,
});

function InquiriesPage() {
  const { data: messages, isLoading } = useContactMessages();
  const markRead = useMarkContactRead();

  const handleMarkRead = async (id: string) => {
    try {
      await markRead.mutateAsync(id);
      toast.success("Marked as read");
    } catch {
      toast.error("Failed to mark as read");
    }
  };

  const unread = messages?.filter((m: any) => !m.read)?.length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Inquiries</h1>
          <p className="text-sm text-foreground/60">
            {unread > 0 ? `${unread} unread message${unread > 1 ? "s" : ""}` : "No new messages"}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-sm text-foreground/60">Loading...</div>
      ) : !messages?.length ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-20 text-foreground/40">
          <Mail className="size-10" />
          <p className="text-sm">No inquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg: any) => (
            <div
              key={msg.id}
              className={`rounded-xl border p-5 transition ${
                msg.read ? "bg-background" : "border-gold/30 bg-gold/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 grid size-9 shrink-0 place-items-center rounded-full ${msg.read ? "bg-muted" : "bg-gold/10"}`}>
                    {msg.read ? <MailOpen className="size-4 text-muted-foreground" /> : <Mail className="size-4 text-gold" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{msg.name}</span>
                      {!msg.read && <span className="size-1.5 rounded-full bg-gold" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{msg.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {new Date(msg.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </div>
              </div>
              <p className="mt-3 whitespace-pre-line text-sm text-foreground/80">{msg.message}</p>
              {!msg.read && (
                <button
                  onClick={() => handleMarkRead(msg.id)}
                  disabled={markRead.isPending}
                  className="mt-3 text-xs text-gold hover:underline disabled:opacity-50"
                >
                  Mark as read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
