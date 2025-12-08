# Component Documentation

## Overview

Town Hall uses a component-based architecture with React functional components and TypeScript. All components follow the Bauhaus Neo-Modernism design system.

---

## Layout Components

### Header

**Location:** `components/layout/Header.tsx`

Responsive navigation header with Bauhaus-inspired logo and mobile menu.

```tsx
import { Header } from '@/components/layout/Header';

// Used in layout.tsx - no props needed
<Header />
```

**Features:**
- Bauhaus geometric logo (3 colored squares)
- Desktop navigation links
- Mobile hamburger menu
- Responsive breakpoints

---

### Footer

**Location:** `components/layout/Footer.tsx`

Site footer with navigation, social links, and newsletter teaser.

```tsx
import { Footer } from '@/components/layout/Footer';

// Used in layout.tsx - no props needed
<Footer />
```

**Features:**
- Bauhaus color bar decoration
- Categorized navigation links
- Social media links
- Newsletter signup teaser
- Copyright and policy links

---

## UI Components

### Button

**Location:** `components/ui/Button.tsx`

Versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="md">Click Me</Button>
<Button variant="secondary" size="lg" isLoading>Loading...</Button>
<Button variant="outline" fullWidth>Full Width</Button>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'accent' \| 'outline' \| 'ghost'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `isLoading` | `boolean` | `false` | Show loading spinner |
| `fullWidth` | `boolean` | `false` | Expand to full width |
| `disabled` | `boolean` | `false` | Disable button |

---

### Card

**Location:** `components/ui/Card.tsx`

Container component with variants and subcomponents.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';

<Card variant="elevated">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    Main content here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'outlined' \| 'blue' \| 'red' \| 'yellow'` | `'default'` | Visual style |
| `interactive` | `boolean` | `false` | Add hover effects |
| `noPadding` | `boolean` | `false` | Remove internal padding |

---

### Input / Textarea / Select

**Location:** `components/ui/Input.tsx`

Form input components with validation states.

```tsx
import { Input, Textarea, Select } from '@/components/ui/Input';

<Input
  label="Email"
  type="email"
  error="Invalid email address"
  required
/>

<Textarea
  label="Message"
  placeholder="Enter your message..."
  helperText="Max 500 characters"
/>

<Select
  label="Category"
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ]}
/>
```

**Common Props:**

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Field label |
| `error` | `string` | Error message |
| `helperText` | `string` | Helper text below input |
| `required` | `boolean` | Mark as required |

---

### Modal

**Location:** `components/ui/Modal.tsx`

Accessible dialog component with focus trap.

```tsx
import { Modal, ModalFooter } from '@/components/ui/Modal';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="md"
>
  <p>Are you sure you want to proceed?</p>
  <ModalFooter>
    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button onClick={handleConfirm}>Confirm</Button>
  </ModalFooter>
</Modal>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | Control visibility |
| `onClose` | `() => void` | - | Close handler |
| `title` | `string` | - | Modal title |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Modal width |
| `closeOnOverlayClick` | `boolean` | `true` | Close on backdrop click |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |

---

### Toast

**Location:** `components/ui/Toast.tsx`

Notification system with provider and hook.

```tsx
// In layout.tsx
import { ToastProvider } from '@/components/ui/Toast';

<ToastProvider>
  {children}
</ToastProvider>

// In any component
import { useToast } from '@/components/ui/Toast';

function MyComponent() {
  const { addToast } = useToast();

  const handleSuccess = () => {
    addToast({
      type: 'success',
      title: 'Saved!',
      message: 'Your changes have been saved.',
    });
  };
}
```

**Toast Types:** `'success' | 'error' | 'warning' | 'info'`

---

### SearchInput

**Location:** `components/ui/SearchInput.tsx`

Search input with clear button.

```tsx
import { SearchInput } from '@/components/ui/SearchInput';

<SearchInput
  placeholder="Search articles..."
  value={query}
  onChange={setQuery}
  onSearch={handleSearch}
/>
```

---

### TagFilter

**Location:** `components/ui/TagFilter.tsx`

Tag selection for filtering content.

```tsx
import { TagFilter } from '@/components/ui/TagFilter';

<TagFilter
  tags={['AI', 'Business', 'Tutorial']}
  selectedTags={selectedTags}
  onTagToggle={handleTagToggle}
  onClearAll={handleClearAll}
/>
```

---

### Pagination

**Location:** `components/ui/Pagination.tsx`

Page navigation component.

```tsx
import { Pagination } from '@/components/ui/Pagination';

<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
/>
```

---

## Content Components

### EventCard

**Location:** `components/ui/EventCard.tsx`

Card for displaying event information.

```tsx
import { EventCard } from '@/components/ui/EventCard';

<EventCard
  event={{
    slug: 'intro-to-ai',
    title: 'Introduction to AI',
    description: 'Learn the basics...',
    date: '2025-01-15',
    time: '6:00 PM',
    location: 'Newark Library',
    capacity: 50,
    registered: 32,
    tags: ['Beginner', 'Workshop'],
  }}
/>
```

---

### BlogCard

**Location:** `components/ui/BlogCard.tsx`

Card for displaying blog post previews.

```tsx
import { BlogCard } from '@/components/ui/BlogCard';

<BlogCard
  post={{
    slug: 'what-is-chatgpt',
    title: 'What is ChatGPT?',
    excerpt: 'A simple guide...',
    date: '2024-12-20',
    author: 'Sarah Johnson',
    tags: ['AI Basics'],
    readTime: '5 min read',
  }}
/>
```

---

## Form Components

### RegistrationForm

**Location:** `components/forms/RegistrationForm.tsx`

Event registration form with validation.

```tsx
import { RegistrationForm } from '@/components/forms/RegistrationForm';

<RegistrationForm eventSlug="intro-to-ai" eventTitle="Introduction to AI" />
```

---

### VolunteerForm

**Location:** `components/forms/VolunteerForm.tsx`

Volunteer signup form with interest selection.

```tsx
import { VolunteerForm } from '@/components/forms/VolunteerForm';

<VolunteerForm />
```

---

### ContactForm

**Location:** `components/forms/ContactForm.tsx`

General contact form with subject selection.

```tsx
import { ContactForm } from '@/components/forms/ContactForm';

<ContactForm />
```

---

## Utility Functions

### cn (Class Names)

**Location:** `lib/utils.ts`

Merge Tailwind classes with clsx and tailwind-merge.

```tsx
import { cn } from '@/lib/utils';

<div className={cn('base-class', isActive && 'active-class', className)} />
```

---

## Best Practices

1. **Always use TypeScript** - All components have proper type definitions
2. **Follow accessibility guidelines** - Use semantic HTML, ARIA labels, keyboard navigation
3. **Use Bauhaus design tokens** - Reference colors from `tailwind.config.ts`
4. **Keep components focused** - Single responsibility principle
5. **Test thoroughly** - Unit tests for logic, E2E tests for user flows

---

**Last Updated:** December 2024
