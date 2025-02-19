import React from "react";
import ThreeScene from "./new-ar";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const headersList = headers();
  const value = (await headersList).get("x-forwarded-host");

  return notFound();

  return <ThreeScene index={Number(id)} value={`https://${value}/nft/${id}`} />;
}
