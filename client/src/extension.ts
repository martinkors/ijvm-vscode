import * as path from 'path'
import { DEFAULT_MAX_VERSION } from 'tls';
import * as vscode from 'vscode'
import { workspace, ExtensionContext } from 'vscode'
// import IJVMCompletionItemProvider from './completionProvider'

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from 'vscode-languageclient/node'

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  let serverModule = context.asAbsolutePath(path.join('server', 'out', 'server.js'));

  let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

  let serverOptions: ServerOptions = {
    run: {
      module: serverModule,
      transport: TransportKind.ipc
    },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions
    }
  };

  let clientOptions: LanguageClientOptions = {
    documentSelector: [
      { 
        scheme: 'file', 
        language: 'ijvm'
      }
    ],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher("**/.clientrc")
    }
  };
  client = new LanguageClient('ijvmLanguageServer', 'IJVM Language Server', serverOptions, clientOptions);
  client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}