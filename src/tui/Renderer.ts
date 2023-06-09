import { Element } from "@tui/elements/Element";
import { TextElement } from "@tui/elements/LayoutElement";

export namespace Renderer
{
	const isPromiseComponent = (component: any): component is JSX.PromiseElement => (!!component && (typeof component.then === "function"));

	const renderElement = async <P extends {}>(component: Tui.Node, parent: Element<P>) =>
	{
		if (component === null || component === undefined)
		{
			return;
		}
		else if (Array.isArray(component))
		{
			for (const c of component)
				await renderElement(c, parent);
		}
		else if (isPromiseComponent(component))
		{
			await renderElement(await component, parent);
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
						await renderElement(component.type({ ...component.props, children: component.children }), parent);
					}
					else
					{
						const element = Element.create(component.type, component.props);

						parent.append(element);

						for (const c of component.children)
							await renderElement(c, element);
					}
					break;
			}

		}
	}

	export const render = async <P extends {}>(component: JSX.Element, container: Element<P>) =>
	{
		await renderElement(component, container);
	};
}
