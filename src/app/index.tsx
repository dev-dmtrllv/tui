import { App } from "@tui/App";
import { Terminal } from "@tui/Terminal";

const wait = (ms: number) => new Promise<number>((res) => setTimeout(() => res(ms), ms));

const A = ({ children }: Tui.PropsWithChildren) =>
{
	return <layout>{children}</layout>;
}

const B = async () =>
{
	const a = await wait(1500);
	return <A>{a}</A>;
}

Terminal.run(class extends App
{
	public render(): JSX.Element
	{
		return (
			<A>
				test
				<B />
			</A>
		);
	}
})