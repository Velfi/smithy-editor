export interface EndpointRuleSet {
  version: string;
  parameters: {
    [key: string]: EndpointParameter;
  };
  rules: Rule[];
}

export interface EndpointParameter {
  builtIn: string;
  required: boolean;
  default?: boolean;
  documentation: string;
  type: 'String' | 'Boolean';
}

export interface EndpointCondition {
  fn: string;
  argv: Arg[];
  assign?: string;
}

export type Arg = EndpointCondition | Ref | string | boolean;

export function isEndpointCondition(condition: unknown): condition is EndpointCondition {
  if (typeof condition === 'object' && condition !== null) {
    return 'fn' in condition && 'argv' in condition;
  } else {
    return false;
  }
}

export interface Ref {
  ref: string;
}

export function isRef(ref: unknown): ref is Ref {
  return typeof ref === 'object' && ref !== null ? 'ref' in ref : false;
}

export interface Rule {
  type: string;
  conditions: EndpointCondition[];
}

export interface EndpointRule extends Rule {
  type: 'endpoint';
  endpoint: {
    url: string | Ref;
    properties: object;
    headers: object;
  };
}

export interface TreeRule extends Rule {
  type: 'tree';
  rules: EndpointRule[];
}

export interface ErrorRule extends Rule {
  type: 'error';
  error: string;
}

export function isEndpointRule(rule: Rule): rule is EndpointRule {
  return rule.type === 'endpoint';
}

export function isTreeRule(rule: Rule): rule is TreeRule {
  return rule.type === 'tree';
}

export function isErrorRule(rule: Rule): rule is ErrorRule {
  return rule.type === 'error';
}
