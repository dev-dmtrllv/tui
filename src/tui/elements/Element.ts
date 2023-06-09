export class Element<P extends {}>
{
	private static readonly elements: { [key: string]: new <P extends {}>(props: P) => Element<P> } = {};

	public static readonly register = (name: string) => (ctor: Function) =>
	{
		Element.elements[name] = ctor as any;
	}

	public static readonly create = <P extends {}>(name: string, props: P, children: Element<any>[] = []): Element<P> =>
	{
		const ElementType = this.elements[name];

		if(!ElementType)
			throw new Error(`${name} is not registered!`);

		return new ElementType(props);
	}

	protected readonly props: P;
	protected readonly children: Element<any>[];

	public constructor(props: P, children: Element<any>[] = [])
	{
		this.props = props;
		this.children = children;
	}

	public readonly append = <P extends {}>(element: Element<P>): Element<P> =>
	{
		this.children.push(element);
		return element;
	}
}