function capitaliseFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderFlavorText(flavorText, literal = false) {
	// Makes flavor text suitable for HTML presentation.
	// If `literal` is false, collapses broken lines into single lines.
	// If `literal` is true, linebreaks are preserved exactly as they are in the games.

	// Somehow, the games occasionally have \n\f, which makes no sense at all
	// and wouldn't render in-game anyway. Fix this
	flavorText = flavorText.replace("\n\f", "\f");

	let html;

	if (literal) {
		// Page breaks become two linebreaks.
		// Soft hyphens become real hyphens.
		// Newlines become linebreaks.
		html = flavorText
			.replace(/\f/g, "<br><br>")
			.replace(/\u00ad/g, "-")
			.replace(/\n/g, "<br>");
	} else {
		// Page breaks are treated just like newlines.
		// Soft hyphens followed by newlines vanish.
		// Letter-hyphen-newline becomes letter-hyphen, to preserve real hyphenation.
		// Any other newline becomes a space.
		html = flavorText
			.replace(/\f/g, "\n")
			.replace(/\u00ad\n/g, "")
			.replace(/\u00ad/g, "")
			.replace(/ -\n/g, " - ")
			.replace(/-\n/g, "-")
			.replace(/\n/g, " ");

		// Collapse adjacent spaces and strip trailing whitespace.
		html = html.split(/\s+/).join(" ").trim();
	}

	return html;
}

export {capitaliseFirstLetter, renderFlavorText};
