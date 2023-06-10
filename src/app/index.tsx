import { App } from "@tui/App";
import { Color } from "@tui/Color";
import { Terminal } from "@tui/Terminal";

import fs from "fs";
import {  resolve, dirname} from "path";

const Dir = ({ path, level }: { path: string, level: number }) =>
{
	return (
		<layout >
			<text color={Color.Red}>{dirname(path)}</text>
				<layout height={3}>
					{fs.readdirSync(path).map((dir) => 
					{
						let s = "";
							for(let i = 0; i < level; i++)
								s += "-"
						if(fs.statSync(resolve(path, dir)).isFile())
						{
							
							return <text color={Color.Yellow}>{s + dir}</text>;
						}
						return <Dir path={resolve(path, dir)} level={level + 15} />
					})}
				</layout>
		</layout>
	);
}

Terminal.run(class extends App
{
	public render(): JSX.Element
	{
		return (
			<Dir path="F:\\DOWNLOAD PLACE\tui\\src" level={0} />
		);
	}
});