# Build Plan - BKLN Application Monitor

## Project Overview

An internal application for monitoring software installations on user devices. The application features a retro/vaporwave aesthetic inspired by 90s web design, combining nostalgia with modern functionality.

## Technology Stack

- **Runtime**: Bun
- **Framework**: Next.js with React
- **Language**: TypeScript
- **Styling**: CSS-in-JS or Tailwind with custom theme extensions
- **State Management**: React Context for theme switching + local component state
- **API Integration**: Mock data layer (ready to swap with real API)

## Design Aesthetic

Based on provided design samples, the application will feature:

### Visual Themes
- **Space Jam Era**: Dark starry backgrounds with vibrant, colorful interactive elements
- **Geocities Era**: Animated borders, bold text styling, bright textured backgrounds
- **Classic Apple**: Rainbow color bands, textured backgrounds, retro branding
- **Vaporwave UI**: Pink/magenta windows with teal accents (Windows 95/98 style)
- **Vaporwave Landscape**: Purple-pink gradients with surreal teal/green elements

### Design Principles
- Bold, high-contrast color schemes
- Textured or gradient backgrounds (stars, tiles, geometric patterns)
- Retro UI elements (window frames, borders, box shadows)
- Playful, personality-driven interface
- Pink/purple/teal vaporwave palette OR dark space theme with neon accents

## Theme Options

### 1. Vaporwave Dream (Default)
- Pink/magenta panels with teal/cyan accents
- Purple gradient backgrounds
- Retro window-style borders with 3D effects
- Windows 95/98 inspired UI elements

### 2. Space Odyssey
- Dark starry background with twinkling stars
- Neon bright colored panels (orange, green, blue, purple)
- Glowing effects on interactive elements
- Space Jam website inspired

### 3. Geocities Classic
- Bright textured backgrounds
- Animated border effects
- Bold, contrasting colors
- Early web nostalgia

## Core Components

### 1. Whitelisted Software Panel
**Purpose**: Manage applications that are approved/whitelisted

**Features**:
- Searchable list of all applications
- Filter by status (whitelisted, unidentified, etc.)
- Add applications to whitelist
- Remove applications from whitelist
- Display application versions
- Status badges with color coding

**API Endpoints**:
- `GET /applications` - Fetch all applications
- `GET /statuses` - Get available status types
- `POST /applications/{uuid}/status` - Update application status
- `GET /applications/{uuid}` - Get application details and versions
- `GET /applications/{uuid}/devices` - See which devices have this app

### 2. Recent Upload Status Panel
**Purpose**: Display status of most recent file upload with prominent alert system

**Features**:
- Show most recent upload timestamp
- Display device information
- Status indicator: "0 Unidentified Applications" (green) or "X Unidentified Applications" (red)
- Quick link to view full report

**API Endpoints**:
- `GET /stats` - Get homepage statistics (recent file, unidentified count)

### 3. Past Uploads Panel
**Purpose**: View history of all uploads and manage files

**Features**:
- List of all past uploads with dates
- Upload new file button (drag & drop + file picker)
- Delete upload action
- Click to view detailed report
- File metadata (device, owner, timestamp)

**API Endpoints**:
- `GET /file/{uuid}` - Get installation reports for a file
- `POST /file` - Upload new report file
- `DELETE /file` - Remove file and associated reports

## Data Model (TypeScript Types)

```typescript
interface File {
  uuid: string;
  uploadDate: string;
  deviceUuid: string;
  device?: Device;
}

interface Device {
  uuid: string;
  ownerName: string;
  serialNumber: string;
  applications?: Application[];
}

interface Application {
  uuid: string;
  name: string;
  versions: ApplicationVersion[];
  status: Status;
}

interface ApplicationVersion {
  version: string;
  createdAt: string;
}

interface Status {
  id: string;
  name: string; // "whitelisted", "unidentified", "flagged", etc.
  color: string;
}

interface InstallationReport {
  device: string;
  owner: string;
  serialNumber: string;
  applicationName: string;
  applicationVersion: string;
  status: string;
}

interface Stats {
  mostRecentFile: File;
  unidentifiedCount: number;
  totalApplications: number;
  totalDevices: number;
}
```

