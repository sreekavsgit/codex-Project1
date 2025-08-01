import os
import requests
from flask import Flask, render_template
import xml.etree.ElementTree as ET

app = Flask(__name__)

HNEWS_URL = "https://hn.algolia.com/api/v1/search"
GITHUB_URL = "https://api.github.com/search/repositories"
HFACE_URL = "https://huggingface.co/api/models"
ARXIV_URL = "https://export.arxiv.org/api/query"
YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"


def fetch_hn_news():
    params = {
        "query": "AI",
        "tags": "story",
        "hitsPerPage": 5,
    }
    try:
        r = requests.get(HNEWS_URL, params=params, timeout=10)
        r.raise_for_status()
        return r.json().get("hits", [])
    except Exception:
        return []


def fetch_github_repos():
    params = {
        "q": "topic:ai",
        "order": "desc",
        "per_page": 5,
    }
    try:
        r = requests.get(GITHUB_URL, params=params, timeout=10)
        r.raise_for_status()
        return r.json().get("items", [])
    except Exception:
        return []


def fetch_huggingface_models():
    params = {
        "limit": 5,
        "sort": "downloads",
    }
    main
    try:
        r = requests.get(HFACE_URL, params=params, timeout=10)
        r.raise_for_status()
        return r.json()
    except Exception:
        return []


def fetch_arxiv_papers():
    params = {
        "search_query": "all:artificial intelligence",
        "start": 0,
        "max_results": 5,
        "sortBy": "submittedDate",
        "sortOrder": "descending",
    }
    try:
        r = requests.get(ARXIV_URL, params=params, timeout=10)
        r.raise_for_status()
        root = ET.fromstring(r.text)
        ns = {"atom": "http://www.w3.org/2005/Atom"}
        entries = []
        for entry in root.findall("atom:entry", ns):
            title = entry.find("atom:title", ns).text
            link = entry.find("atom:link", ns).attrib.get("href")
            entries.append({"title": title, "url": link})
        return entries
    except Exception:
        return []


def fetch_youtube_videos():
    api_key = os.environ.get("YOUTUBE_API_KEY")
    if not api_key:
        return []
    params = {
        "part": "snippet",
        "q": "AI",
        "type": "video",
        "order": "viewCount",
        "maxResults": 5,
        "key": api_key,
    }
    try:
        r = requests.get(YOUTUBE_SEARCH_URL, params=params, timeout=10)
        r.raise_for_status()
        items = r.json().get("items", [])
        results = []
        for item in items:
            video_id = item["id"]["videoId"]
            title = item["snippet"]["title"]
            url = f"https://www.youtube.com/watch?v={video_id}"
            results.append({"title": title, "url": url})
        return results
    except Exception:
        return []


@app.route("/")
def index():
    news = fetch_hn_news()
    repos = fetch_github_repos()
    models = fetch_huggingface_models()
    papers = fetch_arxiv_papers()
    videos = fetch_youtube_videos()
    return render_template(
        "index.html",
        news=news,
        repos=repos,
        models=models,
        papers=papers,
        videos=videos,
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
