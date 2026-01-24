# Style Guide - HR e-Office Project

> Complete documentation of all styles used in the project

---

## 1. Layout & Grid

### Screen Size
| Property | Value |
|----------|-------|
| Grid Size | 1440 x 1024 px |
| Sidebar Width | 256px |
| Content Padding | 16px (left & right) |

### SCSS Variables
```scss
// Layout
$screen-width: 1440px;
$screen-height: 1024px;
$sidebar-width: 256px;
$content-padding: 16px;
```

---

## 2. Color Palette

### Primary Colors
| Color | Hex | Usage |
|-------|-----|-------|
| **Main Color** | `#142A4E` | Primary buttons, Headers, Links |
| **Main (80% opacity)** | `rgba(20, 42, 78, 0.8)` | Hover states, Secondary elements |
| **Black** | `#050505` | Text, Icons |

### Neutral Colors
| Color | Hex | Usage |
|-------|-----|-------|
| **Dark Grey** | `#5E6366` | Secondary text, Borders |
| **Light Grey** | `#ABAFB1` | Disabled states, Placeholder |
| **Super Light** | `#F5F5FA` | Background, Input fields |
| **White** | `#FEFEFE` | Cards, Modals, Background |

### Status Colors
| Color | Hex | Usage |
|-------|-----|-------|
| **Green** | `#32936F` | Success, Approved, Active |
| **Green (not active)** | `#7AB49F` | Inactive button, Disabled success |
| **Red** | `#F4645B` | Danger, Rejected, Delete, Error |
| **Yellow** | `#F0A20B` | Warning, Pending |
| **Purple** | `#677FD2` | Info, Notifications |

### Alternative Button Colors
| Color | Hex | Usage |
|-------|-----|-------|
| **Dark Purple** | `#3D3A5C` | Yes/Confirm buttons |
| **Red** | `#DC3545` | No/Cancel buttons |

### SCSS Variables
```scss
// Primary Colors
$main-color: #142A4E;
$main-color-80: rgba(20, 42, 78, 0.8);
$black: #050505;

// Neutral Colors
$dark-grey: #5E6366;
$light-grey: #ABAFB1;
$super-light: #F5F5FA;
$white: #FEFEFE;

// Status Colors
$green: #32936F;
$green-light: #7AB49F;
$red: #F4645B;
$yellow: #F0A20B;
$purple: #677FD2;

// Alternative Button Colors
$btn-yes: #3D3A5C;
$btn-no: #DC3545;
```

### Color Usage Guide
| Element | Color | Hex |
|---------|-------|-----|
| Primary Button | Main Color | `#142A4E` |
| Primary Button Hover | Main 80% | `rgba(20, 42, 78, 0.8)` |
| Danger Button | Red | `#F4645B` |
| Success Button | Green | `#32936F` |
| Warning Button | Yellow | `#F0A20B` |
| Disabled Button | Green Light | `#7AB49F` |
| Page Background | Super Light | `#F5F5FA` |
| Card Background | White | `#FEFEFE` |
| Body Text | Black | `#050505` |
| Secondary Text | Dark Grey | `#5E6366` |
| Placeholder Text | Light Grey | `#ABAFB1` |
| Input Border | Light Grey | `#ABAFB1` |
| Input Border Focus | Main Color | `#142A4E` |

### Status Badge Colors
| Status | Background | Text |
|--------|------------|------|
| Approved | `#32936F` | `#FEFEFE` |
| Pending | `#F0A20B` | `#050505` |
| Rejected | `#F4645B` | `#FEFEFE` |
| Cancelled | `#5E6366` | `#FEFEFE` |
| Info | `#677FD2` | `#FEFEFE` |

---

## 3. Typography

