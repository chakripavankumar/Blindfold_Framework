"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div>
      <SignIn routing="path" path="/sign-in" />
    </div>
  );
}