## API Integration Plan

### All Endpoints

| Path | Method | Description |
|------|--------|-------------|
| `/file` | POST | Upload report, creates applications/devices/installation_reports. Returns file uuid |
| `/file` | DELETE | Deletes file and all associated installation_reports |
| `/file/{file_uuid}` | GET | Get all installation_reports for a file |
| `/applications` | GET | Get list of all applications |
| `/applications/{application_uuid}` | GET | Get application with versions and creation dates |
| `/applications/{application_uuid}/devices` | GET | Get devices with this app and their versions |
| `/applications/{application_uuid}/status` | POST | Update status for all versions of application |
| `/devices` | GET | Get list of all devices |
| `/devices/{device_uuid}` | GET | Get device with all installed applications from most recent file |
| `/devices/{device_uuid}` | PATCH | Update device owner name |
| `/statuses` | GET | Get all available statuses |
| `/report` | GET | Get full report from most recent file (device, owner, serial, app, version, status) |
| `/stats` | GET | Get homepage statistics |

### Mock Data Strategy
- Create realistic mock data matching API response structures
- Add simulated network delay (300-500ms) for realistic UX
- Use local state management for mock CRUD operations
- Easy swap to real API by changing base URL and removing mocks

## Component Architecture

### Layout Structure
```
AppLayout
├── ThemeSwitcher (floating button)
├── Header (logo, title, navigation)
└── Dashboard
    ├── WhitelistedSoftwarePanel
    ├── RecentUploadStatusPanel
    └── PastUploadsPanel
```

### Additional Views
- Device Details Page (`/devices/{uuid}`)
- Application Details Page (`/applications/{uuid}`)
- Full Report View (`/report`)

## Implementation Steps

1. **Project Setup**
   - Initialize Next.js with Bun
   - Set up TypeScript configuration
   - Configure styling system
   - Set up project structure

2. **Type Definitions**
   - Create all TypeScript interfaces for data models
   - Define API response types
   - Create theme type definitions

3. **API Client Layer**
   - Create API client with all endpoint functions
   - Implement mock data generators
   - Add mock implementations for all endpoints
   - Create API hooks for React components

4. **Theme System**
   - Create theme definitions for all 3 themes
   - Implement theme context provider
   - Build theme switcher component
   - Add theme persistence (localStorage)

5. **Base Layout**
   - Create main layout component
   - Add theme switcher UI
   - Implement responsive grid for panels
   - Add retro styling elements

6. **Whitelisted Software Panel**
   - Build application list component
   - Add search functionality
   - Implement filter by status
   - Create add/remove actions
   - Add status badge components

7. **Recent Upload Status Panel**
   - Fetch stats from API
   - Display upload info
   - Create status indicator (green/red)
   - Add click-through to full report

8. **Past Uploads Panel**
   - List all files with metadata
   - Implement file upload (drag & drop)
   - Add delete functionality
   - Create file detail view

9. **Report View**
   - Build full report table
   - Add filtering/sorting
   - Export functionality (optional)

10. **Visual Polish**
    - Add animations and transitions
    - Implement hover effects
    - Add loading states
    - Create error boundaries
    - Add retro visual effects (scan lines, glows, etc.)

11. **Testing**
    - Test all CRUD operations with mock data
    - Verify theme switching
    - Test responsive layout
    - Verify Bun compatibility

## Development Principles

- Keep solutions simple and focused
- Build components that match the retro aesthetic
- Ensure easy transition from mock to real API
- Maintain consistent theming across all components
- Prioritize user experience and visual appeal
- Make theme switching smooth and instant
