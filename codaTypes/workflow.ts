import * as coda from "@codahq/packs-sdk";
import { tagsSchema } from "./tags";


export const workflowSchema = coda.makeObjectSchema({
    properties: {
        id: {
            type: coda.ValueType.String,
            required: true,
        },
        name: {
            type: coda.ValueType.String,
            required: true,
        },
        active: {
            type: coda.ValueType.Boolean,
            required: true,
        },
        createdAt: {
            type: coda.ValueType.String,
            required: true,
            codaType: coda.ValueHintType.DateTime,
        },
        updatedAt: {
            type: coda.ValueType.String,
            required: true,
            codaType: coda.ValueHintType.DateTime,
        },
        tags: {
            type: coda.ValueType.Array,
            items: tagsSchema
        },
        settings: coda.makeObjectSchema({
            properties: {
                saveExecutionProgress: {
                    type: coda.ValueType.Boolean,
                    required: true,
                },
                saveManualExecutions: {
                    type: coda.ValueType.Boolean,
                },
                saveDataErrorExecution: {
                    type: coda.ValueType.String,
                },
                saveDataSuccessExecution: {
                    type: coda.ValueType.String,
                },
                executionTimeout: {
                    type: coda.ValueType.Number,
                },
                errorWorkflow: {
                    type: coda.ValueType.String,
                },
                timezone: {
                    type: coda.ValueType.String,
                },
                executionOrder: {
                    type: coda.ValueType.String,
                }
            },
            idProperty: "saveExecutionProgress",
            displayProperty: "timezone"
        })
    },
    identity: {
        name: "Workflow"
    },
    displayName: "Workflow",
    idProperty: "id",
    displayProperty: "name",
    featuredProperties: ["name", "active", "createdAt", "updatedAt", "tags", "settings"]
})