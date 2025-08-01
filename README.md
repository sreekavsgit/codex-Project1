# AI Dashboard App

This project is a simple Flask-based dashboard that aggregates information related to Artificial Intelligence:

- Top AI news stories from Hacker News
- Popular open-source AI repositories on GitHub
- Trending HuggingFace models
- Recently submitted AI papers on arXiv
- Most viewed AI videos on YouTube (requires a YouTube API key)

## Running locally

```bash
pip install -r requirements.txt
export YOUTUBE_API_KEY=YOUR_KEY  # optional
python app.py
```

Visit `http://localhost:8000` in your browser.

## Deploying

You can deploy this application to [Vercel](https://vercel.com/) easily:

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run `vercel` and follow the prompts to deploy.
3. Set the `YOUTUBE_API_KEY` environment variable in your Vercel dashboard if you want video data.

