# API Documentation

## Town Hall Backend - REST API Reference

**Base URLs:**
- Development: `http://localhost:3001/api`
- Production: `https://api.townhallnewark.org/api`

**Current Version:** 1.0.0  
**Last Updated:** December 8, 2025

---

## Table of Contents

1. [Authentication](#authentication)
2. [Events API](#events-api)
3. [Blog API](#blog-api)
4. [Vlogs API](#vlogs-api)
5. [Volunteer API](#volunteer-api)
6. [Contact API](#contact-api)
7. [AI API](#ai-api)
8. [Webhooks API](#webhooks-api)
9. [Health Check](#health-check)
10. [Error Handling](#error-handling)
11. [Rate Limiting](#rate-limiting)

---

## Authentication

Most endpoints are **public** and do not require authentication. Webhook endpoints require signature verification.

**Webhook Authentication:**
```http
X-Webhook-Signature: sha256=<hmac_signature>
```

---

## Events API

### List All Events

**Endpoint:** `GET /api/events`

**Description:** Retrieve all published events, sorted by date.

**Query Parameters:**
- `status` (optional): Filter by status (`published`, `draft`, `cancelled`, `completed`)
- `limit` (optional): Number of results (default: 50)

**Request:**
```bash
curl http://localhost:3001/api/events
```

**Response:** `200 OK`
```json
{
  "events": [
    {
      "_id": "event-123",
      "title": "AI Workshop: Getting Started with ChatGPT",
      "slug": "ai-workshop-chatgpt",
      "description": "Learn the fundamentals of ChatGPT...",
      "whatYouWillLearn": [
        "Prompt engineering basics",
        "Real-world AI applications",
        "Ethical considerations"
      ],
      "location": "Newark Public Library",
      "dateTime": "2025-12-15T18:00:00.000Z",
      "registrationDeadline": "2025-12-14T23:59:59.000Z",
      "maxAttendees": 30,
      "currentAttendees": 12,
      "status": "published",
      "registrationUrl": "/api/events/ai-workshop-chatgpt/register"
    }
  ]
}
```

---

### Get Single Event

**Endpoint:** `GET /api/events/:slug`

**Description:** Retrieve detailed information about a specific event.

**Parameters:**
- `slug` (path): Event slug identifier

**Request:**
```bash
curl http://localhost:3001/api/events/ai-workshop-chatgpt
```

**Response:** `200 OK`
```json
{
  "event": {
    "_id": "event-123",
    "title": "AI Workshop: Getting Started with ChatGPT",
    "slug": "ai-workshop-chatgpt",
    "description": "Learn the fundamentals of ChatGPT and how to use it effectively in your daily work...",
    "whatYouWillLearn": [
      "Prompt engineering basics",
      "Real-world AI applications",
      "Ethical considerations"
    ],
    "location": "Newark Public Library, Main Branch",
    "dateTime": "2025-12-15T18:00:00.000Z",
    "registrationDeadline": "2025-12-14T23:59:59.000Z",
    "maxAttendees": 30,
    "currentAttendees": 12,
    "status": "published",
    "registrationUrl": "/api/events/ai-workshop-chatgpt/register",
    "_createdAt": "2025-11-01T10:00:00.000Z",
    "_updatedAt": "2025-12-01T15:30:00.000Z"
  }
}
```

**Error Responses:**
- `404 Not Found`: Event not found
```json
{
  "error": "Event not found"
}
```

---

### Register for Event

**Endpoint:** `POST /api/events/:slug/register`

**Description:** Register a participant for an event. Automatically creates HubSpot contact and sends confirmation email.

**Parameters:**
- `slug` (path): Event slug identifier

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "phone": "+1-555-123-4567"
}
```

**Request:**
```bash
curl -X POST http://localhost:3001/api/events/ai-workshop-chatgpt/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "phone": "+1-555-123-4567"
  }'
```

**Response:** `201 Created`
```json
{
  "success": true,
  "registration": {
    "_id": "registration-456",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "phone": "+1-555-123-4567",
    "event": {
      "_ref": "event-123"
    },
    "registeredAt": "2025-12-08T12:00:00.000Z",
    "confirmationSent": true,
    "hubspotContactId": "344951768823"
  }
}
```

**Error Responses:**

`400 Bad Request` - Missing fields:
```json
{
  "error": "Missing required fields: firstName, lastName, email"
}
```

`404 Not Found` - Event not found:
```json
{
  "error": "Event not found"
}
```

`409 Conflict` - Already registered:
```json
{
  "error": "User already registered for this event"
}
```

`410 Gone` - Registration closed:
```json
{
  "error": "Registration deadline has passed"
}
```

---

## Blog API

### List All Blog Posts

**Endpoint:** `GET /api/blog`

**Description:** Retrieve all published blog posts, sorted by date (newest first).

**Query Parameters:**
- `status` (optional): Filter by status (`published`, `draft`, `ready`)
- `tag` (optional): Filter by tag
- `limit` (optional): Number of results (default: 20)

**Request:**
```bash
curl http://localhost:3001/api/blog?tag=AI&limit=10
```

**Response:** `200 OK`
```json
{
  "posts": [
    {
      "_id": "post-789",
      "title": "The Future of AI in Newark",
      "slug": "future-of-ai-newark",
      "excerpt": "How artificial intelligence is transforming our community...",
      "author": {
        "name": "John Smith",
        "role": "staff"
      },
      "publishedAt": "2025-12-01T10:00:00.000Z",
      "status": "published",
      "tags": ["AI", "Community", "Technology"],
      "readTime": "5 min",
      "featuredImage": {
        "url": "https://cdn.sanity.io/images/.../image.jpg"
      }
    }
  ]
}
```

---

### Get Single Blog Post

**Endpoint:** `GET /api/blog/:slug`

**Description:** Retrieve full blog post content.

**Parameters:**
- `slug` (path): Blog post slug identifier

**Request:**
```bash
curl http://localhost:3001/api/blog/future-of-ai-newark
```

**Response:** `200 OK`
```json
{
  "post": {
    "_id": "post-789",
    "title": "The Future of AI in Newark",
    "slug": "future-of-ai-newark",
    "excerpt": "How artificial intelligence is transforming our community...",
    "content": [
      {
        "_type": "block",
        "children": [
          {
            "_type": "span",
            "text": "Artificial intelligence is rapidly changing..."
          }
        ]
      }
    ],
    "author": {
      "name": "John Smith",
      "bio": "Community organizer and AI enthusiast",
      "role": "staff"
    },
    "publishedAt": "2025-12-01T10:00:00.000Z",
    "status": "published",
    "tags": ["AI", "Community", "Technology"],
    "readTime": "5 min",
    "featuredImage": {
      "url": "https://cdn.sanity.io/images/.../image.jpg",
      "alt": "AI visualization"
    }
  }
}
```

**Error Responses:**
- `404 Not Found`: Blog post not found

---

## Vlogs API

### List All Vlogs

**Endpoint:** `GET /api/vlogs`

**Description:** Retrieve all published video blog posts.

**Request:**
```bash
curl http://localhost:3001/api/vlogs
```

**Response:** `200 OK`
```json
{
  "vlogs": [
    {
      "_id": "vlog-321",
      "title": "Community AI Showcase 2025",
      "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "summary": "Highlights from our annual AI showcase event...",
      "publishedAt": "2025-11-20T10:00:00.000Z",
      "duration": "15:30"
    }
  ]
}
```

---

## Volunteer API

### Submit Volunteer Application

**Endpoint:** `POST /api/volunteer`

**Description:** Submit a volunteer application. Automatically creates HubSpot contact and sends confirmation email.

**Request Body:**
```json
{
  "firstName": "Alex",
  "lastName": "Johnson",
  "email": "alex.johnson@example.com",
  "phone": "+1-555-987-6543",
  "interest": "Event Coordination",
  "availability": "Weekends",
  "experience": "Organized community events for 3 years",
  "motivation": "Want to help bring AI education to Newark"
}
```

**Request:**
```bash
curl -X POST http://localhost:3001/api/volunteer \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alex",
    "lastName": "Johnson",
    "email": "alex.johnson@example.com",
    "interest": "Event Coordination"
  }'
```

**Response:** `201 Created`
```json
{
  "success": true,
  "volunteer": {
    "_id": "volunteer-654",
    "firstName": "Alex",
    "lastName": "Johnson",
    "email": "alex.johnson@example.com",
    "phone": "+1-555-987-6543",
    "interest": "Event Coordination",
    "availability": "Weekends",
    "experience": "Organized community events for 3 years",
    "motivation": "Want to help bring AI education to Newark",
    "status": "pending",
    "hubspotContactId": "344951768824"
  }
}
```

**Error Responses:**

`400 Bad Request` - Missing required fields:
```json
{
  "error": "Missing required fields: firstName, lastName, email, interest, motivation"
}
```

`409 Conflict` - Already applied:
```json
{
  "error": "Volunteer application already exists for this email"
}
```

---

## Contact API

### Submit Contact Form

**Endpoint:** `POST /api/contact`

**Description:** Submit a general contact/inquiry form. Sends notification email to admin.

**Request Body:**
```json
{
  "name": "Sarah Williams",
  "email": "sarah@example.com",
  "subject": "Partnership Inquiry",
  "message": "I'm interested in partnering with Town Hall for an AI workshop series..."
}
```

**Request:**
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sarah Williams",
    "email": "sarah@example.com",
    "subject": "Partnership Inquiry",
    "message": "I am interested in partnering..."
  }'
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Contact form submitted successfully"
}
```

**Error Responses:**

`400 Bad Request` - Missing fields:
```json
{
  "error": "Missing required fields: name, email, message"
}
```

---

## AI API

**Note:** Requires `OPENAI_API_KEY` environment variable.

### Transcribe Event Audio

**Endpoint:** `POST /api/ai/transcribe-event`

**Description:** Upload event audio/video and generate a blog post draft. Uses OpenAI Whisper for transcription and GPT-4o-mini for content generation.

**Content-Type:** `multipart/form-data`

**Form Fields:**
- `audio` (file): Audio/video file (.mp3, .mp4, .wav, .webm) - Max 25MB
- `eventTitle` (string): Event title
- `shouldPublish` (boolean, optional): Whether to save as draft in Sanity (default: false)

**Request:**
```bash
curl -X POST http://localhost:3001/api/ai/transcribe-event \
  -F "audio=@event-recording.mp3" \
  -F "eventTitle=AI Workshop Recording"
```

**Response:** `200 OK`
```json
{
  "success": true,
  "transcript": "Welcome everyone to today's AI workshop...",
  "blogPost": {
    "title": "Key Insights from Our AI Workshop",
    "excerpt": "Discover the main takeaways from our recent workshop on AI fundamentals...",
    "content": "# Introduction\n\nToday's workshop covered...",
    "tags": ["AI", "Workshop", "Education"],
    "readTime": "8 min"
  },
  "sanityDraft": {
    "_id": "draft-post-999",
    "status": "draft"
  }
}
```

**Error Responses:**

`400 Bad Request` - Missing file:
```json
{
  "error": "No audio file uploaded"
}
```

`413 Payload Too Large` - File too large:
```json
{
  "error": "File size exceeds 25MB limit"
}
```

---

### Generate Workshop Outline

**Endpoint:** `POST /api/ai/generate-outline`

**Description:** Generate a structured workshop outline using AI.

**Request Body:**
```json
{
  "topic": "Introduction to Machine Learning",
  "duration": "2 hours",
  "audienceLevel": "beginner"
}
```

**Request:**
```bash
curl -X POST http://localhost:3001/api/ai/generate-outline \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Introduction to Machine Learning",
    "duration": "2 hours",
    "audienceLevel": "beginner"
  }'
```

**Response:** `200 OK`
```json
{
  "success": true,
  "outline": {
    "title": "Introduction to Machine Learning",
    "duration": "2 hours",
    "audienceLevel": "beginner",
    "introduction": {
      "overview": "This workshop introduces the fundamentals...",
      "objectives": [
        "Understand what machine learning is",
        "Learn basic ML algorithms",
        "Apply ML to real-world problems"
      ]
    },
    "sections": [
      {
        "title": "What is Machine Learning?",
        "duration": "20 minutes",
        "keyPoints": [
          "Definition and types of ML",
          "Supervised vs unsupervised learning",
          "Real-world applications"
        ],
        "activities": "Group discussion on ML examples"
      }
    ],
    "conclusion": {
      "summary": "We've covered the basics of machine learning...",
      "nextSteps": [
        "Practice with online tutorials",
        "Join our advanced workshop next month"
      ]
    },
    "qAndA": {
      "duration": "15 minutes",
      "suggestedQuestions": [
        "What skills do I need to start learning ML?",
        "What are the best resources for beginners?"
      ]
    }
  }
}
```

**Error Responses:**

`400 Bad Request` - Missing fields:
```json
{
  "error": "Missing required fields: topic, duration, audienceLevel"
}
```

---

### Generate Event Flyer

**Endpoint:** `POST /api/ai/generate-flyer`

**Description:** Generate an event flyer image using DALL-E 3.

**Request Body:**
```json
{
  "eventTitle": "AI Workshop: ChatGPT Basics",
  "eventDate": "December 15, 2025",
  "eventTime": "6:00 PM - 8:00 PM",
  "location": "Newark Public Library",
  "description": "Learn how to use ChatGPT effectively"
}
```

**Request:**
```bash
curl -X POST http://localhost:3001/api/ai/generate-flyer \
  -H "Content-Type: application/json" \
  -d '{
    "eventTitle": "AI Workshop: ChatGPT Basics",
    "eventDate": "December 15, 2025",
    "eventTime": "6:00 PM - 8:00 PM",
    "location": "Newark Public Library"
  }'
```

**Response:** `200 OK`
```json
{
  "success": true,
  "imageUrl": "https://oaidalleapiprodscus.blob.core.windows.net/private/...",
  "revisedPrompt": "A professional event flyer for 'AI Workshop: ChatGPT Basics' featuring modern geometric designs..."
}
```

**Error Responses:**

`400 Bad Request` - Missing fields:
```json
{
  "error": "Missing required fields: eventTitle, eventDate, eventTime, location"
}
```

---

## Webhooks API

### Volunteer Approved Webhook

**Endpoint:** `POST /api/webhooks/volunteer-approved`

**Description:** Webhook for volunteer approval notifications. Sends welcome email to approved volunteer.

**Authentication:** HMAC signature verification required.

**Headers:**
```
X-Webhook-Signature: sha256=<hmac_signature>
Content-Type: application/json
```

**Request Body:**
```json
{
  "volunteerId": "volunteer-654",
  "email": "alex.johnson@example.com",
  "firstName": "Alex",
  "approvedAt": "2025-12-08T15:00:00.000Z"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Volunteer approved notification sent"
}
```

---

### Event Published Webhook

**Endpoint:** `POST /api/webhooks/event-published`

**Description:** Webhook for new event publication. Sends notifications via email/Discord.

**Request Body:**
```json
{
  "eventId": "event-123",
  "title": "AI Workshop: ChatGPT Basics",
  "dateTime": "2025-12-15T18:00:00.000Z",
  "registrationUrl": "https://townhallnewark.org/events/ai-workshop-chatgpt"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Event published notification sent"
}
```

---

### Content Published Webhook

**Endpoint:** `POST /api/webhooks/content-published`

**Description:** Webhook for new blog/vlog publication.

**Request Body:**
```json
{
  "contentType": "blog",
  "contentId": "post-789",
  "title": "The Future of AI in Newark",
  "url": "https://townhallnewark.org/blog/future-of-ai-newark"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Content published notification sent"
}
```

---

## Health Check

### Check API Health

**Endpoint:** `GET /api/health`

**Description:** Check API and service connectivity status.

**Request:**
```bash
curl http://localhost:3001/api/health
```

**Response:** `200 OK` (Healthy)
```json
{
  "status": "healthy",
  "timestamp": "2025-12-08T12:00:00.000Z",
  "sanity": {
    "connected": true,
    "projectId": "pvm742xo"
  },
  "environment": "production",
  "uptime": 3600
}
```

**Response:** `503 Service Unavailable` (Unhealthy)
```json
{
  "status": "unhealthy",
  "timestamp": "2025-12-08T12:00:00.000Z",
  "sanity": {
    "connected": false,
    "error": "Failed to connect to Sanity"
  },
  "environment": "production"
}
```

---

## Error Handling

### Standard Error Response Format

All errors follow this structure:

```json
{
  "error": "Error message describing what went wrong",
  "details": "Additional context (optional)"
}
```

### HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful request |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid input or missing fields |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Duplicate resource (e.g., already registered) |
| 410 | Gone | Resource no longer available (e.g., registration closed) |
| 413 | Payload Too Large | File upload exceeds size limit |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side error |
| 503 | Service Unavailable | Service temporarily down |

### Common Error Scenarios

**Validation Errors (400):**
```json
{
  "error": "Missing required fields: firstName, lastName, email"
}
```

**Resource Not Found (404):**
```json
{
  "error": "Event not found"
}
```

**Rate Limit Exceeded (429):**
```json
{
  "error": "Too many requests. Please try again later.",
  "retryAfter": 60
}
```

---

## Rate Limiting

**Default Limits:**
- 100 requests per minute per IP address
- Configurable via `RATE_LIMIT_WINDOW_MS` and `RATE_LIMIT_MAX_REQUESTS`

**Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1702042800
```

**When Rate Limited:**
```
HTTP/1.1 429 Too Many Requests
Retry-After: 60

{
  "error": "Too many requests. Please try again later.",
  "retryAfter": 60
}
```

---

## CORS Configuration

**Allowed Origins:**
- `http://localhost:3000` (development)
- `https://townhallnewark.org` (production)
- Configurable via `FRONTEND_URL` environment variable

**Allowed Methods:**
- GET, POST, PUT, DELETE, OPTIONS

**Allowed Headers:**
- Content-Type, Authorization, X-Webhook-Signature

---

## Testing API Endpoints

### Using cURL

```bash
# Get events
curl http://localhost:3001/api/events

# Register for event
curl -X POST http://localhost:3001/api/events/ai-workshop/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jane","lastName":"Doe","email":"jane@example.com"}'

# Upload audio for transcription
curl -X POST http://localhost:3001/api/ai/transcribe-event \
  -F "audio=@recording.mp3" \
  -F "eventTitle=Workshop Recording"
```

### Using Postman

1. Import the API collection (future: provide postman_collection.json)
2. Set environment variables:
   - `baseUrl`: `http://localhost:3001/api`
3. Test endpoints with sample data

### Using JavaScript/Fetch

```javascript
// Get events
const response = await fetch('http://localhost:3001/api/events');
const data = await response.json();

// Register for event
const registration = await fetch('http://localhost:3001/api/events/ai-workshop/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com'
  })
});
```

---

## Versioning

**Current Version:** 1.0.0

Future API versions will be accessible via URL path:
- `/api/v1/events`
- `/api/v2/events`

Version 1.0 (current) is unversioned for backwards compatibility.

---

## Support

For API issues or questions:
- GitHub Issues: [Town Hall Repository](https://github.com/jam398/Town-hall)
- Email: hello@townhallnewark.org
- Documentation: `townhall-backend/docs/`

**Related Documentation:**
- [Architecture Overview](./ARCHITECTURE.md)
- [Docker Setup](./DOCKER.md)
- [Testing Guide](./TESTING.md)
- [Environment Variables](./ENV_VARIABLES.md)
