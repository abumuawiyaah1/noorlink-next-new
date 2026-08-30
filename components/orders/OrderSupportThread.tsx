"use client";

import { useEffect, useState } from "react";
import { fetchOrderSupportMessages, type SupportMessageItem } from "@/lib/orders-api";

type OrderSupportThreadProps = {
  orderNumber: string;
  email: string;
};

export function OrderSupportThread({ orderNumber, email }: OrderSupportThreadProps) {
  const [messages, setMessages] = useState<SupportMessageItem[]>([]);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const result = await fetchOrderSupportMessages(email, orderNumber);
      if (cancelled) return;
      setMessages(result.messages ?? []);
      setTicketNumber(result.ticketNumber ?? null);
      setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [email, orderNumber]);

  if (!loaded || messages.length === 0) {
    return null;
  }

  return (
    <div className="order-support-thread">
      <div className="order-usage__label-row">
        <span>Support</span>
        <strong>{ticketNumber ? `Ticket ${ticketNumber}` : "Messages"}</strong>
      </div>
      <ul className="order-support-thread__list">
        {messages.map((msg, index) => (
          <li
            key={`${msg.createdAt ?? index}-${msg.direction}`}
            className={
              msg.direction === "outbound"
                ? "order-support-thread__item order-support-thread__item--staff"
                : "order-support-thread__item"
            }
          >
            <div className="order-support-thread__meta">
              <span>{msg.direction === "outbound" ? "NoorLink" : "You"}</span>
              {msg.createdAt ? (
                <time dateTime={msg.createdAt}>{new Date(msg.createdAt).toLocaleString()}</time>
              ) : null}
            </div>
            <p>{msg.body}</p>
          </li>
        ))}
      </ul>
      <p className="order-usage__fine-print">
        Reply by email to continue this thread, or use{" "}
        <a href={`/support?email=${encodeURIComponent(email)}&orderId=${encodeURIComponent(orderNumber)}`}>
          Support
        </a>
        .
      </p>
    </div>
  );
}
