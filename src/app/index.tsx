import { App } from "@tui/App";
import { Terminal } from "@tui/Terminal";

Terminal.run(class extends App
{
	public render(): JSX.Element
	{
		return (
			<layout width="fill" height="fill">
				<layout height="grow">
					<text text="test" />
					<text text="1" />
					<text text="2" />
					<text text="3" />
				</layout>
				<layout>
					Noice
				</layout>
			</layout>
		);
	}
});