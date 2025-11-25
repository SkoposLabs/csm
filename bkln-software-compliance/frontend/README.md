# BKLN Application Monitor

Internal Application Compliance - A retro-styled internal application for monitoring software installations across user devices, featuring vaporwave aesthetics and 90s web nostalgia.

## Features

### 🎨 Three Retro Themes
- **Vaporwave Dream** (Default): Pink/purple/teal aesthetic with Windows 95 vibes
- **Space Odyssey**: Dark starry background with neon colors (Space Jam inspired)
- **Geocities Classic**: Bright, bold early web aesthetic

### 📋 Core Components

1. **Whitelisted Software Panel**
   - Searchable list of all applications
   - Filter by status (whitelisted, unidentified, flagged, etc.)
   - Sort by name or status
   - Update application status with one click
   - View version history for each app

2. **Recent Upload Status Panel**
   - Real-time status indicator (green = safe, red = alert)
   - Shows count of unidentified applications
   - Displays most recent upload information
   - Quick stats dashboard

3. **Past Uploads Panel**
   - Drag & drop file upload
   - Upload history with timestamps
   - View device and owner information
   - Delete uploads with confirmation

## Getting Started

### Prerequisites
- Bun v1.2.4 or higher

### Installation

```bash
# Install dependencies
bun install
```

### Development

```bash
# Start the development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create optimized production build
bun run build

# Start production server
bun run start
```

## Project Structure

```
bkln-software-compliance-app/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with ThemeProvider
│   ├── page.tsx           # Home page with dashboard
│   └── globals.css        # Global styles and theme variables
├── components/            # React components
│   ├── dashboard.tsx      # Main dashboard layout
│   ├── theme-switcher.tsx # Theme switching UI
│   ├── whitelisted-software-panel.tsx
│   ├── recent-upload-status-panel.tsx
│   └── past-uploads-panel.tsx
├── lib/                   # Utilities and API
│   ├── api-client.ts      # API client with all endpoints
│   ├── mock-data.ts       # Mock data for development
│   ├── contexts/
│   │   └── theme-context.tsx
│   └── hooks/
│       └── use-api.ts     # React hooks for API calls
├── types/                 # TypeScript type definitions
│   ├── index.ts           # Core data models
│   └── theme.ts           # Theme types
├── API_SPEC.md           # API specification
├── BUILD_PLAN.md         # Complete project plan
└── BUILD_CHANGELOG.md    # Development changelog
```

## API Integration

The application is currently running with **mock data** for development. To connect to a real backend:

1. Set your API URL in the environment:
   ```bash
   # Create .env.local
   NEXT_PUBLIC_API_URL=https://your-api-url.com
   ```

2. Switch to real API mode in `lib/api-client.ts`:
   ```typescript
   const USE_MOCK_DATA = false;
   ```

All API endpoints are implemented per the specification in `API_SPEC.md`.

## Theme Customization

Themes are defined in `types/theme.ts`. Each theme includes:
- Color palette (background, panels, text, accents)
- Font families
- Visual effects (glow, scanlines, pixelated, animations)
- Border and shadow styles

To modify a theme or add a new one, edit the `THEMES` object in `types/theme.ts`.

## Technology Stack

- **Runtime**: Bun v1.2.4
- **Framework**: Next.js 16.0.4 with React 19
- **Language**: TypeScript
- **Styling**: CSS-in-JS (styled-jsx) + Tailwind CSS
- **State Management**: React Context + Hooks

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Optimized for screens 320px and up

## Documentation

- `BUILD_PLAN.md` - Complete project architecture and implementation plan
- `BUILD_CHANGELOG.md` - Detailed development history
- `API_SPEC.md` - Backend API specification
- `CLAUDE_FIRST_INSTRUCTIONS.md` - Original project requirements

## Development Notes

- Mock data includes 10 sample applications, 3 devices, and 4 file uploads
- Network delay simulated at 400ms for realistic UX testing
- All components include loading and error states
- Themes persist in localStorage
- Fully responsive with mobile-first design

## Future Enhancements

See `BUILD_PLAN.md` for planned features:
- Detailed report view page
- Additional visual effects and animations
- Device detail pages
- Application detail pages
- Export functionality

---

This project was created using Bun v1.2.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
