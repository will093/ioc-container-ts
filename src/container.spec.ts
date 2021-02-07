import { Container } from './container';

describe('container', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  describe('resolve/register', () => {
    class TestClass {}

    it('should resolve a registered dependency.', () => {
      container.register(TestClass);

      expect(container.resolve(TestClass)).toBeInstanceOf(TestClass);
    });
    it('should always resolve the same instance.', () => {
      container.register(TestClass);

      const resolved1 = container.resolve(TestClass);
      const resolved2 = container.resolve(TestClass);
      expect(resolved1).toBe(resolved2);
    });
    it('should throw an error when trying to resolve a dependency which is not registered.', () => {
      expect(() => container.resolve(TestClass)).toThrow(`The dependency TestClass is not registered`);
    });
    it('should throw an error when trying to register a dependency which is already registered.', () => {
      container.register(TestClass);
      expect(() => container.register(TestClass)).toThrow(`The dependency TestClass is already registered`);
    });
  });

  describe('injectable', () => {
    it('should register the decorated class.', () => {
      @container.injectable
      class TestClass {}

      expect(container.resolve(TestClass)).toBeInstanceOf(TestClass);
    });

    it('should throw an error when trying to register a dependency which is already registered.', () => {
      expect(() => {
        @container.injectable
        @container.injectable
        class TestClass {}
      }).toThrow(`The dependency TestClass is already registered`);
    });
  });

  describe('inject', () => {
    it('should resolve the instance of the given class to the decorated property.', () => {
      class TestClass {}
      container.register(TestClass);

      class TestClass2 {
        @container.inject(TestClass)
        testClassInstance: any;
      }

      expect(new TestClass2().testClassInstance).toBeInstanceOf(TestClass);
    });

    it('should throw an error when trying to resolve a dependency which is not registered.', () => {
      expect(() => {
        class TestClass {}

        class TestClass2 {
          @container.inject(TestClass)
          testClassInstance: any;
        }
      }).toThrow(`The dependency TestClass is not registered`);
    });
  });
});
