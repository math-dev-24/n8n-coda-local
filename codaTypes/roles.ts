import * as coda from "@codahq/packs-sdk";


export const rolesSchema = coda.makeObjectSchema({
    properties: {
        id: {
            type: coda.ValueType.String,
            required: true,
        },
        name: {
            type: coda.ValueType.String,
            required: true,
            description: "The name of the role",
        },
        scope: {
            type: coda.ValueType.String,
            description: "The scope of the role",
        },
        createdAt: {
            type: coda.ValueType.String,
            description: "The date and time the role was created",
            codaType: coda.ValueHintType.DateTime,
        },
        updatedAt: {
            type: coda.ValueType.String,
            description: "The date and time the role was updated",
            codaType: coda.ValueHintType.DateTime,
        },
    },
    identity: {
        name: "Role"
    },
    displayName: "Role",
    idProperty: "id",
    displayProperty: "name",
    featuredProperties: ["name", "scope", "createdAt", "updatedAt"]
})