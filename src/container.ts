import { ConstructorFunction } from './types/constructor-function';

export class Container {
  // Dictionary of instances of registered classes.
  private instances: { [key: string]: any } = {};

  /**
   * Register a class for dependency injection.
   * @param dependency the class to be registered.
   */
  public register = <T extends ConstructorFunction>(dependency: T): void => {
    if (this.instances[dependency.name]) {
      throw new Error(`The dependency ${dependency.name} is already registered`);
    }
    this.instances[dependency.name] = new dependency();
  };

  /**
   * Resolve the instance of a registered class.
   * @param dependency the class whose instance should be resolved.
   */
  public resolve = <T>(dependency: new () => T): T => {
    if (!this.instances[dependency.name]) {
      throw new Error(`The dependency ${dependency.name} is not registered`);
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
