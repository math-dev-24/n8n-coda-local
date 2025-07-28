import * as coda from "@codahq/packs-sdk";

export const tagsSchema = coda.makeObjectSchema({
    properties: {
        id: {
            type: coda.ValueType.String,
            required: true,
        },
        name: {
            type: coda.ValueType.String,
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
    },
    identity: {
        name: "Tag"
    },
    displayName: "Tag",
    idProperty: "id",
    displayProperty: "name",
    featuredProperties: ["name", "createdAt", "updatedAt"]
})