// "use client";

// import { LOGIN_SCHEMA } from "@/features/auth/schemas/login.schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";
// import * as z from "zod";

// type FormValues = z.infer<typeof LOGIN_SCHEMA>;

// export default function LoginForm() {
//   const form = useForm<FormValues>({
//     resolver: zodResolver(LOGIN_SCHEMA),
//     defaultValues: {
//       username: "",
//       password: "",
//     },
//   });

//   const { login, isPending ,error } = useLogin();

//   const onSubmit = (data: FormValues) => {
//     login(data);
//   };

//   return (
//     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
//       <FieldGroup>
//         <Controller
//           name="username"
//           control={form.control}
//           render={({ field, fieldState }) => (
//             <Field className="w-full" data-invalid={fieldState.invalid}>
//               <FieldLabel>Username</FieldLabel>

//               <Input
//                 {...field}
//                 placeholder="Ahmed"
//                 autoComplete="username"
//               />

//               {fieldState.invalid && (
//                 <FieldError errors={[fieldState.error]} />
//               )}
//             </Field>
//           )}
//         />

//         <Controller
//           name="password"
//           control={form.control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid}>
//               <FieldLabel>Password</FieldLabel>

//               <InputGroup>
//                 <PasswordField
//                   {...field}
//                   id="password"
//                   autoComplete="current-password"
//                 />
//               </InputGroup>
//               {fieldState.invalid && (
//                 <FieldError errors={[fieldState.error]} />
//               )}
//               <Link
//                 href="/forget-password"
//                 className="flex justify-end text-sm font-medium text-blue-600"
//               >
//                 Forgot password?
//               </Link>

//             </Field>
//           )}
//         />
//         {error && (
//   <ErrorAlert message={error || "Something went wrong"} />
// )}
//       </FieldGroup>

//       <RegisterButton variant="submit" isPending={isPending} />
//     </form>
//   );
// }
