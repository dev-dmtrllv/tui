import { Element } from "@tui/elements/Element";

@Element.register("text")
export class TextElement extends Element<TextElementProps>
{
	
}

type TextElementProps = {
	text: string;
};