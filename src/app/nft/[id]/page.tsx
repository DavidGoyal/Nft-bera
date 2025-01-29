import React from "react";
import ThreeScene from "./ar";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const id = (await params).id;
	return <ThreeScene index={Number(id)} />;
}
