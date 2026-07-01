import { z } from 'zod';

interface IValidationOptions {
  message?: string;
}

interface IPasswordValidationOptions extends IValidationOptions {
  uppercaseMessage?: string;
  lowercaseMessage?: string;
  numberMessage?: string;
  specialCharMessage?: string;
  minLength?: number;
  minLengthMessage?: string;
}
interface IFileValidationOptions extends IValidationOptions {
  maxSizeMB?: number;
  allowedTypes?: string[];
}

export const VALIDATION = {
  // Required Validation

  required: (variantErrorMessage?: IValidationOptions) =>
    z
      .string()
      .trim()
      .min(1, { message: variantErrorMessage?.message || 'this field  is required' }),

  // Email Validation
  email: (variantErrorMessage?: IValidationOptions) =>
    z
      .string()
      .trim()
      .min(1, { message: 'Your email is required ' })

      .email({ message: variantErrorMessage?.message || 'Invalid email' }),

  // phone Validation

  phone: (variantErrorMessage?: IValidationOptions) =>
    z
      .string()
      .trim()
      .regex(/^\+?[1-9]\d{1,14}$/, {
        message: variantErrorMessage?.message || 'Invalid phone number',
      }),

  // Password Validation

  password: (variantErrorMessage?: IPasswordValidationOptions) =>
    z
      .string()
      .min(1, { message: variantErrorMessage?.message || 'Your password is required' })
      .min(variantErrorMessage?.minLength || 8, {
        message:
          variantErrorMessage?.minLengthMessage ||
          `Password must be at least ${variantErrorMessage?.minLength || 8} characters`,
      })
      .regex(/[A-Z]/, {
        message: variantErrorMessage?.uppercaseMessage || 'At least one uppercase letter required',
      })
      .regex(/[a-z]/, {
        message: variantErrorMessage?.lowercaseMessage || 'At least one lowercase letter required',
      })
      .regex(/[0-9]/, {
        message: variantErrorMessage?.numberMessage || 'At least one number required',
      })
      .regex(/[@$!%*?&]/, {
        message:
          variantErrorMessage?.specialCharMessage ||
          'At least one special character required (@$!%*?&)',
      }),

  // Number Validation

  number: (bounds?: { min?: number; max?: number }, variantErrorMessage?: IValidationOptions) => {
    let schema = z.coerce.number({ message: variantErrorMessage?.message || 'Invalid number' });
    if (bounds?.min !== undefined)
      schema = schema.min(bounds.min, { message: `The minimum is ${bounds.min}` });
    if (bounds?.max !== undefined)
      schema = schema.max(bounds.max, { message: ` The maximum is ${bounds.max}` });
    return schema;
  },

  // File Type & Size Validation

  file: (variantErrorMessage?: IFileValidationOptions) => {
    // Default is  5 MB
    const MAX_FILE_SIZE = (variantErrorMessage?.maxSizeMB || 5) * 1024 * 1024;

    return (
      z
        .custom<FileList | File[]>(
          (val) => {
            if (!val) return false;
            if (val instanceof FileList) return true;
            if (Array.isArray(val)) return val.every((f) => f instanceof File);
            return false;
          },
          { message: 'The attached file is invalid ' }
        )
        .transform((val) => (val instanceof FileList ? Array.from(val) : val))
        .refine((files) => files.length > 0, {
          message: variantErrorMessage?.message || 'Please select at least one file.',
        })
        // Size verification
        .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), {
          message: `The file size must not exceed ${variantErrorMessage?.maxSizeMB || 5} Mb`,
        })
        // Type verification
        .refine(
          (files) => {
            if (!variantErrorMessage?.allowedTypes || variantErrorMessage.allowedTypes.length === 0)
              return true;
            return files.every((file) => variantErrorMessage.allowedTypes!.includes(file.type));
          },
          {
            message: `File type not supported. Allowed types: ${variantErrorMessage?.allowedTypes?.join(', ')}`,
          }
        )
    );
  },

  // Confirm Passwords
  matchPassword: <T extends z.ZodRawShape>(
    passwordKey: string = 'password',
    confirmPasswordKey: string = 'confirmPassword',
    customMessage?: string
  ) => {
    return (schema: z.ZodObject<T>) =>
      schema.refine(
        (data) => {
          const password = String(data[passwordKey as keyof typeof data]);
          const confirmPassword = String(data[confirmPasswordKey as keyof typeof data]);
          return password === confirmPassword;
        },
        {
          message: customMessage || 'Passwords do not match',
          path: [confirmPasswordKey],
        }
      );
  },
};
