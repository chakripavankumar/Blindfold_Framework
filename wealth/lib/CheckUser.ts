import { currentUser } from "@clerk/nextjs/server";
import { db } from "./Prisma";

// Define the return type explicitly
export const CheckUser = async () => {
  // Use Clerk's user type for better type safety
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl || "",
        email: user.emailAddresses[0]?.emailAddress || "",
      },
    });

    return newUser; // Ensure new user is returned
  } catch (error: unknown) {
    // Ensure proper error handling
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred.");
    }
    return null; // Return null in case of error
  }
};