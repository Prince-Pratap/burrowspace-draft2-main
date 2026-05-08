# Cloudflare Deployment Guide

## Overview
This BurrowSpace website now uses Cloudflare KV storage for persistent data management. Users can save FAQ and About page content in JSON format on Cloudflare.

## Features
- ✅ **Persistent Data Storage**: FAQ and About data stored in Cloudflare KV
- ✅ **Admin Panel**: Manage content at `/admin` route
- ✅ **API Testing**: Test endpoints at `/api-test` route
- ✅ **Mobile Responsive**: Optimized for Android and mobile devices
- ✅ **Search Functionality**: Real-time FAQ search with categories

## Cloudflare Setup

### 1. Create KV Namespaces
```bash
# Create FAQ data namespace
npx wrangler kv:namespace create "FAQS_KV"
# Note the namespace ID (e.g., faqs_data_abc123)

# Create About data namespace
npx wrangler kv:namespace create "ABOUT_KV"
# Note the namespace ID (e.g., about_data_def456)
```

### 2. Update wrangler.jsonc
Replace the placeholder IDs in `wrangler.jsonc`:
```json
{
  "kv_namespaces": [
    {
      "binding": "FAQS_KV",
      "id": "YOUR_FAQS_NAMESPACE_ID",
      "preview_id": "YOUR_FAQS_NAMESPACE_ID"
    },
    {
      "binding": "ABOUT_KV",
      "id": "YOUR_ABOUT_NAMESPACE_ID",
      "preview_id": "YOUR_ABOUT_NAMESPACE_ID"
    }
  ]
}
```

### 3. Deploy to Cloudflare
```bash
# Deploy to production
npx wrangler deploy

# Or deploy to preview environment
npx wrangler deploy --env preview
```

## Usage

### Admin Panel
- Visit `https://your-domain.com/admin`
- **Manage FAQs**: Add, edit, delete FAQ items with categories
- **Manage About**: Add, edit About page sections
- **Save Changes**: Click "Save" buttons to persist to Cloudflare KV

### API Endpoints
The following server functions are available:
- `fetchAllFaqsFn()` - Get all FAQs
- `searchFaqsFn({ query, category })` - Search FAQs
- `saveFaqsFn(faqs)` - Save FAQ data
- `saveAboutFn(about)` - Save About data

### Data Structure

#### FAQ Data (JSON)
```json
[
  {
    "q": "What is BurrowSpace?",
    "a": "BurrowSpace is a secure platform...",
    "category": "General"
  }
]
```

#### About Data (JSON)
```json
{
  "sections": [
    {
      "title": "Our Mission",
      "label": "mission",
      "content": "To provide secure solutions..."
    }
  ],
  "founders": []
}
```

## Development

### Local Development
```bash
npm run dev
```

### Testing APIs
Visit `http://localhost:8080/api-test` to test all API endpoints.

### Building
```bash
npm run build
```

## Environment Variables
No additional environment variables needed. KV bindings are configured in `wrangler.jsonc`.

## Security Notes
- Admin panel is publicly accessible - consider adding authentication for production
- KV storage is fast but has rate limits
- Data is stored as JSON strings in KV

## Troubleshooting

### KV Not Working Locally
During development, the app falls back to default data since KV is only available in Cloudflare Workers environment.

### Build Errors
Make sure all imports are correct and TanStack Start server functions are properly configured.

### Data Not Saving
Check that KV namespaces are properly created and bound in `wrangler.jsonc`.