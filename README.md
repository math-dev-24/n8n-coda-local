# Coda Pack - n8n Integration

A Coda Pack that allows you to trigger n8n workflows directly from your Coda documents. This pack provides seamless integration between Coda and n8n, enabling you to automate workflows and manage executions from within your Coda workspace.

## 🚀 Features

- **Trigger Workflows**: Execute n8n workflows with custom HTTP methods and data payloads
- **Test Mode Support**: Test workflows before production execution
- **JSON Generation**: Helper function to generate JSON objects from Coda lists
- **Flexible Data Handling**: Support for various HTTP methods and data formats
- **Error Handling**: Comprehensive error handling and user feedback

## 📋 Prerequisites

- A running n8n instance
- Coda account with Pack access
- n8n webhook endpoints configured

## 🛠️ Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd coda-n8n
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Build the pack**:
   ```bash
   npm run build
   ```

4. **Deploy to Coda**:
   - Follow the [Coda Pack deployment guide](https://coda.io/packs/build/latest/)
   - Use the Coda CLI to deploy your pack

## 📖 Usage

### TriggerWorkflow Formula

Triggers an n8n workflow with specified parameters.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `baseUrl` | String | Yes | Your n8n instance base URL (e.g., `https://your-n8n-instance.com`) |
| `workflowId` | String | Yes | The ID of the workflow to trigger |
| `method` | String | No | HTTP method to use (GET, POST, PUT, DELETE, PATCH, HEAD). Default: GET |
| `data` | String Array | No | JSON data to send to the workflow |
| `testMode` | Boolean | No | If true, triggers workflow in test mode. Default: false |

#### Return Value

Returns an object with:
- `success`: Boolean indicating if the operation was successful
- `message`: Status message
- `executionId`: The ID of the workflow execution

#### Example Usage

```javascript
// Basic workflow trigger
TriggerWorkflow("https://my-n8n.com", "workflow-123")

// Trigger with POST method and data
TriggerWorkflow(
  "https://my-n8n.com", 
  "workflow-123", 
  "POST", 
  ["{\"name\": \"John\", \"email\": \"john@example.com\"}"], 
  false
)

// Test mode trigger
TriggerWorkflow("https://my-n8n.com", "workflow-123", "GET", [], true)
```

### generateJson Formula

Generates a JSON object from Coda list data.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `keys` | String Array | Yes | The keys for each object in the items array |
| `values` | String Array | Yes | The values for each object in the items array |

#### Return Value

Returns a JSON string representation of the object.

#### Example Usage

```javascript
// Generate JSON from Coda columns
generateJson(
  ["name", "email", "age"], 
  ["John Doe", "john@example.com", "30"]
)
// Returns: {"name":"John Doe","email":"john@example.com","age":"30"}
```

## 🔧 Configuration

### n8n Setup

1. **Configure Webhooks**: Ensure your n8n workflows have webhook nodes configured
2. **Get Workflow IDs**: Note the webhook URLs or workflow IDs you want to trigger
3. **Test Endpoints**: Verify your webhook endpoints are accessible

### Coda Setup

1. **Install the Pack**: Add the pack to your Coda workspace
2. **Configure Authentication**: Set up any required authentication tokens
3. **Test Integration**: Use the test mode to verify connections

## 📁 Project Structure

```
coda-n8n/
├── pack.ts              # Main pack configuration and formulas
├── services/
│   ├── index.ts         # Service exports
│   ├── n8n.ts          # n8n API service
│   └── fetch.ts        # HTTP request handling
├── types/
│   ├── index.ts        # Type exports
│   ├── n8n.ts          # n8n-specific types
│   └── request.ts      # Request/response types
├── utils/
│   ├── index.ts        # Utility exports
│   └── url.ts          # URL handling utilities
└── package.json        # Dependencies and scripts
```

## 🔌 API Reference

### N8nService Class

The main service class for interacting with n8n.

#### Constructor
```typescript
constructor(baseUrl: string)
```

#### Methods

##### triggerWorkflow
```typescript
async triggerWorkflow(
  id: string,
  method: Method = 'GET',
  data: any[],
  testMode: boolean,
  context: coda.ExecutionContext
): Promise<any>
```

Triggers an n8n workflow with the specified parameters.

### Types

#### Workflow Interface
```typescript
interface Workflow {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  nodes: any[];
  connections: any;
  settings?: any;
}
```

#### Execution Interface
```typescript
interface Execution {
  id: string;
  workflowId: string;
  status: string;
  startedAt: string;
  stoppedAt?: string;
  data: any;
}
```

## 🚨 Error Handling

The pack includes comprehensive error handling:

- **Validation Errors**: Ensures required parameters are provided
- **Network Errors**: Handles connection issues with n8n instances
- **Authentication Errors**: Manages authentication failures
- **User-Friendly Messages**: Provides clear error messages to users

## 🔒 Security

- **HTTPS Only**: All connections to n8n instances must use HTTPS
- **Token Authentication**: Supports Bearer token authentication
- **Input Validation**: Validates all user inputs before processing
- **Error Sanitization**: Prevents sensitive information leakage in error messages

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint
```

## 📝 Development

### Adding New Features

1. **Create Types**: Add new interfaces in `types/` directory
2. **Implement Services**: Add business logic in `services/` directory
3. **Add Formulas**: Create new formulas in `pack.ts`
4. **Update Tests**: Add corresponding test cases
5. **Update Documentation**: Keep this README up to date

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Add JSDoc comments for public APIs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

ISC License - see LICENSE file for details

## 👨‍💻 Author

B. Mathieu

## 🔗 Links

- [Coda Packs Documentation](https://coda.io/packs/build/latest/)
- [n8n Documentation](https://docs.n8n.io/)
- [Coda Authentication Guide](https://coda.io/packs/build/latest/guides/basics/authentication/#simple-tokens)

## 🆘 Support

For issues and questions:
1. Check the [Coda Packs documentation](https://coda.io/packs/build/latest/)
2. Review n8n webhook configuration
3. Verify network connectivity to your n8n instance
4. Check authentication tokens and permissions
