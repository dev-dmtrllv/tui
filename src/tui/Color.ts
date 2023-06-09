
export namespace Color
{
	export const Black = Symbol(30); //	40
	export const Red = Symbol(31); // 41
	export const Green = Symbol(32); //	42
	export const Yellow = Symbol(33); // 43
	export const Blue = Symbol(34); // 44
	export const Magenta = Symbol(35); // 45
	export const Cyan = Symbol(36); // 46
	export const White = Symbol(37); //	47
	export const Default = Symbol(39); // 49

	export type Type =
		| typeof Black
		| typeof Red
		| typeof Green
		| typeof Yellow
		| typeof Blue
		| typeof Magenta
		| typeof Cyan
		| typeof White
		| typeof Default;

	const getStyleCode = (style: Style) =>
	{
		switch (style)
		{
			case "bold":
				return 1;
			case "dimmed":
				return 2;
			default:
				return 0;
		}
	};

	export type Style = "bold" | "dimmed" | "normal";

	export const create = (fg: Type, bg: Type = Color.Default, style: Style = "normal") => `\u001b[${getStyleCode(style)};${fg.description};${Number(bg.description) + 10}m`;
}