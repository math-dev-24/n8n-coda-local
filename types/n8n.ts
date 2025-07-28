export interface Workflow {
    id: string;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    nodes: any[];
    connections: any;
    settings?: any;
}

export interface Execution {
    id: string;
    workflowId: string;
    status: string;
    startedAt: string;
    stoppedAt?: string;
    data: any;
}
