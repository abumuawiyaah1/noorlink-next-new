"use client";

import { useEffect, useState } from "react";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";
import { fetchOrderSupportMessages, type SupportMessageItem } from "@/lib/orders-api";

type OrderSupportThreadProps = {
  orderNumber: string;
  email: string;
};

export function OrderSupportThread({ orderNumber, email }: OrderSupportThreadProps) {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const ui = dict.ordersUi;
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

  const supportHref = `${localizedPath("/support", locale)}?email=${encodeURIComponent(email)}&orderId=${encodeURIComponent(orderNumber)}`;

  return (
    <div className="order-support-thread">
      <div className="order-usage__label-row">
        <span>{ui.supportLabel}</span>
        <strong>
          {ticketNumber
            ? t(dict, "ordersUi.ticket", { n: ticketNumber })
            : ui.messages}
        </strong>
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
              <span>
                {msg.direction === "outbound" ? ui.noorlink : ui.you}
              </span>
              {msg.createdAt ? (
                <time dateTime={msg.createdAt}>
                  {new Date(msg.createdAt).toLocaleString()}
                </time>
              ) : null}
            </div>
            <p>{msg.body}</p>
          </li>
        ))}
      </ul>
      <p className="order-usage__fine-print">
        {ui.replyByEmailBefore}{" "}
        <a href={supportHref}>{ui.supportLabel}</a>
        {ui.replyByEmailAfter}
      </p>
    </div>
  );
}
