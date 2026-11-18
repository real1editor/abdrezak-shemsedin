"use server";

export interface ContactFormState {
  success: boolean;
  message?: string;
  error?: string;
}

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = (formData.get("name") as string)?.trim() || "";
  const email = (formData.get("email") as string)?.trim() || "";
  const message = (formData.get("message") as string)?.trim() || "";

  if (!name || name.length < 2) {
    return { success: false, error: "Please enter your name (at least 2 characters)." };
  }

  if (!email || email.length < 3) {
    return { success: false, error: "Please provide a valid email or contact handle." };
  }

  if (!message || message.length < 5) {
    return { success: false, error: "Please include a message (at least 5 characters)." };
  }

  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  if (telegramBotToken && telegramChatId) {
    try {
      const text = `📬 *New Portfolio Inquiry*\n\n*Name:* ${name}\n*Contact:* ${email}\n\n*Message:*\n${message}`;
      const res = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text,
          parse_mode: "Markdown",
        }),
      });

      if (!res.ok) {
        console.error("Telegram send failed:", await res.text());
      }
    } catch (err) {
      console.error("Failed to dispatch Telegram notification:", err);
    }
  }

  return {
    success: true,
    message: "Thank you! Your message has been sent successfully. I'll get back to you soon.",
  };
}
