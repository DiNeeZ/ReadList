import 'regenerator-runtime/runtime';

import { App } from './app';
import { Api } from './services/api';

new App(new Api());

