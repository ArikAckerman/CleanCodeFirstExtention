
const vscode = require('vscode');
import { commands, window } from 'vscode';

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "easy-translator" is now active!');

	let disposable = commands.registerCommand('easy-translator.easyTranslator', function () {

		
		const editor = window.activeTextEditor;
		const selectedText = editor.selection
		const text = editor.document.getText(selectedText)


		const data = JSON.stringify([
			{
				"Text": text,
			}
		]);
		var XMLHttpRequest = require('xhr2');
		const xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		
		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === this.DONE) {
				console.log(this.responseText);
				window.showInformationMessage(this.responseText);
				editor.edit(builder => builder.replace(selectedText, this.responseText))
			}
		});
		
		xhr.open("POST", "https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=de&api-version=3.0&profanityAction=NoAction&textType=plain");
		xhr.setRequestHeader("content-type", "application/json");
		xhr.setRequestHeader("X-RapidAPI-Key", "YOUR-RAPIDAPI-KEY");
		xhr.setRequestHeader("X-RapidAPI-Host", "microsoft-translator-text.p.rapidapi.com");
		
		xhr.send(data);





		vscode.window.showInformationMessage('Hi, everything is good!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

export default {
	activate,
	deactivate
}