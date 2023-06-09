import { AssertionError } from "assert";

export const assert = <T>(value: T, expected: T, message: string) =>
{
	if(value !== expected)
		throw new AssertionError({ message, expected, actual: value });
}