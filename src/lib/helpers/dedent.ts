/**  @credits https://github.com/tamino-martinius/node-ts-dedent */

/**
 * Parses and dedents a template string.
 * @returns Dedented string.
 *
 * @example
 * ```typescript
 * const string = dedent`
 *   A string that gets so long you need to break it over multiple lines.
 *   Luckily dedent is here to keep it readable without lots of spaces
 *   ending up in the string itself.
 *
 *   ${1}. With any kind of;
 *   ${2}. Placeholders;
 * `;
 * ```
 */
export function dedent(
	templ: TemplateStringsArray | string,
	...values: unknown[]
): string {
	let strings = Array.from(typeof templ === 'string' ? [templ] : templ);

	strings[strings.length - 1] = strings[strings.length - 1].replace(
		/\r?\n([\t ]*)$/,
		'',
	);

	const indentLengths = strings.reduce(
		(arr, str) => {
			const matches = str.match(/\n([\t ]+|(?!\s).)/g);
			if (matches) {
				return arr.concat(
					matches.map((match) => match.match(/[\t ]/g)?.length ?? 0),
				);
			}
			return arr;
		},
		<number[]>[],
	);

	if (indentLengths.length) {
		const pattern = new RegExp(`\n[\t ]{${Math.min(...indentLengths)}}`, 'g');
		strings = strings.map((str) => str.replace(pattern, '\n'));
	}

	strings[0] = strings[0].replace(/^\r?\n/, '');
	let string = strings[0];

	values.forEach((value, i) => {
		let indentedValue = value;

		const endentations = string.match(/(?:^|\n)( *)$/);
		const endentation = endentations ? endentations[1] : '';

		if (typeof value === 'string' && value.includes('\n')) {
			indentedValue = String(value)
				.split('\n')
				.map((str, i) => {
					return i === 0 ? str : `${endentation}${str}`;
				})
				.join('\n');
		}

		string += indentedValue + strings[i + 1];
	});

	return string;
}
