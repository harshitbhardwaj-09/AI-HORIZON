# AI-Powered Comment Moderation using Gemini API

## Overview
This project implements a comment moderation system using Google's Gemini API. It analyzes user comments to determine whether they are positive or negative. Inappropriate comments (such as hate speech, cyberbullying, or explicit content) are automatically blocked and cannot be posted.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Machine Learning**: Hugging Face Transformers

## Features
- **Sentiment Analysis**: Classifies comments as positive or negative.
- **Content Filtering**: Blocks inappropriate or harmful comments.
- **Real-Time Moderation**: Prevents users from posting flagged content.
- **Ethical AI Use**: Ensures privacy and secure data handling.

## Setup
### Prerequisites
- Node.js installed (for backend integration)
- Google Gemini API key
- MongoDB setup
- Hugging Face Transformers library

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/comment-moderation.git
   cd comment-moderation
   ```
2. Install dependencies:
   ```sh
   npm install axios dotenv express mongoose @huggingface/transformers
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your API keys:
     ```sh
     GEMINI_API_KEY=your_api_key_here
     ```

## Usage
### Backend Implementation
Create a file `moderation.js` with the following:
```javascript
require('dotenv').config();
const axios = require('axios');
const { pipeline } = require('@huggingface/transformers');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const sentimentAnalyzer = pipeline('sentiment-analysis');

async function analyzeComment(comment) {
    try {
        const sentiment = await sentimentAnalyzer(comment);
        
        const response = await axios.post('https://api.google.com/gemini/v1/analyze', {
            comment: comment
        }, {
            headers: { 'Authorization': `Bearer ${GEMINI_API_KEY}` }
        });
        
        const result = response.data;
        return { ...result, sentiment: sentiment[0] };
    } catch (error) {
        console.error('Error analyzing comment:', error);
        return { error: 'Failed to analyze comment' };
    }
}

module.exports = { analyzeComment };
```

### Integrating with an API
In `server.js`:
```javascript
const express = require('express');
const mongoose = require('mongoose');
const { analyzeComment } = require('./moderation');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/commentModeration', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.post('/moderate', async (req, res) => {
    const { comment } = req.body;
    const analysis = await analyzeComment(comment);
    
    if (analysis.error) {
        return res.status(500).json({ message: 'Error analyzing comment' });
    }
    
    if (analysis.inappropriate) {
        return res.status(403).json({ message: 'Comment blocked due to inappropriate content.' });
    }
    
    res.json({ sentiment: analysis.sentiment, message: 'Comment approved.' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

## Testing
Start the server:
```sh
node server.js
```
Send a POST request to `http://localhost:3000/moderate` with JSON body:
```json
{
  "comment": "I hate this platform!"
}
```
The API will respond with whether the comment is positive or negative and block inappropriate ones.

## License
MIT License

