import { redirect } from '@sveltejs/kit'

export const prerender = true

// Retired route: prerendered as a static 308
export function GET() {
    redirect(308, '/photography')
}
