import type { EndpointRuleSet } from './endpoint-rule-set';
import type { EndpointTests } from './endpoint-tests';
import type { AwsApiService } from './service';
import type { SmithyApiEnum } from './smithy-api-enum';

export * from './endpoint-rule-set';
export * from './endpoint-tests';
export * from './service';

const TRAIT_NAME_TO_URL: { [key: string]: string } = {
  'aws.api#arn': 'aws/aws-core.html#aws-api-arn-trait',
  'aws.api#arnReference': 'aws/aws-core.html#aws-api-arnreference-trait',
  'aws.api#clientDiscoveredEndpoint': 'aws/aws-core.html#aws-api-clientdiscoveredendpoint-trait',
  'aws.api#clientEndpointDiscovery': 'aws/aws-core.html#aws-api-clientendpointdiscovery-trait',
  'aws.api#clientEndpointDiscoveryId': 'aws/aws-core.html#aws-api-clientendpointdiscoveryid-trait',
  'aws.api#controlPlane': 'aws/aws-core.html#aws-api-controlplane-trait',
  'aws.api#data': 'aws/aws-core.html#aws-api-data-trait',
  'aws.api#dataPlane': 'aws/aws-core.html#aws-api-dataplane-trait',
  'aws.api#service': 'aws/aws-core.html#aws-api-service-trait',
  'aws.api#tagEnabled': 'aws/aws-core.html#aws-api-tagenabled-trait',
  'aws.api#taggable': 'aws/aws-core.html#aws-api-taggable-trait',
  'aws.apigateway#apiKeySource': 'aws/amazon-apigateway.html#aws-apigateway-apikeysource-trait',
  'aws.apigateway#authorizer': 'aws/amazon-apigateway.html#aws-apigateway-authorizer-trait',
  'aws.apigateway#authorizers': 'aws/amazon-apigateway.html#aws-apigateway-authorizers-trait',
  'aws.apigateway#integration': 'aws/amazon-apigateway.html#aws-apigateway-integration-trait',
  'aws.apigateway#mockIntegration':
    'aws/amazon-apigateway.html#aws-apigateway-mockintegration-trait',
  'aws.apigateway#requestValidator':
    'aws/amazon-apigateway.html#aws-apigateway-requestvalidator-trait',
  'aws.auth#cognitoUserPools': 'aws/aws-auth.html#aws-auth-cognitouserpools-trait',
  'aws.auth#sigv4': 'aws/aws-auth.html#aws-auth-sigv4-trait',
  'aws.auth#unsignedPayload': 'aws/aws-auth.html#aws-auth-unsignedpayload-trait',
  'aws.cloudformation#cfnAdditionalIdentifier':
    'aws/aws-cloudformation.html#aws-cloudformation-cfnadditionalidentifier-trait',
  'aws.cloudformation#cfnDefaultValue':
    'aws/aws-cloudformation.html#aws-cloudformation-cfndefaultvalue-trait',
  'aws.cloudformation#cfnExcludeProperty':
    'aws/aws-cloudformation.html#aws-cloudformation-cfnexcludeproperty-trait',
  'aws.cloudformation#cfnMutability':
    'aws/aws-cloudformation.html#aws-cloudformation-cfnmutability-trait',
  'aws.cloudformation#cfnName': 'aws/aws-cloudformation.html#aws-cloudformation-cfnname-trait',
  'aws.cloudformation#cfnResource':
    'aws/aws-cloudformation.html#aws-cloudformation-cfnresource-trait',
  'aws.iam#actionPermissionDescription':
    'aws/aws-iam.html#aws-iam-actionpermissiondescription-trait',
  'aws.iam#conditionKeys': 'aws/aws-iam.html#aws-iam-conditionkeys-trait',
  'aws.iam#defineConditionKeys': 'aws/aws-iam.html#aws-iam-defineconditionkeys-trait',
  'aws.iam#disableConditionKeyInference':
    'aws/aws-iam.html#aws-iam-disableconditionkeyinference-trait',
  'aws.iam#iamResource': 'aws/aws-iam.html#aws-iam-iamresource-trait',
  'aws.iam#requiredActions': 'aws/aws-iam.html#aws-iam-requiredactions-trait',
  'aws.iam#supportedPrincipalTypes': 'aws/aws-iam.html#aws-iam-supportedprincipaltypes-trait',
  'aws.protocols#awsJson1_0':
    'aws/protocols/aws-json-1_0-protocol.html#aws-protocols-awsjson1_0-trait',
  'aws.protocols#awsJson1_1':
    'aws/protocols/aws-json-1_1-protocol.html#aws-protocols-awsjson1_1-trait',
  'aws.protocols#awsQuery': 'aws/protocols/aws-query-protocol.html#aws-protocols-awsquery-trait',
  'aws.protocols#awsQueryCompatible':
    'aws/protocols/aws-query-protocol.html#aws-protocols-awsquerycompatible-trait',
  'aws.protocols#awsQueryError':
    'aws/protocols/aws-query-protocol.html#aws-protocols-awsqueryerror-trait',
  'aws.protocols#ec2Query':
    'aws/protocols/aws-ec2-query-protocol.html#aws-protocols-ec2query-trait',
  'aws.protocols#ec2QueryName':
    'aws/protocols/aws-ec2-query-protocol.html#aws-protocols-ec2queryname-trait',
  'aws.protocols#httpChecksum': 'aws/aws-core.html#aws-protocols-httpchecksum-trait',
  'aws.protocols#restJson1':
    'aws/protocols/aws-restjson1-protocol.html#aws-protocols-restjson1-trait',
  'aws.protocols#restXml': 'aws/protocols/aws-restxml-protocol.html#aws-protocols-restxml-trait',
  'smithy.api#addedDefault': 'spec/type-refinement-traits.html#smithy-api-addeddefault-trait',
  'smithy.api#auth': 'spec/authentication-traits.html#smithy-api-auth-trait',
  'smithy.api#authDefinition': 'spec/authentication-traits.html#smithy-api-authdefinition-trait',
  'smithy.api#clientOptional': 'spec/type-refinement-traits.html#smithy-api-clientoptional-trait',
  'smithy.api#cors': 'spec/http-bindings.html#smithy-api-cors-trait',
  'smithy.api#default': 'spec/type-refinement-traits.html#smithy-api-default-trait',
  'smithy.api#deprecated': 'spec/documentation-traits.html#smithy-api-deprecated-trait',
  'smithy.api#documentation': 'spec/documentation-traits.html#smithy-api-documentation-trait',
  'smithy.api#endpoint': 'spec/endpoint-traits.html#smithy-api-endpoint-trait',
  'smithy.api#enum': 'spec/constraint-traits.html#smithy-api-enum-trait',
  'smithy.api#enumValue': 'spec/type-refinement-traits.html#smithy-api-enumvalue-trait',
  'smithy.api#error': 'spec/type-refinement-traits.html#smithy-api-error-trait',
  'smithy.api#eventHeader': 'spec/streaming.html#smithy-api-eventheader-trait',
  'smithy.api#eventPayload': 'spec/streaming.html#smithy-api-eventpayload-trait',
  'smithy.api#examples': 'spec/documentation-traits.html#smithy-api-examples-trait',
  'smithy.api#externalDocumentation':
    'spec/documentation-traits.html#smithy-api-externaldocumentation-trait',
  'smithy.api#hostLabel': 'spec/endpoint-traits.html#smithy-api-hostlabel-trait',
  'smithy.api#http': 'spec/http-bindings.html#smithy-api-http-trait',
  'smithy.api#httpApiKeyAuth': 'spec/authentication-traits.html#smithy-api-httpapikeyauth-trait',
  'smithy.api#httpBasicAuth': 'spec/authentication-traits.html#smithy-api-httpbasicauth-trait',
  'smithy.api#httpBearerAuth': 'spec/authentication-traits.html#smithy-api-httpbearerauth-trait',
  'smithy.api#httpChecksumRequired':
    'spec/http-bindings.html#smithy-api-httpchecksumrequired-trait',
  'smithy.api#httpDigestAuth': 'spec/authentication-traits.html#smithy-api-httpdigestauth-trait',
  'smithy.api#httpError': 'spec/http-bindings.html#smithy-api-httperror-trait',
  'smithy.api#httpHeader': 'spec/http-bindings.html#smithy-api-httpheader-trait',
  'smithy.api#httpLabel': 'spec/http-bindings.html#smithy-api-httplabel-trait',
  'smithy.api#httpPayload': 'spec/http-bindings.html#smithy-api-httppayload-trait',
  'smithy.api#httpPrefixHeaders': 'spec/http-bindings.html#smithy-api-httpprefixheaders-trait',
  'smithy.api#httpQuery': 'spec/http-bindings.html#smithy-api-httpquery-trait',
  'smithy.api#httpQueryParams': 'spec/http-bindings.html#smithy-api-httpqueryparams-trait',
  'smithy.api#httpResponseCode': 'spec/http-bindings.html#smithy-api-httpresponsecode-trait',
  'smithy.api#idRef': 'spec/constraint-traits.html#smithy-api-idref-trait',
  'smithy.api#idempotencyToken': 'spec/behavior-traits.html#smithy-api-idempotencytoken-trait',
  'smithy.api#idempotent': 'spec/behavior-traits.html#smithy-api-idempotent-trait',
  'smithy.api#input': 'spec/type-refinement-traits.html#smithy-api-input-trait',
  'smithy.api#internal': 'spec/documentation-traits.html#smithy-api-internal-trait',
  'smithy.api#jsonName': 'spec/protocol-traits.html#smithy-api-jsonname-trait',
  'smithy.api#mediaType': 'spec/protocol-traits.html#smithy-api-mediatype-trait',
  'smithy.api#nestedProperties': 'spec/resource-traits.html#smithy-api-nestedproperties-trait',
  'smithy.api#noReplace': 'spec/resource-traits.html#smithy-api-noreplace-trait',
  'smithy.api#notProperty': 'spec/resource-traits.html#smithy-api-notproperty-trait',
  'smithy.api#optionalAuth': 'spec/authentication-traits.html#smithy-api-optionalauth-trait',
  'smithy.api#output': 'spec/type-refinement-traits.html#smithy-api-output-trait',
  'smithy.api#paginated': 'spec/behavior-traits.html#smithy-api-paginated-trait',
  'smithy.api#pattern': 'spec/constraint-traits.html#smithy-api-pattern-trait',
  'smithy.api#private': 'spec/constraint-traits.html#smithy-api-private-trait',
  'smithy.api#property': 'spec/resource-traits.html#smithy-api-property-trait',
  'smithy.api#protocolDefinition': 'spec/protocol-traits.html#smithy-api-protocoldefinition-trait',
  'smithy.api#range': 'spec/constraint-traits.html#smithy-api-range-trait',
  'smithy.api#readonly': 'spec/behavior-traits.html#smithy-api-readonly-trait',
  'smithy.api#recommended': 'spec/documentation-traits.html#smithy-api-recommended-trait',
  'smithy.api#references': 'spec/resource-traits.html#smithy-api-references-trait',
  'smithy.api#required': 'spec/type-refinement-traits.html#smithy-api-required-trait',
  'smithy.api#requiresLength': 'spec/streaming.html#smithy-api-requireslength-trait',
  'smithy.api#resourceIdentifier': 'spec/resource-traits.html#smithy-api-resourceidentifier-trait',
  'smithy.api#retryable': 'spec/behavior-traits.html#smithy-api-retryable-trait',
  'smithy.api#sensitive': 'spec/documentation-traits.html#smithy-api-sensitive-trait',
  'smithy.api#since': 'spec/documentation-traits.html#smithy-api-since-trait',
  'smithy.api#sparse': 'spec/type-refinement-traits.html#smithy-api-sparse-trait',
  'smithy.api#streaming': 'spec/streaming.html#smithy-api-streaming-trait',
  'smithy.api#suppress': '???',
  'smithy.api#tags': 'spec/documentation-traits.html#smithy-api-tags-trait',
  'smithy.api#timestampFormat': 'spec/protocol-traits.html#smithy-api-timestampformat-trait',
  'smithy.api#title': 'spec/documentation-traits.html#smithy-api-title-trait',
  'smithy.api#trait': 'spec/model.html#smithy-api-trait-trait',
  'smithy.api#uniqueItems': 'spec/constraint-traits.html#smithy-api-uniqueitems-trait',
  'smithy.api#unstable': 'spec/documentation-traits.html#smithy-api-unstable-trait',
  'smithy.api#xmlAttribute': 'spec/protocol-traits.html#smithy-api-xmlattribute-trait',
  'smithy.api#xmlFlattened': 'spec/protocol-traits.html#smithy-api-xmlflattened-trait',
  'smithy.api#xmlName': 'spec/protocol-traits.html#smithy-api-xmlname-trait',
  'smithy.api#xmlNamespace': 'spec/protocol-traits.html#smithy-api-xmlnamespace-trait',
  'smithy.mqtt#publish': 'additional-specs/mqtt.html#smithy-mqtt-publish-trait',
  'smithy.mqtt#subscribe': 'additional-specs/mqtt.html#smithy-mqtt-subscribe-trait',
  'smithy.mqtt#topicLabel': 'additional-specs/mqtt.html#smithy-mqtt-topiclabel-trait',
  'smithy.test#httpMalformedRequestTests':
    'additional-specs/http-protocol-compliance-tests.html#smithy-test-httpmalformedrequesttests-trait',
  'smithy.test#httpRequestTests':
    'additional-specs/http-protocol-compliance-tests.html#smithy-test-httprequesttests-trait',
  'smithy.test#httpResponseTests':
    'additional-specs/http-protocol-compliance-tests.html#smithy-test-httpresponsetests-trait',
  'smithy.waiters#waitable': 'additional-specs/waiters.html#smithy-waiters-waitable-trait',
  'smithy.api#length': 'spec/constraint-traits.html?highlight=length#length-trait',
};

