import * as coda from "@codahq/packs-sdk";


export const userSchema = coda.makeObjectSchema({
    properties: {
        id: {
            type: coda.ValueType.String,
            required: true,
            description: "The id of the user",
        },
        email: {    
            type: coda.ValueType.String,
            required: true,
            description: "The email of the user",
        },
        firstName: {
            type: coda.ValueType.String,
            description: "The first name of the user",
        },
        lastName: {
            type: coda.ValueType.String,
            description: "The last name of the user",
        },
        isPending: {
            type: coda.ValueType.Boolean,
            description: "Whether the user is pending",
        },
        createdAt: {
            type: coda.ValueType.String,
            description: "The date and time the user was created",
            codaType: coda.ValueHintType.DateTime,
        },
        updatedAt: {
            type: coda.ValueType.String,
            description: "The date and time the user was updated",
            codaType: coda.ValueHintType.DateTime,
        },
        role: {
            type: coda.ValueType.String,
            description: "The role of the user",
        }
    },
    identity: {
        name: "User"
    },
    displayName: "User",
    idProperty: "id",
    displayProperty: "email",
    featuredProperties: ["email", "firstName", "lastName", "isPending", "createdAt", "updatedAt"]
})