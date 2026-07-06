from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    # 1. Visit the new Tier 1 blog post
    page.goto("http://localhost:3000/blog/ascii-art-guide")
    page.wait_for_timeout(1000)
    page.screenshot(path="verification/screenshots/blog_post.png")

    # 2. Visit a Tier 2 programmatic page to check FAQs
    page.goto("http://localhost:3000/generators/text-to-ascii")
    page.wait_for_timeout(1000)
    # Scroll to FAQ
    page.get_by_role("heading", name="Frequently Asked Questions").scroll_into_view_if_needed()
    page.wait_for_timeout(500)
    page.screenshot(path="verification/screenshots/programmatic_faq.png")

    # 3. Use the tool itself
    page.goto("http://localhost:3000/text-to-ascii")
    page.wait_for_timeout(1000)
    page.get_by_placeholder("Type something...").fill("Verified!")
    page.wait_for_timeout(1000)
    page.screenshot(path="verification/screenshots/tool_usage.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
