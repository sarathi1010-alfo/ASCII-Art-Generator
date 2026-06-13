interface Props {
  schema: Record<string, unknown> | Record<string, unknown>[] | null;
}

export function JsonLd({ schema }: Props) {
  if (!schema) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