### Font Family
```scss
$font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

### Font Styles
| Style | Size | Weight | Usage |
|-------|------|--------|-------|
| **Bold 20 - H1** | 20px | 700 (Bold) | Page titles, Main headings |
| **Bold 16 - H2** | 16px | 700 (Bold) | Section titles |
| **Bold 14 - H3** | 14px | 700 (Bold) | Sub-section titles |
| **Semibold 16** | 16px | 600 (Semibold) | Important text, Labels |
| **Semibold 14** | 14px | 600 (Semibold) | Form labels, Menu items |
| **Semibold 12** | 12px | 600 (Semibold) | Small labels, Tags |
| **Semibold 10** | 10px | 600 (Semibold) | Captions, Helper text |
| **Regular 16** | 16px | 400 (Regular) | Large body text |
| **Regular 14** | 14px | 400 (Regular) | Body text, Paragraphs |
| **Regular 12** | 12px | 400 (Regular) | Small text, Table content |
| **Regular 10** | 10px | 400 (Regular) | Fine print, Timestamps |

### SCSS Variables
```scss
// Font Family
$font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

// Font Sizes
$font-size-h1: 20px;
$font-size-h2: 16px;
$font-size-h3: 14px;
$font-size-lg: 16px;
$font-size-base: 14px;
$font-size-sm: 12px;
$font-size-xs: 10px;

// Font Weights
$font-weight-bold: 700;
$font-weight-semibold: 600;
$font-weight-regular: 400;
```

### Usage Examples
| Element | Style |
|---------|-------|
| Page Title | Bold 20 (H1) |
| Section Header | Bold 16 (H2) |
| Card Title | Bold 14 (H3) |
| Form Label | Semibold 14 |
| Button Text | Semibold 14 |
| Body Text | Regular 14 |
| Table Content | Regular 12 |
| Footer Text | Regular 10 |

---

## 4. Buttons

### Button Types & Sizes

| Type | Description | Usage |
|------|-------------|-------|
| **Small Navigation** | Icon buttons (＋, upload, settings, grid, copy) | Toolbar, Navigation |
| **Default** | Save, Edit, Clear | Small actions |
| **Medium Default** | Yes, Cancel, Add HR User, Delete, Role Settings, Save | Forms, Modals |
| **Big Default** | Create, Clear | Main actions |
| **Secondary Super Big** | Cancel | Full width, Modal footer |

### Button Colors & States

| Button | Default | Hover | Click | Hex |
|--------|---------|-------|-------|-----|
| **Yes / Save / Create** | Green | Dark Green | Dark Green | `#32936F` |
| **Cancel / Clear** | White + Border | Grey border | Grey border | `#FEFEFE` |
| **Add HR User** | Dark | Dark | Dark | `#142A4E` |
| **Delete** | Red outline | Red outline | Red outline | `#F4645B` |
| **Role Settings** | White + icon | Border | Border | `#FEFEFE` |

### Alternative Button Style (Yes/No)
| Button | Background | Text | Hex |
|--------|------------|------|-----|
| **Yes** | Dark Purple | White | `#3D3A5C` |
| **No** | Red | White | `#DC3545` |

### SCSS Button Styles
```scss
// Primary Button (Yes, Save, Submit, Create)
.btn-primary {
  background-color: $green;
  color: $white;
  border: none;
  padding: 10px 24px;
  border-radius: 4px;
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  cursor: pointer;
  
  &:hover {
    background-color: darken($green, 10%);
  }
  
  &:disabled {
    background-color: $green-light;
    cursor: not-allowed;
  }
}

// Secondary Button (Cancel, Clear)
.btn-secondary {
  background-color: $white;
  color: $dark-grey;
  border: 1px solid $light-grey;
  padding: 10px 24px;
  border-radius: 4px;
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  cursor: pointer;
  
  &:hover {
    border-color: $dark-grey;
  }
}

// Danger Button (Delete, Reject)
.btn-danger {
  background-color: $white;
  color: $red;
  border: 1px solid $red;
  padding: 10px 24px;
  border-radius: 4px;
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  cursor: pointer;
  
  &:hover {
    background-color: $red;
    color: $white;
  }
}

// Dark Button (Add HR User)
.btn-dark {
  background-color: $main-color;
  color: $white;
  border: none;
  padding: 10px 24px;
  border-radius: 4px;
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  cursor: pointer;
  
  &:hover {
    background-color: $main-color-80;
  }
}

// Yes/No Buttons (Alternative)
.btn-yes {
  background-color: #3D3A5C;
  color: $white;
  border: none;
  padding: 10px 30px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-no {
  background-color: #DC3545;
  color: $white;
  border: none;
  padding: 10px 30px;
  border-radius: 4px;
  cursor: pointer;
}

// Button Sizes
.btn-sm {
  padding: 6px 12px;
  font-size: $font-size-sm;
}

.btn-md {
  padding: 10px 24px;
  font-size: $font-size-base;
}

.btn-lg {
  padding: 12px 32px;
  font-size: $font-size-lg;
}

.btn-full {
  width: 100%;
  padding: 12px 24px;
}
```