// These are newer and aren't yet document AFAICT
const RULE_TRAIT_TO_URL: { [key: string]: string } = {
  'smithy.rules#endpointRuleSet': 'EndpointRuleSetTrait.java',
  'smithy.rules#endpointTests': 'EndpointTestsTrait.java',
  'smithy.rules#clientContextParams': 'ClientContextParamsTrait.java',
  'smithy.rules#contextParam': 'ContextParamTrait.java',
  'smithy.rules#staticContextParam': 'StaticContextParamTrait.java',
  'smithy.rules#staticContextParams': 'StaticContextParamsTrait.java',
};

const CUSTOMIZATION_TRAIT_TO_URL: { [key: string]: string } = {
  'aws.customizations#s3UnwrappedXmlOutput':
    'https://smithy.io/2.0/aws/customizations/s3-customizations.html?highlight=s3unwrappedxmloutput#aws-customizations-s3unwrappedxmloutput-trait',
};

export function resolveLinkToSmithyTrait(id: keyof typeof TRAIT_NAME_TO_URL): string {
  if (id in TRAIT_NAME_TO_URL) {
    const link = TRAIT_NAME_TO_URL[id];
    return 'https://smithy.io/2.0/' + link;
  } else if (id in CUSTOMIZATION_TRAIT_TO_URL) {
    const link = CUSTOMIZATION_TRAIT_TO_URL[id];
    return link;
  } else if (id in RULE_TRAIT_TO_URL) {
    const link = RULE_TRAIT_TO_URL[id];
    return (
      'https://github.com/awslabs/smithy/blob/main/smithy-rules-engine/src/main/java/software/amazon/smithy/rulesengine/traits/' +
      link
    );
  } else {
    throw new Error(`Unknown smithy trait: ${id}`);
  }
}

