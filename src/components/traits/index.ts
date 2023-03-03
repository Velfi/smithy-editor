export const ANNOTATION_TRAITS = ['aws.api#controlPlane', 'aws.api#dataPlane'];

export function isAnnotationTrait(traitName: string): boolean {
  return ANNOTATION_TRAITS.includes(traitName);
}

export const KV_PAIR_TRAITS = [
  'aws.api#data',
  'smithy.api#default',
  'smithy.api#httpError',
  'smithy.api#documentation',
  'smithy.api#error',
  'smithy.api#pattern',
  'smithy.api#timestampFormat',
  'smithy.api#title',
  'smithy.api#xmlName',
  'smithy.api#resourceIdentifier',
  'smithy.api#httpQuery',
  'smithy.api#httpHeader',
];

export function isKvPairTrait(traitName: string): boolean {
  return KV_PAIR_TRAITS.includes(traitName);
}

export const STRUCTURE_TRAITS = [
  'aws.api#clientDiscoveredEndpoint',
  'aws.api#clientEndpointDiscovery',
  'aws.api#service',
  'aws.auth#sigv4',
  'aws.auth#unsignedPayload',
  'aws.customizations#s3UnwrappedXmlOutput',
  'aws.protocols#awsJson1_0',
  'aws.protocols#ec2Query',
  'aws.protocols#httpChecksum',
  'aws.protocols#restXml',
  'smithy.api#auth',
  'smithy.api#endpoint',
  'smithy.api#http',
  'smithy.api#input',
  'smithy.api#length',
  'smithy.api#output',
  'smithy.api#paginated',
  'smithy.api#range',
  'smithy.api#sensitive',
  'smithy.api#streaming',
  'smithy.api#suppress',
  'smithy.api#xmlNamespace',
  'smithy.rules#clientContextParams',
  'smithy.rules#endpointRuleSet',
  'smithy.rules#endpointTests',
  'smithy.rules#staticContextParams',
  'smithy.waiters#waitable',
];

export function isStructureTrait(traitName: string): boolean {
  return STRUCTURE_TRAITS.includes(traitName);
}

const ARRAY_TRAITS = ['smithy.api#enum'];

export function isArrayTrait(traitName: string): boolean {
  return ARRAY_TRAITS.includes(traitName);
}

export const KNOWN_TRAITS = [
  ...ANNOTATION_TRAITS,
  ...STRUCTURE_TRAITS,
  ...KV_PAIR_TRAITS,
  ...ARRAY_TRAITS,
];

export function isKnownTrait(traitName: string): boolean {
  return KNOWN_TRAITS.includes(traitName);
}
