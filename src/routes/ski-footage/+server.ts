import { redirect } from '@sveltejs/kit'

export const prerender = true

// Retired route: adapter-vercel serves prerendered redirects as edge 308s
export function GET() {
    redirect(308, '/photography')
}
