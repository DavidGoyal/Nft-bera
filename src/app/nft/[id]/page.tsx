import React from "react";
import ThreeScene from "./new-ar";
import { headers } from "next/headers";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const id = (await params).id;
	const headersList = headers();
	const value = (await headersList).get("x-forwarded-host");

	return <ThreeScene index={Number(id)} value={`https://${value}/nft/${id}`} />;
}
