const vscode = require('vscode');

function activate(context) {
	console.log(vscode.window.activeTextEditor.tabSize)

	let span = vscode.commands.registerCommand('html-tag-wrapper.tag_wrapper_span', tag_wrapper_span);
	let div = vscode.commands.registerCommand('html-tag-wrapper.tag_wrapper_div', tag_wrapper_div);

	context.subscriptions.push(span, div);
}

// this method is called when your extension is deactivated
function deactivate() {}

function tag_wrapper_span() {
	let editor = vscode.window.activeTextEditor
	let selec = editor.selection
	let selectedText = editor.document.getText(selec)

	let span_snippet = get_span_snippet(selectedText);

	editor.insertSnippet(span_snippet);
}

function tag_wrapper_div() {
	let editor = vscode.window.activeTextEditor
	let selec = editor.selection
	let selectedText = editor.document.getText(selec)

	let div_snippet = get_div_snippet(formatSelectedText(selec, selectedText, editor))

	editor.insertSnippet(div_snippet)
}

function get_span_snippet(selectedText) {
	let span_snippet = new vscode.SnippetString();

	span_snippet.appendText('<')
	span_snippet.appendPlaceholder(`span`, 1)
	span_snippet.appendTabstop(2)
	span_snippet.appendText(`>${selectedText}`)
	span_snippet.appendTabstop(0);
	span_snippet.appendText(`</`)
	span_snippet.appendPlaceholder(`span`, 1)
	span_snippet.appendText('>')

	return span_snippet;
}

function get_div_snippet(selectedText) {
	let div_snippet = new vscode.SnippetString();

	div_snippet.appendText('<')
	div_snippet.appendPlaceholder(`div`, 1)
	div_snippet.appendTabstop(2)
	div_snippet.appendText(`>\n${selectedText}</`)
	div_snippet.appendPlaceholder(`div`, 1)
	div_snippet.appendText('>')
	div_snippet.appendTabstop(0);

	return div_snippet;
}

function formatSelectedText(selection, selectedText, editor) {
	let tabSize = editor.options.tabSize
    let textArr;

	textArr = selectedText.split('\n')
	endLine = '\n'
	console.log(textArr)

    let formated = '';
    textArr.forEach((line, index) => {
      	formated += `${' '.repeat(tabSize)}${line.trim()}\n`;
    })
	console.log(formated)
    return formated;
}


module.exports = {
	activate,
	deactivate
}
