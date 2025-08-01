import * as coda from "@codahq/packs-sdk";
import { N8nService } from "./services";
import { tagsSchema, userSchema } from "./codaTypes";
import { workflowSchema } from "./codaTypes/workflow";
import { listMethods, Method } from "./types";

export const pack = coda.newPack();

pack.addNetworkDomain("MyDomain.com");

const BASE_URL: string = "https://MyBaseUrl";

pack.setUserAuthentication({
  type: coda.AuthenticationType.CustomHeaderToken,
  headerName: "X-N8N-API-KEY"
})

// -------------------------------------------------------------------------------------------------------------------
// Trigger Workflow
// -------------------------------------------------------------------------------------------------------------------
pack.addFormula({
  name: "TriggerWorkflow",
  description: "Trigger an n8n workflow",
  isAction: true,
  connectionRequirement: coda.ConnectionRequirement.Optional,
  parameters: [
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
      autocomplete: listMethods,
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
  execute: async function ([workflowId, method = "GET", data, testMode = false], context) {
    const n8nService = new N8nService(BASE_URL);

    const payload: any[] = data ? data.map(item => JSON.parse(item)) : [];

    const result = await n8nService.triggerWorkflow(workflowId, payload, testMode, method as Method, context);

    return {
      success: true,
      message: "Workflow triggered successfully",
      executionId: result.id || "unknown",
    };
  },
});

// -------------------------------------------------------------------------------------------------------------------
// Gestion Workflow
// -------------------------------------------------------------------------------------------------------------------

pack.addFormula({
  name: "activateWorkflow",
  description: "Activate a workflow",
  isAction: true,
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "workflowId",
      description: "The ID of the workflow to activate",
    }),
  ],
  resultType: coda.ValueType.Boolean,
  execute: async function ([workflowId], context) {
    const n8nService = new N8nService(BASE_URL);
    const result = await n8nService.activateWorkflow(workflowId, context);
    return result.success;
  }
})

pack.addFormula({
  name: "deactivateWorkflow",
  description: "Deactivate a workflow",
  isAction: true,
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "workflowId",
      description: "The ID of the workflow to deactivate",
    }),
  ],
  resultType: coda.ValueType.Boolean,
  execute: async function ([workflowId], context) {
    const n8nService = new N8nService(BASE_URL);
    const result = await n8nService.deactivateWorkflow(workflowId, context);
    return result.success;
  }
})

// -------------------------------------------------------------------------------------------------------------------
// Gestion Tags
// -------------------------------------------------------------------------------------------------------------------

pack.addFormula({
  name: "createTag",
  description: "Create a tag",
  isAction: true,
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "name",
      description: "The name of the tag to create",
    }),
  ],
  resultType: coda.ValueType.Boolean,
  execute: async function ([name], context) {
    const n8nService = new N8nService(BASE_URL);
    const result = await n8nService.createTag(name, context);
    return result.success;
  }
})

pack.addFormula({
  name: "deleteTag",
  description: "Delete a tag",
  isAction: true,
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "tagId",
      description: "The ID of the tag to delete",
    }),
  ],
  resultType: coda.ValueType.Boolean,
  execute: async function ([tagId], context) {
    const n8nService = new N8nService(BASE_URL);
    const result = await n8nService.deleteTag(tagId, context);
    return result.success;
  }
})

pack.addFormula({
  name: "updateTag",
  description: "Update a tag",
  isAction: true,
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "tagId",
      description: "The ID of the tag to update",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "name",
      description: "The name of the tag to update",
    }),
  ],
  resultType: coda.ValueType.Boolean,
  execute: async function ([tagId, name], context) {
    const n8nService = new N8nService(BASE_URL);
    const result = await n8nService.updateTag(tagId, name, context);
    return result.success;
  }
})

// -------------------------------------------------------------------------------------------------------------------
// Gestion Projects
// -------------------------------------------------------------------------------------------------------------------

pack.addFormula({
  name: "createProject",
  description: "Create a project",
  isAction: true,
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "name",
      description: "The name of the project to create",
    }),
  ],
  resultType: coda.ValueType.Boolean,
  execute: async function ([name], context) {
    const n8nService = new N8nService(BASE_URL);
    const result = await n8nService.createProject(name, context);
    return result.success;
  }
})

pack.addFormula({
  name: "deleteProject",
  description: "Delete a project",
  isAction: true,
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "projectId",
      description: "The ID of the project to delete",
    }),
  ],
  resultType: coda.ValueType.Boolean,
  execute: async function ([projectId], context) {
    const n8nService = new N8nService(BASE_URL);
    const result = await n8nService.deleteProject(projectId, context);
    return result.success;
  }
})

// -------------------------------------------------------------------------------------------------------------------
// Gestion Users
// -------------------------------------------------------------------------------------------------------------------

pack.addFormula({
  name: "deleteUser",
  description: "Delete a user",
  isAction: true,
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "userId",
      description: "The ID of the user to delete",
    }),
  ],
  resultType: coda.ValueType.Boolean,
  execute: async function ([userId], context) {
    const n8nService = new N8nService(BASE_URL);
    const result = await n8nService.deleteUser(userId, context);
    return result.success;
  }
})

pack.addFormula({
  name: "createUser",
  description: "Create a user",
  isAction: true,
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email",
      description: "The email of the user to create",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "role",
      description: "The role of the user to create",
    }),
  ],
  resultType: coda.ValueType.Boolean,
  execute: async function ([email, role], context) {
    const n8nService = new N8nService(BASE_URL);
    const result = await n8nService.createUser(email, role, context);
    return result.success;
  }
})

pack.addFormula({
  name: "updateUserRole",
  description: "Update the role of a user",
  isAction: true,
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "userId",
      description: "The ID of the user to update",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "role",
      description: "The role of the user to update",
    }),
  ],
  resultType: coda.ValueType.Boolean,
  execute: async function ([userId, role], context) {
    const n8nService = new N8nService(BASE_URL);
    const result = await n8nService.updateUserRole(userId, role, context);
    return result.success;
  }
})

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
    execute: async function ([limit = 10, includeRole = false, projectId], context) {
      const cursor = context.sync.continuation?.cursor || "";

      const n8nService = new N8nService(BASE_URL);
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
    parameters: [],
    execute: async function ([], context) {
      const cursor = context.sync.continuation?.cursor || "";

      const n8nService = new N8nService(BASE_URL);
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
        type: coda.ParameterType.Number,
        name: "limit",
        description: "The number of tags to return, default is 100",
        optional: true,
      }),
    ],
    execute: async function ([limit = 100], context) {
      const cursor = context.sync.continuation?.cursor || "";

      const n8nService = new N8nService(BASE_URL);
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