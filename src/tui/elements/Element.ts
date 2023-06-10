import { Color } from "@tui/Color";

export abstract class Element<P extends {}>
{
	private static readonly elements: { [key: string]: new <P extends {}>(props: P) => Element<P> } = {};

	public static readonly register = (name: string) => (ctor: Function) =>
	{
		Element.elements[name] = ctor as any;
	}

	public static readonly create = <P extends {}>(name: string, props: P, children: Element<any>[] = []): Element<P> =>
	{
		const ElementType = this.elements[name];

		if (!ElementType)
			throw new Error(`${name} is not registered!`);

		return new ElementType(props);
	}

	public readonly props: P;
	public readonly children: Element<any>[];

	protected parent: Element<any> | null = null;

	public readonly layout: Layout = {
		width: 0,
		height: 0,
		x: 0,
		y: 0,
		direction: "vertical"
	};
	
	public readonly style: Style;

	public get color(): Color.Type {
		if(this.style.color)
			return this.style.color;
		if(this.parent)
			return this.parent.color;
		return Color.Default;
	}

	public get background(): Color.Type {
		if(this.style.background)
			return this.style.background;
		if(this.parent)
			return this.parent.background;
		return Color.Default;
	}

	public constructor(props: Partial<Layout> & P & Style, children: Element<any>[] = [])
	{
		this.props = props;
		this.layout.direction = props.direction || "vertical";
		this.children = children;
		this.style = {
			background: props.background,
			color: props.color
		} as Style;
	}

	public readonly append = <P extends {}>(element: Element<P>): Element<P> =>
	{
		this.children.push(element);
		element.parent = this;
		return element;
	}

	public readonly prevSibling = () =>
	{
		if (!this.parent)
			return null

		const i = this.parent.children.indexOf(this);

		if (i <= 0)
			return null;

		return this.parent.children[i - 1];
	}

	public readonly nextSibling = () =>
	{
		if (!this.parent)
			return null

		const i = this.parent.children.indexOf(this);

		if (i >= this.parent.children.length)
			return null;

		return this.parent.children[i + 1];
	}

	public abstract calculateLayout(): void;

	public abstract render(): void;
}

export type Layout = {
	width: number;
	height: number;
	x: number;
	y: number;
	direction: "horizontal" | "vertical";
};

export type Style  = {
	color?: Color.Type;
	background?: Color.Type;
};