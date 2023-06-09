import { Element } from "@tui/elements/Element";

@Element.register("layout")
export class LayoutElement extends Element<LayoutProps>
{
	private readonly calculatePosition = (direction: "horizontal" | "vertical") =>
	{
		const prev = this.prevSibling();

		if(prev)
		{
			if(direction == "vertical")
			{
				this.layout.x = this.parent?.layout.x || 0;
				this.layout.y = prev.layout.y + prev.layout.height;
			}
			else
			{
				this.layout.x = prev.layout.x + prev.layout.width;
				this.layout.y = this.parent?.layout.y || 0;
			}
		}
		else
		{
			this.layout.x = this.parent?.layout.x || 0;
			this.layout.y = this.parent?.layout.y || 0;
		}
	}

	public calculateLayout(): void
	{
		const { height = "grow", width = "grow", direction = "vertical" } = this.props;
		
		if (height === "fill")
		{
			this.layout.height = this.parent?.layout.height || 0;
		}
		else if(typeof height === "number")
		{
			this.layout.height = height;
		}

		if (width === "fill")
		{
			this.layout.width = this.parent?.layout.width || 0;
		}
		else if(typeof width === "number")
		{
			this.layout.width = width;
		}

		this.children.forEach(c => c.calculateLayout());

		if(width === "grow")
		{
			if(direction === "vertical")
			{
				this.layout.width = this.children.reduce((a, b) => b.layout.width > a ? b.layout.width : a, 0);
			}
			else
			{
				this.layout.width = this.children.reduce((a, b) => b.layout.width + a, 0);
			}
		}

		if(height === "grow")
		{
			if(direction == "vertical")
			{
				this.layout.height = this.children.reduce((a, b) => b.layout.height + a, 0);
			}
			else
			{
				this.layout.height =  this.children.reduce((a, b) => b.layout.height > a ? b.layout.height : a, 0);
			}
		}

		this.calculatePosition(direction);

		this.children.forEach(c => c.calculateLayout());
	}

	public override render()
	{
		this.children.forEach(c => c.render());
	}
}

export type LayoutProps = {
	width?: number | "grow" | "fill";
	height?: number | "grow" | "fill";
	direction?: "horizontal" | "vertical";
};