---

## 5. Icons

### Icon Sizes
| Size | Value | Usage |
|------|-------|-------|
| **Small** | 16px | Menu icons, Action icons |
| **Medium** | 18px | Toolbar icons |
| **Standard** | 24px | Buttons, Navigation |
| **Large** | 34px | Add button, Feature icons |
| **Extra Large** | 235px | Success/Error dialogs |

### Special Icons
| Icon | Size | Color | Usage |
|------|------|-------|-------|
| **Success (✓)** | 235px | Green `#32936F` | Success dialog |
| **Question (?)** | 235px | Yellow `#F0A20B` | Confirmation dialog |

### SCSS Variables
```scss
// Icon Sizes
$icon-sm: 16px;
$icon-md: 18px;
$icon-base: 24px;
$icon-lg: 34px;
$icon-xl: 235px;
```

---

## 6. Forms

### Input Fields
```scss
.form-input {
  width: 100%;
  padding: 10px 12px;
  font-size: $font-size-base;
  font-family: $font-family;
  border: 1px solid $light-grey;
  border-radius: 4px;
  background-color: $white;
  color: $black;
  
  &::placeholder {
    color: $light-grey;
  }
  
  &:focus {
    outline: none;
    border-color: $main-color;
  }
  
  &:disabled {
    background-color: $super-light;
    cursor: not-allowed;
  }
}

.form-label {
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  color: $black;
  margin-bottom: 6px;
  display: block;
}
```

### Validation States
```scss
// Error State
.form-input.error {
  border-color: $red;
}

.error-message {
  color: $red;
  font-size: $font-size-sm;
  margin-top: 4px;
}

// Success State
.form-input.success {
  border-color: $green;
}
```

---

## 7. Components

### Cards
```scss
.card {
  background-color: $white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
}
```

### Status Badges
```scss
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
}

.badge-approved {
  background-color: $green;
  color: $white;
}

.badge-pending {
  background-color: $yellow;
  color: $black;
}

.badge-rejected {
  background-color: $red;
  color: $white;
}

.badge-cancelled {
  background-color: $dark-grey;
  color: $white;
}

.badge-info {
  background-color: $purple;
  color: $white;
}
```

---

## 8. Quick Reference

### All Colors
```scss
$main-color: #142A4E;
$black: #050505;
$dark-grey: #5E6366;
$light-grey: #ABAFB1;
$super-light: #F5F5FA;
$white: #FEFEFE;
$green: #32936F;
$green-light: #7AB49F;
$red: #F4645B;
$yellow: #F0A20B;
$purple: #677FD2;
$btn-yes: #3D3A5C;
$btn-no: #DC3545;
```

### All Font Sizes
```scss
$font-size-h1: 20px;
$font-size-h2: 16px;
$font-size-h3: 14px;
$font-size-lg: 16px;
$font-size-base: 14px;
$font-size-sm: 12px;
$font-size-xs: 10px;
```

### All Spacing
```scss
$sidebar-width: 256px;
$content-padding: 16px;
$screen-width: 1440px;
$screen-height: 1024px;
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-09 | Initial style guide created |

---

*This style guide is maintained by the HR e-Office development team.*