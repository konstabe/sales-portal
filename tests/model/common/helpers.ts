import { Page } from "@playwright/test";

export async function waitForResponseJson<T = any>(
    page: Page,
    options: {
        url: string | RegExp;
        method?: "POST" | "GET";
        timeout?: number;
    }
): Promise<T | null> {
    const { url, method = "POST", timeout = 5000} = options;

    try {
        const response = await page.waitForResponse(
            (res) => {
                const request = res.request();
                const urlMatch =
                    typeof url === "string" ? res.url().includes(url) : url.test(res.url());
                const methodMatch = !method || request.method().toUpperCase() === method.toUpperCase();
                return urlMatch && methodMatch;
            },
            { timeout }
        );

        try {
            return await response.json();
        } catch {
            return null;
        }
    } catch {
        return null;
    }
}


