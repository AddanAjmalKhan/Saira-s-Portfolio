import type { ResourceDef } from "@/lib/resources";

export interface ValidationResult {
  data: Record<string, unknown>;
  errors: Record<string, string>;
}

/**
 * Coerce a raw object (from JSON body) into typed, validated model data
 * according to a ResourceDef. Only known fields are kept.
 */
export function coerceAndValidate(
  resource: ResourceDef,
  raw: Record<string, unknown>,
): ValidationResult {
  const data: Record<string, unknown> = {};
  const errors: Record<string, string> = {};

  for (const field of resource.fields) {
    const value = raw[field.name];

    switch (field.type) {
      case "list":
      case "images": {
        const arr = Array.isArray(value)
          ? value.map((v) => String(v).trim()).filter(Boolean)
          : [];
        data[field.name] = arr;
        break;
      }
      case "number": {
        if (value === "" || value === null || value === undefined) {
          if (field.required) errors[field.name] = `${field.label} is required`;
          // leave undefined so create can apply a default (e.g. order)
          break;
        }
        const num = Number(value);
        if (Number.isNaN(num)) {
          errors[field.name] = `${field.label} must be a number`;
        } else {
          data[field.name] = num;
        }
        break;
      }
      default: {
        const str = value === null || value === undefined ? "" : String(value).trim();
        if (field.required && !str) {
          errors[field.name] = `${field.label} is required`;
        }
        // store empty optional strings as null for nullable columns
        if (str === "" && !field.required) {
          data[field.name] = null;
        } else {
          data[field.name] = str;
        }
        if (field.type === "email" && str && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)) {
          errors[field.name] = `${field.label} must be a valid email`;
        }
      }
    }
  }

  return { data, errors };
}
