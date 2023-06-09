declare const env: {
	isDev: boolean;
};

declare type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T];
declare type OptionalKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T];

declare type ObjectMap<T> = { [key: string]: T };
declare type ExtractObjectMapType<T> = T extends ObjectMap<infer Type> ? Type : never;

declare namespace Tui
{
	const createElement: <T extends keyof JSX.IntrinsicElements | FC<P>, P extends {}>(type: T, props: P, ...children: any) => Element<T, P>;

	type Node = JSX.Element | string | number | boolean | null | undefined | Node[];

	type FC<P extends {}> = (props: P) => Element<FC<P>, P>;

	type Element<T extends keyof JSX.IntrinsicElements | Tui.FC<P>, P extends {}> = {
		type: T,
		props: P,
		children: Element<any, any>[]
	};

	type ConcreteElementChild = ConcreteElement | string | number | boolean | bigint;

	type ConcreteElement = {
		type: keyof JSX.IntrinsicElements | "root",
		props: any,
		children: ConcreteElementChild[]
	};

	type PropsWithChildren<P extends {} = {}> = P & {
		children?: Node | Node[]
	};

	type Color = {};

	type ElementProps = {
		children?: Node;
		width?: number | "grow" | "fill";
		height?: number | "grow" | "fill";
		background?: Color | "inherit";
		color?: Color | "inherit";
		direction?: "horizontal" | "vertical";
	};
}

declare namespace JSX
{
	type Children = JSX.Element[] | JSX.Element | string | number | boolean | null | undefined;

	interface ElementChildrenAttribute
	{
		children: Children;
	}

	type PromiseElement = Promise<{
		type: keyof JSX.IntrinsicElements | Tui.FC<any>,
		props: any,
		children: Tui.Node[]
	}>;

	type Element = {
		type: keyof JSX.IntrinsicElements | Tui.FC<any>,
		props: any,
		children: Tui.Node[]
	} | PromiseElement;

	interface IntrinsicElements
	{
		layout: Tui.ElementProps;
		text: import("./tui/elements/TextElement").TextProps;
	}
}