module.exports = {
  request: async (ctx, next) => {
    sortToMultiValuedField(ctx, 'query', 'queryStringParameters', 'multiValueQueryStringParameters')
    sortToMultiValuedField(ctx, 'params', 'pathParameters', 'pathParameters')
    sortToMultiValuedField(ctx, 'header', 'headers', 'multiValueHeaders')
    await next()
  },
  response: (ctx, next) => {
    ctx.status = ctx.body.statusCode
    for (header in ctx.body.headers) {
      ctx.set(header, ctx.body.headers[header])
    }
    ctx.body = ctx.body.body
  }
}

function sortToMultiValuedField (ctx, field, single, multiple) {
  ctx[single] = {}
  ctx[multiple] = {}
  for (param in ctx[field]) {
    const value = ctx[field][param]
    if (Array.isArray(value)) {
      ctx[multiple][param] = value
    } else {
      ctx[single][param] = value
    }
  }
}

// {
//   "resource": "/delete/{id}",
//   "path": "/delete/123",
//   "httpMethod": "GET",
//   "headers": {
//     "c": "d"
//   },
//   "multiValueHeaders": {
//     "c": [
//       "d"
//     ]
//   },
//   "queryStringParameters": {
//     "a": "b"
//   },
//   "multiValueQueryStringParameters": {
//     "a": [
//       "b"
//     ]
//   },
//   "pathParameters": {
//     "id": "123"
//   },
//   "stageVariables": null,
//   "requestContext": {
//     "resourceId": "uzj1rt",
//     "resourcePath": "/delete/{id}",
//     "httpMethod": "GET",
//     "extendedRequestId": "AywedG6HFiAFRUg=",
//     "requestTime": "29/Sep/2019:18:41:06 +0000",
//     "path": "/delete/{id}",
//     "accountId": "374163881813",
//     "protocol": "HTTP/1.1",
//     "stage": "test-invoke-stage",
//     "domainPrefix": "testPrefix",
//     "requestTimeEpoch": 1569782466808,
//     "requestId": "ba2b9e51-6ebc-44f8-a158-c644d9a06ffc",
//     "identity": {
//       "cognitoIdentityPoolId": null,
//       "cognitoIdentityId": null,
//       "apiKey": "test-invoke-api-key",
//       "principalOrgId": null,
//       "cognitoAuthenticationType": null,
//       "userArn": "arn:aws:iam::374163881813:root",
//       "apiKeyId": "test-invoke-api-key-id",
//       "userAgent": "aws-internal/3 aws-sdk-java/1.11.590 Linux/4.9.184-0.1.ac.235.83.329.metal1.x86_64 OpenJDK_64-Bit_Server_VM/25.212-b03 java/1.8.0_212 vendor/Oracle_Corporation",
//       "accountId": "374163881813",
//       "caller": "374163881813",
//       "sourceIp": "test-invoke-source-ip",
//       "accessKey": "ASIAVOHPHX5K2YFITU7J",
//       "cognitoAuthenticationProvider": null,
//       "user": "374163881813"
//     },
//     "domainName": "testPrefix.testDomainName",
//     "apiId": "aunqpv3vg7"
//   },
//   "body": null,
//   "isBase64Encoded": false
// }
