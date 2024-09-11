import { type ResultSet } from "@libsql/client/web";

type Transformer<T> = Record<string, keyof T | {
  key: keyof T;
  parser: (value: unknown) => T[keyof T];
}>;

export const transmog = <T>(
  transformer: Transformer<T>,
  resultSet?: ResultSet,
) => {
  const collection = new Map<string, Partial<T>>();
  const result = new Set<string>();
  const keys = Object.keys(transformer);

  if (typeof resultSet !== "undefined") {
    resultSet.rows.forEach((row) => {
      const id = row[keys[0] as string]; // Assuming the first key is the ID field
      if (typeof id === "string") {
        result.add(id);
        const newData: Partial<T> = {};
        keys.forEach((name) => {
          const field = transformer[name];
          const value = row[name];
          if (typeof field === "string") {
            newData[field as keyof T] = value as T[keyof T];
          } else if (typeof field === "object" && field.key && field.parser) {
            newData[field.key] = field.parser(value);
          }
        });

        collection.set(id, { ...collection.get(id), ...newData });
      }
    });
  }

  return {
    collection: Object.fromEntries(collection),
    result: Array.from(result),
  };
};
