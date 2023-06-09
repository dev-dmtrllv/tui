import { Maybe } from "utils/Maybe";
import { App } from "./App";
import { LayoutElement } from "@tui/elements/LayoutElement";

import readline from "readline";
import { Layout } from "@tui/elements/Element";
import { Renderer } from "@tui/Renderer";

export class Terminal<T extends App>
{
	private static readonly instance = new Maybe<Terminal<any>>();

	public static readonly run = async <T extends App>(app: new () => T, props: Partial<Layout> = { direction: "vertical" }) =>
	{
		if (!this.instance.isEmpty())
			throw new Error(`Terminal is already running!`);

		const ctx = require.context('./elements/', true, /\.ts$/);
		ctx.keys().forEach(k => ctx(k));

		this.instance.set(new Terminal(app));
		await this.instance.get().initTree();
	}

	public readonly app: T;
	public readonly root: LayoutElement;

	private constructor(app: new () => T, props: Partial<Layout> = { direction: "vertical" })
	{
		this.app = new app();
		this.root = new LayoutElement(props);

		if (process.stdin.isTTY)
			process.stdin.setRawMode(true);

		process.stdin.setEncoding("utf-8");

		readline.emitKeypressEvents(process.stdin);

		process.stdin.resume();

		process.stdin.on("keypress", (value: string | undefined, e: KeyPressEvent) => 
		{
			const { ctrl, name } = e;
			if (ctrl && (name === "c"))
			{
				this.clear();
				process.stdout.write("\u001B[?25h");
				process.exit();
			}
		});

		process.stdout.on("resize", this.onResize);

		process.stdout.write("\u001B[?25l");
	}

	private readonly clear = () =>
	{
		process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
		console.clear();
	}

	private readonly initTree = async () =>
	{
		this.clear();
		await Renderer.render(this.app.render(), this.root);
		this.onResize();
	}

	private readonly onResize = () =>
	{
		this.root.layout.width = process.stdout.columns;
		this.root.layout.height = process.stdout.rows;

		this.root.calculateLayout();
		this.root.render();
	}
}

type KeyPressEvent = {
	sequence: string,
	name: string,
	ctrl: boolean,
	meta: boolean,
	shift: boolean
};