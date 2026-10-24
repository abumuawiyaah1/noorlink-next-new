import { Fragment, type ReactNode } from "react";

/**
 * Render a dictionary string that contains `{slot}` placeholders with React
 * nodes (links, bold, etc.) so word order can differ per locale.
 */
export function renderTemplate(
  text: string,
  slots: Record<string, ReactNode>,
): ReactNode {
  const parts = text.split(/\{(\w+)\}/g);
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <Fragment key={index}>{slots[part] ?? `{${part}}`}</Fragment>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
