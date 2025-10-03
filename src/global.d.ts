/// <reference types="@sveltejs/kit" />

declare module 'reading-time/lib/reading-time' {
    interface ReadTimeResults {
        text: string
        minutes: number
        time: number
        words: number
    }

    // Keep the readingTime function signature
    // eslint-disable-next-line no-unused-vars
    function readingTime(text: string): ReadTimeResults
    export = readingTime
}
