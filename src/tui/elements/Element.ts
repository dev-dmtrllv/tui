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

	public constructor(props: Partial<Layout> & P, children: Element<any>[] = [])
	{
		this.props = props;
		this.layout.direction = props.direction || "vertical";
		this.children = children;
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