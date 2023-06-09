import { Maybe } from "utils/Maybe";
import { App } from "./App";

export class Terminal<T extends App>
{
	private static readonly instance = new Maybe<Terminal<any>>(); 

	public static readonly run = <T extends App>(app: new () => T) =>
	{
		if(!this.instance.isEmpty())
			throw new Error(`Terminal is already running!`);
		
		const ctx = require.context('./elements/', true, /\.ts$/);
		ctx.keys().forEach(k => ctx(k));

		this.instance.set(new Terminal(app));
	}

	public readonly app: T;

	private constructor(app: new () => T)
	{
		this.app = new app();
	}

	private readonly render = () =>
	{

	}
}