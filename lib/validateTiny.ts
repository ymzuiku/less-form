type Types = "string" | "array" | "object" | "number" | "boolean";

type ValidateValue = {
  regexp?: RegExp;
  requred?: boolean;
  type?: Types;
  min?: number;
  max?: number;
  pick?: Set<string>;
  errors: {
    regexp: string;
    required: string;
    type: string;
    min: string;
    max: string;
    pick: string;
  };
};

export type ValidateSchema = Record<string, SchemaItem>;

export const schema = {
  string: (e: string) => makeVali("string", e),
  array: (e: string) => makeVali("array", e),
  boolean: (e: string) => makeVali("boolean", e),
  object: (e: string) => makeVali("object", e),
  number: (e: string) => makeVali("number", e),
};

export interface SchemaItem {
  required: (e: string) => SchemaItem;
  regexp: (reg: RegExp, e: string) => SchemaItem;
  min: (min: number, e: string) => SchemaItem;
  max: (max: number, e: string) => SchemaItem;
  pick: (list: Array<string>, e: string) => SchemaItem;
}

function makeVali(defType: Types, defErr: string): SchemaItem {
  const out = {
    __schemaItem: { errors: {} } as ValidateValue,
    required: (e: string) => {
      out.__schemaItem.errors.required = e;
      out.__schemaItem.requred = true;
      return out;
    },
    regexp: (reg: RegExp, e: string) => {
      out.__schemaItem.errors.regexp = e;
      out.__schemaItem.regexp = reg;
      return out;
    },
    min: (min: number, e: string) => {
      out.__schemaItem.errors.min = e;
      out.__schemaItem.min = min;
      return out;
    },
    max: (max: number, e: string) => {
      out.__schemaItem.errors.max = e;
      out.__schemaItem.max = max;
      return out;
    },
    pick: (list: Array<string>, e: string) => {
      out.__schemaItem.errors.pick = e;
      out.__schemaItem.pick = new Set(list);
      return out;
    },
  };
  out.__schemaItem.type = defType;
  out.__schemaItem.errors.type = defErr;

  return out;
}

const rights = {
  type: (value: any, type?: Types) => {
    if (type === undefined) {
      return true;
    }
    if (type === "array" && Array.isArray(value)) {
      return true;
    }

    return typeof value === type;
  },
  min: (value: any, min?: number) => {
    if (min === undefined) {
      return true;
    }
    if (typeof value === "number") {
      return value > min;
    }
    if (value && value.length) {
      return value.length > min;
    }
    return false;
  },
  max: (value: any, max?: number) => {
    if (max === undefined) {
      return true;
    }
    if (typeof value === "number") {
      return value < max;
    }
    if (value && value.length) {
      return value.length < max;
    }
    return false;
  },
  pick: (value: any, pick?: Set<string>) => {
    if (pick === undefined) {
      return true;
    }
    if (!value) {
      return false;
    }
    if (Array.isArray(value) && value.find((v) => !pick.has(v))) {
      return false;
    }
    if (!pick.has(value)) {
      return false;
    }
    return true;
  },
};

export function validateChecker(
  schema: Record<string, SchemaItem>,
  values: Record<string, any>,
  key?: string
): Record<string, string> {
  const errors: Record<string, string> = {};
  const checkKey = (key: string) => {
    const item = (schema[key] as any).__schemaItem as ValidateValue;
    const value = values[key];
    let len = 0;
    if (item.requred && !value) {
      errors[key] = item.errors.required;
    } else if (!rights.type(value, item.type)) {
      errors[key] = item.errors.type;
    } else if (!rights.min(value, item.min)) {
      errors[key] = item.errors.min;
    } else if (!rights.max(value, item.max)) {
      errors[key] = item.errors.max;
    } else if (item.regexp && !item.regexp.test(value)) {
      errors[key] = item.errors.regexp;
    } else if (!rights.pick(value, item.pick)) {
      errors[key] = item.errors.regexp;
    }
  };
  if (key) {
    checkKey(key);
  } else {
    Object.keys(schema).forEach(checkKey);
  }

  return errors;
}
