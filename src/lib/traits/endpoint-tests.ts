export interface EndpointTests {
  version: string;
  testCases: EndpointTestCase[];
}

export interface EndpointTestCase {
  documentation: string;
  params: TestCaseParams;
  expect: TestCaseExpect;
}

export type TestCaseExpect =
  | {
      endpoint: {
        url: string;
      };
    }
  | {
      error: string;
    };

export interface TestCaseParams {
  [key: string]: string | boolean;
}
