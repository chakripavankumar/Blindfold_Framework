"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div>
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
}