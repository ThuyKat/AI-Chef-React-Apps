# Chef Claude AI Recipe Assistant

An AI-powered recipe recommendation app that suggests recipes based on ingredients you have available. Built with React and Anthropic's Claude AI.

## Features

- Input ingredients you have on hand
- Get personalized recipe recommendations
- AI-generated recipes tailored to your ingredients
- Responsive web interface

## Tech Stack

- Frontend: React
- Backend: Netlify Functions (Serverless)
- AI: Anthropic's Claude API
- Deployment: Netlify

## Prerequisites

- Node.js installed
- Anthropic API key
- Netlify account

## Installation

1. Clone the repository
```bash
git clone [your-repo-url]
cd [your-project-name]
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Anthropic API key:
```
ANTHROPIC_API_KEY=your_api_key_here
```

4. Install Netlify CLI (optional, for local development)
```bash
npm install netlify-cli -D
```

## Development

Run the development server:
```bash
npm run dev
```

## Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to Netlify:
```bash
npx netlify deploy --prod
```

Make sure to set up your environment variables in Netlify:
- Go to Site settings > Environment variables
- Add `ANTHROPIC_API_KEY` with your Anthropic API key

## Project Structure

```
/
├── components/            # React components
├── images/               # Image assets
├── netlify/
│   └── functions/       # Serverless functions
│       └── get-recipe.js # Recipe generation function
├── index.html
├── netlify.toml         # Netlify configuration
└── package.json         # Project dependencies
```

## API Documentation

### Recipe Generation Endpoint

```javascript
POST /.netlify/functions/get-recipe

// Request body
{
  "ingredients": ["ingredient1", "ingredient2", ...]
}

// Response
{
  "recipe": "AI-generated recipe in markdown format"
}
```

## Environment Variables

- `ANTHROPIC_API_KEY`: Your Anthropic API key (required)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- Anthropic for the Claude AI API
- Netlify for hosting and serverless functions