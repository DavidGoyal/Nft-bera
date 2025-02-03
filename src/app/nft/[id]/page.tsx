import React from "react";
import ThreeScene from "./new-ar";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const id = (await params).id;
	return <ThreeScene index={Number(id)} />;
}
