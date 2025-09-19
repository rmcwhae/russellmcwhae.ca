/// <reference types="@sveltejs/kit" />

declare module 'reading-time/lib/reading-time' {
    interface ReadTimeResults {
        text: string
        minutes: number
        time: number
        words: number
    }

    function readingTime(text: string): ReadTimeResults
    export = readingTime
}
