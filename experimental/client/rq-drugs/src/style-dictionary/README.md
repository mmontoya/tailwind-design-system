# Style Dictionary

**Style Dictionary** leverages the concept of "tokens" to define and manage design decisions in code. Tokens act as single sources of truth for visual properties such as:

- colors
- spacing
- border radii
- padding
- typography
- icons
- logos

By centralizing these definitions, we ensure consistency and flexibility, making it easier to update, maintain, and share design standards across platforms. This unified approach enhances the portability of our design decisions, allowing for seamless adaptation across different parts of the application.

In this project the definitions are stored as yaml files. They are separated into:

- color
- font
- icon
- image
- metric

To build the design tokens, use:

`npm run build-tokens`

This will output a tokens file as folows:

```
{
"color-brand-primary-base": "hsl(0, 100%, 40%)",
"color-brand-primary-light": "hsl(0, 100%, 50%)",
"color-brand-primary-dark": "hsl(0, 100%, 30%)",
"color-brand-secondary-base": "hsl(45, 100%, 40%)",
"color-brand-secondary-hover": "hsl(39, 100%, 47%)",
"color-brand-secondary-active": "hsl(36, 100%, 50%)"
}
```

These are then injected into tailwind from within `tailwind.conf.js`

The tokens can then be utilized inside tailwind by referencing them as: bg-brand-primary-base or
