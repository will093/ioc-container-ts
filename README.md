# IoC Container TS

IoC container for dependency injection, written in TypeScript.

## Installation

```
npm install ioc-container-ts
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

Use `resolve` to resolve the instance of a registered class:

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
