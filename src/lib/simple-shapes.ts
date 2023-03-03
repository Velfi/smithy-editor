import { isShape, type Shape } from './shapes';
import type { Traits } from './traits';

export const SIMPLE_SHAPE_TYPES = [
  'blob',
  'boolean',
  'string',
  'byte',
  'short',
  'integer',
  'long',
  'float',
  'double',
  'bigInteger',
  'bigDecimal',
  'timestamp',
  'document',
  'enum',
  'intEnum',
  'unit',
];

export type SimpleShape =
  | Blob
  | BooleanShape
  | StringShape
  | Byte
  | Short
  | Integer
  | Long
  | Float
  | Double
  | BigInteger
  | BigDecimal
  | Timestamp
  | Document
  | Enum
  | IntEnum
  | Unit;

export interface Unit extends Shape {
  type: 'unit';
}

export interface Blob extends Shape {
  type: 'blob';
}

export function isBlob(shape: unknown): shape is Blob {
  return isShape(shape) && shape.type === 'blob';
}

export interface BooleanShape extends Shape {
  type: 'boolean';
}

export function isBoolean(shape: unknown): shape is BooleanShape {
  return isShape(shape) && shape.type === 'boolean';
}

export interface StringShape extends Shape {
  type: 'string';
}

export function isString(shape: unknown): shape is StringShape {
  return isShape(shape) && shape.type === 'string';
}

export interface Byte extends Shape {
  type: 'byte';
}

export function isByte(shape: unknown): shape is Byte {
  return isShape(shape) && shape.type === 'byte';
}

export interface Short extends Shape {
  type: 'short';
}

export function isShort(shape: unknown): shape is Short {
  return isShape(shape) && shape.type === 'short';
}

export interface Integer extends Shape {
  type: 'integer';
}

export function isInteger(shape: unknown): shape is Integer {
  return isShape(shape) && shape.type === 'integer';
}

export interface Long extends Shape {
  type: 'long';
}

export function isLong(shape: unknown): shape is Long {
  return isShape(shape) && shape.type === 'long';
}

export interface Float extends Shape {
  type: 'float';
}

export function isFloat(shape: unknown): shape is Float {
  return isShape(shape) && shape.type === 'float';
}

export interface Double extends Shape {
  type: 'double';
}

export function isDouble(shape: unknown): shape is Double {
  return isShape(shape) && shape.type === 'double';
}

export interface BigInteger extends Shape {
  type: 'bigInteger';
}

export function isBigInteger(shape: unknown): shape is BigInteger {
  return isShape(shape) && shape.type === 'bigInteger';
}

export interface BigDecimal extends Shape {
  type: 'bigDecimal';
}

export function isBigDecimal(shape: unknown): shape is BigDecimal {
  return isShape(shape) && shape.type === 'bigDecimal';
}

export interface Timestamp extends Shape {
  type: 'timestamp';
}

export function isTimestamp(shape: unknown): shape is Timestamp {
  return isShape(shape) && shape.type === 'timestamp';
}

export interface Document extends Shape {
  type: 'document';
}

export function isDocument(shape: unknown): shape is Document {
  return isShape(shape) && shape.type === 'document';
}

export interface Enum extends Shape {
  type: 'enum';
  members: {
    [key: string]: {
      target: 'smithy.api#Unit';
      traits: Traits;
    };
  };
}

export function isEnum(shape: unknown): shape is Enum {
  return isShape(shape) && shape.type === 'enum';
}

export interface IntEnum extends Shape {
  type: 'intEnum';
  // In reality, these should always be numbers, but I don't know how to express that in TypeScript.
  [key: string]: number | string | Traits | undefined;
}

export function isIntEnum(shape: unknown): shape is IntEnum {
  return isShape(shape) && shape.type === 'intEnum';
}
