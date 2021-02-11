import {
	createConnection,
	TextDocuments,
	Diagnostic,
	DiagnosticSeverity,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	CompletionItem,
	CompletionItemKind,
	TextDocumentPositionParams,
	TextDocumentSyncKind,
	InitializeResult,
  Connection,
  InsertReplaceEdit,
  CompletionParams,
  Command,
  InsertTextFormat,
  TextDocumentItem,
  Range,
  TextDocumentEdit,
  TextEdit,
  Position
} from 'vscode-languageserver/node';

import {
	TextDocument
} from 'vscode-languageserver-textdocument';
import { promises, unwatchFile } from 'fs';
import { version } from 'os';

let connection : Connection = createConnection(ProposedFeatures.all);

let documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;
let hasDiagnosticRelatedInformationCapability: boolean = false;

connection.onInitialize((params: InitializeParams) => {
  let capabilities = params.capabilities;

  hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
  hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
  hasDiagnosticRelatedInformationCapability = !!(capabilities.textDocument && capabilities.textDocument.publishDiagnostics && capabilities.textDocument.publishDiagnostics.relatedInformation);

  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {
        resolveProvider: true,
        allCommitCharacters: [],
        triggerCharacters: ['.']
      }
    }
  };

  if (hasWorkspaceFolderCapability) {
    result.capabilities.workspace = {
      workspaceFolders: {
        supported: true
      }
    }
  }

  return result;
});

connection.onInitialized(() => {
  if (hasConfigurationCapability) {
    connection.client.register(DidChangeConfigurationNotification.type, undefined);
  }
  if (hasWorkspaceFolderCapability) {
    connection.workspace.onDidChangeWorkspaceFolders(_event => {
      connection.console.log('Workspace folder change event received.');
    });
  }
});

interface IJVMSettings {
  maxNumberOfProblems: number
}

const defaultSettings: IJVMSettings = { maxNumberOfProblems: 100 };
let globalSettings: IJVMSettings = defaultSettings;

let documentSettings: Map<string, Thenable<IJVMSettings>> = new Map();

connection.onDidChangeConfiguration(change => {
  if (hasConfigurationCapability) documentSettings.clear();
  else globalSettings = <IJVMSettings>((change.settings.ijvmLanguageServer || defaultSettings));

  documents.all().forEach(validateTextDocument);
});

function getDocumentSettings(resource: string) {
  if (!hasConfigurationCapability) return Promise.resolve(globalSettings);
  let result = documentSettings.get(resource);
  if (!result) {
    result = connection.workspace.getConfiguration({
      scopeUri: resource,
      section: 'ijvmLanguageServer'
    });
    documentSettings.set(resource, result);
  }
  return result;
}

documents.onDidClose(e => {
	documentSettings.delete(e.document.uri);
});

documents.onDidChangeContent(change => {
  connection.onCompletion
	validateTextDocument(change.document);
});

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
	let settings = await getDocumentSettings(textDocument.uri);

	let text = textDocument.getText();
	let pattern = /\b[A-Z]{2,}\b/g;
	let m: RegExpExecArray | null;

	let problems = 0;
	let diagnostics: Diagnostic[] = [];
	while ((m = pattern.exec(text)) && problems < settings.maxNumberOfProblems) {
		problems++;
		let diagnostic: Diagnostic = {
			severity: DiagnosticSeverity.Warning,
			range: {
				start: textDocument.positionAt(m.index),
				end: textDocument.positionAt(m.index + m[0].length)
			},
			message: `${m[0]} is all uppercase.`,
			source: 'ex'
		};
		if (hasDiagnosticRelatedInformationCapability) {
			diagnostic.relatedInformation = [
				// {
				// 	location: {
				// 		uri: textDocument.uri,
				// 		range: Object.assign({}, diagnostic.range)
				// 	},
				// 	message: 'Spelling matters'
				// },
				// {
				// 	location: {
				// 		uri: textDocument.uri,
				// 		range: Object.assign({}, diagnostic.range)
				// 	},
				// 	message: 'Particularly for names'
				// }
			];
		}
		diagnostics.push(diagnostic);
	}

	connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

