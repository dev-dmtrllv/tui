import { Element } from "@tui/elements/Element";
import { TextElement } from "@tui/elements/TextElement";
import util from "util";

export namespace Renderer
{
	const isPromiseComponent = (component: any): component is JSX.PromiseElement => (!!component && (typeof component.then === "function"));

	export const render = async <P extends {}>(component: Tui.Node, parent: Element<P>) =>
	{
		// console.log(component);

		if (component === null || component === undefined)
		{
			return;
		}
		else if (Array.isArray(component))
		{
			for (const c of component)
				await render(c, parent);
		}
		else if (isPromiseComponent(component))
		{
			await render(await component, parent);
		}
		else
		{
			switch (typeof component)
			{
				case "bigint":
				case "boolean":
				case "number":
				case "string":
					parent.append(new TextElement({ text: String(component) }));
					break;
				case "object":
					if (typeof component.type === "function")
					{
						await render(component.type({ ...component.props, children: component.children }), parent);
					}
					else
					{
						const element = Element.create(component.type, component.props || {});

						parent.append(element);

						for (const c of component.children)
						{
							await render(c, element);
						}
					}
					break;
			}
		}
	}
}

(global as any).Tui = {
	createElement: <T extends string, P extends {}>(type: T, props: P, ...children: any) =>
	{
		return {
			type,
			props,
			children
		};
	}
};