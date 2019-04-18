// const factories = {};
// const instances = {};

const getParameterNames = aFunction => {
  // Credits to http://stackoverflow.com/users/308686/bubersson
  return (
    aFunction
      .toString()
      .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s))/gm, '')
      // eslint-disable-next-line
      .match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1]
      .split(/,/)
  );
};

// Bind with parameters
const bindWithParams = (aFunction, params) => {
  const args = Array.prototype.slice.call(params);
  args.unshift(null); // insert a "null" at the beginning of the array - TODO: document why
  return Function.prototype.bind.apply(aFunction, args);
};

// const register = (name, factory) => {
//   factories[name] = factory;
// };

// const resolve = () => {
//   // Obtain dependency name via reflection
//   const params = getParameterNames(callback);

//   // Obtain dependencies
//   const dependencies = params.filter(param => !!param && param !== '').map(param => injector.get(param));

//   // Bind dependencies to callback function
//   const boundCallback = bindWithParams(callback, dependencies);

//   // Execute callback with injected dependencies
//   boundCallback();
// };

class DI {
  constructor() {
    console.log('[DI] Creating context...');
    this._instances = {};
  }

  static register(name, factory) {
    this._factories[name] = factory;
  }

  static _factories = {};
  // static instances = {};

  static getFactory = name => DI._factories[name];

  // utils = {};

  // register(name, factory) {
  //   this._factories[name] = factory;
  // }

  // _resolve(dependencyName) {}

  // _resolveDependency(name) {
  //   const factory = this._factories[name];
  //   const dependencyNames = getParameterNames(factory);

  //   const dependencies_Px = dependencyNames.map(name => this._getInstance(name));
  //   return Promise.all(dependencies_Px).then(dependencies => {
  //     const boundCallback = bindWithParams(factory, dependencies);
  //     const instance = boundCallback();
  //     return instance;
  //   });
  // }

  // _getInstance(name) {
  //   return new Promise((resolve, reject) => {
  //     if (this._instances[name]) {
  //       return resolve(this._instances[name]);
  //     } else {
  //       this._resolveDependency();
  //     }
  //   });
  // }

  provide(name, instance) {}

  resolve(callback) {
    // function promisesReduce(promises, accumulator = []) {
    //   if (promises.length) {
    //     const promise = promises.shift();
    //     return promise
    //       .then(result => [...accumulator, result])
    //       .then(reAccumulator => {
    //         if (promises.length) {
    //           promisesReduce(promises, reAccumulator);
    //         }
    //         return reAccumulator;
    //       });
    //   } else {
    //     return new Promise(resolve => resolve([]));
    //   }
    // }

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
      const dependencyNames = getParameterNames(factory);
      return reduceAsyncDependencies(dependencyNames.filter(name => !!name && name !== '')).then(dependencies => {
        const boundCallback = bindWithParams(factory, dependencies);
        const instance = boundCallback();
        return instance;
      });
    };

    const resolveDependency = name =>
      new Promise((resolve, reject) => {
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
      });

    resolveDependencies(callback);
  }
}
