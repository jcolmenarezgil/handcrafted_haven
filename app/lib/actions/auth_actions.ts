"use server";

import { redirect } from "next/navigation";
import { destroySession } from "@/app/lib/auth";

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
