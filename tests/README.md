# Playwright Tests

This directory contains end-to-end tests for the Russell McWhae portfolio website using Playwright.

## Test Structure

- `01-basics.spec.ts` - Basic navigation and page loading tests
- `02-color-scheme.spec.ts` - Color scheme toggle functionality tests
- `03-journal.spec.ts` - Journal page and entry tests
- `04-photos.spec.ts` - Photography gallery and events tests

## Running Tests

### Local Development

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Debug tests
npm run test:debug
```

### CI/CD

Tests run automatically on:
- Push to main/master branches
- Pull requests to main/master branches

## Test Coverage

The tests cover:

1. **Basic Navigation**
   - Homepage loading
   - Navigation links functionality
   - Mobile menu toggle
   - Footer presence

2. **Color Scheme Toggle**
   - Desktop/mobile switcher visibility
   - Theme switching functionality
   - Theme persistence across navigation
   - System preference respect

3. **Journal Pages**
   - Journal listing page
   - Individual journal entries
   - Reading time and publication dates
   - Back navigation
   - SEO elements

4. **Photos and Events**
   - Photography gallery
   - Events listing
   - Event detail pages
   - PhotoSwipe lightbox functionality
   - Image loading and alt text
   - Responsive design

## Browser Support

Tests run on:
- Chromium (Desktop Chrome)
- Firefox (Desktop Firefox)
- WebKit (Desktop Safari)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

## Configuration

Tests are configured in `playwright.config.ts`:
- Base URL: `http://localhost:4000`
- Parallel execution enabled
- Retry on CI failures
- HTML reporter for results
- Automatic dev server startup

## Environment Variables

No special environment variables are required for testing. The tests use the development server running on port 4000.

## Debugging

To debug failing tests:

1. Run tests in headed mode: `npm run test:headed`
2. Use the debug mode: `npm run test:debug`
3. Check the HTML report in `playwright-report/`
4. Use Playwright Inspector for step-by-step debugging

## Adding New Tests

When adding new tests:

1. Follow the existing naming convention: `XX-description.spec.ts`
2. Use descriptive test names
3. Group related tests in `test.describe()` blocks
4. Include both desktop and mobile viewport tests where applicable
5. Test both positive and negative scenarios
6. Ensure tests are independent and can run in any order