import { z } from "zod";

export const bankCardSchema = z.object({
  country: z.string().min(1, "Select country to continue"),
  firstName: z
    .string()
    .min(1, "First name must match")
    .min(3, "First name must be at least 3 characters")
    .trim(),
  lastName: z
    .string()
    .min(1, "Last name must match")
    .min(3, "Last name must be at least 3 characters")
    .trim(),
  cardNumber: z
    .string()
    .min(1, "Card number is required")
   ,
  month: z
    .string()
    .min(1, "Expiration month is required")
    .refine(
      (month) => {
        const monthNum = parseInt(month);
        return !isNaN(monthNum) && monthNum >= 1 && monthNum <= 12;
      },
      { message: "Invalid month" }
    ),
  year: z
    .string()
    .min(1, "Expiration year is required")
    .refine(
      (year) => {
        const yearNum = parseInt(year);
        const currentYear = new Date().getFullYear();
        return !isNaN(yearNum) && yearNum >= currentYear && yearNum <= currentYear + 20;
      },
      { message: "Invalid year" }
    ),
})
export const profileSchema = z.object({
    avatarImage: z.string().optional(),
    name: z
      .string()
      .min(1, "please enter name")
      .min(3, "Username must be at least 3 characters"),
    about: z.string().min(1, "Please enter info about yourself"),
    socialMediaURL: z.string().min(1, "Please enter a social link"),
  });
  export const passwordSchema = z.object({
    password : z.string().min(1, "please enter your password").min(8, "Password must be at least 8 characters"),
    confirmPassword : z.string().min(1, "please confirm your password")
  }).refine((data)=>data.confirmPassword === data.password,{
    message : 'Password do not match',
    path:['confirmPassword']
  })