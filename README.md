![](https://img.shields.io/github/package-json/v/kaskadi/stocks-api)
![](https://img.shields.io/badge/code--style-standard-blue)
![](https://img.shields.io/github/license/kaskadi/stocks-api?color=blue)

**GitHub Actions workflows status**

[![](https://img.shields.io/github/workflow/status/kaskadi/stocks-api/deploy?label=deployed&logo=Amazon%20AWS)](https://github.com/kaskadi/stocks-api/actions?query=workflow%3Adeploy)
[![](https://img.shields.io/github/workflow/status/kaskadi/stocks-api/build?label=build&logo=mocha)](https://github.com/kaskadi/stocks-api/actions?query=workflow%3Abuild)
[![](https://img.shields.io/github/workflow/status/kaskadi/stocks-api/syntax-check?label=syntax-check&logo=serverless)](https://github.com/kaskadi/stocks-api/actions?query=workflow%3Asyntax-check)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/stocks-api?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/stocks-api)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/stocks-api?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/stocks-api)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/stocks-api?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/stocks-api)

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/stocks-api?label=code%20quality&logo=LGTM)](https://lgtm.com/projects/g/kaskadi/stocks-api/?mode=list&logo=LGTM)

<!-- You can add badges inside of this section if you'd like -->

****

<!-- automatically generated documentation will be placed in here -->
# API endpoints

The origin and root path for this API is: `https://api.klimapartner.net/stocks`

The following endpoints are defined in this API:
- [/amz/request-update](#/amz/request-update)
- [/klima/request-update](#/klima/request-update)

## `/amz/request-update` <a name="/amz/request-update"></a>

Supported methods:
- [GET](#amz/request-update-GET)

### `GET` (target lambda → [request-amz-stock-update](#request-amz-stock-update)) <a name="amz/request-update-GET"></a>

**Description:**

This endpoint initialize a stock update for all Amazon stocks of Klimapartner GmbH.

**Authorization:**

|   Type  | Identity source                                       |
| :-----: | :---------------------------------------------------- |
| Cognito | <ul><li>method.request.header.Authorization</li></ul> |

**Query string parameters:**

|   Key  | Default | Description                                                                                                                                        |
| :----: | :-----: | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `code` |         | The code of the marketplace you would like to refresh stocks for. If nothing is specified, this will start an update process for all marketplaces. |

**Request body:**

No body found for this method.

**Examples:**

<details>
<summary>Example #1</summary>

_Request:_

```HTTP
GET https://api.klimapartner.net/stocks/amz/request-update?code=DE

Headers:
  Authorization: Bearer COGNITO_ACCESS_TOKEN
```

_Response:_

```HTTP
Status code:
  200

Headers:
  Access-Control-Allow-Origin: *

Body:
  {
    "message": "Stock update successfully requested!"
  }
```
</details>

<details>
<summary>Example #2</summary>

_Request:_

```HTTP
GET https://api.klimapartner.net/stocks/amz/request-update

Headers:
  Authorization: Bearer COGNITO_ACCESS_TOKEN
```

_Response:_

```HTTP
Status code:
  200

Headers:
  Access-Control-Allow-Origin: *

Body:
  {
    "message": "Stock update successfully requested!"
  }
```
</details>

<details>
<summary>Example #3</summary>

_Request:_

```HTTP
GET https://api.klimapartner.net/stocks/amz/request-update?code=WRONG_MARKETPLACE_CODE

Headers:
  Authorization: Bearer COGNITO_ACCESS_TOKEN
```

_Response:_

```HTTP
Status code:
  400

Headers:
  Access-Control-Allow-Origin: *

Body:
  {
    "message": "Please provide a valid country code in your query string."
  }
```
</details>

## `/klima/request-update` <a name="/klima/request-update"></a>

Supported methods:
- [GET](#klima/request-update-GET)

### `GET` (target lambda → [request-klima-stock-update](#request-klima-stock-update)) <a name="klima/request-update-GET"></a>

**Description:**

This endpoint initialize a stock update for all in-house stocks at Klimapartner GmbH.

**Authorization:**

|   Type  | Identity source                                       |
| :-----: | :---------------------------------------------------- |
| Cognito | <ul><li>method.request.header.Authorization</li></ul> |

**Query string parameters:**

No query string parameters found for this method.

**Request body:**

No body found for this method.

**Examples:**

<details>
<summary>Example #1</summary>

_Request:_

```HTTP
GET https://api.klimapartner.net/stocks/klima/request-update

Headers:
  Authorization: Bearer COGNITO_ACCESS_TOKEN
```

_Response:_

```HTTP
Status code:
  200

Headers:
  Access-Control-Allow-Origin: *

Body:
  {
    "message": "Stock update successfully requested!"
  }
```
</details>

# API resources

The following lambda functions are used in this API:
- [request-amz-stock-update](#request-amz-stock-update)
- [request-klima-stock-update](#request-klima-stock-update)

The following layers are used in this API:
- [stocks-api-layer](#stocks-api-layer)

## request-amz-stock-update <a name="request-amz-stock-update"></a>

|           Name           | Sources                                 | Timeout |                                  Handler                                  | Layers                                                  |
| :----------------------: | :-------------------------------------- | :-----: | :-----------------------------------------------------------------------: | :------------------------------------------------------ |
| request-amz-stock-update | <ul><li>HTTP</li><li>SCHEDULE</li></ul> |   30s   | [handler](./lambdas/request-amz-stock-update/request-amz-stock-update.js) | <ul><li>[stocks-api-layer](#stocks-api-layer)</li></ul> |

See [configuration file](./serverless.yml) for more details.

## request-klima-stock-update <a name="request-klima-stock-update"></a>

|            Name            | Sources                                 | Timeout |                                    Handler                                    | Layers                                                  |
| :------------------------: | :-------------------------------------- | :-----: | :---------------------------------------------------------------------------: | :------------------------------------------------------ |
| request-klima-stock-update | <ul><li>HTTP</li><li>SCHEDULE</li></ul> |   30s   | [handler](./lambdas/request-klima-stock-update/request-klima-stock-update.js) | <ul><li>[stocks-api-layer](#stocks-api-layer)</li></ul> |

See [configuration file](./serverless.yml) for more details.

## stocks-api-layer <a name="stocks-api-layer"></a>

### Description

Layer for stocks-api

### Dependencies

- `collmex-client`, version: `1.12.1` ([see on NPM](https://www.npmjs.com/package/collmex-client))
- `mws-client`, version: `1.1.3` ([see on NPM](https://www.npmjs.com/package/mws-client))
- `kaskadi-stocks-utils` (local utility)

See [configuration file](./serverless.yml) for more details.

# Stack tags

You can use any tags (and their respective values) visible below to find ressources related to this stack on AWS. See [here](https://docs.amazonaws.cn/en_us/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) for more details.

| Tag          | Value             |
| :----------- | :---------------- |
| app          | kaskadi           |
| service      | stocks-api        |
| logical-unit | stocks            |
| type         | schedule and http |
<!-- automatically generated documentation will be placed in here -->

<!-- You can customize this template as you'd like! -->