class JemUtils {
  static js = {
    getParameterNames: aFunction => {
      // Credits to http://stackoverflow.com/users/308686/bubersson
      return aFunction
        .toString()
        .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s))/gm, '')
        .match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1]
        .split(/,/);
    },
    bindWithParams: (aFunction, params) => {
      const args = Array.prototype.slice.call(params);
      args.unshift(null); // insert a "null" at the beginning of the array - TODO: document why
      return Function.prototype.bind.apply(aFunction, args);
    }
  };
}

class DI {
  static _factories = {};

  static register(name, factory) {
    this._factories[name] = factory;
  }

  static getFactory = name => {
    if (DI._factories[name]) {
      return DI._factories[name];
    } else {
      throw new Error(`Factory "${name}" was not registered`);
    }
  };

  constructor() {
    console.log('[DI] Creating context...');
    this._instances = {};
  }

  provide(name, instance) {
    return this;
  }

  resolve(callback) {
    const reduceAsyncDependencies = (names, accumulator = []) => {
      if (names.length) {
        const name = names.shift();
        return resolveDependency(name)
          .then(result => [...accumulator, result])
          .then(reAccumulator => {
            if (names.length) {
              return reduceAsyncDependencies(names, reAccumulator);
            }
            return reAccumulator;
          });
      } else {
        return new Promise(resolve => resolve([]));
      }
    };

    const resolveDependencies = factory => {
      const dependencyNames = JemUtils.js.getParameterNames(factory);
      return reduceAsyncDependencies(dependencyNames.filter(name => !!name && name !== '')).then(dependencies => {
        const boundCallback = JemUtils.js.bindWithParams(factory, dependencies);
        const instance = boundCallback();
        return instance;
      });
    };

    const resolveDependency = name =>
      new Promise((resolve, reject) => {
        try {
          if (!this._instances[name]) {
            console.log(`[DI] Dependency ${name} requested for the first time. Resolving...`);
            // const factory = this._factories[name];
            const factory = DI.getFactory(name);
            const result = resolveDependencies(factory);
            if (result instanceof Promise) {
              result.then(instance => {
                this._instances[name] = instance;
                resolve(instance);
              });
            } else {
              resolve(instance);
            }
          } else {
            console.log(`[DI] Dependency ${name} already known`);
            resolve(this._instances[name]);
          }
        } catch (err) {
          reject(err);
        }
      });

    resolveDependencies(callback);
  }
}
