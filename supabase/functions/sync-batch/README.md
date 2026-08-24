# Sync Batch Function

Edge function for handling batch synchronization of offline operations.

## Deployment

```bash
# Deploy to production
supabase functions deploy sync-batch

# Test locally
supabase functions serve sync-batch
```

## Usage

The function accepts POST requests with the following payload:

```json
{
  "operations": [
    {
      "id": "unique_operation_id",
      "operation": "insert|update|delete",
      "table": "table_name",
      "data": { ... },
      "timestamp": 1234567890
    }
  ],
  "clientId": "user_or_device_id"
}
```

Returns:

```json
{
  "success": true,
  "results": [
    {
      "success": true,
      "operationId": "unique_operation_id",
      "serverData": { ... }
    }
  ],
  "serverTime": "2024-01-01T00:00:00Z"
}
```

## Environment Variables

- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for full database access
