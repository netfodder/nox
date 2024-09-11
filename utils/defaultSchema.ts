import { Schema, object, string } from "yup";

export const defaultObjectSchema = object().noUnknown(true).strict(true);

export const uidRegEx = /^[0-9a-f]{32}$/i;

export const uidSchema = string().matches(uidRegEx).required();

export const uidDefinedSchema = string().matches(
  uidRegEx,
  { excludeEmptyString: true }
).defined();

export const titleSchema = (reserve: number) =>
  string()
    .min(3)
    .max(60 - reserve)
    .required();

export const descriptionSchema = string().max(160).defined();

export const emailSchema = string().email().required();

export const passwordSchema = string().min(8).required();

export const idObjectSchema: Schema<{ id: string }> = defaultObjectSchema.shape({
  id: uidSchema,
});
