## babel-plugin-object-source

### Summary

Plugin `babel-plugin-object-source` for `babel` allows to wrap any object in transpiled EcmaScript code in manner, which allows later to find original declaration of object.  
For every non-primitive value - Ecmascript object - hidden field `__SOURCE_DELCARATION__` will be attached, so in later use original file name & line number can be ealisy retrieved.  
Plugin works with ES5-only AST tree, so must be included after any ES6+ and other babel transformation plugins. 

### Use case

When develop library or boilerplate starter, like [react-scripts](https://www.npmjs.com/package/react-scripts) or [resolve-scripts](https://www.npmjs.com/package/resolve-scripts), there is common problem with reporting error to end user. 
If some configuration value is incorrent or omitted, it's very simple to detect it, but impossible to report original source, including file name and line number, where wrong configuration value had been created.  
Plugin `babel-plugin-object-source` helps in this use case - just configure development build with including this babel plugin, and every object become have `__SOURCE_DELCARATION__` field, so wrong misconfigurated place can be reported


### Provided information

Every wrapped object has following metainformation in `__SOURCE_DELCARATION__` field:
- `sourceCode` (string) - source code with object declaration
- `filename` (string) - file name in which object has been created
- `startLine` (number) - first line, where object creation had began
- `startColumn` (number) - first column, where object creation had began
- `endLine` (number) - last line, where object creation had end
- `endColumn` (number) - last column, where object creation had end

If babel or webpack have no specific or multi-stage transpile configuraion, all source code, file, line and columns mappings will point to original non-transpiled file.

### Usage limits

Use `babel-plugin-object-source` **ONLY** in development mode, i.e. on first cold starts, when end user can make mistakes in configuration file. Plugin causes following effects:
1) Plugin generates very long and verbose source code after transpiling. Since every inner object had been wrapped in own helper, growth will be non-linear
2) If original code uses [Object.getOwnPropertyNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames) or similar reflaction methods, they can discover `__SOURCE_DELCARATION__` field, although it's of cource private and non-enumerable field.

Besides to the proliferation of the source code, the plugin does **not** cause any side effects. Behaviour of original code will remain unchanged.

### Configuration with webpack

```js
const babelPluginObjectSource = require('babel-plugin-object-source')

if(process.env.NODE_ENV !== 'production') {
    webpackServerConfig.module.rules.forEach(rule =>
        rule.loaders.filter(({ loader }) => loader === 'babel-loader').forEach(
            loader =>
                (loader.query.presets = [
                    {
                        plugins: [babelPluginObjectSource]
                    }
                ].concat(Array.isArray(loader.query.presets) ? loader.query.presets : []))
        )
    );
}
```

### Examples

Examples can be found at resolve-scripts [error handling](https://github.com/reimagined/resolve/blob/master/packages/resolve-scripts/src/server/utils/error_handling.js) module.

```js
import config from 'SOME_USER_CONFIG_FILE';
import { raiseError } from 'error_handling';

if(isNotGood(config.value)) {
   raiseError('Config `value` is not good', config.value)
}

```

### Package testing

Since plugin should work properly with `babel-core@^6.26.0` and `babel core@^7.0.0` versions, it should be included in integration tests.
Hovewer, `npm` does not support existence of different versions of same package in `dependencies` or `devDependencies`.

Unfontunely, there is no smart workaround for this: see [here](https://github.com/npm/npm/issues/5499#issuecomment-129481232)
and [here](https://stackoverflow.com/questions/43770328/) for more details.

That's why repository introduces fake `babelcore6-1.0.0.tgz` and `babelcore7-1.0.0.tgz` local packages.
They does not include nothing, execpt dependency for `babel-core@^6.26.0` and `babel core@^7.0.0` packages respectively.
