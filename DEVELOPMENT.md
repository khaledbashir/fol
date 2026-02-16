# Development Guidelines

This document outlines the development rules, standards, and tools used in this project.

## Code Quality Tools

### ESLint
We use ESLint for code linting with the following configurations:
- **Base**: Next.js recommended configuration
- **TypeScript**: Full TypeScript support
- **Prettier Integration**: Formatting rules handled by Prettier
- **Custom Rules**: Additional rules for code quality and consistency

### Prettier
We use Prettier for consistent code formatting with the following settings:
- **Line Width**: 80 characters
- **Tabs**: 2 spaces (no tabs)
- **Quotes**: Double quotes
- **Semicolons**: Always
- **Trailing Commas**: All
- **End of Line**: LF

### TypeScript
We use strict TypeScript configuration with enhanced type checking:
- **Strict Mode**: Enabled
- **No Implicit Any**: Enabled
- **No Unused Variables**: Enabled
- **Exact Optional Properties**: Enabled
- **No Unchecked Indexed Access**: Enabled

## Pre-commit Hooks

We use Husky and lint-staged for automated code quality checks:

### Pre-commit
- Runs lint-staged on staged files
- Auto-fixes ESLint issues
- Formats code with Prettier

### Pre-push
- Runs TypeScript type checking
- Runs tests (if available)
- Verifies build succeeds

## Development Scripts

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Check formatting
pnpm format:check

# Type checking
pnpm type-check

# Install git hooks
pnpm prepare
```

## Code Standards

### General Guidelines
- Use TypeScript for all new code
- Follow functional programming principles where appropriate
- Prefer explicit types over implicit any
- Use descriptive variable and function names
- Keep functions small and focused

### React/Next.js Specific
- Use functional components with hooks
- Prefer server components when possible
- Use TypeScript interfaces for props
- Follow Next.js 13+ app router conventions
- Use Tailwind CSS for styling

### Import Organization
1. React imports
2. Third-party libraries
3. Internal imports (absolute paths with @/)
4. Relative imports
5. Type-only imports

### File Naming
- Components: PascalCase (e.g., `UserProfile.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Hooks: camelCase with `use` prefix (e.g., `useAuth.ts`)
- Types: PascalCase (e.g., `UserTypes.ts`)

## VS Code Setup

The project includes VS Code settings and extensions for optimal development experience:

### Recommended Extensions
- Prettier - Code formatter
- ESLint - JavaScript linter
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag
- Path Intellisense

### Workspace Settings
- Format on save enabled
- ESLint auto-fix on save
- Organize imports on save
- TypeScript preferences configured

## Branching Strategy

- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - Feature development
- `bugfix/*` - Bug fixes
- `hotfix/*` - Critical fixes

## Commit Messages

Follow conventional commits format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, linting
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Build process, dependencies

## Testing

- Write unit tests for utilities and business logic
- Use integration tests for component interactions
- Test error states and edge cases
- Maintain good test coverage

## Performance

- Optimize images and assets
- Use Next.js Image component
- Implement lazy loading where appropriate
- Monitor bundle size
- Use React.memo for expensive components

## Security

- Validate all user inputs
- Use environment variables for sensitive data
- Implement proper authentication
- Keep dependencies updated
- Follow OWASP guidelines