export type Traits = {
  'smithy.api#documentation'?: string;
  'smithy.api#title'?: string;
  'smithy.rules#endpointTests'?: EndpointTests;
  'smithy.rules#endpointRuleSet'?: EndpointRuleSet;
  'aws.api#service'?: AwsApiService;
  'smithy.api#enum'?: SmithyApiEnum;
  "smithy.api#resourceIdentifier"?: string,
  [key: string]: unknown;
};

const PROTOCOL_TRAITS = [
  'aws.protocols#awsJson1_0',
  'aws.protocols#awsJson1_1',
  'aws.protocols#awsQuery',
  'aws.protocols#awsQueryCompatible',
  'aws.protocols#awsQueryError',
  'aws.protocols#ec2Query',
  'aws.protocols#ec2QueryName',
  'aws.protocols#httpChecksum',
  'aws.protocols#restJson1',
  'aws.protocols#restXml',
  'smithy.api#jsonName',
  'smithy.api#mediaType',
  'smithy.api#protocolDefinition',
  'smithy.api#timestampFormat',
  'smithy.api#xmlAttribute',
  'smithy.api#xmlFlattened',
  'smithy.api#xmlName',
  'smithy.api#xmlNamespace',
];

export function isProtocolTrait([name]: [string, unknown]): boolean {
  return PROTOCOL_TRAITS.includes(name);
}

const AUTHENTICATION_TRAITS = [
  'smithy.api#auth',
  'smithy.api#authDefinition',
  'smithy.api#httpApiKeyAuth',
  'smithy.api#httpBasicAuth',
  'smithy.api#httpBearerAuth',
  'smithy.api#httpDigestAuth',
  'smithy.api#optionalAuth',
];

export function isAuthenticationTrait([name]: [string, unknown]): boolean {
  return AUTHENTICATION_TRAITS.includes(name);
}
