# Contributing to OpenStream

Thank you for your interest in contributing to this project! We welcome contributions from the community and are grateful for your support.

## 🌟 Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Fix issues
- ✨ Add new features
- 🎨 Improve UI/UX
- ♿ Enhance accessibility
- 🌐 Add translations (future)

## 📋 Before You Start

1. **Check existing issues** - Someone might already be working on something similar
2. **Discuss major changes** - Open an issue first to discuss significant changes
3. **Follow the code style** - Maintain consistency with the existing codebase
4. **Test your changes** - Ensure your code works and doesn't break existing functionality

## 🚀 Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/openstream.git
cd openstream

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL-OWNER/openstream.git
```

### 2. Set Up Development Environment

Follow the setup instructions in the [README.md](README.md) to:
- Install dependencies
- Set up environment variables
- Configure the database
- Run the development server

### 3. Create a Branch

Create a new branch for your feature or bug fix:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `style/` - UI/styling changes
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

## 💻 Development Guidelines

### Code Style

This project uses:
- **TypeScript** - Type everything appropriately
- **ESLint** - Follow the configured linting rules
- **Prettier** (if configured) - Format your code consistently

Run linting before committing:
```bash
npm run lint
```

### TypeScript Guidelines

- ✅ Use proper types, avoid `any`
- ✅ Define interfaces for component props
- ✅ Use type inference where appropriate
- ✅ Document complex types with comments

```typescript
// Good
interface UserProfileProps {
  username: string;
  bio?: string;
  imageUrl: string;
}

// Avoid
const UserProfile = (props: any) => { ... }
```

### React/Next.js Best Practices

- ✅ Use functional components with hooks
- ✅ Follow Next.js App Router conventions
- ✅ Use Server Components where possible
- ✅ Mark Client Components with `"use client"`
- ✅ Optimize images with `next/image`
- ✅ Use proper loading and error states

### Component Guidelines

- Keep components small and focused (Single Responsibility Principle)
- Extract reusable logic into custom hooks
- Use composition over prop drilling
- Follow the project's component structure:
  - `components/ui/` - Reusable UI primitives
  - `components/stream-player/` - Feature-specific components
  - `app/` - Page components

### File Organization

```typescript
// Component file structure
"use client"; // if needed

import { ... } from "react";
import { ... } from "@/components/...";
import { ... } from "@/lib/...";

interface ComponentProps {
  // Props definition
}

export const Component = ({ ... }: ComponentProps) => {
  // Hooks
  // Event handlers
  // Render
};
```

### Database Changes

If your contribution involves database schema changes:

1. Modify `prisma/schema.prisma`
2. Create a migration:
   ```bash
   npx prisma migrate dev --name descriptive_migration_name
   ```
3. Update seed data if necessary (`prisma/seed.ts`)
4. Document the changes in your PR

### Server Actions

When creating or modifying server actions (`actions/` directory):

- ✅ Mark with `"use server"`
- ✅ Validate user authentication where needed
- ✅ Handle errors gracefully
- ✅ Return appropriate error messages
- ✅ Use try-catch blocks

```typescript
"use server";

import { getSelf } from "@/lib/auth-service";

export const yourAction = async (data: ActionData) => {
  try {
    const self = await getSelf();
    
    // Validate input
    // Perform action
    // Return success
    
  } catch (error) {
    throw new Error("Descriptive error message");
  }
};
```

## 🧪 Testing

Before submitting your changes:

1. **Manual Testing**
   - Test the feature/fix in development mode
   - Test in different browsers if UI-related
   - Check responsive behavior
   - Verify authentication flows if applicable

2. **Build Testing**
   ```bash
   npm run build
   npm start
   ```
   Ensure the production build works correctly.

3. **Database Testing**
   - Test migrations on a fresh database
   - Verify seed data still works
   - Check for breaking changes

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Commit Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, missing semicolons, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks (dependencies, config, etc.)

### Examples

```bash
feat(chat): add message deletion for moderators
fix(stream): resolve video player reconnection issue
docs: update installation instructions
refactor(auth): simplify token validation logic
chore: update dependencies to latest versions
```

### Commit Best Practices

- Write clear, descriptive commit messages
- Keep commits focused (one logical change per commit)
- Reference issues when applicable: `fix(chat): resolve #123`
- Use imperative mood: "add feature" not "added feature"

## 🔄 Pull Request Process

### 1. Sync Your Fork

Before creating a PR, sync with upstream:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### 2. Prepare Your Changes

```bash
# Ensure your branch is up to date
git checkout your-branch-name
git rebase main

# Run linting
npm run lint

# Test build
npm run build
```

### 3. Push to Your Fork

```bash
git push origin your-branch-name
```

### 4. Create Pull Request

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill out the PR template:
   - **Title**: Clear, descriptive title following commit conventions
   - **Description**: 
     - What changes were made
     - Why they were made
     - How to test them
     - Screenshots (if UI changes)
     - Related issues
   - **Checklist**: Complete the PR checklist

### PR Template Example

```markdown
## Description
Brief description of your changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## How Has This Been Tested?
Describe the tests you ran.

## Screenshots (if applicable)
Add screenshots for UI changes.

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] My changes generate no new warnings
- [ ] I have tested the production build
- [ ] I have updated the documentation if needed
```

### 5. Review Process

- Maintainers will review your PR
- Address any requested changes
- Keep the conversation respectful and constructive
- Be patient - reviews may take time

### 6. After Approval

Once approved and merged:
- Delete your feature branch
- Sync your fork with upstream
- Celebrate! 🎉

## 🐛 Reporting Bugs

### Before Reporting

1. Check existing issues
2. Try to reproduce in the latest version
3. Gather relevant information

### Bug Report Template

```markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., Windows, macOS, Linux]
- Browser: [e.g., Chrome, Firefox, Safari]
- Version: [e.g., 1.0.0]

**Additional context**
Any other relevant information.
```

## 💡 Suggesting Features

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Describe the problem.

**Describe the solution you'd like**
Clear description of what you want.

**Describe alternatives you've considered**
Other solutions you've thought about.

**Additional context**
Mockups, examples, or references.
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [LiveKit Documentation](https://docs.livekit.io)
- [Clerk Documentation](https://clerk.com/docs)

## ❓ Questions?

- Open a discussion on GitHub
- Check existing documentation
- Ask in the issues (label: question)

## 🙏 Thank You!

Your contributions make this project better. We appreciate your time and effort!

---

**Happy Coding! 🚀**
