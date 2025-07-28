import * as coda from "@codahq/packs-sdk";
import { N8nService } from "./services";
import { Method } from "./types";

export const pack = coda.newPack();

pack.addNetworkDomain("mathieu-busse.dev");

pack.addFormula({
  name: "TriggerWorkflow",
  description: "Trigger an n8n workflow",
  isAction: true,
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "baseUrl",
      description: "Your base n8n instance URL",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "workflowId",
      description: "The ID of the workflow to trigger",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "method",
      description: "The HTTP method to use. Default is GET. Note: GET/HEAD requests cannot include data.",
      optional: true,
      autocomplete: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    }),
    coda.makeParameter({
      type: coda.ParameterType.StringArray,
      name: "data",
      description: "JSON data to send to the workflow",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.Boolean,
      name: "testMode",
      description: "If true, the workflow will be triggered in test mode",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: coda.makeObjectSchema({
    properties: {
      success: { type: coda.ValueType.Boolean },
      message: { type: coda.ValueType.String },
      executionId: { type: coda.ValueType.String },
    },
  }),
  execute: async function ([baseUrl, workflowId, method = "GET", data, testMode = false], context) {
    const n8nService = new N8nService(baseUrl);

    const payload: any[] = data ? data.map(item => JSON.parse(item)) : [];

    const result = await n8nService.triggerWorkflow(workflowId, method as Method, payload, testMode, context);

    return {
      success: true,
      message: "Workflow triggered successfully",
      executionId: result.id || "unknown",
    };
  },
});

pack.addFormula({
  name: "generateJson",
  description: "Generate a JSON object with items array from Coda list",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.StringArray,
      name: "keys",
      description: "The keys for each object in the items array",
    }),
    coda.makeParameter({
      type: coda.ParameterType.StringArray,
      name: "values",
      description: "The values for each object in the items array",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: async function ([keys, values]) {
    if (keys.length !== values.length) {
      throw new coda.UserVisibleError("Keys and values must have the same length");
    }

    const item = keys.reduce((acc, key, index) => {
      acc[key] = values[index];
      return acc;
    }, {});

    return JSON.stringify(item);
  },
});