# Multi-Language Documentation Site with ISR and i18n

This is a Next.js application that provides a high-performance, multi-language documentation portal with Incremental Static Regeneration (ISR), internationalization (i18n), and various features like search, theme switching, and API reference.

## Features

- Multi-language support (English, Spanish, French, German)
- Incremental Static Regeneration for fast content updates
- Dark/Light theme switching
- Full-text search
- Table of Contents with active section highlighting
- Code blocks with copy-to-clipboard functionality
- Feedback widget
- API reference with Swagger UI
- Version selector for documentation versions
- Collapsible sidebar navigation
- Docker containerization

## Setup

### Prerequisites

- Node.js 18+
- Docker and Docker Compose

### Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

### Docker

1. Build and run with Docker Compose: `docker-compose up --build`
2. The application will be available at [http://localhost:3000](http://localhost:3000)

## Architecture

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Internationalization**: next-i18next
- **Search**: FlexSearch
- **API Documentation**: Swagger UI
- **Theme**: next-themes
- **Markdown Processing**: remark, gray-matter

## Project Structure

- `src/app/`: Next.js app directory with pages and layouts
- `src/components/`: Reusable React components
- `public/locales/`: Translation files
- `_docs/`: Markdown documentation files
- `public/openapi.json`: OpenAPI specification

## Environment Variables

Copy `.env.example` to `.env` and configure as needed.

## Deployment

The application is containerized with Docker. Use `docker-compose.yml` for deployment.

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation as needed