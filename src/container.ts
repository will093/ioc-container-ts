import { ConstructorFunction } from './types/constructor-function';

export class Container {
  private dependencies: { [key: string]: ConstructorFunction } = {};
  private instances: { [key: string]: any } = {};

  /**
   * Register a class for dependency injection.
   * @param dependency the class to be registered.
   */
  public register = <T extends ConstructorFunction>(dependency: T): void => {
    this.dependencies[dependency.name] = dependency;
  };

  /**
   * Resolve the instance of a registered class.
   * @param dependency the class whose instance should be resolved.
   */
  public resolve = <T>(dependency: new () => T): T => {
    if (!this.instances[dependency.name]) {
      this.instances[dependency.name] = new dependency();
    }
    return this.instances[dependency.name];
  };

  /**
   * Class decorator for automatically registering the class for dependency injection.
   */
  public injectable = this.register;

  /**
   * Property decorator for automatically resolving a dependency.
   * @param constructor the class whose instance should be resolved.
   */
  public inject = <T extends ConstructorFunction>(constructor: T) => {
    return (target: any, propertyKey: string): void => {
      target[propertyKey] = this.resolve(constructor);
    };
  };
}
