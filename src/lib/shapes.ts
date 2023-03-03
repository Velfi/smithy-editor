import { isObject } from 'lodash';
import { SIMPLE_SHAPE_TYPES } from './simple-shapes';
import type { Traits } from './traits';
export {
  type List,
  type Map,
  type Structure,
  type Union,
  type Service,
  type Operation,
  type Resource,
  isList,
  isMap,
  isOperation,
  isResource,
  isService,
  isStructure,
} from './aggregate-shapes';
export {
  type Blob,
  type BooleanShape as Boolean,
  type StringShape as String,
  type Byte,
  type Short,
  type Integer,
  type Long,
  type Float,
  type Double,
  type BigInteger,
  type BigDecimal,
  type Document,
  type Enum,
  type IntEnum,
  type SimpleShape,
  isBlob,
  isBoolean,
  isString,
  isByte,
  isShort,
  isInteger,
  isLong,
  isFloat,
  isDouble,
  isBigInteger,
  isBigDecimal,
  isDocument,
  isEnum,
  isIntEnum,
} from './simple-shapes';

export type Target = {
  target: string;
  traits?: Traits;
};

export function isTarget(shape: unknown): shape is Target {
  return isObject(shape) && 'target' in shape && typeof shape.target === 'string';
}

export interface Shape {
  type: string;
  traits?: Traits;
}

export function isShape(shape: unknown): shape is Shape {
  return isObject(shape) && 'type' in shape && typeof shape.type === 'string';
}

export function isInSmithyNamespace(id: string): boolean {
  return id.startsWith('smithy.api#');
}

// Quick and dirty but this probably works for 99% of cases.
export function resolveLinkToSmithyShape(id: string): string {
  const type = id.replace('smithy.api#', '').toLowerCase();

  // unit is special because it's not a simple shape or an aggregate shape.
  if (type === 'unit') {
    return 'https://smithy.io/2.0/spec/model.html#unit-type';
  } else if (SIMPLE_SHAPE_TYPES.includes(type)) {
    return 'https://smithy.io/2.0/spec/simple-types.html#' + type;
  } else {
    return 'https://smithy.io/2.0/spec/aggregate-types.html#' + type;
  }
}

export function resolveLinkToShape(id: string): string {
  if (isInSmithyNamespace(id)) {
    return resolveLinkToSmithyShape(id);
  }

  return id;
}
