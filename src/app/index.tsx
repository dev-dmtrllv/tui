import { App } from "@tui/App";
import { Color } from "@tui/Color";
import { Terminal } from "@tui/Terminal";

Terminal.run(class extends App
{
	public render(): JSX.Element
	{
		return (
			<layout width="fill" height="fill" direction="horizontal">
				<layout direction="horizontal">
					<text color={Color.Red}>test</text>
					<text color={Color.Green}>1</text>
					<text color={Color.Yellow}>2</text>
					<text color={Color.Cyan}>3</text>
				</layout>
				<layout>
					<text color={Color.Magenta}>Noice</text>
				</layout>
			</layout>
		);
	}
});