// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "codeComments" is now active!');
	const config = vscode.workspace.getConfiguration('codeComment');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('codeComments.codeComments', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showWarningMessage('Do codeComment!');
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showWarningMessage("Can't get the editor!");
			return;
		}
    const startLine = editor.selection.active.line;
    const startCharacter = editor.selection.active.character;
		const now = new Date();
		const dateTime = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
		const commentString = config.tmpl.replace("{{Author}}", config.Author).replace("{{DateTime}}", dateTime);
		editor.insertSnippet(new vscode.SnippetString(commentString), new vscode.Position(startLine, startCharacter));
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