connection.onDidChangeWatchedFiles(_change => {
	
});

connection.onCompletion(
	(params: CompletionParams): CompletionItem[] => {
    let currentDocument: TextDocument | undefined = documents.get(params.textDocument.uri);
		return [
			{
				label: 'bipush',
				kind: CompletionItemKind.Function,
        data: 1
			},
			{
				label: 'dup',
				kind: CompletionItemKind.Function,
				data: 2
			},
			{
				label: 'goto',
				kind: CompletionItemKind.Function,
				data: 3
			},
			{
				label: 'iadd',
				kind: CompletionItemKind.Function,
				data: 4
			},
			{
				label: 'iand',
				kind: CompletionItemKind.Function,
				data: 5
			},
			{
				label: 'ifeq',
				kind: CompletionItemKind.Function,
				data: 6
			},
			{
				label: 'iflt',
				kind: CompletionItemKind.Function,
				data: 7
			},
			{
				label: 'if_icmpeq',
				kind: CompletionItemKind.Function,
				data: 8
			},
			{
				label: 'iinc',
				kind: CompletionItemKind.Function,
				data: 9
			},
			{
				label: 'iload',
				kind: CompletionItemKind.Function,
				data: 10
			},
			{
				label: 'invokevirtual',
				kind: CompletionItemKind.Function,
				data: 11
			},
			{
				label: 'ior',
				kind: CompletionItemKind.Function,
				data: 12
			},
			{
				label: 'ireturn',
				kind: CompletionItemKind.Function,
				data: 13
			},
			{
				label: 'istore',
				kind: CompletionItemKind.Function,
				data: 14
			},
			{
				label: 'isub',
				kind: CompletionItemKind.Function,
				data: 15
			},
			{
				label: 'ldc_w',
				kind: CompletionItemKind.Function,
				data: 16
			},
			{
				label: 'nop',
				kind: CompletionItemKind.Function,
				data: 17
			},
			{
				label: 'pop',
				kind: CompletionItemKind.Function,
				data: 18
			},
			{
				label: 'swap',
				kind: CompletionItemKind.Function,
				data: 19
			},
			{
				label: '.method',
				kind: CompletionItemKind.Function,
        data: 20,
        textEdit: TextEdit.replace(getCompletionRange(params.textDocument.uri, params.position), '.method')
			},
			{
				label: '.args',
				kind: CompletionItemKind.Function,
        data: 21,
        textEdit: TextEdit.replace(getCompletionRange(params.textDocument.uri, params.position), '.args')
			},
			{
				label: '.locals',
				kind: CompletionItemKind.Function,
        data: 22,
        textEdit: TextEdit.replace(getCompletionRange(params.textDocument.uri, params.position), '.locals')
			},
			{
				label: '.define',
				kind: CompletionItemKind.Function,
        data: 23,
        textEdit: TextEdit.replace(getCompletionRange(params.textDocument.uri, params.position), '.define')
			}
		];
	}
);

function getCompletionRange(documentUri: string, caretPosition: Position): Range {
  let currentDocument: TextDocument | undefined = documents.get(documentUri);
  if (currentDocument != undefined) {
    const line = currentDocument.getText(Range.create(caretPosition.line, 0, caretPosition.line, caretPosition.character));
    const items = line.match(/[\w\.]*$/g);
    let item: string;
    if (items == null) item = '';
    else item = items[0];
    return Range.create(caretPosition.line, caretPosition.character - item.length, caretPosition.line, caretPosition.character);
  }
  return Range.create(-1, -1, -1, -1);
}

connection.onCompletionResolve(
	(item: CompletionItem): CompletionItem => {
		// if (item.data === 1) {
		// 	item.detail = 'ldc_w';
		// 	item.documentation = 'ldc_w doc';
		// } else if (item.data === 2) {
		// 	item.detail = 'iadd';
		// 	item.documentation = 'iadd doc';
		// }
		return item;
	}
);

documents.listen(connection);
connection.listen();