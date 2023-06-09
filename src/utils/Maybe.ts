import { assert } from "utils/assert";

export namespace Maybe
{
	export type Empty = typeof Maybe["EMPTY"];
}

export class Maybe<T>
{
	public static readonly EMPTY = Symbol("empty");

	private value_: T | typeof Maybe.EMPTY;

	public constructor(value: T | Maybe.Empty = Maybe.EMPTY)
	{
		this.value_ = value;
	}

	public readonly isEmpty = () => this.value_ === Maybe.EMPTY;

	public readonly get = (): T =>
	{
		assert(this.isEmpty(), false, "Maybe.value_ is empty!");
		return this.value_ as T;
	}

	public readonly getOr = (callback: () => T): T =>
	{
		if (this.isEmpty())
			return callback();
		return this.value_ as T;
	}

	public readonly getOrSet = (callback: () => T): T =>
	{
		if (this.isEmpty())
			this.value_ = callback();
		return this.value_ as T;
	}

	public readonly set = (value: T): T =>
	{
		assert(this.isEmpty(), true, "Maybe.value_ is not empty!");
		this.value_ = value;
		return this.value_ as T;
	}

	public readonly swap = (value: T): T =>
	{
		assert(this.isEmpty(), false, "Maybe.value_ is empty!");
		const temp = this.get();
		this.value_ = value;
		return temp;
	}

	public readonly reset = () => this.value_ = Maybe.EMPTY;
}