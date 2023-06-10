import { Color } from "@tui/Color";
import { Element } from "@tui/elements/Element";

@Element.register("text")
export class TextElement extends Element<TextProps>
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
		const lines = this.props.text.split("\n");
		this.layout.height = lines.length;
		this.layout.width = lines.reduce((a, b) => a > b.length ? a : b.length, 0);

		const direction = this.parent?.layout.direction || "vertical";
		this.calculatePosition(direction);
	}

	public render(): void
	{
		// console.log("\n\n", this.layout.x, this.layout.y)
		const w = this.layout.x+ this.layout.width;
		const h = this.layout.y+ this.layout.height;
		for(let j = this.layout.y; j < h; j++)
			for(let i = this.layout.x; i < w; i++)
			process.stdout.write(`\x1b[${j + 1};${i + 1}H${Color.create(this.color || Color.Default, this.background)} `);

		process.stdout.write(`\x1b[${this.layout.y + 1};${this.layout.x + 1}H${Color.create(this.color || Color.Default, this.background)}${this.props.text}`);
	}
}

export type TextProps = {
	text: string;
	color?: Color.Type;
	background?: Color.Type;
};