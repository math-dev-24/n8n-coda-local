import * as coda from "@codahq/packs-sdk";
import { N8nService, UrlService } from "./services";
import { rolesSchema, tagsSchema, userSchema } from "./codaTypes";
import { workflowSchema } from "./codaTypes/workflow";
import { Method } from "./types";

export const pack = coda.newPack();

pack.addNetworkDomain("mathieu-busse.dev");

pack.setUserAuthentication({
  type: coda.AuthenticationType.CustomHeaderToken,
  headerName: "X-N8N-API-KEY"
})

pack.addFormula({
  name: "TriggerWorkflow",
  description: "Trigger an n8n workflow",
  isAction: true,
  connectionRequirement: coda.ConnectionRequirement.Optional,
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
    const urlService = new UrlService(baseUrl, "triggerWorkflow", workflowId, { method: method as Method });
    const n8nService = new N8nService(urlService);

    const payload: any[] = data ? data.map(item => JSON.parse(item)) : [];

    const result = await n8nService.triggerWorkflow(workflowId, payload, testMode, context);

    return {
      success: true,
      message: "Workflow triggered successfully",
      executionId: result.id || "unknown",
    };
  },
});

// -------------------------------------------------------------------------------------------------------------------
// Liste des utilisateurs
pack.addSyncTable({
  name: "Users",
  description: "A list of users",
  identityName: "User",
  schema: userSchema,
  formula: {
    name: "Users",
    description: "A list of users",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "baseUrl",
        description: "The base URL of the n8n instance",
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "limit",
        description: "The number of users to return, default is 10",
        optional: true,
      }),
      coda.makeParameter({
        name: "includeRole",
        type: coda.ParameterType.Boolean,
        description: "Whether to include the role of the user",
        optional: true,
      }),
      coda.makeParameter({
        name: "projectId",
        type: coda.ParameterType.String,
        description: "The ID of the project to return users from",
        optional: true,
      })
    ],
    execute: async function ([baseUrl, limit = 10, includeRole = false, projectId], context) {
      const cursor = context.sync.continuation?.cursor || "";

      const urlService = new UrlService(baseUrl, "getUsers");
      const n8nService = new N8nService(urlService);
      const body = await n8nService.getUsers(context, limit, includeRole, projectId, cursor);

      const users = body.data;
      const newCursor = body.nextCursor;
      const continuation = newCursor ? { cursor: newCursor } : undefined;

      return {
        result: users,
        continuation
      }
    }
  }
})

// -------------------------------------------------------------------------------------------------------------------
// Liste des workflows
pack.addSyncTable({
  name: "Workflows",
  description: "A list of workflows",
  identityName: "Workflow",
  schema: workflowSchema,
  formula: {
    name: "Workflows",
    description: "A list of workflows",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "baseUrl",
        description: "The base URL of the n8n instance",  
      })
    ],
    execute: async function ([baseUrl], context) {
      const cursor = context.sync.continuation?.cursor || "";

      const urlService = new UrlService(baseUrl, "getWorkflows");
      const n8nService = new N8nService(urlService);
      const body = await n8nService.getWorkflows(context, cursor);

      const workflows = body.data;
      const newCursor = body.nextCursor;
      const continuation = newCursor ? { cursor: newCursor } : undefined;
      return {
        result: workflows,
        continuation
      }
    }
  }
})

// -------------------------------------------------------------------------------------------------------------------
// Liste des tags
pack.addSyncTable({
  name: "Tags",
  description: "A list of tags",
  identityName: "Tag",
  schema: tagsSchema,
  formula: {
    name: "Tags",
    description: "A list of tags",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "baseUrl",
        description: "The base URL of the n8n instance",
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "limit",
        description: "The number of tags to return, default is 100",
        optional: true,
      }),
    ],
    execute: async function ([baseUrl, limit = 100], context) {

      const cursor = context.sync.continuation?.cursor || "";

      const urlService = new UrlService(baseUrl, "getTags");
      const n8nService = new N8nService(urlService);

      const body = await n8nService.getTags(context, limit, cursor);

      const tags = body.data;
      const newCursor = body.nextCursor;
      const continuation = newCursor ? { cursor: newCursor } : undefined;

      return {
        result: tags,
        continuation
      }
    }
  }
})

// -------------------------------------------------------------------------------------------------------------------
// Générer un JSON à partir d'un tableau de clés et de valeurs
pack.addFormula({
  name: "generateJson",
  description: "Generate a JSON object with items array from Coda list",
  connectionRequirement: coda.ConnectionRequirement.None,
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