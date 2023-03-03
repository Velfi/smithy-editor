import { isObject } from 'lodash';
import {
  isOperation,
  isResource,
  isInSmithyNamespace,
  isStructure,
  type Operation,
  type Resource,
  type Service,
  type Shape,
  type Structure,
  type Target,
  type Enum,
  isEnum,
  isShape,
} from './shapes';

interface RawModel {
  smithy: string;
  metadata: {
    suppressions: {
      id: string;
      namespace: string;
    }[];
  };
  shapes: {
    [key: string]: Shape;
  };
}

export function isRawModel(model: unknown): model is RawModel {
  if (!isObject(model)) {
    console.error(`expected model to be an object`);
    return false;
  }

  if (!('shapes' in model) || !isObject(model.shapes)) {
    console.error(`model is missing a shapes declaration`);
    return false;
  }

  if (!('smithy' in model) || typeof model.smithy !== 'string') {
    console.error(`model is missing a Smithy version declaration`);
    return false;
  }

  for (const [name, shape] of Object.entries(model.shapes)) {
    if (!isShape(shape)) {
      console.error(`shape "${name}" is not a valid shape:`, shape);
      return false;
    }
  }

  return true;
}

export class SmithyModel {
  readonly rawModel: RawModel;
  // The version of Smithy that this model is defined in.
  readonly version: string;
  readonly serviceName: string;
  readonly serviceShape: Service;
  index: Map<string, Shape> = new Map();

  constructor(version: string, serviceName: string, serviceShape: Service, rawModel: RawModel) {
    this.rawModel = rawModel;
    this.version = version;
    this.serviceName = serviceName;
    this.serviceShape = serviceShape;

    this.buildShapeIndex(Object.entries(rawModel.shapes));
  }

  private buildShapeIndex(shapes: [string, Shape][]) {
    for (const [name, shape] of shapes) {
      if (isShape(shape)) {
        this.index.set(name, shape);
      } else {
        throw new Error(
          `Object with "${name}" does not appear to be a shape: ${JSON.stringify(shape)}`
        );
      }
    }
  }

  get serviceOperations(): readonly [string, Operation][] {
    const operations: [string, Operation][] = [];

    for (const op of this.serviceShape.operations ?? []) {
      const shape = this.getShapeById(op.target);
      if (isOperation(shape)) {
        operations.push([op.target, shape]);
      }
    }

    return operations;
  }

  get serviceResources(): readonly [string, Resource][] {
    const resources: [string, Resource][] = [];

    for (const resource of this.serviceShape.resources ?? []) {
      const shape = this.getShapeById(resource.target);
      if (isResource(shape)) {
        resources.push([resource.target, shape]);
      }
    }

    return resources;
  }

  get serviceErrors(): readonly [string, Structure][] {
    const errors: [string, Structure][] = [];

    for (const resource of this.serviceShape.errors ?? []) {
      const shape = this.getShapeById(resource.target);
      if (isStructure(shape)) {
        errors.push([resource.target, shape]);
      }
    }

    return errors;
  }

  getShapesByType(...types: string[]): readonly [string, Shape][] {
    const shapes: [string, Shape][] = [];

    for (const [name, shape] of this.index.entries()) {
      if (isShape(shape) && types.includes(shape.type)) {
        shapes.push([name, shape]);
      }
    }

    return shapes;
  }

  shapes(): IterableIterator<readonly [string, Shape | Target]> {
    return this.index.entries();
  }

  getShapeById(shapeId?: string): Shape | undefined {
    if (shapeId === undefined) {
      console.warn("Shape ID is undefined, can't look up shape");
      return undefined;
    } else if (isInSmithyNamespace(shapeId)) {
      throw new Error('Tried to look up smithy shape');
    }

    const shape = this.index.get(shapeId);

    if (shape === undefined) {
      console.warn(`Shape with ID "${shapeId}" not found in model`);
    }

    return shape;
  }

  getOperationById(operationId: string): Operation | undefined {
    const shape = this.getShapeById(operationId);
    return isOperation(shape) ? shape : undefined;
  }

  getStructureById(structureId: string): Structure | undefined {
    const shape = this.getShapeById(structureId);
    return isStructure(shape) ? shape : undefined;
  }

  getEnumById(enumId: string): Enum | undefined {
    const shape = this.getShapeById(enumId);
    return isEnum(shape) ? shape : undefined;
  }

  getInputForOperation(operationId: string): Structure | undefined {
    const operation = this.getOperationById(operationId);
    const inputId = operation?.output.target ?? '';

    return this.getStructureById(inputId);
  }

  getOutputForOperation(operationId: string): Structure | undefined {
    const operation = this.getOperationById(operationId);
    const outputId = operation?.output.target ?? '';

    return this.getStructureById(outputId);
  }

  getErrorsForOperation(operationId: string): [string, Structure][] {
    const operation = this.getOperationById(operationId);
    const errors: [string, Structure][] = [];

    if (operation?.errors !== undefined) {
      for (const error of operation.errors) {
        const shape = this.getStructureById(error.target);
        if (shape !== undefined) {
          errors.push([error.target, shape]);
        }
      }
    }

    return errors;
  }

  getMembersForStructure(structureId: string): [string, Shape | Target][] {
    const structure = this.getStructureById(structureId);
    const memberShapes: [string, Shape | Target][] = [];

    if (structure?.members !== undefined) {
      for (const pair of Object.entries(structure.members)) {
        memberShapes.push(pair);
      }
    }

    return memberShapes;
  }
}
