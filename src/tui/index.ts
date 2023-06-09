export * from "./Renderer";

(global as any).Tui = {
	createElement: <T extends string, P extends {}>(type: T, props: P, ...children: any) =>
	{
		// console.log({
		// 	type,
		// 	props,
		// 	children
		// })
		return {
			type,
			props,
			children
		};
	}
};