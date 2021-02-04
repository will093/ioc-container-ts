# IoC Container TS

IoC container for dependency injection, written in TypeScript.

## Installation

```
npm install ioc-container-ts
```

If you want to use the TypeScript decorators included in this library, you will need to add the following to your `tsconfig.json` file:

```
{
  ...
  "compilerOptions": {
    ...
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## Usage

To create a new container:

```
import { Container } from 'ioc-container-ts';

const { register, resolve, injectable, inject } = new Container();
```

Register a class for dependency injection with the `register` function:

```
class Foo {}
register(Foo);
```

Or, using the `@injectable` decorator:
```
@injectable
class Foo {}
```

Once a class is registered, you can use `resolve` to resolve its instance:

```
resolve(Foo);
```

Or using the `@inject` property decorator:

```
class Bar {

  @inject(Foo)
  fooInstance;
}
```
