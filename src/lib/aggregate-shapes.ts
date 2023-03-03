import { isShape, type Shape, type Target } from './shapes';
import type { Traits } from './traits';

export interface List<T> extends Shape {
  type: 'list';
  member: T;
}

export function isList<T>(shape: unknown): shape is List<T> {
  return isShape(shape) && shape.type === 'list';
}

export interface Map<K, V> extends Shape {
  type: 'map';
  key: K;
  value: V;
}

export function isMap<K, V>(shape: unknown): shape is Map<K, V> {
  return isShape(shape) && shape.type === 'map';
}

export interface Structure extends Shape {
  type: 'structure';
  members: {
    [key: string]: Target & Traits;
  };
}

export function isStructure(shape: unknown): shape is Structure {
  return isShape(shape) && shape.type === 'structure';
}

export interface Union extends Shape {
  type: 'union';
  // TODO how do I repr smithy unions?
}

export interface Service extends Shape {
  type: 'service';
  version: string;
  // metadata:
  operations?: Target[];
  resources?: Target[];
  errors?: Target[];
}

export function isService(shape: unknown): shape is Service {
  return isShape(shape) && shape.type === 'service';
}

export interface Operation extends Shape {
  type: 'operation';
  input: Target;
  output: Target;
  errors: Target[];
}

export function isOperation(shape: unknown): shape is Operation {
  return isShape(shape) && shape.type === 'operation';
}

export interface Resource extends Shape {
  type: 'resource';
  properties: {
    [key: string]: string;
  };
  identifiers: {
    [key: string]: Target;
  };
  create: Target;
  put: Target;
  read: Target;
  update: Target;
  delete: Target;
  list: Target;
  operations: Target[];
  resources: Target[];
  collectionOperations: Target[];
}

export function isResource(shape: unknown): shape is Resource {
  return isShape(shape) && shape.type === 'resource';
}
