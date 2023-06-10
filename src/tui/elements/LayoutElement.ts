import { Color } from "@tui/Color";
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
		const { height = "grow", width = "grow" } = this.props;

		const direction = this.parent?.layout.direction || "vertical";
		
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
			if(this.layout.direction === "horizontal")
			{
				this.layout.width = this.children.reduce((a, b) => b.layout.width + a, 0);
			}
			else
			{
				this.layout.width = this.children.reduce((a, b) => b.layout.width > a ? b.layout.width : a, 0);
			}
			
		}

		if(height === "grow")
		{
			if(this.layout.direction === "horizontal")
			{
				this.layout.height = this.children.reduce((a, b) => b.layout.height > a ? b.layout.height : a, 0);
			}
			else
			{
				this.layout.height = this.children.reduce((a, b) => b.layout.height + a, 0);
			}
		}

		this.calculatePosition(direction);

		this.children.forEach(c => c.calculateLayout());
	}

	public override render()
	{
		// console.log(this.layout);
		const w = this.layout.x+ this.layout.width;
		const h = this.layout.y+ this.layout.height;
		for(let j = this.layout.y; j < h; j++)
			for(let i = this.layout.x; i < w; i++)
				process.stdout.write(`\x1b[${j + 1};${i + 1}H${Color.create(this.color || Color.Default, this.background)} `);
		
		this.children.forEach(c => c.render());
	}
}

export type LayoutProps = {
	width?: number | "grow" | "fill";
	height?: number | "grow" | "fill";
	direction?: "horizontal" | "vertical";
	color?: Color.Type;
	background?: Color.Type;
};